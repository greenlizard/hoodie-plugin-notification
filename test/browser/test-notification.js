suite('notification', function () {
  this.timeout(15000);

  suiteSetup(loadUsers);


  var callback = sinon.spy();
  suiteSetup(function () {
    hoodie.notification.on(callback);
  })

  function getId (username) {
    return _.find(window.fixtures.users, { username: username }).hoodieId
  }

  test('signIn hommer', function (done) {
    hoodie.account.signIn('Hommer', '123')
      .fail(function (err) {
        done();
        assert.ok(false, err.message);
      })
      .done(function () {
        assert.equal(
          hoodie.account.username,
          'hommer',
          'should be logged in after signup'
        );
        done();
      });
  });

  test('hommer should send a notification to Krust iGetBeer', function (done) {
    //from, to, notificationType
      hoodie.notification.create(getId('Krust'), 'iGetBeer')
        .fail(function (err) {
          done(err);
          assert.ok(false, err.message);
        })
        .then(function (task) {
          assert.ok(true , 'send notification with sucess');
          done();
        }.bind(this))
        .pipe(function () {
          signinUser('krust', '123', function () {})
        })
  });

  test('Krust should have a iGetBeer notification from Hommer', function (done) {

    //make sure our spy was fired once and only once
    assert.ok(callback.callCount > 0, 'notification ok: ' + callback.callCount );
    done();
  });

  test('Krust should list notification', function (done) {

    hoodie.notification.list()
      .fail(function (err) {
          done(err);
          assert.ok(false, err.message);
        })
      .then(function (notifications) {
        this.mooNotification = notifications[0];
        assert.ok(notifications.length > 0, 'has more then on notification');
        done();
      }.bind(this));

  });

});

