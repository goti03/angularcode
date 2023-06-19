import { Component, OnInit } from '@angular/core';
import { ApiService } from "..//..//core/api.service";
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { HeatMapCellComponent } from '@swimlane/ngx-charts';
import { ExcelService } from '../../shared/excel.service';
import { Currency } from '../../shared/currency.service';
import { Crypto } from '../../shared/crypto.service';
import { FormControl } from '@angular/forms';
import { lender } from '../../../environments/environment';
import { lenderconfiguration } from '../../../environments/lender.config';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';
import { distanceInWords, isThisISOWeek } from 'date-fns';


@Component({
  selector: 'app-overagereport',
  templateUrl: './overagereport.component.html',
  styleUrls: ['./overagereport.component.css']
})
export class OveragereportComponent implements OnInit {

  overageList: any;
  userId: any;
  p: any = 1;
  s: any;
  p1: any;
  overdueStatus: any;
  lenderIdp: any;
  overageList1: Array<any> = [];
  Type: any;
  overageListborrower: Array<any> = [];
  nextAvailable: any;
  a: any;
  overageListlender: Array<any> = [];
  roleId: any;
  types: any;
  totalpage:any;
  customerName: any;
  hide: boolean = false;
  CompanyName: any;
  constructor(private apiService: ApiService, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, public excelservice: ExcelService, public currency: Currency, private set: breadcrumbMessage, private crypto: Crypto) {
  }


