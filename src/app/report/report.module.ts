import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report.routing.module';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { OverviewComponent } from './overview/overview.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { SummaryComponent } from './summary/summary.component';
import { CicReportComponent } from './cicreport/cicreport.component';

import { TabComponent } from './tab.component';
import { DisbursalComponent } from './disbursal/disbursal.component';
import { UpdateleadComponent } from './updatelead/updatelead.component';
import { GstreportComponent } from '../camgstreport/gstreport.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { LoanDisbursalComponent } from './loandisbursal/loandisbursal.component';

import { StatementAccountComponent } from './statement-account/statement-account.component';
import { ActionComponent, CreateLoanAPIPopupPage } from './action/action.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { RejectedFaComponent } from './actionFunctions/rejected-fa/rejected-fa.component';
import { TelcoRuleComponent } from './actionFunctions/telco-rule/telco-rule.component';
import { UploadPanComponent } from './actionFunctions/upload-pan/upload-pan.component';
import { UploadLoanDocComponent } from './actionFunctions/upload-loan-doc/upload-loan-doc.component';
import { UploadKycComponent } from './actionFunctions/upload-kyc/upload-kyc.component';
import { BusinessVerificationComponent } from './actionFunctions/business-verification/business-verification.component';
import { BankstatementUploadComponent, SuccessPopupPage, FailedPopupPage } from './actionFunctions/bankstatement-upload/bankstatement-upload.component';
import { BankRuleComponent } from './actionFunctions/bank-rule/bank-rule.component';
import { SavePanComponent } from './actionFunctions/save-pan/save-pan.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule,
  MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,MatTooltipModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MAT_DATE_LOCALE
} from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BankstatementCompleteComponent } from './actionFunctions/bankstatement-complete/bankstatement-complete.component';
import { LoanApplicationFormComponent,GSTDetailsPopUp } from './loan-application-form/loan-application-form.component';
import { BankProcessingComponent } from './actionFunctions/bank-processing/bank-processing.component';
import { UploadFilenetComponent } from './actionFunctions/upload-filenet/upload-filenet.component';
import { SellerActionComponent } from './actionFunctions/seller-action/seller-action.component';
import { NachFormComponent } from './actionFunctions/nach-form/nach-form.component';
import { UploadNachComponent } from './actionFunctions/upload-nach/upload-nach.component';
import { UploadLoanFormComponent } from './actionFunctions/upload-loan-form/upload-loan-form.component';
import { GemDisbursalComponent } from './gemdisbursal/gemdisbursal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NachStatusReportComponent } from './nach-status-report/nach-status-report.component';
import { RepaymentReportComponent } from './repayment-report/repayment-report.component';
import { SOAReportComponent } from './SOA-report/SOA-report.component';
import { ProgramReportComponent } from './program-report/program-report.component';
import { ChangeLoanStatusComponent } from './change-loan-status/change-loan-status.component';
import { DisbursalActionComponent } from './disbursal-action/disbursal-action.component';
import { FinancialProcessingComponent } from './actionFunctions/financial-processing/financial-processing.component';
import { RepaymentReportSOAComponent } from './repayment-report-soa/repayment-report-soa.component';
import { UpdateGSTn } from './update-gstn/update-gstn.component';
import { DetailedTranchComponent } from './detailed-tranch/detailed-tranch.component'
import { PendingRepaymentComponent } from './pending-repayment/pending-repayment.component'
import { DescriptionPendingComponent } from './description-pending/description-pending.component'
import { NachComponent } from './nach/nach.component';
import { whatsapp } from './whatsapp/whatsapp.component';
import { EmailnotsendComponent } from './emailnotsend/emailnotsend.component';
import { EmailsComponent } from './emailsend/emailsend.component';
import { PdcComponent } from './pdc/pdc.component';
import { NachDownloadComponent } from './nach/nach-download/nach-download.component';
import { AnchorList } from './anchor-list/anchor-list.component';
// import { TooltipDirective } from '../shared/tooltip.directive';
import { ViewLogsComponent } from './view-logs/view-logs.component';
import { FinancialCheckManualComponent } from './actionFunctions/financial-check-manual/financial-check-manual.component';
import { OverDueReportComponent } from './overdue-report/overdue-report.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LenderMISReportComponent } from './lenderMIS-report/lenderMIS-report.component';
import { SharedModule } from '../shared/shared.module';
import { FailedStepActionComponent } from './failed-step-action/failed-step-action.component';
import { VkycComponent } from './vkyc/vkyc.component';
import { PddDocumentComponent } from './pdd-document/pdd-document.component';
import { ViewPddDocumentComponent } from './view-pdd-document/view-pdd-document.component';
// import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    DisbursalComponent, ApplicationFormComponent, ChecklistComponent,VkycComponent,
    GstreportComponent, TabComponent, ReportComponent, OverviewComponent,
    CashflowComponent, SummaryComponent, CicReportComponent, ViewDocumentsComponent,
    LoanDisbursalComponent, StatementAccountComponent, ActionComponent, UploadDocumentComponent,
    RejectedFaComponent, TelcoRuleComponent, UploadPanComponent, UploadLoanDocComponent,
    UploadKycComponent, BusinessVerificationComponent, BankstatementUploadComponent, BankRuleComponent, SavePanComponent,
    SuccessPopupPage, FailedPopupPage, BankstatementCompleteComponent, LoanApplicationFormComponent,
    BankProcessingComponent, UploadFilenetComponent,
    SellerActionComponent, NachFormComponent, UploadNachComponent, UploadLoanFormComponent, GemDisbursalComponent,UpdateleadComponent,
    NachStatusReportComponent,
    RepaymentReportComponent, SOAReportComponent, ProgramReportComponent, ChangeLoanStatusComponent, DisbursalActionComponent,
    FinancialProcessingComponent, RepaymentReportSOAComponent, UpdateGSTn, DetailedTranchComponent, PendingRepaymentComponent,
    DescriptionPendingComponent, NachComponent
    , whatsapp,FailedStepActionComponent,
    EmailnotsendComponent, EmailsComponent, CreateLoanAPIPopupPage,GSTDetailsPopUp,PdcComponent,NachDownloadComponent,
    AnchorList, ViewLogsComponent,FinancialCheckManualComponent,OverDueReportComponent,LenderMISReportComponent, PddDocumentComponent,
    ViewPddDocumentComponent

  ],
  imports: [
    MatAutocompleteModule, MatInputModule,
    MatTabsModule, MatDialogModule,
    NgbModule,
    HighchartsChartModule,
    CommonModule,
    ReportRoutingModule,NgxQRCodeModule,
    FormsModule,
    // FormGroup, Validators,
    ReactiveFormsModule, MatCheckboxModule, MatTableModule, MatCardModule,
    MatTooltipModule,MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
    ChartsModule, NgxPaginationModule, Ng2SearchPipeModule, ImageCropperModule,DragDropModule,SharedModule,
    // AgGridModule.withComponents([])
  ],
  entryComponents: [
    BankstatementUploadComponent,
    CreateLoanAPIPopupPage,GSTDetailsPopUp],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReportModule {

}
