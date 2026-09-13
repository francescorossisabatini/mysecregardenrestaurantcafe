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
  mapfile -t FILES < <(find src -name '*.tsx' -not -path 'src/components/ui/*')
elif [ $# -gt 0 ]; then
  FILES=("$@")
else
  BASE=$(git merge-base HEAD origin/main 2>/dev/null || git rev-parse HEAD~1 2>/dev/null || echo HEAD)
  mapfile -t FILES < <(git diff --name-only "$BASE" -- 'src/**/*.tsx' 2>/dev/null | grep -v 'src/components/ui/' || true)
fi

if [ ${#FILES[@]} -eq 0 ]; then
  echo "${DIM}Nessun file .tsx da controllare.${OFF}"; exit 0
fi

printf '%sControllo %d file%s\n\n' "$DIM" "${#FILES[@]}" "$OFF"

# --- S3 · ritmo verticale unico --------------------------------------------
RHYTHM=$(grep -rhoE 'py-[0-9]+ md:py-[0-9]+( lg:py-[0-9]+)?' "${FILES[@]}" 2>/dev/null | sort | uniq -c | sort -rn)
DOMINANT=$(echo "$RHYTHM" | head -1 | awk '{print $1}')
if [ -n "${DOMINANT:-}" ] && [ "$DOMINANT" -ge 3 ]; then
  hit "S3 ritmo verticale" "lo stesso padding di sezione ripetuto ${DOMINANT}× — servono almeno 3 densità (direction-lock § Densità)"
  echo "$RHYTHM" | sed 's/^/      /'
else
  ok "S3 ritmo verticale"
fi

# --- S2 · template di sezione ripetuto -------------------------------------
EYEBROW=$(grep -rho 'eyebrow-num' "${FILES[@]}" 2>/dev/null | wc -l | tr -d ' ')
RULE=$(grep -rho 'rule-short' "${FILES[@]}" 2>/dev/null | wc -l | tr -d ' ')
if [ "$EYEBROW" -gt 2 ]; then
  hit "S2 template di sezione" "eyebrow-num ${EYEBROW}× — massimo 2 per pagina"
else
  ok "S2 template di sezione (eyebrow-num ${EYEBROW}×)"
fi
[ "$RULE" -gt 2 ] && hit "S4 filetti decorativi" "rule-short ${RULE}× — un filetto esiste solo se separa qualcosa"

# --- U1 · valori di radius --------------------------------------------------
RADII=$(grep -rhoE 'rounded-(none|sm|md|lg|xl|2xl|3xl|full|\[[^]]+\])' "${FILES[@]}" 2>/dev/null | sort -u)
NRADII=$(echo "$RADII" | grep -c . )
if [ "$NRADII" -gt 2 ]; then
  hit "U1 radius" "${NRADII} valori distinti — il lock ne ammette 2 (rounded-lg, rounded-full)"
  echo "$RADII" | sed 's/^/      /'
else
  ok "U1 radius (${NRADII})"
fi

# --- U2 · bordo + ombra sulla stessa superficie -----------------------------
BS=$(grep -rnE 'className="[^"]*\bborder\b[^"]*\bshadow-|className="[^"]*\bshadow-[^"]*\bborder\b' "${FILES[@]}" 2>/dev/null | grep -v 'border-0' || true)
if [ -n "$BS" ]; then
  hit "U2 bordo + ombra" "stessa superficie con entrambi — su cream vince il bordo"
  echo "$BS" | cut -c1-140 | sed 's/^/      /'
else
  ok "U2 bordo + ombra"
fi

# --- U4 · frecce in coda ai link -------------------------------------------
ARROWS=$(grep -rhoE 'ArrowRight|→' "${FILES[@]}" 2>/dev/null | wc -l | tr -d ' ')
[ "$ARROWS" -gt 1 ] && hit "U4 freccia" "${ARROWS} frecce — una per pagina, sul link che porta fuori" || ok "U4 freccia (${ARROWS})"

# --- C1 · interpunti --------------------------------------------------------
DOTS=$(grep -rho '·' "${FILES[@]}" 2>/dev/null | wc -l | tr -d ' ')
[ "$DOTS" -gt 2 ] && hit "C1 interpunto" "${DOTS}× — massimo 2 per viewport" || ok "C1 interpunto (${DOTS})"

# --- copy · divieti duri da voice-spec -------------------------------------
# parole intere (evita falsi positivi tipo shadow-elevated)
BANNED_W='\b(Reservieren|Reservierung|Sofort|Learn more|Get Started|Get started|einzigartig|authentisch|Erlebnis|seamless|elevate|curated)\b'
# sottostringhe (prefissi tedeschi composti)
BANNED_S='Jetzt reservieren|Letzte Plätze|Mehr erfahren|Klick hier|kulinarische|Wohlfühl|culinary journey|hidden oasis'
BAD=$( { grep -rnoE "$BANNED_W" "${FILES[@]}" 2>/dev/null; grep -rnoE "$BANNED_S" "${FILES[@]}" 2>/dev/null; } | sort -u || true)
if [ -n "$BAD" ]; then
  hit "VOICE lessico vietato" "voice-spec § Divieti duri"
  echo "$BAD" | cut -c1-140 | sed 's/^/      /'
else
  ok "VOICE lessico vietato"
fi

# --- em dash come connettore ------------------------------------------------
EMDASH=$(grep -rho '—' "${FILES[@]}" 2>/dev/null | wc -l | tr -d ' ')
[ "$EMDASH" -gt 3 ] && warn "VOICE em dash" "${EMDASH}× — controlla che non sia il connettore principale"

# --- token: hex e colori Tailwind di default --------------------------------
HEX=$(grep -rnoE '#[0-9a-fA-F]{6}\b' "${FILES[@]}" 2>/dev/null || true)
[ -n "$HEX" ] && { hit "TOKEN hex hardcoded" "solo token semantici nei componenti"; echo "$HEX" | sed 's/^/      /'; } || ok "TOKEN hex hardcoded"

TWCOLORS=$(grep -rnoE '\b(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\b' "${FILES[@]}" 2>/dev/null || true)
[ -n "$TWCOLORS" ] && { hit "TOKEN colore Tailwind di default" "usa i token semantici"; echo "$TWCOLORS" | sed 's/^/      /'; } || ok "TOKEN colore Tailwind"

# --- a11y: nero puro e verde-200 su chiaro ----------------------------------
grep -rniE '#000000|#000\b|text-black' "${FILES[@]}" 2>/dev/null | grep -q . && hit "A11Y nero puro" "il nero del brand è --navy-500"

# --- dimensioni tipografiche distinte ---------------------------------------
SIZES=$(grep -rhoE 'text-(xs|sm|base|lg|xl|[2-9]xl|\[[0-9.]+(px|rem)\])' "${FILES[@]}" 2>/dev/null | sort -u | grep -c .)
[ "$SIZES" -gt 5 ] && warn "TYPE scala" "${SIZES} dimensioni distinte nei file toccati — il lock ne ammette 5 per schermata"

echo
if [ "$HITS" -gt 0 ]; then
  printf '%s%d controlli scattati.%s Correggi, oppure registra la deroga in docs/ux/divergence-ledger.md.\n' "$RED" "$HITS" "$OFF"
  exit 1
fi
printf '%sTutto pulito.%s\n' "$GRN" "$OFF"
