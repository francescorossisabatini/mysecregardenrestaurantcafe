#!/usr/bin/env bash
# Stop — fa girare il tell-check sui file toccati e lo restituisce a Claude.
# Guardia obbligatoria contro il loop infinito: se siamo già dentro un giro
# innescato da questo hook, esci subito.
set -uo pipefail

INPUT=$(cat)
printf '%s' "$INPUT" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true' && exit 0

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
[ -x "$REPO/scripts/check-tells.sh" ] || exit 0

OUT=$("$REPO/scripts/check-tells.sh" 2>&1)
STATUS=$?
[ $STATUS -eq 0 ] && exit 0

{
  echo "Il tell-check è scattato sui file che hai toccato:"
  echo
  echo "$OUT"
  echo
  echo "Correggi, oppure registra la deroga in docs/ux/divergence-ledger.md con il suo motivo."
} >&2
exit 2
