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

  class onClickDelete extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      if (current.row.guarantee_id  !== 0 && current.row.guarantee_id !== null && current.row.guarantee_id !== undefined) {
        $page.variables.guaranteeKey = current.row.guarantee_id;

        const callComponentMethodDeleteGuaranteeOpenResult = await Actions.callComponentMethod(context, {
          selector: '#DeleteGuarantee',
          method: 'open',
        });
      } else {
        await Actions.fireDataProviderEvent(context, {
          target: $page.variables.GuaranteetableADP,
          remove: {
            data: current.row,
          },
        });
      }
    }
  }

  return onClickDelete;
});
