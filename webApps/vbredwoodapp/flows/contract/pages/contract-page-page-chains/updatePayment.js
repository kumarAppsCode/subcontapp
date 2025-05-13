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

  class updatePayment extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.postContPayment.revision_num = $page.variables.p_Revision_Number;

      $page.variables.postContPayment.bu_id = $page.variables.pBuId;

      $page.variables.postContPayment.header_id = $page.variables.p_ContractHeader;

      const callFunctionResult1 = await $page.functions.onPageNaviFun($page.variables.paymentMethod, undefined);

      const callFunctionResult2 = await $page.functions.getPrimaryKey($page.variables.paymentMethod, $page.variables.paymentKey);

      const callRestSubContractPostContracttermsResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postContractterms',
        uriParams: {
          'P_METHOD': callFunctionResult1,
          'P_PRIMARYKEY': callFunctionResult2,
        },
        body: $page.variables.postContPayment,
      });

      if (!callRestSubContractPostContracttermsResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Rest Error.',
          message: 'Rest Error.',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          message: callRestSubContractPostContracttermsResult.body.p_err_msg,
          summary: callRestSubContractPostContracttermsResult.body.p_err_msg,
          type: 'info',
        });

        const callChainPaymentInformationResult = await Actions.callChain(context, {
          chain: 'onLoadpaymentInformation',
        });
      }
    }
  }

  return updatePayment;
});
