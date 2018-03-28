module.exports = function (app) {
    app.get('/endpoints/auth', function (req, res) {
        if (req.session.user) {
            res.send({'uuid': req.session.user.uuid});
        } else {
            res.status(500).send({'err': 'unauthorized'});
        }
    });
};
