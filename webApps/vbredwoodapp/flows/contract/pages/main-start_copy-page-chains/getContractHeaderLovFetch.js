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

  class getContractHeaderLovFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      if (configuration.hookHandler.context.fetchOptions.filterCriterion) {

        const callRestEndpoint1 = await Actions.callRest(context, {
          endpoint: 'SubContract/getContractHeaderLov',
          responseType: 'getContractHeaderLovlist',
          hookHandler: configuration.hookHandler,
          requestType: 'json',
        });

        return callRestEndpoint1;
      } else {
        const callRestSubContractGetContractHeaderLovResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getContractHeaderLov',
          uriParams: {
            'p_bu_id': $page.variables.searchObj.buId,
            'p_searchval': configuration.hookHandler.context.fetchOptions.filterCriterion.text,
          },
        });

        return callRestSubContractGetContractHeaderLovResult;
      }
    }
  }

  return getContractHeaderLovFetch;
});
