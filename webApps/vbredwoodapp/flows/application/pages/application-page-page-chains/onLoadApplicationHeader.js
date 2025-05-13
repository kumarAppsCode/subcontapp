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

  class onLoadApplicationHeader extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetApplicationheaderByIdResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getApplicationheaderById',
        uriParams: {
          'p_header_id': $page.variables.papplHeaderId,
        },
      });

      if (!callRestSubContractGetApplicationheaderByIdResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestApiError,
        });
      } else {

        $page.variables.ApplicationheaderDetailsVar = callRestSubContractGetApplicationheaderByIdResult.body.items[0];

        $page.variables.postApplHdr = callRestSubContractGetApplicationheaderByIdResult.body.items[0];
        const callRestSubContractGetApprovalActionIDResult = await Actions.callRest(context, {
          endpoint: 'SubContract/GetApprovalActionID',
          uriParams: {
            'p_transaction_id': $page.variables.papplHeaderId,
          },
        });

        if (!callRestSubContractGetApprovalActionIDResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Getting ActionId Rest Error.',
          });
        } else if (callRestSubContractGetApprovalActionIDResult.body.count > 0) {
          $page.variables.PostApproverReassignPkgVar.p_action_id = callRestSubContractGetApprovalActionIDResult.body.items[0].action_id;
          $page.variables.PostApproverReassignPkgVar.p_appr_level = callRestSubContractGetApprovalActionIDResult.body.items[0].approver_level;
          $page.variables.PostApproverReassignPkgVar.p_trx_id = $page.variables.papplHeaderId;
          $page.variables.pcsInstanceNumber = callRestSubContractGetApprovalActionIDResult.body.items[0].approval_pcs_instance_num;
        }

        const callFunctionResult = await $page.functions.displayRetAmount($page.variables.ApplicationheaderDetailsVar.retention_amount, $page.variables.ApplicationheaderDetailsVar.retention_max_amount);

        $page.variables.ret_obj = callFunctionResult;

        const callFunction2Result = await $page.functions.convertJsonToString($page.variables.postApplHdr);

        $page.variables.initialData = callFunction2Result;
      }
    }
  }

  return onLoadApplicationHeader;
});
