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

  class onClickRetentionReleaseOk extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodRetetionInformationCloseResult = await Actions.callComponentMethod(context, {
        selector: '#RetetionInformation',
        method: 'close',
      });

      $page.variables.postRetentionReleaseCreateVar.P_CONTRACT_HEADER_ID = $page.variables.p_ContractHeader;
      $page.variables.postRetentionReleaseCreateVar.P_CONTRACT_REVISION_NUMBER = $page.variables.p_Revision_Number;
      $page.variables.postRetentionReleaseCreateVar.P_LOGIN_USER = $application.variables.saasGetLogin.email_address;
      const callRestSubContractPostRetentionReleaseModulePkgCreateretentionreleaseResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postRetentionReleaseModulePkgCreateretentionrelease',
        body: $page.variables.postRetentionReleaseCreateVar,
      });

      if (callRestSubContractPostRetentionReleaseModulePkgCreateretentionreleaseResult.body.p_err_code === 'E') {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRetentionReleaseModulePkgCreateretentionreleaseResult.body.p_err_msg,
        });
      } else if (callRestSubContractPostRetentionReleaseModulePkgCreateretentionreleaseResult.body.p_err_code=== "S") {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRetentionReleaseModulePkgCreateretentionreleaseResult.body.p_err_msg,
          displayMode: 'transient',
          type: 'info',
        });

        const navigateToFlowRetentionResult = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'retention',
          page: 'retention-add-editpage',
          params: {
            'pRetHeader_id': callRestSubContractPostRetentionReleaseModulePkgCreateretentionreleaseResult.body.p_primarykey,
            'p_ContHeaderId': $page.variables.p_ContractHeader,
            pageVar: 'ContractPage',
          },
        });
      }
    }
  }

  return onClickRetentionReleaseOk;
});
