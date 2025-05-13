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

  class getSearchCertficationnumberFetch2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      if (configuration.hookHandler.context.fetchOptions.filterCriterion) {
        const callRestSubContractGetSearchCertficationnumberResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getSearchCertficationnumber',
          uriParams: {
            'p_search_value': configuration.hookHandler.context.fetchOptions.filterCriterion.text,
          },
        });

        return callRestSubContractGetSearchCertficationnumberResult;
      } else {

        const callRestEndpoint1 = await Actions.callRest(context, {
          endpoint: 'SubContract/getSearchCertficationnumber',
          responseType: 'getSearchCertficationnumberResponse2',
          hookHandler: configuration.hookHandler,
          requestType: 'json',
        });

        return callRestEndpoint1;
      }
    }
  }

  return getSearchCertficationnumberFetch2;
});
