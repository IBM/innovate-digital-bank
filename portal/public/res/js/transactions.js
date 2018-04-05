$(document).ready(function() {

  var http = new XMLHttpRequest();
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host;
  var transactionsEndpoint = baseUrl + '/endpoints/transactions/get';
  console.log('Transactions >>>> ', transactionsEndpoint)
  var uuid;
  var innerHTML = '';
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
          var transactions = JSON.parse(http.responseText).group(item => item.category);
          console.log(transactions)
          transactions.forEach(function(category){
            if (category.total > 0) {
              innerHTML +=
                `<div id="`+category.key+`" class="row category">` +
                    `<h2>`+category.key.toTitleCase()+`</h2>` +
                  `</div>`

              category.data.forEach(function(transaction){
                innerHTML +=
                  `<div class="row transaction">` +
                      `<div class="col span-2-of-3">` +
                          `<h3>`+transaction.description+`</h3>` +
                          `<p>`+transaction.date+`</p>` +
                      `</div>` +
                      `<div class="col span-1-of-3">` +
                          `<h3>AED `+transaction.amount+`</h3>` +
                      `</div>` +
                  `</div>`
              })
            }
          })
          $('#js-transaction-list').html(innerHTML)
          console.log(innerHTML)
        }
      };
      http.send(JSON.stringify({'uuid': uuid}));
    }
  };
  http.send();
})

String.prototype.toTitleCase = function () {
    return this.replace('_', ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
};

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
