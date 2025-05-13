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

  class HyperlinkClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      const navigateToFlowApplicationResult = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'application',
        page: 'application-page',
        params: {
          papplHeaderId: key,
          pcontHeaderId: current.row.cont_header_id,
          previsionNum: current.row.cont_revision_num,
          pageVar: 'ContractPage',
        },
      });
    }
  }

  return HyperlinkClickChain;
});
