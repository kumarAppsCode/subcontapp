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

  class appDeleteNo extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodApplicationDeleteCloseResult = await Actions.callComponentMethod(context, {
        selector: '#ApplicationDelete',
        method: 'close',
      });
    }
  }

  return appDeleteNo;
});
