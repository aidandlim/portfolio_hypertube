id3000=(`sudo netstat -ntlp | grep :3000 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`)
sudo kill -9 ${id3000}
echo "Frontend server has been terminated"
id8443=(`sudo netstat -ntlp | grep :8443 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`)
sudo kill -9 ${id8443}
echo "Proxy server has been terminated"
id8444=(`sudo netstat -ntlp | grep :8444 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`)
sudo kill -9 ${id8444}
echo "Torrent server has been terminated"
id8445=(`sudo netstat -ntlp | grep :8445 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`)
sudo kill -9 ${id8445}
echo "Stream server has been terminated"
id8446=(`sudo netstat -ntlp | grep :8446 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`)
sudo kill -9 ${id8446}
echo "API server has been terminated"
id8447=(`sudo netstat -ntlp | grep :8447 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`)
sudo kill -9 ${id8447}
echo "Socket server has been terminated"