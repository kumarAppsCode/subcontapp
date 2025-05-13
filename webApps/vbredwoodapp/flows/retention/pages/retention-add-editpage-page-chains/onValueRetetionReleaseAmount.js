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

  class onValueRetetionReleaseAmount extends ActionChain {

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
      

      const callFunctionResult = await $page.functions.cumulativeAmountBasedValue(index, $page.variables.retLineADP.data);

      $page.variables.postRententionHeaderSaveVar.ret_rel_amount = callFunctionResult;
    }
  }

  return onValueRetetionReleaseAmount;
});
