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

  class SimpleCreateAndEditPageTemplateSpPrimaryActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.CertificationDetailsVar.approval_status_code === "Draft") {
      if ($application.functions.isFormValid("CertificationHdrForm")) {

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
          await Actions.fireNotificationEvent(context, {
            message: callRestSubContractPostCertificationHeaderResult.body.p_err_msg,
            summary: callRestSubContractPostCertificationHeaderResult.body.p_err_msg,
            displayMode: 'transient',
            type: 'info',
          });
            const callChainOnLoadResult = await Actions.callChain(context, {
              chain: 'onLoad',
            });
        }
      }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle._summary_35ac,
        });
      }
    }
  }

  return SimpleCreateAndEditPageTemplateSpPrimaryActionChain;
});
