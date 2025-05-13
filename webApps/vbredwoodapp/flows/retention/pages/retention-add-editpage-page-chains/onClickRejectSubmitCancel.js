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

  class onClickRejectSubmitCancel extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodRejectPopupCloseResult = await Actions.callComponentMethod(context, {
        selector: '#RejectPopup',
        method: 'close',
      });
    }
  }

  return onClickRejectSubmitCancel;
});
