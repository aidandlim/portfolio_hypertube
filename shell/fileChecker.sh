FILES=0

APIJS=$(pwd)/client/src/constants/api.js
if [ -f "$APIJS" ]; then
    FILES=`expr $FILES + 1`
fi

URLJS=$(pwd)/client/src/constants/url.js
if [ -f "$URLJS" ]; then
    FILES=`expr $FILES + 1`
fi

if [ $FILES -eq 2 ]; then
    echo "VALID"
else
    echo "INVALID"
fi