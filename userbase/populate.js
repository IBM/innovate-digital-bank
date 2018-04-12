module.exports = function (request, basePath, ports, dateFormat) {
    var randomEntries = {
        bills: [
            {
                category: 'utilities',
                entity: 'DEWA'
            },
            {
                category: 'home_entertainment',
                entity: 'Etisalat'
            },
            {
                category: 'mobile_phone',
                entity: 'Du'
            },
            {
                category: 'credit_card',
                entity: 'Innovate'
            }
        ],
        transactions: [
            {
                category: 'groceries',
                description: [
                    'Carrefour',
                    'Lulu Hypermarket',
                    'Geant',
                    'Waitrose',
                    'Spinneys'
                ]
            },
            {
                category: 'eating_out',
                description: [
                    'Krush Burgers',
                    'Clinton Baking St',
                    'Mamaeesh',
                    'Starbucks',
                    'Costa Coffee',
                    'Blaze Burgers',
                    'Cheesecake Factory'
                ]
            },
            {
                category: 'transport',
                description: [
                    'Uber',
                    'Careem'
                ]
            },
            {
                category: 'bills',
                description: [
                    'Utilities',
                    'Home entertainment',
                    'Phone',
                    'Credit card'
                ]
            },
            {
                category: 'expenses',
                description: [
                    'Municipality fee',
                    'VAT',
                    'Shopping',
                    'Electronics',
                    'Shoes'
                ]
            },
            {
                category: 'cash',
                description: [
                    'Withdrawal',
                    'Transfer'
                ]
            },
            {
                category: 'holidays',
                description: [
                    'Flight ticket',
                    'Hotel booking'
                ]
            }
        ]
    };

    function createTransaction(uuid) {
        let amount = Math.floor(Math.random() * Math.floor(1200)) + '';
        let date = dateFormat(new Date(), "mm, dd, yyyy");
        let randomCategoryIndex = Math.floor(Math.random() * Math.floor(randomEntries.transactions.length));
        let randomDescriptionIndex = Math.floor(Math.random() * Math.floor(randomEntries.transactions[randomCategoryIndex].description.length));
        var body = {
            uuid: uuid,
            amount: amount,
            currency: 'AED',
            category: randomEntries.transactions[randomCategoryIndex].category,
            description: randomEntries.transactions[randomCategoryIndex].description[randomDescriptionIndex],
            date: date
        };
        console.log('Adding transaction: ');
        console.log(body);
        var options = {
            method: 'POST',
            uri: `http://${basePath}:${ports.transactions}${process.env.CREATE_TRANSACTION_ENDPOINT}`,
            body: body,
            json: true
        };
        request.post(options, function (err, response, body) {
            return;
        });
    }

    function createBill(uuid) {
        let randomIndex = Math.floor(Math.random() * Math.floor(randomEntries.bills.length));
        let amount = Math.floor(Math.random() * Math.floor(1200)) + '';
        let date = dateFormat(new Date(), "mm, dd, yyyy");
        let account_no = Math.floor(Math.random() * 90000000) + '';
        var body = {
            uuid: uuid,
            category: randomEntries.bills[randomIndex].category,
            entity: randomEntries.bills[randomIndex].entity,
            amount: amount,
            date: date,
            account_no: account_no
        };
        console.log('Adding bill: ');
        console.log(body);
        var options = {
            method: 'POST',
            uri: `http://${basePath}:${ports.bills}${process.env.UPSERT_BILL_ENDPOINT}`,
            body: body,
            json: true
        };
        request.post(options, function (err, response, body) {
            return;
        });
    }

    function dropBills() {
        var options = {
            method: 'GET',
            uri: `http://${basePath}:${ports.bills}${process.env.DROP_BILLS_ENDPOINT}`,
            json: true
        };
        request.get(options, function (err, response, body) {
            return;
        });
    }

    function dropTransactions() {
        var options = {
            method: 'GET',
            uri: `http://${basePath}:${ports.transactions}${process.env.DROP_TRANSACTIONS_ENDPOINT}`,
            json: true
        };
        request.get(options, function (err, response, body) {
            return;
        });
    }

    function dropAccounts() {
        var options = {
            method: 'GET',
            uri: `http://${basePath}:${ports.accounts}${process.env.DROP_ACCOUNTS_ENDPOINT}`,
            json: true
        };
        request.get(options, function (err, response, body) {
            return;
        });
    }

    function populate() {
        console.log('Populating');
        return new Promise(function (resolve, reject) {
            var options = {
                method: 'GET',
                uri: `http://${basePath}:${ports.authentication}${process.env.GET_USERS_ENDPOINT}`,
                json: true
            };
            request.get(options, function (err, response, body) {
                if (err) {
                    reject(err);
                }
                resolve(body);
            });
        })
        .then(function (users) {
            console.log(users);
            for (index in users) {
                createBill(users[index].uuid);
                createTransaction(users[index].uuid);
            }
            return;
        })
        .catch(function (err) {
            console.log('Failed to retrieve users; ', err);
            return;
        });
    }

    function reset() {
        console.log('Resetting');
        dropAccounts();
        dropTransactions();
        dropBills();
        return;
    }

    function init() {
        setInterval(reset, 3600000);
        setInterval(populate, 180000);
    }

    reset();
    populate();
    init();

};
