# Authenticate to GitHub

Choose **one** of these methods. SSH is best for long-term use (no token to copy each time).

---

## Option A: SSH (recommended)

### 1. Generate an SSH key

In Terminal, run (use your GitHub email):

```bash
ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/id_ed25519 -N ""
```

### 2. Start the ssh-agent and add your key

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 3. Copy your public key to the clipboard

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

### 4. Add the key to GitHub

- Go to **https://github.com/settings/keys**
- Click **“New SSH key”**
- Title: e.g. `Mac Book` or `Work`
- Key: paste (⌘+V) — the key is already in your clipboard
- Click **“Add SSH key”**

### 5. Use SSH for this repo and push

```bash
cd /Users/Mic.Seaton@hdsupply.com/Documents/GitHub/Tableviewcardlayout
git remote set-url origin git@github.com:UX-ZiLLa/Tableviewcardlayout.git
git push origin main
```

The first time you push, you may see a prompt about the host; type `yes` and Enter.

---

## Option B: HTTPS with Personal Access Token

### 1. Create a token on GitHub

- Go to **https://github.com/settings/tokens**
- **“Generate new token”** → **“Generate new token (classic)”**
- Note: e.g. `Tableviewcardlayout push`
- Expiration: pick what you prefer (e.g. 90 days or No expiration)
- Scopes: check **`repo`**
- Click **“Generate token”**
- **Copy the token** (you won’t see it again)

### 2. Push and paste the token when asked

```bash
cd /Users/Mic.Seaton@hdsupply.com/Documents/GitHub/Tableviewcardlayout
git push origin main
```

When prompted:

- **Username:** your GitHub username (e.g. `UX-ZiLLa`)
- **Password:** paste the **token** (not your GitHub password)

### 3. (Optional) Save credentials so you don’t re-enter

```bash
git config --global credential.helper osxkeychain
```

Next time you push, macOS Keychain can store the token.

---

## Quick check

- **SSH:** `ssh -T git@github.com` — should say: “Hi UX-ZiLLa! You've successfully authenticated…”
- **HTTPS:** After setting the credential helper and pushing once, future `git push` should not ask for a password.
