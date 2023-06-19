import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from '../../shared/currency.service';
import { ExcelService } from '../../shared/excel.service';
import { PdfService } from '../../shared/pdf.service';
import * as moment from 'moment/moment.js';
import {Crypto} from '../../shared/crypto.service';

export interface invoiceList {
  orgId: string;
  orgName: string;
  salesPersonName: String,
  totalInvoices: string;
  totalInvoiceAmount: string;
  totalPushed: string;
  totalPushedInvoiceAmount: string;
  totalPaidInvoiceAmount: string;
  regularPayInvoiceCount: string;
  finaggPayInvoiceCount: string;
  regularPayInvoiceAmount: string;
  finaggPayInvoiceAmount: string;
  outStandingInvoiceCount: string;
  outStandingInvoiceAmount: string;
  distTotalInvoices: string;
  distTotalInvoiceAmount: string;
  distOutStandingInvoiceCount: string;
  distOutStandingInvoiceAmount: string;
  finaggPayCashDiscountAmount: string;
  approvedAmount: String,
  approvedOn: String,
  availableAmount: String,
  repaymentInvoiceAmount: String,
  repaymentInvoice: String,
  salesPersonMobileNo: String,
  mobileNo: String,
  panNo: String,
  postAvailableAmount:string;
  excessAmount:string;
  UnFinancedInvoices:string;
  UnFinancedInvoiceAmount:string;
  TrancheOpenInvoices:string;
  TrancheOpenInvoiceAmount:string;
  TrancheRepayInvoices:string;
  TrancheRepayInvoiceAmount:string;
  TrancheFullyInvoices:string;
  TrancheFullyInvoiceAmount:string;
  overDueInvoices:string;
  overDueInvoiceAmount:string;
}

