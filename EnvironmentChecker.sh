APIJS=$(pwd)/client/src/constants/api.js
if [ -f "$APIJS" ]; then
    echo "     [ \033[0;32m#\033[0;37m ]  API.js is exist!\c"
else
    echo "     [ \033[0;31mX\033[0;37m ]  API.js is NOT exist!\c"
fi

echo ""
echo ""

URLJS=$(pwd)/client/src/constants/url.js
if [ -f "$URLJS" ]; then
    echo "     [ \033[0;32m#\033[0;37m ]  URL.js is exist!\c"
else
    echo "     [ \033[0;31mX\033[0;37m ]  URL.js is NOT exist!\c"
fi

echo ""