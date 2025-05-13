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


      const runInParallelResult = await Promise.all([
        async () => {

          const callChainOnLoadHeaderResult = await Actions.callChain(context, {
            chain: 'onLoadHeader',
          });
        },
        async () => {

          const callChainOnloadContractLineResult = await Actions.callChain(context, {
            chain: 'onloadContractLine',
          });
        },
        async () => {
          await Actions.callChain(context, {
            chain: 'onloadPoattachment',
          });
        },
        async () => {
          const callChainPaymentInformationResult = await Actions.callChain(context, {
            chain: 'onLoadpaymentInformation',
          });
        },
        async () => {
          const callChainApplicationHeadersLoadResult = await Actions.callChain(context, {
            chain: 'ApplicationHeadersLoad',
          });
        },
        async () => {
          const callChainCertificationHeadersLoadResult = await Actions.callChain(context, {
            chain: 'certificationHeadersLoad',
          });
        },
        async () => {
          const callChainRetenreleaseHeadersLoadResult = await Actions.callChain(context, {
            chain: 'retenreleaseHeadersLoad',
          });
        },
      ].map(sequence => sequence()));

      const callFunctionResult = await $page.functions.displayOption($page.variables.getContractbyHeaderidVar.approval_status_code, $page.variables.taskId);

      $page.variables.displayOptionsVar = callFunctionResult;

      const callFunctionResult1 = await $page.functions.validationField($page.variables.taskId, $page.variables.getContractbyHeaderidVar.approval_status_code);

      $page.variables.accessFlag = callFunctionResult1.accessFlag;

      $page.variables.accessHeader = callFunctionResult1.accessHeader;

      $page.variables.accessFlag1 = callFunctionResult1.accessFlag1;

      $application.variables.setupHideVar = 'N';
    }
  }

  return onLoad;
});
