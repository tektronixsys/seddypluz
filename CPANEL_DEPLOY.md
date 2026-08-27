# 🚀 Seddypluz — cPanel Node.js 22 Deployment Guide

This guide documents the exact configuration and procedure for deploying the **Seddypluz** full-stack TanStack Start application to **cPanel** with **CloudLinux / Phusion Passenger** running **Node.js 22.x**.

---

## 🏗️ Architecture Summary

- **Frontend & Full-Stack Framework**: TanStack Start (SSR + React 19)
- **Server Engine**: Nitro (`preset: "node-server"`)
- **Runtime Environment**: Node.js `>=22.0.0`
- **Hosting / Process Manager**: cPanel "Setup Node.js App" (Phusion Passenger)
- **Database / Backend Services**: Firebase Firestore & Firebase Admin SDK
- **Payment Gateway**: Flutterwave Inline Payment + Server-Side Verification

---

## 1. ⚙️ cPanel "Setup Node.js App" Settings

In your cPanel dashboard, navigate to **Software** ➜ **Setup Node.js App** ➜ **Create Application**:

| Setting | Recommended Value | Notes |
| :--- | :--- | :--- |
| **Node.js version** | `22.x` (e.g. `22.14.0` or latest 22.x) | **Mandatory** — Firebase Admin & modern packages require Node 22+ |
| **Application mode** | `Production` | Enables production optimizations & secure cookie handling |
| **Application root** | `seddypluz` (or your folder path) | Directory where your project files reside |
| **Application URL** | `seddypluz.com` (or your domain/subdomain) | Primary public route |
| **Application startup file** | `app.js` (or `cpanel-start.mjs`) | **Mandatory** — bootstraps the compiled Nitro Node server |

---

## 2. 🔐 Environment Variables Configuration

Set these variables in the **Environment variables** section of the cPanel Node.js App manager (or via a protected `.env` file in the application root):

### A. Core & Authentication Secrets (Required)

```env
NODE_ENV=production
ADMIN_PASSCODE=your-strong-random-admin-passcode
ADMIN_SESSION_SECRET=your-64-character-random-session-secret
```

### B. Firebase Admin SDK Secrets (Server-Side)

```env
FIREBASE_PROJECT_ID=seddypluz
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@seddypluz.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

> [!TIP]
> Keep `\n` escaped newlines in `FIREBASE_PRIVATE_KEY`. `src/integrations/firebase/admin.ts` automatically converts escaped `\n` to real newlines.

### C. Flutterwave Payment Gateway Secrets

```env
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-xxxxxxxxxxxxxxxx-X
FLUTTERWAVE_SECRET_KEY=FLWSECK-xxxxxxxxxxxxxxxx-X
FLUTTERWAVE_ENCRYPTION_KEY=xxxxxxxxxxxxxxxx
```

---

## 3. 📦 Deployment Steps

### Method 1: Via cPanel Terminal / Git (Recommended)

1. Open **cPanel Terminal** and navigate to your application root:

   ```bash
   cd ~/seddypluz
   ```

2. Enter the Node 22 virtual environment (cPanel provides the exact command at the top of the Node.js App page, e.g.):

   ```bash
   source /home/username/nodevenv/seddypluz/22/bin/activate && cd /home/username/seddypluz
   ```

3. Install production dependencies:

   ```bash
   npm ci
   ```

4. Build the Nitro Node server:

   ```bash
   npm run build
   ```

5. Validate environment secrets:

   ```bash
   npm run check:env
   ```

6. Restart the application:
   - Click **Restart** in the cPanel Node.js App UI, or run:

   ```bash
   mkdir -p tmp && touch tmp/restart.txt
   ```

---

### Method 2: Via File Manager / FTP Upload

1. **Build locally** (with Node.js 22):

   ```bash
   npm ci
   npm run build
   ```

2. **Upload these files & folders to your cPanel application root**:
   - `package.json`
   - `package-lock.json`
   - `cpanel-start.mjs`
   - `vite.config.ts`
   - `tsconfig.json`
   - `src/`
   - `public/`
   - `.output/` (contains `.output/server/index.mjs` and `.output/public/`)
   - `scripts/`

3. **DO NOT upload**:
   - `node_modules/` (install cleanly on server via `npm ci`)
   - `.env` / `.env.local` (configure directly in cPanel Environment variables)
   - `.git/`

4. On the cPanel Node.js App page, click **Run NPM Install** (or run `npm ci` via terminal).
5. Click **Restart**.

---

## 4. 🪵 Passenger Logging & Diagnostics

If you encounter any issues, inspect the Passenger logs:

- **Passenger stderr log**: `~/seddypluz/stderr.log` (or `passenger.log`)
- **Passenger stdout log**: `~/seddypluz/stdout.log`
- **Application test**:

  ```bash
  # Inside cPanel Terminal:
  node cpanel-start.mjs
  ```

---

## 5. 🛡️ Verification Checklist

- [x] Node.js version is `>=22.x`
- [x] `package.json` includes `"engines": { "node": ">=22" }`
- [x] Nitro builds with preset `"node-server"` (`.output/server/index.mjs`)
- [x] Startup file set to `cpanel-start.mjs`
- [x] `PORT` and `HOST` dynamically bound by Passenger
- [x] SSR and static asset routing functional
- [x] Firebase Client & Admin SDK active with fallback resilience
- [x] Flutterwave keys secured in server environment variables
