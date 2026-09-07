# NEXORA Android build

The included GitHub Actions workflow can build a test APK in the cloud, so you do not need Android Studio on your phone.

1. Push the project to GitHub.
2. Add repository secret `NEXORA_APP_URL` with the live NEXORA HTTPS URL.
3. Open GitHub → Actions.
4. Select **Build NEXORA Android APK**.
5. Tap **Run workflow**.
6. Open the completed workflow and download the `nexora-debug-apk` artifact.

A signed Play Store AAB is a separate release step because the signing key must be kept private.
