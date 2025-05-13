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

  class SmartSearchPageTemplateSpPrimaryActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $application.variables.onloadCheck = true;

      const callChainOnClickPopupResetResult = await Actions.callChain(context, {
        chain: 'onClickPopupReset',
      });

      const callChainOnloadResult = await Actions.callChain(context, {
        chain: 'onload',
      });
    }
  }

  return SmartSearchPageTemplateSpPrimaryActionChain;
});
