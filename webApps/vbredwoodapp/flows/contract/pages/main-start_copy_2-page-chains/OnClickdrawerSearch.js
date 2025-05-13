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

  class OnClickdrawerSearch extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ('true') {
        const callRestSubContractPostContractTestResult = await Actions.callRest(context, {
          endpoint: 'SubContract/postContractTest',
          body: $page.variables.postContractTestVar,
        });

        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractPostContractTestResult.body.P_OUTPUT);

        $page.variables.pagingSearch = callFunctionResult;

        $page.variables.drawerPopup = false;
      } else {
        const callRestSubContractGetSearchGetrecordsResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getSearchGetrecords',
          uriParams: {
            'P_APPROVAL_STATUS_ID': $page.variables.searchObj.p_approval_status_id,
            'P_BU_ID': $page.variables.searchObj.buId,
            'P_CONTRACT_NUM': $page.variables.searchObj.contractNum,
            'P_VENDOR_ID': $page.variables.searchObj.vendorName,
            'P_CONTRACT_STATUS': $page.variables.searchObj.activeFlag,
          },
        });

        const callChainOnloadResult = await Actions.callChain(context, {
          chain: 'onload',
        });
      }
    }
  }

  return OnClickdrawerSearch;
});
