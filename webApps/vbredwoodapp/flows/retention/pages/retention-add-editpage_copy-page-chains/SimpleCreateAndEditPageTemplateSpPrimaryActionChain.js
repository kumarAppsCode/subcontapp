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

      const callRestSubContractPostRententionHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postRententionHeader',
        uriParams: {
          'P_METHOD': 'PUT',
          'P_PRIMARYKEY': $page.variables.pRetHeader_id,
        },
        body: $page.variables.postRententionHeaderSaveVar,
      });

      if (!callRestSubContractPostRententionHeaderResult.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRententionHeaderResult.body.p_err_msg,
        });
      } else {

        await Actions.callChain(context, {
          chain: 'onClickLineSvae',
        });

        await Actions.callChain(context, {
          chain: 'onLoad',
        });
      }
    }
  }

  return SimpleCreateAndEditPageTemplateSpPrimaryActionChain;
});
