$(document).ready(function() {

  var http = new XMLHttpRequest();
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host;
  var transactionsEndpoint = baseUrl + '/endpoints/transactions/get';
  console.log('Transactions >>>> ', transactionsEndpoint)
  var uuid, total = 0;
  var selectors = {
    groceries: {
        count: '#groceries_transaction_count',
        total: '#groceries_transaction_total',
        row: '#groceries_row',
        link: '#groceries_link'
    },
    eating_out: {
      count: '#eating_out_transaction_count',
      total: '#eating_out_transaction_total',
      row: '#eating_out_row',
      link: '#eating_out_link'
    },
    transport: {
      count: '#transport_transaction_count',
      total: '#transport_transaction_total',
      row: '#transport_row',
      link: '#transport_link'
    },
    bills: {
      count: '#bills_transaction_count',
      total: '#bills_transaction_total',
      row: '#bills_row',
      link: '#bills_link'
    },
    expenses : {
      count: '#expenses_transaction_count',
      total: '#expenses_transaction_total',
      row: '#expenses_row',
      link: '#expenses_link'
    },
    cash : {
      count: '#cash_transaction_count',
      total: '#cash_transaction_total',
      row: '#cash_row',
      link: '#cash_link'
    },
    holidays : {
      count: '#holidays_transaction_count',
      total: '#holidays_transaction_total',
      row: '#holidays_row',
      link: '#holidays_link'
    },
  }

  //Ensure authenticated and get uuid
  http.open('GET', '/endpoints/auth', true);
  http.setRequestHeader('Content-type', 'application/json');
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 500) {
      window.location.replace('/index.html')
    }
    else if (http.readyState === 4 && http.status === 200 && http.responseText) {
      var response = JSON.parse(http.responseText)
      console.log('response >>>> ', response)
      uuid = response.uuid
      http.open('POST', transactionsEndpoint, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200 && http.responseText) {
          console.log(http.responseText)
          var transactions = JSON.parse(http.responseText).group(item => item.category);
          console.log(transactions)
          for (var selector in selectors) {
            var transaction = transactions.find(item => item.key==selector)
            if (transaction && transaction.total > 0) {
              $(selectors[transaction.key].count).html(transaction.data.length + ' transactions');
              $(selectors[transaction.key].total).html('AED ' + Math.round(transaction.total*100)/100);
              total += transaction.total;
            }
            else {
              $(selectors[selector].row).addClass('greyed-out')
              $(selectors[selector].link).removeAttr('href')
            }
          }
          $('#js-total').html(total)
        }
      };
      http.send(JSON.stringify({'uuid': uuid}));
    }
  };
  http.send();
})

Object.defineProperty(Array.prototype, 'group', {
  enumerable: false,
  value: function (key) {
    let map = {};
    this.map(e => ({k: key(e), d: e})).forEach(e => {
      map[e.k] = map[e.k] || [];
      if (e.d.amount) map[e.k].push(e.d);
    });
    return Object.keys(map).map(k => ({key: k, data: map[k], total: map[k].reduce(((a, b) => a + b.amount), 0)}));
  }
});
