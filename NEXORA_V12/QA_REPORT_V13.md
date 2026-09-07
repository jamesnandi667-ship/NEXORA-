# NEXORA V13 QA REPORT

## Static checks
- Root `app.js`: Node syntax check passed.
- `public/app.js`: synchronized with root and syntax checked through `npm test` command definition.
- `server/index.js`: Node syntax check passed.
- `server/db.js`: Node syntax check passed.
- Root/public `index.html`: synchronized and versioned `13.0.0`.
- Root/public `styles.css`: synchronized.

## Deployment checks
- `package.json` version updated to 13.0.0.
- Render Blueprint added.
- Health endpoint configured at `/api/health`.
- Server binds to `0.0.0.0` by default for hosted deployment.
- Data and upload directories are configurable through environment variables.
- Capacitor Android configuration added.
- GitHub Actions workflow added for cloud debug APK builds.

## Production limitations that are intentionally documented
- Current JSON database is suitable for local/demo operation but should be migrated to managed PostgreSQL for serious production.
- Uploaded media currently uses filesystem storage; object storage or a persistent disk is recommended for production.
- Real AI, M-Pesa, email/SMS and other external services require the user's own provider accounts and server-side secrets.
- The Android workflow creates a debug APK for testing; Play Store release requires signing and a release AAB.
