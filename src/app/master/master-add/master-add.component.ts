import { Component, OnInit } from '@angular/core';
import { Master } from '../masterModel';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { NgbDateStruct , NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ApiService} from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { AppDateAdapter, APP_DATE_FORMATS} from "..//..//core/date.adapter";
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { Currency } from '../../shared/currency.service';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { data } from 'jquery';
import { dateFormats } from 'highcharts';
import {breadcrumbMessage} from '..//../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

const my = new Date();
@Component({
  selector: 'app-master-add',
  templateUrl: './master-add.component.html',
  // providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
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
export class MasterAddComponent implements OnInit {
  master: Master = new Master();
  submitted = false;
  showb:boolean=true;
  model: NgbDateStruct;
  model2: NgbDateStruct;
  navigationSubscription: any;
  // masterMatch = new RegExp("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,15})");

  get today() {
    return new Date();
  }
  userId:any;
  constructor(private router: Router,private apiService: ApiService, private fb : FormBuilder,
     private set : breadcrumbMessage,private crypto: Crypto,public currency: Currency
    ) {   }
  
    convertHtmlToText(){
       var str = 'Retailer Finance1<script>alert(123)</script>';
      //  str = str.toString();
      return str.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, '');
    }
    preventTyping() {
      return false;
    }
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    console.log("crypto data::"+this.crypto.decryt('Ys1bmtP9DDiAhJ7fSWl4rg=='));
    console.log("data::"+this.convertHtmlToText());
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.submitted = false;
  }

  save() {
    
    this.master.activeInd="Y";
    let curdate=moment().format('YYYY-MM-DD HH:mm:ss');
    let newDate2 = new Date(curdate); 
    this.master.createdOn= newDate2;
    this.master.createdBy=this.userId;
    this.apiService.createMasterSetup(this.master)
      .subscribe(data => {
        if(data.status==200){
          this.set.setOption("Successfully added",true);
          this.master = new Master();
          this.gotoList();
          // console.log(data)
        }else{
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
    // }
  }

  showlimits()
  {console.log("I am called for truth")
   if(this.showb==true)
   {
     this.showb=false;
  }
  else
  {
    this.showb=true;
  }
}
  onSubmit() {
    this.submitted = true;
    if(this.validation.invalid){
      this.set.setOption("Enter all Mandatory Fields",false);
      return;
    }else if(this.set.validateSpecialChar(this.master.masterName)){
      this.set.setOption("Special Characters Not Allowed",false);
      return;
    }else{
      
      this.submitted = false;
      // alert("success");
      this.save();
    }
        
  }


  gotoList() {
    window.localStorage.setItem("programkey", "create");
    this.router.navigate(['master/list']);
  }

  dateMatch = new RegExp("^[1-9][0-9]{3}([0][1-9]||[1][0-2])([0][1-9]||[1-2][0-9]||[3][0-2])");

  validation = this.fb.group({
    name : new FormControl('',[Validators.required]),
      startDate : new FormControl('',[Validators.required, Validators.pattern(this.dateMatch), this.currentdateValidator]),
      endDate : new FormControl('',[Validators.required, Validators.pattern(this.dateMatch)]),
    limit : new FormControl('',[this.checkLimit])
  }, {validator : this.startendcheckDate})

  checkLimit(control : AbstractControl) {
    if(control.value>0)
    {
      return null;
    }
    else
    {
      return {
        "checkLimit" : true
      }
    }
  }

  currentdateValidator(control: AbstractControl) {
    var date = new Date();
    var sDate = new Date(control.value);
    if( date >= sDate )
    {
      return null;
    }
    else
    {
    return {
      "currentdateValidator": true
    }
  }
    
  }

  startendcheckDate(control: AbstractControl) {
    if(new Date(control.get('endDate').value) > new Date(control.get('startDate').value))
    {
      control.get('endDate').setErrors(null);
    return;
    }
    else
    {
      control.get('endDate').setErrors({"startendcheckDate" : true});
      return;
    }
  }
 indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
}
