# id3000=`sudo netstat -ntlp | grep :3000 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
# sudo kill -9 ${id3000}
# id8443=`sudo netstat -ntlp | grep :8443 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
# sudo kill -9 ${id8443}
# id8444=`sudo netstat -ntlp | grep :8444 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
# sudo kill -9 ${id8444}
# id8445=`sudo netstat -ntlp | grep :8445 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
# sudo kill -9 ${id8445}
# id8447=`sudo netstat -ntlp | grep :8447 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
# sudo kill -9 ${id8447}
# id8446=`sudo netstat -ntlp | grep :8446 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
# sudo kill -9 ${id8446}

kill -9 `lsof -i :3000` >/dev/null 2>&1
kill -9 `lsof -i :8443` >/dev/null 2>&1
kill -9 `lsof -i :8444` >/dev/null 2>&1
kill -9 `lsof -i :8445` >/dev/null 2>&1
kill -9 `lsof -i :8446` >/dev/null 2>&1
kill -9 `lsof -i :8447` >/dev/null 2>&1

sleep 3