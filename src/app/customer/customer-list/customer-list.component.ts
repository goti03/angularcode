import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';
import * as moment from 'moment/moment.js';
import { ApiService } from "../../core/api.service";
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'

import { Currency } from '../../shared/currency.service';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { ExcelService } from '../../shared/excel.service';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  closeResult: any;

  firmName: any;
  applicantName: any;
  panNumber: any;
  mobileNo: any;
  crnsearch: any;
  appStartDate: any;
  appEndDate: any;
  orgId: any;
  customerExcelList: any
  pageNoRequested: Number;
  default: any;
  filterStatus: any;
  customerList1: any;
  orgList: any;
  customerList: any;
  crnNo: any;
  p: Number;
  allAnchorList = [];
  anchorCtrl: FormControl;
  filteredanchor: Observable<any[]>;
  dataNotAvailable: any;
  nextAvailable: any;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,
    private apiService: ApiService, private set: breadcrumbMessage, private currency: Currency, public excelservice: ExcelService,) {
    this.anchorCtrl = new FormControl();
    this.apiService.getAllBrandList().subscribe(data => {
      if (data.status == 200) {
        this.allAnchorList = data.result;
        console.log(data.result);
        for (let c of this.allAnchorList) {
          c.anchorInfo = c.orgName + " - " + c.orgId;
        }
        this.filteredanchor = this.anchorCtrl.valueChanges
          .pipe(startWith(''),
            map(list1 => list1 ? this.anchorlist(list1) : this.allAnchorList.slice())
          );
        console.log("this.filteredanchor::" + JSON.stringify(this.filteredanchor));
      }
    }, error => console.log(error));
  }
  anchorlist(name: string) {
    return this.allAnchorList.filter(list =>
      list.anchorInfo.toLowerCase().includes(name.toLowerCase()));
  }
  gotoLoanRequestList(pan:any){
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'pan':pan,'nonStopFlag':'0' }});
  }
  ngOnInit() {
    this.p = 1;
    this.default = '0';
    this.firmName = '';
    this.applicantName = '';
    this.panNumber = '';
    this.mobileNo = '';
    this.crnNo = '';
    this.appStartDate = '';

    this.appEndDate = '';
    this.orgId = '';
    this.pageNoRequested = this.p;

    const obj = {
      firmName: this.firmName,
      applicantName: this.applicantName,
      crnNo: this.crnNo,
      panNumber: this.panNumber,
      mobileNo: this.mobileNo,
      appStartDate: this.appStartDate,
      appEndDate: this.appEndDate,
      orgId: this.orgId,
      pageNoRequested: this.pageNoRequested
    }
    this.apiService.getCrnViewList(obj).subscribe(objRes => {
      if (objRes.status == 200) {
        this.customerList = objRes.result;
        this.customerList1 = this.customerList
        this.dataNotAvailable = (this.customerList.length == 0) ? true : false;
        this.nextAvailable = (this.customerList.length != 10) ? true : false;
      } else {
        this.set.setOption(objRes.exceptionMessage, false);
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

  searchbox() {
    this.p = 1;
    this.searchCustomer();
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (Number(event.key) == 13) {
      this.searchbox();
    }
  }
  excelDownload() {
    const obj = {
      firmName: this.firmName,
      applicantName: this.applicantName,
      panNumber: this.panNumber,
      mobileNo: this.mobileNo,
      appStartDate: this.appStartDate,
      appEndDate: this.appEndDate,
      orgId: this.orgId,
      pageNoRequested: 1,
      excelDownload: ""

    }

    this.apiService.getCrnViewList(obj).subscribe(objRes => {
      if (objRes.status == 200) {
        this.customerExcelList = objRes.result;
        this.exportExcel();

      }
    }, error => console.log(error));
  }
  searchCustomer() {
    this.pageNoRequested = this.p;
    this.orgId = (this.isNullorUndefinedorEmpty(this.anchorCtrl.value)) ? '' : this.anchorCtrl.value.split("-")[1];

    const obj = {
      firmName: this.firmName,
      applicantName: this.applicantName,
      panNumber: this.panNumber,
      mobileNo: this.mobileNo,
      crnNo: this.crnNo,
      appStartDate: this.appStartDate,
      appEndDate: this.appEndDate,
      orgId: this.orgId,
      pageNoRequested: this.pageNoRequested
    }
    this.customerList = [];
    this.apiService.getCrnViewList(obj).subscribe(objRes => {
      if (objRes.status == 200) {
        this.customerList = objRes.result;
        this.customerList1 = this.customerList
        this.dataNotAvailable = (this.customerList.length == 0) ? true : false;
        this.nextAvailable = (this.customerList.length != 10) ? true : false;
      } else {
        this.set.setOption(objRes.exceptionMessage, false);
      }
    }, error => console.log(error));
  }
  exportExcel() {
    // this.excelDownload();
    var list = [];
    var j = 1;
    for (let i of this.customerExcelList) {
      const listObj = {
        Sno: j++,
        'CRN': i.crn,
        'Pan Number': i.panNumber,
        'Business Name': i.businessName,
        'Avail Limit': i.availLimit,
        'Total Loan Count': i.totalLoanCount,
        'Total Live Count': i.liveLoanCount,
        'Name': i.contactName,
        'Email': i.contactEmail,
        'Phone': i.contactPhone,
        'Utilization Percent': i.utilizedPercent,
        'Utilization Value': i.utilizedLimit,
        'Overdue Amount': i.overdueAmount,
        'Finagg Vintage': i.finaggVintage,
        'Status': i.activeStatus,



      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'Customer_View_List');
  }
  indianCurrency(Amount) {
    return this.currency.indianCurrency(Amount);
  }
  filter() {
    var b = this.filterStatus
    this.customerList1 = [];


    console.log("filte is there");
    if (b == 'All') {
      this.customerList1 = this.customerList;
    }

    else if (b == 'Active') {
      console.log("active is called");
      for (let a of this.customerList) {
        if (a.activeStatus == "active") {
          this.customerList1.push(a)
          this.p = 1;
        }
      }
    }
    else if (b == 'inactive') {
      console.log("inactive is called");
      for (let c of this.customerList) {
        if (c.activeStatus == "inactive") {
          this.customerList1.push(c)
        }
      }
    }
  }

  preventTyping() {
    return false;
  }
  keyPress(event: any) {
    // alert(event);

    if (event.keyCode == 13) {
      this.searchbox();
    }
  }
  nextButton() {
    if (this.customerList.length == 10) {
      this.p = Number(this.p) + 1;
      this.searchCustomer();
    }
  }

  previousButton() {
    if (this.p != 1) {
      this.p = Number(this.p) - 1;
      this.searchCustomer();
    }
  }


}