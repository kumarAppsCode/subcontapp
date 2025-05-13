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

  class certDeleteNo extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodCertificationDeleteCloseResult = await Actions.callComponentMethod(context, {
        selector: '#CertificationDelete',
        method: 'close',
      });
    }
  }

  return certDeleteNo;
});
