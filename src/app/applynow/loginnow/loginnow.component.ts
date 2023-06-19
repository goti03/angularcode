import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "..//..//core/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
@Component({
  selector: 'app-loginnow',
  templateUrl: './loginnow.component.html',
  styleUrls: ['./loginnow.component.css']
})
export class LoginnowComponent implements OnInit {

  mobilenumber: any;
  resultlist: any;
  smedashboard:boolean=false;
  errormsg: any;
  routing:any;
  href: string = "";
  sme:any;
  truth: boolean = true;

  constructor(public router: Router, private route: ActivatedRoute, private apiService: ApiService, private modalService: NgbModal, private set: breadcrumbMessage) { }

  ngOnInit() {
    this.href = this.router.url;
    window.localStorage.setItem("fromSme","1");
    if(this.href.includes("new-lead"))
    {
      this.routing=1;

  }

  else{
    this.routing=2;
  }
this.sme=0;
if(this.sme=="1")
{
this.smedashboard=true;
}
console.log("the sme is==="+this.sme);
  }


  generateOTP() {
    if (this.mobilenumber == null || this.mobilenumber == undefined || this.mobilenumber == "" || this.mobilenumber.length != 10) {
      this.errormsg = "Please Enter a 10 Digit Mobile Number";
    }
    else {
//8123457998
      this.errormsg = "";
      const data = {
        mobileNo: this.mobilenumber,
        sendOtp:"false"
      //   type : '1',
      //   lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
      //   userId:'425',
      //   retailerId:'390',
      //   retailerType : '3',
      //   loanDisbursalId : '0',
      //   loanRequestId : '0',
      //   consent : 'Y',
      //   userMedium:"lead",
      //   currentActivityId : '54'
      // }
      }
      this.apiService.sendotplLMS(data).subscribe(data => {
        if (data.status == 200) {
   

           window.localStorage.setItem('mobileNob', this.mobilenumber);
       
           if(this.routing==2)
           {
          this.router.navigate(['newlead/detailsnow']);
           }
           else if(this.routing==1)
           {
            this.router.navigate(['new-lead/detailsnow']);
           }

        }
        else {
          this.errormsg = data.exceptionMessage;

        }

      }, error => console.log(error));
    }
  }

gotoSMEDashboard()
{
  window.open( "https://uat.finagg.in:8228/finaggx/#/sme","_self");
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


