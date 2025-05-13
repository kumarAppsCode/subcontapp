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

  class SimpleCreateAndEditPageTemplateSpPrimaryActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.postApplHdr.approval_status_code === 'Draft') {
        const callFunctionResult = await $page.functions.convertJsonToString($page.variables.postApplHdr);

        $page.variables.saveData = callFunctionResult;

        const callFunction2Result = await $page.functions.compareJSONStrings($page.variables.initialData, $page.variables.saveData);

        $page.variables.saveVar = callFunction2Result;

        if (1 === 1) {

      if ($application.functions.isFormValid("applicationHdrForm")) {
          const callRestSubContractPostApplicationHeaderResult = await Actions.callRest(context, {
            endpoint: 'SubContract/postApplicationHeader',
            uriParams: {
              'P_METHOD': 'PUT',
              'P_PRIMARYKEY': $page.variables.papplHeaderId,
            },
            body: $page.variables.postApplHdr,
          });

          if (!callRestSubContractPostApplicationHeaderResult.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Rest API Error.',
            });
          } else  {
            await Actions.fireNotificationEvent(context, {
              summary: callRestSubContractPostApplicationHeaderResult.body.p_err_msg,
              message: callRestSubContractPostApplicationHeaderResult.body.p_err_msg,
              displayMode: 'transient',
              type: 'info',
            });
              const callChainOnLoadResult = await Actions.callChain(context, {
                chain: 'onLoad',
              });
          }
      }
        } else {
          await Actions.fireNotificationEvent(context, {
            displayMode: 'persist',
            type: 'warning',
            summary: $page.variables.saveVar.errorMsg,
          });
        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle._summary_26b9,
        });
      }
    }
  }

  return SimpleCreateAndEditPageTemplateSpPrimaryActionChain;
});
