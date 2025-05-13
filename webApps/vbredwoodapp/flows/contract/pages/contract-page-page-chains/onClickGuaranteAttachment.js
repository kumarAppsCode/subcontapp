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

  class onClickGuaranteAttachment extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.guaranteeKey = $page.variables.guaranteeKey;

      const callComponentMethodAttachmentOpenResult = await Actions.callComponentMethod(context, {
        selector: '#Attachment',
        method: 'open',
      });
    }
  }

  return onClickGuaranteAttachment;
});
