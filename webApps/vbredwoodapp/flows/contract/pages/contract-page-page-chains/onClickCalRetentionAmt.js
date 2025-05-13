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

  class onClickCalRetentionAmt extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;
       if ($page.variables.paymentCalOff) {
  
  
        const callFunctionResult = await $page.functions.advanceCalRetention($page.variables.postContPayment.ret_calc_mode, $page.variables.getContractbyHeaderidVar.contract_amount, $page.variables.postContPayment.reten_percent, value);

        $page.variables.postContPayment.reten_percent = callFunctionResult.l_adv_per;
      }
    }
  }

  return onClickCalRetentionAmt;
});
