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

  class onClickOkDelete extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.tAttachment 
     */
    async run(context, { tAttachment = 'Attachment' }) {
      const { $page, $flow, $application } = context;

      const callRestSubContractDeleteAttachmentDocumentResult = await Actions.callRest(context, {
        endpoint: 'SubContract/deleteAttachmentDocument',
        uriParams: {
          pdocumentid: $page.variables.documentKey,
        },
      });

      if (!callRestSubContractDeleteAttachmentDocumentResult.ok) {
        await Actions.fireNotificationEvent(context, {
          message: $application.translations.appBundle.RestAPIError,
          summary: $application.translations.appBundle.RestAPIError,
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.InformationSavedSuccessfully,
          message: $application.translations.appBundle.InformationSavedSuccessfully,
          displayMode: 'transient',
          type: 'info',
        });

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
          const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetSearchAttachmentResult.body.items, tAttachment);

          $page.variables.AttachmentTable = callFunctionResult;

          const callComponentMethodAttachmentDeleteCloseResult = await Actions.callComponentMethod(context, {
            selector: '#AttachmentDelete',
            method: 'close',
          });
        }
        
      }
    }
  }

  return onClickOkDelete;
});
