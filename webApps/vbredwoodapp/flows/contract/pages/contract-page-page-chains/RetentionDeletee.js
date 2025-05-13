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

  class RetentionDeletee extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      if (current.row.approval_status_code === 'Draft' || current.row.approval_status_code === 'Rejected') {
        $page.variables.RetenDeletekey = key;

        const callComponentMethodRetentionDeleteOpenResult = await Actions.callComponentMethod(context, {
          selector: '#RetentionDelete',
          method: 'open',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RecordwillbedeletedonlyinDraftandRejectedStatus,
        });
      }
    }
  }

  return RetentionDeletee;
});
