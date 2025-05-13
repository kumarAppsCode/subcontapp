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

  class inlineAddAttachment1 extends ActionChain {

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

        const callComponentMethodAttachmentOpenResult = await Actions.callComponentMethod(context, {
          selector: '#Attachment',
          method: 'open',
        });
      } else {

        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.Savetheguaranteerecord,
          type: 'warning',
        });
      }
    }
  }

  return inlineAddAttachment1;
});
