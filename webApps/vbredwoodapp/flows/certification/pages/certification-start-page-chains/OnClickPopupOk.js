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

  class OnClickPopupOk extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractPostCreateCertificationPkgResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postCreateCertificationPkg',
        body: $page.variables.postCreateCertHdr,
      });

      if (callRestSubContractPostCreateCertificationPkgResult.body.p_primarykey!==0) {
        const navigateToFlowCertificationResult = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'certification',
          page: 'certification-page',
          params: {
            pcertHeaderId: callRestSubContractPostCreateCertificationPkgResult.body.p_primarykey,
            pcontHeaderId: $page.variables.postCreateCertHdr.P_CONTRACT_HEADER_ID,
            previsionNum: $page.variables.postCreateCertHdr.P_CONTRACT_REVISION_NUMBER,
          },
        });
      } else {

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.postCertHdrTrans',
            '$page.variables.postCreateCertHdr',
          ],
        });
      }
    }
  }

  return OnClickPopupOk;
});
