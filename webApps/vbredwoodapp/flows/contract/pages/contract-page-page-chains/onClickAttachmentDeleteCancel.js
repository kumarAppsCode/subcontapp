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

  class onClickAttachmentDeleteCancel extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodAttachmentDeleteCloseResult = await Actions.callComponentMethod(context, {
        selector: '#AttachmentDelete',
        method: 'close',
      });
    }
  }

  return onClickAttachmentDeleteCancel;
});
