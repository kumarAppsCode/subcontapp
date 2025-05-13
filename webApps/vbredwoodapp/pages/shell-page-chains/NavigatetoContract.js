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

  class NavigatetoContract extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const navigateToFlowContractResult = await Actions.navigateToFlow(context, {
        flow: 'contract',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.popupOpen',
        ],
      });

      $application.variables.onloadCheck = true;
    }
  }

  return NavigatetoContract;
});
