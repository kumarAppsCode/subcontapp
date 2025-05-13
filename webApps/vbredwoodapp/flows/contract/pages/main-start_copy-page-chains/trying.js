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

  class trying extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.fireNotificationEvent(context, {
        summary: '1',
        message: '1',
        displayMode: 'dismissAfter',
        type: 'info',
        dismissAfter: 5000,
      });
    }
  }

  return trying;
});
