define(['ojs/ojpagingdataproviderview','ojs/ojarraydataprovider'], (PagingDataProviderView,ArrayDataProvider) => {
  'use strict';

  class PageModule {


    pagingSearch(array,type)
     {
      if(type==="ContractLine"){
      var data = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'line_id'
        }));
      return data;
      }
 else if(type==="Guarantee"){
      var data1 = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'guarantee_id'
        }));
      return data1;
      }
      else if(type==="Payment"){
      var data2 = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'term_id'
        }));
      return data2;
      }
         else if(type==="Attachment"){
      var data3 = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'document_id'
        }));
      return data3;
      }
        
         else if(type==="Application"){
      var data4 = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'header_id'
        }));
      return data4;
      }

      
         else if(type==="Certification"){
      var data5 = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'header_id'
        }));
      return data5;
      }
        else if(type==="Retention"){
      var data6 = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'header_id'
        }));
      return data6;
      }
    };



   poattachment(array) {
      let data = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'header_id'
        }));
      return data;
    };




 getPrimaryKey(naviValue, keyValue) {
      var keyValueResult=null;
      // console.log("naviValue Key===>"+naviValue);
    // console.log("Key===>"+keyValue);
     if(naviValue==="CREATE"){
        keyValueResult="0";
      // console.log("ADD==>"+keyValueResult);
    }else{
      keyValueResult=keyValue;
    //  console.log("ELS==>"+keyValueResult);
    }
    return keyValueResult;
      
    };

    


    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    onPageNaviFun(naviValue, key)
     {
        var navi=null;

        if(naviValue==="CREATE"||naviValue==="Create"){
            navi="POST";
        }else{
          if(key==0){
            navi="POST";
          }else{
            navi="PUT";
          }
        }
        // console.log("navi==>"+navi);
        return navi;
        }

submitPayload(hdrId){
let result="{\"hdrId\":\""+hdrId+"\",\"taskId\":\"\"}";
 console.log("result==>"+result);
   return result;
    };

//  start these calculation not required for omran client 

    
//     advanceCal(p_cal_mode, p_contract_amt, p_per_field, p_amt_field) {
//       let l_adv_per =1;
//       let l_adv_amt =0; 
      

//       if(typeof(p_contract_amt)=== "undefined"){
//         p_contract_amt=0;
//       }

//       if(typeof(p_per_field)=== "undefined"){
//         p_per_field=0;
//       }

//       if(typeof(p_amt_field)=== "undefined"){
//         p_amt_field=0;
//       }

//       console.log("p_cal_mode==>"+p_cal_mode);
//       console.log("p_contract_amt==>"+p_contract_amt);
//       console.log("p_per_field==>"+p_per_field);
//       console.log("p_amt_field==>"+p_amt_field);
      
//       //p_contract_amt =1000;
//      if(p_cal_mode=='P'){
//         l_adv_per=p_per_field;
//         l_adv_amt=(p_contract_amt*(p_per_field/100));
//       }else{
//         l_adv_per=((p_amt_field/p_contract_amt)*100);
//         l_adv_amt=p_amt_field;
//     }
    
//     console.log("Result--%"+l_adv_per);
//     console.log("Result--Amt"+l_adv_amt);
    
//     return {'l_adv_per':l_adv_per,'l_adv_amt':l_adv_amt
//       };

//     }

    
    
//     advanceRecoveryCal(p_cal_mode, p_contract_amt, p_per_field, p_amt_field) {
//       let l_adv_per =1;
//       let l_adv_amt =0; 
      

//       if(typeof(p_contract_amt)=== "undefined"){
//         p_contract_amt=0;
//       }

//       if(typeof(p_per_field)=== "undefined"){
//         p_per_field=0;
//       }

//       if(typeof(p_amt_field)=== "undefined"){
//         p_amt_field=0;
//       }

