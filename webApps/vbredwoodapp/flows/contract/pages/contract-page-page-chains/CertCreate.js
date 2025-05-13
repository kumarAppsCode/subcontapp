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

  class CertCreate extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.getContractbyHeaderidVar.approval_status_code === "Approved") {
        const callComponentMethodCertificationCreateOpenResult = await Actions.callComponentMethod(context, {
          selector: '#CertificationCreate',
          method: 'open',
        });

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.postCreateCertHdr.p_application_id',
          ],
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.Youcancreaterecordsonlyforapprovedcontract,
        });
      }
    }
  }

  return CertCreate;
});
