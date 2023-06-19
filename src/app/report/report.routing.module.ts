import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';

import { OverviewComponent } from './overview/overview.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { SummaryComponent } from './summary/summary.component';
import { CicReportComponent } from './cicreport/cicreport.component';
import { TabComponent } from './tab.component';
import { DisbursalComponent } from './disbursal/disbursal.component';
// import {GstsummaryComponent} from '../gstsummary/gstsummary.component';
import { GstreportComponent } from '../camgstreport/gstreport.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { LoanDisbursalComponent } from './loandisbursal/loandisbursal.component';
import { GemDisbursalComponent } from './gemdisbursal/gemdisbursal.component';
import { StatementAccountComponent } from './statement-account/statement-account.component';
import { ActionComponent } from './action/action.component';
import { UpdateleadComponent } from './updatelead/updatelead.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';  

import { RejectedFaComponent } from './actionFunctions/rejected-fa/rejected-fa.component';  
import { TelcoRuleComponent } from './actionFunctions/telco-rule/telco-rule.component';  
import { UploadPanComponent } from './actionFunctions/upload-pan/upload-pan.component';  
import { UploadLoanDocComponent } from './actionFunctions/upload-loan-doc/upload-loan-doc.component';  
import { UploadKycComponent } from './actionFunctions/upload-kyc/upload-kyc.component';  
import { BusinessVerificationComponent } from './actionFunctions/business-verification/business-verification.component';  
import { BankRuleComponent } from './actionFunctions/bank-rule/bank-rule.component';
import { BankstatementUploadComponent } from './actionFunctions/bankstatement-upload/bankstatement-upload.component';
// import { SellerUploadPanComponent } from './actionFunctions/Seller-upload-pan/Seller-upload-pan.component';
import { SavePanComponent } from './actionFunctions/save-pan/save-pan.component';
import { BankstatementCompleteComponent } from './actionFunctions/bankstatement-complete/bankstatement-complete.component';
import { LoanApplicationFormComponent } from './loan-application-form/loan-application-form.component';
// import { SellerUploadApplicantComponent } from './actionFunctions/Seller-upload-applicant/Seller-upload-applicant.component';
import { BankProcessingComponent } from './actionFunctions/bank-processing/bank-processing.component';
import { UploadFilenetComponent } from './actionFunctions/upload-filenet/upload-filenet.component';
import { SellerActionComponent } from './actionFunctions/seller-action/seller-action.component';
import { NachFormComponent } from './actionFunctions/nach-form/nach-form.component';
import { UploadNachComponent } from './actionFunctions/upload-nach/upload-nach.component';

import { UploadLoanFormComponent } from './actionFunctions/upload-loan-form/upload-loan-form.component';
import { NachStatusReportComponent } from './nach-status-report/nach-status-report.component';
import { RepaymentReportComponent } from './repayment-report/repayment-report.component';
import {  SOAReportComponent } from './SOA-report/SOA-report.component';
import { ProgramReportComponent } from './program-report/program-report.component';
import { ChangeLoanStatusComponent  } from './change-loan-status/change-loan-status.component';
import { DisbursalActionComponent } from './disbursal-action/disbursal-action.component';
import { FinancialProcessingComponent } from './actionFunctions/financial-processing/financial-processing.component';
import { RepaymentReportSOAComponent  } from './repayment-report-soa/repayment-report-soa.component';
import { UpdateGSTn  } from './update-gstn/update-gstn.component';
import {DetailedTranchComponent} from './detailed-tranch/detailed-tranch.component'
import {PendingRepaymentComponent} from './pending-repayment/pending-repayment.component'
import {DescriptionPendingComponent} from './description-pending/description-pending.component'
import { NachComponent } from './nach/nach.component';
import { NachDownloadComponent } from './nach/nach-download/nach-download.component';
import { whatsapp  } from './whatsapp/whatsapp.component';
import { EmailnotsendComponent  } from './emailnotsend/emailnotsend.component';
import {  EmailsComponent } from './emailsend/emailsend.component';
import { PdcComponent } from './pdc/pdc.component';
import { AnchorList } from './anchor-list/anchor-list.component';
import { ViewLogsComponent } from './view-logs/view-logs.component';
import { FinancialCheckManualComponent } from './actionFunctions/financial-check-manual/financial-check-manual.component';
import { OverDueReportComponent } from './overdue-report/overdue-report.component';
import { LenderMISReportComponent } from './lenderMIS-report/lenderMIS-report.component';
import { FailedStepActionComponent } from './failed-step-action/failed-step-action.component';
import { VkycComponent } from './vkyc/vkyc.component';
import { PddDocumentComponent } from './pdd-document/pdd-document.component';
import { ViewPddDocumentComponent } from './view-pdd-document/view-pdd-document.component';


