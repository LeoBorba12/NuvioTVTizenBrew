window.__NUVIO_PLATFORM__ = "tizen";
window.__NUVIO_TIZEN_ENGINEFS_SERVICE_ENABLED__ = false;
window.__NUVIO_TIZEN_ENGINEFS_SERVICE_ID__ = "NuvioTV001.EngineFsService";
window.__NUVIO_TIZEN_PLUGIN_SERVICE_ENABLED__ = false;
window.__NUVIO_TIZEN_PLUGIN_SERVICE_ID__ = "NuvioTV001.PluginService";

var tvInput = window.tizen && window.tizen.tvinputdevice;
if (tvInput && typeof tvInput.registerKey === "function") {
  [
    "Back",
    "Return",
    "MediaPlay",
    "MediaPause",
    "MediaPlayPause",
    "MediaStop",
    "MediaFastForward",
    "MediaRewind",
    "MediaTrackPrevious",
    "MediaTrackNext"
  ].forEach(function registerKey(keyName) {
    try {
      tvInput.registerKey(keyName);
    } catch (_) {}
  });
}

function loadScript(src) {
  var script = document.createElement("script");
  script.async = false;
  script.src = src;
  script.defer = false;
  script.onerror = function handleStartupScriptError() {
    if (window.NuvioBootGuard) {
      window.NuvioBootGuard.scriptFailed(src);
    }
  };
  if (window.NuvioBootGuard) {
    window.NuvioBootGuard.stage("Loading " + src);
  }
  document.body.appendChild(script);
}

function startNuvioApp() {
  loadScript("nuvio.env.js");
  loadScript("assets/libs/qrcode-generator.js");
  loadScript("app.bundle.js");
}

if (window.NuvioBootGuard && typeof window.NuvioBootGuard.runCompatibilityGate === "function") {
  window.NuvioBootGuard.runCompatibilityGate({"platform":"tizen","minVersion":4,"minChrome":56,"requiredLabel":"Samsung Tizen 4.0+ · Chromium 56+ (2018+)"}, startNuvioApp);
} else {
  startNuvioApp();
}


// Samsung Tizen 4.0 Remote Navigation & Autofocus Enforcer
(function initRemoteNavigation() {
  function ensureFocus() {
    var active = document.activeElement;
    if (!active || active === document.body || active === document.documentElement) {
      var candidate = document.querySelector('[tabindex="0"], button, a, [role="button"], [data-focusable="true"], .focusable');
      if (candidate && typeof candidate.focus === 'function') {
        candidate.focus();
      }
    }
  }

  // Poll briefly after load to grab focus
  var attempts = 0;
  var interval = setInterval(function() {
    ensureFocus();
    attempts++;
    if (attempts > 30) clearInterval(interval);
  }, 200);

  // When directional keys are pressed, prevent stuck state
  window.addEventListener('keydown', function(e) {
    var code = e.keyCode || e.which;
    // 37: Left, 38: Up, 39: Right, 40: Down, 13: Enter, 10009: Samsung Return
    if (code >= 37 && code <= 40) {
      ensureFocus();
    }
  }, true);
})();

