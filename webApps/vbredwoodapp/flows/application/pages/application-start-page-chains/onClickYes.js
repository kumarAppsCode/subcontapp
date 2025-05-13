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

  class onClickYes extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractPostApplicationHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postApplicationHeader',
        uriParams: {
          'P_METHOD': 'DELETE',
          'P_PRIMARYKEY': $page.variables.deleteKey,
        },
        body: $page.variables.postCreateApplHdr,
      });

      if (!callRestSubContractPostApplicationHeaderResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostApplicationHeaderResult.body.p_err_msg,
          message: callRestSubContractPostApplicationHeaderResult.body.p_err_msg,
          displayMode: 'transient',
          type: 'info',
        });

        const callChainOnClickNoResult = await Actions.callChain(context, {
          chain: 'onClickNo',
        });
      }
    }
  }

  return onClickYes;
});
