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

  class linesLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const runInParallelResult = await Promise.all([
        async () => {
           $application.variables.setupHideVar = 'N';

      const callRestSubContractGetApplicationLinByHdrIdResult = await Actions.callRest(context, {
        endpoint: 'SubContract/getApplicationLinByHdrId',
        uriParams: {
          'p_header_id': $page.variables.papplHeaderId,
        },
      });

      if (!callRestSubContractGetApplicationLinByHdrIdResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle.RestAPIError,
          message: $application.translations.appBundle.RestAPIError,
        });
      } else {
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.applLineADP.data',
          ],
        });

        $page.variables.applLineADP.data = callRestSubContractGetApplicationLinByHdrIdResult.body.items;

        $page.variables.getApplicationLinByHdrIdVar = callRestSubContractGetApplicationLinByHdrIdResult.body.items[0];
      }
        },
        async () => {

          const callRestSubContractGetApplicationheaderByIdResult = await Actions.callRest(context, {
            endpoint: 'SubContract/getApplicationheaderById',
            uriParams: {
              'p_header_id': $page.variables.papplHeaderId,
            },
          });

          if (!callRestSubContractGetApplicationheaderByIdResult.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Rest Error.',
            });
          } else {
            $page.variables.getApplicationheaderByIdVar = callRestSubContractGetApplicationheaderByIdResult.body.items[0];

            const callFunctionResult = await $page.functions.displayOption($page.variables.getApplicationheaderByIdVar.approval_status_code);

            $page.variables.displayOption = callFunctionResult;
          }
        },
      ].map(sequence => sequence()));
    }
  }

  return linesLoad;
});
