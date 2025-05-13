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

      const callFunctionResult = await $fragment.functions.getAttachmenturl($fragment.variables.p_appl_code, $fragment.variables.p_appl_ref_id, $fragment.variables.p_appl_ref_num);

      $fragment.variables.p_attachment_url = callFunctionResult;
    }
  }

  return onLoad;
});
