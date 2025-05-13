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

  class onClickPaymentType extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { value, key, index, current }) {
      const { $page, $flow, $application } = context;

      $page.variables.quantityTrigger = '0';

      $page.variables.PercentageTrigger = '0';

      const callFunctionResult = await $page.functions.paymentTypeBasedValue(index, value);
    }
  }

  return onClickPaymentType;
});
