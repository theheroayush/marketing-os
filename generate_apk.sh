pnpm install
pnpm build
npx cap add android
./android/gradlew -p android assembleRelease
