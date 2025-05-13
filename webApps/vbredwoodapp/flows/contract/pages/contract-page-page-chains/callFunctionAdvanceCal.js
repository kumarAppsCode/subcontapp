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

  class callFunctionAdvanceCal extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.p_amt 
     * @param {string} params.p_percentage 
     * @param {string} params.p_net_contract_amt 
     * @param {string} params.p_cal_mode 
     */
    async run(context, { p_amt, p_percentage, p_net_contract_amt, p_cal_mode }) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.advanceCal(p_cal_mode, p_net_contract_amt, p_percentage, p_amt);
    }
  }

  return callFunctionAdvanceCal;
});
