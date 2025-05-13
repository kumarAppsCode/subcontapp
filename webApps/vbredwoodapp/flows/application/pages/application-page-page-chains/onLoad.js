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
     * @return {{cancelled:boolean}}
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $application.variables.setupHideVar = 'N';

      const runInParallelResult = await Promise.all([
        async () => {

          const callChainOnLoadApplicationHeaderResult = await Actions.callChain(context, {
            chain: 'onLoadApplicationHeader',
          });
        },
        async () => {

          const callChainLinesLoadResult = await Actions.callChain(context, {
            chain: 'linesLoad',
          });
        },
        async () => {
          const callFunctionResult = await $page.functions.displayNavigation($page.variables.pageVar);

          $page.variables.displayNavi = callFunctionResult;
        },
      ].map(sequence => sequence()));

      const runInParallel2Result = await Promise.all([
        async () => {

          const callFunctionResult = await $page.functions.displayOption($page.variables.postApplHdr.approval_status_code, $page.variables.taskId);

          $page.variables.displayOptionsVar = callFunctionResult;
        },
        async () => {

          const callFunctionResult1 = await $page.functions.validationField($page.variables.taskId, $page.variables.postApplHdr.approval_status_code, $page.variables.postApplHdr.payment_type);

          $page.variables.accessFlag = callFunctionResult1.accessFlag;

          $page.variables.accessHeader = callFunctionResult1.accessHeader;
        },
      ].map(sequence => sequence()));
    }
  }

  return onLoad;
});
