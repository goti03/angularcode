/**
 *
 *  @author Mary Vidhya
 *
 */
import { Component, OnInit , ViewChild, TemplateRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment.js';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-udhyamportal',
  templateUrl: './udhyamportal.component.html',
  styleUrls: ['./udhyamportal.component.css']
})
export class UdhyamportalComponent implements OnInit {
  orgId: any;
  enterpriseType: any;
  speciallyAbled: any;
  OwnerName: any;
  gender: any;
  closeResult = '';
  custId:any;
  retId:any;
  udyamotp:any;
  udyamotps:boolean;
  udyamMobile:any;
  udyamRegNo:any;
  city: any;
  dateOfRegistration: any;
  exclusion: any;
  netInvestmentInPme: any;
  loanId:any;
  gstnStatus: any;
  socialCategory: any;
  itrType: any
  mobile:any;
  email:any;
  financialYear: any;
  dateOfIncorporation: any;
  bank: any;
  pdfUrl:any;
  total: any;
  dateOfCommencement: any;
  road: any;
  flat: any;
  premises: any;
  interestedInTreds: any;
  block: any;
  state: any;
  pan: any;
  ifsc: any;
  female: any;
  village: any;
  others: any;
  loanRequestId: any;
  interestedInGem: any;
  netTurnover: any;
  totalTurnover: any;
  majorActivity: any;
  OrganisationType: any;
  acNo: any;
  previousITRStatus: any;
  nonStopFlag: any;

  wdvPme: any;
  name: any;
  male: any;
  udyamRegNum: any;
  otp1: string;
  otp2: string;
  otp4: string;
  otp3: string;
  otp5: string;
  otp6: string;
  err: boolean;
  message: any;
  time: any;
  otp: string;
  resent: boolean;
  timer: any;
  udyamFlag: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal,private crypto: Crypto) { }
  @ViewChild('udyam', { static: true }) udyam: TemplateRef<any>;
  ngOnInit(): void {
    this.orgId = this.route.snapshot.params['orgId'];
    this.loanId=this.route.snapshot.params['loanId'];
    this.custId=this.route.snapshot.params['custId'];
    this.retId=this.route.snapshot.params['retId'];
    this.apiService.getUdhyamDetails(this.orgId,this.loanId).subscribe(res => {
      if (res.status == 200) {
        this.pdfUrl=res.result.pdfFile
        this.enterpriseType = res.result.enterpriseType;
        this.speciallyAbled = res.result.speciallyAbled;
        this.OwnerName = res.result.OwnerName;
        this.gender = res.result.gender;
        this.city = res.result.city;
        this.dateOfRegistration = res.result.dateOfRegistration;
        this.exclusion = res.result.exclusion
        this.netInvestmentInPme = res.result.netInvestmentInPme;
        this.gstnStatus = res.result.gstnStatus;
        this.socialCategory = res.result.socialCategory
        this.orgId = res.result.orgId
        this.itrType = res.result.itrType
        this.dateOfIncorporation = moment(res.result.dateOfIncorporation).format('DD-MM-YYYY')
        this.financialYear = res.result.financialYear
        this.bank = res.result.bank
        this.total = res.result.total
        this.dateOfCommencement = moment(res.result.dateOfCommencement).format('DD-MM-YYYY')
        this.road = res.result.road
        this.flat = res.result.flat
        this.premises = res.result.premises
        this.interestedInTreds = res.result.interestedInTreds
        this.block = res.result.block
        this.state = res.result.state
        this.pan = res.result.pan
        this.ifsc = res.result.ifsc
        this.female = res.result.female
        this.village = res.result.village
        this.others = res.result.others
        this.loanRequestId = res.result.loanRequestId
        this.interestedInGem = res.result.interestedInGem
        this.netTurnover = res.result.netTurnover
        this.totalTurnover = res.result.totalTurnover
        this.majorActivity = res.result.majorActivity
        this.OrganisationType = res.result.OrganisationType
        this.acNo = res.result.acNo
        this.enterpriseType = res.result.enterpriseType
        this.previousITRStatus = res.result.previousITRStatus
        this.udyamRegNo = res.result.udyamRegNo
        this.wdvPme = res.result.wdvPme
        this.name = res.result.name
        this.male = res.result.male
        this.mobile = res.result.mobile
        this.pdfUrl=res.result.pdfFile
        this.email = res.result.email
        this.udyamFlag=res.result.udyamFlag;
        if(this.udyamFlag == 0){
          this.openUdyam(this.udyam)
        }

      }
    })

  }

