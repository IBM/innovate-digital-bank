module.exports = function (app, request) {

  app.get('/endpoints/auth', function (req, res) {
    if (req.session.user) res.send({'uuid': req.session.user.uuid})
    else res.send({'err': 'unauthorized'})
  });

};
