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

  class onClickApproveSubmitCancel extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodApprovePopUpCloseResult = await Actions.callComponentMethod(context, {
        selector: '#approvePopUp',
        method: 'close',
      });
    }
  }

  return onClickApproveSubmitCancel;
});
