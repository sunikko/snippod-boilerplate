'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    accountDefault = require('../../constants/defaults').account,
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions');

var AccountStore = Reflux.createStore({

  listenables: AuthAccountActions,

  init: function() {
    this.account = Im.Map(accountDefault);
  },

  getAccount: function() {
    return this.account.toJS();
  },

  /* Listen AuthAccountActions
   ===============================*/
  _mergeAccountData: function(resData) {
    this.account = this.account.merge(Im.Map(resData));
    this.trigger(this.account.toJS());
  },

  onLoginCompleted: function(response) {
    this.account = this.account.merge(Im.Map(response.body.account));
    this.trigger(this.account.toJS());
  },

  onPreLoginCompleted: function(response) {
    this.account = this.account.merge(Im.Map(response.body.account));
    this.trigger(this.account.toJS());
  },

  onRegisterCompleted: function(response) {
    this.onLoginCompleted(response);
  },

  onUpdateSettingsCompleted: function(response) {
    this._mergeAccountData(response.body);
  },

  setAccount: function(accountData) {
    this.account = this.account.merge(Im.Map(accountData));
    this.trigger(this.account.toJS());
  }
});

module.exports = AccountStore;
