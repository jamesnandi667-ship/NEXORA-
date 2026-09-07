# NEXORA AI setup

NEXORA keeps provider credentials on the server. Never place an AI API key in `public/app.js`.

Set these variables in the server environment (copy from `.env.example`):

- `NEXORA_AI_API_KEY` — provider API key
- `NEXORA_AI_BASE_URL` — OpenAI-compatible API base URL
- `NEXORA_AI_MODEL` — model name supplied by the provider

Example default base URL:
`https://api.openai.com/v1`

If these are not configured, NEXORA automatically uses its local fallback so messages still receive a response. The local fallback is not a full language model; connecting a supported provider enables the full general-purpose conversational experience.

## Run

1. Install dependencies with `npm install`.
2. Configure the server environment.
3. Start with `npm start`.
4. Open the local NEXORA address shown by the server.
