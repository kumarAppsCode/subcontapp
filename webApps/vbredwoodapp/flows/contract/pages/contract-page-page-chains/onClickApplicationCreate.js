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

  class onClickApplicationCreate extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.getContractbyHeaderidVar.approval_status_code === "Approved") {
        const callComponentMethodApplicationCreateOpenResult = await Actions.callComponentMethod(context, {
          selector: '#ApplicationCreate',
          method: 'open',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          type: 'warning',
          summary: 'Contract Should be Approved.',
        });
      }
    }
  }

  return onClickApplicationCreate;
});