//       console.log("p_cal_mode==>"+p_cal_mode);
//       console.log("p_contract_amt==>"+p_contract_amt);
//       console.log("p_per_field==>"+p_per_field);
//       console.log("p_amt_field==>"+p_amt_field);
      
//       //p_contract_amt =1000;
//      if(p_cal_mode=='P'){
//         l_adv_per=p_per_field;
//         l_adv_amt=(p_contract_amt*(p_per_field/100));
//       }else{
//         l_adv_per=((p_amt_field/p_contract_amt)*100);
//         l_adv_amt=p_amt_field;
//     }
    
//     console.log("Result--%"+l_adv_per);
//     console.log("Result--Amt"+l_adv_amt);
    
//     return {'l_adv_per':l_adv_per,'l_adv_amt':l_adv_amt
//       };

//     }

//     advanceCalRetention(p_cal_mode, p_contract_amt, p_per_field, p_amt_field) {
//       let l_adv_per =1;
//       let l_adv_amt =0; 
      

//       if(typeof(p_contract_amt)=== "undefined"){
//         p_contract_amt=0;
//       }

//       if(typeof(p_per_field)=== "undefined"){
//         p_per_field=0;
//       }

//       if(typeof(p_amt_field)=== "undefined"){
//         p_amt_field=0;
//       }

//       console.log("p_cal_mode==>"+p_cal_mode);
//       console.log("p_contract_amt==>"+p_contract_amt);
//       console.log("p_per_field==>"+p_per_field);
//       console.log("p_amt_field==>"+p_amt_field);
      
//       //p_contract_amt =1000;
//      if(p_cal_mode=='P'){
//         l_adv_per=p_per_field;
//         l_adv_amt=(p_contract_amt*(p_per_field/100));
//       }else{
//         l_adv_per=((p_amt_field/p_contract_amt)*100);
//         l_adv_amt=p_amt_field;
//     }
    
//     console.log("Result--%"+l_adv_per);
//     console.log("Result--Amt"+l_adv_amt);
    
//     return {'l_adv_per':l_adv_per,'l_adv_amt':l_adv_amt
//       };

//     }


//  advanceCalRetentionRecovery(p_cal_mode, p_contract_amt, p_per_field, p_amt_field) {
//       let l_adv_per =1;
//       let l_adv_amt =0; 
      

//       if(typeof(p_contract_amt)=== "undefined"){
//         p_contract_amt=0;
//       }

//       if(typeof(p_per_field)=== "undefined"){
//         p_per_field=0;
//       }

//       if(typeof(p_amt_field)=== "undefined"){
//         p_amt_field=0;
//       }

//       console.log("p_cal_mode==>"+p_cal_mode);
//       console.log("p_contract_amt==>"+p_contract_amt);
//       console.log("p_per_field==>"+p_per_field);
//       console.log("p_amt_field==>"+p_amt_field);
      
//       //p_contract_amt =1000;
//      if(p_cal_mode=='P'){
//         l_adv_per=p_per_field;
//         l_adv_amt=(p_contract_amt*(p_per_field/100));
//       }else{
//         l_adv_per=((p_amt_field/p_contract_amt)*100);
//         l_adv_amt=p_amt_field;
//     }
    
//     console.log("Result--%"+l_adv_per);
//     console.log("Result--Amt"+l_adv_amt);
    
//     return {'l_adv_per':l_adv_per,'l_adv_amt':l_adv_amt
//       };

//     }




//      advanceCalMaterial(p_cal_mode, p_contract_amt, p_per_field, p_amt_field) {
//       let l_adv_per =1;
//       let l_adv_amt =0; 
      

//       if(typeof(p_contract_amt)=== "undefined"){
//         p_contract_amt=0;
//       }

//       if(typeof(p_per_field)=== "undefined"){
//         p_per_field=0;
//       }

//       if(typeof(p_amt_field)=== "undefined"){
//         p_amt_field=0;
//       }

