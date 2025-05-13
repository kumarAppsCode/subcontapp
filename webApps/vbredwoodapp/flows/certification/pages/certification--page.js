define([], () => {
  'use strict';

  class PageModule {

    printArrayValue(array) {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>" + JSON.stringify(array));
    };


    calculatePercentageValues(preQuantity, preAmount, prePercentage, Quantity, totLineAmount, calMethod, cumulativePercentage,cur_ret_percentage, index) {

      console.log(preQuantity);
      console.log(preAmount);
      console.log("prePercentage (P)"+prePercentage);
      console.log(Quantity);
      console.log(totLineAmount);
      console.log(calMethod);
      console.log(cumulativePercentage);
      console.log(cur_ret_percentage);
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


       // current retention amount  calculation
      // result.ret_amount = Math.round(result.currentAmount * (cur_ret_percentage/100) );

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

        // document.getElementById('cur_ret_amount' + index).value = result.ret_amount;


      return result;


    }


    calculateQuantityValues(preQuantity, preAmount, prePercentage, Quantity, totLineAmount, calMethod, cumulativeQuantity,cur_ret_percentage, index) {

       console.log('preQuantity'+preQuantity);
      console.log('preAmount'+ preAmount);
      console.log('prePercentage'+prePercentage);
      console.log('Quantity'+Quantity);
      console.log('totLineAmount'+totLineAmount);
      console.log(calMethod);
      console.log('cumulativeQuantity'+cumulativeQuantity);

        // console.log(cur_ret_percentage);

      console.log(index);

      let result = {};



      result.cumulativeQuantity = cumulativeQuantity;
      result.cumulativeAmount = ((cumulativeQuantity / Quantity) * totLineAmount);
      result.cumulativePercentage = ((cumulativeQuantity / Quantity) * 100);

      // Calculate current values
      result.currentAmount = (result.cumulativeAmount - preAmount);
      result.currentQuantity = result.cumulativeQuantity - preQuantity;
      result.currentPercentage =(result.cumulativePercentage - prePercentage);

          // current retention amount  calculation
      // result.ret_amount = Math.round(result.currentAmount * (cur_ret_percentage/100));

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

      // document.getElementById('cur_ret_amount' + index).value = result.ret_amount;


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
        array[i].calc_mode = document.getElementById('calc_mode' + i).value;

        // array[i].cur_ret_amount = document.getElementById('cur_ret_amount' + i).value;

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






    certPaymentType(cert_payment_type, index) {
      document.getElementById('cert_payment_type' + index).value = cert_payment_type;

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


    
    displayOption(status) {
      console.log(status + ' --> status');
     

      let save, saveClose;

      if (status === 'Draft' || status === 'Rejected' || status === 'Withdraw') {
        save = 'false';
        saveClose='on';
      } else if (status === 'Pending' || status === 'Approved') {
        save = 'true';
        saveClose = 'off';
        
      }

      let obj = {
        'save': save,
        'saveClose': saveClose
           };

      return obj;
    }



  }
  
  return PageModule;
});
