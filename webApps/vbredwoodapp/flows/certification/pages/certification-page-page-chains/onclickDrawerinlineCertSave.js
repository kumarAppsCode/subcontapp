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

  class onclickDrawerinlineCertSave extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callChainSimpleCreateAndEditPageTemplateSpPrimaryActionChainResult = await Actions.callChain(context, {
        chain: 'SimpleCreateAndEditPageTemplateSpPrimaryActionChain',
      });
    }
  }

  return onclickDrawerinlineCertSave;
});
