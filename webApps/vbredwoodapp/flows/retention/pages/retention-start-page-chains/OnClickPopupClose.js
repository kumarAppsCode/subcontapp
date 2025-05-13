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

  class OnClickPopupClose extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodRetentionCloseResult = await Actions.callComponentMethod(context, {
        selector: '#Retention',
        method: 'close',
      });
    }
  }

  return OnClickPopupClose;
});
