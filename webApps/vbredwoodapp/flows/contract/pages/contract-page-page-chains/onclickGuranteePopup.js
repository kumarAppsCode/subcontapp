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

  class onclickGuranteePopup extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      const callComponentMethodAttachmentPopupOpenResult = await Actions.callComponentMethod(context, {
        selector: '#attachmentPopup',
        method: 'open',
      });

      $page.variables.guaranteeKey = key;
    }
  }

  return onclickGuranteePopup;
});
