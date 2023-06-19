import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "..//..//core/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { lenderconfiguration } from '../../../environments/lender.config';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';


@Component({
  selector: 'app-gstuser',
  templateUrl: './gstuser.component.html',
  styleUrls: ['./gstuser.component.css']
})
export class GstuserComponent implements OnInit {
  gstList = [];
  gstCheck = [];
  mobileNum: any;
  checker: any;
  check: any;
  passwords:any;
  size: any;
  loanRequestidnew: any;
  userIds: any;
  retailerType:any;
  gstuserone: any;
  errormsg: any;
  // resend:bool
  gstotp: any;
  gstnumber:any;
  i:any;
  id1;any;
  id2:any;
 
  id3:any;
  gstNo:any;
  companyNames: any
  message: any;
  total: any;
  gstuser:any
  gstpassword:boolean;
  otppassflag:any;
  otppass:boolean=true;
  retailerIds:any;
  retailerTypes:any;
  retailercheck:boolean=true;
  condition: boolean = false;
  otptest: boolean = false;
  sharingTest: boolean = true;
  resend: boolean = true;
  constructor(public router: Router, private route: ActivatedRoute, private apiService: ApiService, private modalService: NgbModal, private set: breadcrumbMessage) {

  }

  ngOnInit() {
    this.gstpassword = lenderconfiguration.gstpassword;
    this.loanRequestidnew = this.route.snapshot.params['loanRequestid'];
    this.mobileNum = this.route.snapshot.params['mobileNumber'];
    this.userIds = this.route.snapshot.params['userId'];
    this.retailerIds = this.route.snapshot.params['retailerId'];
    if(this.retailerIds==7)
    {
      this.retailercheck=false;
    }
    this.retailerTypes = this.route.snapshot.params['retailerType'];
  

    //  console.log(" the loan request id is ========  "+this.loanRequestid);
    const data = {
      userId: this.userIds,
      loanRequestId: this.loanRequestidnew,
      mobileNo: this.mobileNum,
      retailerId: this.retailerIds
    }
    this.apiService.getGstlist(data).subscribe(data => {
      if (data.status == 200) {
        this.gstCheck[0] = 2;
        this.gstList = data.result.list;
       
        this.companyNames = this.gstList[0].companyName;
        this.otppassflag = this.gstList[0].otpPassFlag;
        if(this.companyNames==null||this.companyNames==undefined)
        {
          this.companyNames="";
        }
        if(this.otppassflag=="P")
        {
          this.otppass=false;
        }
        localStorage.setItem('companyNames',this.companyNames);
        this.size = this.gstList.length;
        this.errormsg='';
      }else{
        this.errormsg=data.exceptionMessage;
      }
    }, error => console.log(error));
  }
  getOTP(i,id2,id3) {
    
   
    this.gstuser = id2;
    this.gstNo=id3;
    //this.gstuserone = gstuser;
    //this.set.setOption("Funding Limit Updated Successfully",true)
    if (this.gstuser == undefined||this.gstuser==""||this.gstuser==null) {
      this.errormsg = " Please enter your user id"
    }else {
      this.errormsg ='';
      this.otptest = true;
      this.sharingTest = false;
      this.condition = false;
      const data = {
        userId: this.userIds,
        loanRequestId: this.loanRequestidnew,
        gstUser:this.gstuser,
        gstNo: this.gstNo,
        password:" "
      }
      this.apiService.getOtpgst(data).subscribe(data => {
        if (data.status == 200) {
          this.checker += 1;
          this.gstList[i].passcheck=1;
          this.gstCheck[i] = 1;
          this.gstList[i].otpcheck = 1;
          this.gstList[i].done = 0;
          this.errormsg = '';
          this.resend = false;
        }else {
          this.gstList[i].otpcheck = 0;
          this.errormsg = data.exceptionMessage;

        }
      }, error => console.log(error));

    }

  }
  password(i,id1)
  {this.gstuser=id1;
    if (this.gstuser == undefined||this.gstuser==""||this.gstuser==null) {
      this.errormsg = " Please enter your user id"
    }else{
    this.gstList[i].otpcheck=0;
    this.gstList[i].passcheck=1;
    this.gstList[i].gstcheck=0;
  }}

