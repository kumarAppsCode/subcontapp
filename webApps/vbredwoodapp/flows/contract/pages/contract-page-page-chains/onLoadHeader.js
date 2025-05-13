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

  class onLoadHeader extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetContractbyHeaderidResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getContractbyHeaderid',
        uriParams: {
          'p_header_id': $page.variables.p_ContractHeader,
          'p_revision_num': $page.variables.p_Revision_Number,
        },
      });

      if (!callRestSubContractGetContractbyHeaderidResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Rest Error.',
        });
      } else {

        $page.variables.getContractbyHeaderidVar = callRestSubContractGetContractbyHeaderidResult.body.items[0];
      }
    }
  }

  return onLoadHeader;
});
