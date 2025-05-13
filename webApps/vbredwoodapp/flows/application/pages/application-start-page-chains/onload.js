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

      if (1 === 1) {

        const callRestSubContractGetApplicationModuleSearchNewapplicationheaderResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getApplicationModuleSearchNewapplicationheader',
          uriParams: {
            'p_application_number': $page.variables.newSearchVar.p_application_number,
            'p_approval_status_disp': $page.variables.newSearchVar.p_approval_status_disp,
            'p_bu_id': $page.variables.newSearchVar.p_bu_id,
            'p_contract_num': $page.variables.newSearchVar.p_contract_num,
            'p_from_app_date': $page.variables.newSearchVar.p_from_app_date,
            'p_to_app_date': $page.variables.newSearchVar.p_to_app_date,
            'p_to_payment_due_date': $page.variables.newSearchVar.p_to_payment_due_date,
            'p_from_payment_due_date': $page.variables.newSearchVar.p_from_payment_due_date,
            'p_payment_type': $page.variables.newSearchVar.p_payment_type,
            'p_vendor_id': $page.variables.newSearchVar.p_vendor_id,
            'p_application_status_disp': $page.variables.newSearchVar.p_application_status_disp,
            'p_application_num': $page.variables.newSearchVar.p_application_num,
            'p_application_status': $page.variables.newSearchVar.p_application_status,
            'p_approval_status': $page.variables.newSearchVar.p_approval_status,
          },
        });

        if (!callRestSubContractGetApplicationModuleSearchNewapplicationheaderResult) {

          await Actions.fireNotificationEvent(context, {
            summary: $application.translations.appBundle.RestAPIError,
            type: 'error',
          });
        } else {

          const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetApplicationModuleSearchNewapplicationheaderResult.body.items);
          $application.variables.searchData = callFunctionResult;
        }
      }
    }
  }

  return onload;
});
