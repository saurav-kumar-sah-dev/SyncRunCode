#!/bin/bash

# Install TypeScript if not available (this works fine)
if ! command -v tsc &> /dev/null; then
    echo "Installing TypeScript..."
    npm install -g typescript
fi

# Start the application
npm start
