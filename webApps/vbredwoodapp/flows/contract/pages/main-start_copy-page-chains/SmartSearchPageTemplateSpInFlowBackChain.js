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

  class SmartSearchPageTemplateSpInFlowBackChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const navigateToPageMainStartResult = await Actions.navigateToPage(context, {
        page: 'main-start',
      });
    }
  }

  return SmartSearchPageTemplateSpInFlowBackChain;
});
