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

  class SimpleCreateAndEditPageTemplateSpSecondaryActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.actionId 
     */
    async run(context, { actionId }) {
      const { $page, $flow, $application } = context;

      switch (actionId) {
        case 'attachment':
          const navigateToFlowGenericPageResult = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'generic-page',
            page: 'generic-attachment',
            params: {
              'p_appl_code': 'RETENTION_HEADER',
              'p_appl_ref_id': $page.variables.pRetHeader_id,
              'p_appl_ref_num': $page.variables.PostHeaderVar.ret_rel_number,
            },
          });
          break;
        case 'approvalhistory':
          const navigateToFlowGenericPage2Result = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'generic-page',
            page: 'generic-approval-history',
            params: {
              'p_appr_code': 'RETENTION_RELEASE',
              'p_type_id': $page.variables.pRetHeader_id,
            },
          });
          break;
        case 'viewcontract':
          const navigateToFlowContractResult1 = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'contract',
            page: 'contract-page',
            params: {
              pBuId: $page.variables.PostHeaderVar.bu_id,
              'p_ContractHeader': $page.variables.p_ContHeaderId,
              'p_Revision_Number': $page.variables.PostHeaderVar.cont_revision_num,
              TabHideVar: false,
              pageVar: 'RET_REL',
              taskId: $page.variables.Task_id,
            },
          });
          break;
        case 'about':
          const callComponentMethodAboutOpenResult = await Actions.callComponentMethod(context, {
            selector: '#About',
            method: 'open',
          });
          break;
        case 'submit':
          $page.variables.postSubmitForApprovalPkgVar.P_APPR_PROCESS = 'SC_RET_REL';

          $page.variables.postSubmitForApprovalPkgVar.P_TRX_ID = $page.variables.pRetHeader_id;

          $page.variables.postSubmitForApprovalPkgVar.P_USER_ID = $application.variables.saasGetLogin.user_id;

          const callRestSubContractPostSubmitForApprovalPkgResult = await Actions.callRest(context, {
            endpoint: 'SubContract/postSubmitForApprovalPkg',
            body: $page.variables.postSubmitForApprovalPkgVar,
          });

          if (!callRestSubContractPostSubmitForApprovalPkgResult.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: callRestSubContractPostSubmitForApprovalPkgResult.body.P_ERROR_MSG,
            });
          } else {
            const callChainOnLoadResult = await Actions.callChain(context, {
              chain: 'onLoad',
            });

            await Actions.fireNotificationEvent(context, {
              displayMode: 'transient',
              summary: callRestSubContractPostSubmitForApprovalPkgResult.body.P_ERROR_MSG,
              type: 'info',
            });
          }
          break;
        default:
          break;
      }
    }
  }

  return SimpleCreateAndEditPageTemplateSpSecondaryActionChain;
});
