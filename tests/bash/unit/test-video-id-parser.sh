#!/usr/bin/env bash

video='abc'
video='https://www.youtube.com/watch?v=wP127Ln78Zw'
video='https://www.youtube.com/watch?v=wP127Ln78Zw&pp=0gcJCb4JAYcqIYzv'

# if a full Youtube video URL is entered at the input prompt,
# then extract its Youtube video ID:
regex='https?:.*v=([^&]+).*'
if [[ $video =~ $regex ]];then
  video=${BASH_REMATCH[1]}
fi

echo "$video"
