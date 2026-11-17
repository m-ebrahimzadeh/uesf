#!/usr/bin/env sh
set -e
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
case "${1:-}" in
  install|update|check|doctor|uninstall|init-project|build|build-dist|sync-snapshot|help)
    exec node "$SCRIPT_DIR/../bin/uesf.mjs" "$@"
    ;;
  *)
    exec node "$SCRIPT_DIR/../bin/uesf.mjs" install "$@"
    ;;
esac
