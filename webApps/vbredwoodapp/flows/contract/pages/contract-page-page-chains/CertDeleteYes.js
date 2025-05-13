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

  class CertDeleteYes extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractPostCertificationHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postCertificationHeader',
        uriParams: {
          'P_PRIMARYKEY': $page.variables.certDeletekey,
          'P_METHOD': 'DELETE',
        },
      });

      if (!callRestSubContractPostCertificationHeaderResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostCertificationHeaderResult.body.p_err_msg,
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          message: callRestSubContractPostCertificationHeaderResult.body.p_err_msg,
          summary: callRestSubContractPostCertificationHeaderResult.body.p_err_msg,
          displayMode: 'transient',
          type: 'info',
        });

        const callComponentMethodCertificationDeleteCloseResult = await Actions.callComponentMethod(context, {
          selector: '#CertificationDelete',
          method: 'close',
        });

        const callChainCertificationHeadersLoadResult = await Actions.callChain(context, {
          chain: 'certificationHeadersLoad',
        });
      }
    }
  }

  return CertDeleteYes;
});
