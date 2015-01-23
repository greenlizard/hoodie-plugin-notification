/**
 * Hoodie plugin notification
 * Lightweight and easy notification
 */

/**
 * Dependencies
 */
var Notification = require('./lib');


/**
 * Notification worker
 */

module.exports = function (hoodie, callback) {
  var notification = new Notification(hoodie);


  hoodie.task.on('notification:add', notification.createNotification);



  callback();
};
