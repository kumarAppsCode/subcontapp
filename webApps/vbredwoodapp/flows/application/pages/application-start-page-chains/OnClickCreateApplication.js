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

  class OnClickCreateApplication extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodApplicationOpenResult = await Actions.callComponentMethod(context, {
        selector: '#Application',
        method: 'open',
      });
    }
  }

  return OnClickCreateApplication;
});