  ngOnInit() {
this.a = 0;
    this.p1 = 10;
    this.totalpage=1;
    this.overdueStatus = 'all';
    this.CompanyName = "";
    this.customerName = "";
    //this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.lenderIdp = Number(this.crypto.decryt(window.localStorage.getItem('lenderId')));
    console.log("this.lenderIdp::::" + this.lenderIdp);
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    if (this.roleId != 1) {
      if (this.lenderIdp == 0) {
        this.types = 2;
        this.hide = true;
      } else {
      this.types = 1;
        this.hide = true;
      }
    } else {
      this.hide = false;
    }
  }
  borrowerreport(val) {
    this.customerName = "";
    this.p = (val == 0) ? this.p : 1;
    const data = {
      customerName: "",
      islender: '2',
      pageNoRequested: (this.p == null || this.p == undefined) ? 1 : Number(this.p),
      overDue: this.overdueStatus,
      companyName: "",
      fileType:0,
      lenderId:this.lenderIdp
    }
    this.apiService.getoveragereport(data).subscribe(data => {
      if (data.status == 200) {
        this.overageListborrower = data.result.agingdetailslist;
        // console.log("the overage list length is ==" + this.overageList.length)
        this.overageList1 = this.overageListborrower;
        this.Type = "Borrower";
      }
    });

  }
  exceld() {
  
    const data = {
      customerName: "",
      islender: 1,
      overDue: this.overdueStatus,
      companyName: "",
      filetype:1,
    lenderId:this.lenderIdp
    }
    this.apiService.getoveragereport(data).subscribe(data => {
      if (data.status == 200) {
      var url2=data.result.s3url;
      setTimeout(() => (window.open(url2, '_blank')), 1000);
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });
  }

  lenderreport(val) {
    // this.customerName = "";
    this.p = (val == 0) ? this.p : 1;
    const data = {
      customerName: "",
      islender: '1',
      overDue: this.overdueStatus,
      companyName:"",
      pageNoRequested: (this.p == null || this.p == undefined) ? 1 : Number(this.p),
      filetype:0,
    lenderId:this.lenderIdp
   }
    this.apiService.getoveragereport(data).subscribe(dataone => {
      if (dataone.status == 200) {
        this.overageListlender = dataone.result.agingdetailslist;
        // console.log("the overage list length is ==" + this.overageList.length)
        this.overageList1 = this.overageListlender;
        this.Type = "Lender";
      }
    });
  }
  nextButton() {
    console.log("this.requestList::" + this.overageList1.length);
    console.log("this.p::" + this.p);
    if (this.overageList1.length == 10) {
      this.p = Number(this.p) + 1;
      if (this.types == '1') {
        this.lenderreport(0);
      } else {
        this.borrowerreport(0);
      }
      // this.Submit(0);
    }
  }
  previousButton() {
    if (this.p != 1) {
      this.p = Number(this.p) - 1;
      if (this.types == '1') {
        this.lenderreport(0);
      } else {
        this.borrowerreport(0);
      }
    }
  }

  exportExcel() {
    var list = [];
    var j = 1;
    for (let c of this.overageList1) {
      const listObj = {
        Sno: j++,
        'Anchor': c.anchorName,
        'Program': c.programName,
        'Customer Name': c.customerName,
        'Company Name': c.companyName,
        'LOS ID': c.losId,
        'Lan No': c.lanNo,
        'Pan No': c.panNo,
        'CRN No': c.crnNo,
        'Mobile No': c.mobileNo,
        'Lender Name': c.lenderName,
        'Limit Amount': c.limitAmount,
        'Utilization': c.utilization,
        'Limit End date': c.limitEndDate,
        'Borrower ROI': c.borrowerRoi,
        'Contract Tenure': c.contractTenure,
        'Max Outstanding Amount': c.outstandingAmountMax,
        'Max Outstanding Interest': c.outstandingInterestMax,
        'Max Outstanding Charges': c.outstandingChargesMax,
        'Maximum Days': c.ageMax,
        'Outstanding Amount(DPD<10)': c.outstandingAmountTen,
        'Outstanding Interest(DPD<10)': c.outstandingInterestTen,
        'Outstanding Charges(DPD<10)': c.outstandingChargesMax,
        'Days(DPD<10)': c.ageTen,
        'Outstanding Amount(11<DPD<20)': c.outstandingAmountTwenty,
        'Outstanding Interest(11<DPD<20)': c.outstandingInterestTwenty,
        'Outstanding Charges(11<DPD<20)': c.outstandingChargesTwenty,
        'Days(11<DPD<20)': c.ageTwenty,
        'Outstanding Amount(21<DPD<30)': c.outstandingAmountThirty,
        'Outstanding Interest(21<DPD<30)': c.outstandingInterestThirty,
        'Outstanding Charges(21<DPD<30)': c.outstandingChargesThirty,
        'Days(21<DPD<30)': c.ageThirty,
        'Outstanding Amount(31<DPD<60)': c.outstandingAmountSixty,
        'Outstanding Interest(31<DPD<60)': c.outstandingInterestSixty,
        'Outstanding Charges(31<DPD<60)': c.outstandingChargesSixty,
        'Days(31<DPD<60)': c.ageSixty,
        'Outstanding Amount(61<DPD<90)': c.outstandingAmountNinety,
        'Outstanding Interest(61<DPD<90)': c.outstandingInterestNinety,
        'Outstanding Charges(61<DPD<90)': c.outstandingChargesNinety,
        'Days(61<DPD<90)': c.ageNinety,
        'Outstanding Amount(DPD>90)': c.outstandingAmountNinetyOne,
        'Outstanding Interest(DPD>90)': c.outstandingInterestNinetyOne,
        'Outstanding Charges(DPD>90)': c.outstandingChargesNinetyOne,
        'Days(DPD>90)': c.ageNinetyOne,
        'Outstanding Amount(DPD>120)': c.outstandingAmountOneTwenty,
        'Outstanding Interest(DPD>120)': c.outstandingInterestOneTwenty,
        'Outstanding Charges(DPD>120)': c.outstandingChargesOneTwenty,
        'Days(DPD>120)': c.ageOneTwenty,
        'Repayment Mode': c.repaymentMode,
        'Customer Bank': c.customerBankName,
        'IFSC Code': c.ifscCode
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'Ageing_Report_List');
  }

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  reset() {
    this.customerName = "",
      this.CompanyName = ""
  }
  Submit(val) {
    this.p = (val == 0) ? this.p : 1;
    const data = {
      customerName: this.customerName, 
      islender: "1",
      overDue: this.overdueStatus,
      companyName: this.CompanyName,
      pageNoRequested: (this.p == null || this.p == undefined) ? 1 : Number(this.p),
      filetype:0,
      lenderId:this.lenderIdp

    }
    console.log("companyName::::" + this.CompanyName);
    this.apiService.getoveragereport(data).subscribe(dataone => {
      if (dataone.status == 200) {
        this.overageListlender = dataone.result.agingdetailslist;
        this.totalpage=dataone.result.totalPageCode;
        this.overageList1 = this.overageListlender; }
    });
  }
}

