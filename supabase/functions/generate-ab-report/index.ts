import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.95.0'
import { corsHeaders } from 'https://esm.sh/@supabase/supabase-js@2.95.0/cors'

const TEST_ID = 'mobile_hero_context_v1'
const REPORT_NAME = 'report A/B'
const PERIOD_START = '2026-04-26T00:00:00+02:00'
const PERIOD_END = '2026-05-03T23:59:59+02:00'
const BUCKET = 'ab-reports'

type AbEvent = {
  variant: string
  event_name: string
  page_path: string | null
  created_at: string
}

type VariantStats = {
  variant: string
  impressions: number
  menuClicks: number
  weeklyClicks: number
  totalClicks: number
  clickRate: number
}

const escapePdfText = (value: string) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

const buildPdf = (title: string, lines: string[]) => {
  const contentLines = [title, '', ...lines]
  const text = contentLines
    .map((line, index) => `BT /F1 ${index === 0 ? 20 : 11} Tf 50 ${760 - index * 24} Td (${escapePdfText(line)}) Tj ET`)
    .join('\n')
  const stream = text
  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    `5 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
  ]

  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  for (const object of objects) {
    offsets.push(pdf.length)
    pdf += `${object}\n`
  }
  const xref = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  return new TextEncoder().encode(pdf)
}

const summarize = (events: AbEvent[]) => {
  const variants = ['food', 'dining', 'garden']
  const stats: VariantStats[] = variants.map((variant) => {
    const rows = events.filter((event) => event.variant === variant)
    const impressions = rows.filter((event) => event.event_name === 'hero_variant_impression').length
    const menuClicks = rows.filter((event) => event.event_name === 'click_menu_today').length
    const weeklyClicks = rows.filter((event) => event.event_name === 'click_weekly_specials').length
    const totalClicks = menuClicks + weeklyClicks
    return {
      variant,
      impressions,
      menuClicks,
      weeklyClicks,
      totalClicks,
      clickRate: impressions > 0 ? Number(((totalClicks / impressions) * 100).toFixed(2)) : 0,
    }
  })

  const winner = [...stats].sort((a, b) => b.clickRate - a.clickRate || b.totalClicks - a.totalClicks)[0]
  return { stats, winner }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!supabaseUrl || !serviceRoleKey) throw new Error('Backend secrets missing')

    const token = req.headers.get('Authorization')?.replace('Bearer ', '').trim()
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const authClient = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
    const { data: userData, error: userErr } = await authClient.auth.getUser(token)
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const { data: roles } = await authClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id)
      .in('role', ['admin', 'staff'])
    if (!roles?.length) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const now = Date.now()
    if (now < Date.parse(PERIOD_END)) {
      return new Response(JSON.stringify({ status: 'waiting', message: 'Il test non e ancora concluso.' }), {
        status: 202,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const client = authClient


    const { data: existing } = await client
      .from('ab_test_reports')
      .select('id, file_path, public_url, status')
      .eq('test_id', TEST_ID)
      .eq('report_name', REPORT_NAME)
      .eq('status', 'published')
      .maybeSingle()

    if (existing) {
      return new Response(JSON.stringify({ status: 'already_created', report: existing }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: events, error: eventsError } = await client
      .from('ab_test_events')
      .select('variant,event_name,page_path,created_at')
      .eq('test_id', TEST_ID)
      .gte('created_at', PERIOD_START)
      .lte('created_at', PERIOD_END)
      .limit(10000)

    if (eventsError) throw eventsError

    const summary = summarize((events ?? []) as AbEvent[])
    const lines = [
      `Periodo: ${PERIOD_START} - ${PERIOD_END}`,
      `Eventi raccolti: ${(events ?? []).length}`,
      `Variante vincente: ${summary.winner?.variant ?? 'n/d'} (${summary.winner?.clickRate ?? 0}% click rate)`,
      '',
      'Risultati per variante:',
      ...summary.stats.map((item) => `${item.variant}: impressioni ${item.impressions}, click menu ${item.menuClicks}, click weekly ${item.weeklyClicks}, click rate ${item.clickRate}%`),
    ]

    const pdf = buildPdf(REPORT_NAME, lines)
    const filePath = `report-ab-${new Date().toISOString().slice(0, 10)}.pdf`

    const { error: uploadError } = await client.storage
      .from(BUCKET)
      .upload(filePath, pdf, { contentType: 'application/pdf', upsert: true })
    if (uploadError) throw uploadError

    const { data: signedUrlData, error: signedUrlError } = await client.storage
      .from(BUCKET)
      .createSignedUrl(filePath, 60 * 60 * 24 * 30)
    if (signedUrlError) throw signedUrlError

    const { data: report, error: reportError } = await client
      .from('ab_test_reports')
      .insert({
        report_name: REPORT_NAME,
        test_id: TEST_ID,
        period_start: PERIOD_START,
        period_end: PERIOD_END,
        summary,
        file_path: filePath,
        public_url: signedUrlData.signedUrl,
        status: 'published',
        generated_at: new Date().toISOString(),
      })
      .select('id, file_path, public_url, status, generated_at')
      .single()

    if (reportError) throw reportError

    return new Response(JSON.stringify({ status: 'created', report }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
