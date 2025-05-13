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

  class OnClickactiveflag extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if (value == true) {
        $page.variables.searchObj.activeFlag = 'Y';
      } else {
        $page.variables.searchObj.activeFlag = 'N';
      }
    }
  }

  return OnClickactiveflag;
});
