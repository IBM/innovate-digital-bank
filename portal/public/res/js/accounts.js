$(document).ready(function() {
  var http = new XMLHttpRequest();
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host;
  var AccountsEndpoint = baseUrl + '/endpoints/accounts/get';
  console.log('Accounts >>>> ', AccountsEndpoint)
  var uuid = 0;
  var selectors = {
    current: {
        label: '#current_label',
        number: '#current_number',
        balance: '#current_balance',
        button: '#current_button'
    },
    savings: {
        label: '#savings_label',
        number: '#savings_number',
        balance: '#savings_balance',
        button: '#savings_button'
    },
    credit: {
        label: '#credit_label',
        number: '#credit_number',
        balance: '#credit_balance',
        button: '#credit_button'
    },
    prepaid: {
        label: '#prepaid_label',
        number: '#prepaid_number',
        balance: '#prepaid_balance',
        button: '#prepaid_button'
    }
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
      uuid = response.uuid
      http.open('POST', AccountsEndpoint, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200 && http.responseText) {
          var accounts = JSON.parse(http.responseText);
          var total = 0;
          var innerHTML = ''
          for (var type in selectors) {
            var account = accounts.find(item => item.type==type)
            if (account) {
              $(selectors[type].label).html('Account No. ');
              $(selectors[type].number).html(account.number);
              $(selectors[type].balance).html('AED ' + account.balance);
              $(selectors[type].button).html('Transfer');
              if (account.balance <= 0) $(selectors[type].button).removeClass('btn-ghost').addClass('btn-disabled')
              $(selectors[type].button).attr("href", "#confirm-popup-transfer");
              total += account.balance
              innerHTML +=
              `<option value="` + account.number + `">` + account.number + ` (` + type + `)` + `</option>`
            }
            else {
              $(selectors[type].button).html('Activate');
              $(selectors[type].button).attr("href", "#confirm-popup-" + type);
              $(selectors[type].button).removeClass('btn-disabled').addClass('btn-ghost')
            }
          }
          $('#from').html(innerHTML)
          $('#to').html(innerHTML)
          $('#js-balance').html(total)
        }
      };
      http.send(JSON.stringify({'uuid': uuid}));
    }
  };
  http.send();
})
