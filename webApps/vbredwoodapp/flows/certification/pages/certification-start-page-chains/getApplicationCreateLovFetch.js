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

  class getApplicationCreateLovFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      if (configuration.hookHandler.context.fetchOptions.filterCriterion) {
        const callRestSubContractGetApplicationCreateLovResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getApplicationCreateLov',
          uriParams: {
            'p_application_number': configuration.hookHandler.context.fetchOptions.filterCriterion.text,
            'p_bu_id': 'undefined',
            'p_contract_num': 'undefined',
            'p_from_app_date': 'undefined',
            'p_to_app_date': 'undefined',
          },
        });

        return callRestSubContractGetApplicationCreateLovResult;
      } else {

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'SubContract/getApplicationCreateLov',
        responseType: 'getApplicationCreateLov',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }
  }
  return getApplicationCreateLovFetch;
});
