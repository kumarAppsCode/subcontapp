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

  class onLoadGuaranteeInfo extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetContractbyGuaranteeResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getContractbyGuarantee',
        uriParams: {
          'p_header_id': $page.variables.p_ContractHeader,
          'p_guarantee_id': '0',
        },
      });

      if (!callRestSubContractGetContractbyGuaranteeResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Rest Error.',
          message: 'Rest Error.',
        });
      } else {

        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetContractbyGuaranteeResult.body.items, $page.variables.tGuarantee);

        $page.variables.guaranteePagingSearch = callFunctionResult;

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.GuaranteetableADP.data',
          ],
        });

        $page.variables.GuaranteetableADP.data = callRestSubContractGetContractbyGuaranteeResult.body.items;
      }
    }
  }

  return onLoadGuaranteeInfo;
});