  verifypassword(i,id2,id3,id4) {
    this.passwords=id4;
    this.checker += 1;
    this.gstCheck[i] = 1;
    this.gstuser = id2;
    this.gstNo=id3;
    //this.gstuserone = gstuser;
    //this.set.setOption("Funding Limit Updated Successfully",true)
    if (this.passwords== ""||this.passwords==undefined||this.passwords==null) {
      this.errormsg = "please enter your password"
    }else {
      this.errormsg ='';
      this.otptest = true;
      this.sharingTest = false;
      this.condition = false;
      const data = {
        userId: this.userIds,
        loanRequestId: this.loanRequestidnew,
        gstUser:this.gstuser,
        gstNo: this.gstNo,
        password:this.passwords
      }
      this.apiService.getOtpgst(data).subscribe(data => {
        if (data.status == 200) {
          this.gstList[i].otpcheck = 1;
          this.gstList[i].done = 0;
          this.errormsg = '';
          this.resend = false;
        }else {
          this.gstList[i].otpcheck = 0;
          this.errormsg = data.exceptionMessage;

        }
      }, error => console.log(error));

    }

  }
  checked(i) {
  //  this.router.navigate(['gstotpcollection/thankyou',]); 
    this.errormsg = "Are you sure to skip this "+this.gstList[i].gstNo+" This may affect your credit score";
    this.gstList[i].status = 0;
    this.gstList[i].gstcheck = 1;
    this.gstCheck[i] = 1;

  }
  uncheck(i) {

    this.errormsg=" ";
    this.gstCheck[i] = 2;
    this.checker += 1;
    this.gstList[i].status = 1;
    this.gstList[i].gstcheck = 0;
  }
  complete() {
    // if (!(this.gstCheck.includes(2)) && (this.gstCheck.includes(3))) {
      // this.errormsg = "Success"
      // this.errormsg='';
      this.apiService.skipGstCredential(this.gstList).subscribe(data=>{
          if(data.status==200){
            
            this.router.navigate(['gstotpcollection/thankyou',this.companyNames]); 
          // this.set.setOption(data.exceptionMessage,true);
          }else{
          // this.set.setOption(data.exceptionMessage,false);
          this.errormsg=data.exceptionMessage;
          }
      });
    // } else {
      // this.errormsg = "Sharing  of atleast one Gstn is mandatory.Please click suppress for Gstns you are not willng to share";
    // }
  }

  submit(i,id1,id2,id3) { //var gstuser = (document.getElementById("gstuser") as HTMLInputElement).value;
    this.gstCheck[i] == 3;
  this.gstuser=id1;
  this.gstNo=id2;
  this.gstotp=id3;
    var gstotp = (document.getElementById("gstotp") as HTMLInputElement).value;
    if (this.gstotp == " "||this.gstotp==null||this.gstotp==undefined) {
      this.errormsg = " Please enter a valid otp"
    }
    else{
      this.errormsg=" ";
    
    const data = {
      userId: this.userIds,
      loanRequestId: this.loanRequestidnew,
      otp: this.gstotp,
      gstUser: this.gstuser,
      gstNo: this.gstNo
     
    }
    this.apiService.verifyOtpgst(data).subscribe(data => {
      if (data.status == 200) {
        //this.hello(i);
        this.errormsg = "Details shared successfully. Please proceed with other Gstn's if you have";
        this.gstList[i].done = 1;
      }else {
        this.errormsg=data.exceptionMessage;
      }
    }, error => console.log(error));
  }
  }
  hello(i) {
    const data = {
      userId: this.userIds,
      loanRequestId: this.loanRequestidnew,
      mobileNo: this.mobileNum,
      retailerId: this.retailerIds,
      loanDisbursalId: "0",
      currentActivityId: "30",
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      retailerType: this.retailerTypes,
    }
    this.apiService.saveshopVerification(data).subscribe(data => {
      if (data.status == 200) {
        this.errormsg = "Details shared successfully. Please proceed with other Gstn's if you have";
        this.gstList[i].done = 1;
      } else {
        this.errormsg = data.exceptionMessage;
      }
    }, error => console.log(error));

  }

}
