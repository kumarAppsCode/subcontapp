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

  class appDeleteYes extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractPostApplicationHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postApplicationHeader',
        uriParams: {
          'P_PRIMARYKEY': $page.variables.appDeletekey,
          'P_METHOD': 'DELETE',
        },
      });

      if (!callRestSubContractPostApplicationHeaderResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostApplicationHeaderResult.body.p_err_msg,
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostApplicationHeaderResult.body.p_err_msg,
          displayMode: 'transient',
          type: 'info',
          message: callRestSubContractPostApplicationHeaderResult.body.p_err_msg,
        });

        const callComponentMethodApplicationDeleteCloseResult = await Actions.callComponentMethod(context, {
          selector: '#ApplicationDelete',
          method: 'close',
        });

        const callChainApplicationHeadersLoadResult = await Actions.callChain(context, {
          chain: 'ApplicationHeadersLoad',
        });
      }
    }
  }

  return appDeleteYes;
});
