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

  class OnClickdrawerSearch extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callChainOnloadResult = await Actions.callChain(context, {
        chain: 'onload',
      });

      $page.variables.drawerPopup = false;
    }
  }

  return OnClickdrawerSearch;
});
