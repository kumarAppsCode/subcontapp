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
        case 'about':
        {
          const callComponentMethodAboutOpenResult = await Actions.callComponentMethod(context, {
            selector: '#About',
            method: 'open',
          });

      }
          break;
        case 'approvalhistory':
        {
          const navigateToFlowGenericPageResult = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'generic-page',
            page: 'generic-approval-history',
            params: {
              'p_appr_code': 'CONTRACT',
              'p_type_id': $page.variables.p_ContractHeader,
            },
          });
      }
          break;
        case 'attachment':
        {
          const navigateToFlowGenericPage2Result = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'generic-page',
            page: 'generic-attachment',
            params: {
              'p_appl_code': 'CONTRACT',
              'p_appl_ref_id': $page.variables.p_ContractHeader,
              'p_appl_ref_num': $page.variables.pContNum,
            },
          });
      }
          break;
        case 'submit':{
          $page.variables.postSubmitForApprovalPkgVar.P_APPR_PROCESS = 'SC_CONT';

          $page.variables.postSubmitForApprovalPkgVar.P_TRX_ID = $page.variables.p_ContractHeader;

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
              type: 'info',
              summary: callRestSubContractPostSubmitForApprovalPkgResult.body.P_ERROR_MSG,
            });
          }
        }
          break;
        default:
          break;
      }
    }
  }

  return SimpleCreateAndEditPageTemplateSpSecondaryActionChain;
});
