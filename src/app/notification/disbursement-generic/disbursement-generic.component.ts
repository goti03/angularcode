import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import {  ActivatedRoute } from '@angular/router';
import { Currency } from  '../../shared/currency.service';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-disbursement-generic',
  templateUrl: './disbursement-generic.component.html',
  styleUrls: ['./disbursement-generic.component.css']
})
export class DisbursementGenericComponent implements OnInit {
  
  customerName: any;
  invoiceList: any;
  loanRequestId: any;
  orgId: any;
  availLimit: any;
  trachLimit: any;
  userId: any;
  dimId: any;
  mobileNo: any;
  emptyOtp: boolean;
  otpVerified: boolean;
  autoDisbursementDate: any;
  adDate: any;
  adTime: any;
  invoiceReceivedDate: any;
  irDate: any;
  irTime: any;
  autoDisid: any;
  remark: string;
  beneName: any;
  brandName: any;

  constructor(private apiService : ApiService, private route: ActivatedRoute, public currency : Currency) { }

  token : any;
  flag : any;

  expired : boolean;
  message : any;

  otpRequested : boolean;

  invoiceWithoutDiscount : number;
  discount : number;
  totalAmount : number;

  distId : any;

  inErr : boolean;
  inMessage : any;

  disburseList = [];

  o1 : any;
  o2 : any;
  o3 : any;
  o4 : any;

  resent : boolean;
  timer : Number;

  availLimitAfterdis : Number;
  maskedNumber : any;

  autoDisbursementStop : boolean;

  startErr : boolean;

  ngOnInit() {
    this.autoDisbursementStop = false;
    this.token = this.route.snapshot.params['token'];
    this.flag = this.route.snapshot.params['flag'];
    this.expired = false;
    this.otpRequested = false;
    this.inErr = false;
    this.totalAmount = 0;
    this.discount = 0;
    this.invoiceWithoutDiscount = 0;
    this.distId = '';
    this.emptyOtp = false;
    this.otpVerified = false;
    this.resent = false;
    this.timer = 45;
    this.startErr = false;
    // 9 am Notification
    if(this.flag == 1){
    this.apiService.getcustinvlstdisbursal(this.token).subscribe(data => {
      if(data.exceptionOccured == 'Y'){
        this.inMessage = data.exceptionMessage;
        this.inErr = true;
        this.startErr = true;
      }else {
        this.expired = false;
        this.brandName = data.result[0].brandName;
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
           a.prevent = false;
         }
      }
    });
  }// initiate disbursement
  else if (this.flag == 2){
    this.apiService.verifylink(this.token).subscribe(data => {
      if(data.exceptionOccured == 'Y'){
        this.inMessage = data.exceptionMessage;
        this.inErr = true;
        this.startErr = true;
      }else {
        this.expired = false;
        this.totalAmount=data.result[0].totalDisbursalAmount;
        this.invoiceList=data.result[0].invoiceList;
        this.beneName = data.result[0].beneName;
        this.customerName = data.result[0].customerName;
         this.loanRequestId=data.result[0].loanRequestId;
         this.dimId=data.result[0].dmiId;
         this.orgId=data.result[0].orgid;
         this.userId=data.result[0].userId;
         this.availLimit = data.result[0].availLimit;
        localStorage.setItem('token',data.result[0].token);
        for(let a of this.invoiceList){
          this.invoiceWithoutDiscount = Number(this.invoiceWithoutDiscount) + Number(a.invoiceAmount);
          a.prevent = true;
          a.mark= true;
        }
        this.discount = Number(this.invoiceWithoutDiscount) - Number(this.totalAmount);
      }
    });
    // this.availLimit = 1000;
  }// auto disbursement
  else if(this.flag == 3){
    this.apiService.autoDisbursementNotificationhtml(this.token).subscribe(data => {
      if(data.status == 200){
        if(data.exceptionOccured == 'N'){
          this.customerName = data.result.orgName;
          this.beneName = data.result.beneName;
          this.availLimit = data.result.availableLimit;
          this.autoDisbursementDate = data.result.autoDisbursementDate;
          this.adDate = this.autoDisbursementDate.substring(0,10);
          this.adTime = this.autoDisbursementDate.substring(11,19);
          this.invoiceReceivedDate = data.result.invoiceReceivedDate;
          this.irDate = this.invoiceReceivedDate.substring(0,10);
          this.irTime = this.invoiceReceivedDate.substring(11,19);
          this.autoDisid = data.result.id;
          this.invoiceList = [];
          const obj = {
            invoiceNo : data.result.invoiceNo,
            invoiceAmount : data.result.invoiceAmount,
            invoiceDate : data.result.invoiceDate,
            fundingAmount : data.result.fundingAmount,
            prevent : true,
            mark : true
          }
          this.invoiceList.push(obj);
          this.discount = data.result.cashDiscountAmount;
          this.invoiceWithoutDiscount = this.invoiceList[0].invoiceAmount;
          this.totalAmount = Number(this.invoiceWithoutDiscount) - Number(this.discount);
          window.localStorage.setItem('token', data.result.token);
        }else {
          this.inErr = true;
          this.inMessage = data.exceptionMessage;
          this.startErr = true;
        }
      }else {
        this.inErr = true;
        this.inMessage = data.exceptionMessage;
      }
    }, error => console.log(error));
  }
}

