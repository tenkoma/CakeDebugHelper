var CAKE_DEBUG_CONTROL;
CAKE_DEBUG_CONTROL = {
    enable: false,
    level: 0
};
window.addEventListener('load', extension_init, false);

var myExt_urlBarListener = {
  QueryInterface: function(aIID)
  {
   if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
       aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
       aIID.equals(Components.interfaces.nsISupports))
     return this;
   throw Components.results.NS_NOINTERFACE;
  },

  onLocationChange: function(aProgress, aRequest, aURI)
  {
    cakedebughelper_init();
  },

  onStateChange: function() {},
  onProgressChange: function() {},
  onStatusChange: function() {},
  onSecurityChange: function() {},
  onLinkIconAvailable: function() {}
};

function extension_init() {
    gBrowser.addProgressListener(myExt_urlBarListener,
            Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
}


var appcontent = document.getElementById("appcontent");
if(appcontent){
      appcontent.addEventListener("DOMContentLoaded", cakedebughelper_init, true);}
//window.addEventListener("DOMContentLoaded", cakedebughelper_init, false);


function cakedebughelper_init(){
    document.getElementById('status-bar').addEventListener("click", cakedebughelper_toggle, false);
    cakedebughelper_refresh_ui();
}

function cakedebughelper_toggle(e){
    var doc, isEnabled, sessionName, image;
    if (e.button !== 0) {
        return;
    }
    sessionName = 'CAKEDEBUG_SESSION';
    doc=window.content.document;
    isEnabled = (cakedebughelper_getCookie(doc, sessionName) > 0);
    if (!isEnabled && CAKE_DEBUG_CONTROL.level === 0) {
        CAKE_DEBUG_CONTROL.level = 1;
    }
    CAKE_DEBUG_CONTROL.enable = !isEnabled;
    cakedebughelper_setCookie(doc, sessionName, isEnabled?null:CAKE_DEBUG_CONTROL.level,isEnabled?-60:60);
    cakedebughelper_refresh_ui();
}

function cakedebughelper_setlevel(debug_lebel) {
    var doc, isEnabled, sessionName, image;
    sessionName = 'CAKEDEBUG_SESSION';
    doc=window.content.document;
    isEnabled = (debug_lebel === 0);
    CAKE_DEBUG_CONTROL.enable = isEnabled;
    CAKE_DEBUG_CONTROL.level = debug_lebel;
    cakedebughelper_setCookie(doc, sessionName, isEnabled?null:debug_lebel, isEnabled?-60:60);
    cakedebughelper_refresh_ui();
}

function cakedebughelper_refresh_ui() {
    var doc, level, isEnabled, levelText, level
    doc=window.content.document;
    sessionName = 'CAKEDEBUG_SESSION';
    isEnabled = (cakedebughelper_getCookie(doc, sessionName) > 0);
    image = document.getElementById('cakedebug_image');
    levelText = document.getElementById('debuglevel-panel');
    if (isEnabled) {
        image.src = 'chrome://cakedebughelper/skin/cakedebug_on.png';
    } else {
        image.src = 'chrome://cakedebughelper/skin/cakedebug_off.png';
    }
    level = cakedebughelper_getCookie(doc, sessionName);
    levelText.label = level || 0;
}

function cakedebughelper_setCookie(doc,cookieName, cookieVal,minutes) {
    var exp=new Date();
    exp.setTime(exp.getTime()+(minutes*60*1000));
    doc.cookie=cookieName+"="+cookieVal+"; expires="+exp.toGMTString()+"; path=/";
}
function cakedebughelper_getCookie(doc,name) {
    var prefix = name + "="
    var cookieStartIndex = doc.cookie.indexOf(prefix)
    if (cookieStartIndex == -1)
            return null
    var cookieEndIndex = doc.cookie.indexOf(";", cookieStartIndex + prefix.length)
    if (cookieEndIndex == -1)
            cookieEndIndex = doc.cookie.length
    return unescape(doc.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))
}
