define (['utils/rflogger', 'utils/rfnotification', 'constants/debugconstants'], function (RFLogger, RFNotification, DebugConstants) {

  // window.__rfVersion = {channel: "stable", version: "0.0.9"};

  var currentVersion;
  var betaVersionRunning;
  var versionRunning = window.__rfVersion;
  var updateURL = DebugConstants.checkScriptURL;;
  var defaultLicense = "dev";
  var callbackMethod = "rf.jsonp.versionCheckCallback";


  var versionChecker = {

    init: function() {
      getVersion();
    },

    versionCallback: function(data) {
      currentVersion = data;
      check();
    }

  };

  var check = function() {
    if(olderVersion()) {
      window.localStorage.setItem('__rf_update_last_checked', new Date());
      window.localStorage.setItem('__rf_update_user_id', currentVersion.user_id);
      var upgrade_url = getUpgradeURL();
      RFNotification.create("<a href='" + upgrade_url + "' target='_BLANK' style='color: #FFF;'>You are using an older version of RazorFlow. Click here to update.</a>", null, null, true);
      rf.logger.log('You are using an older version of RazorFlow!');
    }
    else {
      return;
    }
  };

  var getVersion = function() {
    if(isVersionCheckable()) {
      var user_id = localStorage.getItem('__rf_update_user_id');
      var version_check_url = updateURL + "?v=" + versionRunning.version + "&l=" + defaultLicense + "&c=" + versionRunning.channel + "&id=" + user_id + "&callback=" + callbackMethod;
      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url: version_check_url,
        jsonp: false
      });
    }
    else {
      return;
    }
  };

  var isVersionCheckable = function() {
    if(window.localStorage) {
      var last_checked = window.localStorage.getItem('__rf_update_last_checked')

      if(last_checked === null) {
        return true;
      }
      else {
        var d1 = new Date();
        var d2 = new Date(last_checked);

        if((d1-d2) < 60*60*1000) {
          return false;
        }
      }

      return true;
    }
  };

  var olderVersion = function() {
    var versionCheck;

    if(isBetaVersion()) {
      versionCheck = validateVersion(currentVersion.beta.versionNumber, versionRunning.version);
    }
    else {
      versionCheck = validateVersion(currentVersion.stable.versionNumber, versionRunning.version);
    }

    return !versionCheck;
  };

  var validateVersion = function(actual, check) {
    if(check === actual) {
      return true;
    }

    return false;
  };

  var isBetaVersion = function() {
    if(versionRunning.channel === 'beta') {
      return true;
    }

    return false;
  };

  var getUpgradeURL = function() {
    var channel = versionRunning.channel,
        version = versionRunning.version,
        latest = (isBetaVersion() ? currentVersion.beta.versionNumber : currentVersion.stable.versionNumber);

    debugger

    return DebugConstants.upgradeURL + "?channel=" + channel + "&version=" + version + "&latest=" + latest;
  };

  return versionChecker;

});
