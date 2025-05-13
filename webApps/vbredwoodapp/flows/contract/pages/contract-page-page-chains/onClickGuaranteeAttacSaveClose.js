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

  class onClickGuaranteeAttacSaveClose extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callChainOnClickGuaranteeAttacSaveAddResult = await Actions.callChain(context, {
        chain: 'onClickGuaranteeAttacSaveAdd',
      });

      const callComponentMethodAttachmentCloseResult = await Actions.callComponentMethod(context, {
        selector: '#Attachment',
        method: 'close',
      });
    }
  }

  return onClickGuaranteeAttacSaveClose;
});
