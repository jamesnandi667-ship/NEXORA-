# NEXORA Production Deployment Plan

## Target stack
- Web frontend: NEXORA responsive web app
- API: Node.js + Express
- Database: PostgreSQL
- Realtime: Socket.IO
- Calls: WebRTC + TURN
- File storage: Cloudinary/S3/R2
- Payments: M-Pesa Daraja + optional Stripe
- Hosting: managed Node.js service + managed PostgreSQL
- Domain: to be purchased and connected
- HTTPS: required for production

## Premium
Current planned price: KSh 100/month.

## M-Pesa
The supplied phone number is intended as the customer's payment number, not as a replacement for Daraja credentials. Do not place Daraja secrets in frontend code.

## Before production
1. Create a domain.
2. Create managed PostgreSQL.
3. Create backend hosting.
4. Create object storage.
5. Create/verify Daraja production app.
6. Configure HTTPS callback.
7. Add secrets as deployment environment variables.
8. Run database migrations.
9. Enable backups, logging, monitoring and rate limits.
10. Complete payment webhook reconciliation and security testing.

## Important
The local ZIP can be run without external credentials. Production services cannot be truthfully activated without the corresponding accounts and credentials.
