#!/bin/bash

set -e

FIREBASE_PROJECT_ID="hiteshsapra-e1a75"
HOSTING_SITE="hsapra"

export REACT_APP_FIREBASE_PROJECT_ID="$FIREBASE_PROJECT_ID"

echo "🔧 Building React app with Firebase Project ID: $REACT_APP_FIREBASE_PROJECT_ID"
npm run build

# ✅ Do NOT leave this directory
# cd ..

echo "🚀 Deploying to Firebase Hosting site: $HOSTING_SITE for project: $FIREBASE_PROJECT_ID"
firebase deploy --only hosting:$HOSTING_SITE -P $FIREBASE_PROJECT_ID

echo "✅ Deployment successful!"