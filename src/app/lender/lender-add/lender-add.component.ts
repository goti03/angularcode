import { Component, OnInit } from '@angular/core';
import { Lender } from '../lenderModel';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '..//../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-lender-add',
  templateUrl: './lender-add.component.html',
  styleUrls: ['./lender-add.component.css']
})
export class LenderAddComponent implements OnInit {
  lender: Lender = new Lender();
  submitted = false;
  bankList = [];
  stateList = [];
  bankBranch="";
  bankName="";
accountNo="";
ifscCode="";
registrationNo="";
  userId:any;

  constructor(private router: Router, private apiService: ApiService, private set: breadcrumbMessage,
    private crypto: Crypto) { }


  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));

    this.submitted = false;
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

  save() {
    this.apiService.createLenderSetup(this.lender)
      .subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Successfully added", true);
          this.lender = new Lender();
          this.gotoList();
          // console.log(data)
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));

  }

  onSubmit() {
   
    this.lender.activeInd = "Y";
    let curdate = moment().format('YYYY-MM-DD HH:mm:ss');
    let newDate2 = new Date(curdate);
    this.lender.createdOn = newDate2;
    this.lender.createdBy = this.userId;
    this.submitted = true;
    this.lender.ifscCode = this.lender.ifscCode != undefined ? this.lender.ifscCode.toUpperCase() : '';
    this.lender.panNo = this.lender.panNo.toUpperCase();
    this.lender.gstNo = this.lender.gstNo.toUpperCase();
    if (!this.pangst()) {
      this.set.setOption("PAN and GSTN are not matching. Please provide valid Number.", false);
      return;
    }else if(this.lender.accountNo&&(this.lender.accountNo.length<5 || this.lender.accountNo.length>18)){
      console.log("the account number is invalid")
      this.set.setOption("please enter a valid account number",false);
      return;
    }else if (this.lenderaddForm.invalid) {
      this.set.setOption("Please Enter all Mandatory Fields", false);
      return;
    }else if(this.lender.bankName && this.set.validateSpecialChar(this.lender.bankName)){
      this.set.setOption("Special Character Not Allowed", false);
    }else if( this.set.validateSpecialChar(this.lender.lenderName)){
      this.set.setOption("Special Character Not Allowed", false);
    }else if(this.set.validateSpecialChar(this.lender.contactName)){
      this.set.setOption("Special Character Not Allowed", false);
    }else if( this.set.validateSpecialChar(this.lender.lenderAddress)){
      this.set.setOption("Special Character Not Allowed", false);
    }else if( this.set.validateSpecialChar(this.lender.ifscCode)){
      this.set.setOption("Special Character Not Allowed", false);
    }else if( this.set.validateSpecialChar(this.lender.bankBranch)){
      this.set.setOption("Special Character Not Allowed", false);
    }else if( this.set.validateSpecialChar(this.lender.billingState)){
      this.set.setOption("Special Character Not Allowed", false);
    }else if( this.set.validateSpecialChar(this.lender.registrationNo)){
      this.set.setOption("Special Character Not Allowed", false);

    }else {
      // alert("success");

      // console.log(this.lender);
      this.save();
    }

  }

  gotoList() {
    window.localStorage.setItem("programkey","create");
    this.router.navigate(['lender/list']);
  }

  gstMatch = new RegExp("^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[A-Za-z0-9]{1}[Zz]{1}[A-Za-z0-9]{1}");
  panMatch = new RegExp("^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}");
  phoneMatch = new RegExp("[0-9]{10}")
  alphNumeric = new RegExp("[^a-zA-Z0-9]")

  lenderaddForm = new FormGroup({
    lenderName: new FormControl('', [Validators.required]),
    lenderContact: new FormControl('', [Validators.required]),
    lenderAddress: new FormControl('', [Validators.required]),
    certificateNo: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern(this.phoneMatch)]),
    bankName: new FormControl(''),
    branchName: new FormControl(''),
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
