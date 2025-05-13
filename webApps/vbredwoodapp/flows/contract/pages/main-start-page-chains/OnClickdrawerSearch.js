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

      const callRestSubContractPostContractTestResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postContractTest',
        body: $page.variables.postContractTestVar,
      });

      if (!callRestSubContractPostContractTestResult.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Rest Error',
        });
      } else {
        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractPostContractTestResult.body.P_OUTPUT);

        $application.variables.searchData = callFunctionResult;

        $application.variables.onloadCheck = false;

        $page.variables.drawerPopup = false;

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.getSearchContractHeaderADP',
          ],
        });

        $page.variables.getSearchContractHeaderADP.data = callRestSubContractPostContractTestResult.body.P_OUTPUT;
      }
    }
  }

  return OnClickdrawerSearch;
});
