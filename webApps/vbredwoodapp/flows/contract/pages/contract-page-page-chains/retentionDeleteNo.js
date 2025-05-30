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

  class retentionDeleteNo extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodRetentionDeleteCloseResult = await Actions.callComponentMethod(context, {
        selector: '#RetentionDelete',
        method: 'close',
      });
    }
  }

  return retentionDeleteNo;
});
