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

  class ApplicationSummary extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetApplicationSummaryResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getApplicationSummary',
        uriParams: {
          'app_header_id': $page.variables.papplHeaderId,
          'cont_header_id': $page.variables.pcontHeaderId,
        },
      });

      if (!callRestSubContractGetApplicationSummaryResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
          message: $application.translations.appBundle.RestAPIError,
        });
      } else {
        $page.variables.ApplicationSummaryVar = callRestSubContractGetApplicationSummaryResult.body.items[0];
      }
    }
  }

  return ApplicationSummary;
});
