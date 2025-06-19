### [Youtube: send video to SmartTube via ExoAirPlayer](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/tree/webmonkey-userscript/es5)

[Userscript](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/send-Youtube-to-SmartTube-via-ExoAirPlayer.user.js) to run in:
* the [WebMonkey](https://github.com/warren-bank/Android-WebMonkey) application
  - for Android
* the [Tampermonkey](https://www.tampermonkey.net/) web browser extension
  - for [Firefox/Fenix](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
  - for [Chrome/Chromium](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* the [Violentmonkey](https://violentmonkey.github.io/) web browser extension
  - for [Firefox/Fenix](https://addons.mozilla.org/firefox/addon/violentmonkey/)
  - for [Chrome/Chromium](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag)

Its purpose is to:
* add a button to the Youtube video player that sends the video to SmartTube
  - in WebMonkey, optionally start an implicit Intent on the local device
  - otherwise, start an explicit Intent on a remote device via ExoAirPlayer HTTP API

#### Dependencies:

* [SmartTube](https://github.com/yuliskov/SmartTube)
  - tested [releases](https://github.com/yuliskov/SmartTube/releases):
    * [`27.99 Stable`](https://github.com/yuliskov/SmartTube/releases/tag/27.99s)
      - [package](https://github.com/yuliskov/SmartTube/blob/27.99s/smarttubetv/build.gradle#L113) = `com.teamsmart.videomanager.tv`
      - [class](https://github.com/yuliskov/SmartTube/blob/27.99s/smarttubetv/src/main/AndroidManifest.xml#L72) = `com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity`
* [ExoAirPlayer](https://github.com/warren-bank/Android-ExoPlayer-AirPlay-Receiver)
  - not required when this userscript:
    * runs in WebMonkey
    * is configured to start a local implicit Intent

#### Issues:

* [Browser security blocks mixed content XHR from HTTPS pages to HTTP API endpoints](https://github.com/warren-bank/Android-ExoPlayer-AirPlay-Receiver/issues/15)
  - describes browser-specific configuration for workarounds

#### Easter Egg:

* the [`./bin`](./bin) directory contains command-line scripts that serve the same purpose
  - versions:
    * [bash](./bin/send-Youtube-to-SmartTube-via-ExoAirPlayer.sh)
    * [Windows cmd](./bin/send-Youtube-to-SmartTube-via-ExoAirPlayer.bat)
  - they both:
    * prompt for ExoAirPlayer IP and port
      - with configurable default values
    * prompt for Youtube video ID
      - which can also accept a full Youtube URL and extract its video ID value
    * use `curl` with ExoAirPlayer HTTP API
      - which needs to be in `PATH`

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
