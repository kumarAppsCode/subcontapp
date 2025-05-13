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

  class appSaveandCreate extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($application.functions.isFormValid("ApplicationForm")) {
        const callComponentMethodApplicationInformationOpenResult = await Actions.callComponentMethod(context, {
          selector: '#ApplicationInformation',
          method: 'open',
        }, { id: 'appSaveOk' });
      }
    }
  }

  return appSaveandCreate;
});
