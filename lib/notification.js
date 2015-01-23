/**
 * Dependencies
 */

var async = require('async');
var utils = require('hoodie-utils-plugins')('notification:notification');
var log = utils.debug();
var ExtendedDatabaseAPI = utils.ExtendedDatabaseAPI;

module.exports = function (hoodie) {
  var Notification = this;

  var _verifyAttrs = function (task, attr, cb) {
    log('_verifyAttrs', task);
    if (!attr || !task[attr]) {
      return cb('Pls, fill the param: ' + attr);
    }
    cb();
  };

  var _createNotification = function (task, db, cb) {
    log('_createNotification', task);
    var _db = new ExtendedDatabaseAPI(hoodie, hoodie.database('user/' + task.notification.to));
    task.notification.id = (Date.now()).toString(36);
    _db.add('notification', task.notification, cb);
  };

  Notification.createNotification = function (db, task, cb) {
    log('createNotification', task);
    async.series([
        async.apply(_verifyAttrs, task, 'notification'),
        async.apply(_verifyAttrs, task.notification, 'from'),
        async.apply(_verifyAttrs, task.notification, 'to'),
        async.apply(_verifyAttrs, task.notification, 'status'),
        async.apply(_verifyAttrs, task.notification, 'notificationType'),
        async.apply(_createNotification, task, db)
      ],
      utils.handleTask(hoodie, 'createNotification', db, task, cb)
    );
  };

  return Notification;
};
