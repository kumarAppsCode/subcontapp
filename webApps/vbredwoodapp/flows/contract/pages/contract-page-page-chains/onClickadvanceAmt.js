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

  class onClickadvanceAmt extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;
       if ($page.variables.paymentCalOff) {

        const callFunctionResult = await $page.functions.advanceCal($page.variables.postContPayment.adv_calc_mode, $page.variables.getContractbyHeaderidVar.contract_amount, $page.variables.postContPayment.adv_percent, value);

        $page.variables.postContPayment.adv_amount = callFunctionResult.l_adv_amt;

        $page.variables.postContPayment.adv_percent = callFunctionResult.l_adv_per;
	   }
    }
  }

  return onClickadvanceAmt;
});
