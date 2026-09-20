#!/usr/bin/env bash
# check-tells.sh — controllo meccanico degli antipattern CS01.
# Non giudica il gusto. Conta quello che si può contare.
#
#   ./scripts/check-tells.sh              # solo i file cambiati vs main
#   ./scripts/check-tells.sh --all        # tutto src/
#   ./scripts/check-tells.sh src/components/Hero.tsx
#
# Exit 1 se qualcosa scatta. Uno scatto non è automaticamente un errore:
# è una decisione da registrare nel ledger o da correggere.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

RED=$'\033[0;31m'; YEL=$'\033[0;33m'; GRN=$'\033[0;32m'; DIM=$'\033[2m'; OFF=$'\033[0m'
HITS=0

hit()  { HITS=$((HITS+1)); printf '%s✗ %s%s  %s\n' "$RED" "$1" "$OFF" "$2"; }
warn() { printf '%s! %s%s  %s\n' "$YEL" "$1" "$OFF" "$2"; }
ok()   { printf '%s✓ %s%s\n' "$GRN" "$1" "$OFF"; }

# --- quali file -------------------------------------------------------------
if [ "${1:-}" = "--all" ]; then
  mapfile -t FILES < <(find src -name '*.tsx' -not -path 'src/components/ui/*' -not -path 'src/lab/*')
