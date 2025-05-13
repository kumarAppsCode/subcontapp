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

  class Onclicknavigate extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.selection 
     */
    async run(context, { selection }) {
      const { $page, $flow, $application } = context;

      switch (selection) {
        case 'contract':
          const navigateToFlowContractResult = await Actions.navigateToFlow(context, {
            flow: 'contract',
            page: 'main-start',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.popupOpen',
            ],
          });
          break;
        case 'application':
          const navigateToFlowApplicationResult = await Actions.navigateToFlow(context, {
            flow: 'application',
            page: 'application-start',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.popupOpen',
            ],
          });
          break;
        case 'certification':
          const navigateToFlowCertificationResult = await Actions.navigateToFlow(context, {
            flow: 'certification',
            page: 'certification-start',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.popupOpen',
            ],
          });
          break;
        case 'retentionrelease':
          const navigateToFlowRetentionResult = await Actions.navigateToFlow(context, {
            flow: 'retention',
            page: 'retention-start',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.popupOpen',
            ],
          });
          break;
        case 'adminsetup':
          await Actions.navigateToFlow(context, {
          });

          await Actions.resetVariables(context, {
          });
          break;
        default:
          break;
      }
    }
  }

  return Onclicknavigate;
});
