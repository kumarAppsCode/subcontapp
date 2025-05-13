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

  class LinesLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractFindByRetentionReleaseResult = await Actions.callRest(context, {
        endpoint: 'SubContract/FindByRetentionRelease',
        uriParams: {
          'p_header_id': $page.variables.pRetHeader_id,
        },
      });

      if (!callRestSubContractFindByRetentionReleaseResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
        });
      } else {
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.retLineADP.data',
          ],
        });

        $page.variables.retLineADP.data = callRestSubContractFindByRetentionReleaseResult.body.items;

        await Actions.fireDataProviderEvent(context, {
          target: $page.variables.retLineADP,
          refresh: null,
        });
      }
    }
  }

  return LinesLoad;
});
