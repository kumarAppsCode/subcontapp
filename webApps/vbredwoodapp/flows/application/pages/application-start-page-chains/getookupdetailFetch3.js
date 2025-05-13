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

  class getookupdetailFetch3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      if (configuration.hookHandler.context.fetchOptions.filterCriterion) {
        const callRestSubContractGetookupdetailResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getookupdetail',
          uriParams: {
            'p_searchval': configuration.hookHandler.context.fetchOptions.filterCriterion.text,
            'p_lookup_type_name': 'PAYMENT_TYPE',
          },
        });

        return callRestSubContractGetookupdetailResult;
      } else {

        const callRestEndpoint1 = await Actions.callRest(context, {
          endpoint: 'SubContract/getookupdetail',
          uriParams: {
            'p_lookup_type_name': 'PAYMENT_TYPE',
          },
          responseType: 'getookupdetail',
          hookHandler: configuration.hookHandler,
          requestType: 'json',
        });

        return callRestEndpoint1;
      }
    }
  }

  return getookupdetailFetch3;
});
