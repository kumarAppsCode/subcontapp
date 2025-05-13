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

  class ApprovalUserslovFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      if (configuration.hookHandler.context.fetchOptions.filterCriterion) {
        const callRestSubContractApprovalUserslovResult = await Actions.callRest(context, {
          endpoint: 'SubContract/ApprovalUserslov',
          uriParams: {
            'p_search_value': configuration.hookHandler.context.fetchOptions.filterCriterion.text,
          },
        });

        return callRestSubContractApprovalUserslovResult;
      } else {

        const callRestEndpoint1 = await Actions.callRest(context, {
          endpoint: 'SubContract/ApprovalUserslov',
          responseType: 'approvalUserslov',
          hookHandler: configuration.hookHandler,
          requestType: 'json',
        });

        return callRestEndpoint1;
      }
    }
  }

  return ApprovalUserslovFetch;
});
