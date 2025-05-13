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

  class OnClickRetention extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodRetentionOpenResult = await Actions.callComponentMethod(context, {
        selector: '#Retention',
        method: 'open',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.contractObj',
        ],
      });
    }
  }

  return OnClickRetention;
});
