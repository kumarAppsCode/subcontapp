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

  class createRetention extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.getContractbyHeaderidVar.approval_status_code === "Approved") {

        const callComponentMethodRetetionInformationOpenResult = await Actions.callComponentMethod(context, {
          selector: '#RetetionInformation',
          method: 'open',
        });
      }
    }
  }

  return createRetention;
});
