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

  class getCertificationModuleFindSearchApplicationlovFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      if (configuration.hookHandler.context.fetchOptions.filterCriterion) {
        const callRestSubContractGetCertificationModuleFindSearchApplicationlovResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getCertificationModuleFindSearchApplicationlov',
          uriParams: {
            'p_search_value': configuration.hookHandler.context.fetchOptions.filterCriterion.text,
          },
        });

        return callRestSubContractGetCertificationModuleFindSearchApplicationlovResult;
      } else {

        const callRestEndpoint1 = await Actions.callRest(context, {
          endpoint: 'SubContract/getCertificationModuleFindSearchApplicationlov',
          responseType: 'getCertificationModuleFindSearchApplicationlovResponse',
          hookHandler: configuration.hookHandler,
          requestType: 'json',
        });

        return callRestEndpoint1;
      }
    }
  }

  return getCertificationModuleFindSearchApplicationlovFetch;
});
