import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService} from "..//..//core/api.service";
import { Constant } from "..//..//core/constant";
import {breadcrumbMessage} from '..//..//shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import { environment } from '../../../environments/environment';
import { subMinutes } from 'date-fns';

@Component({
  selector: 'app-disbursement-invoice',
  templateUrl: './disbursement-invoice.component.html',
  styleUrls: ['./disbursement-invoice.component.css']
})
export class DisbursementInvoiceComponent implements OnInit {
  myForm = new FormGroup({
 
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  userId:any;
  loanRequestId:any;
  retailerId:any;
  mobileNo:any;
  otpcheck:boolean=false;
  OrderNo  : any;
  OrderDate:any;
  filecheck:any;
 orderAmount : any;
  fundAmount:any;
  Beneid: any;
  timer:any;
  time:any;
  content:any;
  fileurl:any;
  fileName:any;
  orgId:any;
  dimid:any;
  otp1:any;
resent:boolean=true;
  otp2:any;
  otp3:any;
  otp4:any;
  done:boolean=false;
  otp:any;
  errormsg:any;
  tokens:any;
 
lastactivitytime:any
  constructor(private http: HttpClient,private route: ActivatedRoute, private apiService: ApiService,private router: Router, private set : breadcrumbMessage) { }

  preventTyping() {
    return false;
  }
  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.orgId=this.route.snapshot.params['orgId'];
    this.retailerId = this.route.snapshot.params['retailerId'];
    this.loanRequestId = this.route.snapshot.params['loanRequestId'];
    this.tokens=this.route.snapshot.params['token'];
    window.localStorage.setItem('token',this.tokens);
    this.timer = 45;
    this.filecheck=1;
    this.mobileNo=this.route.snapshot.params['mobileNo'];
    this.lastactivitytime=moment().format('YYYY-MM-DD HH:mm:ss');

 
  }
  ext(filename) {
    return filename.split('.').pop();
  }
    fileSelection(files) {
      var ext = this.ext(files[0].name);
      if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'pdf'){
        var reader = new FileReader();
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
              this.content = reader.result; 
              this.fileurl = this.content.split(',')[1];
             this.fileName=files[0].name;
             this.filecheck=2;
              console.log("file is selected now");
        }
      }else{
        this.set.setOption("Please choose Excel Files", false);
        const files=<HTMLInputElement>document.getElementById('file');
        files.value="";
      }
    }
  

 

    
  

  submit()
  {

    const formData = new FormData();
    if(this.OrderNo==null||this.OrderNo==undefined||this.OrderNo=="")
    {
      this.set.setOption("please enter the Order No", false);
    }
    else if(this.OrderDate==null||this.OrderDate==undefined||this.OrderDate=="")
    {
      this.set.setOption("please enter the Order Date", false);
    }
    else if(this.orderAmount==null||this.orderAmount==undefined||this.orderAmount=="")
    {
      this.set.setOption("please enter the Order Amount", false);
    }
    else if(this.fundAmount==null||this.fundAmount==undefined||this.fundAmount=="")
    {
      this.set.setOption("please enter the Fund Amount", false);
    }
    else if(this.Beneid==null||this.Beneid==undefined||this.Beneid=="")
    {
      this.set.setOption("please enter the Beneficiary Id", false);
    }
    else if(this.filecheck!=2)
    {
      this.set.setOption("Please Upload the invoice", false);
    }

else
{
const data=
{
'userId':this.userId,
loanRequestId:this.loanRequestId,
retailerId:this.retailerId,
mobileNo:this.mobileNo,
currentActivityId:"16",
userMedium:"backendApp",
orderNo:this.OrderNo,
orderDate:this.OrderDate,
orderAmount:this.orderAmount,
fundAmount:this.fundAmount,
beneId:this.Beneid,
fileName:this.fileName,
lastActivityTime:moment().format('YYYY-MM-DD HH:mm:ss'),
fileContent:this.fileurl,
}
//this.fileurl
this.apiService.uploadDisbursalInvoiceData(data).subscribe(data => {
  if(data.status==200)
  {this.dimid=data.result.dmiId;
    this.generateOTP();
  }
  else{
 
      this.set.setOption("failed to upload invoice", false);

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
    this.resent=false;
    clearInterval(this.time);
    return;
  }

}

generateOTP()
{

  const data=
  {
    userId:this.userId,
    lastActivityTime:moment().format('YYYY-MM-DD HH:mm:ss'),
    loanRequestId:this.loanRequestId,
    orgId:this.orgId,
    dimid:this.dimid.toString(),
  }
  this.apiService.disburseInvoiceotp(data)
.subscribe(data => {
  if(data.status==200)
  {  this.otpcheck=true;
    this.resent=true;
    this.startTimer();
    this.reset();
  }
  else{
 
      this.set.setOption("failed to generate OTP", false);

    }
  });
}
verifyOTP()
{  var otp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
  if (otp == null || otp == undefined || otp.length != 4 || this.otp == "" || !this.otp1 || !this.otp2 || !this.otp3 || !this.otp4) {
    this.errormsg = "Please Enter a 4 Digit OTP"
  }
  const data=
  {
    userId:this.userId,
    lastActivityTime:moment().format('YYYY-MM-DD HH:mm:ss'),
    loanRequestId:this.loanRequestId,
    "requestType":1,
    orgId:this.orgId,
    dimId:this.dimid.toString(),
    currentActivityId:"100",
userMedium:"backendApp",
OTP:Number(otp).toString(),
  }
  this.apiService.verifyInvoiceotp(data)
  .subscribe(data => {
    if(data.status==200)
    {  this.otpcheck=true;
      this.done=true;
    
    }
    else{
   
        this.set.setOption("failed to verify OTP", false);
  
      }
    });
}
reset()
{
  this.otp1="";
  this.otp2="";
  this.otp3="";
  this.otp4="";
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