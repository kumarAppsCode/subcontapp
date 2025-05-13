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

  class OnClickPopupCancel extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodInformationCloseResult = await Actions.callComponentMethod(context, {
        selector: '#Information',
        method: 'close',
      });
    }
  }

  return OnClickPopupCancel;
});
