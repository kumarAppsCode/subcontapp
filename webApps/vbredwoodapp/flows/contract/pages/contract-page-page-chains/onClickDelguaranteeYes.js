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

  class onClickDelguaranteeYes extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractPostPkgContractGuaranteeResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postPkgContractGuarantee',
        uriParams: {
          'P_METHOD': 'DELETE',
          'P_PRIMARYKEY': $page.variables.guaranteeKey,
        },
      });

      if (!callRestSubContractPostPkgContractGuaranteeResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostPkgContractGuaranteeResult.body.p_err_msg,
          displayMode: 'transient',
          message: callRestSubContractPostPkgContractGuaranteeResult.body.p_err_msg,
          type: 'confirmation',
        });

        const callChainOnLoadGuaranteeInfoResult = await Actions.callChain(context, {
          chain: 'onLoadGuaranteeInfo',
        });

        const callComponentMethodDeleteGuaranteeCloseResult = await Actions.callComponentMethod(context, {
          selector: '#DeleteGuarantee',
          method: 'close',
        });
      }
    }
  }

  return onClickDelguaranteeYes;
});
