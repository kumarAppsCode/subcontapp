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

  class onClickSubmitApprove extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodProgressMsgOpenResult = await Actions.callComponentMethod(context, {
        selector: '#progressMsg',
        method: 'open',
      });

      $page.variables.ApprovalBodyVar.action.id = 'APPROVE';
      $page.variables.ApprovalBodyVar.action.type = 'CUSTOM';
      $page.variables.ApprovalBodyVar.comment.commentScope = 'BPM';

      const callRestApprovalApiPutBpmApi40TasksTaskIdResult = await Actions.callRest(context, {
        endpoint: 'ApprovalService/putBpmApi4_0TasksTaskId',
        uriParams: {
          taskId: $page.variables.taskId,
        },
        body: $page.variables.ApprovalBodyVar,
      });

      if (!callRestApprovalApiPutBpmApi40TasksTaskIdResult.ok) {
        const callComponentMethodProgressMsgCloseResult = await Actions.callComponentMethod(context, {
          selector: '#progressMsg',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: callRestApprovalApiPutBpmApi40TasksTaskIdResult.statusText,
        });
      } else {
        const callComponentMethodProgressMsgClose2Result = await Actions.callComponentMethod(context, {
          selector: '#progressMsg',
          method: 'close',
        });

        const callComponentMethodApprovePopUpCloseResult = await Actions.callComponentMethod(context, {
          selector: '#approvePopUp',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Request Approved Successfully.',
          displayMode: 'transient',
          type: 'info',
        });

        const navigateToFlowGenericPageResult = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'generic-page',
          page: 'generic-page-pending-list',
        });
      }
    }
  }

  return onClickSubmitApprove;
});
