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

  class certSaveCreate extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($application.functions.isFormValid("CertificationForm")) {
        const callComponentMethodCertificationInformationOpenResult = await Actions.callComponentMethod(context, {
          selector: '#CertificationInformation',
          method: 'open',
        });
      }
    }
  }

  return certSaveCreate;
});
