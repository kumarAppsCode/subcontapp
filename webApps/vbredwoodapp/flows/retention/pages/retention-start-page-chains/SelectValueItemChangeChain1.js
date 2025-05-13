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

  class SelectValueItemChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      $page.variables.searchObject.rententionReleaseNumber = data.ret_rel_number;

      $page.variables.transSearchObj.supplierName = data.vendor_name;

      $page.variables.transSearchObj.supplierSite = data.vendor_site_code;
    }
  }

  return SelectValueItemChangeChain1;
});
