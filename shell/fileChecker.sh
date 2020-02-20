APIJS=$(pwd)/client/src/constants/api.js
if [ -f "$APIJS" ]; then
    echo "api.js is existed!"
else
    echo "api.js is NOT existed!"
fi

echo ""

URLJS=$(pwd)/client/src/constants/url.js
if [ -f "$URLJS" ]; then
    echo "url.js is existed!"
else
    echo "url.js is NOT existed!"
fi

echo ""