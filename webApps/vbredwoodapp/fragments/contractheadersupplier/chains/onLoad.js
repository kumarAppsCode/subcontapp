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

  class onLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $fragment, $application } = context;

      $application.variables.setupHideVar = 'Y';

      const callRestSubContractGetContractbyHeaderidResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getContractbyHeaderid',
        uriParams: {
          'p_revision_num': $fragment.variables.revisionNum,
          'p_header_id': $fragment.variables.contHeaderId,
        },
      });

      if (!callRestSubContractGetContractbyHeaderidResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Rest  Error.',
          message: 'Rest  Error.',
        });
      }

      $fragment.variables.contHeader = callRestSubContractGetContractbyHeaderidResult.body.items[0];
    }
  }

  return onLoad;
});
