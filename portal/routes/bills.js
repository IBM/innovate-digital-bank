const dateFormat = require('dateformat');
module.exports = function (app, request, ports) {
    app.get('/endpoints/bills/pay', function (req, res) {
        var params = {
            "uuid": req.session.user.uuid,
            "amount": req.query.amount,
            "currency": "AED",
            "description": req.query.entity,
            "date": dateFormat(new Date(), "mm, dd, yyyy"),
            "category": "bills"
        };
        var options = {
            method: 'POST',
            uri: `${req.protocol}://${req.hostname}:${ports.transactions}${process.env.CREATE_TRANSACTION_ENDPOINT}`,
            body: params,
            json: true
        };
        request.post(options, function (error, response, body) {
            if (response.statusCode === 500) {
                res.redirect('/bills.html#failure');
                return;
            }
            var params = {
                uuid: req.session.user.uuid,
                category: req.query.category,
                entity: req.query.entity,
                account_no: req.query.account,
                amount: 0.00,
                date: dateFormat(new Date(), "mm, dd, yyyy")
            };
            var options = {
                method: 'POST',
                uri: `${req.protocol}://${req.hostname}:${ports.bills}${process.env.UPSERT_BILL_ENDPOINT}`,
                body: params,
                json: true
            };
            request.post(options, function (error, response, body) {
                if (response.statusCode === 500) {
                    res.redirect('/bills.html#failure');
                    return;
                }
                res.redirect('/bills.html#success');
            });
        });
    });

    app.post('/endpoints/bills/get', function (req, res) {
        var options = {
            method: 'POST',
            uri: `${req.protocol}://${req.hostname}:${ports.bills}${process.env.GET_BILLS_ENDPOINT}`,
            body: req.body,
            json: true
        };
        request.post(options, function (error, response, body) {
            console.log('bills for ', req.body, ': ', body);
            res.send(body);
        });
    });
};
