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

  class onClickCalculateTaxAmount extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if (1 === 2) {
        $page.variables.postCertificationHdr.net_amount = $page.variables.postCertificationHdr.cur_amount;
      }
    }
  }

  return onClickCalculateTaxAmount;
});
