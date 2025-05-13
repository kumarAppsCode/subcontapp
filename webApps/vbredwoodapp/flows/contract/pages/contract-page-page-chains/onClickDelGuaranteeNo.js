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

  class onClickDelGuaranteeNo extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodDeleteGuaranteeCloseResult = await Actions.callComponentMethod(context, {
        selector: '#DeleteGuarantee',
        method: 'close',
      });
    }
  }

  return onClickDelGuaranteeNo;
});
