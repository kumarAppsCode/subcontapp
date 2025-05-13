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

  class appSaveOk extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.postCreateApplHdr.P_LOGIN_USER = $application.variables.saasGetLogin.email_address;

      $page.variables.postCreateApplHdr.P_CONTRACT_HEADER_ID = $page.variables.p_ContractHeader;

      $page.variables.postCreateApplHdr.P_CONTRACT_REVISION_NUMBER = $page.variables.p_Revision_Number;

      const callRestSubContractPostCreateApplModPkgResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postCreateApplModPkg',
        body: $page.variables.postCreateApplHdr,
      });

      if (callRestSubContractPostCreateApplModPkgResult.body.p_err_code === 'S') {

        const navigateToFlowApplicationResult = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'application',
          page: 'application-page',
          params: {
            pageVar: 'ContractPage',
            papplHeaderId: callRestSubContractPostCreateApplModPkgResult.body.p_primarykey,
            pcontHeaderId: $page.variables.p_ContractHeader,
            previsionNum: $page.variables.p_Revision_Number,
          },
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostCreateApplModPkgResult.body.p_err_msg,
          displayMode: 'persist',
        });

        const callComponentMethodApplicationCreateCloseResult = await Actions.callComponentMethod(context, {
          selector: '#ApplicationCreate',
          method: 'close',
        });

        const callComponentMethodApplicationInformationCloseResult = await Actions.callComponentMethod(context, {
          selector: '#ApplicationInformation',
          method: 'close',
        });

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.postCreateApplHdr',
          ],
        });
      }
    }
  }

  return appSaveOk;
});
