# Install Git on macOS (Xcode Command Line Tools)

Git on your Mac is part of **Xcode Command Line Tools**. The system only installs it when you complete this flow.

## Steps (do these in order)

### 1. Open the built-in Terminal app
- **Do not** use Cursor’s integrated terminal for this.
- Open **Terminal**: Spotlight (⌘+Space) → type `Terminal` → Enter,  
  or **Applications → Utilities → Terminal**.

### 2. Run the installer command
In Terminal, run:

```bash
xcode-select --install
```

### 3. Complete the dialog
- A **popup** will appear: “The xcode-select command requires the command line developer tools…”
- Click **“Install”** (not “Get Xcode”).
- Accept the license.
- Wait for the install to finish (can take 5–15 minutes).

### 4. Confirm Git is installed
In a **new** Terminal window:

```bash
git --version
```

You should see something like: `git version 2.43.0 (Apple Git-xxx)`.

---

## If no dialog appears

- Run `xcode-select --install` again from **Terminal.app** (not Cursor).
- Restart the Mac and try again.
- If you’re on a **managed/corporate** Mac, your IT team may control updates; ask them to install “Xcode Command Line Tools” or allow the install.

## If you use Homebrew

After Command Line Tools (and thus Git) are installed, you can install a different Git version:

```bash
brew install git
```

Then `brew`’s Git will be used when you run `git` (usually at `/opt/homebrew/bin/git` or `/usr/local/bin/git`).
