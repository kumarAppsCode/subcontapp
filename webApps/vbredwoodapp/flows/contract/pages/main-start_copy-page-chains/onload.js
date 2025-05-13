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

      if (!callRestSubContractGetContractHeaderSearchResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Rest Api Error.',
        });
      } else {

        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetContractHeaderSearchResult.body.items);

        $page.variables.pagingSearch = callFunctionResult;
      }
    }
  }

  return onload;
});
