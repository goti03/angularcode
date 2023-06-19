import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../core/api.service";
import { Constant } from "../../core/constant";
import { Currency } from '../../shared/currency.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import { windowTime } from 'rxjs-compat/operator/windowTime';

@Component({
  selector: 'app-orderinvoiceotp',
  templateUrl: './orderinvoiceotp.component.html',
  styleUrls: ['./orderinvoiceotp.component.css']
})
export class OrderinvoiceotpComponent implements OnInit {
  userId: any;
  loanRequestId: any;
  retailerId: any;
  mobileNo: any;
  otpcheck: boolean = false;
  OrderNo: any;
  OrderDate: any;
  filecheck: any;
  orderAmounts: any;
  fundAmounts: any;
  Beneid: any;
  timer: any;
  time: any;
  content: any;
  fileurl: any;
  fileName: any;
  orgId: any;
  companyname: any;

  availlimit: any;
  dimid: any;
  otp1: any;
  resent: boolean = true;
  otp2: any;
  otp3: any;
  message:any;
  otp4: any;
  done: boolean = false;
  otp: any;
  phoneNo: any;
  maskedNo: any;
  errormsg: any;
  tokens: any;
  fundz: any;
orderamountnew:any;
fundamountnew:any;
  ordernum: any;

  loanrequest: any;
  newavaillimit:any;
  Beneidlist: any;

  lastactivitytime: any

  constructor(private http: HttpClient, private route: ActivatedRoute, private apiService: ApiService, private router: Router, private set: breadcrumbMessage,public currency: Currency) { }

  ngOnInit() {
    this.timer = 45;
    this.orderAmounts = window.localStorage.getItem("ordermountz");
    this.orderamountnew=this.indianCurrency(this.orderAmounts);
    this.fundAmounts = window.localStorage.getItem("fundamountz");
    this.fundamountnew=this.indianCurrency(this.fundAmounts);
    this.companyname = window.localStorage.getItem("point1");
    this.availlimit = window.localStorage.getItem("point2");
    this.availlimit = this.indianCurrency(this.availlimit)
    this.fundz = window.localStorage.getItem("fundamountz")
    this.ordernum = window.localStorage.getItem("ordernum");
    this.orderAmounts = window.localStorage.getItem("ordermountz");
    this.fundAmounts = window.localStorage.getItem("fundamountz");
    this.loanrequest = window.localStorage.getItem("loanrequest")
    this.phoneNo = window.localStorage.getItem("mobilenumber");
    this.maskedNo = "+91-" + this.phoneNo.substring(0, 2) + "XXX-XXX" + this.phoneNo.substring(8, 10);
    this.startTimer();
  }
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }

  generateOTP() {


    const data =
    {
      userId: window.localStorage.getItem("userIds"),
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      loanRequestId: window.localStorage.getItem("loanrequestids"),
      orgId: window.localStorage.getItem("orgIds"),
      dimid: window.localStorage.getItem("dimids"),
    }
    this.apiService.disburseInvoiceotp(data)
      .subscribe(data => {
        if (data.status == 200) {
          this.resent = true;
          this.timer = 45;
          this.startTimer();
          this.reset();
        }
        else {

          this.errormsg = data.exceptionMessage;

        }
      });
  }
  verifyOTP() {
    var otp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
    if (otp == null || otp == undefined || otp.length != 4 || this.otp == "" || !this.otp1 || !this.otp2 || !this.otp3 || !this.otp4) {
      this.errormsg = "Please Enter a 4 Digit OTP"
    }
    else{
    const data =
    {
      userId: window.localStorage.getItem("userIds"),
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      loanRequestId: window.localStorage.getItem("loanrequestids"),
      "requestType": 1,
      orgId: window.localStorage.getItem("orgIds"),
      dimId: window.localStorage.getItem("dimids"),
      currentActivityId: "100",
      userMedium: "backendApp",
      OTP: Number(otp).toString(),
    }
    console.log("the data is ===" + JSON.stringify(data));
    this.apiService.verifyInvoiceotp(data)
      .subscribe(data => {
        if (data.status == 200) {
          this.newavaillimit = data.result.availCredit;
          this.message = data.result.status;
          window.localStorage.setItem("finalmessage",data.result.status)
          window.localStorage.setItem("newlimit",this.newavaillimit);
          console.log("who is there");
          this.router.navigate(['orderinvoice/success']);

        }
        else {

          this.errormsg = data.exceptionMessage;
          this.reset();

        }
      });
    }
  }
  startTimer() {
    if (this.timer > 0) {

      this.time = setInterval(() => {
        this.timer--;
        clearInterval(this.time);
        this.startTimer();
      }, 1000)
    } else {
      this.resent = false;
      clearInterval(this.time);
      return;
    }

  }
  reset() {
    
    this.otp1 = "";
    this.otp2 = "";
    this.otp3 = "";
    this.otp4 = "";
  }
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}

