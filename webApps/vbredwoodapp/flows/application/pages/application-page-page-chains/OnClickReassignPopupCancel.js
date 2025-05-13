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

  class OnClickReassignPopupCancel extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodReassignCloseResult = await Actions.callComponentMethod(context, {
        selector: '#Reassign',
        method: 'close',
      });
    }
  }

  return OnClickReassignPopupCancel;
});
