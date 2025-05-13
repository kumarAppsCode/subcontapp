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

      const runInParallelResult = await Promise.all([
        async () => {

          const callRestSubContractGetCertificationByHeaderIdResult = await Actions.callRest(context, {
            endpoint: 'SubContract/getCertificationByHeaderId',
            uriParams: {
              'P_HeaderId': $page.variables.pcertHeaderId,
            },
          });

          if (!callRestSubContractGetCertificationByHeaderIdResult.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Rest Error.',
            });
          } else {
            $page.variables.getCertificationByHeaderIdVar = callRestSubContractGetCertificationByHeaderIdResult.body.items[0];

            const callFunctionResult = await $page.functions.displayOption(callRestSubContractGetCertificationByHeaderIdResult.body.items[0].approval_status_code);

            $page.variables.displayOption = callFunctionResult;
          }
        },
        async () => {

           $application.variables.setupHideVar = 'N';

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
        },
      ].map(sequence => sequence()));
    }
  }

  return LinesLoad;
});
