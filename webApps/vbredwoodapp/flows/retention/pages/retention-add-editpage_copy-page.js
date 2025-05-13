define(['ojs/ojpagingdataproviderview','ojs/ojarraydataprovider'], 
function(PagingDataProviderView,ArrayDataProvider) {
  'use strict';

 

  class PageModule {

 

   pageSysDates() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy+'-'+mm+'-'+dd; 
    return today;
  };

  displayOption(status, task_id) {
  console.log(status + ' --> status');
  console.log(task_id + ' --> task_id');
  
  var save, submit, approve, reject;
  
  if (status === 'Draft' || status === 'Rejected') {
    save = 'false';
    submit = 'on';
    approve = 'off';
    reject = 'off';
  } else if (status === 'Pending' && (task_id !== null && task_id !== undefined)) {
    save = 'true';
    submit = 'off';
    approve = 'on';
    reject = 'on';
  } else if (status === 'Pending' && (task_id === null || task_id === undefined)|| status === 'Approved') {
    save = 'true';
    submit = 'off';
    approve = 'off';
    reject = 'off';
  }

  var obj = {
    'save': save,
    'submit': submit,
    'approve': approve,
    'reject': reject
  };


  return obj;
}

    retentionRelease(array,key) {
      let data = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: key
        }));
      return data;
    };


    generateLineDetail(array, sysDate, loginUser) {
      console.log("XX2----1>" + JSON.stringify(array));
      var payload = {};
      let isValid = "true";
      let message = null;
      let ldata = 0;
      for (var i = 0; i < array.length; i++) {

        array[i].ret_rel_amount = document.getElementById('ret_rel_amount' + i).value;
        array[i].remarks = document.getElementById('remarks' + i).value;
      

        array[i].last_updated_date = sysDate; // mandatory fields hardcoded value from the project master table
        array[i].last_updated_by = loginUser; // mandatory fields hardcoded value from the project master table
        array[i].last_updated_login = loginUser;

        ldata = ldata + 1;
      }
      console.log("ldata==>ldata==> Start==>" + ldata);
      payload.item = array;
      console.log("XX2----1>Final TEST==>3" + JSON.stringify(payload));
      console.log("ldata==>ldata==>" + ldata);
      return {
        'isValid': isValid,
        'message': message,
        'payload': payload
      };
    };

 printArrayValue(array) {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>" + JSON.stringify(array));
    };


// calHeaderRetention(index, array) {
//     let sumOfRowAmounts = 0;
 
//      for (let i = 0; i < array.length; i++) {
//         let currRowAmount =(document.getElementById('ret_rel_amount' + i).value);
//         sumOfRowAmounts += currRowAmount;
//     }
 
//     return sumOfRowAmounts;
// }

 cumulativeAmountBasedValue(index, array) {
    let sumOfRowAmounts = 0;
 
    for (let i = 0; i < array.length; i++) {
        let currRowAmount = parseFloat(document.getElementById('ret_rel_amount' + i).value);
        sumOfRowAmounts += currRowAmount;
    }
 
    return sumOfRowAmounts;
}


  }
 
  return PageModule;
});
