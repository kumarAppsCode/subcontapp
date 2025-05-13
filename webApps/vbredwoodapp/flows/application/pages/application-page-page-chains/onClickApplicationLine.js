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

  class onClickApplicationLine extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.ApplicationheaderDetailsVar.approval_status_code === "Draft") {

      if ($application.functions.isFormValid("applicationHdrForm")) {
        const callRestSubContractPostApplicationHeaderResult = await Actions.callRest(context, {
          endpoint: 'SubContract/postApplicationHeader',
          uriParams: {
            'P_METHOD': 'PUT',
            'P_PRIMARYKEY': $page.variables.papplHeaderId,
          },
          body: $page.variables.postApplHdr,
        });

        if (!callRestSubContractPostApplicationHeaderResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Rest API Error',
          });
        } else  {
            const navigateToPageApplicationLineResult = await Actions.navigateToPage(context, {
              page: 'application-line',
              params: {
                pageVar: $page.variables.pageVar,
                papplHeaderId: $page.variables.papplHeaderId,
                pcontHeaderId: $page.variables.pcontHeaderId,
                previsionNum: $page.variables.previsionNum,
                taskId: $page.variables.taskId,
              },
            });
        }
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Fill The Required Fields.',
            type: 'warning',
          });
      }
      } else {
        const navigateToPageApplicationLineResult = await Actions.navigateToPage(context, {
          page: 'application-line',
          params: {
            pageVar: $page.variables.pageVar,
            papplHeaderId: $page.variables.papplHeaderId,
            pcontHeaderId: $page.variables.pcontHeaderId,
            previsionNum: $page.variables.previsionNum,
            taskId: $page.variables.taskId,
          },
        });
      }
    }
  }

  return onClickApplicationLine;
});
