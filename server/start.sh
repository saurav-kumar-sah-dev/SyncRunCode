#!/bin/bash

# Try to install Java JDK with sudo if available
if ! command -v javac &> /dev/null; then
    echo "Installing Java JDK..."
    if command -v sudo &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y openjdk-11-jdk
    else
        # Try without sudo (might work in some environments)
        apt-get update && apt-get install -y openjdk-11-jdk 2>/dev/null || echo "Java installation failed - will use fallback"
    fi
    
    # Set Java environment if installation succeeded
    if command -v javac &> /dev/null; then
        export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
        export PATH=$PATH:$JAVA_HOME/bin
    fi
fi

# Install TypeScript if not available (this works fine)
if ! command -v tsc &> /dev/null; then
    echo "Installing TypeScript..."
    npm install -g typescript
fi

# Set JAVA_HOME if not set and Java is available
if [ -z "$JAVA_HOME" ] && command -v javac &> /dev/null; then
    export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
    export PATH=$PATH:$JAVA_HOME/bin
fi

# Verify installations (without verbose output to save memory)
echo "Checking Java..."
if command -v java &> /dev/null; then
    java -version 2>&1 | head -1
else
    echo "Java not available - will use fallback"
fi

echo "Checking TypeScript..."
if command -v tsc &> /dev/null; then
    tsc --version
else
    echo "TypeScript not available"
fi

# Start the application
npm start
