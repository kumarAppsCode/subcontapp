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

  class SwitchValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if (value == true) {
        $page.variables.newSearchObj.p_contract_status = 'Y';
      } else {
        $page.variables.newSearchObj.p_contract_status = 'N';
      }
    }
  }

  return SwitchValueChangeChain;
});
