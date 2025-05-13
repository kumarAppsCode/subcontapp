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

  class onClickGuaranteeAttacSaveAdd extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.attachmentObj.DOCUMENT_NAME !== null) {
        $page.variables.attachmentObj.APPL_CODE = 'GUARANTEE';

        $page.variables.attachmentObj.APPL_REF_ID = $page.variables.guaranteeKey;

        $page.variables.attachmentObj.APPL_REF_NUM = "GR-"+$page.variables.guaranteeKey;

        const callRestSubContractPostAttachementDocResult = await Actions.callRest(context, {
          endpoint: 'SubContract/postAttachementDoc',
          uriParams: {
            'P_APPL_CODE': $page.variables.attachmentObj.APPL_CODE,
            'P_APPL_REF_ID': $page.variables.attachmentObj.APPL_REF_ID,
            'P_APPL_REF_NUM': $page.variables.attachmentObj.APPL_REF_NUM,
            'P_CREATED_BY': $page.variables.attachmentObj.CREATED_BY,
            'P_DESCRIPTION': $page.variables.attachmentObj.DESCRIPTION,
            'P_DOCUMENT_CATEGORY': $page.variables.attachmentObj.DOCUMENT_CATEGORY,
            'P_DOCUMENT_NAME': $page.variables.attachmentObj.DOCUMENT_NAME,
            'P_DOCUMENT_TYPE': $page.variables.attachmentObj.DOCUMENT_TYPE,
          },
          body: $page.variables.attachmentObj.p_document_file,
        });

        if (!callRestSubContractPostAttachementDocResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: $application.translations.appBundle.RestAPIError,
            message: $application.translations.appBundle.RestAPIError,
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.attachmentObj',
            ],
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: $application.translations.appBundle.InformationSavedSuccessfully,
            type: 'info',
            displayMode: 'transient',
            message: $application.translations.appBundle.InformationSavedSuccessfully,
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.attachmentObj',
            ],
          });
        }
      }
    }
  }

  return onClickGuaranteeAttacSaveAdd;
});
