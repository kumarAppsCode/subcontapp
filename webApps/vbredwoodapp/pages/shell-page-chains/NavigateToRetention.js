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

  class NavigateToRetention extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const navigateToFlowRetentionResult = await Actions.navigateToFlow(context, {
        flow: 'retention',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.popupOpen',
        ],
      });

      $application.variables.onloadCheck = true;
    }
  }

  return NavigateToRetention;
});
