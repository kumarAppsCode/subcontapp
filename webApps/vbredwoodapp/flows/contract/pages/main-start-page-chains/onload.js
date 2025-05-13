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

  class onload extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;


      $application.variables.setupHideVar = 'Y';

      if ($application.variables.onloadCheck) {

        const callRestSubContractGetContractSearchOnloadResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getContractSearchOnload',
        });

        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetContractSearchOnloadResult.body.items);

        $application.variables.searchData = callFunctionResult;

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.getSearchContractHeaderADP',
          ],
        });

        $page.variables.getSearchContractHeaderADP.data = callRestSubContractGetContractSearchOnloadResult.body.items;
      }
    }
  }

  return onload;
});
