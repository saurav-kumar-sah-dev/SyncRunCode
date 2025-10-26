#!/bin/bash

# Install Java JDK if not available
if ! command -v javac &> /dev/null; then
    echo "Installing Java JDK..."
    apt-get update && apt-get install -y openjdk-11-jdk
    export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
    export PATH=$PATH:$JAVA_HOME/bin
fi

# Install TypeScript if not available
if ! command -v tsc &> /dev/null; then
    echo "Installing TypeScript..."
    npm install -g typescript
fi

# Set JAVA_HOME if not set
if [ -z "$JAVA_HOME" ]; then
    export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
    export PATH=$PATH:$JAVA_HOME/bin
fi

# Verify installations
echo "Java version:"
java -version 2>&1 || echo "Java not found"

echo "TypeScript version:"
tsc --version 2>&1 || echo "TypeScript not found"

# Start the application
npm start
