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

  class NavigateToApplication extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const navigateToFlowApplicationResult = await Actions.navigateToFlow(context, {
        flow: 'application',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.popupOpen',
        ],
      });

      $application.variables.onloadCheck = true;
    }
  }

  return NavigateToApplication;
});
