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

  class MessageEvent extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{summary:string,message:string,displayMode:string,type:string,key:string,target:string}} params.event 
     * @param {messageObj} params.currentVar 
     */
    async run(context, { event, currentVar }) {
      const { $page, $flow, $application } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $page.variables.messageADP,
        add: {
          data: currentVar,
        },
      });
    }
  }

  return MessageEvent;
});
