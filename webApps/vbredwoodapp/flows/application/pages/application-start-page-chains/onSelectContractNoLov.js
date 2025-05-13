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

  class onSelectContractNoLov extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      $page.variables.postCreateApplHdr.P_CONTRACT_HEADER_ID = data.header_id;

      $page.variables.postCreateApplHdr.P_CONTRACT_REVISION_NUMBER = data.revision_num;

      $page.variables.postHeaderTrans.businessUnit = data.bu_name;

      $page.variables.postHeaderTrans.supplierName = data.vendor_name;

      $page.variables.postHeaderTrans.supplierSite = data.vendor_site_code;
    }
  }

  return onSelectContractNoLov;
});
