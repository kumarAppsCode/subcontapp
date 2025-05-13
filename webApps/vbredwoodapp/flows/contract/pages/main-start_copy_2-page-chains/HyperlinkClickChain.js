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

      const navigateToPageContractPageResult = await Actions.navigateToPage(context, {
        page: 'contract-page',
        params: {
          'p_ContractHeader': key,
          'p_Revision_Number': current.row.revision_num,
          pBuId: current.row.bu_id,
          pContNum: current.row.contract_num,
          pPageNavi: 'EDIT',
          TabHideVar: true,
          pageVar: 'ContractStart',
        },
      });
    }
  }

  return HyperlinkClickChain;
});
