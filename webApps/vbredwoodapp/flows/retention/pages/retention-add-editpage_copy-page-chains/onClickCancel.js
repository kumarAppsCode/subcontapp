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

  class onClickCancel extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodInlineeditpopupCloseResult = await Actions.callComponentMethod(context, {
        selector: '#inlineeditpopup',
        method: 'close',
      });
    }
  }

  return onClickCancel;
});
