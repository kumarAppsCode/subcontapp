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

  class onValueChangeRetentionRecovery extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if (1 === 2) {
        const callFunctionResult = await $page.functions.calculateNetAmount($page.variables.postCertificationHdr.cur_amount, value, $page.variables.postCertificationHdr.cur_adv_rec_amount, $page.variables.postCertificationHdr.penalty, $page.variables.postCertificationHdr.tax_amount);

        $page.variables.postCertificationHdr.net_amount = callFunctionResult;
      }
    }
  }

  return onValueChangeRetentionRecovery;
});
