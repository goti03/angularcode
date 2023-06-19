import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { Currency } from '../../shared/currency.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PdfService } from '../../shared/pdf.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from './../../shared/excel.service';
import { Crypto } from '../../shared/crypto.service';
import { startWith } from 'rxjs/operators/startWith';
import * as moment from 'moment/moment.js';
import { map } from 'rxjs/operators/map';

import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment.jana.prod';
import { identity, Observable } from 'rxjs';

@Component({
  selector: 'ugro-disbursal',
  templateUrl: './ugro-disbursal.component.html',
  styleUrls: ['./ugro-disbursal.component.css']
})
export class UgroDisbursalComponent implements OnInit {
  allLenderList: any;
  lenderCtrl: FormControl;
  filteredLender: Observable<any[]>;
  nonStopFlag: any;
  lenderIds:any;
  disbursalDate = '';
  disbursementDate: any;
  
  anchorId:any;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  disbursementtoDate: any;
  anchore:any;
  maxDate: any;
  minDate: any;
  lenderIdp:any;
  updatedate: string;
  allAnchorList: any;
  acnhore:any;
  anchorCtrl: FormControl;
  filteredanchor: Observable<any[]>;
  currentDate:any;
  lenders: string;
  anchorName: string;
  disbursalDateUpdate = false;

  constructor(public apiService: ApiService, private set: breadcrumbMessage, private crypto: Crypto,
    public currency: Currency, private modalService: NgbModal, public pdfservice: PdfService, private excelService: ExcelService, private route: ActivatedRoute,
    private router: Router) {
      this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
      this.lenderIdp = this.crypto.decryt(window.localStorage.getItem("lenderId"));
      this.lenderId = this.crypto.decryt(window.localStorage.getItem("lenderId"));

    this.lenderCtrl = new FormControl();
    this.anchorCtrl = new FormControl();
    this.apiService.getUserLenderList().subscribe(data => {
      if (data.status == 200) {
        this.allLenderList = data.result;
        console.log(data.result);
        for (let c of this.allLenderList) {
          c.lenderInfo = c.lenderName
        }
        this.filteredLender = this.lenderCtrl.valueChanges
          .pipe(startWith(''),
            map(list1 => list1 ? this.lenderlist(list1) : this.allLenderList.slice())
          );
      }
    }, error => console.log(error));
    this.apiService.getAllBrandList().subscribe(data => {
      if (data.status == 200) {
        this.allAnchorList = data.result;
        console.log(data.result);
        for (let c of this.allAnchorList) {
          c.anchorInfo = c.orgName;
        }
        this.filteredanchor = this.anchorCtrl.valueChanges
          .pipe(startWith(''),
            map(list1 => list1 ? this.anchorlist(list1) : this.allAnchorList.slice())
          );
        console.log("this.filteredanchor::" + JSON.stringify(this.filteredanchor));
      }
    }, error => console.log(error));

  }
  preventTyping() {
    return false;
  }

