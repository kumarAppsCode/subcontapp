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



   





    printArrayValue(array) {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>" + JSON.stringify(array));
    };

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    onPageNaviFun(naviValue) {
      var navi = null;
      if (naviValue === "CREATE" || naviValue === "Create") {
        navi = "POST";
      } else {
        navi = "PUT";
      }
      // console.log("navi==>"+navi);
      return navi;
    }


    validationField(taskId, status, app_type) {
      let accessFlag = "false";
      let accessHeader = "true";
      console.log("Valid==>taskId===>" + taskId);
      console.log("Valid==>status===>" + status);
      console.log("Valid==>app_type==>" + app_type);
      if (status === 'Draft' || status === 'Rejected' || status === 'Withdraw') {
        console.log("Valid==>1");
        accessFlag = false;
        if (app_type === "ADVANCE" || app_type === "RET_REL" ) {
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
      console.log("Valid==tttttttttttttttttttttttttt>" + accessHeader);
      console.log("accessFlag==ttttttttttttttttttttt>" + accessFlag);
      // return flag;
      return {
        'accessHeader': accessHeader,
        'accessFlag': accessFlag
      };
    };

// function for payment selection

     cumulativeAmountBasedValue1(cum_percentage, cum_quantity, cur_amount, cum_amount, cur_percentage, cur_quantity, index) {
      document.getElementById('cum_percentageentage' + index).value = cum_percentage;
      document.getElementById('cum_quantity' + index).value = cum_quantity;
      document.getElementById('cum_amount' + index).value = cum_amount;
      document.getElementById('cur_amount' + index).value = cur_amount;
      document.getElementById('cur_percentage' + index).value = cur_percentage;
      document.getElementById('cur_quantity' + index).value = cur_quantity;
    };


    


    displayOption(status, task_id) {
      console.log(status + ' --> status');
      console.log(task_id + ' --> task_id');

      var save, submit, approve, reject, primaryaction,reassign,withdraw,reassign1, transferAP;

      if (status === 'Draft' || status === 'Rejected' || status === 'Withdraw') {
        primaryaction = 'false';
        save = 'on';
        submit = 'on';
        approve = 'off';
        reject = 'off';
         reassign ='off';
         withdraw = 'off';
        
      } else if (status === 'Pending' && (task_id !== null && task_id !== undefined)) {
        primaryaction = 'true';
        save = 'off';
        submit = 'off';
        approve = 'on';
        reject = 'on';
         reassign ='on';
         reassign1 ='true';
          //  withdraw = 'off';
      } else if (status === 'Pending' && (task_id === null || task_id === undefined) ) {
         primaryaction = 'true';
        save = 'off';
        submit = 'off';
        approve = 'off';
        reject = 'off';
         reassign ='on';
         reassign1 ='false';
        //  withdraw = 'on';
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

      var obj = {
        'primaryaction': primaryaction,
        'save': save,
        'submit': submit,
        'approve': approve,
        'reject': reject,
        'reassign': reassign,
        'reassign1':reassign1
      };

      return obj;
    }


     displayTransferAP(status, apstatusflag) {
      console.log(status + ' --> status');
      console.log(apstatusflag + ' --> apstatusflag');

      var  transferAP;

      if (status === 'Approved' &&  ( apstatusflag === null || apstatusflag === undefined || apstatusflag === 'E' )) {
       transferAP = 'on';
        
      } else  {
       transferAP = 'off';
      } 

      var obj = {
        'transferAP': transferAP
        
      };

      return obj;
    }

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
      result.cumulativeAmount = Math.round((cumulativePercentage / 100) * totLineAmount);
      result.cumulativeQuantity = ((cumulativePercentage / 100) * Quantity);

      // Calculate current values
      result.currentAmount = Math.round(result.cumulativeAmount - preAmount);
      result.currentQuantity = (result.cumulativeQuantity - preQuantity);
      result.currentPercentage = Math.round(result.cumulativePercentage - prePercentage);

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
      result.cumulativeAmount = Math.round((cumulativeQuantity / Quantity) * totLineAmount);
      result.cumulativePercentage = Math.round((cumulativeQuantity / Quantity) * 100);

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

 paymentType(payment_type, index) {
      document.getElementById('payment_type' + index).value = payment_type;

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


calculateNetAmount(cur_amount, cur_ret_amount, cur_adv_rec_amount, penalty, tax_amount) {

  console.log("cur_amount:", cur_amount);

  console.log("cur_ret_amount:", cur_ret_amount);

  console.log("cur_adv_rec_amount:", cur_adv_rec_amount);

  console.log("penalty:", penalty);

    // Convert null or undefined values to zero
    cur_amount = cur_amount || 0;
     cur_ret_amount = cur_ret_amount || 0;
     cur_adv_rec_amount = cur_adv_rec_amount || 0;
     penalty = penalty || 0;
     tax_amount = tax_amount || 0;

console.log("cur_amount1:", cur_amount);

  console.log("cur_ret_amount1:", cur_ret_amount);

  console.log("cur_adv_rec_amount1:", cur_adv_rec_amount);

  console.log("penalty1:", penalty);

  console.log("tax_amount:", tax_amount);

    // Calculate net amount

    // var netAmount1 = cur_amount - (cur_ret_amount + cur_adv_rec_amount + penalty);

    var netAmount1 = cur_amount - (cur_ret_amount );

    // var netAmount = cur_amount - (cur_ret_amount + cur_adv_rec_amount + penalty);
     var netAmount = netAmount1 + tax_amount;

console.log("Net amount:", netAmount);

    return netAmount;
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


	
     submitPayload(hdrId, actId){
      let result="{\"p_trx_id\":\""+hdrId+"\",\"p_action_id\":\""+actId+"\"}";
     
      console.log("result==>"+result);
     
      return result;
    };
	





 

  }

  return PageModule;
});
