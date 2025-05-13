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

  class LoadTotalSummaryVar extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetFindbyTotalSummaryResult = await Actions.callRest(context, {
        endpoint: 'SubContract/GetFindbyTotalSummary',
        uriParams: {
          'cont_header_id': $page.variables.pcontHeaderId,
        },
      });

      if (!callRestSubContractGetFindbyTotalSummaryResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
          message: $application.translations.appBundle.RestAPIError,
        });
      } else {
        $page.variables.TotalSummaryVar = callRestSubContractGetFindbyTotalSummaryResult.body.items[0];
      }
    }
  }

  return LoadTotalSummaryVar;
});
