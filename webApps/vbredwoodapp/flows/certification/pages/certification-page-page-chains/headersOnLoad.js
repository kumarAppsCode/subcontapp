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

  class onLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetCertificationByHeaderIdResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getCertificationByHeaderId',
        uriParams: {
          'P_HeaderId': $page.variables.pcertHeaderId,
        },
      });

      if (!callRestSubContractGetCertificationByHeaderIdResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIErro,
          message: $application.translations.appBundle.RestAPIError,
        });
      } else {

        $page.variables.CertificationDetailsVar = callRestSubContractGetCertificationByHeaderIdResult.body.items[0];

        const callFunctionResult = await $page.functions.displayRetAmount($page.variables.CertificationDetailsVar.retention_amount, $page.variables.CertificationDetailsVar.retention_max_amount);

        $page.variables.DisplayRetObj = callFunctionResult;
        $page.variables.postCertificationHdr = callRestSubContractGetCertificationByHeaderIdResult.body.items[0];

        const callRestSubContractGetApprovalActionIDResult = await Actions.callRest(context, {
          endpoint: 'SubContract/GetApprovalActionID',
          uriParams: {
            'p_transaction_id': $page.variables.pcertHeaderId,
          },
        });

        if (!callRestSubContractGetApprovalActionIDResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Getting ActionId Rest Error.',
          });
        } else if (callRestSubContractGetApprovalActionIDResult.body.count > 0) {
          $page.variables.PostApproverReassignPkgVar.p_action_id = callRestSubContractGetApprovalActionIDResult.body.items[0].action_id;
          $page.variables.PostApproverReassignPkgVar.p_appr_level = callRestSubContractGetApprovalActionIDResult.body.items[0].approver_level;
          $page.variables.PostApproverReassignPkgVar.p_trx_id = $page.variables.pcertHeaderId;
          $page.variables.pcsInstanceNumber = callRestSubContractGetApprovalActionIDResult.body.items[0].approval_pcs_instance_num;
       
        }
      }
    }
  }

  return onLoad;
});
