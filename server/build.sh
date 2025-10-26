#!/bin/bash

# Update package list and install Java JDK
apt-get update && apt-get install -y openjdk-11-jdk

# Set Java environment variables
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin

# Install npm dependencies
npm install

# Install TypeScript globally
npm install -g typescript

# Verify installations
echo "Java version:"
java -version

echo "TypeScript version:"
tsc --version

echo "Build completed successfully!"
