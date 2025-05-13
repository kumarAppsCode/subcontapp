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

  class RetentionDelete extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractPostRententionHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postRententionHeader',
        uriParams: {
          'P_METHOD': 'DELETE',
          'P_PRIMARYKEY': $page.variables.RetenDeletekey,
        },
      });

      if (!callRestSubContractPostRententionHeaderResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRententionHeaderResult.body.p_err_msg,
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRententionHeaderResult.body.p_err_msg,
          displayMode: 'transient',
          type: 'info',
        });

        const callChainRetenreleaseHeadersLoadResult = await Actions.callChain(context, {
          chain: 'retenreleaseHeadersLoad',
        });

        const callComponentMethodRetentionDeleteCloseResult = await Actions.callComponentMethod(context, {
          selector: '#RetentionDelete',
          method: 'close',
        });
      }
    }
  }

  return RetentionDelete;
});
