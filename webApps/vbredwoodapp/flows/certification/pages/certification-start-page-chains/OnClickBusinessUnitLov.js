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

  class OnClickBusinessUnitLov extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      $page.variables.getcertificationLOV.filterCriterion = {
  op: '$eq',
  attribute: 'bu_id',
  value: '-1',
};

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.transSearchObj.certificationno',
        ],
      });
    }
  }

  return OnClickBusinessUnitLov;
});
