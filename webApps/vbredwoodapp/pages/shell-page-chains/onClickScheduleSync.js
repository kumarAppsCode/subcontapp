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

  class onClickScheduleSync extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const navigateToFlowSyncSetupResult = await Actions.navigateToFlow(context, {
        flow: 'sync-setup',
        page: 'schedule-sync',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.popupOpen',
        ],
      });
    }
  }

  return onClickScheduleSync;
});
