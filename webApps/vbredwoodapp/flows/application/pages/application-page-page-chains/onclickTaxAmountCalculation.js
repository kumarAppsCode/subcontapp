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

  class onclickTaxAmountCalculation extends ActionChain {

    /**
     * previously calculated by using tax rate and current Amount
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if (1 === 2) {
        const callFunctionResult = await $page.functions.calculateTaxAndNetAmount(value, $page.variables.postApplHdr.tax_rate);

        $page.variables.postApplHdr.tax_amount = callFunctionResult.taxAmount;

        $page.variables.postApplHdr.net_amount = callFunctionResult.netAmount;
      }
    }
  }

  return onclickTaxAmountCalculation;
});
