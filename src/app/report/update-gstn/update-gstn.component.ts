import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from "..//..//core/api.service";
import { numberFormat } from 'highcharts';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-update-gstn',
  templateUrl: './update-gstn.component.html',
  styleUrls: ['./update-gstn.component.css']
})

export class UpdateGSTn implements OnInit {

  id: any;
  loanid: any;
  orgId: any;
  retailerId: any;
  filenetList = [];
  oldgstnList = [];
  checklistStatus = false;
  UploadedDocuments: any;
  HeaderDetails: any;
  roleId: any;
  docLength: any;
  gstnList = [];
  gstndisplay = [];
  curDate: any;

  noprocessing = ['2020-03', '2020-04', '2020-05'];

  purchasetotal: any;

  yearonepurchase: number = 0;
  average: any;

  yearonesale: number = 0;
  yearoneprosale: number = 0;
  yearonepropurchase: any;
  yearoneproprofit: any;
  yeartwosale: number = 0;
  yeartwopurchase: number = 0;
  yeartwoprofit: any;
  yeartwoprosale: number = 0;
  yeartwopropurchase: any;
  yeartwoproprofit: any;
  turnoverdip: number;
  profitdip: number;
  fortypercent_average: any;
  finalList = [];
  temp1: number;
  temp2: any;
  temp3: any;
  temp4: any;
  temp5: any;
  temp6: any;
  newtemp: any;
  newtemp2: any;
  sixmonthsale: number = 0;
  errorMSG: boolean = false;

  infinityFlag = false;

  limitdata = [];
  maxLimit: any;
  maxAvg: any;
  currentLimit: any;
  expectedLimit: any;
  creditDaysGstR1TurnOver: any;
  aveSixMonthsGstR1TurnOver: any;
  fortyPercentOfAveSixMonthsGstR1TurnOver: any;

  min: number;
  mobileNo: any;
  docId: ReportModel = new ReportModel();
  errorSet: boolean;
  msg: string;
  statusFlow: any;
  programId:any;
  userId:any;
  constructor(
    private route: ActivatedRoute, private router: Router, private apiService: ApiService,private crypto: Crypto,
     private set: breadcrumbMessage,private currency : Currency) {
  }

  keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    else if (event.code === "Space") {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nonStopFlag = params['nonStopFlag'];
    })
    this.curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.errorSet = false;
    this.orgId = this.route.snapshot.params['orgId'];
    this.loanid = this.route.snapshot.params['loanId'];
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
      this.HeaderDetails = data.result;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
    }, error => console.log(error));

    this.apiService.getGSTNList(this.orgId, this.loanid)
      .subscribe(data => {

        if (data.status == 200) {
          console.log(data.result);
          this.maxLimit = data.result.gst3bLimitData[0].maxLimit;
          this.maxAvg = data.result.gst3bLimitData[0].aveMonthlyCredit;
          this.min = Math.min(this.maxLimit, this.maxAvg);
          this.currentLimit = data.result.gst3bLimitData[0].creditLimit;
          this.expectedLimit = this.currentLimit;
          this.creditDaysGstR1TurnOver = data.result.gst3bLimitData[0].creditDaysGstR1TurnOver;
          this.aveSixMonthsGstR1TurnOver = data.result.gst3bLimitData[0].aveSixMonthsGstR1TurnOver;
          this.fortyPercentOfAveSixMonthsGstR1TurnOver = data.result.gst3bLimitData[0].fortyPercentOfAveSixMonthsGstR1TurnOver;
          this.gstnList = data.result.gst3bData;
          this.yearonesale = 0;
          this.yearonepurchase = 0;
          this.sixmonthsale = 0; this.yeartwosale = 0; this.yeartwopurchase = 0;
          const yearOne = this.gstnList[0].year;
          var i = 0;
          while (i <= 11) {
            var sum = true;
            for (var z = 0; z < this.noprocessing.length; z++) {
              var np = this.noprocessing[z].split('-');
              if ((this.gstnList[i].year == np[0]) && (this.gstnList[i].month == np[1])) {
                sum = false;
                break;
              }
            }
            if (sum) {
              this.yearonesale = this.yearonesale + Number(this.gstnList[i].sales);
              this.yearonepurchase = this.yearonepurchase + Number(this.gstnList[i].purchase);
            }
            i++;
          }
          const yearTwo = this.gstnList[i].year;
          var noprocessingtime1 = 0;
          for (var a = 0; a < 12; a++) {
            var year = this.gstnList[a].year;
            var month = this.gstnList[a].month;
            for (var b = 0; b < this.noprocessing.length; b++) {
              var np = this.noprocessing[b].split('-');
              var npyear = np[0];
              var npmonth = np[1];
              if ((year == npyear) && (npmonth == month)) {
                noprocessingtime1++;
              }
            }
          }
          this.yearoneprosale = (this.yearonesale * 12 / (12 - noprocessingtime1));
          this.yearonepropurchase = (this.yearonepurchase * 12 / (12 - noprocessingtime1));
          this.yearoneproprofit = (this.yearoneprosale - this.yearonepropurchase);
          let j = 0;
          let count = 0;
          while (count < 6) {
            var sum = true;
            for (var z = 0; z < this.noprocessing.length; z++) {
              var np = this.noprocessing[z].split('-');
              if ((this.gstnList[j].year == np[0]) && (this.gstnList[j].month == np[1])) {
                sum = false;
                break;
              }
            }
            if (sum) {
              this.sixmonthsale = this.sixmonthsale + Number(this.gstnList[j].sales);
              count++;
            }
            j++;
          }
          this.average = (this.sixmonthsale / 6);
          this.fortypercent_average = (this.average * 0.4);
          while (i <= 23) {
            var sum = true;
            for (var z = 0; z < this.noprocessing.length; z++) {
              var np = this.noprocessing[z].split('-');
              if ((this.gstnList[i].year == np[0]) && (this.gstnList[i].month == np[1])) {
                sum = false;
                break;
              }
            }
            if (sum) {
              this.yeartwosale = this.yeartwosale + Number(this.gstnList[i].sales);
              this.yeartwopurchase = this.yeartwopurchase + Number(this.gstnList[i].purchase);
            }
            i++;
          }
          var noprocessingtime2 = 0;
          for (var a = 12; a < 24; a++) {
            var year = this.gstnList[a].year;
            var month = this.gstnList[a].month;
            for (var b = 0; b < this.noprocessing.length; b++) {
              var np = this.noprocessing[b].split('-');
              var npyear = np[0];
              var npmonth = np[1];
              if ((year == npyear) && (npmonth == month)) {
                noprocessingtime2++;
              }
            }
          }
          this.yeartwoprosale = (this.yeartwosale * 12 / (12 - noprocessingtime2));
          this.yeartwopropurchase = (this.yeartwopurchase * 12 / (12 - noprocessingtime2));
          this.yeartwoproprofit = (this.yeartwoprosale - this.yeartwopropurchase);
          this.turnoverdip = (((this.yearoneprosale - this.yeartwoprosale) * 100 / this.yeartwoprosale));
          var denomValue = this.yeartwoproprofit;
          if (this.yeartwoproprofit < 0) {
            denomValue = denomValue * -1;
          }
          this.profitdip = (((this.yearoneproprofit - this.yeartwoproprofit) * 100 / denomValue));



        }

      })
  }
  nonStopFlag : any;
  goToList() {
    if(this.nonStopFlag == 0){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }else{
        this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
    }
  }
