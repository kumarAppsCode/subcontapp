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

  class OnclickPopupok extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.postRetentionReleaseCreateVar.P_CONTRACT_REVISION_NUMBER = $page.variables.contractObj.revision_num;
      $page.variables.postRetentionReleaseCreateVar.P_CONTRACT_HEADER_ID = $page.variables.contractObj.contractHdrId;
      $page.variables.postRetentionReleaseCreateVar.P_LOGIN_USER = $application.variables.saasGetLogin.email_address;

      const callRestSubContractPostRetentionReleaseModulePkgCreateretentionreleaseResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postRetentionReleaseModulePkgCreateretentionrelease',
        body: $page.variables.postRetentionReleaseCreateVar,
      });

      if (callRestSubContractPostRetentionReleaseModulePkgCreateretentionreleaseResult.body.p_err_code === 'E') {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRetentionReleaseModulePkgCreateretentionreleaseResult.body.p_err_msg,
        });

        const callComponentMethodInformationCloseResult = await Actions.callComponentMethod(context, {
          selector: '#Information',
          method: 'close',
        });

        const callComponentMethodRetentionCloseResult = await Actions.callComponentMethod(context, {
          selector: '#Retention',
          method: 'close',
        });
      } else {
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
            'p_ContHeaderId': $page.variables.postRetentionReleaseCreateVar.P_CONTRACT_HEADER_ID,
          },
        });
      }
    }
  }

  return OnclickPopupok;
});
