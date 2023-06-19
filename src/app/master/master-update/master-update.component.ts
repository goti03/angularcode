import { Component, OnInit } from '@angular/core';
import { Master } from '../masterModel';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct , NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ApiService} from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {breadcrumbMessage} from '..//../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';
import { Currency } from '../../shared/currency.service';
const my = new Date();

@Component({
  selector: 'app-update-master',
  templateUrl: './master-update.component.html',
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
      .box-size{
        width: 250px;
      }
      .invalid-feedback {
        display: block;
      }
    `
  ]
})
export class MasterUpdateComponent implements OnInit {

  id: number;
  master: Master;
  model: NgbDateStruct;
  model2: NgbDateStruct;
  submitted:boolean=false;
  showb:boolean=true;
  // masterMatch = new RegExp("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,15})");

  get today() {
    return new Date();
  }
  userId:any;
  constructor(private route: ActivatedRoute,private router: Router,
          private apiService: ApiService,
          private crypto: Crypto,
    private datePipe: DatePipe, private fb : FormBuilder, private set : breadcrumbMessage,public currency: Currency) { }

    preventTyping() {
      return false;
    }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.master = new Master();

    this.id = this.route.snapshot.params['id'];
    this.apiService.getMasterSetup(this.id)
    .subscribe(data => {
    if(data.status== 200){
      this.master = data.result;
      console.log("this.master::"+JSON.stringify(this.master));
    }else{
      this.set.setOption("Failed to load data",false);

      // alert(data.exceptionMessage);
    }
    }, error => console.log(error)); 
  }

  updateMaster() {
   
    this.master.activeInd="Y";
    let curdate=moment().format('YYYY-MM-DD HH:mm:ss');
    let newDate2 = new Date(curdate); 
    this.master.createdOn= newDate2;
    this.master.createdBy=this.userId;
    this.apiService.updateMasterSetup(this.id, this.master)
      .subscribe(data =>{
        if(data.status==200){
          this.set.setOption("Updated Successfully",true);
          this.master = new Master();
          this.gotoList();
        }else{
          this.set.setOption(data.exceptionMessage,false);
        }
      } , error => console.log(error));
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
      
      this.updateMaster();
    }
  }
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  gotoList() {
    window.localStorage.setItem("programkey", "updated");
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
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
}
