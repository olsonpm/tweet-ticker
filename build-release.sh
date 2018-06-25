#!/usr/bin/env sh

rm -rf release
mkdir release
cp -r static release
cp -r views release
rm release/static/scripts/index.js

NODE_ENV=production node_modules/.bin/webpack --config-register esm --config webpack-config/client.js &
wpc=$!
NODE_ENV=production node_modules/.bin/webpack --config-register esm --config webpack-config/server.js

wait "${wpc}"

echo "done!"
