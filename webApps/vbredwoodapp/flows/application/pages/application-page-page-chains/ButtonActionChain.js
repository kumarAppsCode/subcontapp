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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.generate1($page.variables.applLineADP_copy.data);

      $page.variables.applLineADP.data = callFunctionResult.payload.item;

      $page.variables.drawerpopup = false;
    }
  }

  return ButtonActionChain;
});
