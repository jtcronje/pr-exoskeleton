#!/bin/bash

# Check system requirements for running the Expo development server
# This script checks file descriptor limits which can cause EMFILE errors on macOS

echo "🔍 Checking system requirements..."

# Check if running on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "✓ Detected macOS"
    
    # Get current file descriptor limit
    CURRENT_LIMIT=$(ulimit -n)
    RECOMMENDED_LIMIT=4096
    
    echo "📊 Current file descriptor limit: $CURRENT_LIMIT"
    echo "📊 Recommended limit: $RECOMMENDED_LIMIT"
    
    if [ "$CURRENT_LIMIT" -lt "$RECOMMENDED_LIMIT" ]; then
        echo ""
        echo "⚠️  WARNING: File descriptor limit is too low!"
        echo "   This may cause 'EMFILE: too many open files' errors when running Metro bundler."
        echo ""
        echo "💡 To fix this, run:"
        echo "   ulimit -n 4096"
        echo ""
        echo "   Or add to your ~/.zshrc for permanent fix:"
        echo "   echo 'ulimit -n 4096' >> ~/.zshrc"
        echo "   source ~/.zshrc"
        echo ""
        exit 1
    else
        echo "✓ File descriptor limit is sufficient"
    fi
else
    echo "ℹ️  Not macOS - skipping file descriptor check"
fi

echo ""
echo "✅ System checks passed!"
echo "   You can now run 'npm start'"

