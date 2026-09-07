# NEXORA V13 — REAL APP DEPLOYMENT

This package is now structured for a real hosted deployment and Android build.

## 1. Put the project on GitHub
Upload the **contents** of this ZIP into a GitHub repository (not the ZIP inside another folder). Keep `package.json`, `server/`, `public/`, `render.yaml` and `capacitor.config.ts` at the repository root.

## 2. Deploy the live web/API server
Use Render → New → Web Service → connect the repository. The included `render.yaml` is configured for Node/Express. Render can build with `npm install` and start with `npm start`, and exposes a health check at `/api/health`.

Required secrets/environment values:
- `JWT_SECRET` — generated automatically by the Blueprint.
- `CORS_ORIGIN` — your final NEXORA URL, e.g. `https://your-app.onrender.com`.
- `NEXORA_AI_API_KEY` — your AI provider secret.
- `NEXORA_AI_MODEL` — the model name supported by your provider.
- M-Pesa Daraja credentials only when you are ready to activate payments.

**Never put an AI or Daraja secret in `app.js`, HTML, or the Android app.** They belong on the server.

## 3. Important persistence note
The current NEXORA app still uses a simple JSON data store for local/demo operation. That is fine for testing, but a serious production deployment should move user data to managed PostgreSQL and media to object storage. Render's default filesystem is not a durable database; use a persistent disk or, preferably, migrate to PostgreSQL/object storage before accepting real users and payments.

The server already supports configurable paths:
- `NEXORA_DATA_DIR`
- `NEXORA_UPLOAD_DIR`

These can point to a persistent disk during an interim deployment.

## 4. Make the Android app
The repository includes `capacitor.config.ts` and `.github/workflows/android-debug.yml`.

In GitHub, open **Actions → Build NEXORA Android APK → Run workflow**.

For the Android app to call your live backend, create a GitHub repository secret named `NEXORA_APP_URL` containing the full hosted NEXORA URL. The workflow then builds an APK artifact.

The generated debug APK is for testing. For Google Play release, add proper Android signing and build a signed AAB.

## 5. Final production checklist
- [ ] Live HTTPS domain
- [ ] PostgreSQL
- [ ] Persistent/object media storage
- [ ] Real AI provider key + model
- [ ] M-Pesa production credentials + HTTPS callback
- [ ] Rate limiting and monitoring
- [ ] Privacy policy / terms / account deletion
- [ ] Android signing key stored as GitHub secrets
- [ ] Play Console testing before public release
