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

  class onClickOk extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractPostCertificationHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postCertificationHeader',
        uriParams: {
          'P_METHOD': 'DELETE',
          'P_PRIMARYKEY': $page.variables.deleteKey,
        },
        body: $page.variables.postCreateCertHdr,
      });

      if (!callRestSubContractPostCertificationHeaderResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
        });
      } else {

        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostCertificationHeaderResult.body.p_err_msg,
          message: callRestSubContractPostCertificationHeaderResult.body.p_err_msg,
          displayMode: 'transient',
          type: 'info',
        });
        const callChainOnClickNoResult = await Actions.callChain(context, {
          chain: 'onClickNo',
        });
      }
    }
  }

  return onClickOk;
});
