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

  class Onclickpopupclose extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodApplicationCloseResult = await Actions.callComponentMethod(context, {
        selector: '#Application',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.postCreateApplHdr',
          '$page.variables.postHeaderTrans',
        ],
      });
    }
  }

  return Onclickpopupclose;
});
