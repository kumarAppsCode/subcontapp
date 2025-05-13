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

  class onClickAdvanceRecovery extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if ($page.variables.paymentCalOff) {
        const callFunctionResult = await $page.functions.advanceRecoveryCal($page.variables.postContPayment.adv_rec_calc_mode, $page.variables.getContractbyHeaderidVar.contract_amount, value, $page.variables.postContPayment.adv_rec_amount);

        $page.variables.postContPayment.adv_rec_amount = callFunctionResult.l_adv_amt;
      }
    }
  }

  return onClickAdvanceRecovery;
});
