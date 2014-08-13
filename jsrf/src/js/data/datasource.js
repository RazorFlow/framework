define([
  "data/query"
], function (Query) {
  function DataSource() {
    var self = this,
        data = [],
        queries = [],
        applyingPatch = false,
        dataError = {
          status: false,
          msg: ""
        };

    self.url = null;

    self.pushRow = function (row) {
      data.push(row);
      triggerUpdates();
    };

    self.createQuery = function () {
      var query = new Query();
      query.setDataSource(self);
      queries.push(query);
      return query;
    };

    self.getRawData = function () {
      return data;
    };

    self.setRawData = function (_data) {
      data = _data;
    };

    self.clearRows = function () {
      data = [];
      triggerUpdates();
    };

    self.setURL = function (_url) {
      self.url = _url;
    };

    var triggerUpdates = function () {
      if(applyingPatch) {
        return;
      }
      for (var i = 0; i < queries.length; i++) {
        queries[i].triggerUpdates();
      }
    };
    
    self.addColumn = function (key, values) {
      var i, dataLen = data.length;
      if(data.length != 0 && data.length != values.length) {
        dataError.status = true;
        dataError.msg = "Array length did not match";
      }
      for (i = 0; i < values.length; i++) {
        if (i >= dataLen) {
          data[i] = {};
        }
        data[i][key] = values[i];
      }
      triggerUpdates();
    };

    self.getErrorStatus = function () {
      return dataError;
    };

    self.startApplyPatches = function () {
      applyingPatch = true;
    };

    self.endApplyPatches = function () {
      applyingPatch = false;
      triggerUpdates();
    };

    self.applyPatch = function (patchObj) {
      var action = patchObj.action, index = patchObj.index, params = patchObj.params;

      var applied = false;

      switch (action) {
        case 'setColumn':
        self.setColumn(index, params);
        applied = true;
        break;
        case 'pushRow':
        self.pushRow(params);
        applied = true;
        break;
        case 'addColumn':
        self.addColumn(index, params);
        applied = true;
        break;
        case 'clearRows':
        self.clearRows();
        applied = true;
        break;
        default:
        break;
      }
    };

    self.applyPatches = function (patches) {
      self.startApplyPatches();
      for(var i = 0; i < patches.length; i++) {
        self.applyPatch(patches[i]);
      }
      self.endApplyPatches();
    };
  }

  return DataSource;
});
