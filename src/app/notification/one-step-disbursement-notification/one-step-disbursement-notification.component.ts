import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import * as moment from 'moment/moment.js';
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-one-step-disbursement-notification',
  templateUrl: './one-step-disbursement-notification.component.html',
  styleUrls: ['./one-step-disbursement-notification.component.css']
})
export class OneStepDisbursementNotificationComponent implements OnInit {
  disburseList: any[];
  emptyOtp: boolean;

  constructor(private route: ActivatedRoute, private apiService : ApiService, public currency : Currency,private crypto: Crypto) { }

  token : any;
  expired : boolean =false;

  o1 : any;
  o2 : any;
  o3 : any;
  o4 : any;

  message : string;

  invoiceList:any;
  loanRequestId:any;
  orgId:any;
  customerName : any;
  availLimit : any;

  dimId : any;
  mobileNo : any;

  err : boolean;
  message1 : string;
  sumAmount : number;

  otpRequested : boolean;
  otpVerified : boolean;
  trachLimit:any;
  distId = '';
  userId:any;

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.sumAmount = 0;
    this.message = "";
    this.err = false;
    this.otpRequested = false;
    this.message1 = '';
    this.emptyOtp = false;
    this.token = this.route.snapshot.params['token'];
    this.otpVerified = false;
    this.apiService.getcustinvlstdisbursal(this.token).subscribe(data => {
      if(data.exceptionOccured == 'Y'){
        this.message = data.exceptionMessage;
        this.expired = true;
      }else {
        this.expired = false;
        this.customerName = data.result[0].customerName;
        this.invoiceList=data.result[0].invoiceList;
         this.loanRequestId=data.result[0].loanRequestId;
         this.orgId=data.result[0].orgid;
         this.availLimit=data.result[0].availLimit;
         this.trachLimit=data.result[0].tranchLimit;
         this.userId = data.result[0].userId;
         localStorage.setItem('token',data.result[0].token);
         for(let a of this.invoiceList){
           a.mark = false;
         }
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
    this.calculate();
    const obj = {
    mobileNumber: "0",
    typeAgreement: "0",
    lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    userMedium: "mobileApp",
    userId: this.userId,
    retailerId: this.orgId,
    loanRequestId: this.loanRequestId,
    loanDisbursalId: "",
    loanAmount: this.sumAmount.toString(),
    requestType:1,
    orgid:this.orgId.toString(),
    invoice_list : this.disburseList,
    }
    this.apiService.disbursalinitiating(obj).subscribe(data => {
      if(data.status == 200){
           this.dimId=data.result[0].dmiId;
           this.orgId=data.result[0].orgid;
           this.mobileNo=data.result[0].mobileNo;
           this.otpRequested = true;    
      }
      if(data.exceptionOccured == 'Y'){
        this.err = true;
        this.message1 = data.exceptionMessage;
        this.clearError();
      }
    })

  }
  
  singleMark(a,b){
    if(this.distId == ''){
      this.distId = this.invoiceList[b].distid;
    }
    if(this.invoiceList[b].mark == true){
      if((Number(this.sumAmount) + a) < this.availLimit){
        if(this.invoiceList[b].distid == this.distId){
          this.sumAmount = Number(this.sumAmount) + Number(a);
        }else {
          this.err = true;
          this.message1 = "Please choose Invoice with same Distributor name";
        this.clearError();
          var time1 = setInterval(() => {
          this.invoiceList[b].mark = false;
          clearInterval(time1);
        }, 1000)
        }
      }else {
        this.err = true;
        this.message1 = "We cannot fund more than available limit";
        var time1 = setInterval(() => {
          this.invoiceList[b].mark = false;
          clearInterval(time1);
        }, 1000)
        this.clearError();
      }
    }else{
      if(this.sumAmount > 0){
      this.sumAmount = Number(this.sumAmount) - Number(a);
      }
    }
  }
  
  time :any;
  clearError(){
    this.time = setInterval(() => {
      this.err = false;
      this.message1 = "";
      clearInterval(this.time);
    }, 8000);
  }

  calculate(){
    this.disburseList = [];
    for(let a of this.invoiceList){
      if(a.mark == true){
        this.disburseList.push(a);
      }
    }
  }

  move(a) {
    this.emptyOtp = false;
    document.getElementById("otp_"+a).focus();
  }

  blur(a) {
    this.emptyOtp = false;
    document.getElementById("otp_"+a).blur();
  }

  verifyOtp(){
    if(!this.o1 || !this.o2 || !this.o3 || !this.o4){
      this.emptyOtp = true;
      return;
    }
    var otpVal=this.o1+this.o2+this.o3+this.o4;
      const obj = {
      userId: this.userId.toString(),
      requestType:1,
      loanRequestId:this.loanRequestId,
      dimId:this.dimId.toString(),
      orgId:this.orgId.toString(),
      userMedium:"backend",
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      OTP:otpVal,
      currentActivityId:"0"
    }
   
    this.apiService.getdisbursalotpverification(obj).subscribe(data => {
      if(data.status == 200){
        this.emptyOtp = false;
        this.otpVerified = true;
      }
      else{
        this.err = true;
        this.message1 = data.exceptionMessage;
        this.clearError();
      }
    })
  }

  resentOtp(){
     const obj ={
       userId: this.userId,
       lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
       dimid : this.dimId,
       orgId : this.orgId,
       loanRequestId : this.loanRequestId,
       requestType : 1,
      //  programId : this.programId
     }
     this.apiService.resentOtp(obj).subscribe(data => {
      if(data.status == 200){

      }else {
        this.err = true;
        this.message1 = data.exceptionMessage;
      }
       this.clearError();
     })
   }

   indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
  }
 
}
