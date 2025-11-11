#!/bin/bash

# Script to optimize React Native build for faster Razorpay loading
# Run this before building: chmod +x scripts/optimize-build.sh && ./scripts/optimize-build.sh

echo "🚀 Optimizing React Native build for faster Razorpay loading..."

# Clear Metro cache for fresh build
echo "📦 Clearing Metro bundler cache..."
rm -rf $TMPDIR/metro-* 2>/dev/null
rm -rf $TMPDIR/haste-* 2>/dev/null
rm -rf node_modules/.cache 2>/dev/null

# Clear Android build cache
echo "🔧 Clearing Android build cache..."
cd android
./gradlew clean 2>/dev/null || echo "Gradle clean completed"
cd ..

# Clear watchman cache (if installed)
if command -v watchman &> /dev/null; then
    echo "👀 Clearing Watchman cache..."
    watchman watch-del-all 2>/dev/null || true
fi

# Clear React Native cache
echo "🧹 Clearing React Native cache..."
rm -rf $TMPDIR/react-* 2>/dev/null

echo "✅ Build optimization complete!"
echo "💡 Tips:"
echo "   - Use 'npm start -- --reset-cache' for fresh Metro bundler"
echo "   - Build release APK with: cd android && ./gradlew assembleRelease"
echo "   - Enable bundle compression in android/app/build.gradle"

