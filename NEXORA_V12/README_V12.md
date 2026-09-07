# NEXORA V13

This release focuses on the AI experience and removes the previous stale-cache trap.

## AI behavior
- Preview mode works without an API key.
- Chat input, Enter-to-send, history, new chat, voice input and speech output are wired in.
- Live AI is available through `NEXORA_AI_API_KEY` on the Node server.
- The browser never needs the provider key.

## Verification
- `node --check app.js`
- `node --check server/index.js`
