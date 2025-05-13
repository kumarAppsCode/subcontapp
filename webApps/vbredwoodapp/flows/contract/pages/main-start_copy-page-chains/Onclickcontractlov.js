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

  class Onclickcontractlov extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      $page.variables.searchObj.contractNum = data.contract_num;

      $page.variables.transSearchObj.supplierName = data.vendor_name;

      $page.variables.transSearchObj.supplierSite = data.vendor_site_code;

      $page.variables.transSearchObj.vendor_id = data.vendor_id;
    }
  }

  return Onclickcontractlov;
});
