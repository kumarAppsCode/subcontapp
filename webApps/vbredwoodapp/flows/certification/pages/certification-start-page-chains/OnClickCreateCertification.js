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

  class OnClickCreateCertification extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodCerticationDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#certicationDialog',
        method: 'open',
      });
    }
  }

  return OnClickCreateCertification;
});
