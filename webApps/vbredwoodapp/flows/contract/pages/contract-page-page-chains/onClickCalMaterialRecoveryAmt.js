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

  class onClickCalMaterialRecoveryAmt extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

       if (value !== null) {
        const callFunctionResult = await $page.functions.advanceCalMaterialRecovery($page.variables.postContPayment.mat_adv_rec_calc_mode, $page.variables.getContractbyHeaderidVar.contract_amount, $page.variables.postContPayment.mat_adv_rec_percent, value);

        $page.variables.postContPayment.mat_adv_rec_percent = callFunctionResult.l_adv_per;
      }
    }
  }

  return onClickCalMaterialRecoveryAmt;
});
