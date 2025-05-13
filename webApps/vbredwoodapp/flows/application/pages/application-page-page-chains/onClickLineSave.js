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

  class onClickLineSave extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($application.functions.isFormValid("applicationHdrForm")) {

        const callFunctionResult1 = await $page.functions.generateLineDetail($page.variables.applLineADP.data, $page.variables.SysDateVar, $application.variables.saasGetLogin.email_address);

        const callFunctionResult2 = await $page.functions.printArrayValue(callFunctionResult1.payload.items);

        const forEachResult = await ActionUtils.forEach(callFunctionResult1.payload.item, async (data, index) => {

          const callRestSubContractPostApplicationlineResult = await Actions.callRest(context, {
            endpoint: 'SubContract/postApplicationline',
            uriParams: {
              'P_METHOD': 'PUT',
              'P_PRIMARYKEY': data.line_id,
            },
            body: data,
          });
        }, { mode: 'serial' });

        await Actions.fireNotificationEvent(context, {
          displayMode: 'transient',
          type: 'info',
          message: 'Information Saved Successfully',
          summary: 'Information Saved Successfully',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Fill the Required Fields.',
          message: 'Please Fill the Required Fields.',
        });
      }
    }
  }

  return onClickLineSave;
});
