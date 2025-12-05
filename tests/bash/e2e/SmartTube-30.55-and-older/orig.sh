#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

export smarttube_package='org.smartteam.smarttube.tv.orig'
export smarttube_class='com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity'

source "${DIR}/../common/send-Youtube-to-SmartTube-via-ExoAirPlayer.sh"
