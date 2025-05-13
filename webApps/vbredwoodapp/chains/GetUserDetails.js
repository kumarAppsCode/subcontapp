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

  class GetUserDetails extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $application } = context;

      const callRestSubContractGetApprovalSaasloginGetResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getApprovalSaasloginGet',
        uriParams: {
          saasuserlogin: $application.variables.loginuser,
        },
      });

      if (callRestSubContractGetApprovalSaasloginGetResult.body.count === 1) {
        $application.variables.saasGetLogin = callRestSubContractGetApprovalSaasloginGetResult.body.items[0];
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle._summary,
        });
      }
    }
  }

  return GetUserDetails;
});
