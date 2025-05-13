define([], () => {
  'use strict';

  class FragmentModule {
  
  getApprovalHistory(appr_code,trns_id){
    

    return "https://omranoictst-axcyual2ptj2-mc.integration.ocp.oraclecloud9.com/ic/builder/rt/Sub_Approval_History/live/webApps/vbredwoodapp/?p_appr_request_code="+appr_code+"&p_transaction_id="+trns_id;

  }
  }
  return FragmentModule;
});
