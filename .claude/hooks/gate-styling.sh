#!/usr/bin/env bash
# PreToolUse · Write|Edit — il completion gate.
# Impedisce di scrivere superfici (CSS, token, classi di stile) finché il
# direction lock ha ancora segnaposto da compilare.
# Blocca con exit 2. Struttura e logica passano sempre.
set -uo pipefail

INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | grep -oE '"file_path"[[:space:]]*:[[:space:]]*"[^"]+"' | head -1 | sed 's/.*"\([^"]*\)"$/\1/')
[ -z "${FILE:-}" ] && exit 0

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
LOCK="$REPO/.claude/skills/house-style/direction-lock.md"
[ -f "$LOCK" ] || exit 0

# Il lock è compilato? I segnaposto del template sono [__] e [____].
if ! grep -qE '\[_{2,}\]' "$LOCK"; then
  exit 0
fi

case "$FILE" in
  *index.css|*tailwind.config.ts|*.css)
    cat >&2 <<MSG
BLOCCATO — completion gate (.claude/hooks/gate-styling.sh)

$FILE è una superficie, e direction-lock.md ha ancora segnaposto [__] da compilare.

Ordine previsto: struttura → tre opzioni strutturali → copy reale → superfici.
Compila .claude/skills/house-style/direction-lock.md, poi riprova.
MSG
    exit 2
    ;;
esac
exit 0
