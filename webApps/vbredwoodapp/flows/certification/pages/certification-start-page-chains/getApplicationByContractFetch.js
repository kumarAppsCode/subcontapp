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

  class getApplicationByContractFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      if (configuration.hookHandler.context.fetchOptions.filterCriterion) {
        const callRestSubContractGetApplicationByContractResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getApplicationByContract',
          uriParams: {
            'p_contract_num': configuration.hookHandler.context.fetchOptions.filterCriterion,
          },
        });

        return callRestSubContractGetApplicationByContractResult;
      }
else{
      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'SubContract/getApplicationByContract',
        responseType: 'getApplicationByContract',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }
  }

  return getApplicationByContractFetch;
});
