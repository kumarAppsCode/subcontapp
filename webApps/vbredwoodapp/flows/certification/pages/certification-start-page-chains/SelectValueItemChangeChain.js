define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class SelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      $page.variables.postCertHdrTrans.businessUnit = data.bu_name;

      $page.variables.postCertHdrTrans.contractNo = data.contract_num;

      $page.variables.postCertHdrTrans.paymentType = data.payment_type;

      $page.variables.postCertHdrTrans.supplierName = data.vendor_name;

      $page.variables.postCertHdrTrans.supplierSite = data.vendor_site_code;

      $page.variables.postCreateCertHdr.p_application_id = key;

      $page.variables.postCreateCertHdr.P_CONTRACT_HEADER_ID = data.cont_header_id;

      $page.variables.postCreateCertHdr.P_CONTRACT_REVISION_NUMBER = data.revision_num;
    }
  }

  return SelectValueItemChangeChain;
});
