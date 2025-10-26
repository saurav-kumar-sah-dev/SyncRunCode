#!/bin/bash

# Install Java JDK
echo "Installing Java JDK..."
apt-get update && apt-get install -y openjdk-11-jdk

# Install TypeScript
echo "Installing TypeScript..."
npm install -g typescript

# Set Java environment
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin

# Verify installations
echo "Java version:"
java -version

echo "TypeScript version:"
tsc --version

echo "Installation completed!"
