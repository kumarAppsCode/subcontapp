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

  class onClickNo extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodDeletePopupCloseResult = await Actions.callComponentMethod(context, {
        selector: '#DeletePopup',
        method: 'close',
      });

      const callChainOnloadResult = await Actions.callChain(context, {
        chain: 'onload',
      });
    }
  }

  return onClickNo;
});
