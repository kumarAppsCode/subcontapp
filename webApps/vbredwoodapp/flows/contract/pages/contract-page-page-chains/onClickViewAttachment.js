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

  class onClickViewAttachment extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.tAttachment 
     */
    async run(context, { tAttachment }) {
      const { $page, $flow, $application } = context;

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

        const callComponentMethodViewAttachmentOpenResult = await Actions.callComponentMethod(context, {
          selector: '#View_Attachment',
          method: 'open',
        });
      }
    }
  }

  return onClickViewAttachment;
});
