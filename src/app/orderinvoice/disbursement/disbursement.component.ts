import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../core/api.service";
import { Constant } from "../../core/constant";
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import { Currency } from '../../shared/currency.service';
import { threadId } from 'worker_threads';
import { subMonths } from 'date-fns';

@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.css']
})
export class DisbursementComponent implements OnInit {
  myForm = new FormGroup({

    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  userId: any;
  loanRequestId: any;
  retailerId: any;
  mobileNo: any;
  date: any;
  errormsg: any;
  otpcheck: boolean = false;
  OrderNo: any;
  OrderDate: any;
  filecheck: any;
  orderAmount: any;
  fundAmount: any;
  Beneid: string;
  timer: any;
  time: any;
  content: any;
  fileurl: any;
  fileName: any; p
  orgId: any;
  rules: any;
  companys: any;
  avails: any;
  dimid: any;
  otp1: any;
  resent: boolean = true;
  otp2: any;
  otp3: any;
  otp4: any;
  done: boolean = false;
  otp: any;
  remarks: any;
  tokens: any;
  Beneidlist: any;
  companyname: any;
  availlimit: any;;
  datemin: any;
  lastactivitytime: any

  constructor(private http: HttpClient, private route: ActivatedRoute, private apiService: ApiService, private router: Router, private set: breadcrumbMessage, public currency: Currency,) { }
  preventTyping() {
    return false;
  }
  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.orgId = this.route.snapshot.params['orgId'];
    this.retailerId = this.route.snapshot.params['retailerId'];
    this.loanRequestId = this.route.snapshot.params['loanRequestId'];
    this.companyname = this.route.snapshot.params['companyname'];
    this.availlimit = this.route.snapshot.params['availablelimit']
    this.mobileNo = this.route.snapshot.params['mobileNo']
    this.tokens = this.route.snapshot.params['token'];
    window.localStorage.setItem("mobilenumber", this.mobileNo);
    window.localStorage.setItem("point1", this.companyname);
    window.localStorage.setItem("point2", this.availlimit);
    window.localStorage.setItem("loanrequest", this.loanRequestId);
    window.localStorage.setItem('token', this.tokens);
    this.availlimit = this.indianCurrency(this.availlimit)
    this.timer = 45;
    this.date = moment().format('YYYY-MM-DD');
    this.OrderDate = this.date;
    this.datemin = moment().subtract(1, 'months').format('YYYY-MM-DD');
    this.rules = 3;
    this.filecheck = 1;
    this.mobileNo = this.route.snapshot.params['mobileNo'];
    this.lastactivitytime = moment().format('YYYY-MM-DD HH:mm:ss');
    this.apiService.getBenelistuseingLoanrequestid(this.loanRequestId).subscribe(data => {
      if (data.status == 200) {
        this.Beneidlist = data.result;
        this.Beneid = (this.Beneidlist.length == 1) ? this.Beneidlist[0].beneId : '0';
      }
    });
  }
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  ext(filename) {
    return filename.split('.').pop();
  }
  fileSelection(files) {
    var ext = this.ext(files[0].name);
    if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'pdf'){

      console.log("file is selected");
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.content = reader.result;
        this.fileurl = this.content.split(',')[1];
        this.fileName = files[0].name;
        this.rules = 2;
      }
    }else{
      this.set.setOption("Please choose Image or PDF Files", false);
      const files=<HTMLInputElement>document.getElementById('file');
      files.value="";
    }
  }
  submit() {
    this.errormsg = "";
    if (this.OrderNo == null || this.OrderNo == undefined || this.OrderNo == "") {
      this.errormsg = "please enter the Order No";
    } else if (this.OrderDate == null || this.OrderDate == undefined || this.OrderDate == "") {
      this.errormsg = "please enter the Order Date";
    } else if (this.orderAmount == null || this.orderAmount == undefined || this.orderAmount == "") {
      this.errormsg = "Please enter the order amount";
    } else if (this.fundAmount == null || this.fundAmount == undefined) {
      this.errormsg = "Please enter the fund amount";
    } else if (this.Beneid == null || this.Beneid == undefined || this.Beneid == "") {
      this.errormsg = "please enter the Beneficiary Id";
    } else {
      this.errormsg = "";
      if (this.rules == 2) {
        const data = {
          'userId': this.userId,
          loanRequestId: this.loanRequestId,
          retailerId: this.retailerId,
          mobileNo: this.mobileNo,
          currentActivityId: "16",
          userMedium: "backendApp",
          orderNo: this.OrderNo,
          orderDate: this.OrderDate,
          orderAmount: this.orderAmount,
          fundAmount: this.fundAmount,
          beneId: this.Beneid.toString(),
          fileName: this.fileName,
          fileContent: this.fileurl,
          lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        this.apiService.uploadDisbursalInvoiceData(data).subscribe(data => {
          if (data.status == 200) {
            this.dimid = data.result.dmiId;
            window.localStorage.setItem("dimids", this.dimid),
            window.localStorage.setItem("loanrequestids", this.loanRequestId),
            window.localStorage.setItem("orgIds", this.orgId),
            window.localStorage.setItem("userIds", this.userId)
            window.localStorage.setItem("ordernum", this.OrderNo)
            window.localStorage.setItem("ordermountz", this.orderAmount)
            window.localStorage.setItem("fundamountz", this.fundAmount)
            this.generateOTP();
          } else {
            this.errormsg = data.exceptionMessage;
          }
        });
      } else {
        const data = {
          'userId': this.userId,
          loanRequestId: this.loanRequestId,
          retailerId: this.retailerId,
          mobileNo: this.mobileNo,
          currentActivityId: "16",
          userMedium: "backendApp",
          orderNo: this.OrderNo,
          orderDate: this.OrderDate,
          orderAmount: this.orderAmount,
          fundAmount: this.fundAmount,
          beneId: this.Beneid,
          lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        this.apiService.uploadDisbursalInvoiceData(data).subscribe(data => {
          if (data.status == 200) {
            this.dimid = data.result.dmiId;
            window.localStorage.setItem("dimids", this.dimid),
              window.localStorage.setItem("loanrequestids", this.loanRequestId),
              window.localStorage.setItem("orgIds", this.orgId),
              window.localStorage.setItem("userIds", this.userId)
            window.localStorage.setItem("ordernum", this.OrderNo)
            window.localStorage.setItem("ordermountz", this.orderAmount)
            window.localStorage.setItem("fundamountz", this.fundAmount)
            this.generateOTP();
          } else {
            this.errormsg = data.exceptionMessage;
          }
        });
      }
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

  generateOTP() {
    this.errormsg = "";
    const data = {
      userId: this.userId,
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      loanRequestId: this.loanRequestId,
      orgId: this.orgId,
      dimid: this.dimid.toString(),
    }
    this.apiService.disburseInvoiceotp(data).subscribe(data => {
      if (data.status == 200) {
        this.otpcheck = true;
        this.resent = true;
        this.startTimer();
        this.router.navigate(['orderinvoice/otp']);
        this.reset();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  verifyOTP() {
    var otp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
    if (otp == null || otp == undefined || otp.length != 4 || this.otp == "" || !this.otp1 || !this.otp2 || !this.otp3 || !this.otp4) {
      this.errormsg = "Please Enter a 4 Digit OTP"
    }
    const data = {
      userId: this.userId,
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      loanRequestId: this.loanRequestId,
      "requestType": 1,
      orgId: this.orgId,
      dimId: this.dimid.toString(),
      currentActivityId: "100",
      userMedium: "backendApp",
      OTP: Number(otp).toString(),
    }
    this.apiService.verifyInvoiceotp(data).subscribe(data => {
      if (data.status == 200) {
        this.otpcheck = true;
        this.done = true;
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
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
