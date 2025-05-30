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

  class onclicksaasmenu extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.popupOpen',
        ],
      });

      $page.variables.popupOpen = 'Y';
    }
  }

  return onclicksaasmenu;
});
