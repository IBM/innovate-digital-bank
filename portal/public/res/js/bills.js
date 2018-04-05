$(document).ready(function() {

  var http = new XMLHttpRequest();
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host;
  var billsEndpoint = baseUrl + '/endpoints/bills/get';
  console.log('Bills >>>> ', billsEndpoint)
  var uuid = 0;
  var selectors = {
    utilities: {
        entity: '#utilities_entity',
        account: '#utilities_account',
        amount: '#utilities_amount',
        popup_entity: '#utilities_bill_entity',
        popup_account: '#utilities_bill_account',
        popup_amount: '#utilities_bill_amount',
        button: '#utilities_pay_button',
        confirm_button: '#utilities_confirm_button'
    },
    home_entertainment: {
        entity: '#home_entertainment_entity',
        account: '#home_entertainment_account',
        amount: '#home_entertainment_amount',
        popup_entity: '#home_entertainment_bill_entity',
        popup_account: '#home_entertainment_bill_account',
        popup_amount: '#home_entertainment_bill_amount',
        button: '#home_entertainment_pay_button',
        confirm_button: '#home_entertainment_confirm_button'
    },
    mobile_phone: {
        entity: '#mobile_phone_entity',
        account: '#mobile_phone_account',
        amount: '#mobile_phone_amount',
        popup_entity: '#mobile_phone_bill_entity',
        popup_account: '#mobile_phone_bill_account',
        popup_amount: '#mobile_phone_bill_amount',
        button: '#mobile_phone_pay_button',
        confirm_button: '#mobile_phone_confirm_button'
    },
    credit_card: {
        entity: '#credit_card_entity',
        account: '#credit_card_account',
        amount: '#credit_card_amount',
        popup_entity: '#credit_card_bill_entity',
        popup_account: '#credit_card_bill_account',
        popup_amount: '#credit_card_bill_amount',
        button: '#credit_card_pay_button',
        confirm_button: '#credit_card_confirm_button'
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
      console.log('response >>>> ', response)
      uuid = response.uuid
      http.open('POST', billsEndpoint, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200 && http.responseText) {
          var bills = JSON.parse(http.responseText);
          var total = 0;
          for (var category in selectors) {
            var bill = bills.find(item => item.category==category)
            if (bill) {
              $(selectors[category].entity).html(bill.entity); $(selectors[category].popup_entity).html(bill.entity);
              $(selectors[category].account).html(' Account No. ' + bill.account_no); $(selectors[category].popup_account).html(' Account No. ' + bill.account_no);
              $(selectors[category].amount).html('AED ' + bill.amount); $(selectors[category].popup_amount).html('AED ' + bill.amount);
              $(selectors[category].confirm_button).attr("href", "/endpoints/bills/pay?amount="+bill.amount+"&entity="+bill.entity+"&category="+category+"&account="+bill.account_no);
              if (bill.amount <= 0) $(selectors[category].button).removeClass('btn-ghost').addClass('btn-disabled')
              total += bill.amount
            }
            else {
              $(selectors[category].button).removeClass('btn-ghost').addClass('btn-disabled')
            }
          }
          $('#js-total').html(`<span class="small">AED </span>` + total)
        }
      };
      http.send(JSON.stringify({'uuid': uuid}));
    }
  };
  http.send();
})
