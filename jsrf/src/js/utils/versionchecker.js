define (['utils/rflogger', 'utils/rfnotification', 'constants/debugconstants'], function (RFLogger, RFNotification, DebugConstants) {

  window.__rfVersion = {channel: "stable", version: "0.0.9"};

  var currentVersion;
  var betaVersionRunning;
  var versionRunning = window.__rfVersion;
  var updateURL = DebugConstants.checkScriptURL;;
  var defaultLicense = "dev";
  var callbackMethod = "rf.jsonp.versionCheckCallback";
  var disableUpdateChecker = false;


  var versionChecker = {

    init: function() {
      getVersion();
    },

    versionCallback: function(data) {
      currentVersion = data;
      check();
    },

    disable: function() {
      disableUpdateChecker = true;
    }

  };

  var check = function() {
    window.localStorage.setItem('__rf_update_last_checked', new Date());
    window.localStorage.setItem('__rf_update_user_id', currentVersion.user_id);
    if(olderVersion()) {
      window.localStorage.setItem('__rf_latest_version', false);
      showNotice();
    }
    else {
      window.localStorage.setItem('__rf_latest_version', true);
      return;
    }
  };

  var showNotice = function() {
    var upgrade_url = getUpgradeURL();
    RFNotification.create("<a href='" + upgrade_url + "' target='_BLANK' style='color: #FFF;'>You are using an older version of RazorFlow. Click here to update.</a>", null, null, true);
    rf.logger.log('You are using an older version of RazorFlow!');
  }

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
    if(disableUpdateChecker) {
      return false;
    }
    else {
      if(window.localStorage) {
        var last_checked = window.localStorage.getItem('__rf_update_last_checked');
        var status = window.localStorage.getItem('__rf_latest_version');

        if(status === null) {
          return true;
        }
        else {
          status = JSON.parse(status);
          if(!status) {
            showNotice();
            return false;
          }
          else {
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
          }

        }

        return true;
      }
    }
  };

  var olderVersion = function() {
    var versionCheck;

    if(isBetaVersion()) {
      versionCheck = validateVersion(currentVersion.beta.versionString, versionRunning.version);
    }
    else {
      versionCheck = validateVersion(currentVersion.stable.versionString, versionRunning.version);
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
        version = versionRunning.version;


    return DebugConstants.upgradeURL + "?channel=" + channel + "&version=" + version;
  };

  return versionChecker;

});
