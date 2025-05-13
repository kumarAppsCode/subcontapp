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

  class NavigatetoApprovalRole extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const navigateToFlowAdminSetupResult = await Actions.navigateToFlow(context, {
        flow: 'admin-setup',
        page: 'approval-role',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.popupOpen',
        ],
      });
    }
  }

  return NavigatetoApprovalRole;
});
