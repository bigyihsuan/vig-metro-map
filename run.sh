#!/usr/bin/bash

npm run build
cd dist
npx -y http-server -cors