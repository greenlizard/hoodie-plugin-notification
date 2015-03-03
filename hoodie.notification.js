/**
 * Hoodie plugin notification
 * Lightweight and easy notification
 */

/* global Hoodie */

Hoodie.extend(function (hoodie) {
  'use strict';

  hoodie.notification = {

    getProfile: function (userName) {
      var defer = window.jQuery.Deferred();
      defer.notify('getProfile', arguments, false);
      if (!userName) {
        hoodie.profile.get()
          .then(defer.resolve)
          .fail(defer.reject);
      } else {
        hoodie.profile.getByUserName(userName)
          .then(function (task) {
            defer.resolve({
              profile: task.profile
            });
          })
          .fail(defer.reject);
      }
      return defer.promise();
    },

    create: function (/*optional*/ from, to, notificationType, /*optional*/ view,/*optional*/ map) {

      if (!notificationType) { // from is optional
        notificationType = to;
        to = from;
        from = hoodie.id();
      }

      var defer = window.jQuery.Deferred();
      defer.notify('notification:create', arguments, false);
      var task = {
        notification: {
          from: from,
          to: to,
          notificationType: notificationType,
          status: 'new'
        }
      };
      hoodie.task('notification').start(task)
        .then(defer.resolve)
        .fail(defer.reject);
      hoodie.remote.push();
      return defer.promise();
    },
    on: function (cb) {
      hoodie.remote.on('notification:add', function (doc) {
        out('notification', doc, 'on');
        if (doc.status === 'new') {
          doc.status = 'read';
          hoodie.store.update('notification', doc.id, doc)
            .then(function () {
              cb(null, doc);
            })
            .fail(cb);
        } else {
          cb(null, doc);
        }
      });
    },
    list: function () {
      var defer = window.jQuery.Deferred();
      defer.notify('notification:create', arguments, false);
      hoodie.store.findAll('notification')
        .then(defer.resolve)
        .fail(defer.reject);
      return defer.promise();
    },
    desactive: function (userId, notificationType) {
      var defer = window.jQuery.Deferred();
      defer.notify('requestFriend', arguments, false);
      hoodie.notification.list()
        .then(function (notifications) {
          var _defer = window.jQuery.Deferred();
          _defer.resolve(
            notifications
              .filter(function (v) {
                return (v.from === userId && v.notificationType === notificationType);
              })
              .reduce(function (b, c) {
                return c || b;
              }, {})
          );
          return _defer.promise();
        })
        .then(function (notification) {
          var _defer = window.jQuery.Deferred();

          var nbkp = {
            from: notification.from,
            notificationType: notification.notificationType,
            status: notification.status,
            to: notification.to
          };

          hoodie.store.add('notificationbkp', nbkp)
            .then(function () {
              _defer.resolve(notification.id);
            })
            .fail(_defer.reject);
          return _defer.promise();
        })
        .then(function (id) {
          var _defer = window.jQuery.Deferred();
          hoodie.store.remove('notification', id)
            .then(_defer.resolve)
            .fail(_defer.reject);
          return _defer.promise();
        })
        .then(defer.resolve)
        .fail(defer.resolve);

      return defer.promise();
    }
  };

  // var debugPromisseGstart = function (text) {
  //   var defer = window.jQuery.Deferred();
  //   (window.debug === 'notification') && console.groupCollapsed(text);
  //   defer.resolve({});
  //   return defer.promise();
  // };

  // var debugPromisseGend = function () {
  //   var defer = window.jQuery.Deferred();
  //   (window.debug === 'notification') && console.groupEnd();
  //   defer.resolve({});
  //   return defer.promise();
  // };

  function out(name, obj, task) {
    if (window.debug === 'notification') {
      var group = (task) ? 'task: ' + task + '(' + name + ')': 'method: ' + name;

      console.groupCollapsed(group);
      if (!!obj)
        console.table(obj);
      console.groupEnd();
    }
  }

  if (window.debug === 'notification') {
    hoodie.task.on('start', function () {
      out('start', arguments[0], arguments[0].type);
    });

    // task aborted
    hoodie.task.on('abort', function () {
      out('abort', arguments[0], arguments[0].type);
    });

    // task could not be completed
    hoodie.task.on('error', function () {
      out('error', arguments, arguments[1].type);
    });

    // task completed successfully
    hoodie.task.on('success', function () {
      out('success', arguments[0], arguments[0].type);
    });
  }
});
