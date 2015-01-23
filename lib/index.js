var NotificationApi = require('./notification');
//var Db = require('./db');
var _ = require('underscore');
//var async = require('async');
var utils = require('hoodie-utils-plugins')('notification:index');
var ExtendedDatabaseAPI = utils.ExtendedDatabaseAPI;

module.exports = function (hoodie) {
  var notification = {};
//  var usersDb = new ExtendedDatabaseAPI(hoodie, hoodie.database('_users'));
//  var pluginDb = new Db(hoodie, 'plugins/hoodie-plugin-notification', usersDb);
  var dbPluginProfile = new ExtendedDatabaseAPI(hoodie, hoodie.database('plugins/hoodie-plugin-profile'));

  _.extend(notification,  new NotificationApi(hoodie));


  return notification;
};
