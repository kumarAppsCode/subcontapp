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

  class onloadPoattachment extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestFusionAPIGetPOattachmentResult = await Actions.callRest(context, {
        endpoint: 'FusionAPI/GetPOattachment',
        uriParams: {
          poheaderid: $page.variables.p_ContractHeader,
          expand: 'FileContents',
        },
      });

      if (!callRestFusionAPIGetPOattachmentResult.ok) {
      } else {
        const callFunctionResult = await $page.functions.poattachment(callRestFusionAPIGetPOattachmentResult.body.items);

        $page.variables.AttachmentTable = callFunctionResult;
      }
    }
  }

  return onloadPoattachment;
});
