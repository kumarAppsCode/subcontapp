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

  class retenreleaseHeadersLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetRetentionReleaseModuleFindbyContheaderidResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getRetentionReleaseModuleFindbyContheaderid',
        uriParams: {
          'p_cont_header_id': $page.variables.p_ContractHeader,
        },
      });

      if (!callRestSubContractGetRetentionReleaseModuleFindbyContheaderidResult.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
        });
      } else {
        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetRetentionReleaseModuleFindbyContheaderidResult.body.items, $page.variables.tretentionTable);

        $page.variables.retentionTableData = callFunctionResult;
      }
    }
  }

  return retenreleaseHeadersLoad;
});