runGstRule(){
  const gstData = {
    userId: this.userId,
    loanRequestId: this.loanid,
    orgId: this.orgId,
    lastActivityTime: this.curDate,
    mobileNo: this.mobileNo,
    userMedium: "backendApp",
    statusFlow: this.statusFlow,
    statusFlag: '1'
  }
  this.apiService.updateGstnRule(gstData).subscribe(data => {});
}
runBankRule(){
  const bankstatementData = {
    userId: this.userId,
    lastActivityTime: this.curDate,
    retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
    currentActivityId: "25",
    loanRequestId: this.loanid,
    retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
    mobileNo: this.mobileNo,
    userMedium: "backendApp",
    programTypeId: this.programId
  }
  this.apiService.getProcessOverAllBankStatements(bankstatementData).subscribe(data => {});
}

  update() {
    var data = {
      gstlist: this.gstnList,
      orgId: this.orgId,
      year1Sales: this.yearoneprosale,
      year1Purchase: this.yearonepropurchase,
      year1Profit: this.yearoneproprofit,
      year2Sales: this.yeartwoprosale,
      year2Purchase: this.yeartwopropurchase,
      year2Profit: this.yeartwoproprofit,
      salesDip: this.turnoverdip,
      profitDip: this.profitdip,
      maxLimit: this.maxLimit,
      maxPossibleLimit: this.maxAvg,
      currentLimit: this.currentLimit,
      fortyPercentOfAveSixMonthsGstR1TurnOver: this.fortyPercentOfAveSixMonthsGstR1TurnOver,
      expectedLimit: this.expectedLimit,
      aveSixMonthsGstR1TurnOver: this.aveSixMonthsGstR1TurnOver,
      creditDaysGstR1TurnOver: this.creditDaysGstR1TurnOver,
    }
    this.apiService.updateGstnData(data).subscribe(data => {
      if (data.status == 200) {
        // this.set.setOption("Updated Successfully",true);
        // this.ngOnInit();
        this.runGstRule();
        this.runBankRule();
        this.ngOnInit();
      }
      else {
        this.set.setOption("Failed to update", false);
      }
    })
  }

  max(e) {
    if (Number(e.target.value) > Number(this.min)) {
      this.errorSet = true;
      this.msg = "The max limit should be " + this.min;
    }
    else {
      this.errorSet = false;
      this.msg = "";
    }
  }

  dip(type) {
    var data = {
      gstlist: this.gstnList,
      orgId: this.orgId,
      year1Sales: this.yearoneprosale,
      year1Purchase: this.yearonepropurchase,
      year1Profit: this.yearoneproprofit,
      year2Sales: this.yeartwoprosale,
      year2Purchase: this.yeartwopropurchase,
      year2Profit: this.yeartwoproprofit,
      salesDip: this.turnoverdip,
      profitDip: this.profitdip,
      dipType: type
    }
    console.log(JSON.stringify(data));
    this.apiService.updateDip(data).subscribe(data => {
      if (data.status == 200) {
        this.runBankRule();
        this.runGstRule();
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    })
  }
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }

  tab1 : boolean = false;
  toggle(){
    this.tab1 = !this.tab1;
  }
}
