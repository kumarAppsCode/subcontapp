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

  class onClickLineSvae extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.generateLineDetail($page.variables.retLineADP.data, $page.variables.Sysdate, $application.variables.saasGetLogin.email_address);

      await $page.functions.printArrayValue(callFunctionResult.payload.items);

      const callRestSubContractPostRententionLineResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postRententionLine',
        uriParams: {
          'P_METHOD': 'PUT',
          'P_PRIMARYKEY': '-99',
        },
        body: callFunctionResult.payload,
      });

      if (!callRestSubContractPostRententionLineResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRententionLineResult.body.p_err_msg,
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRententionLineResult.body.p_err_msg,
          displayMode: 'transient',
          type: 'info',
        });
      }
    }
  }

  return onClickLineSvae;
});