  lenderlist(name: string) {
    return this.allLenderList.filter(list =>
      list.lenderInfo.toLowerCase().includes(name.toLowerCase()));
  }
  anchorlist(name: string) {
    return this.allAnchorList.filter(list1 =>
      list1.anchorInfo.toLowerCase().includes(name.toLowerCase()));
  }
  ugroDisbursalList = [];
  ugroDisbursalList1 = [];
  loandisbursallid: Number;
  remarks = '';
  trefNo = '';
  filterStates: any;
  status = 0;
  readRole:boolean;
  closeResult: string;
  message: any;
  searchReportList;
  p1: any;
  page: any;
  lenderId = '0';
  roleId: any;
  todayDate: any;
  orgId: any;
  customerName: any;
  anchorRefNo: any;
  invoiceNo: any;
  statusName: any;
  utrStatus: any;
  p: any = 1;
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  setSearchList() {
    window.localStorage.setItem('searchReportList', this.searchReportList);
  }
  ngOnInit() {
 this.readRole=false;
    this.p1 = 10;
    this.disbursalDateUpdate = false;

    // this.p = 1;
    this.page = 0;
    this.currentDate=moment().format('YYYY-MM-DD');
    this.disbursementDate =   moment().format('YYYY-MM-DD');
    this.updatedate = moment().format('YYYY-MM-DD');
    this.disbursementtoDate =   moment().format('YYYY-MM-DD');

  
    if((this.readOnly == Number(this.roleId))||(this.anchorReadonly==Number(this.roleId))){
      this.readRole = true;
    }

    if (this.roleId == 11 || this.roleId == 8 || this.roleId == 16) {
      this.orgId = this.crypto.decryt(window.localStorage.getItem("orgId"));
    } else {
      this.orgId = 'orgId'
    }
    // this.reloadData(0);
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == null || str == undefined);
  }

  resetSearch() {
    this.lenderId = '';
    if (this.roleId == 11 || this.roleId == 8 || this.roleId == 16) {
      this.orgId = this.crypto.decryt(window.localStorage.getItem("orgId"));
    } else {
      this.orgId = 'orgId'
    }
    this.customerName = '';
    this.anchorRefNo = '';
    this.invoiceNo = '';
    this.statusName = "";
    this.anchore='';
    this.disbursementDate =  moment().format('YYYY-MM-DD');
    this.disbursementtoDate =  moment().format('YYYY-MM-DD');
    this.utrStatus = '';
    this.lenders = '';
    // this.anchorCtrl= '';
  }
  nextButton() {
    console.log("this.requestList::" + this.ugroDisbursalList.length);
    console.log("this.p::" + this.p);
    if (this.ugroDisbursalList.length == 10) {
      this.p = Number(this.p) + 1;
      this.reloadData(0);
    }
  }
  previousButton() {
    if (this.p != 1) {
      this.p = Number(this.p) - 1;
      this.reloadData(0);
    }
    this.reloadData(0);
  }

  reloadData(val) {
    this.p = (val == 0) ? this.p : 1;
    if(!this.isNullorUndefinedorEmpty(this.anchorCtrl.value)){
    for(let m of this.allAnchorList){
  if((m.orgName)==this.anchorCtrl.value){
    this.anchorId = m.orgId
    break;
  }
  }
    }
    if(!this.isNullorUndefinedorEmpty(this.lenderCtrl.value)){
    for(let m of this.allLenderList)
    {

  if((m.lenderName)==this.lenderCtrl.value)
  {
    this.lenderIds = m.lenderId
    break;
  }
  }
    }
    if (this.isNullorUndefinedorEmpty(this.lenderCtrl.value) && this.isNullorUndefinedorEmpty(this.anchorCtrl.value) && this.isNullorUndefinedorEmpty(this.utrStatus) && this.isNullorUndefinedorEmpty(this.statusName) && this.isNullorUndefinedorEmpty(this.disbursementDate) && this.isNullorUndefinedorEmpty(this.customerName) && this.isNullorUndefinedorEmpty(this.invoiceNo) && this.isNullorUndefinedorEmpty(this.anchorRefNo)) {
      this.set.setOption("Please use Filter to Search", false);
    } else {
      const data = {
        lenderId: this.isNullorUndefinedorEmpty(this.lenderCtrl.value) ? '0' : this.lenderIds,
        orgId: this.orgId,
        customerName: this.isNullorUndefinedorEmpty(this.customerName) ? '' : this.customerName,
        anchorRefNo: this.isNullorUndefinedorEmpty(this.anchorRefNo) ? '' : this.anchorRefNo,
        invoiceNo: this.isNullorUndefinedorEmpty(this.invoiceNo) ? '' : this.invoiceNo,
        startDate:this.isNullorUndefinedorEmpty(this.disbursementDate) ? '' : moment(this.disbursementDate).format('DD-MM-YYYY'),
        endDate:this.isNullorUndefinedorEmpty(this.disbursementtoDate) ? '' : moment(this.disbursementtoDate).format('DD-MM-YYYY'),
      //  disbursementDate: this.isNullorUndefinedorEmpty(this.disbursementDate) ? '' : moment(this.disbursementDate).format('DD-MM-YYYY'),
        status: this.isNullorUndefinedorEmpty(this.statusName) ? '' : this.statusName,
        utrStatus: this.isNullorUndefinedorEmpty(this.utrStatus) ? '' : this.utrStatus,
        anchorId: this.isNullorUndefinedorEmpty(this.anchorCtrl.value) ? '0' : this.anchorId,
        pageNoRequested: (this.p == null || this.p == undefined) ? 1 : Number(this.p),
        filetype:0
      }
      this.apiService.ugroDisbursalList(data).subscribe(data => {
        if (data.status == 200) {

          if (data.exceptionOccured == 'Y') {

            this.set.setOption(data.exceptionMessage, false);
          } else {
            this.ugroDisbursalList = data.result.loanDisbursalList;

            console.log("data.result::" + JSON.stringify(data.result));
          }
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));

    }
  }
  enterKey(e) {
    if (e.keyCode === 13) {
      this.reloadData(0);
    }
  }
  updateStatus(id, content) {
    this.disbursalDate = this.disbursalDateUpdate ? moment(id.requestDate, 'DD-MM-YYYY').format('YYYY-MM-DD') : '';
    this.minDate = this.disbursalDate;
    this.loandisbursallid = id;
    this.message = '';
    this.remarks = '';
    this.trefNo = '';
    this.status = 0;
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
exceld()
{if(!this.isNullorUndefinedorEmpty(this.anchorCtrl.value)){
  for(let m of this.allAnchorList){

if((m.orgName)==this.anchorCtrl.value){
  this.anchorId = m.orgId
  break;
}
}
  }
  if(!this.isNullorUndefinedorEmpty(this.lenderCtrl.value)){
  for(let m of this.allLenderList) {
if((m.lenderName)==this.lenderCtrl.value){
  this.lenderIds = m.lenderId
break;}
}
  }
  const data = {
    lenderId: this.isNullorUndefinedorEmpty(this.lenderCtrl.value) ? '0' : this.lenderIds,
    orgId: this.orgId,
    customerName: this.isNullorUndefinedorEmpty(this.customerName) ? '' : this.customerName,
    anchorRefNo: this.isNullorUndefinedorEmpty(this.anchorRefNo) ? '' : this.anchorRefNo,
    invoiceNo: this.isNullorUndefinedorEmpty(this.invoiceNo) ? '' : this.invoiceNo,
    disbursementDate: this.isNullorUndefinedorEmpty(this.disbursementDate) ? '' : moment(this.disbursementDate).format('DD-MM-YYYY'),
   
    startDate:this.isNullorUndefinedorEmpty(this.disbursementDate) ? '' : moment(this.disbursementDate).format('DD-MM-YYYY'),
    endDate:this.isNullorUndefinedorEmpty(this.disbursementtoDate) ? '' : moment(this.disbursementtoDate).format('DD-MM-YYYY'),
    status: this.isNullorUndefinedorEmpty(this.statusName) ? '' : this.statusName,
    utrStatus: this.isNullorUndefinedorEmpty(this.utrStatus) ? '' : this.utrStatus,
    anchorId: this.isNullorUndefinedorEmpty(this.anchorCtrl.value) ? '0' : this.anchorId,
 
    filetype:1
  }
  this.apiService.ugroDisbursalList(data).subscribe(data => {
    if (data.status == 200) {
      var url2=data.result.s3url;
      setTimeout(() => (window.open(url2, '_blank')), 1000);
    
    } else {
      this.set.setOption(data.exceptionMessage, false);
    }
  }, error => console.log(error));
}
  submit() {
    if ((this.remarks === '') || (this.trefNo === '')) {
      this.message = "All fields are Mandatory";
      return;
    } else {
      this.message = '';
      const data = {
        loanDisbursalId: this.loandisbursallid,
        transactionRefNo: this.trefNo,
        status: this.status,
        remarks: this.remarks,
        disbursalDate: this.disbursalDate ? this.disbursalDate : '',
      }
      this.apiService.updateDisbursalstatus(data).subscribe(data => {
        if (data.status == 200) {
          this.modalService.dismissAll();
          this.set.setOption("Status is updated", true);
          this.ngOnInit();
        }
        else {
          this.set.setOption("Status is failed to update", false);
        }
      })
    }
  }
  // filters()
  // {var b = this.filterStates
  //   var z = this.filterStatus
  //   this.ugroDisbursalList=[];
  //   if(b=='all')
  //   {
  //     this.ugroDisbursalList=this.ugroDisbursalList1
  //   }

  //   else if(b=='present')
  //   {
  //     for(let a of this.ugroDisbursalList1)
  //     {
  //       if(a.utrNo!="")
  //       {
  //         this.ugroDisbursalList.push(a)
  //         this.p=1;
  //       }
  //     }
  //   }
  //   else{
  //     for(let c of this.ugroDisbursalList1)
  //     {
  //       if(c.utrNo=="")
  //       {
  //         this.ugroDisbursalList.push(c)
  //       }
  //     }
  //   }
  // }
  // filterStatus : any = 'inprogress';
  // filter(){
  //   this.p = 1;
  //   var b = this.filterStatus;
  //   this.ugroDisbursalList = [];
  //   if(b == 'all'){
  //     this.ugroDisbursalList = this.ugroDisbursalList1;
  //   }else if(b == 'inprogress'){
  //     for(let a of this.ugroDisbursalList1){
  //       if(a.status == 'In Progress'){
  //         this.ugroDisbursalList.push(a);
  //       }
  //     }
  //   }else if(b == 'approved'){
  //     for(let a of this.ugroDisbursalList1){
  //       if(a.status == 'Approved'){
  //         this.ugroDisbursalList.push(a);
  //       }
  //     }
  //   }
  // }

  showPageIndex(pageIndex, pagesize) {
    this.page = pageIndex;
    console.log(this.page);
    if (this.page != 1) {
      this.page = (this.page - 1) * pagesize;
    }
    else {
      this.page = 0;
    }
  }

  pdf() {
    var head = ['S.no', 'Customer Name', 'Mobile Number', 'Anchor Ref No.', 'Drawdown Lan No', 'Account Name', 'Account Number', 'IFSC Code', 'Bank Name', 'Invoice No','Loan Amount','Deduction', 'Disbursal Amount', 'Total Billed Amount', 'Date of Disbursment', 'Disbursment Request Date', 'UTR Number', 'Status', 'SubStatus'];
    var j = 1;
    var title = `Disbursal_List`;
    var body = [
      head,
      ...this.ugroDisbursalList.map(d => ([j++, d.customerName, d.mobileNo, d.anchorReference, d.drawDownLanNo, d.accholderName, d.accountNo, d.ifscCode, d.bankName, d.invoiceNo,d.loanAmount,d.deduction, d.disbursementAmount, d.totalbilledamount, d.dateOfDisbursement, d.requestDate, d.utrNo, d.status, d.subStatus,]))
    ]
    this.pdfservice.pdf(body, title, 'A2');
  }

  excel() {
    var list = [];
    var j = 1;
    for (let d of this.ugroDisbursalList) {
      var obj = {
        'S.No': j++,
        'Customer Name': d.customerName,
        'Mobile Number': d.mobileNo,
        'Anchor Reference Number': d.anchorReference,
        'Drawdown Lan No': d.drawDownLanNo,
        'Account Name': d.accholderName,
        'Account Number': d.accountNo,
        'IFSC Code': d.ifscCode,
        'Bank Name': d.bankName,
        'Invoice Number': d.invoiceNo.toString(),
        'Loan Amount':d.loanAmount,
        'Deduction':d.deduction,
        'Disbursal Amount': d.disbursementAmount,
        'Total Billed Amount': d.totalBilledAmount,
        'Date of Disbursment': d.dateOfDisbursement,
        'Disbursment Request Date': d.requestDate,
        'UTR Number': d.utrNo,
        'Status': d.status,
        'SubStatus': d.subStatus,
     
      }
      list.push(obj);
    }
    this.excelService.exportAsExcelFile(list, `Disbursal_List`);
  }

  loandisbursal(id: number, loanid: number, orgId: number, retailerId: number, digital: number) {
    this.router.navigate(['report/loandisbursal'], {
      queryParams: {
        'customerId': id, 'loanId': loanid,
        'orgId': orgId, 'digital': digital, 'nonStopFlag': this.nonStopFlag
      }
    });
  }
  cancelLoanDisbrusel(a) {
    const obj = {
      userId :this.crypto.decryt(window.localStorage.getItem('userId')),
      lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
      invoiceNo : a.invoiceNo,
      loanDisbursalId : a.loanDisbursalId,
      loanRequestId : a.loanRequestId,
      userMedium : 'mobileApp'
    };
    //const token = window.localStorage.getItem('token_x');
    //console.log('token::' + token);
    this.apiService.cancelLoanDisbursalRequest(obj, this.crypto.decryt(window.localStorage.getItem("token"))).subscribe(objRes => {
      if (objRes.status == 200) {
        this.set.setOption(objRes.exceptionMessage,true);
        this.ngOnInit();
      } else {
       // this.err = true;
        this.message = objRes.exceptionMessage;
       // this.clearError();
      }
    }, error => console.log(error));
  }
}

