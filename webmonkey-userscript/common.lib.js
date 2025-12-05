window.initSmartTube = function(_smarttube_configs, _user_options, _unsafeWindow) {

  if (!window.unsafeWindow) window.unsafeWindow = _unsafeWindow

  // ----------------------------------------------------------------------------- SmartTube configs

  var smarttube_configs = {
    "package": "org.smarttube.stable",
    "class":   "com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity"
  }

  smarttube_configs = Object.assign(smarttube_configs, _smarttube_configs)

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

  user_options = Object.assign(user_options, _user_options)

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
      send_video_to_smarttube: "Send to SmartTube"
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
    if (typeof window.unsafeWindow.trustedTypes !== 'undefined') {
      try {
        var passthrough_policy = function(string) {return string}

        window.unsafeWindow.trustedTypes.createPolicy('default', {
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
    var el = window.unsafeWindow.document.createElement(elementName)

    if (html)
      el.innerHTML = html

    return el
  }

  var cancel_event = function(event) {
    event.stopPropagation();event.stopImmediatePropagation();event.preventDefault();event.returnValue=false;
  }

  // ----------------------------------------------------------------------------- URL handlers

  var redirect_to_url = function(url) {
    if (!url) return

    if (typeof GM_loadUrl === 'function') {
      if (typeof GM_resolveUrl === 'function')
        url = GM_resolveUrl(url, window.unsafeWindow.location.href) || url

      GM_loadUrl(url, 'Referer', window.unsafeWindow.location.href)
    }
    else {
      try {
        window.unsafeWindow.top.location = url
      }
      catch(e) {
        window.unsafeWindow.window.location = url
      }
    }
  }

  var process_post_intent_redirect_to_url = function(local_intent) {
    var url = null

    if (typeof user_options.common.post_intent_redirect_to_url === 'string')
      url = user_options.common.post_intent_redirect_to_url

    if (typeof user_options.common.post_intent_redirect_to_url === 'function')
      url = user_options.common.post_intent_redirect_to_url(local_intent)

    if (typeof url === 'string')
      redirect_to_url(url)
  }

  // ----------------------------------------------------------------------------- utils

  var send_video_to_smarttube = function(event) {
    cancel_event(event)

    var local_intent = ((typeof GM_startIntent === 'function') && user_options.WebMonkey.start_local_intent)

    if (local_intent)
      send_video_to_smarttube_via_webmonkey()
    else
      send_video_to_smarttube_via_exoairplayer()

    process_post_intent_redirect_to_url(local_intent)
  }

  var send_video_to_smarttube_via_webmonkey = function() {
    var action = 'android.intent.action.VIEW'
    var data   = window.unsafeWindow.location.href
    var type   = ''

    GM_startIntent(action, data, type)
  }

  var send_video_to_smarttube_via_exoairplayer = function() {
    var ip   = window.unsafeWindow.prompt('ExoAirPlayer IP:', user_options.ExoAirPlayer.default_ip)
    var port = window.unsafeWindow.prompt('ExoAirPlayer Port:', user_options.ExoAirPlayer.default_port)

    var url = 'http://' + ip + ':' + port + '/start-activity'

    var headers = {
      "content-type": "text/parameters"
    }

    var data = [
      'package: ' + smarttube_configs.package,
      'class: '   + smarttube_configs.class,
      'data: '    + window.unsafeWindow.location.href,
      'action: android.intent.action.VIEW',
      'category: android.intent.category.DEFAULT',
      'category: android.intent.category.BROWSABLE',
      'flag: 0x10000000',
      'flag: 0x00008000'
    ].join("\n")

    var xhr = new window.unsafeWindow.XMLHttpRequest()

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
    var prev_sibling = window.unsafeWindow.document.querySelector(
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
    return window.unsafeWindow.document.querySelector(constants.query_selector.userscripts_row_container_parent + ' > div#' + constants.element_id.userscripts_row_container)
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
}
