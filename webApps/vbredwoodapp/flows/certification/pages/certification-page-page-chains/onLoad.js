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
      const { $page, $flow, $application } = context;

      $application.variables.setupHideVar = 'N';

      const runInParallelResult = await Promise.all([
        async () => {

          const callChainHeadersOnLoadResult = await Actions.callChain(context, {
            chain: 'headersOnLoad',
          });
        },
        async () => {

          const callChainLinesLoadResult = await Actions.callChain(context, {
            chain: 'LinesLoad',
          });
        },
        async () => {
          // displa
          const callFunctionResult = await $page.functions.displayNavigation($page.variables.pageVar);

          $page.variables.displayNavi = callFunctionResult;
        },
      ].map(sequence => sequence()));

      const runInParallel2Result = await Promise.all([
        async () => {

          const callFunctionResult = await $page.functions.displayOption($page.variables.CertificationDetailsVar.approval_status_code, $page.variables.taskId);

          $page.variables.displayOptionsVar = callFunctionResult;

          const callFunction2Result = await $page.functions.displayTransferAP($page.variables.CertificationDetailsVar.approval_status_code, $page.variables.CertificationDetailsVar.interface_status_flag);

          $page.variables.displayTransferAP = callFunction2Result;
        },
        async () => {

          const callFunctionResult1 = await $page.functions.validationField($page.variables.taskId, $page.variables.CertificationDetailsVar.approval_status_code, $page.variables.CertificationDetailsVar.payment_type_code);

          $page.variables.accessFlag = callFunctionResult1.accessFlag;

          $page.variables.accessHeader = callFunctionResult1.accessHeader;
        },
      ].map(sequence => sequence()));
    }
  }

  return onLoad;
});
