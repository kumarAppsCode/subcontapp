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

  class onClickWithdrawPopupNo extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodWithdrawpopupCloseResult = await Actions.callComponentMethod(context, {
        selector: '#withdrawpopup',
        method: 'close',
      });
    }
  }

  return onClickWithdrawPopupNo;
});
