APIJS=$(pwd)/client/src/constants/api.js
if [ -f "$APIJS" ]; then
    echo "     [ \033[0;32m#\033[0;37m ]  API.js is exist!"
else
    echo "     [ \033[0;31mX\033[0;37m ]  API.js is NOT exist! (run make apijs)"
fi

echo ""

URLJS=$(pwd)/client/src/constants/url.js
if [ -f "$URLJS" ]; then
    echo "     [ \033[0;32m#\033[0;37m ]  URL.js is exist!"
else
    echo "     [ \033[0;31mX\033[0;37m ]  URL.js is NOT exist! (run make urljs)"
fi

echo ""

FFMPEG=$(pwd)/stream/resources/ffmpeg
if [ -f "$FFMPEG" ]; then
    echo "     [ \033[0;32m#\033[0;37m ]  FFMPEG is exist!"
else
    echo "     [ \033[0;31mX\033[0;37m ]  FFMPEG is NOT exist! (run make ffmpeg)"
fi