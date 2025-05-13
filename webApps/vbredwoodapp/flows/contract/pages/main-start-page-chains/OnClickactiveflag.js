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

  class OnClickactiveflag extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if (value == true) {

        $page.variables.postContractTestVar.P_CONTRACT_STATUS = 'Y';
      } else {

        $page.variables.postContractTestVar.P_CONTRACT_STATUS = 'N';
      }
    }
  }

  return OnClickactiveflag;
});
