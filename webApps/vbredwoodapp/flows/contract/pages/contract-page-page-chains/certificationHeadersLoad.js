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

  class certificationHeadersLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetCertificationModuleFindbyContheaderid2Result = await Actions.callRest(context, {
        endpoint: 'SubContract/getCertificationModuleFindbyContheaderid2',
        uriParams: {
          'p_cont_header_id': $page.variables.p_ContractHeader,
        },
      });

      if (!callRestSubContractGetCertificationModuleFindbyContheaderid2Result.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
        });
      } else {
        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetCertificationModuleFindbyContheaderid2Result.body.items, $page.variables.tcertificationTable);

        $page.variables.certificationTableData = callFunctionResult;
      }
    }
  }

  return certificationHeadersLoad;
});
