### [Youtube: send video to SmartTube via ExoAirPlayer](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/tree/webmonkey-userscript/es5)

Userscript to run in:
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

#### Download URL:

* SmartTube 30.55 and older
  - [beta](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.55-and-older/beta.user.js)
  - [__stable__](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.55-and-older/stable.user.js)
  - [orig](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.55-and-older/orig.user.js)
  - [rtarmenia](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.55-and-older/rtarmenia.user.js)
  - [redboxtv](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.55-and-older/redboxtv.user.js)
  - [firetv](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.55-and-older/firetv.user.js)
  - [aptoide](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.55-and-older/aptoide.user.js)
* SmartTube 30.56 and newer
  - [beta](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.56-and-newer/beta.user.js)
  - [__stable__](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.56-and-newer/stable.user.js)
  - [fdroid](https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.56-and-newer/fdroid.user.js)

#### SmartTube packages:

* SmartTube 30.55 and older
  - [packages](https://github.com/yuliskov/SmartTube/blob/27.99s/smarttubetv/build.gradle#L106-L137)
  - [class](https://github.com/yuliskov/SmartTube/blob/27.99s/smarttubetv/src/main/AndroidManifest.xml#L72) = `com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity`
* SmartTube 30.56 and newer
  - [packages](https://github.com/yuliskov/SmartTube/blob/30.56s/smarttubetv/build.gradle#L100-L111)
  - [class](https://github.com/yuliskov/SmartTube/blob/30.56s/smarttubetv/src/main/AndroidManifest.xml#L73) = `com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity`

#### Dependencies:

* [SmartTube](https://github.com/yuliskov/SmartTube)
  - tested [releases](https://github.com/yuliskov/SmartTube/releases):
    * [`27.99 stable`](https://github.com/yuliskov/SmartTube/releases/tag/27.99s)
    * [`30.56 stable`](https://github.com/yuliskov/SmartTube/releases/tag/30.56s)
* [ExoAirPlayer](https://github.com/warren-bank/Android-ExoPlayer-AirPlay-Receiver)
  - not required when this userscript:
    * runs in WebMonkey
    * is configured to start a local implicit Intent

#### Issues:

* [Browser security blocks mixed content XHR from HTTPS pages to HTTP API endpoints](https://github.com/warren-bank/Android-ExoPlayer-AirPlay-Receiver/issues/15)
  - describes browser-specific configuration for workarounds

#### Easter Egg:

* a set of command-line scripts that serve the same purpose
  - versions:
    * `bash`
      - SmartTube 30.55 and older
        * [beta](./tests/bash/e2e/SmartTube-30.55-and-older/beta.sh)
        * [__stable__](./tests/bash/e2e/SmartTube-30.55-and-older/stable.sh)
        * [orig](./tests/bash/e2e/SmartTube-30.55-and-older/orig.sh)
        * [rtarmenia](./tests/bash/e2e/SmartTube-30.55-and-older/rtarmenia.sh)
        * [redboxtv](./tests/bash/e2e/SmartTube-30.55-and-older/redboxtv.sh)
        * [firetv](./tests/bash/e2e/SmartTube-30.55-and-older/firetv.sh)
        * [aptoide](./tests/bash/e2e/SmartTube-30.55-and-older/aptoide.sh)
      - SmartTube 30.56 and newer
        * [beta](./tests/bash/e2e/SmartTube-30.56-and-newer/beta.sh)
        * [__stable__](./tests/bash/e2e/SmartTube-30.56-and-newer/stable.sh)
        * [fdroid](./tests/bash/e2e/SmartTube-30.56-and-newer/fdroid.sh)
    * Windows `cmd`
      - SmartTube 30.55 and older
        * [beta](./tests/cmd/e2e/SmartTube-30.55-and-older/beta.bat)
        * [__stable__](./tests/cmd/e2e/SmartTube-30.55-and-older/stable.bat)
        * [orig](./tests/cmd/e2e/SmartTube-30.55-and-older/orig.bat)
        * [rtarmenia](./tests/cmd/e2e/SmartTube-30.55-and-older/rtarmenia.bat)
        * [redboxtv](./tests/cmd/e2e/SmartTube-30.55-and-older/redboxtv.bat)
        * [firetv](./tests/cmd/e2e/SmartTube-30.55-and-older/firetv.bat)
        * [aptoide](./tests/cmd/e2e/SmartTube-30.55-and-older/aptoide.bat)
      - SmartTube 30.56 and newer
        * [beta](./tests/cmd/e2e/SmartTube-30.56-and-newer/beta.bat)
        * [__stable__](./tests/cmd/e2e/SmartTube-30.56-and-newer/stable.bat)
        * [fdroid](./tests/cmd/e2e/SmartTube-30.56-and-newer/fdroid.bat)
  - common behavior:
    * prompt for ExoAirPlayer IP and port
      - with configurable default values
    * prompt for Youtube video ID
      - which can also accept a full Youtube URL and extract its video ID value
    * use `curl` with ExoAirPlayer HTTP API
      - which needs to be in `PATH`

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
