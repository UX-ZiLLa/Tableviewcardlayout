#!/usr/bin/env bash
# Install system and project dependencies for local development.
# Run from repo root: ./scripts/setup.sh  (or: bash scripts/setup.sh)

set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# --- 1. Node.js (required) ---
if ! command -v node &>/dev/null; then
  echo "Node.js not found. Installing via nvm..."
  if ! command -v git &>/dev/null; then
    echo "ERROR: git is required to install nvm."
    echo "On macOS, install Xcode Command Line Tools first:"
    echo "  xcode-select --install"
    echo "Then run this script again."
    exit 1
  fi
  if [ ! -d "$HOME/.nvm" ]; then
    echo "Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  fi
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  NODE_VERSION=$(cat .nvmrc 2>/dev/null || echo "20")
  nvm install "$NODE_VERSION"
  nvm use "$NODE_VERSION"
fi

# --- 2. pnpm (optional; falls back to npm) ---
if command -v pnpm &>/dev/null; then
  echo "Using existing pnpm."
elif command -v npm &>/dev/null; then
  echo "Installing pnpm..."
  npm install -g pnpm
else
  echo "Installing pnpm via corepack (Node 16.13+)..."
  corepack enable
  corepack prepare pnpm@latest --activate
fi

# --- 3. Project dependencies ---
echo "Installing project dependencies..."
if command -v pnpm &>/dev/null; then
  pnpm install
else
  npm install
fi

echo "Done. Run: pnpm dev  (or npm run dev)"
