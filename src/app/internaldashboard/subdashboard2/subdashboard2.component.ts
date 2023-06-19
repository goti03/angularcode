import { Component, OnInit } from '@angular/core';
import { ApiService } from "..//..//core/api.service";
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment.js';
import { HeatMapCellComponent } from '@swimlane/ngx-charts';
import { ExcelService } from '../../shared/excel.service';
import { Currency } from '../../shared/currency.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-subdashboard2',
  templateUrl: './subdashboard2.component.html',
  styleUrls: ['./subdashboard2.component.css']
})
export class Subdashboard2Component implements OnInit {
  invoiceDate: any;
  invoiceendDate: any;
  i: any;
  LenderList: any;
  lenderId: any;
  invoiceFlag: any;
  lengths: any;
  retailernow: boolean = false;
  maxdate: any;
  lengthseller: any;
  sellernows: boolean = false;
  sum: any;
  checker: any;
  p:any=1;
s:any=1;

  invoicelist: any;
  constructor(private apiService: ApiService, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, public excelservice: ExcelService, public currency: Currency) { }
  ngOnInit() {
    this.apiService.getProgramLenderList().subscribe(res => this.LenderList = res.result);
    this.invoiceDate = window.localStorage.getItem("invoicefromdate");
    this.invoiceendDate = window.localStorage.getItem("invoicetodate");
    this.invoiceFlag = "1";
    this.lenderId = "0";
    this.sum = 0;
    this.maxdate = moment().format('YYYY-MM')
    this.checker = window.localStorage.getItem("dash");
    if (this.checker == "retailer") {
      this.retailernow = true;
      this.invoicedetails()
    }
    else {
      this.sellernows = true;
      this.sellerinvoicedetails(); }
    }
   
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  invoicedetails() {
    this.sum = 0;
    if (this.lenderId == 0) {
      const data =
      {
        "date": this.invoiceDate,
        "dateend": this.invoiceendDate,
        "flag": "3",
        "brand": window.localStorage.getItem("brandid"),
        "lender": "0"


      }
      this.apiService.getRetailerInvoiceDetails(data).subscribe(data => {
        if (data.status == 200) {

          this.invoicelist = data.result;
          this.lengths = this.invoicelist.length;
          for (this.i = 0; this.i < this.invoicelist.length; this.i++) {
            this.sum = Number(this.sum) + Number(this.invoicelist[this.i].disbursedAmount);
          }
        }

      });
    }
    else {
      const data =
      {
        "date": this.invoiceDate,
        "dateend": this.invoiceendDate,
        "flag": "3",
        "brand": window.localStorage.getItem("brandid"),

        "lender": this.lenderId
      }

      this.apiService.getRetailerInvoiceDetails(data).subscribe(data => {
        if (data.status == 200) {
          this.invoicelist = data.result;
          this.lengths = this.invoicelist.length;
          for (this.i = 0; this.i < this.invoicelist.length; this.i++) {
            this.sum = Number(this.sum) + Number(this.invoicelist[this.i].disbursedAmount);
          }
        }
      });
    }}
  
  sellerinvoicedetails() {
    this.sum = 0;
    const data =
    {
      "date": this.invoiceDate,
      "dateend": this.invoiceendDate,
      "flag": "2",
      "brand": "",

      "orgName": window.localStorage.getItem("orgName")
    }
    this.apiService.getRetailerInvoiceDetails(data).subscribe(data => {
      if (data.status == 200) {
        this.invoicelist = data.result;
        this.lengths = this.invoicelist.length;
        for (this.i = 0; this.i < this.invoicelist.length; this.i++) {
          this.sum = Number(this.sum) + Number(this.invoicelist[this.i].disbursedAmount);
        }
      }});
  }
  exportExcels() {
    var list = [];
    var j = 1;
    for (let i of this.invoicelist) {
      const listObj = {
        Sno: j++,
        'Lender': i.lenderName,
        'Program': i.programName,
        'Borrower': i.borrowerName,
        'Anchor Ref No': i.anchorRefNo,

        'Loan Request Id': i.loanRequestId,
        'Loan Disbursement Id': i.loanDisbursalId,
        'Invoice No': i.invoiceNo,
        'Invoice Date': i.invoiceDate,
        'Invoice Amount': i.invoiceAmount,
        'Disbursement Amount': i.disbursedAmount,
        'Disbursement Date': i.disbursedDate,
        'Credit Period': i.creditPeriod,
        'Maturity Date': i.maturityDate,
        'Bene Name': i.beneName,
        'Bene Account': i.beneAccount,
        'IFSC Code': i.ifscCode
}
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'Retailer_Disbursement_List');
  }
  exportExcel() {
    var list = [];
    var j = 1;
    for (let i of this.invoicelist) {
      const listObj = {
        Sno: j++,
        'Lender': i.lenderName,
        'Program': i.programName,
        'Borrower': i.borrowerName,
        'Anchor Ref No': i.anchorRefNo,

        'Loan Request Id': i.loanRequestId,
        'Loan Disbursement Id': i.loanDisbursalId,
        'Invoice No': i.invoiceNo,
        'Invoice Date': i.invoiceDate,
        'Invoice Amount': i.invoiceAmount,
        'Disbursement Amount': i.disbursedAmount,
        'Disbursement Date': i.disbursedDate,
        'Credit Period': i.creditPeriod,
        'Maturity Date': i.maturityDate,
        'Bene Name': i.beneName,
        'Bene Account': i.beneAccount,
        'IFSC Code': i.ifscCode

      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'Seller_Disbursement_List');
  }
  gotoList() {
    this.router.navigate(['internaldashboard/dashboard1']);}
  
  gotomain() {
    this.router.navigate(['internaldashboard/subdashboard1']);}
  
}


