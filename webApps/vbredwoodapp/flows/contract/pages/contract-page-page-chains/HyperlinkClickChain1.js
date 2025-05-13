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

  class HyperlinkClickChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      const navigateToFlowCertificationResult = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'certification',
        page: 'certification-page',
        params: {
          pcertHeaderId: key,
          pcontHeaderId: current.row.cont_header_id,
          previsionNum: current.row.cont_revision_num,
          pcerNum: current.row.certification_number,
          pageVar: 'ContractPage',
        },
      });
    }
  }

  return HyperlinkClickChain1;
});
