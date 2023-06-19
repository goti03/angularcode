import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import * as moment from 'moment/moment.js';
import { Currency } from '../../shared/currency.service';

@Component({
  selector: 'app-disbursement-approval',
  templateUrl: './disbursement-approval.component.html',
  styleUrls: ['./disbursement-approval.component.css']
})
export class DisbursementApprovalComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService : ApiService, public currency : Currency) { }

  token : any;
  expired : boolean =false;
  invoiceDetails:any;

  o1 : any;
  o2 : any;
  o3 : any;
  o4 : any;

  emptyOtp : boolean;
  message : string;

  otpRequested : boolean;
  otpRequestedfailed : boolean;
  totalDisbursalAmount:any;
  invoiceList:any;
  loanRequestId:any;
  dimId:any;
  orgId:any;
  userId:any;

  otpVerified : boolean;

  ngOnInit() {
    this.otpVerified = false;
    this.otpRequested = false;
    this.otpRequestedfailed = false;
    this.emptyOtp = false;
    this.message = "";
    this.token = this.route.snapshot.params['token'];
    this.apiService.verifylink(this.token).subscribe(data => {
      if(data.exceptionOccured == 'Y'){
        this.message = data.exceptionMessage;
        this.expired = true;
      }else {
        this.expired = false;
        this.totalDisbursalAmount=data.result[0].totalDisbursalAmount;
        this.invoiceList=data.result[0].invoiceList;
         this.invoiceDetails=data.result;

         this.loanRequestId=data.result[0].loanRequestId;
         this.dimId=data.result[0].dmiId;
         this.orgId=data.result[0].orgid;
         this.userId=data.result[0].userId;
        localStorage.setItem('token',data.result[0].token);

      }
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  getOtp(){
    const obj = {
      userId:this.userId.toString(),
     lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
     dimid:this.dimId,
     orgId:this.orgId,
     loanRequestId:this.loanRequestId
    }
    this.apiService.getdisbursalotp(obj).subscribe(data => {
        if(data.exceptionOccured == 'N'){
          this.otpRequested = true;
          this.otpRequestedfailed = false;
        }else {
          this.otpRequestedfailed = true;
          this.message = data.exceptionMessage;
        }
    });
  }

  verifyOtp(){
     if(!this.o1 || !this.o2 || !this.o3 || !this.o4){
      this.emptyOtp = true;
      return;
    }
    const otp = this.o1+this.o2+this.o3+this.o4;
    const obj = {
      userId:this.userId.toString(),
      requestType:this.orgId,
      loanRequestId:this.loanRequestId,
      dimId:this.dimId,
      orgId:this.orgId,
      userMedium:"backend",
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      OTP:otp,
      currentActivityId:"100"
    }
    this.apiService.getdisbursalotpverification(obj).subscribe(data => {
      if(data.status == 200){ 
        this.emptyOtp = false;
        this.otpVerified = true;
        // alert("success");
        // window.close();
      }
    })
  }



  move(a) {
    this.emptyOtp = false;
    document.getElementById("otp_"+a).focus();
  }

  blur(a) {
    this.emptyOtp = false;
    document.getElementById("otp_"+a).blur();
  }

  indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
  }
}
