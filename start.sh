#!/usr/bin/env bash
set -e

PB_VERSION="0.23.4"

if [ ! -f "./pocketbase" ]; then
  # Detect OS and architecture
  OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
  ARCH="$(uname -m)"

  case "$OS" in
    darwin) PB_OS="darwin" ;;
    linux)  PB_OS="linux"  ;;
    *)      echo "Sistema operativo no soportado: $OS"; exit 1 ;;
  esac

  case "$ARCH" in
    x86_64)          PB_ARCH="amd64" ;;
    arm64|aarch64)   PB_ARCH="arm64" ;;
    *)               echo "Arquitectura no soportada: $ARCH"; exit 1 ;;
  esac

  PB_FILE="pocketbase_${PB_VERSION}_${PB_OS}_${PB_ARCH}.zip"
  echo "→ Descargando PocketBase v${PB_VERSION} (${PB_OS}_${PB_ARCH})..."
  curl -fsSL -o pocketbase.zip \
    "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/${PB_FILE}"
  unzip -q pocketbase.zip pocketbase
  chmod +x ./pocketbase
  rm pocketbase.zip
  echo "✓ PocketBase descargado."
fi

mkdir -p public pb_migrations

echo ""
echo "================================================"
echo "  RAFFLE PLATFORM — INICIANDO"
echo "  URL:      http://localhost:8090"
echo "  Admin UI: http://localhost:8090/_/"
echo "================================================"
echo ""
echo "  Primera vez? Accede a /_/ para crear"
echo "  las credenciales de superusuario."
echo ""

exec ./pocketbase serve \
  --http=0.0.0.0:8090 \
  --publicDir=./public
