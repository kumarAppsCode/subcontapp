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

  class FilePickerSelectChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     */
    async run(context, { files }) {
      const { $page, $flow, $application } = context;

      if (files[0].size<=2238578) {

        $page.variables.attachmentObj.p_document_file = files[0];

        $page.variables.attachmentObj.DOCUMENT_NAME = files[0].name;
        $page.variables.attachmentObj.DOCUMENT_TYPE = files[0].type;
      }
    }
  }

  return FilePickerSelectChain;
});