// indianCurrency(number : any) {
//   return this.currency.indianCurrency(number);
// }

singleMark(a,b,c,d1){
  if(this.distId == ''){
    this.distId = this.invoiceList[b].distid;
  }
  if(this.invoiceList[b].mark == true){
    if((Number(this.totalAmount) + Number(a)) < this.availLimit){
      if(this.invoiceList[b].distid == this.distId){
        this.totalAmount = Number(this.totalAmount) + Number(a);
        this.invoiceWithoutDiscount = Number(this.invoiceWithoutDiscount) + Number(c);
        var d = Number(c) - Number(a);
        this.discount = Number(this.discount) + Number(d);
        this.beneName = d1;
        if( d1 == '-' || d1 == ''){
          this.beneName = this.brandName;
        }
        this.disabling(d1);
      }else {
        this.inErr = true;
        this.inMessage = "Please choose Invoice with same Distributor name";
        this.clearinError();
        var time1 = setInterval(() => {
        this.invoiceList[b].mark = false;
        clearInterval(time1);
      }, 1000)
      }
    }else {
      this.inErr = true;
      this.inMessage = "We cannot fund more than available limit";
      var time1 = setInterval(() => {
        this.invoiceList[b].mark = false;
        clearInterval(time1);
      }, 1000)
      this.clearinError();
    }
  }else{
    if(this.totalAmount > 0){
    this.totalAmount = Number(this.totalAmount) - Number(a);
    this.invoiceWithoutDiscount = Number(this.invoiceWithoutDiscount) - Number(c);
    var d = Number(c) - Number(a);
    this.discount = Number(this.discount) - Number(d);
    this.undisabling(d1);
    }
  }
}

time :any;
clearinError(){
  this.time = setInterval(() => {
    this.inErr = false;
    this.inMessage = "";
    clearInterval(this.time);
  }, 9000);
}

// 9 am notification 
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
  loanAmount: this.totalAmount.toString(),
  requestType:1,
  orgid:this.orgId.toString(),
  invoice_list : this.disburseList,
  }
  this.apiService.disbursalinitiating(obj).subscribe(data => {
    if(data.status == 200){

         if(data.exceptionOccured == 'Y'){
          this.inErr = true;
          this.inMessage = data.exceptionMessage;
          this.clearinError();
        }else {
          this.dimId=data.result[0].dmiId;
          this.orgId=data.result[0].orgid;
          this.mobileNo=data.result[0].mobileNo;
          this.otpRequested = true;  
          this.resentTrigger(); 
          this.maskedNumber = "XXXXX-X" + this.mobileNo.substring(6,10);
        } 
    }

  })
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
      if(data.exceptionOccured == 'N'){
        this.emptyOtp = false;
        this.otpVerified = true;
        this.availLimitAfterdis = Number(this.availLimit) - Number(this.totalAmount);
      }else {
        this.inErr = true;
        this.inMessage = data.exceptionMessage;
        this.clearinError();
      }

    }
    else{
      this.inErr = true;
      this.inMessage = data.exceptionMessage;
      this.clearinError();
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
      if(data.exceptionOccured == 'N'){
        this.timer = 45;
        this.resentTrigger();
      }else {
        this.inErr = true;
        this.inMessage = data.exceptionMessage;
      }
    }else {
      this.inErr = true;
      this.inMessage = data.exceptionMessage;
    }
     this.clearinError();
   })
 }

 keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

