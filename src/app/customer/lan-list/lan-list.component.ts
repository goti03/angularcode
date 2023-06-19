import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../core/api.service";
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { Currency } from '../../shared/currency.service';
import { ExcelService } from '../../shared/excel.service';
import { lenderconfiguration } from '../../../environments/lender.config';
import { lender } from '../../../environments/environment';

@Component({
  selector: 'app-lan-list',
  templateUrl: './lan-list.component.html',
  styleUrls: ['./lan-list.component.css']
})
export class LanListComponent implements OnInit {

  firmName: any;
  applicantName: any;
  panNumber: any;
  mobileNo: any;
  lanExcelList: any;
  lanList1: any;
  filterStatus: any;
  appStartDate: any;
  env: any;
  appEndDate: any;
  orgId: any;
  pageNoRequested: Number;
  lanNumber: any;
  programId: any;

  p: Number;
  programList: any;
  orgList: any;

  default: any;
  lanList: any;
  dataNotAvailable: any;
  nextAvailable: any;
  lenderIdp: any;
  allProgramList: any;
  programCtrl: FormControl;
  filteredprogram: Observable<any[]>;

  allAnchorList: any;
  anchorCtrl: FormControl;
  filteredanchor: Observable<any[]>;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private set: breadcrumbMessage, private currency: Currency, public excelservice: ExcelService) {
    this.programCtrl = new FormControl();
    this.anchorCtrl = new FormControl();
    this.lenderIdp = 0;
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

    this.apiService.getAllProgramList(0).subscribe(data => {
      if (data.status == 200) {
        this.allProgramList = data.result;
        const l = {
          programName: 'No Program',
          programId: '0'
        }
        this.allProgramList.splice(0, 0, l);
        console.log(data.result);
        for (let c of this.allProgramList) {
          c.programInfo = c.programName + " - " + c.programId;
        }
        this.filteredprogram = this.programCtrl.valueChanges
          .pipe(startWith(''),
            map(list2 => list2 ? this.programlist(list2) : this.allProgramList.slice())
          );
        console.log("this.filteredCustomer::" + JSON.stringify(this.filteredprogram));
        // console.log("this.this.allProgramList::"+JSON.stringify(this.allProgramList));
      }
    }, error => console.log(error));
  }

  programlist(name: string) {
    return this.allProgramList.filter(list =>
      list.programInfo.toLowerCase().includes(name.toLowerCase()));
  }
  anchorlist(name: string) {
    return this.allAnchorList.filter(list =>
      list.anchorInfo.toLowerCase().includes(name.toLowerCase()));
  }
  preventTyping() {
    return false;
  }
  ngOnInit() {
    this.default = '0';
    this.p = 1;
    this.firmName = '';
    this.applicantName = '';
    this.panNumber = '';
    this.mobileNo = '';
    this.appStartDate = '';
    this.appEndDate = '';
    this.orgId = '';
    this.pageNoRequested = 1;
    this.env = lenderconfiguration.env;
    this.lanNumber = '';
    this.programId = '';

    const obj = {
      firmName: this.firmName,
      applicantName: this.applicantName,
      panNumber: this.panNumber,
      mobileNo: this.mobileNo,
      programId: this.programId,
      lanNumber: this.lanNumber,
      appStartDate: this.appStartDate,
      appEndDate: this.appEndDate,
      orgId: this.orgId,
      pageNoRequested: this.pageNoRequested
    }
    this.apiService.getLanViewList(obj).subscribe(objRes => {
      if (objRes.status == 200) {
        this.lanList = objRes.result;
        this.lanList1 = this.lanList;
        this.dataNotAvailable = (this.lanList.length == 0) ? true : false;
        this.nextAvailable = (this.lanList.length != 10) ? true : false;
      } else {
        this.set.setOption(objRes.exceptionMessage, false);

      }
    }, error => console.log(error));
  }
  gotoLoanRequestList(pan: any) {
    this.router.navigate(['/report/loanRequestList'], { queryParams: { 'pan': pan, 'nonStopFlag': '0' } });
  }
  gotoLoanRequestListlanid(lan: any) {
    this.router.navigate(['/report/loanRequestList'], { queryParams: { 'lan': lan, 'nonStopFlag': '0' } });
  }
  searchbox() {
    this.p = 1;
    this.searchLan();
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == 'null' || str == '' || str == '0' || str == null || str == undefined);
  }
  searchLan() {
    console.log("this.programCtrl.value::" + this.programCtrl.value);
    console.log("this.anchorCtrl.value::" + this.anchorCtrl.value);
    this.programId = (this.isNullorUndefinedorEmpty(this.programCtrl.value)) ? '' : this.programCtrl.value.split("-")[1];
    this.orgId = (this.isNullorUndefinedorEmpty(this.anchorCtrl.value)) ? '' : this.anchorCtrl.value.split("-")[1];
    this.pageNoRequested = this.p;
    const obj = {
      firmName: this.firmName,
      applicantName: this.applicantName,
      panNumber: this.panNumber,
      mobileNo: this.mobileNo,
      programId: this.programId,
      lanNumber: this.lanNumber,
      appStartDate: this.appStartDate,
      appEndDate: this.appEndDate,
      orgId: this.orgId,
      pageNoRequested: this.pageNoRequested
    }
    this.apiService.getLanViewList(obj).subscribe(objRes => {
      if (objRes.status == 200) {
        this.lanList = objRes.result;
        this.lanList1 = this.lanList
        this.dataNotAvailable = (this.lanList.length == 0) ? true : false;
        this.nextAvailable = (this.lanList.length != 10) ? true : false;
      } else {
        this.set.setOption(objRes.exceptionMessage, false);
      }
    }, error => console.log(error));
  }
  excelDownload() {
    const obj = {
      firmName: this.firmName,
      applicantName: this.applicantName,
      panNumber: this.panNumber,
      mobileNo: this.mobileNo,
      programId: this.programId,
      lanNumber: this.lanNumber,
      appStartDate: this.appStartDate,
      appEndDate: this.appEndDate,
      orgId: this.orgId,
      pageNoRequested: 1,
      excelDownload: ""
    }
    this.apiService.getLanViewList(obj).subscribe(objRes => {
      if (objRes.status == 200) {
        this.lanExcelList = objRes.result;
        this.exportExcel();

      }
    });
  }
  filter() {
    var b = this.filterStatus
    this.lanList1 = [];


    console.log("filte is there");
    if (b == 'All') {
      this.lanList1 = this.lanList;
    }

    else if (b == 'Active') {
      console.log("active is called");
      for (let a of this.lanList) {
        if (a.activeStatus == "active") {
          this.lanList1.push(a)
          this.p = 1;
        }
      }
    }
    else if (b == 'inactive') {
      console.log("inactive is called");
      for (let c of this.lanList) {
        if (c.activeStatus == "inactive") {
          this.lanList1.push(c)
        }
      }
    }
  }
  indianCurrency(Amount) {
    return this.currency.indianCurrency(Amount);
  }
  exportExcel() {

    var list = [];
    var j = 1;
    for (let i of this.lanList1) {
      if(this.env!='Jana')
      {
      const listObj = {
        Sno: j++,
        'Pan Number': i.panNumber,
        'Lan Id': i.lanId,
        'Business Name': i.businessName,
        'Program': i.program,
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
      else {
        const listObj = {
          Sno: j++,
          'Pan Number': i.panNumber,
          'Lrn Id': i.lanId,
          'Business Name': i.businessName,
          'Program': i.program,
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

    }
    if (this.env != 'Jana') {
      this.excelservice.exportAsExcelFile(list, 'Lan_View_List');
    }
    else {
      this.excelservice.exportAsExcelFile(list, 'Lrn_View_List');
    }
    if (this.env != 'Jana') {
      this.excelservice.exportAsExcelFile(list, 'Lan_View_List');
    }
    else {
      this.excelservice.exportAsExcelFile(list, 'Lrn_View_List');
    }
  }
  nextButton() {
    if (this.lanList.length == 10) {
      this.p = Number(this.p) + 1;
      this.searchLan();
    }
  }
  keyPress(event: any) {
    // alert(event);

    if (event.keyCode == 13) {
      this.searchbox();
    }
  }
  previousButton() {
    if (this.p != 1) {
      this.p = Number(this.p) - 1;
      this.searchLan();
    }
  }

}
