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

  class AppSaveCancel extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodApplicationInformationCloseResult = await Actions.callComponentMethod(context, {
        selector: '#ApplicationInformation',
        method: 'close',
      });
    }
  }

  return AppSaveCancel;
});
