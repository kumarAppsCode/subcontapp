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

  class onClickCalMaterialAmt extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;
       if (value !== null) {
        const callFunctionResult = await $page.functions.advanceCalMaterial($page.variables.postContPayment.mat_calc_mode, $page.variables.getContractbyHeaderidVar.contract_amount, $page.variables.postContPayment.material_percent, value);

        $page.variables.postContPayment.material_percent = callFunctionResult.l_adv_per;
      }

    }
  }

  return onClickCalMaterialAmt;
});
