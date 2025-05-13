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

  class inlineViewAttachment extends ActionChain {

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
       const callRestSubContractGetSearchAttachmentResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getSearchAttachment',
        uriParams: {
          'application_code': 'GUARANTEE',
          'application_id': $page.variables.guaranteeKey,
        },
      });

      if (!callRestSubContractGetSearchAttachmentResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
          message: $application.translations.appBundle.RestAPIError,
        });
      } else {
          if (callRestSubContractGetSearchAttachmentResult.body.count !== 0) {

        const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetSearchAttachmentResult.body.items, $page.variables.tableAttachmentType);

        $page.variables.AttachmentTable = callFunctionResult;

        const callComponentMethodViewAttachmentOpenResult = await Actions.callComponentMethod(context, {
            selector: '#View_Attachment',
            method: 'open',
        });
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: $application.translations.appBundle.thereisnoattachment,
              type: 'warning',
            });
          }
      }

   
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.Savetheguaranteerecord,
          type: 'warning',
        });
      }
    }
  }

  return inlineViewAttachment;
});
