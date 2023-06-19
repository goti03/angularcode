import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "..//..//core/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';


@Component({
  selector: 'app-otpnow',
  templateUrl: './otpnow.component.html',
  styleUrls: ['./otpnow.component.css']
})
export class OtpnowComponent implements OnInit {

  otp1: any;
  otp2: any;
  otp3: any;
  timer: any;
  errormsg: any;
  time: any;
  confirm: any;
  resent: boolean = true;
  otp4: any;
  routing:any;
  href: string = "";

  otp: any;
  constructor(public router: Router, private route: ActivatedRoute, private apiService: ApiService, private modalService: NgbModal, private set: breadcrumbMessage) { }

  ngOnInit() {
    this.href = this.router.url;
    this.timer = 45;
    this.startTimer();
    this.confirm = 3;
    if(this.href.includes("new-lead"))
    {
      this.routing=1;

  }
  else{
    this.routing=2;
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

  verifyOTP() {
    var otp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
    if (otp == null || otp == undefined || otp.length != 4 || this.otp == "" || !this.otp1 || !this.otp2 || !this.otp3 || !this.otp4) {
      this.errormsg = "Please Enter a 4 Digit OTP"
    }
    else if (this.confirm != 1) {
      this.errormsg = "Please Agree to the Consent Stated Below";
    }

    else {
      this.errormsg = "";
      const data = {
        mobileNo: window.localStorage.getItem('mobileNob'),
        OTP: Number(otp),
        // type: '1',
        lastActivityTime: moment().format('YYYY-MM-DD'),
        // userId:'425',
        // retailerId: '390',
        // currentActivityId: '1',
        // loanRequestId: '0',
        // loanDisbursalId: '0',
        // karzaRequestId: '0',
        // retailerType : '3',
        // userMedium: 'lead'
      }
      this.apiService.VerifyotpLMS(data).subscribe(data => {
        if (data.status == 200) {



         if(this.routing==2)
        {
       this.router.navigate(['newlead/detailsnow']);
        }
        else if(this.routing==1)
        {
         this.router.navigate(['new-lead/detailsnow']);
        }

        } else {
          this.errormsg = data.exceptionMessage;

        }

      }, error => console.log(error));
    }
  }

  confirms() {
    console.log("i am ticked");
    if (this.confirm == 3) {
      this.confirm = 1;
    }
    else if (this.confirm == 1) {
      this.confirm = 3
    }
 


  }
  generateOTP() {
    const data = {
      mobileNo: window.localStorage.getItem('mobileNob'),
      // type : '1',
      // lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
      // userId:'425',
      // retailerId:'390',
      // retailerType : '3',
      // loanDisbursalId : '0',
      // loanRequestId : '0',
      // consent : 'Y',
      // userMedium:"lead",
      // currentActivityId : '54'
  
    }
    this.apiService.sendotplLMS(data).subscribe(data => {
      if (data.status == 200) {

        this.errormsg = "";
        this.resent = true;
        this.timer = 45;
        this.startTimer();

      } else {
        this.errormsg = data.exceptionMessage;
      }

    }, error => console.log(error));
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

