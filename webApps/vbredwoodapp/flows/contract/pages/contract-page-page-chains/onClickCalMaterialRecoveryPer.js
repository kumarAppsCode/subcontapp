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

  class onClickCalMaterialRecoveryPer extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

 if (value !== null) {
        const callFunctionResult = await $page.functions.advanceCalMaterialRecovery($page.variables.postContPayment.mat_adv_rec_calc_mode, $page.variables.getContractbyHeaderidVar.contract_amount, value, $page.variables.postContPayment.mat_adv_rec_amount);

        $page.variables.postContPayment.mat_adv_rec_amount = callFunctionResult.l_adv_amt;
      }

    }
  }

  return onClickCalMaterialRecoveryPer;
});
