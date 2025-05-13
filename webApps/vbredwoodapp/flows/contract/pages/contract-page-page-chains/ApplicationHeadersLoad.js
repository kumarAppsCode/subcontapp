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

  class ApplicationHeadersLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetApplicationModuleFindbyContheaderid2Result = await Actions.callRest(context, {
        endpoint: 'SubContract/getApplicationModuleFindbyContheaderid2',
        uriParams: {
          'p_cont_header_id': $page.variables.p_ContractHeader,
        },
      });

      if (!callRestSubContractGetApplicationModuleFindbyContheaderid2Result.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
        });
      } else {

        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetApplicationModuleFindbyContheaderid2Result.body.items, $page.variables.tapplicationTable);

        $page.variables.applicationTableData = callFunctionResult;
      }
    }
  }

  return ApplicationHeadersLoad;
});
