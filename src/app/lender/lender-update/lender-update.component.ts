import { Component, OnInit } from '@angular/core';
import { Lender } from '../lenderModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-update-lender',
  templateUrl: './lender-update.component.html',
  styleUrls: ['./lender-update.component.css']
})
export class LenderUpdateComponent implements OnInit {

  id: number;
  lender: Lender;
  stateList = [];
  bankList = [];
  submitted: any;
  bankBranch="";
  bankName="";
accountNo="";
ifscCode="";
registrationNo="";
  userId:any;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,
     private set: breadcrumbMessage,private crypto: Crypto) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.lender = new Lender();
    this.submitted = false;
 
    this.id = this.route.snapshot.params['id'];

    this.apiService.getLenderSetup(this.id)
      .subscribe(data => {
        if (data.status == 200) {
          this.lender = data.result;
          this.lender.bankBranch = data.result.bankBranch;
          console.log("the nee data os===+" , this.lender.bankBranch )
        } else {
          this.set.setOption("Failed to load data", false);

          // alert(data.exceptionMessage);
        }
      }, error => console.log(error));

    this.apiService.getBankNameList().subscribe(data => {
      if (data.status = 200) {
        this.bankList = data.result;
        // console.log(this.bankList);
      }
      else {

      }
    })
    this.apiService.getStateList().subscribe(data => {
      if (data.status == 200) {
        this.stateList = data.result;
      }
      else {

      }
    })
  }


  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  smallAlpha(event: any) {
    const pattern = /[a-z\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  updateLender() {
    this.lender.activeInd = "Y";
    let curdate = moment().format('YYYY-MM-DD HH:mm:ss');
    let newDate2 = new Date(curdate);
    this.lender.createdOn = newDate2;
    this.lender.createdBy = this.userId;
  this.apiService.updateLenderSetup(this.id, this.lender)
      .subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Successfully updated", true);
          this.lender = new Lender();
          this.gotoList();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));

  }

  onSubmit() {
    // alert("this.lender.lenderName=="+this.lender.lenderName);
    // if (this.lender.lenderName == null || this.lender.lenderName == '') {
    //   alert("Please enter lender name");
    // } else if (this.lender.lenderAddress == null || this.lender.lenderAddress == '') {
    //   alert("Please enter lender address");
    // } else if (this.lender.contactName == null || this.lender.contactName == '' ) {
    //   alert("Please enter lender contact");
    // } else if (this.lender.certificateNo == null || this.lender.certificateNo == '') {
    //   alert("Please enter lender certificate no");
    // } else if (this.lender.mobileNo == null ) {
    //   alert("Please enter lender mobile no");
    // }else if (this.lender.billingState == null || this.lender.billingState == '') {
    //   alert("Please enter lender billing State ");
    // } else if (this.lender.panNo == null || this.lender.panNo == '') {
    //   alert("Please enter lender panNo ");
    // } else if (this.lender.gstNo == null || this.lender.gstNo == '') {
    //   alert("Please enter lender gstNo ");
    // } else{
    //   // alert("Sucess");
    //   this.updateLender();
    // }
    this.submitted = true;
    this.lender.ifscCode = this.lender.ifscCode != undefined ? this.lender.ifscCode.toUpperCase() : '';
    this.lender.panNo = this.lender.panNo.toUpperCase();
    this.lender.gstNo = this.lender.gstNo.toUpperCase();
 
    if(this.lender.accountNo&&(this.lender.accountNo.length<5 || this.lender.accountNo.length>18))
    {console.log("the account number is invalid")
      this.set.setOption("please enter a valid account number",false);
      return;
    }else if (!this.pangst()) {
      this.set.setOption("PAN and GSTN are not matching. Please provide valid Number.", false);
      return;
    }else if (this.lenderupdateForm.invalid) {
      this.set.setOption("Please Enter all Mandatory Fields", false);
      return;
    }else if(this.lender.bankName && this.set.validateSpecialChar(this.lender.bankName)){
      this.set.setOption("Special Character Not Allowed", false);
      return;
    }else if( this.set.validateSpecialChar(this.lender.lenderName)){
      this.set.setOption("Special Character Not Allowed", false);
      return;
    }else if( this.set.validateSpecialChar(this.lender.contactName)){
      this.set.setOption("Special Character Not Allowed", false);
      return;
    }else if( this.set.validateSpecialChar(this.lender.lenderAddress)){
      this.set.setOption("Special Character Not Allowed", false);
      return;
    }else if( this.set.validateSpecialChar(this.lender.ifscCode)){
      this.set.setOption("Special Character Not Allowed", false);
      return;
    }else if( this.set.validateSpecialChar(this.lender.bankBranch)){
      this.set.setOption("Special Character Not Allowed", false);
      return;
    }else if( this.set.validateSpecialChar(this.lender.billingState)){
      this.set.setOption("Special Character Not Allowed", false);
      return;
    }else if( this.set.validateSpecialChar(this.lender.registrationNo)){
      this.set.setOption("Special Character Not Allowed", false);
      return;
    }else {
      // alert("success");
      this.submitted = false;
      this.updateLender();
    }

  }

  gotoList() {  
    window.localStorage.setItem("programkey","updated");

    this.router.navigate(['lender/list']);
  }

  gstMatch = new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}");
  panMatch = new RegExp("^[A-Z]{5}[0-9]{4}[A-Z]{1}");
  phoneMatch = new RegExp("[0-9]{10}")

  lenderupdateForm = new FormGroup({
    lenderName: new FormControl('', [Validators.required]),
    lenderContact: new FormControl('', [Validators.required]),
    lenderAddress: new FormControl('', [Validators.required]),
    certificateNo: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern(this.phoneMatch)]),
    bankName: new FormControl(''),
    bankBranch: new FormControl(''),
    accountNo: new FormControl(''),
    ifscCode: new FormControl(''),
    registrationNo: new FormControl(''),
    billingState: new FormControl('', [Validators.required]),
    panNo: new FormControl('', [Validators.required, Validators.pattern(this.panMatch)]),
    gstNo: new FormControl('', [Validators.required, Validators.pattern(this.gstMatch)]),
  })

  pangst() {
    if (this.lender.gstNo.includes(this.lender.panNo)) {
      return true;
    } else {
      return false;
    }
  }

}
