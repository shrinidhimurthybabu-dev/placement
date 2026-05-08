# Claude Code Project Guide

This project is a Next.js web application.

## Setup

Use these commands from the project root:

```powershell
corepack pnpm install
corepack pnpm dev
```

Open the app at:

```text
http://localhost:3000
```

## Claude Terminal Usage

Claude Code is installed on this machine and can be started with:

```powershell
claude.cmd
```

If PowerShell blocks `claude`, use `claude.cmd` instead.

Before using Claude Code on Windows, set Git Bash for the current terminal session:

```powershell
$env:CLAUDE_CODE_GIT_BASH_PATH="C:\Program Files\Git\bin\bash.exe"
```

Then run:

```powershell
claude.cmd
```

Ask Claude to make changes, review the diff, then save the work to GitHub:

```powershell
git status
git add .
git commit -m "Update web app with Claude"
git push
```
