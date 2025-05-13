define([], () => {
  'use strict';

  class FragmentModule {

      getAttachmenturl(p_appl_code,p_appl_ref_id,p_appl_ref_num){

       let url="https://omranoictst-axcyual2ptj2-mc.integration.ocp.oraclecloud9.com/ic/builder/rt/Sub_Generic_Attachment/live/webApps/vbredwoodapp/?"+
        "p_appl_code="+p_appl_code+
        "&p_appl_ref_id="+p_appl_ref_id+
        "&p_appl_ref_num="+p_appl_ref_num;   

      return url;

      }

  }
  
  return FragmentModule;
});
