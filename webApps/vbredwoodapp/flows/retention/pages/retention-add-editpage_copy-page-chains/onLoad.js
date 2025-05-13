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

          const callChainHeadersLoadResult = await Actions.callChain(context, {
            chain: 'HeadersLoad',
          });
        },
        async () => {

          const callChainLinesLoadResult = await Actions.callChain(context, {
            chain: 'LinesLoad',
          });
        },
      ].map(sequence => sequence()));

      const callFunctionResult = await $page.functions.displayOption($page.variables.PostHeaderVar.approval_status_code, $page.variables.Task_id);

      $page.variables.displayOptionsVar = callFunctionResult;
    }
  }

  return onLoad;
});
