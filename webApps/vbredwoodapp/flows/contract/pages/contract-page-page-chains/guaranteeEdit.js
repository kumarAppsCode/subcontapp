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

  class guaranteeEdit extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.guaranteeKey = undefined;

      $page.variables.guaranteeMethod = 'EDIT';

      const callRestSubContractGetContractbyGuaranteeResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getContractbyGuarantee',
        uriParams: {
          'p_guarantee_id': $page.variables.guaranteeKey,
          'p_header_id': $page.variables.p_ContractHeader,
        },
      });

      if (!callRestSubContractGetContractbyGuaranteeResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
          message: $application.translations.appBundle.RestAPIError,
        });
      } else {
        $page.variables.postPkgContractGuaranteeVar = callRestSubContractGetContractbyGuaranteeResult.body.items[0];

        const callComponentMethodGuaranteePopupOpenResult = await Actions.callComponentMethod(context, {
          selector: '#GuaranteePopup',
          method: 'open',
        });
      }
    }
  }

  return guaranteeEdit;
});
