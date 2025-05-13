/* Copyright (c) 2023, Oracle and/or its affiliates */
define(['oj-sp/spectra-shell/config/config'], () => {
  'use strict';

  class AppModule {
    appSysDatesWithTimeStamp() {
    return new Date().toISOString();
  };

   getSysdate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy+'-'+mm+'-'+dd; 
    return today;
  };


 isFormValid(form) {
      let tracker = document.getElementById(form);
      if (tracker.valid === "valid") {
        return true;
      } else {
        tracker.showMessages();
        tracker.focusOn("@firstInvalidShown");
        return false;
      }
    }





    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    pcsPayload(callSubmitPackage, p_APPR_PROCESS,p_TRX_ID,p_USER_ID, p_action_id) {
    
    let result="{\"callSubmitPackage\":\""+callSubmitPackage+"\",\"p_APPR_PROCESS\":\""+p_APPR_PROCESS+"\",\"p_TRX_ID\":\""+p_TRX_ID+"\",\"p_USER_ID\":\""+p_USER_ID+"\",\"p_action_Id\":\""+p_action_id+"\"}";
    console.log("result==>"+result);
    return result;
    
    
    }
  }
  
  return AppModule;
});
