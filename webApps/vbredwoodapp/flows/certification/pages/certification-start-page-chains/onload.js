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

  class onload extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $application.variables.setupHideVar = 'Y';

      if ($application.variables.onloadCheck) {

        const callRestSubContractGetCertificationModuleSearchNewcertificationHeaderResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getCertificationModuleSearchNewcertificationHeader',
          uriParams: {
            'p_bu_id': $page.variables.newSearchObj.p_bu_id,
            'p_contract_num': $page.variables.newSearchObj.p_contract_num,
            'p_from_cert_date': $page.variables.newSearchObj.p_from_cert_date,
            'p_from_payment_due_date': $page.variables.newSearchObj.p_from_payment_due_date,
            'p_payment_type': $page.variables.newSearchObj.p_payment_type,
            'p_to_cert_date': $page.variables.newSearchObj.p_to_cert_date,
            'p_vendor_site_id': $page.variables.newSearchObj.p_vendor_site_id,
            'p_to_payment_due_date': $page.variables.newSearchObj.p_to_payment_due_date,
            'p_application_num': $page.variables.newSearchObj.p_application_num,
            'p_certification_num': $page.variables.newSearchObj.p_certification_num,
            'p_approval_status': $page.variables.newSearchObj.p_approval_status
          },
        });

        if (!callRestSubContractGetCertificationModuleSearchNewcertificationHeaderResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: $application.translations.appBundle.RestAPIError,
          });
        } else {

          const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetCertificationModuleSearchNewcertificationHeaderResult.body.items);

          $application.variables.searchData = callFunctionResult;
        }
      }
    }
  }

  return onload;
});
