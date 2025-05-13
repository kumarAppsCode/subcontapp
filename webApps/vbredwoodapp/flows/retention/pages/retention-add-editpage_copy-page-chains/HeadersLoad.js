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

  class HeadersLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractFindbyRetentionHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/FindbyRetentionHeader',
        uriParams: {
          'p_header_id': $page.variables.pRetHeader_id,
        },
      });

      if (!callRestSubContractFindbyRetentionHeaderResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
          message: $application.translations.appBundle.RestAPIError,
        });
      } else {
        $page.variables.PostHeaderVar = callRestSubContractFindbyRetentionHeaderResult.body.items[0];
        $page.variables.postRententionHeaderSaveVar = callRestSubContractFindbyRetentionHeaderResult.body.items[0];
      }
    }
  }

  return HeadersLoad;
});