viewPDF(){
  window.open(this.pdfUrl,'_blank')
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


generateUdyamOtp(content){
  if(this.udyamRegNo == '' || this.udyamRegNo == null || this.udyamRegNo == undefined){
    this.err=true;
    this.message = 'Please Enter Udyam Urn Number';
    this.clearError();
  }else if(this.udyamMobile=='' || this.udyamMobile == null || this.udyamMobile == undefined){
    this.err=true;
    this.message = 'Please Enter Mobile Number';
    this.clearError();
  }else{
  const data ={
      consent: "Y",
      pdfReq: "Y",
      mobileNo: this.udyamMobile,
      udyamRegNo: this.udyamRegNo,
      userId:this.retId,
      loanRequestId:this.loanId,
    };
    this.apiService.udyamOTPRequest(data).subscribe(data => {
      if (data.status == 200) {
        this.modalService.dismissAll()
        this.timer=10;
            this.resent = true;
            this.startTimer();
          this.modalService.open(content, { size: 'lg',backdrop: "static", keyboard: false }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      }else {
        this.err=true;
        this.message = data.exceptionMessage;
        this.clearError();
      }
    }, error => console.log(error));
    this.otp1 = '';
    this.otp2 = '';
    this.otp3 = '';
    this.otp4 = '';
    this.otp5 = '';
    this.otp6 = '';
  }
  }
  clearError() {
    this.time = setTimeout(() => {
      this.err = false;
      this.message = '';
      clearInterval(this.time);
    }, 15000);
  }

  otpverify(otpsuccess,otpfailure){
    const otp = this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
    if (otp == null || otp == undefined || otp.length != 6 || this.otp == '') {
      this.err=true;
      this.message = 'Please Enter a 6 Digit OTP';
      this.clearError();
    }else{
    const data ={
      udyamRegNo:this.udyamRegNo,
      otp:otp,
      userId:this.retId,
      orgId : this.orgId,
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      currentActivityId: '62',
      loanRequestId: this.loanId,
      userMedium:'portal'
      };
    this.apiService.verifyUdyamDetailsOTP(data).subscribe(data => {
      if (data.status == 200) {
          this.modalService.dismissAll()
          this.modalService.open(otpsuccess, { size: 'lg',backdrop: "static", keyboard: false}).result.then((result) => {        
             this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      }else{
        this.modalService.dismissAll();
        this.modalService.open(otpfailure, {size: 'lg',backdrop: "static", keyboard: false}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    }, error => console.log(error));
  }
  }
  nxtscr(){
    this.modalService.dismissAll();
    this.ngOnInit();
  }
  openUdyam(content){
    this.modalService.open(content, { size: 'lg',backdrop: "static", keyboard: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  startTimer() {
    if (this.timer > 0) {
      this.timer = Number(this.timer);
      this.time = setInterval( () => {
        this.timer --;
        clearInterval(this.time);
        this.startTimer();
      }, 600000);
    } else {
      this.resent = false;
      clearInterval(this.time);
      return;
    }

  }

  resentOtp() {
    const data = {
      mobileNumber :this.udyamMobile.toString(),
      type : '2',
      retailerId : this.retId,
      userId : this.retId,
      lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
      retailerType : '3',
      loanDisbursalId : '0',
      loanRequestId : '0',
      consent : 'Y',
      userMedium : 'portal',
      currentActivityId : '54'
    };
    this.apiService.getOtp(data).subscribe(data => {
      if (data.status == 200) {
        this.resent = true;
        this.timer= 10;
        this.startTimer();
      }else{
        this.err=true;
        this.message = data.exceptionMessage;
      }
    }, error => console.log(error));
  }
  move(a){
    document.getElementById('otp_'+ a).focus();
  }

  keyDown(event: KeyboardEvent, inputIndex: number) {
    if (event.key === "Backspace" && inputIndex > 1) {
     const previousInput = document.getElementById(`otp_${inputIndex - 1}`) as HTMLInputElement;
     const currentInput = document.getElementById(`otp_${inputIndex}`) as HTMLInputElement;
     previousInput.focus();
     previousInput.value = "";
     currentInput.value = "";
 }
 }
 keyPress(event: any) {
  const pattern = /[0-9\ ]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
}
