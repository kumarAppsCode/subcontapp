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

  class certCreateCancel extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodCertificationInformationCloseResult = await Actions.callComponentMethod(context, {
        selector: '#CertificationInformation',
        method: 'close',
      });
    }
  }

  return certCreateCancel;
});
