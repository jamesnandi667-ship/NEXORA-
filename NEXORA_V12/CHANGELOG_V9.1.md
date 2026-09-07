# NEXORA v9.1 — Bug fixes, smarter AI, and gamification

## Bugs fixed
- **Removed dead duplicate code.** `server/index.js` had two conflicting handlers each for
  `POST /api/support` and `GET /api/notifications` — Express only ever ran the first one, so
  the second (better-validated) versions were unreachable dead code. Removed the duplicates.
- **Removed 21 duplicate function definitions in `public/app.js`** (`settings`, `profile`,
  `explore`, `messages`, `stories`, `events`, `notifications`, `render`, `post`, `doSearch`,
  and more). Later declarations silently shadowed earlier ones at runtime, doubling file size
  and risking confusion during future edits. Kept the most complete version of each.
- **Unified the database schema.** `server/db.js`, the shipped `server/data/db.json`, and a
  separate `normalizeDb()` helper in `index.js` each listed a different set of collections
  (`reports` and `supportTickets` were missing from `db.js`; several keys were missing from the
  seed file). `server/db.js` is now the single source of truth — `read()` always normalizes the
  full schema, and the redundant `normalizeDb()` function was removed along with all its call sites.
- **Fixed version string mismatch.** The server used to log "NEXORA v8" on startup while
  `package.json`/`/api/health` said 9.0, and Settings showed "Version 8.0". All now agree (9.1).
- Added `qa/smoke-test.js` coverage for the three new API routes below.

## AI assistant — rebuilt
The assistant no longer returns six canned strings. It now:
- Greets you by name, time-of-day aware, and mentions your current streak.
- Pulls **live data** for its answers — actual counts of open opportunities, recent listings
  with real prices, your unread message count, your course progress, trending posts by
  engagement, and top leaderboard members — instead of generic descriptions.
- Recognizes many more intents (greetings, thanks, "what can you do", events, communities,
  profile tips, streak/XP/leaderboard questions) with a much wider keyword net.
- Returns **quick-reply suggestion chips** under each answer so you can keep the conversation
  going with one tap instead of typing.

## New "vibe" features
- **Daily check-in streaks.** `GET/POST /api/checkin` — check in once a day to build a streak;
  breaking a day resets it. Streak milestones (every 7 days) trigger a celebratory notification.
- **XP & levels.** Posting and checking in earn XP; leveling up fires a confetti burst in the UI
  and a notification. Streak length gives a check-in bonus (up to +20 XP/day).
- **Leaderboard.** `GET /api/leaderboard` + a new Leaderboard page ranks members by XP with
  medals for the top 3 and shows your own rank.
- **UI polish** — animated gradient hero, hover lift on buttons/cards, a typing-dots animation
  while the AI "thinks", a pulsing gold streak badge, and a confetti animation on level-up.
- Streak badge now shows on both Home and the AI page.

## Not changed
Everything else — auth, posts, marketplace, opportunities, events, messaging, M-Pesa STK flow,
admin center, etc. — is untouched and still uses the flat-file JSON store described in
`FEATURES_V9.md`. That file's production caveats (real database, object storage, Daraja
credentials, TURN server for calls) still apply before deploying this for real users.
