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

  class LinesLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestSubContractGetCertificationLinebyHdrIdResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getCertificationLinebyHdrId',
        uriParams: {
          'p_header_id': $page.variables.pcertHeaderId,
        },
      });

      if (!callRestSubContractGetCertificationLinebyHdrIdResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
          message: $application.translations.appBundle.RestAPIError,
        });
      } else {
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.certLineADP.data',
          ],
        });

        $page.variables.certLineADP.data = callRestSubContractGetCertificationLinebyHdrIdResult.body.items;
      }
    }
  }

  return LinesLoad;
});
