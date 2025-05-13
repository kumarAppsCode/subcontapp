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

  class contractGuaranteeSaveAdd extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($application.functions.isFormValid("ContractGuaranteForm")) {

        $page.variables.postPkgContractGuaranteeVar.bu_id = $page.variables.pBuId;

        $page.variables.postPkgContractGuaranteeVar.cont_header_id = $page.variables.p_ContractHeader;

        $page.variables.postPkgContractGuaranteeVar.revision_num = $page.variables.p_Revision_Number;

        const callFunctionResult1 = await $page.functions.onPageNaviFun($page.variables.guaranteeMethod, undefined);

        const callFunctionResult2 = await $page.functions.getPrimaryKey($page.variables.guaranteeMethod, $page.variables.guaranteeKey);

        const callRestSubContractPostPkgContractGuaranteeResult = await Actions.callRest(context, {
          endpoint: 'SubContract/postPkgContractGuarantee',
          uriParams: {
            'P_METHOD': callFunctionResult1,
            'P_PRIMARYKEY': callFunctionResult2,
          },
          body: $page.variables.postPkgContractGuaranteeVar,
        });

        if (!callRestSubContractPostPkgContractGuaranteeResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Rest Error.',
            message: 'Rest Error.',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: callRestSubContractPostPkgContractGuaranteeResult.body.p_err_msg,
            message: callRestSubContractPostPkgContractGuaranteeResult.body.p_err_msg,
            displayMode: 'transient',
            type: 'info',
          });

          const callChainOnLoadGuaranteeInfoResult = await Actions.callChain(context, {
            chain: 'onLoadGuaranteeInfo',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.postPkgContractGuaranteeVar',
            ],
          });
        }
      }
    }
  }

  return contractGuaranteeSaveAdd;
});
