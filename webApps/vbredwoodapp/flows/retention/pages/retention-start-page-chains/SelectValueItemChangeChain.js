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

      if (data !== null) {
        $page.variables.contractObj.bu_id = data.bu_id;

        $page.variables.contractObj.businessUnit = data.bu_name;

        $page.variables.contractObj.revision_num = data.revision_num;

        $page.variables.contractObj.supplierName = data.vendor_name;

        $page.variables.contractObj.supplierSite = data.vendor_site_code;
      }
    }
  }

  return SelectValueItemChangeChain;
});
