// ==UserScript==
// @name         Youtube: send video to SmartTube via ExoAirPlayer
// @description  Add button to video player that sends the video to SmartTube. In WebMonkey, optionally start an implicit Intent on the local device. Otherwise, start an explicit Intent on a remote device via ExoAirPlayer HTTP API.
// @version      2.0.0
// @require      ../common.lib.js
// @match        *://*.youtube.com/watch?v=*
// @match        *://*.youtube.com/embed/*
// @icon         https://www.youtube.com/favicon.ico
// @run-at       document-end
// @grant        unsafeWindow
// @homepage     https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/tree/webmonkey-userscript/es5
// @supportURL   https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/issues
// @downloadURL  https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.56-and-newer/beta.user.js
// @updateURL    https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/SmartTube-30.56-and-newer/beta.user.js
// @namespace    warren-bank
// @author       Warren Bank
// @copyright    Warren Bank
// ==/UserScript==

// ----------------------------------------------------------------------------- SmartTube configs

var smarttube_configs = {
  "package": "org.smarttube.beta",
  "class":   "com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity"
}

// ----------------------------------------------------------------------------- user options

var user_options = {
  "common": {
    "post_intent_redirect_to_url": function(local_intent) {
      return local_intent ? "about:blank" : null
    }
  },
  "ExoAirPlayer": {
    "default_ip":   "192.168.0.3",
    "default_port": "8192"
  },
  "WebMonkey": {
    "start_local_intent": true
  }
}

// ----------------------------------------------------------------------------- bootstrap

window.initSmartTube(smarttube_configs, user_options, unsafeWindow)
