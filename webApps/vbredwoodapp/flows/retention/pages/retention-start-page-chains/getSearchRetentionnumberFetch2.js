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

  class getSearchRetentionnumberFetch2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'SubContract/getSearchRetentionnumber',
        uriParams: {
          'p_searchval': $page.variables.searchRetentionNumber,
          'p_bu_id': $page.variables.searchObject.businessUnit,
        },
        responseType: 'getSearchRetentionnumberResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getSearchRetentionnumberFetch2;
});
