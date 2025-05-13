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
            params: {
              'p_appl_code': 'CERTIFICATIOIN_HEADER',
              'p_appl_ref_id': $page.variables.pcertHeaderId,
              'p_appl_ref_num': $page.variables.pcerNum,
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
              'p_appr_code': 'CERTIFICATION',
              'p_type_id': $page.variables.pcertHeaderId,
            },
          });
        }
          break;
        case 'viewcontract':
        {
          const navigateToFlowContractResult = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'contract',
            page: 'contract-page',
            params: {
              'p_Revision_Number': $page.variables.previsionNum,
              'p_ContractHeader': $page.variables.pcontHeaderId,
              pBuId: $page.variables.postCertificationHdr.bu_id,
              TabHideVar: false,
            },
          });

        }
          break;
        
        case 'viewapplication':
        {
          const navigateToFlowApplicationResult = await Actions.navigateToFlow(context, {
            target: 'parent',
            flow: 'application',
            page: 'application-page',
            params: {
              papplHeaderId: $page.variables.postCertificationHdr.appl_header_id,
              pcontHeaderId: $page.variables.pcontHeaderId,
              previsionNum: $page.variables.postCertificationHdr.cont_revision_num,
              pageVar: 'CertificationPage',
            },
          });
        }
          break;
        case 'about':{

          const callComponentMethodAboutOpenResult = await Actions.callComponentMethod(context, {
            selector: '#About',
            method: 'open',
          });
          }
          break;
        case 'submit':
          if (true) {
      if ($page.variables.CertificationDetailsVar.approval_status_code === "Draft" || $page.variables.CertificationDetailsVar.approval_status_code === "Withdraw") {
      if ($application.functions.isFormValid("CertificationHdrForm")) {

                const callComponentMethodProgressMsgOpenResult = await Actions.callComponentMethod(context, {
                  selector: '#progressMsg',
                  method: 'open',
                });

        const callRestSubContractPostCertificationHeaderResult = await Actions.callRest(context, {
          endpoint: 'SubContract/postCertificationHeader',
          uriParams: {
            'P_METHOD': 'PUT',
            'P_PRIMARYKEY': $page.variables.pcertHeaderId,
          },
          body: $page.variables.postCertificationHdr,
        });

        if (!callRestSubContractPostCertificationHeaderResult.ok) {
                  const callComponentMethodProgressMsgCloseResult = await Actions.callComponentMethod(context, {
                    selector: '#progressMsg',
                    method: 'close',
                  });

          await Actions.fireNotificationEvent(context, {
            summary: $application.translations.appBundle.RestAPIError,
            message: $application.translations.appBundle.RestAPIError,
          });
        } else  {
$page.variables.PostApprovalSubmitApproval1Var.p_appr_process = 'CERTIFICATION';
            $page.variables.PostApprovalSubmitApproval1Var.p_trx_id = $page.variables.pcertHeaderId;
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
            } else {
              const callFunctionResult = await $page.functions.submitPayload($page.variables.pcertHeaderId, callRestSubContractPostApprovalSubmitapprovalResult.body.p_action_id);

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

                await Actions.callChain(context, {
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
                summary: 'Record not in Draft Status .',
                type: 'warning',
              });
      }

 
          } else {

            // THIS USED FOR MANUAL APPROVAL
            $page.variables.postSubmitForApprovalPkgVar.P_APPR_PROCESS = 'SC_CERT';

            $page.variables.postSubmitForApprovalPkgVar.P_TRX_ID = $page.variables.pcertHeaderId;

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
                displayMode: 'transient',
                type: 'info',
              });
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
          });
        }
          break;
        case 'Reassign':{          const callComponentMethodReassignOpenResult = await Actions.callComponentMethod(context, {
            selector: '#Reassign',
            method: 'open',
          });}
          break;
        case 'Withdraw':
        {
          const callComponentMethodWithdrawpopupOpenResult = await Actions.callComponentMethod(context, {
            selector: '#withdrawpopup',
            method: 'open',
          });

      }
          break;
        case 'transfer':{
          const callComponentMethodProgressMsgOpen2Result = await Actions.callComponentMethod(context, {
            selector: '#progressMsg',
            method: 'open',
          });

          $page.variables.PostStandardAPInvoiceVar.CertificateHeaderId = $page.variables.pcertHeaderId;
          

          const callRestIntegrationAPIPostStandardAPInvoiceResult = await Actions.callRest(context, {
            endpoint: 'IntegrationAPI/PostStandardAPInvoice',
            body: $page.variables.PostStandardAPInvoiceVar,
          });

          if (!callRestIntegrationAPIPostStandardAPInvoiceResult.ok) {
            const callComponentMethodProgressMsgClose5Result = await Actions.callComponentMethod(context, {
              selector: '#progressMsg',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'callRestIntegrationAPIPostStandardAPInvoiceResult.statusText',
            });
          } else {
            const callComponentMethodProgressMsgClose6Result = await Actions.callComponentMethod(context, {
              selector: '#progressMsg',
              method: 'close',
            });

            await Actions.callChain(context, {
              chain: 'onLoad',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Invoice Created.',
              displayMode: 'transient',
              type: 'info',
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
