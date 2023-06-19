import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Currency } from '../../shared/currency.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment/moment.js';
import { ExcelService } from '../../shared/excel.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.css']
})
export class DeleteInvoiceComponent implements OnInit {
  startDate: any;
  maxdate: any;
  endDate: any;
  anchorName: any;
  customerName: any;
  panNumber: any;
  updatedate: any;
  p: any = 1;
  allAnchorList: any;
  roleId:any;
  invoiceList: any;
  search: any;
  isDisabled:boolean=false;
  orgId:any;
  orgList: any;
  invoiceNo: any;
  anchorRefNo: any;
  invoiceExcelList: any;
  constructor(private apiService: ApiService, private currency: Currency, private modalService: NgbModal,
    private excelservice:ExcelService, private set: breadcrumbMessage,private crypto: Crypto) { }
  keyPress(e) {
    if (e.keyCode === 13) {
      this.deletesearch(1);
    }
  }
  preventTyping() {
    return false;
  }
  ngOnInit() {
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.startDate = moment().format('YYYY-MM') + "-01";
    this.maxdate = moment().format('YYYY-MM') + "-01";
    this.endDate = moment().format('YYYY-MM-DD');
    this.anchorName = "";
    this.customerName = "";
    this.panNumber = "";
    // this.search="",
    this.invoiceNo = "",
      this.anchorRefNo = "",
      this.panNumber = "",
      this.orgId = "orgId",
      this.deletesearch(1);
  }
  deletesearch(type) {
    if (this.roleId == '11' || this.roleId == '8' || this.roleId == '16') {
      this.orgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
      this.isDisabled=true;
      console.log("this.orgId::"+this.orgId);
    } else {
      this.isDisabled=false;
      this.orgId = '';
    }
    this.p=(type==1)?1:this.p;

    const data = {
      "orgId": this.orgId,
      "startDate": this.startDate,
      "endDate": this.endDate,
      "anchorName": this.anchorName,
      "customerName": this.customerName,
      "panNo": this.panNumber,
      "invoiceNo": this.invoiceNo,
      "anchorRefNo": this.anchorRefNo,
      "pageNoRequested":this.p

    }
    this.apiService.getDeletedInvoiceList(data).subscribe(data => {
      if (data.status == 200) {
        this.invoiceList = data.result;
        
      }
      console.log(data.result);
    }, error => console.log(error));
  }

  anchorlist(name: string) {
    return this.allAnchorList.filter(list =>
      list.anchorInfo.toLowerCase().includes(name.toLowerCase()));
  }
  nextButton() {
    if (this.invoiceList.length ==10) {
      this.p = Number(this.p) + 1;
      this.deletesearch(0);
    }
  }
  previousButton() {
    if (this.p != 1) {
      this.p = Number(this.p) - 1;
      this.deletesearch(0);
    }
  }
  resetSearch(){

    this.customerName = '';
    this.invoiceNo = '';
    this.anchorRefNo = '';
    this.panNumber='';
    this.anchorName='';
    this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
    this.deletesearch(1);

  }

  excelDownload() {
    const obj = {
      customerName: this.customerName,
      invoiceNo: this.invoiceNo,
      anchorName: this.anchorName,
      anchorRefNo: this.anchorRefNo,
      startDate: this.startDate,
      endDate: this.endDate,
      orgId: this.orgId,
      panNo: this.panNumber,
      pageNoRequested: 1,
      downloadExcel: ""

    }

    this.apiService.getDeletedInvoiceList(obj).subscribe(objRes => {
      if (objRes.status == 200) {
        this.invoiceExcelList = objRes.result;

        this.exportExcel();


      }
    }, error => console.log(error));
  }

  exportExcel() {
    var list = [];
    var j = 1;
    for (let i of this.invoiceExcelList) {
      const listObj = {
        Sno: j++,
        'Anchor Name': i.anchorName,
        'Anchor Ref Id': i.anchorRefNo,
        'Customer Name': i.customerName,
        'Customer Pan': i.customerPan,
        'Invoice No': i.invoiceNo,
        'Invoice Amt': i.invoiceAmount,
        'Invoice Date': i.invoiceDate,
        'Remarks': i.remarks,
        'DeletedBy': i.deletedBy,
        'Deleted Date': i.deletedDate,
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'Deleted_Invoice_List');
  }
}


