import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Currency } from '../../shared/currency.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment/moment.js';
import { PdfService } from '../../shared/pdf.service';
import { ExcelService } from './../../shared/excel.service';
import { Crypto } from '../../shared/crypto.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-cancellation-invoice',
  templateUrl: './cancellation-invoice.component.html',
  styleUrls: ['./cancellation-invoice.component.css']
})
export class CancellationInvoiceComponent implements OnInit {

  invoiceList = [];
  p: any = 1;
  p1: any;
  page: any;
  customerName: any;
  searchList: any;
  anchorsearch:boolean=false;
  inv: any = {};
  ldiId: any;
  remark: any;
  userId: any;
  invoiceNo: any;
  remarkErr: boolean = false;
anchorId:any;
  closeResult: string;
  editIndex: any;

  editDate: any;
  message: any;
  todayDate: any;
  maxDate: any;
  roleId: any;
  orgId: any;
m:any;
  startDate: any;
  endDate: any;

  default: any;
  orgList: any;

  allAnchorList: any;
  anchorCtrl: FormControl;
  filteredanchor: Observable<any[]>;
  anchorRefNo: any;
  showAnger: boolean;
  invoicestatus: any;
  invoiceExcelList: any;
  anchors:any;
  isDisabled:boolean=false;
  constructor(private apiService: ApiService, private currency: Currency, private modalService: NgbModal, private set: breadcrumbMessage,
    public pdfservice: PdfService, private excelService: ExcelService, private crypto: Crypto) {
    this.anchorCtrl = new FormControl();
    this.apiService.getAllBrandList().subscribe(data => {
      if (data.status == 200) {
        this.allAnchorList = data.result;
        console.log(data.result);
        for (let c of this.allAnchorList) {
          c.anchorInfo = c.orgName 
          c.anchorId = c.orgId
        }
        this.filteredanchor = this.anchorCtrl.valueChanges
          .pipe(startWith(''),
            map(list1 => list1 ? this.anchorlist(list1) : this.allAnchorList.slice())
          );
        console.log("this.filteredanchor::" + JSON.stringify(this.filteredanchor));
      }
    }, error => console.log(error));
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
  anchorlist(name: string) {
    return this.allAnchorList.filter(list =>
      list.anchorInfo.toLowerCase().includes(name.toLowerCase()));
  }
  preventTyping() {
    return false;
  }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.todayDate = moment().format('YYYY-MM-DD');
    this.editDate = moment(this.editDate).format('DD-MM-YYYY');
    this.maxDate = moment().subtract(1, 'year').format('YYYY-MM-DD');
    this.remark = "";
    this.ldiId = "";
    this.anchorRefNo = "";
    this.customerName = "";
    this.invoiceNo = "";
    this.p1 = 20;
    this.page = 0;
    this.invoicestatus = '';
    // this.status = '';
    console.log("this.roleId::"+this.roleId);
    if (this.roleId == '11' || this.roleId == '8' || this.roleId == '16') {
      this.orgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
      this.isDisabled=true;
      this.anchorsearch=false;
      console.log("this.orgId::"+this.orgId);
    } else {
      this.isDisabled=false;
      this.anchorsearch=true;
      this.orgId = 'orgId';
    }
    this.default = '';
    this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
    this.apiService.getAllBrandList().subscribe(objRes => {
      if (objRes.status == 200) {
        this.orgList = objRes.result;
        
      } else {
        this.set.setOption(objRes.exceptionMessage, false);
      }
    }, error => console.log(error));
    this.searchListfun();

  }
  enterKey(e) {
    if (e.keyCode === 13) {
      this.searchListfun();

    }
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  resetSearch() {
    this.customerName = '';
    this.invoiceNo = '';
    this.anchorRefNo = '';
    this.anchors='';
    this.invoicestatus = '';
    this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD'); 
    this.searchListfun();
  }

  nextButton() {
    console.log("this.requestList::" + this.invoiceList.length);
    console.log("this.p::" + this.p);
    if (this.invoiceList.length == 10) {
      this.p = Number(this.p) + 1;
      this.searchListfun();
    }
  }
  previousButton() {
    if (this.p != 1) {
      this.p = Number(this.p) - 1;
      this.searchListfun();
    }
    this.invoicestatus = '';
    this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
    this.searchListfun();
  }
  searchListfun() {
    console.log("i am called")
    for(let m of this.allAnchorList)
    {
if(!this.isNullorUndefinedorEmpty(this.anchorCtrl.value))
{
  if((m.orgName)==this.anchorCtrl.value)
  {
    this.anchorId = m.orgId
  }
}
    }

    
    // this.orgId = this.isNullorUndefinedorEmpty(this.anchorCtrl.value) ? '' : this.anchorCtrl.value.split("-")[1];
    const obj = {
      orgId: this.isNullorUndefinedorEmpty(this.anchorCtrl.value) ? this.orgId : this.anchorId,
      startDate: this.startDate,
      endDate: this.endDate,
      customerName: this.customerName,
      invoiceNo: this.invoiceNo,
      anchorRefNo: this.anchorRefNo,
      invoicestatus: this.invoicestatus,
      pageNoRequested: (this.p == null || this.p == undefined) ? 1 : Number(this.p)
    };
    this.apiService.invoiceList(obj).subscribe(objRes => {
      if (objRes.status == 200) {
        this.invoiceList = objRes.result.list;
        this.apiList = this.invoiceList;
        
      } else {
        this.set.setOption(objRes.exceptionMessage, false);
      }
    }, error => console.log(error));
  }

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number)
  }

  del(ldiId, id, content) {
    this.invoiceNo = id;
    this.ldiId = ldiId;
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete() {
    if (this.remark) {
      this.remarkErr = false;
      const data = {
        userId: this.userId,
        ldiId: this.ldiId,
        remarks: this.remark,
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      this.apiService.deleteInvoice(data).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Invoice data deleted Successfully", true);
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.set.setOption("failed to delete Invoice data", false);
          this.modalService.dismissAll();
        }
        console.log(data.result);
      }, error => console.log(error));
    } else {
      this.remarkErr = true;
      return;
    }
  }

  edit(content, a) {
    this.inv = a;
    // this.editIndex = a;
    var b = a.invoiceDate;
    this.editDate = new Date(Number(b.substring(6, 10)), Number(b.substring(3, 5)) - 1, Number(b.substring(0, 2)));
    this.editDate = moment(this.editDate).format('YYYY-MM-DD');
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  saveinvoice() {
    // if (this.inv.anchorRefId == '' || this.inv.anchorRefId == null) {
    //   this.remarkErr = true;
    //   this.message = 'Enter Anchor reference number';
    //   return;
    // } else 
    if (this.inv.invoiceNo == '' || this.inv.invoiceNo == null) {
      this.remarkErr = true;
      this.message = 'Enter  Invoice number';
      return;
    } else if (this.editDate == '' || this.editDate == null) {
      this.remarkErr = true;
      this.message = 'Enter  Invoice Date';
      return;
    } else if (this.inv.invoiceAmount == '' || this.inv.invoiceAmount == null) {
      this.remarkErr = true;
      this.message = 'Enter  Invoice Amount';
      return;
    }
    this.remarkErr = false;
    this.editDate = moment(this.editDate).format('DD-MM-YYYY');
    const obj = {
      anchorRefNo: this.inv.anchorRefId,
      invoiceNo: this.inv.invoiceNo,
      invoiceDate: this.editDate,
      invoiceAmount: this.inv.invoiceAmount,
      ldiId: this.inv.ldiId,
      id: this.inv.id
    }
    console.log(obj);
    this.apiService.invoiceUpdate(obj).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'N') {
          this.set.setOption(data.result, true);
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false);
          this.ngOnInit();
        }
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    }, error => console.log(error));
    this.modalService.dismissAll();
  }
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
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  apiList: any;


  pdf() {
    var head = ['S.no', 'Brand Name', 'Distributor', 'Customer Name', 'Anchor Reference Number', 'Invoice Number', 'Invoice Date', 'Invoice Amount', 'Invoice Status', 'Created By', 'Created On'];
    var j = 1;
    var title = `Invoice_List_${moment(this.startDate).format('DD-MM-YYYY')}_to_${moment(this.endDate).format('DD-MM-YYYY')}`;
    var body = [
      head,
      ...this.invoiceExcelList.map(d => ([j++, d.brandName, d.distributorName, d.customerName, d.anchorRefId, d.invoiceNo, d.invoiceDate, d.invoiceAmount, d.invoiceStatus, d.createdBy, d.createdOn]))
    ]
    this.pdfservice.pdf(body, title, 'A2');
  }

  excelDownload(type:any){
  const obj = {
    orgId: this.isNullorUndefinedorEmpty(this.anchorCtrl.value) ? this.orgId : this.anchorId,
    customerName:  this.customerName,
    invoiceNo: this.invoiceNo,
    anchorRefNo: this.anchorRefNo,
    invoicestatus: this.invoicestatus,
    startDate: this.startDate,
    endDate: this.endDate,

    pageNoRequested:1,
    downloadExcel:""
  
  }
  
  this.apiService.invoiceList(obj).subscribe(objRes => {
    if (objRes.status == 200) {
      this.invoiceExcelList = objRes.result.list;
      if(type==1){
        this.exportExcel();
      }else{
        this.pdf();
      }
     
    }
  }, error => console.log(error));
  }


  exportExcel() {
    var list = [];
    var j = 1;
    // this.apiService.invoiceList(obj).subscribe(objRes => {
    for (let d of this.invoiceExcelList) {
      var obj = {
        'S.No': j++,
        'Brand Name': d.brandName,
        'Distributor': d.distributorName,
        'Customer Name': d.customerName,
        'Anchor Reference Number': d.anchorRefId,
        'Invoice Number': d.invoiceNo,
        'Invoice Date': d.invoiceDate,
        'Invoice Amount': d.invoiceAmount,
        'Invoice Status': d.invoiceStatus,
        'Created By': d.createdBy,
        'Created On': d.createdOn
      }
      list.push(obj);
    }
    this.excelService.exportAsExcelFile(list, `Invoice_List`);
    
  }

  // ListSearch() {
  //   const data = {

  //     "anchorRefId": this.anchorRefId,
  //     "customerName": this.customerName,

  //   }
  //   this.apiService.invoiceList(data).subscribe(data => {
  //     if (data.status == 200) {
  //        this.invoiceList = data.result;
  //     }
  //     console.log(data.result);
  //   }, error => console.log(error));
  // }


}