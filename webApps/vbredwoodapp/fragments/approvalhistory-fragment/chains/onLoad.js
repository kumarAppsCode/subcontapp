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

  class onLoad extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $fragment, $application } = context;

      const callFunctionResult = await $fragment.functions.getApprovalHistory($fragment.variables.p_appr_code, $fragment.variables.p_type_id);

      $fragment.variables.p_url = callFunctionResult;
    }
  }

  return onLoad;
});
