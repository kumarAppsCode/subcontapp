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

  class onloadContractLine extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetContractbyLineIdResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getContractbyLineId',
        uriParams: {
          'p_header_id': $page.variables.p_ContractHeader,
          'p_line_id': '0',
        },
      });

      if (!callRestSubContractGetContractbyLineIdResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Rest Error.',
          message: 'Rest Error.',
        });
      } else {
        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetContractbyLineIdResult.body.items, $page.variables.tcontractLine);

        $page.variables.linePagingSearch = callFunctionResult;
      }
    }
  }

  return onloadContractLine;
});
