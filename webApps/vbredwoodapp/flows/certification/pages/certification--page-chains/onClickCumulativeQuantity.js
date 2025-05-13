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

  class inLineCumulativeQuantityCal extends ActionChain {

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

   if (value !== null && $page.variables.PercentageTrigger === '0') {
        $page.variables.quantityTrigger = '1';

        const callFunctionResult = await $page.functions.calculateQuantityValues(current.row.pre_quantity, current.row.pre_amount, current.row.pre_percentage, current.row.quantity, current.row.cont_line_amount, 'quantity', value, current.row.cur_ret_percentage, index);
      }


    }
  }

  return inLineCumulativeQuantityCal;
});
