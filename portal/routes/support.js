module.exports = function (app, request) {
    app.post('/endpoints/support/chat', function (req, res) {
        var options = {
            method: 'POST',
            uri: `${req.protocol}://${req.hostname}${process.env.CHAT_ENDPOINT}`,
            body: req.body,
            json: true
        };
        request.post(options, function (error, response, body) {
            console.log('support for ', req.body, ': ', body);
            res.send(body);
        });
    });
};
