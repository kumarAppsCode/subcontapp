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

  class getSearchCertficationnumberFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'SubContract/getSearchCertficationnumber',
        responseType: 'getSearchCertficationnumber',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          'p_search_value': $page.variables.searchcertificationnum,
          'p_bu_id': $page.variables.searchObj.buid,
        },
        requestTransformOptions: {
          filter: {
            op: '$eq',
            value: '-1',
            attribute: 'buid',
          },
        },
      });

      return callRestEndpoint1;
    }
  }

  return getSearchCertficationnumberFetch;
});
