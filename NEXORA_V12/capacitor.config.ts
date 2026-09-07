import type { CapacitorConfig } from '@capacitor/cli';

const liveUrl = process.env.NEXORA_APP_URL?.trim();

const config: CapacitorConfig = {
  appId: 'com.nexora.app',
  appName: 'NEXORA',
  webDir: 'public',
  server: liveUrl ? { url: liveUrl, cleartext: false } : undefined,
  android: { allowMixedContent: false }
};

export default config;