//       console.log("p_cal_mode==>"+p_cal_mode);
//       console.log("p_contract_amt==>"+p_contract_amt);
//       console.log("p_per_field==>"+p_per_field);
//       console.log("p_amt_field==>"+p_amt_field);
      
//       //p_contract_amt =1000;
//      if(p_cal_mode=='P'){
//         l_adv_per=p_per_field;
//         l_adv_amt=(p_contract_amt*(p_per_field/100));
//       }else{
//         l_adv_per=((p_amt_field/p_contract_amt)*100);
//         l_adv_amt=p_amt_field;
//     }
    
//     console.log("Result--%"+l_adv_per);
//     console.log("Result--Amt"+l_adv_amt);
    
//     return {'l_adv_per':l_adv_per,'l_adv_amt':l_adv_amt
//       };

//     }

    
//      advanceCalMaterialRecovery(p_cal_mode, p_contract_amt, p_per_field, p_amt_field) {
//       let l_adv_per =1;
//       let l_adv_amt =0; 
      

//       if(typeof(p_contract_amt)=== "undefined"){
//         p_contract_amt=0;
//       }

//       if(typeof(p_per_field)=== "undefined"){
//         p_per_field=0;
//       }

//       if(typeof(p_amt_field)=== "undefined"){
//         p_amt_field=0;
//       }

//       console.log("p_cal_mode==>"+p_cal_mode);
//       console.log("p_contract_amt==>"+p_contract_amt);
//       console.log("p_per_field==>"+p_per_field);
//       console.log("p_amt_field==>"+p_amt_field);
      
//       //p_contract_amt =1000;
//      if(p_cal_mode=='P'){
//         l_adv_per=p_per_field;
//         l_adv_amt=(p_contract_amt*(p_per_field/100));
//       }else{
//         l_adv_per=((p_amt_field/p_contract_amt)*100);
//         l_adv_amt=p_amt_field;
//     }
    
//     console.log("Result--%"+l_adv_per);
//     console.log("Result--Amt"+l_adv_amt);
    
//     return {'l_adv_per':l_adv_per,'l_adv_amt':l_adv_amt
//       };

//     }


// End  these calculation not required for omran client 

displayOption(status, task_id) {
  console.log(status + ' --> status');
  console.log(task_id + ' --> task_id');
  
  var save, submit, approve, reject;
  
  if (status === 'Draft' || status === 'Rejected') {
    save = 'on';
    submit = 'on';
    approve = 'off';
    reject = 'off';
  } else if (status === 'Pending' && (task_id !== null && task_id !== undefined)) {
    save = 'off';
    submit = 'off';
    approve = 'on';
    reject = 'on';
  } else if (status === 'Pending' && (task_id === null || task_id === undefined)|| status === 'Approved') {
    save = 'off';
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


	
validationField(taskId, status){
	
  let accessFlag="false";
  let accessFlag1="true";
  let accessHeader="true";
  console.log("Valid==>taskId===>"+taskId);
  console.log("Valid==>status===>"+status);
  
  if(status==='Draft' || status==='Rejected' || status==='Required More Info'){
      console.log("Valid==>1");
        accessFlag=false;
  }
     
  else{
      if(taskId == undefined && status === 'Approved'){
          // In Pending Approval

        console.log("Valid==>4");
          accessFlag=true;  
          accessFlag1="false";
      }else{
          accessFlag=true;
          console.log("Valid==>5");
      }
  }
  console.log("Valid==>"+accessHeader);
  console.log("accessFlag==>"+accessFlag);
  // return flag;
  	return {
              'accessHeader':accessHeader,
              'accessFlag':accessFlag,
               'accessFlag1':accessFlag1
           };
};







    
downloadFileFromBase64(base64String,name,type) {

    var applicationType = "data:"+type+";base64,";

    var finalContent = applicationType+base64String;

    const downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    downloadLink.href = finalContent;

    downloadLink.download =name;

    downloadLink.click();
    

  

  };


    /**
     *
     * @param {String} arg1
     * @return {String}
     */

  }
  return PageModule;
});
