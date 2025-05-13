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
        case 'attachment':{
          const navigateToFlowGenericPageResult = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'generic-page',
            page: 'generic-attachment',
            params: {
              'p_appl_code': 'RETENTION_HEADER',
              'p_appl_ref_id': $page.variables.pRetHeader_id,
              'p_appl_ref_num': $page.variables.PostHeaderVar.ret_rel_number,
            },
          });
        }
          break;
        case 'approvalhistory':
        {
          const navigateToFlowGenericPage2Result = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'generic-page',
            page: 'generic-approval-history',
            params: {
              'p_appr_code': 'RETENTION_RELEASE',
              'p_type_id': $page.variables.pRetHeader_id,
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
              pBuId: $page.variables.PostHeaderVar.bu_id,
              'p_ContractHeader': $page.variables.p_ContHeaderId,
              'p_Revision_Number': $page.variables.PostHeaderVar.cont_revision_num,
              TabHideVar: false,
              pageVar: 'RET_REL',
              taskId: $page.variables.taskId,
            },
          });
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
        
        case 'submit':{
          if (true) {

            const callComponentMethodProgressMsgOpenResult = await Actions.callComponentMethod(context, {
              selector: '#progressMsg',
              method: 'open',
            });

      const callRestSubContractPostRententionHeaderResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postRententionHeader',
        uriParams: {
          'P_METHOD': 'PUT',
          'P_PRIMARYKEY': $page.variables.pRetHeader_id,
        },
        body: $page.variables.postRententionHeaderSaveVar,
      });

      if (!callRestSubContractPostRententionHeaderResult.ok) {
              const callComponentMethodProgressMsgCloseResult = await Actions.callComponentMethod(context, {
                selector: '#progressMsg',
                method: 'close',
              });

        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRententionHeaderResult.body.p_err_msg,
        });
      } else {

const callFunctionResult = await $page.functions.generateLineDetail($page.variables.retLineADP.data, $page.variables.Sysdate, $application.variables.saasGetLogin.email_address);

      await $page.functions.printArrayValue(callFunctionResult.payload.items);

      const callRestSubContractPostRententionLineResult = await Actions.callRest(context, {
        endpoint: 'SubContract/postRententionLine',
        uriParams: {
          'P_METHOD': 'PUT',
          'P_PRIMARYKEY': '-99',
        },
        body: callFunctionResult.payload,
      });

      if (!callRestSubContractPostRententionLineResult.ok) {
                const callComponentMethodProgressMsgClose2Result = await Actions.callComponentMethod(context, {
                  selector: '#progressMsg',
                  method: 'close',
                });

        await Actions.fireNotificationEvent(context, {
          summary: callRestSubContractPostRententionLineResult.body.p_err_msg,
        });
              } else {

$page.variables.PostApprovalSubmitApproval1Var.p_appr_process = 'RETENTION_RELEASE';
            $page.variables.PostApprovalSubmitApproval1Var.p_trx_id = $page.variables.pRetHeader_id;
            $page.variables.PostApprovalSubmitApproval1Var.p_user_id = $application.variables.saasGetLogin.user_id;

            const callRestSubContractPostApprovalSubmitapprovalResult = await Actions.callRest(context, {
              endpoint: 'SubContract/postApprovalSubmitapproval',
              body: $page.variables.PostApprovalSubmitApproval1Var,
            });

            if (!callRestSubContractPostApprovalSubmitapprovalResult.ok) {
              await Actions.fireNotificationEvent(context, {
                summary: 'callRestSubContractPostApprovalSubmitapprovalResult.body.p_error_msg',
              });
            } else if (callRestSubContractPostApprovalSubmitapprovalResult.body.p_error_code === "S") {
              const callFunctionResult1 = await $page.functions.submitPayload($page.variables.pRetHeader_id, callRestSubContractPostApprovalSubmitapprovalResult.body.p_action_id);

              $page.variables.pcsPostProcessesVar.payload = callFunctionResult1;

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

              const callChainOnLoadResult = await Actions.callChain(context, {
                chain: 'onLoad',
              });

                    const callComponentMethodProgressMsgClose4Result = await Actions.callComponentMethod(context, {
                      selector: '#progressMsg',
                      method: 'close',
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

            $page.variables.postSubmitForApprovalPkgVar.P_APPR_PROCESS = 'SC_RET_REL';

            $page.variables.postSubmitForApprovalPkgVar.P_TRX_ID = $page.variables.pRetHeader_id;

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
                displayMode: 'transient',
                summary: callRestSubContractPostSubmitForApprovalPkgResult.body.P_ERROR_MSG,
                type: 'info',
              });
            }
          }
        }
          break;

        case 'approve':{
          const callComponentMethodApprovePopUpOpenResult = await Actions.callComponentMethod(context, {
            selector: '#approvePopUp',
            method: 'open',
          });}
          break;
        case 'reject':{
          const callComponentMethodRejectPopupOpenResult = await Actions.callComponentMethod(context, {
            selector: '#RejectPopup',
            method: 'open',
          });}
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
        case 'transfer':
        {
          const callComponentMethodProgressMsgOpen2Result = await Actions.callComponentMethod(context, {
            selector: '#progressMsg',
            method: 'open',
          });

          $page.variables.PostStandardAPInvoiceVar.CertificateHeaderId = $page.variables.pRetHeader_id;

          const callRestIntegrationAPIIntegrationretentionReleaseAPIResult = await Actions.callRest(context, {
            endpoint: 'IntegrationAPI/IntegrationretentionReleaseAPI',
            body: $page.variables.PostStandardAPInvoiceVar,
          });

          if (!callRestIntegrationAPIIntegrationretentionReleaseAPIResult.ok) {
            const callComponentMethodProgressMsgClose5Result = await Actions.callComponentMethod(context, {
              selector: '#progressMsg',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'callRestIntegrationAPIIntegrationretentionReleaseAPIResult.statusText',
            });
          } else {
            const callComponentMethodProgressMsgClose6Result = await Actions.callComponentMethod(context, {
              selector: '#progressMsg',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Invoice Created.',
              displayMode: 'transient',
              type: 'confirmation',
            });
          }
        }
          break;
        default:
          break;
      }
    }
  }

  return SimpleCreateAndEditPageTemplateSpSecondaryActionChain;
});
