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

      if ($page.variables.postCertificationHdr.cert_approval_status_disp === "Draft") {

        const callChainOnClickCertHeaderSaveResult = await Actions.callChain(context, {
          chain: 'onClickCertHeaderSave',
        });

        const callChainOnClickCertLineSaveResult = await Actions.callChain(context, {
          chain: 'onClickCertLineSave',
        });

        const callChainOnLoadResult = await Actions.callChain(context, {
          chain: 'onLoad',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle._summary_35ac,
        });
      }
    }
  }

  return SimpleCreateAndEditPageTemplateSpPrimaryActionChain;
});
