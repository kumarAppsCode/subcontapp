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

  class onClickDetach extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.drawerpopup = true;

      const callFunctionResult = await $page.functions.generate($page.variables.applLineADP.data);

      $page.variables.applLineADP_copy.data = callFunctionResult.payload.item;
    }
  }

  return onClickDetach;
});
