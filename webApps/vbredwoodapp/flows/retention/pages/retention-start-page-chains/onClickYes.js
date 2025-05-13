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

      const callRestSubContractPostRententionHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postRententionHeader',
        uriParams: {
          'P_PRIMARYKEY': $page.variables.DeleteKey,
          'P_METHOD': 'DELETE',
        },
      });

      if (!callRestSubContractPostRententionHeaderResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRententionHeaderResult.body.p_err_msg,
          message: callRestSubContractPostRententionHeaderResult.body.p_err_msg,
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
