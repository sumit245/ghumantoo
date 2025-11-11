#!/bin/bash

# Script to start Metro bundler and run Android app
# This script handles port conflicts and ensures clean startup

echo "🚀 Starting Metro bundler with clean cache..."

# Kill any existing Metro bundler on port 8081
if lsof -ti:8081 > /dev/null 2>&1; then
    echo "🛑 Stopping existing Metro bundler on port 8081..."
    lsof -ti:8081 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Start Metro bundler in background with clean cache
echo "📦 Starting Metro bundler..."
react-native start --reset-cache &
METRO_PID=$!

# Wait for Metro to start
echo "⏳ Waiting for Metro bundler to start..."
sleep 5

# Check if Metro started successfully
if ! kill -0 $METRO_PID 2>/dev/null; then
    echo "❌ Metro bundler failed to start"
    exit 1
fi

echo "✅ Metro bundler started successfully (PID: $METRO_PID)"
echo "📱 Running Android app..."

# Run Android app
react-native run-android

# When Android run completes, Metro will continue running in background
# User can stop it manually with Ctrl+C or by killing the process