resentTrigger(){
  var a;
  if(this.timer > 0){
    a = setInterval(() => {
      this.timer = Number(this.timer) - 1;
      clearInterval(a);
      this.resentTrigger();
    }, 1000);
  }else {
    this.resent = true;
    clearInterval(a);
  }
}

// initiate disbursement 
getOtpIntiate(){
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
        this.maskedNumber = data.result;
      }else {
        this.inErr = true;
        this.inMessage = data.exceptionMessage;
        this.clearinError();
      }
  });
}

getOtpcommon(){
  if(this.flag == 2){
    this.getOtpIntiate();
  }else if(this.flag == 1){
    this.getOtp();
  }
}

verifyOtpCommon(){
  if(this.flag == 2){
    this.verifyOtpinitiate();
  }else if(this.flag == 1){
    this.verifyOtp();
  }
}

// initiate disbursement
verifyOtpinitiate(){
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
     if(data.exceptionOccured == 'N'){
      this.emptyOtp = false;
      this.otpVerified = true;
      this.availLimitAfterdis = Number(this.availLimit) - Number(this.totalAmount);
     }else {
     this.inErr = true;
     this.inMessage = data.exceptionMessage;
     }

   }else {
     this.inErr = true;
     this.inMessage = data.exceptionMessage;
   }
   this.clearinError();
 })
}


// auto disbursal
initiateAutoDisbursal(){
  this.apiService.initiateAutoDisbursal(0,this.autoDisid).subscribe(data => {
    if(data.status == 200){
      if(data.exceptionOccured == 'N'){
        this.otpVerified = true;
        this.availLimitAfterdis = Number(this.availLimit) - Number(this.totalAmount);
      }else {
        this.inErr = true;
        this.inMessage = data.exceptionMessage;
      }
    
    }else {
      this.inErr = true;
      this.inMessage = data.exceptionMessage;
    }
  }, error => console.log(error));
  this.clearinError();
}


// stop auto disbursal
stop(){
  this.remark = 'AUTO DISBURSEMENT STOPPED BY CUSTOMER';
  const obj = {
    id : this.autoDisid,
    userId : '0',
    remarks : this.remark
  }
  this.apiService.stopAutoDisbursal(obj).subscribe(data => {
    if(data.status == 200){
      if(data.exceptionOccured == 'N'){
        this.otpVerified = true;
        this.availLimitAfterdis = Number(this.availLimit);
        this.autoDisbursementStop = true;
      }else {
        this.inErr = true;
        this.inMessage = data.exceptionMessage;
      }

    }else {
      this.inErr = true;
      this.inMessage = data.exceptionMessage;
    }
  })
  this.clearinError();
}

indianCurrency(number: any) {
  // console.log(typeof(number));
  if ((number == null) || (number == '')) {
    return "₹0";
  } else {
    var b;
    var a = Number(number).toString().split('.')[0].length > 3 ? number.toString().substring(0, number.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + number.toString().substring(number.toString().split('.')[0].length - 3) : number.toString();
    if(a.indexOf('.') == -1)
    {
      b = a+".00";
    }
    else
    {
      if ( a.split('.')[1].length == 1)
      {
        b = a.toString()+"0";
      }
      else if( a.split('.')[1].length > 2 ) 
      {
        var c = a.split('.')[1].toString().substring(0,2);
        b = a.split('.')[0]+"."+c;
      }
      else
      {
        b = a;
      }
    }
    return "₹"+b;
  }

}

disabling(b){
  for(let a of this.invoiceList){
    if(b != a.distName){
      a.prevent = true;
    }
  }
}

undisabling(a){
  var count = 0;
  var count1 = 0;
  for(let b of this.invoiceList){
    if(b.distName == a){
      count++;
      if(b.mark == false){
        count1++;
      }
    }
  }
  if(count == count1){
    for(let c of this.invoiceList){
      c.prevent = false;
    }
  }
}

}
