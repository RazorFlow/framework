define (['utils/rflogger', 'utils/rfnotification'], function (RFLogger, RFNotification) {

  var currentVersion;
  var betaVersionRunning;
  var versionRunning = window.__rfVersion;
  var updateURL = "http://localhost:8089/update/check.php";
  var defaultLicense = "dev";

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
      window.localStorage.setItem('last_checked', new Date());
      window.localStorage.setItem('user_id', currentVersion.user_id);
      var upgrade_url = 'http://razorflow.com/upgrade';
      RFNotification.create("<a href='" + upgrade_url + "' target='_BLANK' style='color: #FFF;'>You are using an older version of RazorFlow. Click here to update.</a>", null, null, true);
      rf.logger.log('You are using an older version of RazorFlow!');
    }
    else {
      return;
    }
  };

  var getVersion = function() {
    if(isVersionCheckable()) {
      var user_id = localStorage.getItem('user_id');
      var version_check_url = updateURL + "?v=" + versionRunning.version + "&l=" + defaultLicense + "&c=" + versionRunning.channel + "&id=" + user_id;
      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url: version_check_url
      });
    }
    else {
      return;
    }
  };

  var isVersionCheckable = function() {
    if(window.localStorage) {
      var last_checked = window.localStorage.getItem('last_checked')

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
  }

  var isBetaVersion = function() {
    if(versionRunning.channel === 'beta') {
      return true;
    }

    return false;
  }

  return versionChecker;

});
