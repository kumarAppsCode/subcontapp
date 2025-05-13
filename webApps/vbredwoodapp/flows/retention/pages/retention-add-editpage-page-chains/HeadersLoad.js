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

  class HeadersLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractFindbyRetentionHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/FindbyRetentionHeader',
        uriParams: {
          'p_header_id': $page.variables.pRetHeader_id,
        },
      });

      if (!callRestSubContractFindbyRetentionHeaderResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
          message: $application.translations.appBundle.RestAPIError,
        });
      } else {
        $page.variables.PostHeaderVar = callRestSubContractFindbyRetentionHeaderResult.body.items[0];
        $page.variables.postRententionHeaderSaveVar = callRestSubContractFindbyRetentionHeaderResult.body.items[0];

        const callRestSubContractGetApprovalActionIDResult = await Actions.callRest(context, {
          endpoint: 'SubContract/GetApprovalActionID',
          uriParams: {
            'p_transaction_id': $page.variables.pRetHeader_id,
          },
        });

        if (!callRestSubContractGetApprovalActionIDResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Getting ActionId Rest Error.',
          });
        } else if (callRestSubContractGetApprovalActionIDResult.body.count  > 0) {
          $page.variables.PostApproverReassignPkgVar.p_action_id = callRestSubContractGetApprovalActionIDResult.body.items[0].action_id;
          $page.variables.PostApproverReassignPkgVar.p_appr_level = callRestSubContractGetApprovalActionIDResult.body.items[0].approver_level;
          $page.variables.PostApproverReassignPkgVar.p_trx_id = $page.variables.pRetHeader_id;
          $page.variables.pcsInstanceNumber = callRestSubContractGetApprovalActionIDResult.body.items[0].approval_pcs_instance_num;
        }
      }
    }
  }

  return HeadersLoad;
});
