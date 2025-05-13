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

      if ($page.variables.paymentCalOff) {

        const callChainUpdatePaymentResult = await Actions.callChain(context, {
          chain: 'updatePayment',
        });
      } else {
        const callComponentMethodAboutOpenResult = await Actions.callComponentMethod(context, {
          selector: '#About',
          method: 'open',
        });
      }
    }
  }

  return SimpleCreateAndEditPageTemplateSpPrimaryActionChain;
});
