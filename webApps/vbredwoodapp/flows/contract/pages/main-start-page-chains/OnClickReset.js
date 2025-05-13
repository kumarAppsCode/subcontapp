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

  class OnClickReset extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $application.variables.onloadCheck = true;

      const callChainOnloadResult = await Actions.callChain(context, {
        chain: 'onload',
      });
    }
  }

  return OnClickReset;
});
