grunt build --force
cp -r dist/index.html dist/components dist/scripts dist/styles dist/views ios/habits/www
./ios/habits/cordova/build
./ios/habits/cordova/run
