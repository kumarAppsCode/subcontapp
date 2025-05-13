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

  class OnClickReset extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetContractHeaderSearchResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getContractHeaderSearch',
      });

      const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetContractHeaderSearchResult.body.items);

      $page.variables.pagingSearch = callFunctionResult;
    }
  }

  return OnClickReset;
});
