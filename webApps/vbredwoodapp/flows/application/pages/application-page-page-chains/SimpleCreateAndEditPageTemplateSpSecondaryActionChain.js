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

  class SimpleCreateAndEditPageTemplateSpSecondaryActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.actionId 
     */
    async run(context, { actionId }) {
      const { $page, $flow, $application } = context;

      switch (actionId) {
        case 'attachment':
        {
          const navigateToFlowGenericPageResult = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'generic-page',
            page: 'generic-attachment',
            params: {
              'p_appl_code': 'APPLICATION',
              'p_appl_ref_id': $page.variables.papplHeaderId,
              'p_appl_ref_num': $page.variables.postApplHdr.application_num,
            },
          });
        }
          break;
        case 'approvalHistory':
        {
          const navigateToFlowGenericPage2Result = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'generic-page',
            page: 'generic-approval-history',
            params: {
              'p_appr_code': 'APPLICATION',
              'p_type_id': $page.variables.papplHeaderId,
            },
          });
        }
          break;
        case 'viewcontract':
        {
          const navigateToFlowContractResult1 = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'contract',
            page: 'contract-page',
            params: {
              pBuId: $page.variables.postApplHdr.bu_id,
              'p_ContractHeader': $page.variables.pcontHeaderId,
              'p_Revision_Number': $page.variables.previsionNum,
              TabHideVar: false,
            },
          });
      }
          break;
        case 'viewcertification':
        {
          const callRestSubContractGetApplicationModuleFindbyCertificationheaderResult = await Actions.callRest(context, {
            endpoint: 'SubContract/getApplicationModuleFindbyCertificationheader',
            uriParams: {
              'p_appl_header_id': $page.variables.papplHeaderId,
            },
          });

          if (callRestSubContractGetApplicationModuleFindbyCertificationheaderResult.body.count === 0) {
            await Actions.fireNotificationEvent(context, {
              summary: $application.translations.appBundle.Certificationnotavailable,
            });
          } else {
            const navigateToFlowCertificationResult = await Actions.navigateToFlow(context, {
              target: 'parent',
              flow: 'certification',
              page: 'certification-page',
              params: {
                pcontHeaderId: $page.variables.pcontHeaderId,
                previsionNum: $page.variables.previsionNum,
                pcertHeaderId: callRestSubContractGetApplicationModuleFindbyCertificationheaderResult.body.items[0].header_id,
                pcerNum: callRestSubContractGetApplicationModuleFindbyCertificationheaderResult.body.items[0].certification_num,
                pageVar: 'ApplicationPage',
              },
            });
          }
        }
          break;
        case 'about':
        {
          const callComponentMethodAboutOpenResult = await Actions.callComponentMethod(context, {
            selector: '#About',
            method: 'open',
          });
      }
          break;
        case 'submit':
          if (true) {
      if ($page.variables.postApplHdr.approval_status_code === "Draft" || $page.variables.postApplHdr.approval_status_code === "Withdraw") {
      if ($application.functions.isFormValid("applicationHdrForm")) {
                const callComponentMethodProgressMsgOpenResult = await Actions.callComponentMethod(context, {
                  selector: '#progressMsg',
                  method: 'open',
                });

        const callRestSubContractPostApplicationHeaderResult = await Actions.callRest(context, {
          endpoint: 'SubContract/postApplicationHeader',
          uriParams: {
            'P_METHOD': 'PUT',
            'P_PRIMARYKEY': $page.variables.papplHeaderId,
          },
          body: $page.variables.postApplHdr,
        });

        if (!callRestSubContractPostApplicationHeaderResult.ok) {
                  const callComponentMethodProgressMsgCloseResult = await Actions.callComponentMethod(context, {
                    selector: '#progressMsg',
                    method: 'close',
                  });

          await Actions.fireNotificationEvent(context, {
            summary: 'Rest API Error.',
          });
        } else  if (callRestSubContractPostApplicationHeaderResult.body.p_err_code ==="S") {

            $page.variables.PostApprovalSubmitApproval1Var.p_appr_process = 'APPLICATION';
            $page.variables.PostApprovalSubmitApproval1Var.p_trx_id = $page.variables.papplHeaderId;
            $page.variables.PostApprovalSubmitApproval1Var.p_user_id = $application.variables.saasGetLogin.user_id;

            const callRestSubContractPostApprovalSubmitapprovalResult = await Actions.callRest(context, {
              endpoint: 'SubContract/postApprovalSubmitapproval',
              body: $page.variables.PostApprovalSubmitApproval1Var,
            });

            if (!callRestSubContractPostApprovalSubmitapprovalResult.ok) {
                    const callComponentMethodProgressMsgClose2Result = await Actions.callComponentMethod(context, {
                      selector: '#progressMsg',
                      method: 'close',
                    });

              await Actions.fireNotificationEvent(context, {
                summary: 'callRestSubContractPostApprovalSubmitapprovalResult.body.p_error_msg',
              });
            } else if (callRestSubContractPostApprovalSubmitapprovalResult.body.p_error_code === 'S') {
              const callFunctionResult = await $page.functions.submitPayload($page.variables.papplHeaderId, callRestSubContractPostApprovalSubmitapprovalResult.body.p_action_id);

              $page.variables.pcsPostProcessesVar.payload = callFunctionResult;

              const callRestPCSRestServicePostProcessesResult = await Actions.callRest(context, {
                endpoint: 'PCSRestService/postProcesses',
                body: $page.variables.pcsPostProcessesVar,
              });

              if (!callRestPCSRestServicePostProcessesResult.ok) {
                      const callComponentMethodProgressMsgClose3Result = await Actions.callComponentMethod(context, {
                        selector: '#progressMsg',
                        method: 'close',
                      });

                await Actions.fireNotificationEvent(context, {
                  summary: 'Submit Process Error.',
                });
              } else {

                      const callComponentMethodProgressMsgClose4Result = await Actions.callComponentMethod(context, {
                        selector: '#progressMsg',
                        method: 'close',
                      });

              const callChainOnLoadResult = await Actions.callChain(context, {
                chain: 'onLoad',
              });

                await Actions.fireNotificationEvent(context, {
                  summary: callRestSubContractPostApprovalSubmitapprovalResult.body.p_error_msg,
                  displayMode: 'transient',
                  type: 'info',
                });
              }
            }
        }
      }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: $application.translations.appBundle._summary_26b9,
        });
      }

          } else {

            // THIS WILL BEHAVE LIKE AUTO APPROVAL  WHEN THIS COMES IN THIS ELSE CONDITION THEN THE RECORD WILL BE APPROVED AND CERTIFIED.
            $page.variables.postSubmitForApprovalPkgVar.P_APPR_PROCESS = 'SC_APPL';

            $page.variables.postSubmitForApprovalPkgVar.P_TRX_ID = $page.variables.papplHeaderId;

            $page.variables.postSubmitForApprovalPkgVar.P_USER_ID = $application.variables.saasGetLogin.user_id;

            const callRestSubContractPostSubmitForApprovalPkgResult = await Actions.callRest(context, {
              endpoint: 'SubContract/postSubmitForApprovalPkg',
              body: $page.variables.postSubmitForApprovalPkgVar,
            });

            if (!callRestSubContractPostSubmitForApprovalPkgResult.ok) {
              await Actions.fireNotificationEvent(context, {
                summary: callRestSubContractPostSubmitForApprovalPkgResult.body.P_ERROR_MSG,
              });
            } else {

              const callChainOnLoadResult = await Actions.callChain(context, {
                chain: 'onLoad',
              });
              await Actions.fireNotificationEvent(context, {
                summary: callRestSubContractPostSubmitForApprovalPkgResult.body.P_ERROR_MSG,
                type: 'info',
                displayMode: 'transient',
              });
            }
          }
          break;
        case 'approve':{
          const callComponentMethodApprovePopUpOpenResult = await Actions.callComponentMethod(context, {
            selector: '#approvePopUp',
            method: 'open',
          });
      }
          break;
        case 'reject':{
          const callComponentMethodRejectPopupOpenResult = await Actions.callComponentMethod(context, {
            selector: '#RejectPopup',
            method: 'open',
          });
          }
          break;
        case 'reassign':
        {
          const callComponentMethodReassignOpenResult = await Actions.callComponentMethod(context, {
            selector: '#Reassign',
            method: 'open',
          });

      }
          break;
        case 'withdraw':
{

          const callComponentMethodWithdrawpopupOpenResult = await Actions.callComponentMethod(context, {
            selector: '#withdrawpopup',
            method: 'open',
          });
      }
          break;
        default:
          break;
      }
    }
  }

  return SimpleCreateAndEditPageTemplateSpSecondaryActionChain;
});
