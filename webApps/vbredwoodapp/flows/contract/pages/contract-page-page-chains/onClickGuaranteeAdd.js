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

  class onClickGuaranteeAdd extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.guaranteeKey = '0';

      $page.variables.guaranteeMethod = 'CREATE';

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.postPkgContractGuaranteeVar',
        ],
      });

      const callComponentMethodGuaranteePopupOpenResult = await Actions.callComponentMethod(context, {
        selector: '#GuaranteePopup',
        method: 'open',
      });
    }
  }

  return onClickGuaranteeAdd;
});
