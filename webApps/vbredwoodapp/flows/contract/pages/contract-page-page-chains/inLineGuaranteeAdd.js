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

  class inLineGuaranteeAdd extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.GuaranteeObjinlineEdit',
        ],
      });

      await Actions.fireDataProviderEvent(context, {
        add: {
          data: $page.variables.GuaranteeObjinlineEdit,
          keys: $page.variables.GuaranteeObjinlineEdit.guarantee_id,
        },
        target: $page.variables.GuaranteetableADP,
      });
    }
  }

  return inLineGuaranteeAdd;
});
