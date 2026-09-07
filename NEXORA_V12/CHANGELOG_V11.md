# NEXORA V11 — AI Workspace Rebuild

## AI fixes
- Fixed the empty AI response path in Preview/local mode.
- Added robust loading, retry and error states instead of leaving blank bubbles.
- Added safe numeric defaults for streak/level values so `undefined` is not shown.
- Added persistent AI conversation history with a New Chat control.
- Added Enter-to-send and Shift+Enter for multiline messages.
- Added voice input and text-to-speech response controls.
- Added Companion, Coach, Creator, Planner and Tutor modes.
- Added a provider-agnostic server-side AI adapter using an OpenAI-compatible Chat Completions endpoint.
- Added local NEXORA fallback so the UI still responds when no provider key is configured.

## UI rebuild
- Replaced the crowded AI card with a clean modern chat workspace inspired by current general-purpose AI products without copying their branding.
- Added animated NEXORA AI avatar/status indicator.
- Improved mobile layout and message readability.
- Added quick prompts and contextual suggestion chips.
