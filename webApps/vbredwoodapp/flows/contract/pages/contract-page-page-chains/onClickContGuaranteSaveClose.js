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

  class onClickContGuaranteSaveClose extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($application.functions.isFormValid("ContractGuaranteForm")) {

        const callChainContractGuaranteeSaveResetResult = await Actions.callChain(context, {
          chain: 'contractGuaranteeSaveAdd',
        });

        const callComponentMethodGuaranteePopupCloseResult = await Actions.callComponentMethod(context, {
          selector: '#GuaranteePopup',
          method: 'close',
        });
      }
    }
  }

  return onClickContGuaranteSaveClose;
});
