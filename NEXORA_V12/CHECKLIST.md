# NEXORA v7 QA checklist

## Fixed issues found in v6
- Demo mode had missing handlers for event RSVP, opportunity applications, post comments, post edit/delete and follow toggling.
- Marketplace contact button only showed a toast; it now opens the seller in Messages.
- Stories button was a placeholder; story upload/listing is now implemented.
- Education button was a placeholder; course progress is now stored and updated.
- Settings cards were mostly informational; notification/privacy settings now persist.
- Safety/reporting is now backed by report and block endpoints.
- Direct-message storage could be undefined in older database files; all collections are normalized.
- Application, story, notification and other collections are now safely initialized.
- Added payment-history endpoint/UI.
- Added application tracking UI.
- Added support-ticket endpoint/UI.
- Added data export.
- Added upload error handling for file type and 100 MB size limit.
- Updated version to 7.0 and health endpoint.

## Button/API audit
All current inline onclick handlers have matching JavaScript functions. The QA script can be run with:

`node qa/smoke-test.js`

## Run
1. Extract the ZIP completely.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000`.
5. Test registration/login, create post, media upload, edit/delete, like/comment/share/save, search, follow/block/message, group chat, stories, opportunities/applications, marketplace/contact seller, events/RSVP, education progress, profile upload, settings, data export and premium.

## Production items still required
- Real HTTPS domain for secure camera/microphone and M-Pesa callback.
- Real M-Pesa Daraja credentials and public callback URL.
- Production database/storage instead of JSON files.
- TURN server for reliable WebRTC behind restrictive NATs.
- Real email/password-reset and optional 2FA provider.
- Moderation/admin dashboard, rate limiting and abuse monitoring before public launch.
