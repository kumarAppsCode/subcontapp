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

  class onClickCertLineSave extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($application.functions.isFormValid("CertificationHdrForm")) {

        const callChainOnClickCertHeaderSaveResult = await Actions.callChain(context, {
          chain: 'onClickCertHeaderSave',
        });

        const callFunctionResult = await $page.functions.generateLineDetail($page.variables.certLineADP.data, $page.variables.SysDateVar, $application.variables.saasGetLogin.email_address);

        const callFunctionResult1 = await $page.functions.printArrayValue(callFunctionResult.payload.item);

        const forEachResult = await ActionUtils.forEach(callFunctionResult.payload.item, async (data, index) => {

          const callRestSubContractPostCertificationLineResult = await Actions.callRest(context, {
            endpoint: 'SubContract/postCertificationLine',
            uriParams: {
              'P_METHOD': 'PUT',
              'P_PRIMARYKEY': data.line_id,
            },
            body: data,
          });
        }, { mode: 'serial' });

        await Actions.fireNotificationEvent(context, {
          summary: 'Information Saved Successfully',
          message: 'Information Saved Successfully',
          displayMode: 'transient',
          type: 'info',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.PleaseFilltheRequiredField,
        });
      }
    }
  }

  return onClickCertLineSave;
});
