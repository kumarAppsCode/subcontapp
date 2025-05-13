define(['ojs/ojpagingdataproviderview', 'ojs/ojarraydataprovider'], (PagingDataProviderView, ArrayDataProvider) => {
  'use strict';

  class PageModule {


    pagingSearch(array) {
      var data = new PagingDataProviderView(new ArrayDataProvider(
        array, {
        idAttribute: 'line_id'
      }));
      return data;
    };

     submitPayload(hdrId, actId){
      let result="{\"p_trx_id\":\""+hdrId+"\",\"p_action_id\":\""+actId+"\"}";
     
      console.log("result==>"+result);
     
      return result;
    };

    getPrimaryKey(naviValue, keyValue) {
      var keyValueResult = null;
      // console.log("naviValue Key===>"+naviValue);
      // console.log("Key===>"+keyValue);
      if (naviValue === "CREATE") {
        keyValueResult = "0";
        // console.log("ADD==>"+keyValueResult);
      } else {
        keyValueResult = keyValue;
        //  console.log("ELS==>"+keyValueResult);
      }
      return keyValueResult;

    };

    displayNavigation(pagetype1) {
      console.log(pagetype1 + ' --> pagetype1pagetype1pagetype1pagetype1pagetype1pagetype1pagetype1pagetype1pagetype1');

      var contract, application;


      if (pagetype1 == 'CertificationPage' || pagetype1 == 'ApplicationPage' || pagetype1 == 'ContractPage') {
        application = 'off';
        contract = 'off';

      }

      else {

        application = 'on';
        contract = 'on';

      }

      var obj = {
        'application': application,
        'contract': contract
      };

      return obj;
    }



    displayOption(status, task_id) {


      let save, submit, approve, reject, primaryaction,reassign, withdraw;

      if (status === 'Draft' || status === 'Rejected' || status === 'Withdraw') {

        primaryaction = 'false';
        save = 'on';
        submit = 'on';
        approve = 'off';
        reject = 'off';
        reassign ='off';
        withdraw = 'off';
      } 
      else if ((status === 'Pending' ) && (task_id !== null && task_id !== undefined)) {
         primaryaction = 'true';
        save = 'off';
        submit = 'off';
        approve = 'on';
        reject = 'on';
        reassign ='on';
        withdraw = 'off';
      } else if (status === 'Pending' && (task_id === null || task_id === undefined) ) {
        primaryaction = 'true';
        save = 'off';
        submit = 'off';
        approve = 'off';
        reject = 'off';
        reassign ='off';
        withdraw = 'on';
      } 
       else if (status === 'Approved' && (task_id === null || task_id === undefined) ) {
        primaryaction = 'true';
        save = 'off';
        submit = 'off';
        approve = 'off';
        reject = 'off';
        reassign ='off';
        withdraw = 'off';
        }
      let obj = {
        'primaryaction': primaryaction,
        'save': save,
        'submit': submit,
        'approve': approve,
        'reject': reject,
        'reassign': reassign,
        'withdraw': withdraw

      };

      return obj;
    }


    validationField(taskId, status, app_type) {
      let accessFlag = "false";
      let accessHeader = "true";

      if (status === 'Draft' || status === 'Rejected' || status === 'Withdraw') {
        console.log("Valid==>1");
        accessFlag = false;
        if (app_type === "Advance") {
          console.log("Valid==>2");
          accessHeader = false;
        } else {
          console.log("Valid==>3");
          accessHeader = true;
        }
      } else {
        if (taskId != undefined) {
          // In Pending Approval 
          console.log("Valid==>4");
          accessFlag = true;
        } else {
          accessFlag = true;
          console.log("Valid==>5");
        }
      }
      console.log("Valid==>" + accessHeader);
      console.log("accessFlag==>" + accessFlag);
      // return flag;
      return {
        'accessHeader': accessHeader,
        'accessFlag': accessFlag
      };
    };



    paymentType(payment_type, index) {
      document.getElementById('payment_type' + index).value = payment_type;

    };
    // =====================previous calculation=======================


    // cumulativeAmountBasedValue(cum_perc, cum_tot_qty, curr_amount, cum_amount, curr_perc, curr_tot_qty, index) {
    //   document.getElementById('cum_perc' + index).value = cum_perc;
    //   document.getElementById('cum_tot_qty' + index).value = cum_tot_qty;
    //   document.getElementById('cum_amount' + index).value = cum_amount;
    //   document.getElementById('curr_amount' + index).value = curr_amount;
    //   document.getElementById('curr_perc' + index).value = curr_perc;
    //   document.getElementById('curr_tot_qty' + index).value = curr_tot_qty;

    // };

    calculatePercentageValues(preQuantity, preAmount, prePercentage, Quantity, totLineAmount, calMethod, cumulativePercentage, index) {

      console.log(preQuantity);
      console.log(preAmount);
      console.log(prePercentage);
      console.log(Quantity);
      console.log(totLineAmount);
      console.log(calMethod);
      console.log(cumulativePercentage);
      console.log(index);

      let result = {};

      // Calculate cumulative values based on provided percentage
      result.cumulativePercentage = cumulativePercentage;
      result.cumulativeAmount = ((cumulativePercentage / 100) * totLineAmount);
      result.cumulativeQuantity = ((cumulativePercentage / 100) * Quantity);

      // Calculate current values
      result.currentAmount = (result.cumulativeAmount - preAmount);
      result.currentQuantity = (result.cumulativeQuantity - preQuantity);
      result.currentPercentage = (result.cumulativePercentage - prePercentage);

      console.log("Cumulative Amount:", result.cumulativeAmount);
      console.log("Cumulative Percentage:", result.cumulativePercentage);
      console.log("Cumulative Quantity:", result.cumulativeQuantity);
      console.log("Current Amount:", result.currentAmount);
      console.log("Current Quantity:", result.currentQuantity);

      console.log("Current Percentage:", result.currentPercentage);

      document.getElementById('cum_percentage' + index).value = result.cumulativePercentage;
      document.getElementById('cum_quantity' + index).value = result.cumulativeQuantity;
      document.getElementById('cum_amount' + index).value = result.cumulativeAmount;
      document.getElementById('cur_amount' + index).value = result.currentAmount;
      document.getElementById('cur_percentage' + index).value = result.currentPercentage;
      document.getElementById('cur_quantity' + index).value = result.currentQuantity;


      return result;


    }


    calculateQuantityValues(preQuantity, preAmount, prePercentage, Quantity, totLineAmount, calMethod, cumulativeQuantity, index) {

      console.log(preQuantity);
      console.log(preAmount);
      console.log(prePercentage);
      console.log(Quantity);
      console.log(totLineAmount);
      console.log(calMethod);
      console.log(cumulativeQuantity);
      console.log(index);

      let result = {};



      result.cumulativeQuantity = cumulativeQuantity;
      result.cumulativeAmount = ((cumulativeQuantity / Quantity) * totLineAmount);
      result.cumulativePercentage = ((cumulativeQuantity / Quantity) * 100);

      // Calculate current values
      result.currentAmount = Math.round(result.cumulativeAmount - preAmount);
      result.currentQuantity = result.cumulativeQuantity - preQuantity;
      result.currentPercentage = Math.round(result.cumulativePercentage - prePercentage);

      console.log(result.cumulativeQuantity);
      console.log(result.cumulativeAmount);
      console.log(result.cumulativePercentage);
      console.log(result.currentAmount);
      console.log(result.currentQuantity);
      console.log(result.currentPercentage);


      document.getElementById('cum_percentage' + index).value = result.cumulativePercentage;
      document.getElementById('cum_quantity' + index).value = result.cumulativeQuantity;
      document.getElementById('cum_amount' + index).value = result.cumulativeAmount;
      document.getElementById('cur_amount' + index).value = result.currentAmount;
      document.getElementById('cur_percentage' + index).value = result.currentPercentage;
      document.getElementById('cur_quantity' + index).value = result.currentQuantity;


      return result;

    }

    printArrayValue(array) {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>" + JSON.stringify(array));
    };


    generateLineDetail(array, sysDate, loginUser) {
      console.log("XX2----1>" + JSON.stringify(array));
      var payload = {};
      let isValid = "true";
      let message = null;
      let ldata = 0;
      for (var i = 0; i < array.length; i++) {

        array[i].cum_percentage = document.getElementById('cum_percentage' + i).value;
        array[i].cum_quantity = document.getElementById('cum_quantity' + i).value;
        array[i].cum_amount = document.getElementById('cum_amount' + i).value;
        array[i].cur_amount = document.getElementById('cur_amount' + i).value;
        array[i].cur_percentage = document.getElementById('cur_percentage' + i).value;
        array[i].cur_quantity = document.getElementById('cur_quantity' + i).value;

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



    paymentTypeBasedValue(index, currRow) {


      if (currRow == 'P') {
        document.getElementById('cum_quantity' + index).value = null;
        document.getElementById('cum_quantity' + index).readonly = true;
        document.getElementById('cum_percentage' + index).readonly = false;
      }
      else if (currRow == 'Q') {
        document.getElementById('cum_percentage' + index).readonly = true;
        document.getElementById('cum_percentage' + index).value = null;
        document.getElementById('cum_quantity' + index).readonly = false;
      }

      else {
        document.getElementById('cum_quantity' + index).readonly = true;
        document.getElementById('cum_percentage' + index).readonly = true;

        document.getElementById('cum_percentage' + index).value = null;
        document.getElementById('cum_quantity' + index).value = null;
      }
    };




 calculateTaxAndNetAmount(curAmount, taxRate) {

console.log( "initial cur_amount" + curAmount);
console.log("initial cal cur_amount" + taxRate);

    // Check if tax rate is null or zero
    if (taxRate === null || taxRate === 0 || taxRate == undefined ) {
        // If tax rate is null or zero, net amount is same as current amount
        return {
            taxAmount: 0,
            netAmount: curAmount
        };
    }
   
console.log("before cal cur_amount" + curAmount);
console.log("before cal cur_amount" + taxRate);
    // Calculate tax amount
    var taxAmount = (curAmount * taxRate)/100;

    // Calculate net amount
    var netAmount = curAmount + taxAmount;

console.log("before cal cur_amount" + curAmount);
console.log("before cal cur_amount" + netAmount);
    // Return an object with both values
    return {
        taxAmount: taxAmount,
        netAmount: netAmount
    };
}



 displayRetAmount(ret_amount, retention_max_amount) {
  console.log(ret_amount + ' --> ret_amount');
  console.log(retention_max_amount + ' --> retention_max_amount');
  
  let retention_max_amount_bol = false;
  let ret_amount_bol = false;
  
  if (retention_max_amount === null || retention_max_amount === undefined) {
    ret_amount_bol = true;
    retention_max_amount_bol = false;
  } else {
    if (ret_amount <= retention_max_amount) {
      ret_amount_bol = true;
      retention_max_amount_bol = false;
    } else {
      ret_amount_bol = false;
      retention_max_amount_bol = true;
    }
  }
  
  var obj = {
    'ret_amount_bol': ret_amount_bol,
    'retention_max_amount_bol': retention_max_amount_bol
  };

  return obj;
}


/**
 * Function to convert a JSON object to a JSON string
 * @param {Object} jsonObject - The JSON object to convert
 * @return {string} - The JSON string
 */
convertJsonToString(jsonObject) {
    var initialData = JSON.stringify(jsonObject);
    console.log(initialData);
    return initialData;
}

compareJSONStrings(jsonString1, jsonString2) {
    let saveVar = {};

    try {
        // const obj1 = JSON.parse(jsonString1);
        // const obj2 = JSON.parse(jsonString2);
console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'+jsonString1);
console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'+jsonString2);
        // Comparing JSON objects
        const areEqual = (jsonString1) === (jsonString2);
        
        if (!areEqual) {
            saveVar = {
                result: true,
                errorMsg: ""
            };
        } else {
            saveVar = {
                result: false,
                errorMsg: "No changes have been made."
            };
        }
    } catch (error) {
        console.error("Invalid JSON string:", error);
        saveVar = {
            result: false,
            errorMsg: "Error parsing JSON."
        };
    }

    return saveVar;
}


  }


  return PageModule;
});
