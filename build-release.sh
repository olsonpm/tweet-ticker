#!/usr/bin/env sh

rm -rf release
mkdir release
cp -r static release
cp -r views release
rm release/static/scripts/index.js

webpack --config webpack.client.config.js &
wpc=$!
webpack --config webpack.server.config.js

wait "${wpc}"

echo "done!"
