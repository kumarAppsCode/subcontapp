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

  class CardActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const navigateToFlowContractResult = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'contract',
        page: 'main-start_copy',
      });
    }
  }

  return CardActionChain;
});
