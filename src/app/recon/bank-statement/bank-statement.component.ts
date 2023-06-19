import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { Currency } from '../../shared/currency.service';
import * as moment from 'moment/moment.js';
import { PdfService } from '../../shared/pdf.service';
import { ExcelService } from '../../shared/excel.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-bank-statement',
  templateUrl: './bank-statement.component.html',
  styleUrls: ['./bank-statement.component.css']
})
export class BankStatementComponent implements OnInit {

  out: any;
  filter: any = '';
  escrowbankList: any = [];

  escrowAccountNo: any;
  eaId: any = '';
  fromDate: any;
  toDate: any;
  month: any;

  today: any;
  currentMonth: any;

  searchList: any;
  p: any;

  statementList: any = [];
  availableBalance: any;
  result: any;
  aumList: Array<any> = [];
  view: boolean;
  banklistSearch: any;
  q: any;
  statementType: any;
  AUM: any;
  aumAmount: any;
  collectionLimit: any;
  fundRequest: any;
  closeResult: string;
  lenderDisbMoneyCalculation: any;
  list=[];
  lenderUntransferDetails: any;
  untransferAmount: any;
  ugroLimit: any;
  errorMsg:any;
  constructor(private apiService: ApiService, private set: breadcrumbMessage, public currency: Currency, private pdfservice: PdfService, private excelservice: ExcelService, public modalService: NgbModal) { }

