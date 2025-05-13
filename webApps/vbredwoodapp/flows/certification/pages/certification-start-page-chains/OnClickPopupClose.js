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

  class OnClickPopupClose extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodCerticationDialogResult = await Actions.callComponentMethod(context, {
        selector: '#certicationDialog',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.postCreateCertHdr',
          '$page.variables.postCertHdrTrans',
        ],
      });
    }
  }

  return OnClickPopupClose;
});
