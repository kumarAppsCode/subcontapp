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

  class onClickInlineSaveinDrawerPopup extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callChainOnClickLineSaveResult = await Actions.callChain(context, {
        chain: 'onClickLineSave',
      });
    }
  }

  return onClickInlineSaveinDrawerPopup;
});
