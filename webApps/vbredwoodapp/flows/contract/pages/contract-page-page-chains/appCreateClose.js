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

  class appCreateClose extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodApplicationCreateCloseResult = await Actions.callComponentMethod(context, {
        selector: '#ApplicationCreate',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.postCreateApplHdr',
        ],
      });
    }
  }

  return appCreateClose;
});
