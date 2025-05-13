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

  class certCreateClose extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodCertificationCreateCloseResult = await Actions.callComponentMethod(context, {
        selector: '#CertificationCreate',
        method: 'close',
      });
    }
  }

  return certCreateClose;
});