@Component({
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit {
  subtitle: string;
  mtdPaidPB: any;
  mtdPendingPB: any;
  mtdTotalInvoices: any;
  mtdNewInvoicesAmount: any;
  mtdDisburesedInvoicesAmount: any;
  mtdDisburesedInvoices: any;
  mtdNewInvoices: any;
  q1:any;
  q2:any
  q3:any;
  q4:any;
  q5:any;
  d:any;
  ytdPaidPB: any;
  ytdPendingPB: any;
  ytdNewInvoices: any;
  ytdTotalInvoices: any;
  ytdDisburesedInvoicesAmount: any;
  ytdDisburesedInvoices: any;
  ytdNewInvoicesAmount: any;

  notOnboarded: any;
  approved: any;
  inProgress: any;
  rejected: any;
  closeResult: string;
  totalInvoiceList = [];
  totalPendingInvoiceList = [];
  totalPaidInvoiceList = [];
  inprogressRetailerList = [];
  approvedRetailerList = [];
  rejectedRetailerList = [];
  notOnboardedRetailerList = [];
  repaymentInvoiceList = [];
  retailerList = [];
  brandList = [];
  programList = [];
  dashboardBrandList = [];
  startDate: any;
  endDate: any;
  totalInvoiceStartDate: any;
  totalInvoiceEndDate: any;
  nonFundedInvoiceStartDate: any;
  nonFundedInvoiceEndDate: any;
  fundedInvoiceStartDate: any;
  fundedInvoiceEndDate: any;
  overDueInvoiceStartDate: any;
  overDueInvoiceEndDate: any;
  repaidInvoiceStartDate: any;
  repaidInvoiceEndDate: any;
  overDue: any;
  unfinancedInvoiceList=[];
  tranchOpenInvoiceList=[];
  tranchRepayInvoiceList=[];
  tranchFullyInvoiceList=[];
  overDueInvoiceList=[];
  brandId: any;
  programId: any;
  programName: any;
  brandName: any;
  roleId:any;
  invoiceListMSG: any;

  p1:any=1;
  p2:any=1;
  p3:any=1;
  p4:any=1;
  p5:any=1;
  searchReportList:any;
  searchTotalInvoice:any;
  searchNonFundInvoice:any;
  searchFundedInvoice:any;
  searchRepaidInvoice:any;
  searchOverdueInvoice:any;
  lenderId:any;
  showInvoiceListMSG: boolean = false;
  TInvoices: boolean = false;
  NInvoices: boolean = false;
  FInvoices: boolean = false;
  RInvoices: boolean = false;
  totalInvoiceAmount=0;
  totalNonFundedInvoiceAmount=0;
  totalFundedInvoiceAmount=0;
  totalOverdueInvoiceAmount=0;
  totalRepaidInvoiceAmount=0;
  overallInvoiceAmount=0;
  constructor(private apiService: ApiService, private router: Router, public excelservice: ExcelService, private modalService: NgbModal, public currency: Currency,
    public pdfservice: PdfService,private crypto: Crypto) {
    this.subtitle = 'This is some text within a card block.';
  }
  invoiceList: invoiceList[] = [];
  orgId: any;

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  preventTyping() {
    return false;
  }
  searchParticularCustomer(orgId,customer){
    // this.searchTotalInvoice = customer;
    // this.searchNonFundInvoice = customer;
    // this.searchFundedInvoice = customer;
    // this.searchRepaidInvoice = customer;
    // this.searchOverdueInvoice = customer;
    this.retailerInvoiceList(orgId);
  }

  totalInvoiceExcel(){
    var list = [];
    var j = 1;
    var table = document.getElementById('totalInvoiceT') as HTMLTableElement;
    for (var i = 1; i < table.rows.length; i++) {
      var objCells = table.rows.item(i).cells;
      var b = objCells.item(2).innerHTML;
      var c = b.split('<div');
      for (let i of this.totalInvoiceList) {
        if(this.searchTotalInvoice == '' || ((this.searchTotalInvoice != '')&&(c[0] == i.invoiceNo))){
          const listObj = {
            'Sno': (j++),
            'Customer Name': i.customerName,
            'Invoice No': i.invoiceNo,
            'Invoice Date': i.invoiceDate,
            'Invoice Amt(Rs.)': this.indianCurrency(i.invoiceAmount),
            'GRN Date': i.grnDate,
            'Actual Due Date': i.DUE_Date,
            'Financed Amt': this.indianCurrency(i.financedAmount),
            'Disbursed Amt':this.indianCurrency(i.disbursableAmount),
            'Disbursed Date':i.disbursalDate,
            'Tenure': i.Tenor,
            'Status': i.fundingStatus,
            'Created On' : i.createdOn
          }
          list.push(listObj);
        }
      }
    }
    this.excelservice.exportAsExcelFile(list, 'total_invoiceList');
  }
  totalInvoicepdf() {
    var j = 1;
    var title = "total_invoiceList";
    var body;
    var headContent = ['Sno',   'Customer Name','Invoice No','Invoice Date',
    'Invoice Amount','Actual Due Date','Financed Amt','Disbursed Amount',
    'Disbursed Date','Tenure','Status','Created On' ]; 
    if(this.searchTotalInvoice == ''){
      body = [ headContent ,
        ...this.totalInvoiceList.map(i => ([j++,i.customerName,
          i.invoiceNo,i.invoiceDate,i.invoiceAmount,
         i.DUE_Date,i.financedAmount,
          i.disbursableAmount,i.disbursalDate,i.Tenor,i.fundingStatus, i.createdOn ]))
      ]
    }else {
      var body1;
      body = [headContent];
      var table = document.getElementById('totalInvoiceT') as HTMLTableElement;
      for (var i = 1; i < table.rows.length; i++) {
        var objCells = table.rows.item(i).cells;
        var b = objCells.item(2).innerHTML;
        var c = b.split('<div');
        for(let i of this.totalInvoiceList){
          if( c[0] == i.invoiceNo){
            body1 = [j++,i.customerName,
              i.invoiceNo,i.invoiceDate,i.invoiceAmount,
             i.DUE_Date,i.financedAmount,
              i.disbursableAmount,i.disbursalDate,i.Tenor,i.fundingStatus, i.createdOn];
          }
        }
        body.push(body1);
      }
    }
    this.pdfservice.pdf(body, title, 'A2');
  }
  nonFundedInvoiceExcel(){
    var list = [];
    var j = 1;
    var table = document.getElementById('nonFundedT') as HTMLTableElement;
    for (var i = 1; i < table.rows.length; i++) {
      var objCells = table.rows.item(i).cells;
      var b = objCells.item(2).innerHTML;
      var c = b.split('<div');
      for (let i of this.unfinancedInvoiceList) {
        if(this.searchNonFundInvoice == '' || ((this.searchNonFundInvoice != '')&&(c[0] == i.invoiceNo))){
       const listObj = {
        'Sno': (j++),
        'Customer Name': i.customerName,
        'Invoice No': i.invoiceNo,
        'Invoice Date': i.invoiceDate,
        'Invoice Amt': i.invoiceAmount,
        'Created On' : i.createdOn,
        'Actual Due Date': i.DUE_Date,
        'Tenure': i.Tenor,
      }
      list.push(listObj);
    }
  }
    }
    this.excelservice.exportAsExcelFile(list, 'NonFunded_invoiceList');
  }
  nonFundedInvoicePdf() {
    var j = 1;
    var title = "NonFunded_invoiceList";
    var body;
    var headContent =['Sno',   'Customer Name','Invoice No','Invoice Date',
    'Invoice Amount','Created on','Actual Due Date','Tenure']; 
    if(this.searchNonFundInvoice == ''){
      body = [headContent,
        ...this.unfinancedInvoiceList.map(i => ([j++,i.customerName,
          i.invoiceNo,i.invoiceDate,i.invoiceAmount,i.createdOn,
         i.DUE_Date,i.Tenor]))
      ]
    }else{
      var body1;
      body = [headContent];
      var table = document.getElementById('nonFundedT') as HTMLTableElement;
      for (var i = 1; i < table.rows.length; i++) {
        var objCells = table.rows.item(i).cells;
        var b = objCells.item(2).innerHTML;
        var c = b.split('<div');
        for(let i of this.unfinancedInvoiceList){
          if( c[0] == i.invoiceNo){
            body1 = [j++,i.customerName,
              i.invoiceNo,i.invoiceDate,i.invoiceAmount,i.createdOn,
             i.DUE_Date,i.Tenor];
          }
        }
        body.push(body1);
      }
      
    }
     
    this.pdfservice.pdf(body, title, 'A3');
  }
  fundedInvoiceExcel(){
    var list = [];
    var j = 1;
    var table = document.getElementById('fundedInvoiceT') as HTMLTableElement;
    for (var i = 1; i < table.rows.length; i++) {
      var objCells = table.rows.item(i).cells;
      var b = objCells.item(2).innerHTML;
      var c = b.split('<div');
      for (let i of this.tranchFullyInvoiceList) {
        if(this.searchFundedInvoice == '' || ((this.searchFundedInvoice != '')&&(c[0] == i.invoiceNo))){
      const listObj = {
        'Sno': (j++),
        'Customer Name': i.customerName,
        'Invoice No': i.invoiceNo,
        'Invoice Date': i.invoiceDate,
        'Invoice Amount': i.invoiceAmount,
        'Actual Due Date': i.DUE_Date,
        'Financed Amount':i.financedAmount,
        'Disbursement Amount':i.disbursableAmount,
        'Disbursement Date':i.disbursalDate,
        'Tranch No':i.tranchNo,
        'Tenure':i.Tenor,
        'Created On':i.createdOn
      }
      list.push(listObj);
    }
  }
    }
    this.excelservice.exportAsExcelFile(list, 'Funded_invoiceList');
  }
  fundedInvoicePdf() {
    var j = 1;
    var title = "funded_invoiceList";
    var headContent = ['Sno',   'Customer Name','Invoice No','Invoice Date',
    'Invoice Amount','Created On','Actual Due Date','Financed Amount','Disbursement Date',
    'Disbursement Amount','Tranch No',
    'Tenure']
    var body;
    if(this.searchFundedInvoice == ''){
     body = [ headContent ,
        ...this.tranchFullyInvoiceList.map(i => ([j++,i.customerName,
          i.invoiceNo,i.invoiceDate,i.invoiceAmount,i.createdOn,
          i.DUE_Date,i.financedAmount,i.disbursalDate,i.disbursableAmount,
          i.tranchNo,i.Tenor ]))
      ]
    } else {
      var body1;
      body = [headContent];
      var table = document.getElementById('fundedInvoiceT') as HTMLTableElement;
      for (var i = 1; i < table.rows.length; i++) {
        var objCells = table.rows.item(i).cells;
        var b = objCells.item(2).innerHTML;
        var c = b.split('<div');
        for(let i of this.tranchFullyInvoiceList){
          if( c[0] == i.invoiceNo){
            body1 = [j++,i.customerName,
              i.invoiceNo,i.invoiceDate,i.invoiceAmount,i.createdOn,
              i.DUE_Date,i.financedAmount,i.disbursalDate,i.disbursableAmount,
              i.tranchNo,i.Tenor ];
          }
        }
        body.push(body1);
      }
    }
    this.pdfservice.pdf(body, title, 'A2');
  }
  overdueInvoiceExcel(){
    var list = [];
    var j = 1;
    var table = document.getElementById('overdueT') as HTMLTableElement;
    for (var i = 1; i < table.rows.length; i++) {
      var objCells = table.rows.item(i).cells;
      var b = objCells.item(2).innerHTML;
      var c = b.split('<div');
      for (let i of this.overDueInvoiceList) {
        if(this.searchOverdueInvoice == '' || ((this.searchOverdueInvoice != '')&&(c[0] == i.invoiceNo))){
      const listObj = {
        'Sno': (j++),
        'Customer Name': i.customerName,
        'Invoice No': i.invoiceNo,
        'Invoice Date': i.invoiceDate,
        'Invoice Amt': i.invoiceAmount,
        'Actual Due Date': i.DUE_Date,
        'Financed Amount':i.financedAmount,
        'Disbursement Amount':i.disbursableAmount,
        'Disbursement Date':i.disbursalDate,
        'Tranch No':i.tranchNo,
        'Over Due By Days':i.OverDUeByDays,
        'Created On':i.createdOn
      }
      list.push(listObj);
    }}}
    this.excelservice.exportAsExcelFile(list, 'Funded_invoiceList');
  }
  overdueInvoicePdf() {
    var j = 1;
    var title = "funded_invoiceList";
    var headContent = ['Sno',   'Customer Name','Invoice No','Invoice Date',
    'Invoice Amt','Actual Due Date','Financed Amount',
    'Disbursement Amount','Disbursement Date',
    'Tranch No',
    'Over Due By Days','Created On'];
    var body;
    if(this.searchOverdueInvoice == ''){
      body = [headContent, ...this.overDueInvoiceList.map(i => ([j++,i.customerName,
        i.invoiceNo,i.invoiceDate,i.invoiceAmount,
        i.DUE_Date,i.financedAmount,i.disbursableAmount,
        i.disbursalDate,i.tranchNo,
        i.OverDUeByDays,i.createdOn ]))]
    }else{
      var body1;
      body = [headContent];
      var table = document.getElementById('overdueT') as HTMLTableElement;
      for (var i = 1; i < table.rows.length; i++) {
        var objCells = table.rows.item(i).cells;
        var b = objCells.item(2).innerHTML;
        var c = b.split('<div');
        for(let i of this.overDueInvoiceList){
          if( c[0] == i.invoiceNo){
            body1 = [j++,i.customerName,
              i.invoiceNo,i.invoiceDate,i.invoiceAmount,
              i.DUE_Date,i.financedAmount,i.disbursableAmount,
              i.disbursalDate,i.tranchNo,
              i.OverDUeByDays,i.createdOn ];
          }
        }
        body.push(body1);
      }
      
    }
    this.pdfservice.pdf(body, title, 'A2');
  }
  repaidInvoiceExcel(){
    var list = [];
    var j = 1;
    var table = document.getElementById('repaidInvoiceT') as HTMLTableElement;
    for (var i = 1; i < table.rows.length; i++) {
      var objCells = table.rows.item(i).cells;
      var b = objCells.item(2).innerHTML;
      var c = b.split('<div');
      for (let i of this.tranchRepayInvoiceList) {
        if(this.searchRepaidInvoice == '' || ((this.searchRepaidInvoice != '')&&(c[0] == i.invoiceNo))){
      const listObj = {
        'Sno': (j++),
        'Customer Name': i.customerName,
        'Invoice No': i.invoiceNo,
        'Invoice Date': i.invoiceDate,
        'Invoice Amount': i.invoiceAmount,
        'Actual Due Date': i.DUE_Date,
        'Financed Amount':i.financedAmount,
        'Disbursement Amount':i.disbursableAmount,
        'Disbursement Date':i.disbursalDate,
        'Tranch No':i.tranchNo,
        'Paid Amount':i.PaidAmount,
        'Created On':i.createdOn
      }
      list.push(listObj);
    }}
    }
    this.excelservice.exportAsExcelFile(list, 'repaid_invoiceList');
  }
  repaidInvoicePdf() {
    var j = 1;
    var title = "repaid_invoiceList";
    var headContent = ['Sno',   'Customer Name','Invoice No','Invoice Date',
    'Invoice Amount','Actual Due Date','Financed Amount',
    'Disbursement Amount','Disbursement Date',
    'Tranch No','Paid Amount','Created On']
    var body;
    if(this.searchRepaidInvoice == ''){
       body = [ headContent,
        ...this.tranchRepayInvoiceList.map(i => ([j++,i.customerName,
          i.invoiceNo,i.invoiceDate,i.invoiceAmount,
          i.DUE_Date,i.financedAmount,i.disbursableAmount,
          i.disbursalDate,i.tranchNo,
          i.PaidAmount,i.createdOn ]))
      ]
    }else {
      var body1;
      body = [headContent];
      var table = document.getElementById('repaidInvoiceT') as HTMLTableElement;
      for (var i = 1; i < table.rows.length; i++) {
        var objCells = table.rows.item(i).cells;
        var b = objCells.item(2).innerHTML;
        var c = b.split('<div');
        for(let i of this.tranchRepayInvoiceList){
          if( c[0] == i.invoiceNo){
            body1 = [j++,i.customerName,
              i.invoiceNo,i.invoiceDate,i.invoiceAmount,
              i.DUE_Date,i.financedAmount,i.disbursableAmount,
              i.disbursalDate,i.tranchNo,
              i.PaidAmount,i.createdOn ];
          }
        }
        body.push(body1);
      }
    }
    this.pdfservice.pdf(body, title, 'A2');
  }

  excel() {
    var list = [];
    var j = 1;
    var table = document.getElementById('custDetails') as HTMLTableElement;
    for (var i = 0; i < table.rows.length; i++) {
      var objCells = table.rows.item(i).cells;
      var b = objCells.item(0).innerHTML;
      var c = b.split('custbreak');
      var d = c[1];
      var e = d.substring(2,12);
      for (let i of this.invoiceList) {
      if(this.searchReportList == '' || ((this.searchReportList != '') && (e == i.panNo)) ){
        const listObj = {
          'Sno': (j++),
          'Retailer': i.orgName,
          'Pan No': i.panNo,
          'mobile No': i.mobileNo,
          'Sales Person Name': i.salesPersonName,
          'Sales Person Mobile No': i.salesPersonMobileNo,
          'Approved Limit': i.approvedAmount,
          'Approved On': i.approvedOn,
          'Available Limit': i.availableAmount,
          'Post Available Limit':i.postAvailableAmount,
          'Excess Amount':i.excessAmount,
          'Total No of Invoices': i.totalInvoices,
          'Total Invoice Amount': i.totalInvoiceAmount,
          'No of Non Funded Invoices':i.UnFinancedInvoices,
          'Non Funded Invoices Amount':i.UnFinancedInvoiceAmount,
          'No of Funded Invoice Amount':i.TrancheFullyInvoices,
          'Funded Invoice Amount':i.TrancheFullyInvoiceAmount,
          'No of Repaid Invoices':i.TrancheRepayInvoices,
          'Repaid Invoice Amount':i.TrancheRepayInvoiceAmount,
          'No of OverDue Invoices':i.overDueInvoices,
          'OverDue Invoice Amount':i.overDueInvoiceAmount,
        }
        list.push(listObj);
      }
    }
    }
    this.excelservice.exportAsExcelFile(list, 'dashboard_invoiceList');
  }
  pdf() {
    var j = 1;
    var title = "dashboard_customerList";
    var headContent = ['Sno', 'Retailer', 'Pan No', 'mobile No', 'Sales Person Name', 'Sales Person Mobile No',
    'Approved Limit', 'Approved On', 'Available Limit','Post Available Limit','Excess Amount','Total No of Invoices',
    'Total Invoice Amount','No of Non-Funed Invoices','Total Non-Funed Invoices Amount',
    'No of Funded Invoice','Funded Invoice Amount','No of Repaid Invoice',
    'Repaid Invoice Amount',
    'No of OverDue Invoices','OverDue Invoice Amount', ];
    var body;
    if(this.searchReportList == ''){
      body = [headContent, ...this.invoiceList.map(i => ([j++, i.orgName, i.panNo, i.mobileNo,
        i.salesPersonName, i.salesPersonMobileNo, i.approvedAmount
        , i.approvedOn, i.availableAmount,
        i.postAvailableAmount,i.excessAmount,i.totalInvoices,
        i.totalInvoiceAmount,i.UnFinancedInvoices,i.UnFinancedInvoiceAmount,i.TrancheFullyInvoices,i.TrancheFullyInvoiceAmount,
        i.TrancheRepayInvoices,i.TrancheRepayInvoiceAmount,
        i.overDueInvoices,i.overDueInvoiceAmount]))]
    }else {
      var body1;
      body = [headContent];
      var table = document.getElementById('custDetails') as HTMLTableElement;
      for (var i = 0; i < table.rows.length; i++) {
        var objCells = table.rows.item(i).cells;
        var b = objCells.item(0).innerHTML;
        var c = b.split('custbreak');
        var d = c[1];
        var e = d.substring(2,12);
        for(let i of this.invoiceList){
          if( e == i.panNo){
            body1 = [j++, i.orgName, i.panNo, i.mobileNo,
              i.salesPersonName, i.salesPersonMobileNo, i.approvedAmount
              , i.approvedOn, i.availableAmount,
              i.postAvailableAmount,i.excessAmount,i.totalInvoices,
              i.totalInvoiceAmount,i.UnFinancedInvoices,i.UnFinancedInvoiceAmount,i.TrancheFullyInvoices,i.TrancheFullyInvoiceAmount,
              i.TrancheRepayInvoices,i.TrancheRepayInvoiceAmount,
              i.overDueInvoices,i.overDueInvoiceAmount];
          }
        }
        body.push(body1);
    }
  }
    
    this.pdfservice.pdf(body, title, 'A2');
  }
  ngOnInit(): void {
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.totalInvoiceAmount=0;
    this.totalNonFundedInvoiceAmount=0;
    this.totalFundedInvoiceAmount=0;
    this.totalOverdueInvoiceAmount=0;
    this.totalRepaidInvoiceAmount=0;
    this.startDate=moment().format('YYYY-MM')+"-01";
    this.endDate=moment().format('YYYY-MM-DD');
    this.totalInvoiceStartDate=this.startDate;
    this.totalInvoiceEndDate=this.endDate;
    this.nonFundedInvoiceStartDate=this.startDate;
    this.nonFundedInvoiceEndDate=this.endDate;
    this.fundedInvoiceStartDate=this.startDate;
    this.fundedInvoiceEndDate=this.endDate;
    this.overDueInvoiceStartDate=this.startDate;
    this.overDueInvoiceEndDate=this.endDate;
    this.repaidInvoiceStartDate=this.startDate;
    this.repaidInvoiceEndDate=this.endDate;
    this.lenderId=Number(this.crypto.decryt(window.localStorage.getItem('lenderId')));
    if(this.roleId == '7'){
      this.orgId = 'orgId';
    }else if (this.roleId == '4' || this.roleId == '8') {
      this.orgId = this.crypto.decryt(window.localStorage.getItem("orgId"));
    } else if (this.roleId != '3') {
      this.orgId = this.crypto.decryt(window.localStorage.getItem("orgId"));
    } else {
      this.orgId = this.crypto.decryt(window.localStorage.getItem("orgId"));
      }
   this.getInvoiceListSummary();
    this.getBrandDashboardMTDSummary();
    this.getBrandDashboardRetailerSummary();
    this.getRetailerDetails();
    this.getTotalInvoiceList(this.orgId,0,'startDate','endDate');
    this.getUnfincancedInvoiceList(this.orgId,0,'startDate','endDate');
    this.gettranchOpenInvoiceList(this.orgId,0,'startDate','endDate');
    this.getTranchRepayInvoiceList(this.orgId,0,'startDate','endDate');
    this.getTranchFullyInvoiceList(this.orgId,0,'startDate','endDate');
    this.getOverDueInvoiceList(this.orgId,0,'startDate','endDate');
    //   this.apiService.getParentRetailerList().subscribe(data => {
    //     if (data.status == 200) {
    //       this.retailerList = data.result;
    //     } 
    //   }, error => console.log(error));
    // this.apiService.getBrandNameList().subscribe(data => {
    //     if (data.status == 200) {
    //       this.brandList = data.result;
    //     } 

    //   }, error => console.log(error));
    //     this.apiService.getProgramList().subscribe(data => {
    //   if (data.status == 200) {
    //     this.programList = data.result;
    //   } 
    // }, error => console.log(error));
   this.apiService.getDashboardBrandList(  ).subscribe(data => {
      this.dashboardBrandList = data.result;
    }, error => { console.log(error.message); });

  }

  submit() {

  }
  totalInvoiceDateFilter(){
    var a = this.totalInvoiceStartDate.split('-');
    var b = a[2]+"-"+a[1]+"-"+a[0];
    var c = this.totalInvoiceEndDate.split('-');
    var d = c[2]+"-"+c[1]+"-"+c[0];
    this.getTotalInvoiceList(this.orgId,0,this.totalInvoiceStartDate,this.totalInvoiceEndDate)
  }
  nonFundedInvoiceDateFilter(){
    var a = this.nonFundedInvoiceStartDate.split('-');
    var b = a[2]+"-"+a[1]+"-"+a[0];
    var c = this.nonFundedInvoiceEndDate.split('-');
    var d = c[2]+"-"+c[1]+"-"+c[0];
    this.getUnfincancedInvoiceList(this.orgId,0,this.nonFundedInvoiceStartDate,this.nonFundedInvoiceEndDate)
  }
  fundedInvoiceDateFilter(){
    var a = this.fundedInvoiceStartDate.split('-');
    var b = a[2]+"-"+a[1]+"-"+a[0];
    var c = this.fundedInvoiceEndDate.split('-');
    var d = c[2]+"-"+c[1]+"-"+c[0];
    this.getTranchRepayInvoiceList(this.orgId,0,this.fundedInvoiceStartDate,this.fundedInvoiceEndDate)
  }
  overdueInvoiceDateFilter(){
    var a = this.overDueInvoiceStartDate.split('-');
    var b = a[2]+"-"+a[1]+"-"+a[0];
    var c = this.overDueInvoiceEndDate.split('-');
    var d = c[2]+"-"+c[1]+"-"+c[0];
    this.getOverDueInvoiceList(this.orgId,0,this.overDueInvoiceStartDate,this.overDueInvoiceEndDate)
  }
  repaidInvoiceDateFilter(){
    var a = this.repaidInvoiceStartDate.split('-');
    var b = a[2]+"-"+a[1]+"-"+a[0];
    var c = this.repaidInvoiceEndDate.split('-');
    var d = c[2]+"-"+c[1]+"-"+c[0];
    this.getTranchFullyInvoiceList(this.orgId,0,this.repaidInvoiceStartDate,this.repaidInvoiceEndDate)
  }
  resetOrgId() {
    this.showInvoiceListMSG = false;
    this.notOnboarded = 0;
    this.approved = 0;
    this.inProgress = 0;
    this.rejected = 0;
    this.getInvoiceListSummary();
    this.getBrandDashboardMTDSummary();
    this.getBrandDashboardRetailerSummary();
    this.getRetailerDetails();
    this.getTotalInvoiceList(this.orgId,0,'startDate','endDate');
    this.getUnfincancedInvoiceList(this.orgId,0,'startDate','endDate');
    this.gettranchOpenInvoiceList(this.orgId,0,'startDate','endDate');
    this.getTranchRepayInvoiceList(this.orgId,0,'startDate','endDate');
    this.getTranchFullyInvoiceList(this.orgId,0,'startDate','endDate');
    this.getOverDueInvoiceList(this.orgId,0,'startDate','endDate');
    this.searchTotalInvoice = '';
    this.searchNonFundInvoice = '';
    this.searchFundedInvoice = '';
    this.searchRepaidInvoice = '';
    this.searchOverdueInvoice = '';
    this.searchReportList = '';
  }
  retailerInvoiceList(orgId){
    this.getTotalInvoiceList(orgId,1,'startDate','endDate');
    this.getUnfincancedInvoiceList(orgId,1,'startDate','endDate');
    this.gettranchOpenInvoiceList(orgId,1,'startDate','endDate');
    this.getTranchRepayInvoiceList(orgId,1,'startDate','endDate');
    this.getTranchFullyInvoiceList(orgId,1,'startDate','endDate');
    this.getOverDueInvoiceList(orgId,1,'startDate','endDate');
  }
  getBrandDetails() {
    this.orgId = "";
    this.brandId = "";
    this.apiService.getBrandNameList(this.programId).subscribe(data => {
      if (data.status == 200) {
        this.brandList = data.result;
      }
    }, error => console.log(error));
  }
  getRetailerList() {
    this.orgId = "";
    this.apiService.getParentRetailerList(this.programId, this.brandId).subscribe(data => {
      if (data.status == 200) {
        this.retailerList = data.result;
      }
    }, error => console.log(error));
  }
  getRetailerDetails() {
    this.apiService.getRetailerDetails(this.orgId,this.lenderId).subscribe(data => {
      if (data.status === 200) {
        console.log(data.result);
        this.inprogressRetailerList = data.result.inprogress;
        this.approvedRetailerList = data.result.approved;
        this.rejectedRetailerList = data.result.rejected;
        this.notOnboardedRetailerList = data.result.notOnboarded;
      }
    }, error => { console.log(error.message); });
  }
  inprogressRetailers(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  approvedRetailers(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  notonboardedRetailers(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  rejectedRetailers(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getInvoiceListSummary() {
    var a="0";

    var b="0";
    if(this.roleId=="8")
    {
      b= this.crypto.decryt(window.localStorage.getItem("orgId")).toString();
    }
    if(this.roleId=="11")
    {
      a=this.crypto.decryt(window.localStorage.getItem("orgId")).toString();
    }
    // this.apiService.getInvoiceListSummary(this.orgId).subscribe(data => {
    this.apiService.getInvoiceListSummary(this.orgId,this.lenderId,a,b).subscribe(data => {
      if (data.status === 200) {
        console.log(data.result);
        this.invoiceList = data.result;
        this.overallInvoiceAmount=0;
        for(let i of this.invoiceList){
          this.overallInvoiceAmount=Number(this.overallInvoiceAmount)+Number(i.totalInvoiceAmount);
        }
        // alert("invoiceList:"+this.invoiceList.length);
        if (this.invoiceList.length == 0) {
          this.invoiceListMSG = "Data Not Available";
          this.showInvoiceListMSG = true;

        }
      }
    }, error => { console.log(error.message); });
  }
  getBrandDashboardMTDSummary() {
    this.apiService.getBrandDashboardMTDSummary(this.orgId,this.lenderId).subscribe(data => {
      if (data.status === 200) {

        this.mtdTotalInvoices = data.result[0].mtdTotalInvoices;
        this.mtdNewInvoicesAmount = data.result[0].mtdNewInvoicesAmount;
        this.mtdDisburesedInvoicesAmount = data.result[0].mtdDisburesedInvoicesAmount;
        this.mtdDisburesedInvoices = data.result[0].mtdDisburesedInvoices;
        this.mtdNewInvoices = data.result[0].mtdNewInvoices;

        this.mtdPaidPB = (this.mtdDisburesedInvoices * 100 / this.mtdTotalInvoices).toFixed(2);
        this.mtdPendingPB = (this.mtdNewInvoices * 100 / this.mtdTotalInvoices).toFixed(2);

        this.ytdNewInvoices = data.result[1].ytdNewInvoices;
        this.ytdTotalInvoices = data.result[1].ytdTotalInvoices;
        this.ytdDisburesedInvoicesAmount = data.result[1].ytdDisburesedInvoicesAmount;
        this.ytdDisburesedInvoices = data.result[1].ytdDisburesedInvoices;
        this.ytdNewInvoicesAmount = data.result[1].ytdNewInvoicesAmount;
        this.ytdPaidPB = (this.ytdDisburesedInvoices * 100 / this.ytdTotalInvoices).toFixed(2);
        this.ytdPendingPB = (this.ytdNewInvoices * 100 / this.ytdTotalInvoices).toFixed(2);
        console.log('getBrandDashboardMTDSummary::' + JSON.stringify(data.result));
      }
    }, error => { console.log(error.message); });
  }
  getTotalInvoiceList(orgId,type,startDate,endDate) {
    this.TInvoices=true;
    this.totalInvoiceAmount=0;
    this.apiService.getTotalInvoiceList(orgId,type,startDate,endDate).subscribe(data => {
        if(data.status==200){
        this.totalInvoiceList=data.result;
        for(let l of this.totalInvoiceList){
          this.totalInvoiceAmount=Number(this.totalInvoiceAmount)+Number(l.invoiceAmount);
        }
      }else{
        this.totalInvoiceAmount=0;
      }
    },error => {console.log(error.message);}) ;
    // this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }
  getUnfincancedInvoiceList(orgId,type,startDate,endDate) {
    this.apiService.getUnFinancedInvoices(orgId,type,startDate,endDate).subscribe(data => {
      this.totalNonFundedInvoiceAmount=0;
      if(data.status==200){
        this.unfinancedInvoiceList=data.result;
        for(let i of this.unfinancedInvoiceList){
          this.totalNonFundedInvoiceAmount=Number(this.totalNonFundedInvoiceAmount)+Number(i.pendingAmount);
        }
      }else{
        this.totalNonFundedInvoiceAmount=0;
      }
    },error => {console.log(error.message);}) ;
    // this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }
  gettranchOpenInvoiceList(orgId,type,startDate,endDate) {
    this.apiService.getTranchOpen(orgId,type,startDate,endDate).subscribe(data => {
      if(data.status==200){
        this.tranchOpenInvoiceList=data.result;
      }
    },error => {console.log(error.message);}) ;
    // this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }
  getTranchRepayInvoiceList(orgId,type,startDate,endDate) {
    this.apiService.getTranchRepayment(orgId,type,startDate,endDate).subscribe(data => {
      this.totalRepaidInvoiceAmount=0;
      if(data.status==200){
        this.tranchRepayInvoiceList=data.result;
        for(let i of this.tranchRepayInvoiceList){
          this.totalRepaidInvoiceAmount=Number(this.totalRepaidInvoiceAmount)+Number(i.financedAmount);
        }
      }else{
        this.totalRepaidInvoiceAmount=0;
      }
    },error => {console.log(error.message);}) ;
    // this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }
  getTranchFullyInvoiceList(orgId,type,startDate,endDate) {
    this.apiService.getTranchfullyPaid(orgId,type,startDate,endDate).subscribe(data => {
      this.totalFundedInvoiceAmount=0;
      if(data.status==200){
        this.tranchFullyInvoiceList=data.result;
        for(let i of this.tranchFullyInvoiceList){
          this.totalFundedInvoiceAmount=Number(this.totalFundedInvoiceAmount)+Number(i.financedAmount);
        }
      }else{
        this.totalFundedInvoiceAmount=0;
      }
    },error => {console.log(error.message);}) ;
    // this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }
  getOverDueInvoiceList(orgId,type,startDate,endDate) {
    this.apiService.getTranchOverDue(orgId,type,startDate,endDate).subscribe(data => {
      this.totalOverdueInvoiceAmount=0;
      if(data.status==200){
        this.overDueInvoiceList=data.result;
        for(let i of this.overDueInvoiceList){
          this.totalOverdueInvoiceAmount=Number(this.totalOverdueInvoiceAmount)+Number(i.financedAmount);
        }
      }else{
        this.totalOverdueInvoiceAmount=0;
      }
    },error => {console.log(error.message);}) ;
    // this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }
  getPendingInvoiceList(content, orgId: number) {
    this.apiService.getTotalPendingInvoiceList(orgId).subscribe(data => {
      if (data.status == 200) {
        this.totalPendingInvoiceList = data.result;
      }
    }, error => { console.log(error.message); });
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getFinaggPaidInvoiceList(content, orgId: number) {
    this.apiService.getTotalPaidInvoiceList(orgId).subscribe(data => {
      if (data.status == 200) {
        this.totalPaidInvoiceList = data.result;
      }
    }, error => { console.log(error.message); });
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getPendingRepaymentInvoiceList(content, orgId: number) {
    this.apiService.getRepaymentInvoiceList(orgId).subscribe(data => {
      if (data.status == 200) {
        this.repaymentInvoiceList = data.result;
      }
    }, error => { console.log(error.message); });
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  listSize1(e) {
    this.p1 = Number(e.target.value);
  }
  listSize2(e) {
    this.p2 = Number(e.target.value);
  }
  listSize3(e) {
    this.p3 = Number(e.target.value);
  }
  listSize4(e) {
    this.p4 = Number(e.target.value);
  }
  listSize5(e) {
    this.p5 = Number(e.target.value);
  }
  getBrandDashboardRetailerSummary() {
    this.apiService.getBrandDashboardRetailerSummary(this.orgId,this.lenderId).subscribe(data => {
      if (data.status === 200) {
        for (let a of data.result) {
          if (a.status == 'Not Onboarded') {
            this.notOnboarded = (a.statusCount)?a.statusCount:'0';
          } else if (a.status == 'Approved') {
            this.approved = (a.statusCount)?a.statusCount:'0';
          } else if (a.status == 'In Progress') {
            this.inProgress = (a.statusCount)?a.statusCount:'0';
          } else if (a.status == 'Rejected') {
            this.rejected = (a.statusCount)?a.statusCount:'0';
          }
        }
        console.log(data.result);
        this.notOnboarded=(this.notOnboarded)?this.notOnboarded:'0';
        this.approved=(this.approved)?this.approved:'0';
        this.inProgress=(this.inProgress)?this.inProgress:'0';
        this.rejected=(this.rejected)?this.rejected:'0';
      }
    }, error => { console.log(error.message); });
  }
  // This is for the dashboar line chart
  // lineChart
  public lineChartData: Array<any> = [
    { data: [50, 130, 80, 120, 180, 140, 250], label: 'FinAgg Paid' },
    { data: [80, 100, 60, 80, 70, 90, 150], label: 'Regular Paid' }
  ];

  public lineChartLabels: Array<any> = [
    'Dec 19',
    'Jan 20',
    'Feb 20',
    'Mar 20',
    'Apr 20',
    'May 20',
    'Jun 20'

  ];
  public lineChartOptions: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(120, 130, 140, 0.13)'
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: 'rgba(120, 130, 140, 0.13)'
          }
        }
      ]
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(25,118,210,0.0)',
      borderColor: 'rgba(25,118,210,1)',
      pointBackgroundColor: 'rgba(25,118,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(25,118,210,0.5)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(38,218,210,0.0)',
      borderColor: 'rgba(38,218,210,1)',
      pointBackgroundColor: 'rgba(38,218,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(38,218,210,0.5)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  // Doughnut
  public doughnutChartLabels: string[] = ['Sales', 'Earning', 'Cost'];

  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // Sales Analytics Pie chart
  public pieChartLabels: string[] = ['Sales', 'Earning', 'Cost'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  // bar chart
  public barChartData: Array<any> = [
    { data: [1.1, 1.4, 1.1, 0.9, 2.1, 1, 0.3], label: 'Cost' }
  ];
  public barChartLabels: Array<any> = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7'
  ];
  public barChartOptions: any = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.2,
        categoryPercentage: 0.5
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      hoverBackgroundColor: 'rgba(255, 255, 255, 0.3)',
      hoverBorderWidth: 2,
      hoverBorderColor: 'rgba(255, 255, 255, 0.3)'
    }
  ];
  public barChartLegend = false;
  public barChartType = 'bar';
}
