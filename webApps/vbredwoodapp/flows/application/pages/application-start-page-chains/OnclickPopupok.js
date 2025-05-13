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

      const callRestSubContractPostCreateApplModPkgResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postCreateApplModPkg',
        body: $page.variables.postCreateApplHdr,
      });

      if (callRestSubContractPostCreateApplModPkgResult.body.p_err_code === "S") {
        const navigateToFlowApplicationResult = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'application',
          page: 'application-page',
          params: {
            papplHeaderId: callRestSubContractPostCreateApplModPkgResult.body.p_primarykey,
            pcontHeaderId: $page.variables.postCreateApplHdr.P_CONTRACT_HEADER_ID,
            previsionNum: $page.variables.postCreateApplHdr.P_CONTRACT_REVISION_NUMBER,
          },
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostCreateApplModPkgResult.body.p_err_msg,
          message: callRestSubContractPostCreateApplModPkgResult.body.p_err_msg,
        });

        const callComponentMethodInformationCloseResult = await Actions.callComponentMethod(context, {
          selector: '#Information',
          method: 'close',
        });

        const callComponentMethodApplicationCloseResult = await Actions.callComponentMethod(context, {
          selector: '#Application',
          method: 'close',
        });
      }

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.postHeaderTrans',
          '$page.variables.postCreateApplHdr',
        ],
      });
    }
  }

  return OnclickPopupok;
});
