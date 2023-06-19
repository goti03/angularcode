import { Component, OnInit } from '@angular/core';
import { Sourcing } from '../sourcingModel';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService} from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { data } from '../../dashboards/dashboard3/smart-data-table';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-sourcing-add',
  templateUrl: './sourcing-add.component.html',
  styleUrls: ['./sourcing-add.component.css']
})
export class SourcingAddComponent implements OnInit {
  sourcing: Sourcing = new Sourcing();
  submitted = false;
  bankList = [];
  city ="";
  cityList:any;
  state ="";
  stateList=[];
  invalidPin = false;
  userId:any;
  constructor(private router: Router,private apiService: ApiService, private crypto: Crypto,
    private set : breadcrumbMessage) { }


  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.apiService.getStateList().subscribe(data => { this.stateList = data.result });
    // this.apiService.getSourcingStateList().subscribe(data=>
    //   {
    //     if(data.status=200)
    //     {
    //       this.stateList = data.result;
    //       // console.log(this.bankList);
    //     }
    //     else
    //     {
      
    //     }
    //   });
  this.apiService.getBankNameList().subscribe(data => {
  if(data.status=200)
  {
    this.bankList = data.result;
    // console.log(this.bankList);
  }
  else
  {

  }
})
 
    this.submitted = false;

  }

  save() {
    this.stateandcity();
    this.sourcing.activeInd="Y";
    let curdate=moment().format('YYYY-MM-DD HH:mm:ss');
    let newDate2 = new Date(curdate); 
    this.sourcing.createdOn= newDate2;
    this.sourcing.createdBy=this.userId;

    this.apiService.createSourcingSetup(this.sourcing)
      .subscribe(data => {
        if(data.status== 200){
        console.log(data);
        this.set.setOption("Successfully added",true);
        this.sourcing = new Sourcing();
    this.gotoList();
        }else{
        alert(data.exceptionMessage);
        }
    }, error => console.log(error));
    
  }

  keyPress(event: any) {
    // alert(event);
    this.invalidPin = false;
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  newkeyPress(event: any) {
    // alert(event);
    this.invalidPin = false;
    const input = event.key;
    const currentValue = (event.target as HTMLInputElement).value;
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (currentValue.length >= 3||input === '-' ||event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  setCityValue(value) {
    this.apiService.getCityListBystatetid(value).subscribe(data => {
      this.cityList = data.result;
    });
  }
  stateandcity()
  {var i
   
    for(i=0;i< this.stateList.length;i++)
    {
      if(this.stateList[i].stateId==this.sourcing.state)
      {
        this.sourcing.state=this.stateList[i].stateName
      }
    }
  }
  selectcity(data){
    // this.apiService.getSourcingCityList(data).subscribe(data=>{this.cityList = data.result;});
    this.apiService.getCityListBystatetid(data).subscribe(data=>{this.cityList = data.result;});
  }

  pin(value) {
    this.invalidPin = false;
    this.apiService.getAddressByPincode(value).subscribe(
      data => {
        if(data.status=200)
        {
          if(data.result[0] != null)
          {
            this.city = data.result[0].cityName;
            this.state = data.result[0].stateName;
          }
          else
          {
            this.invalidPin = true;
          }
        }
        else{

        }
      }
    )
  }

  onSubmit() {
   
    /*
    
    if (this.sourcing.sourcingName == null || this.sourcing.sourcingName == '') {
      alert("Please enter sourcing partner name");
    }else  if (this.sourcing.address == null || this.sourcing.address == '') {
      alert("Please enter sourcing partner address");
    } else  if (this.sourcing.contactName == null || this.sourcing.contactName == '') {
      alert("Please enter contact name");
    }else  if (this.sourcing.city == null || this.sourcing.city == '') {
      alert("Please enter city");
    } else  if (this.sourcing.state == null || this.sourcing.state == '') {
      alert("Please enter state");
    }else  if (this.sourcing.mobileNo == null) {
      alert("Please enter mobile number");
    } else  if (this.sourcing.pincode == null || this.sourcing.pincode == '') {
      alert("Please enter state");
    } else  if (this.sourcing.billingState == null || this.sourcing.billingState == '') {
      alert("Please enter billing state");
    } else  if (this.sourcing.panNo == null || this.sourcing.panNo == '') {
      alert("Please enter pan No");
    } else  if (this.sourcing.gstNo == null || this.sourcing.gstNo == '') {
      alert("Please enter gst No");
    }   else {
      // alert("Success");
      this.submitted = true;
      this.save();
    }
    */
    console.log("the data is ==="+JSON.stringify(this.sourcing))
   if(this.sourceaddForm.invalid){
     this.set.setOption("Please Enter all Mandatory Fields",false);
      return;
   }else if(!this.sourcing.gstNo.includes(this.sourcing.panNo)){
      this.set.setOption("PAN number & GST number not match",false);
      return;
    }else if (this.set.validateSpecialChar(this.sourcing.bankName)) {
      this.set.setOption("Special Characters Not Allowed",false);
      return;
    }else if (this.set.validateSpecialChar(this.sourcing.bankName)) {
      this.set.setOption("Special Characters Not Allowed",false);
      return;
    }else if (this.set.validateSpecialChar(this.sourcing.bankName)) {
      this.set.setOption("Special Characters Not Allowed",false);
      return;
   }else{
    //  alert("success");
    this.submitted = true;
    this.save();
 
   }

  }

  gotoList() {
    window.localStorage.setItem("programkey","create");
    this.router.navigate(['sourcing/list']);
  }

  gstMatch = new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}");
  panMatch = new RegExp("^[A-Z]{5}[0-9]{4}[A-Z]{1}");
  phoneMatch = new RegExp("[0-9]{10}");
  pincodeMatch = new RegExp("[0-9]{6}");
  

  sourceaddForm = new FormGroup({
    spName : new FormControl('',[Validators.required]),
    address : new FormControl('',[Validators.required]),
    contactName : new FormControl('',[Validators.required]),
    mobileNo : new FormControl('',[Validators.required, Validators.pattern(this.phoneMatch)]),
    city : new FormControl('',[Validators.required]),
    state : new FormControl(''),
    landMark : new FormControl(''),
    pinCode : new FormControl('',[Validators.required,  Validators.pattern(this.pincodeMatch)]),
    emailId : new FormControl(''),
    bankName : new FormControl(''),
    branchName : new FormControl(''),
    accountNo : new FormControl(''),
    ifscCode : new FormControl(''),
    anchorCode : new FormControl('',[Validators.required]),
    registrationNo : new FormControl(''),
    billingState : new FormControl('',[Validators.required]),
    panNo : new FormControl('',[Validators.required, Validators.pattern(this.panMatch)]),
    gstNo : new FormControl('',[Validators.required, Validators.pattern(this.gstMatch)]),
    staleDays:new FormControl('')
  })

  alphakeyPress(event: any) {
    const pattern = /[a-zA-Z]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }

} 
}

// getBankNameList
// getAddressByPincode