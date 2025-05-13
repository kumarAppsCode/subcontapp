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

  class onClickRetentionReleaseClose extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodRetetionInformationCloseResult = await Actions.callComponentMethod(context, {
        selector: '#RetetionInformation',
        method: 'close',
      });
    }
  }

  return onClickRetentionReleaseClose;
});
