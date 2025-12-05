#!/usr/bin/env bash

default_ip='192.168.0.3'
default_port='8192'

echo "ExoAirPlayer IP [${default_ip}]: "
read ip

echo "ExoAirPlayer Port [${default_port}]: "
read port

echo 'Youtube video ID: '
read video

CR=$'\n'

# if a full Youtube video URL is entered at the input prompt,
# then extract its Youtube video ID:
regex='https?:.*v=([^&]+).*'
if [[ $video =~ $regex ]];then
  video=${BASH_REMATCH[1]}
fi

if [ -z "$ip" ];then
  host="$default_ip"
else
  host="$ip"
fi
if [ -z "$port" ];then
  host="${host}:${default_port}"
else
  host="${host}:${port}"
fi
if [ -n "$video" ];then
  curl "http://${host}/start-activity" -X "POST" -H "Content-Type: text/parameters" --data-binary "package: ${smarttube_package}${CR}class: ${smarttube_class}${CR}data: https://www.youtube.com/watch?v=${video}${CR}action: android.intent.action.VIEW${CR}category: android.intent.category.DEFAULT${CR}category: android.intent.category.BROWSABLE${CR}flag: 0x10000000${CR}flag: 0x00008000"
fi
