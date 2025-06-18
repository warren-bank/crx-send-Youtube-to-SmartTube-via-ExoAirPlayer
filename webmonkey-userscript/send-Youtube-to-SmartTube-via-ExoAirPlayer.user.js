// ==UserScript==
// @name         Youtube: send video to SmartTube via ExoAirPlayer
// @description  Add button to video player that sends the video to SmartTube. In WebMonkey, optionally start an implicit Intent on the local device. Otherwise, start an explicit Intent on a remote device via ExoAirPlayer HTTP API.
// @version      1.0.1
// @match        *://*.youtube.com/watch?v=*
// @match        *://*.youtube.com/embed/*
// @icon         https://www.youtube.com/favicon.ico
// @run-at       document-end
// @grant        unsafeWindow
// @homepage     https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/tree/webmonkey-userscript/es5
// @supportURL   https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/issues
// @downloadURL  https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/send-Youtube-to-SmartTube-via-ExoAirPlayer.user.js
// @updateURL    https://github.com/warren-bank/crx-send-Youtube-to-SmartTube-via-ExoAirPlayer/raw/webmonkey-userscript/es5/webmonkey-userscript/send-Youtube-to-SmartTube-via-ExoAirPlayer.user.js
// @namespace    warren-bank
// @author       Warren Bank
// @copyright    Warren Bank
// ==/UserScript==

// ----------------------------------------------------------------------------- user options

var user_options = {
  "ExoAirPlayer": {
    "default_ip":   "192.168.0.3",
    "default_port": "8192"
  },
  "WebMonkey": {
    "start_local_intent": true
  }
}

// ----------------------------------------------------------------------------- constants

var constants = {
  query_selector: {
    userscripts_row_container_parent: "div#above-the-fold",
    userscripts_row_container_prev_sibling: "div#top-row"
  },
  element_id: {
    userscripts_row_container: "userscripts-row"
  },
  button_text: {
    send_video_to_smarttube: "Sent to SmartTube"
  },
  inline_css: {
    userscripts_row_container: "position: relative; top: 0; left: 0; overflow: visible;",
    text_button: "background-color: #065fd4; color: #fff; padding: 10px 15px; border-radius: 18px; border-style: none; outline: none; font-weight: bold; cursor: pointer;"
  }
}

// ----------------------------------------------------------------------------- CSP

/*
 * add support for CSP 'Trusted Type' assignment
 */
var add_default_trusted_type_policy = function() {
  if (typeof unsafeWindow.trustedTypes !== 'undefined') {
    try {
      var passthrough_policy = function(string) {return string}

      unsafeWindow.trustedTypes.createPolicy('default', {
          createHTML:      passthrough_policy,
          createScript:    passthrough_policy,
          createScriptURL: passthrough_policy
      })
    }
    catch(e) {}
  }
}

// ----------------------------------------------------------------------------- helpers

var make_element = function(elementName, html) {
  var el = unsafeWindow.document.createElement(elementName)

  if (html)
    el.innerHTML = html

  return el
}

var cancel_event = function(event) {
  event.stopPropagation();event.stopImmediatePropagation();event.preventDefault();event.returnValue=false;
}

// ----------------------------------------------------------------------------- utils

var send_video_to_smarttube = function(event) {
  cancel_event(event)

  if ((typeof GM_startIntent === 'function') && user_options.WebMonkey.start_local_intent)
    send_video_to_smarttube_via_webmonkey()
  else
    send_video_to_smarttube_via_exoairplayer()
}

var send_video_to_smarttube_via_webmonkey = function() {
  var action = 'android.intent.action.VIEW'
  var data   = unsafeWindow.location.href
  var type   = ''

  GM_startIntent(action, data, type)
}

var send_video_to_smarttube_via_exoairplayer = function() {
  var ip   = unsafeWindow.prompt('ExoAirPlayer IP:', user_options.ExoAirPlayer.default_ip)
  var port = unsafeWindow.prompt('ExoAirPlayer Port:', user_options.ExoAirPlayer.default_port)

  var url = 'http://' + ip + ':' + port + '/start-activity'

  var headers = {
    "content-type": "text/parameters"
  }

  var data = [
    'package: com.teamsmart.videomanager.tv',
    'class: com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity',
    'data: ' + unsafeWindow.location.href,
    'action: android.intent.action.VIEW',
    'category: android.intent.category.DEFAULT',
    'category: android.intent.category.BROWSABLE',
    'flag: 0x10000000',
    'flag: 0x00008000'
  ].join("\n")

  var xhr = new unsafeWindow.XMLHttpRequest()

  xhr.open('POST', url, true, null, null)

  if (headers && (typeof headers === 'object')) {
    var keys = Object.keys(headers)
    var key, val
    for (var i=0; i < keys.length; i++) {
      key = keys[i]
      val = headers[key]
      xhr.setRequestHeader(key, val)
    }
  }

  xhr.send(data)
}

// ----------------------------------------------------------------------------- DOM: container element for userscripts UI

var add_userscripts_row_container = function(callback) {
  var prev_sibling = unsafeWindow.document.querySelector(
    constants.query_selector.userscripts_row_container_parent + ' > ' + constants.query_selector.userscripts_row_container_prev_sibling
  )
  if (!prev_sibling) {
    setTimeout(
      function() {
        add_userscripts_row_container(callback)
      },
      1000
    )
    return
  }
  // DOM is ready

  var userscripts_row_container = get_userscripts_row_container()
  if (userscripts_row_container) {
    // container has already been added to DOM (by another userscript with common UI)
    callback()
    return
  }

  userscripts_row_container = make_element('div')
  userscripts_row_container.setAttribute('id',    constants.element_id.userscripts_row_container)
  userscripts_row_container.setAttribute('style', constants.inline_css.userscripts_row_container)

  if (prev_sibling.nextSibling) {
    prev_sibling.parentNode.insertBefore(userscripts_row_container, prev_sibling.nextSibling)
  }
  else {
    prev_sibling.parentNode.appendChild(userscripts_row_container)
  }
  callback()
}

var get_userscripts_row_container = function() {
  return unsafeWindow.document.querySelector(constants.query_selector.userscripts_row_container_parent + ' > div#' + constants.element_id.userscripts_row_container)
}

// ----------------------------------------------------------------------------- DOM: button to send Youtube video to SmartTube

var add_send_video_to_smarttube_button = function() {
  var userscripts_row_container = get_userscripts_row_container()

  var send_video_to_smarttube_button = make_element('button', '<span>' + constants.button_text.send_video_to_smarttube + '</span>')
  send_video_to_smarttube_button.setAttribute('style', constants.inline_css.text_button)
  send_video_to_smarttube_button.addEventListener('click', send_video_to_smarttube)

  userscripts_row_container.appendChild(send_video_to_smarttube_button)
}

// ----------------------------------------------------------------------------- bootstrap

var page_init = function() {
  add_default_trusted_type_policy()

  add_userscripts_row_container(add_send_video_to_smarttube_button)
}

page_init()