  ngOnInit() {
  //  this.ugroLimit=123122.12232
    // this.ugroLimit=.toFixed(2);
    this.statementType = '0';
    this.today = moment().format('YYYY-MM-DD');
    this.currentMonth = moment().format('YYYY-MM');
    this.out = 1;
    this.view = false;
    this.apiService.getescrowaccount().subscribe(objRes => {
      if (objRes.status == 200) {
        this.output(1);
        this.escrowbankList = objRes.result;
      } else {
        this.set.setOption(objRes.exceptionMessage, false);
      }
    }, error => console.log(error));


  }
  preventTyping() {
    return false;
  }
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }

  output(a) {
    var b = 'v' + this.out;
    console.log("before:::" + b);
    var element = document.getElementById(b);
    element.classList.remove("selected");
    var c = 'v' + a;
    console.log("after:::" + c);
    var element = document.getElementById(c);
    element.classList.add("selected");
    this.out = a;
  }

  seteaId(a) {
    this.eaId = a.eaid;
    console.log(this.eaId);
  }

  setFromTo() {
    if (this.filter == '6') {
      this.fromDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
      this.toDate = moment().format('YYYY-MM-DD');
    }
  }

  submit() {
    if (this.eaId == '' || this.eaId == null) {
      this.set.setOption("Choose a Bank Account", false);
      return;
    }
    if (this.filter == '' || this.filter == null) {
      this.set.setOption("Choose any of date filter", false);
      return;
    }
    if (this.filter == 'm') {
      if (this.month == null || this.month == '') {
        this.set.setOption("Choose the month", false);
        return;
      }
      this.fromDate = moment(this.month).startOf('month').format('YYYY-MM-DD');
      this.toDate = moment(this.month).endOf('month').format('YYYY-MM-DD');
      if (!moment(this.today).isAfter(this.toDate)) {
        this.toDate = this.today;
      }
    }
    if (this.fromDate == null || this.fromDate == '') {
      this.set.setOption("Choose the From date", false);
      return;
    }
    if (this.toDate == null || this.toDate == '') {
      this.set.setOption("Choose the To date", false);
      return;
    }
    if (this.statementType == null || this.statementType == undefined) {
      this.set.setOption("Choose Statement type", false);
      return;
    }
    const obj = {
      eaid: this.eaId,
      fromDate: this.fromDate,
      toDate: this.toDate,
      statementType: this.statementType
    }
    this.apiService.getescrowaccountstatement(obj).subscribe(objRes => {
      if (objRes.status == 200) {
        this.statementList = objRes.result.accountTransaction;
        this.availableBalance = objRes.result.balance;
        this.result = objRes.result;
        if (this.out == 1) {
          this.view = true;
        } else {
          if (this.statementList.length > 0) {
            if (this.out == 2) {
              this.pdf();
            } else if (this.out == 3) {
              this.excel();
            }
          } else {
            this.set.setOption("No Data Available in the given period", false);
            return;
          }
          this.set.setOption(objRes.message, true);
        }
      } else {
        this.set.setOption(objRes.exceptionMessage, false);
      }
    }, error => console.log(error));
    console.log(this.fromDate);
    console.log(this.toDate);
  }

  rowset(a) {
    this.seteaId(a);
    this.escrowAccountNo = a.accountNo;
  }

  pdf() {
    var title = `Bank_Statement_${this.escrowAccountNo}`;
    var body = [
      ['Ref No.', 'Payment Date', 'Transaction Date', 'Narration', 'Description', 'UTR No.', 'Debit', 'Credit', 'Balance'],
      ...this.statementList.map(d => ([d.transactionRefNo, d.paymentDate, d.transactionDateTime, d.narrative, d.description, d.utrNo, d.debit, d.credit, d.runningBalance]))
    ]
    this.pdfservice.pdf(body, title, 'A3');
  }

  excel() {
    this.excelservice.exportAsExcelFile(this.statementList, `Bank_Statement_${this.escrowAccountNo}`);
  }

  viewback() {
    this.ngOnInit();
  }
  lenderDisbursal(content,lenderId) {
    this.AUM = "1";
    this.untransferAmount = "1"
    this.fundRequest="0";
    this.ugroLimit="0";
    const data = {
      lenderId: lenderId
    }
    this.apiService.lenderDisbMoneyCalc(data).subscribe(objRes => {
      if (objRes.status == 200) {
        this.list = objRes.result.list;
        if(this.list.length>0){
          this.lenderDisbMoneyCalculation = this.list[0].lenderDisbMoneyCalculation;
          this.lenderUntransferDetails = this.list[0].lenderUntransferDetails;
          if (this.AUM == "1") {
            this.aumAmount = this.lenderDisbMoneyCalculation.outstandingPrinciple;
            console.log("ammount:::+"+ this.aumAmount );
            
          }
          if (this.untransferAmount == "1") {
            this.collectionLimit= this.lenderUntransferDetails.untransferedAmountPreviousDay;
            console.log("ammount:::+"+ this.collectionLimit );
            
          }
        }else{
        this.errorMsg="";  
        }
         
      } else {
        this.set.setOption(objRes.exceptionMessage, false);
      }
    }, error => console.log(error));

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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
  aumCheck(data) {

    this.ugroLimit=0;
    this.fundRequest=0;
    if (data == "1") {
      this.aumAmount = this.lenderDisbMoneyCalculation.outstandingPrinciple;
      console.log("ammount:::+"+ this.aumAmount );
      
    } else
      if (data == "2") {
        this.aumAmount = this.lenderDisbMoneyCalculation.outstandingInterest;
     
      }else
      if (data == "3") {
        this.aumAmount = this.lenderDisbMoneyCalculation.outstandingAmount;
        
      }

  }
  dayCheck(data){
    this.ugroLimit=0;
    this.fundRequest=0;
    if (data == "1") {
      this.collectionLimit = this.lenderUntransferDetails.untransferedAmountPreviousDay;
    } else
      if (data == "2") {
        this.collectionLimit = this.lenderUntransferDetails.untransferedAmountToday;
      }else
      if (data == "3") {
        this.collectionLimit = this.lenderUntransferDetails.untransferedAmountTotal;
      }
  }
  ugroCheck(){
  this.ugroLimit= Number(this.aumAmount) +Number(this.fundRequest) -Number(this.collectionLimit);
  this.ugroLimit=this.ugroLimit.toFixed(2);
    console.log("Ugro limit:::"+ this.ugroLimit);
    
  }
   fundingCheck(){
    this.fundRequest=  Number(this.ugroLimit) +Number(this.collectionLimit)-Number(this.aumAmount);
    this.fundRequest=this.fundRequest.toFixed(2);
    console.log("Ugro limit:::"+ this.ugroLimit);
  }


}


