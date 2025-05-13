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

  class onClickAdvanceRecoveryAmt extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

        if ($page.variables.paymentCalOff) {
        const callFunctionResult = await $page.functions.advanceRecoveryCal($page.variables.postContPayment.adv_rec_calc_mode, $page.variables.getContractbyHeaderidVar.contract_amount, $page.variables.postContPayment.adv_rec_percent, value);

        $page.variables.postContPayment.adv_rec_percent = callFunctionResult.l_adv_per;
      }
      
    }
  }

  return onClickAdvanceRecoveryAmt;
});
