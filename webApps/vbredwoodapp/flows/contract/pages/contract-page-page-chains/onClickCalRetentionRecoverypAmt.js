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

  class onClickCalRetentionRecoverypAmt extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      
      if (value !== null) {
        const callFunctionResult = await $page.functions.advanceCalRetentionRecovery($page.variables.postContPayment.ret_rel_calc_mode, $page.variables.getContractbyHeaderidVar.contract_amount, $page.variables.postContPayment.reten_rel_percent, value);

        $page.variables.postContPayment.reten_rel_percent = callFunctionResult.l_adv_per;
      }

    }
  }

  return onClickCalRetentionRecoverypAmt;
});
