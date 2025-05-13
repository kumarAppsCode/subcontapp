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

  class onLoadpaymentInformation extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetContractbyPaymentResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getContractbyPayment',
        uriParams: {
          'p_header_id': $page.variables.p_ContractHeader,
          'p_term_id': '0',
        },
      });

      if (!callRestSubContractGetContractbyPaymentResult.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Rest Error.',
          message: 'Rest Error.',
        });
      } else if (callRestSubContractGetContractbyPaymentResult.body.count == 0) {
        $page.variables.paymentKey = '0';

        $page.variables.paymentMethod = 'CREATE';
      } else {
        $page.variables.paymentMethod = 'EDIT';
        $page.variables.postContPayment = callRestSubContractGetContractbyPaymentResult.body.items[0];
        $page.variables.paymentKey = callRestSubContractGetContractbyPaymentResult.body.items[0].term_id;
      }
    }
  }

  return onLoadpaymentInformation;
});