elif [ $# -gt 0 ]; then
  FILES=("$@")
else
  # I file che hai appena toccato: prima il lavoro non committato, poi l'ultimo
  # commit. Non il diff contro main: su un branch lungo diventa tutto il repo,
  # e un controllo che segnala tutto non fa cambiare niente.
  mapfile -t FILES < <(git diff --name-only HEAD -- 'src/**/*.tsx' 2>/dev/null | grep -vE 'src/components/ui/|src/lab/' || true)
  if [ ${#FILES[@]} -eq 0 ]; then
    mapfile -t FILES < <(git diff --name-only HEAD~1 HEAD -- 'src/**/*.tsx' 2>/dev/null | grep -vE 'src/components/ui/|src/lab/' || true)
  fi
fi

# I file cancellati restano nel diff ma non si possono leggere.
EXISTING=()
for f in "${FILES[@]:-}"; do [ -f "$f" ] && EXISTING+=("$f"); done
FILES=("${EXISTING[@]:-}")

if [ ${#FILES[@]} -eq 0 ] || [ -z "${FILES[0]:-}" ]; then
  echo "${DIM}Nessun file .tsx da controllare.${OFF}"; exit 0
fi

printf '%sControllo %d file%s\n\n' "$DIM" "${#FILES[@]}" "$OFF"

# --- deroghe registrate ---------------------------------------------------
# Una deroga vale solo se sta nel blocco ```deroghe di
# docs/ux/divergence-ledger.md. Zittire un controllo costa quanto scrivere
# perché, e la motivazione resta in un documento che si rilegge.
LEDGER="docs/ux/divergence-ledger.md"
declare -A DEROGA_CHECKS=()
declare -A DEROGA_WHY=()
if [ -f "$LEDGER" ]; then
  while IFS= read -r line; do
    file="${line%%:*}"
    rest="${line#*:}"
    why="${rest#*#}"; [ "$why" = "$rest" ] && why=""
    checks="${rest%%#*}"
    # Due righe per lo stesso file farebbero sparire in silenzio la prima:
    # meglio dirlo, perché una deroga persa è una deroga che non protegge più.
    if [ -n "${DEROGA_CHECKS[$file]:-}" ]; then
      printf '%s! blocco deroghe: %s compare due volte, unisci le righe%s\n' "$YEL" "$file" "$OFF" >&2
    fi
    DEROGA_CHECKS["$file"]=" $(printf '%s' "$checks" | tr ',' ' ' | tr -s ' ') "
    DEROGA_WHY["$file"]="$(printf '%s' "$why" | sed 's/^ *//')"
  done < <(awk '/^```deroghe/{inb=1;next} /^```/{inb=0} inb && /:/' "$LEDGER")
fi

# File da controllare per un dato codice, escludendo quelli derogati per quello.
files_for() {
  local check="$1" f n=0
  for f in "${FILES[@]}"; do
    case "${DEROGA_CHECKS[$f]:-}" in *" $check "*) continue ;; esac
    printf '%s\n' "$f"; n=$((n+1))
  done
  # Se la deroga ha svuotato la lista, /dev/null tiene i grep validi senza
  # dover trattare il caso vuoto in ognuno dei controlli.
  [ "$n" -eq 0 ] && printf '/dev/null\n'
  return 0
}

DEROGHE_APPLICATE=()
note_deroga() {
  local check="$1" f
  for f in "${FILES[@]}"; do
    case "${DEROGA_CHECKS[$f]:-}" in
      *" $check "*) DEROGHE_APPLICATE+=("$check  $f  ${DEROGA_WHY[$f]:-}") ;;
    esac
  done
}

# I commenti nel codice non sono copy visibile né stile: si filtrano dai conteggi.
NOCOMMENT='^[^:]*:[0-9]+:[[:space:]]*(//|[{]?/[*]|[*])'
# conta le occorrenze di un pattern ignorando le righe di commento
count_nc() {
  local pat="$1"; shift
  grep -rHnE "$pat" "$@" 2>/dev/null \
    | grep -vE "$NOCOMMENT" \
    | grep -oE "$pat" \
    | wc -l | tr -d ' '
}

# Un array di file per controllo, al netto delle deroghe registrate.
mapfile -t F_S3    < <(files_for S3)
mapfile -t F_S2    < <(files_for S2)
mapfile -t F_S4    < <(files_for S4)
mapfile -t F_U1    < <(files_for U1)
mapfile -t F_U2    < <(files_for U2)
mapfile -t F_U4    < <(files_for U4)
mapfile -t F_C1    < <(files_for C1)
mapfile -t F_VOICE < <(files_for VOICE)
mapfile -t F_TOKEN < <(files_for TOKEN)
mapfile -t F_TYPE  < <(files_for TYPE)
for c in S3 S2 S4 U1 U2 U4 C1 VOICE TOKEN TYPE; do note_deroga "$c"; done

# --- S3 · ritmo verticale unico --------------------------------------------
RHYTHM=$(grep -rhoE 'py-[0-9]+ md:py-[0-9]+( lg:py-[0-9]+)?' "${F_S3[@]}" 2>/dev/null | sort | uniq -c | sort -rn)
DOMINANT=$(echo "$RHYTHM" | head -1 | awk '{print $1}')
if [ -n "${DOMINANT:-}" ] && [ "$DOMINANT" -ge 3 ]; then
  hit "S3 ritmo verticale" "lo stesso padding di sezione ripetuto ${DOMINANT}× — servono almeno 3 densità (direction-lock § Densità)"
  echo "$RHYTHM" | sed 's/^/      /'
else
  ok "S3 ritmo verticale"
fi

# --- S2 · template di sezione ripetuto -------------------------------------
EYEBROW=$(grep -rho 'eyebrow-num' "${F_S2[@]}" 2>/dev/null | wc -l | tr -d ' ')
RULE=$(grep -rho 'rule-short' "${F_S4[@]}" 2>/dev/null | wc -l | tr -d ' ')
if [ "$EYEBROW" -gt 2 ]; then
  # Il limite è per pagina, ma lo script vede file, non pagine. Elenca dove
  # stanno, così chi legge decide se sono davvero sulla stessa schermata.
  hit "S2 template di sezione" "eyebrow-num ${EYEBROW}× nei file controllati — il limite è 2 per PAGINA, quindi guarda dove stanno"
  grep -rHc 'eyebrow-num' "${F_S2[@]}" 2>/dev/null | grep -v ':0$' | sed 's/^/      /'
else
  ok "S2 template di sezione (eyebrow-num ${EYEBROW}×)"
fi
[ "$RULE" -gt 2 ] && hit "S4 filetti decorativi" "rule-short ${RULE}× — un filetto esiste solo se separa qualcosa"

# --- U1 · valori di radius --------------------------------------------------
RADII=$(grep -rhoE 'rounded-(none|sm|md|lg|xl|2xl|3xl|full|\[[^]]+\])' "${F_U1[@]}" 2>/dev/null | sort -u)
NRADII=$(echo "$RADII" | grep -c . )
if [ "$NRADII" -gt 2 ]; then
  hit "U1 radius" "${NRADII} valori distinti — il lock ne ammette 2 (rounded-lg, rounded-full)"
  echo "$RADII" | sed 's/^/      /'
else
  ok "U1 radius (${NRADII})"
fi

# --- U2 · bordo + ombra sulla stessa superficie -----------------------------
BS=$(grep -rnE 'className="[^"]*\bborder\b[^"]*\bshadow-|className="[^"]*\bshadow-[^"]*\bborder\b' "${F_U2[@]}" 2>/dev/null | grep -v 'border-0' || true)
if [ -n "$BS" ]; then
  hit "U2 bordo + ombra" "stessa superficie con entrambi — su cream vince il bordo"
  echo "$BS" | cut -c1-140 | sed 's/^/      /'
else
  ok "U2 bordo + ombra"
fi

# --- U2b · ombra nascosta dentro una @utility -------------------------------
# Il grep sopra vede solo le classi scritte nel className. Un'utility che porta
# box-shadow al suo interno passa inosservata: è successo con .surface-card,
# che combinava border-color e box-shadow e rendeva ogni `border surface-card`
# un bordo+ombra invisibile al controllo.
CSS="src/index.css"
if [ -f "$CSS" ]; then
  SHADOW_UTILS=$(awk '
    /^@utility /{ name=$2; body="" ; inblock=1 }
    inblock { body = body $0 }
    /^}/ { if (inblock && body ~ /box-shadow[ \t]*:/) print name; inblock=0 }
  ' "$CSS" | tr -d '{' | grep -v '^shadow' || true)
  HIDDEN=""
  for u in $SHADOW_UTILS; do
    FOUND=$(grep -rHnE "className=\"[^\"]*\bborder\b[^\"]*\b${u}\b|className=\"[^\"]*\b${u}\b[^\"]*\bborder\b" "${F_U2[@]}" 2>/dev/null | grep -v 'border-0' || true)
    [ -n "$FOUND" ] && HIDDEN="${HIDDEN}
${FOUND}"
  done
  if [ -n "${HIDDEN// /}" ]; then
    hit "U2b ombra dentro un'utility" "queste utility portano box-shadow e sono usate insieme a border: ${SHADOW_UTILS//$'\n'/ }"
    printf '%s\n' "$HIDDEN" | grep . | cut -c1-140 | sed 's/^/      /'
  else
    ok "U2b ombra dentro un'utility"
  fi
fi

# --- U4 · frecce in coda ai link -------------------------------------------
ARROWS=$(count_nc 'ArrowRight|→' "${F_U4[@]}")
[ "$ARROWS" -gt 1 ] && hit "U4 freccia" "${ARROWS} frecce — una per pagina, sul link che porta fuori" || ok "U4 freccia (${ARROWS})"

# --- C1 · interpunti --------------------------------------------------------
DOTS=$(count_nc '·' "${F_C1[@]}")
if [ "$DOTS" -gt 2 ]; then
  hit "C1 interpunto" "${DOTS}× nei file controllati — il limite è 2 per VIEWPORT, quindi guarda dove stanno"
  grep -rHn '·' "${F_C1[@]}" 2>/dev/null | grep -vE "$NOCOMMENT" | cut -c1-110 | sed 's/^/      /'
else
  ok "C1 interpunto (${DOTS})"
fi

# --- copy · divieti duri da voice-spec -------------------------------------
# parole intere (evita falsi positivi tipo shadow-elevated)
BANNED_W='\b(Reservieren|Reservierung|Sofort|Learn more|Get Started|Get started|einzigartig|authentisch|Erlebnis|seamless|elevate|curated)\b'
# sottostringhe (prefissi tedeschi composti)
# "Jetzt" si elenca per verbo: "Jetzt geöffnet" e "Jetzt geschlossen" sono lo
# stato di apertura, non urgenza, e un divieto secco su "Jetzt" li falserebbe.
BANNED_S='Jetzt reservieren|Jetzt anrufen|Jetzt Anrufen|Jetzt buchen|Jetzt bestellen|Jetzt entdecken|Jetzt sichern|Letzte Plätze|Mehr erfahren|Klick hier|Weiterlesen|Route anzeigen|kulinarische|Wohlfühl|culinary journey|hidden oasis'
BAD=$( { grep -rHnE "$BANNED_W" "${F_VOICE[@]}" 2>/dev/null; grep -rHnE "$BANNED_S" "${F_VOICE[@]}" 2>/dev/null; } | grep -vE "$NOCOMMENT" | cut -c1-140 | sort -u || true)
if [ -n "$BAD" ]; then
  hit "VOICE lessico vietato" "voice-spec § Divieti duri"
  echo "$BAD" | cut -c1-140 | sed 's/^/      /'
else
  ok "VOICE lessico vietato"
fi

# --- em dash come connettore ------------------------------------------------
EMDASH=$(count_nc '—' "${F_VOICE[@]}")
[ "$EMDASH" -gt 3 ] && warn "VOICE em dash" "${EMDASH}× — controlla che non sia il connettore principale"

# --- token: hex e colori Tailwind di default --------------------------------
HEX=$(grep -rHnE '#[0-9a-fA-F]{6}\b' "${F_TOKEN[@]}" 2>/dev/null | grep -vE "$NOCOMMENT" | cut -c1-140 || true)
[ -n "$HEX" ] && { hit "TOKEN hex hardcoded" "solo token semantici nei componenti"; echo "$HEX" | sed 's/^/      /'; } || ok "TOKEN hex hardcoded"

TWCOLORS=$(grep -rnoE '\b(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\b' "${F_TOKEN[@]}" 2>/dev/null || true)
[ -n "$TWCOLORS" ] && { hit "TOKEN colore Tailwind di default" "usa i token semantici"; echo "$TWCOLORS" | sed 's/^/      /'; } || ok "TOKEN colore Tailwind"

# --- a11y: nero puro e verde-200 su chiaro ----------------------------------
grep -rniE '#000000|#000\b|text-black' "${F_TOKEN[@]}" 2>/dev/null | grep -q . && hit "A11Y nero puro" "il nero del brand è --navy-500"

# --- dimensioni tipografiche distinte ---------------------------------------
SIZES=$(grep -rhoE 'text-(xs|sm|base|lg|xl|[2-9]xl|\[[0-9.]+(px|rem)\])' "${F_TYPE[@]}" 2>/dev/null | sort -u | grep -c .)
[ "$SIZES" -gt 5 ] && warn "TYPE scala" "${SIZES} dimensioni distinte nei file toccati — il lock ne ammette 5 per schermata"

echo
if [ ${#DEROGHE_APPLICATE[@]} -gt 0 ]; then
  printf '%sDeroghe registrate applicate (docs/ux/divergence-ledger.md):%s\n' "$DIM" "$OFF"
  printf '%s\n' "${DEROGHE_APPLICATE[@]}" | sort -u | sed 's/^/  /'
  echo
fi
if [ "$HITS" -gt 0 ]; then
  printf '%s%d controlli scattati.%s Correggi, oppure registra la deroga in docs/ux/divergence-ledger.md.\n' "$RED" "$HITS" "$OFF"
  exit 1
fi
printf '%sTutto pulito.%s\n' "$GRN" "$OFF"
