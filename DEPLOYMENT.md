# Deployment Secrets Checklist

This project requires these server-side environment variables:

- `ADMIN_PASSCODE`
- `ADMIN_SESSION_SECRET`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

## 1) Generate strong values

Use a strong random value for each secret.

PowerShell example:

```powershell
$passcode = -join ((48..57 + 65..90 + 97..122) | Get-Random -Count 24 | ForEach-Object {[char]$_})
$sessionSecret = -join ((48..57 + 65..90 + 97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
"ADMIN_PASSCODE=$passcode"
"ADMIN_SESSION_SECRET=$sessionSecret"
```

## 2) Set secrets in your deployment provider

Set both variables in your production environment settings, then redeploy.

For Firebase Admin credentials:

- `FIREBASE_PROJECT_ID`: Firebase project id
- `FIREBASE_CLIENT_EMAIL`: service account client email
- `FIREBASE_PRIVATE_KEY`: private key (keep escaped newlines as `\n`)

Common providers:

### Vercel

```bash
vercel env add ADMIN_PASSCODE production
vercel env add ADMIN_SESSION_SECRET production
```

### Netlify

```bash
netlify env:set ADMIN_PASSCODE "<value>"
netlify env:set ADMIN_SESSION_SECRET "<value>"
```

### Cloudflare Pages / Workers

```bash
wrangler secret put ADMIN_PASSCODE
wrangler secret put ADMIN_SESSION_SECRET
```

## 3) Verify before release

Run:

```bash
npm run check:env
```

If this fails, fix the missing env vars and redeploy.
