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

  class onClickCalRetentionPer extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;
  

      if ($page.variables.paymentCalOff) {
        const callFunctionResult = await $page.functions.advanceCalRetention($page.variables.postContPayment.ret_calc_mode, $page.variables.getContractbyHeaderidVar.contract_amount, value, $page.variables.postContPayment.reten_amount);

        $page.variables.postContPayment.reten_amount = callFunctionResult.l_adv_amt;
      }
    }
  }

  return onClickCalRetentionPer;
});
