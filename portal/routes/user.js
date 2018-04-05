module.exports = function (app, request, ports) {
    app.post('/endpoints/login', function (req, res) {
        var options = {
            method: 'POST',
            uri: `${req.protocol}://${req.hostname}:${ports.authentication}${process.env.LOGIN_ENDPOINT}`,
            body: req.body,
            json: true
        };
        request.post(options, function (error, response, body) {
            if (response.statusCode === 500) {
                res.redirect('/login.html#unauthorized');
                return;
            }
            req.session.user = body;
            res.redirect('/overview.html');
            return;
        });
    });

    app.post('/endpoints/signup', function (req, res) {
        console.log(req);
        var options = {
            method: 'POST',
            uri: `${req.protocol}://${req.hostname}:${ports.authentication}${process.env.SIGNUP_ENDPOINT}`,
            body: req.body,
            json: true
        };
        request.post(options, function (error, response, body) {
            console.log(error, response, body);
            if (response.statusCode === 500) {
                res.redirect('/signup.html#failed');
                return;
            }
            req.session.user = body;
            res.redirect('/overview.html');
            return;
        });
    });

    app.get('/endpoints/logout', function (req, res) {
        res.cookie("connect.sid", "", {expires: new Date()});
        req.session.destroy(function (err) {
            console.log("session destroyed");
            res.redirect('/index.html');
        });
    });
};
