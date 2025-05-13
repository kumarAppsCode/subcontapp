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

  class OnClickPopupSaveandCreate extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.functions.isFormValid("applicationForm")) {
        const callComponentMethodInformationOpenResult = await Actions.callComponentMethod(context, {
          selector: '#Information',
          method: 'open',
        });
      }
    }
  }

  return OnClickPopupSaveandCreate;
});