let routes:Routes=[
  {  path: '', redirectTo: 'loanRequestList', pathMatch: 'full',
  data: {
    title: 'Operation',
    urls: [
      { title: 'Operation', url: '/report' },
      { title: 'Loan list' }
    ]
  }},
  // {  path:'gstsummary' , component:GstsummaryComponent,},
  {  path: 'loanRequestList/:loanid', component: ReportComponent},
  {  path: 'loanRequestList/:panid', component: ReportComponent},
  {  path: 'loanRequestList', component: ReportComponent},
  {  path: 'draftLoanRequestList', component: ReportComponent,
    data: {
      title: 'Operation',
      urls: [
        { title: 'Operation', url: '/report' },
        { title: 'Draft Applications' }
      ]
    }
  },
  {  path:'overview/:id/:loanid',component:OverviewComponent},
  {  path:'cashflow/:id/:loanid' , component:CashflowComponent},
  {  path:'summary/:id/:loanid' , component:SummaryComponent},
  
  {  path:'cicReport/:id/:loanid' , component:CicReportComponent},
  {  path:'disbursal/:id/:loanid' , component:DisbursalComponent},
  {  path:'camgstsummary/:id/:loanid/:orgId/:retailerId/:programTypeId/:gemId' , component:GstreportComponent},
  {  path:'camgstsummary', component:GstreportComponent},
  {  path:'appexcellicationFrom/:id/:loanid/:orgId/:retailerId' , component:ApplicationFormComponent},
  {  path:'checklist/:id/:loanid/:orgId/:retailerId' , component:ChecklistComponent},
  {  path:'viewDocuments/:id/:loanid/:orgId/:retailerId' , component:ViewDocumentsComponent,
    data: {
      title: 'Operation',
      urls: [
        { title: 'Operation', url: '/report' },
        { title: 'Documents' }
      ]
    }
  },
  {  path:'viewDocuments' , component:ViewDocumentsComponent,
  data: {
    title: 'Operation',
    urls: [
      { title: 'Operation', url: '/report' },
      { title: 'Documents' }
    ]
  }
  },
  {  path:'loandisbursal/:id/:loanid/:orgId/:retailerId/:digital' , component:LoanDisbursalComponent,
  data: {
    title: 'Operation',
    urls: [
      { title: 'Operation', url: '/report' },
      { title: 'Disbursal & Repayment' }
    ]
  }
  },
  {  path:'loandisbursal' , component:LoanDisbursalComponent,
  data: {
    title: 'Operation',
    urls: [
      { title: 'Operation', url: '/report' },
      { title: 'Disbursal & Repayment' }
    ]
  }
  },
  {  path:'gemdisbursal/:id/:loanid/:orgId/:retailerId/:digital' , component:GemDisbursalComponent},
  {  path:'statementAccount/:id/:loanid/:orgId/:retailerId' , component:StatementAccountComponent,
  data: {
    title: 'Operation',
    urls: [
      { title: 'Operation', url: '/report' },
      { title: 'Statement of Account' }
    ]
  }
  },
  {  path:'action/:loanid/:programTypeId/:orgId/:subStatus' , component:ActionComponent},
  {  path:'action' , component:ActionComponent},
  {  path:'actionreinitiate' , component:FailedStepActionComponent},
  {  path:'action/:loanid/:subStatus/:programTypeId/:orgId/:gemId' , component:ActionComponent},
  {  path:'uploadDocuments/:id/:loanid/:orgId/:retailerId' , component:UploadDocumentComponent,
  data: {
    title: 'Operation',
    urls: [
      { title: 'Operation', url: '/report' },
      { title: 'Upload Documents' }
    ]
  }
  },
  {  path:'tab/:id/:loanid' , component:TabComponent},
  {  path:'rejectedFa/:id/:loanid/:orgId/:programTypeId' , component:RejectedFaComponent},
  {  path:'telcoRule/:id/:loanid/:orgId/:programTypeId' , component:TelcoRuleComponent},
  {  path:'uploadPan/:id/:loanid/:orgId/:programTypeId' , component:UploadPanComponent},
  {  path:'uploadLoanDoc/:id/:loanid/:orgId/:programTypeId' , component:UploadLoanDocComponent},
  {  path:'uploadKyc/:id/:loanid/:orgId/:programTypeId' , component:UploadKycComponent},
  {  path:'businessVerification/:id/:loanid/:orgId/:programTypeId' , component:BusinessVerificationComponent},
  {  path:'bankRule/:id/:loanid/:orgId/:programTypeId' , component:BankRuleComponent},
  {  path:'bankstatementUpload/:id/:loanid/:orgId/:programTypeId' , component:BankstatementUploadComponent},
  {  path:'savePan/:id/:loanid/:orgId/:programTypeId' , component:SavePanComponent},
  {  path:'bankstatementcomplete/:loanid/:orgId/:programTypeId' , component:BankstatementCompleteComponent},
  {  path:'sellerLoanForm/:id/:loanid/:orgId/:programTypeId' , component:LoanApplicationFormComponent},
  {  path:'sellerLoanForm/:id/:loanid/:orgId/:programTypeId/:flag' , component:LoanApplicationFormComponent},
  // {  path:'sellerUploadPan/:id/:loanid/:orgId/:programTypeId' , component:SellerUploadPanComponent,},
  // {  path:'sellerUploadApplicant/:id/:loanid/:orgId/:programTypeId' , component:SellerUploadApplicantComponent,},
  {  path:'bankProcessing/:id/:loanid/:orgId/:programTypeId' , component:BankProcessingComponent},
  {  path:'uploadFilenet/:id/:loanid/:orgId/:programTypeId' , component:UploadFilenetComponent},
  {  path:'sellerAction/:id/:loanid/:orgId/:programTypeId' , component:SellerActionComponent},
  {  path:'nachForm/:id/:loanid/:orgId/:programTypeId' , component:NachFormComponent},
  {  path:'uploadNachForm/:id/:loanid/:orgId/:programTypeId' , component:UploadNachComponent},
  {  path:'uploadLoanForm/:id/:loanid/:orgId/:programTypeId' , component:UploadLoanFormComponent},
  {  path:'nachstatusreport', component:NachStatusReportComponent},
  // {  path:'repaymentDetails' , component:RepaymentReportComponent,},
  {  path:'repaymentDetails' , component:RepaymentReportSOAComponent},
  {  path:'soaReport' , component:SOAReportComponent},
  {  path:'programReport' , component:ProgramReportComponent},
  {  path:'updateLoanStatus/:loanid/:programTypeId/:orgId' , component:ChangeLoanStatusComponent},
  {  path:'disbursalAction/:loanid/:disbursalId/:subStatus' , component:DisbursalActionComponent},  
  {  path:'financialProcessing/:id/:loanid/:orgId/:programTypeId' , component:FinancialProcessingComponent},
  {  path:'UpdateGSTn/:loanId/:orgId' , component:UpdateGSTn},
  {  path:'pendingrepayment', component:PendingRepaymentComponent, 
  data: {
    title: 'Report',
    urls: [
      { title: 'Report', url: '/report' },
      { title: 'Pending Repayment' }
    ]
  }
  },
  {  path:'detailedtranch/:id', component:DetailedTranchComponent},
  {  path:'descriptionpending/:id', component:DescriptionPendingComponent},
  {  path:'nach/:loanid/:orgId/:programTypeId', component: NachComponent},
  {  path:'whatsapp' , component:whatsapp},
  {  path:'emailnotsend' , component:EmailnotsendComponent},
  {  path:'emailsend' , component:EmailsComponent},
  {  path:'pdc/:loanid/:orgId/:programTypeId' , component:PdcComponent},
  {  path:'nachDownload/:loanid/:orgId/:programTypeId' , component:NachDownloadComponent},
  {  path:'anchorUpdate/:loanid/:orgId' , component:AnchorList,
  data: {
    title: 'Operation',
    urls: [
      { title: 'Operation', url: '/report' },
      { title: 'Anchor List' }
    ]
  }
  },
  {  path:'viewlog/:loanid' , component:ViewLogsComponent},
  {  path:'viewleads',component:UpdateleadComponent,
    data: {
      title: 'Operation',
      urls: [
        { title: 'Operation', url: '/report' },
        { title: 'Leads' }
      ]
    }
  },
  {  path:'viewleads/:gstId',component:UpdateleadComponent,
    data: {
      title: 'Operation',
      urls: [
        { title: 'Operation', url: '/report' },
        { title: 'View Leads' }
      ]
    }
  },
  {  path:'finanicalCheck/:loanid', component:FinancialCheckManualComponent},
  {  path:'overdue', component:OverDueReportComponent},
  {  path:'lenderMIS', component:LenderMISReportComponent},
  {  path:'vkyc',component:VkycComponent},
  {  path:'pdd',component:PddDocumentComponent},
  {  path:'viewPdd/:loanId',component:ViewPddDocumentComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
