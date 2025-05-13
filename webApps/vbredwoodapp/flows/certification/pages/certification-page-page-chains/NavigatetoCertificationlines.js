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

  class NavigatetoCertificationlines extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.CertificationDetailsVar.approval_status_code === 'Draft' ||
$page.variables.CertificationDetailsVar.approval_status_code === 'Rejected' ||
$page.variables.CertificationDetailsVar.approval_status_code === 'Withdraw') {      if ($application.functions.isFormValid("CertificationHdrForm")) {

        const callRestSubContractPostCertificationHeaderResult = await Actions.callRest(context, {
          endpoint: 'SubContract/postCertificationHeader',
          uriParams: {
            'P_METHOD': 'PUT',
            'P_PRIMARYKEY': $page.variables.pcertHeaderId,
          },
          body: $page.variables.postCertificationHdr,
        });

        if (!callRestSubContractPostCertificationHeaderResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: $application.translations.appBundle.RestAPIError,
            message: $application.translations.appBundle.RestAPIError,
          });
        } else  {

        const navigateToPageCertificationResult = await Actions.navigateToPage(context, {
              page: 'certification-',
              params: {
                pageVar: $page.variables.pageVar,
                pcerNum: $page.variables.pcerNum,
                pcertHeaderId: $page.variables.pcertHeaderId,
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
        const navigateToPageCertificationResult = await Actions.navigateToPage(context, {
          page: 'certification-',
          params: {
            pageVar: $page.variables.pageVar,
            pcerNum: $page.variables.pcerNum,
            pcertHeaderId: $page.variables.pcertHeaderId,
            pcontHeaderId: $page.variables.pcontHeaderId,
            previsionNum: $page.variables.previsionNum,
            taskId: $page.variables.taskId,
          },
        });
      }
  }
  }

  return NavigatetoCertificationlines;
});
