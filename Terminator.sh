id3000=`sudo netstat -ntlp | grep :3000 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
sudo kill -9 ${id3000}
echo "\t     [ \033[0;32m#\033[0;37m ]  Terminating the React Frontend Server.\c"
echo ""
echo ""
id8443=`sudo netstat -ntlp | grep :8443 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
sudo kill -9 ${id8443}
echo "\t     [ \033[0;32m#\033[0;37m ]  Terminating the Proxy Server.\c"
echo ""
echo ""
id8444=`sudo netstat -ntlp | grep :8444 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
sudo kill -9 ${id8444}
echo "\t     [ \033[0;32m#\033[0;37m ]  Terminating the Torrent Server.\c"
echo ""
echo ""
id8445=`sudo netstat -ntlp | grep :8445 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
sudo kill -9 ${id8445}
echo "\t     [ \033[0;32m#\033[0;37m ]  Terminating the Stream Server.\c"
echo ""
echo ""
id8447=`sudo netstat -ntlp | grep :8447 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
sudo kill -9 ${id8447}
echo "\t     [ \033[0;32m#\033[0;37m ]  Terminating the Socket Server.\c"
echo ""
echo ""
id8446=`sudo netstat -ntlp | grep :8446 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
sudo kill -9 ${id8446}
echo "\t     [ \033[0;32m#\033[0;37m ]  Terminating the API Server.\c"
echo ""