#!/usr/bin/env sh
set -e
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
if command -v pwsh >/dev/null 2>&1; then
    pwsh -NoProfile -ExecutionPolicy Bypass -File "$SCRIPT_DIR/build-dist.ps1" "$@"
elif command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$SCRIPT_DIR/build-dist.ps1" "$@"
else
    echo "Error: PowerShell (pwsh or powershell.exe) is required to run build-dist.ps1" >&2
    exit 1
fi
