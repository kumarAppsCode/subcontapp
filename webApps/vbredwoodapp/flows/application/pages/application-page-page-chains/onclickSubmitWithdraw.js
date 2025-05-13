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

  class onclickSubmitWithdraw extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodProgressMsgOpenResult = await Actions.callComponentMethod(context, {
        selector: '#progressMsg',
        method: 'open',
      });

      $page.variables.postApproveWithdrawVar.p_action_id = $page.variables.PostApproverReassignPkgVar.p_action_id;
      $page.variables.postApproveWithdrawVar.p_trx_id = $page.variables.papplHeaderId;
      $page.variables.postApproveWithdrawVar.p_approval_process = 'APPLICATION';

      const callRestSubContractPostApperovalWithdrawResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postApperovalWithdraw',
        body: $page.variables.postApproveWithdrawVar,
      });

      if (callRestSubContractPostApperovalWithdrawResult.body.p_error_code === 'E') {

        const callComponentMethodProgressMsgCloseResult = await Actions.callComponentMethod(context, {
          selector: '#progressMsg',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostApperovalWithdrawResult.body.p_error_msg,
        });
      } else if (callRestSubContractPostApperovalWithdrawResult.body.p_error_code === 'S') {
        $page.variables.ProcessAbortApiWithdrawVar.id = 'abort';
        const callRestPCSRestServiceProcessAbortApiWithdrawResult = await Actions.callRest(context, {
          endpoint: 'PCSRestService/ProcessAbortApiWithdraw',
          uriParams: {
            instanceId: $page.variables.pcsInstanceNumber,
          },
          body: $page.variables.ProcessAbortApiWithdrawVar,
        });

        if (!callRestPCSRestServiceProcessAbortApiWithdrawResult.ok) {
          
           const callComponentMethodProgressMsgCloseResult = await Actions.callComponentMethod(context, {
          selector: '#progressMsg',
          method: 'close',
        });
          
          const callComponentMethodWithdrawpopupCloseResult = await Actions.callComponentMethod(context, {
            selector: '#withdrawpopup',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: callRestPCSRestServiceProcessAbortApiWithdrawResult.statusText,
          });
        } else {

          const callChainOnLoadResult = await Actions.callChain(context, {
            chain: 'onLoad',
          });

           const callComponentMethodProgressMsgCloseResult = await Actions.callComponentMethod(context, {
          selector: '#progressMsg',
          method: 'close',
        });

          const callComponentMethodWithdrawpopupClose2Result = await Actions.callComponentMethod(context, {
            selector: '#withdrawpopup',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Request Withdraw Successfully.',
            displayMode: 'transient',
            type: 'info',
          });
        }
      }
    }
  }

  return onclickSubmitWithdraw;
});
