
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

  class OnCLickSubmitReassign extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($application.functions.isFormValid("reassignvalidation")) {
        const callRestSubContractPostApproverReassignPkgResult = await Actions.callRest(context, {
          endpoint: 'SubContract/PostApproverReassignPkg',
          body: $page.variables.PostApproverReassignPkgVar,
        });

        if (!callRestSubContractPostApproverReassignPkgResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: callRestSubContractPostApproverReassignPkgResult.body.p_error_msg,
          });
        } else {
$page.variables.PutReassignProcessBodyVar.action.id = "REASSIGN";
          $page.variables.PutReassignProcessBodyVar.action.type = 'SYSTEM';
          $page.variables.PutReassignProcessBodyVar.comment.commentScope = 'TASK';
          $page.variables.reassignIndentifierVar.id = $page.variables.reassignIdentityEmail;
          $page.variables.reassignIndentifierVar.type = 'user';
          $page.variables.PutReassignProcessBodyVar.identities[0] = $page.variables.reassignIndentifierVar;
          $page.variables.PutReassignProcessBodyVar.comment.commentStr = $page.variables.PutReassignProcessBodyVar.p_comments;

          const callRestPCSRestServiceReassignProcessAPIResult = await Actions.callRest(context, {
            endpoint: 'PCSRestService/ReassignProcessAPI',
            uriParams: {
              taskId: $page.variables.taskId,
            },
            body: $page.variables.PutReassignProcessBodyVar,
          });

          if (!callRestPCSRestServiceReassignProcessAPIResult.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: callRestPCSRestServiceReassignProcessAPIResult.statusText,
            });
          } else {
            const callComponentMethodReassignCloseResult = await Actions.callComponentMethod(context, {
              selector: '#Reassign',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: callRestSubContractPostApproverReassignPkgResult.body.p_error_msg,
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
    }
  }

  return OnCLickSubmitReassign;
});