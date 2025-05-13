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

        const callRestSubContractGetRetentionReleaseModuleSearchNewRetentionheaderResult = await Actions.callRest(context, {
          endpoint: 'SubContract/getRetentionReleaseModuleSearchNewRetentionheader',
          uriParams: {
            'p_approval_status_disp': $page.variables.newSearchObj.p_approval_status_disp,
            'p_bu_id': $page.variables.newSearchObj.p_bu_id,
            'p_contract_num': $page.variables.newSearchObj.p_contract_num,
            'p_from_ret_rel_date': $page.variables.newSearchObj.p_from_ret_rel_date,
            'p_ret_rel_num': $page.variables.newSearchObj.p_ret_rel_num,
            'p_ret_rel_type': $page.variables.newSearchObj.p_ret_rel_type,
            'p_to_ret_rel_date': $page.variables.newSearchObj.p_to_ret_rel_date,
            'p_vendor_id': $page.variables.newSearchObj.p_vendor_id,
          },
        });

        if (!callRestSubContractGetRetentionReleaseModuleSearchNewRetentionheaderResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: $application.translations.appBundle.RestAPIError,
          });
        } else {

          const callFunctionResult = await $page.functions.pagingSearch(callRestSubContractGetRetentionReleaseModuleSearchNewRetentionheaderResult.body.items);

          $application.variables.searchData = callFunctionResult;

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.ExportRetentetionADP.data',
            ],
          });

          $page.variables.ExportRetentetionADP.data = callRestSubContractGetRetentionReleaseModuleSearchNewRetentionheaderResult.body.items;
        }
      }
    }
  }

  return onload;
});
