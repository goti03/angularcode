import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ApiService } from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { AppDateAdapter, APP_DATE_FORMATS } from "..//..//core/date.adapter";
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { FocusKeyManager } from '@angular/cdk/a11y';
import { data } from 'jquery';
import { dateFormats } from 'highcharts';
import { breadcrumbMessage } from '..//../shared/breadcrumb-message.service'
import { Crypto } from '../../shared/crypto.service';
import { lenderconfiguration } from '../../../environments/lender.config';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styles: [
    `
      .custom-day {
        text-align: center;
        padding: 0.185rem 0.25rem;
        display: inline-block;
        height: 2rem;
        width: 2rem;
      }
      .custom-day.focused {
        background-color: #e6e6e6;
      }
      .custom-day.range,
      .custom-day:hover {
        background-color: #0275d8;
        color: white;
      }
      .faded {
        opacity: 0.5;
      }
      .weekend {
        background-color: #242a33;
        border-radius: 1rem;
        color: white;
      }
      .hidden {
        display: none;
      }
      .invalid-feedback {
        display: block;
      }
      .box-size{
        width: 250px;
      }
    `
  ],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
  // styleUrls: ['./master-add.component.css']
})
export class UserAddComponent implements OnInit {
  organisationList = [];
  lenderList = [];
  roleList = [];
  orgType = [{ id: '1', name: 'Anchor/Distributer' }, { id: '2', name: 'Lender' }, { id: '3', name: 'Sales Person' }];
  orgTypeId: any = '0';
  orgId: any = '0';
  lenderId: any = '0';
  roleId: any = 0;
  mobileNo: any;
  num:any;
  fieldTextType: boolean = false;
  fieldTextTypes: boolean = false;
  firstName: any;
  userName: any;
  emailId:any;
  password: any;
  confirmPassword: any;
  message: any;
  userId: any;
  // registerForm: FormGroup;
  // submitted = false;
 
  passMatch = new RegExp("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\@\#\$\%\^\&\*\.\,\:]).{12,25})");
  constructor(private router: Router, private apiService: ApiService, private set: breadcrumbMessage, private crypto: Crypto,private formBuilder: FormBuilder) { }
  // registerForm = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required]),
  //   remember: new FormControl()
  // });
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));

    this.apiService.getAnchorAndDistributerList().subscribe(data => {
      if (data.status == 200) {
        this.organisationList = data.result;
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => { console.log(error.message); });

    this.apiService.getUserLenderList().subscribe(data => {
      if (data.status == 200) {
        this.lenderList = data.result;
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => { console.log(error.message); });

    this.apiService.getroleList().subscribe(data => {
      if (data.status == 200) {
        this.roleList = data.result;
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => { console.log(error.message); });
  }

  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  setOrgId() {
    for (let l of this.lenderList) {
      if (l.lenderId == this.lenderId) {
        this.orgId = l.orgId;
        break;
      }
    }
  }
  toggleFieldTextType() {
    console.log("password is invisible");
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypesc() {
    console.log("password is invisible");
    this.fieldTextTypes = !this.fieldTextTypes;
  }


  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  signin() {
    this.router.navigate(['/authentication/login']);
  }

  signUp() {
    this.message = "";
    if (this.isNullorUndefinedorEmpty(this.orgTypeId)) {
      this.set.setOption("Please Choose Org Type", false);
    } else if (this.isNullorUndefinedorEmpty(this.orgId) && this.orgTypeId != '2') {
      this.set.setOption("Please Choose Organisation", false);
    } else if (this.isNullorUndefinedorEmpty(this.lenderId) && this.orgTypeId == '2') {
      this.set.setOption("Please Choose Lender", false);
    } else if (this.isNullorUndefinedorEmpty(this.roleId) && this.orgTypeId != '3') {
      this.set.setOption("Please Choose Role", false);
    } else if (this.isNullorUndefinedorEmpty(this.mobileNo)) {
      this.set.setOption("Please Enter valid Mobile No", false);
    } else if (this.mobileNo.length != 10) {
      this.set.setOption("Invalid Mobile No", false);
    } else if (this.isNullorUndefinedorEmpty(this.firstName)) {
      this.set.setOption("Please Enter First Name", false);
    } else if (this.isNullorUndefinedorEmpty(this.userName)) {
      this.set.setOption("Please Enter User Name", false);
    } else if (this.userName.length < 4) {
      this.set.setOption("Username length must be atleast 4 characters", false);
    } else if (this.isNullorUndefinedorEmpty(this.password)) {
      this.set.setOption("Please Enter password", false);
    } else if (!this.passMatch.test(this.password)) { 
        this.set.setOption("Password must contain atleast one upper,lower,numeric,special character minimum length 12", false); 
    }else if (this.isNullorUndefinedorEmpty(this.confirmPassword)) {
        this.set.setOption("Please Confirm password", false);
    } else if (this.confirmPassword != this.password) {
        this.set.setOption("Passwords did not match", false);
    } else {
        const data = {
          roleId: this.roleId,
          userId: this.userId,
          lenderId: this.lenderId,
          orgId: this.orgId,
          mobileNo: this.mobileNo,
          firstName: this.firstName,
          // userName: this.userName,
          // password: this.password,
          t:this.crypto.encryt(this.userName+lenderconfiguration.spliterKey+this.password),
          orgTypeId: this.orgTypeId
        }
        this.apiService.createNewUser(data).subscribe(data => {
          if (data.status == 200) {
            this.apiService.newuserNotification(this.emailId,this.firstName,this.userName,this.password).subscribe(res => this.num = res.result);
   
         
            this.set.setOption(data.exceptionMessage, true);
            window.localStorage.setItem("programkey", "created");
            this.router.navigate(['/user/user']);
          } else {
            this.set.setOption(data.exceptionMessage, false);
          }
        }, error => { console.log(error.message); });
      }
  }

}
