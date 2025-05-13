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

  class onClickSaveGuarantee extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($application.functions.isFormValid("GuranteeTableForm")) {

        const callFunctionResult = await $page.functions.generateGuaranteeDetail($page.variables.GuaranteetableADP.data, $page.variables.sysdateVar, $application.variables.saasGetLogin.email_address, $page.variables.postPkgContractGuaranteeVar.object_version_num, $page.variables.p_ContractHeader, $page.variables.p_Revision_Number, $page.variables.pBuId);

        const forEachResult = await ActionUtils.forEach(callFunctionResult.payload.item, async (item, index) => {

          if (item.guarantee_id == null || item.guarantee_id == 0) {

            const callRestSubContractPostPkgContractGuaranteeResult = await Actions.callRest(context, {
              endpoint: 'SubContract/postPkgContractGuarantee',
              uriParams: {
                'P_METHOD': 'POST',
                'P_PRIMARYKEY': '0',
              },
              body: item,
            });

            if (!callRestSubContractPostPkgContractGuaranteeResult.ok) {
              await Actions.fireNotificationEvent(context, {
                summary: $application.translations.appBundle.RestAPIError,
              });
            }
          } else {
            const callRestSubContractPostPkgContractGuarantee2Result = await Actions.callRest(context, {
              endpoint: 'SubContract/postPkgContractGuarantee',
              uriParams: {
                'P_METHOD': 'PUT',
                'P_PRIMARYKEY': item.guarantee_id,
              },
              body: item,
            });

            if (!callRestSubContractPostPkgContractGuarantee2Result.ok) {
              await Actions.fireNotificationEvent(context, {
                summary: callRestSubContractPostPkgContractGuarantee2Result.body.p_err_msg,
              });
            }
          }
        }, { mode: 'serial' });

        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.InformationSavedSuccessfully,
          message: $application.translations.appBundle.InformationSavedSuccessfully,
          displayMode: 'transient',
          type: 'confirmation',
        });

        const callChainOnLoadGuaranteeInfoResult = await Actions.callChain(context, {
          chain: 'onLoadGuaranteeInfo',
        });
      }
    }
  }

  return onClickSaveGuarantee;
});
