# Table View Card Layout

This is a code bundle for Table View Card Layout. The original project is available at [Figma](https://www.figma.com/design/LhbFVsNS9040rWmAIPlM8w/Table-View-Card-Layout).

## Dev environment

- **Node:** 20.x (use the version in `.nvmrc`; if you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use`).
- **Package manager:** [pnpm](https://pnpm.io/) (or npm/yarn).

### If dependencies are missing on your machine

1. **macOS:** Install Xcode Command Line Tools (needed for git and compilers):
   ```bash
   xcode-select --install
   ```
2. **One-time setup script** (installs Node via nvm if needed, then pnpm, then project deps):
   ```bash
   ./scripts/setup.sh
   ```
   Or with bash: `bash scripts/setup.sh`

### Setup

1. **Clone and enter the repo**
   ```bash
   cd Tableviewcardlayout
   ```

2. **Use the correct Node version** (optional, if using nvm)
   ```bash
   nvm use
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```
   Or with npm: `npm install`

4. **Optional: copy env file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if you need any environment variables (e.g. `VITE_*` for client-side config).

### Running the app

- **Dev server:** `pnpm dev` (or `npm run dev`) — runs Vite and opens the app (usually at http://localhost:5173).
- **Production build:** `pnpm build` (or `npm run build`).

## Running the code (short version)

- `pnpm i` (or `npm i`) — install dependencies  
- `pnpm dev` (or `npm run dev`) — start the development server
