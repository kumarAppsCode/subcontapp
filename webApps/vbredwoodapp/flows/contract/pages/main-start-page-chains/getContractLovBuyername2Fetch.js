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

  class getContractLovBuyername2Fetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      if (configuration.hookHandler.context.fetchOptions.filterCriterion) {
        const callRestSubContractGetContractLovBuyername2Result = await Actions.callRest(context, {
          endpoint: 'SubContract/getContractLovBuyername2',
          uriParams: {
            'p_searchval': configuration.hookHandler.context.fetchOptions.filterCriterion.text,
          },
        });
        return callRestSubContractGetContractLovBuyername2Result;
      } else {

        const callRestEndpoint1 = await Actions.callRest(context, {
          endpoint: 'SubContract/getContractLovBuyername2',
          responseType: 'getContractLovBuyername2Response',
          hookHandler: configuration.hookHandler,
          requestType: 'json',
        });

        return callRestEndpoint1;
      }
    }
  }

  return getContractLovBuyername2Fetch;
});
