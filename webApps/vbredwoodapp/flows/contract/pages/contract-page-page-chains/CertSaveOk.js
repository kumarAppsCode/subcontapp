define([

      // ---- ASSIGN VARIABLE ---- //
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class CertSaveOk extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.postCreateCertHdr.P_LOGIN_USER = $application.variables.saasGetLogin.email_address;

      const callRestSubContractPostCreateCertificationPkgResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postCreateCertificationPkg',
        body: $page.variables.postCreateCertHdr,
      });

      if (callRestSubContractPostCreateCertificationPkgResult.body.p_err_code !== 0) {
        const navigateToFlowCertificationResult = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'certification',
          page: 'certification-page',
          params: {
            pageVar: 'ContractPage',
            pcertHeaderId: callRestSubContractPostCreateCertificationPkgResult.body.p_primarykey,
            pcontHeaderId: $page.variables.p_ContractHeader,
            previsionNum: $page.variables.p_Revision_Number,
          },
        });
      } else {
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.postCreateCertHdr',
          ],
        });
      }
    }
  }

  return CertSaveOk;
});
