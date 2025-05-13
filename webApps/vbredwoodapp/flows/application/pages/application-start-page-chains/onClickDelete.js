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

      if (current.row.approval_status_code === "Draft" || current.row.approval_status_code === "Rejected") {

        $page.variables.deleteKey = key;

        const callComponentMethodDeletePopupOpenResult = await Actions.callComponentMethod(context, {
          selector: '#DeletePopup',
          method: 'open',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RecordwillbedeletedonlyinDraftandRejectedStatus,
          type: 'error',
        });
      }
    }
  }

  return onClickDelete;
});
