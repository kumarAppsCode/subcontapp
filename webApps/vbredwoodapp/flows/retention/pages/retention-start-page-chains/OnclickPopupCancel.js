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

  class OnclickPopupCancel extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodInformationCloseResult = await Actions.callComponentMethod(context, {
        selector: '#Information',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.contractObj',
        ],
      });
    }
  }

  return OnclickPopupCancel;
});
