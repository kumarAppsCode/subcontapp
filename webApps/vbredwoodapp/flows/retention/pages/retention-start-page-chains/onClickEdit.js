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

  class onClickEdit extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      const navigateToPageRetentionAddEditpageResult = await Actions.navigateToPage(context, {
        page: 'retention-add-editpage',
        params: {
          'pRetHeader_id': key,
          'p_ContHeaderId': current.row.cont_header_id,
        },
      });
    }
  }

  return onClickEdit;
});
