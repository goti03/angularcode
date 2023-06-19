import { Component, OnInit } from '@angular/core';
import { Sourcing } from '../sourcingModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService} from "..//..//core/api.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'

@Component({
  selector: 'app-update-sourcing',
  templateUrl: './sourcing-update.component.html',
  styleUrls: ['./sourcing-update.component.css']
})
export class SourcingUpdateComponent implements OnInit {

  bankList = [];
  id: number;
  sourcing: Sourcing;
  submitted:boolean;
  cityList:any;
  stateList:any;
  constructor(private route: ActivatedRoute,private router: Router,
    private apiService: ApiService, private set : breadcrumbMessage) { }

  ngOnInit() {

    this.sourcing = new Sourcing();

    this.id = this.route.snapshot.params['id'];
    
      this.apiService.getSourcingSetup(this.id)
    .subscribe(data => {
    if(data.status== 200){
      this.sourcing = data.result;
    }else{
      alert(data.exceptionMessage);
    }
    }, error => console.log(error));
    this.apiService.getSourcingStateList().subscribe(data=>
      {
        if(data.status==200)
        {
          this.stateList = data.result;
          var i
      for(i=0;i< this.stateList.length;i++)
      {console.log("the state name is ==="+this.sourcing.state.toString().toUpperCase())
        if(this.stateList[i].stateName==this.sourcing.state.toString().toUpperCase())
        {
          this.sourcing.state=this.stateList[i].stateId
        }
      }
          // console.log(this.bankList);
        }
        else
        {
      
        }
        this.apiService.getSourcingCityList(this.sourcing.state).subscribe(data=>
          {
            if(data.status=200)
            {
              this.cityList = data.result;
              for(i=0;i< this.stateList.length;i++)
              {console.log("the state name is ==="+this.sourcing.city.toString().toUpperCase())
                if(this.stateList[i].cityName==this.sourcing.city.toString().toUpperCase())
                {
                  this.sourcing.city=this.stateList[i].stateId
                }
              }
              // console.log(this.bankList);
            }
            else
            {
          
            }
          });
        
      });
   
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
    
  }
  stateandcity()
  {var i
   
    for(i=0;i< this.stateList.length;i++)
    {console.log("the state name is ==="+this.sourcing.state.toString().toUpperCase())
      if(this.stateList[i].stateId==this.sourcing.state)
      {
        this.sourcing.state=this.stateList[i].stateName
      }
    }
  }

  pin(value) {
    this.apiService.getAddressByPincode(value).subscribe(
      data => {
        if(data.status=200)
        {
          this.sourcing.city = data.result[0].cityName;
          this.sourcing.state = data.result[0].stateName;
        }
        else{

        }
      }
    )
  }

  updateSourcing() {
    this.apiService.updateSourcingSetup(this.id, this.sourcing)
      .subscribe(data => {
        if(data.status==200){
          this.set.setOption("Successfully updated",true);
          this.sourcing = new Sourcing();
          this.gotoList();
        }else{
          this.set.setOption(data.exceptionMessage,false);
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

  onSubmit() {
    this.stateandcity();
    if(this.sourceupdateForm.invalid){
      this.set.setOption("Please Enter all Mandatory Fields",false);
      return;
  
 
    }else{
     this.submitted=true;
     this.updateSourcing();
    }
  }

  gotoList() {
    window.localStorage.setItem("programkey","updated");
    this.router.navigate(['sourcing/list']);
  }
  selectcity(data)
  {console.log("the changer is called")
    this.apiService.getSourcingCityList(data).subscribe(data=>
      {
        if(data.status=200)
        {
          this.cityList = data.result;
          // console.log(this.bankList);
        }
        else
        {
      
        }
      });
  }

  gstMatch = new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}");
  panMatch = new RegExp("^[A-Z]{5}[0-9]{4}[A-Z]{1}");
  phoneMatch = new RegExp("[0-9]{10}");
  pincodeMatch = new RegExp("[0-9]{6}");

  sourceupdateForm = new FormGroup({
    spName : new FormControl('',[Validators.required]),
    address : new FormControl('',[Validators.required]),
    contactName : new FormControl('',[Validators.required]),
    mobileNo : new FormControl('',[Validators.required, Validators.pattern(this.phoneMatch)]),
    city : new FormControl('',[Validators.required]),
    state : new FormControl('',[Validators.required]),
    landMark : new FormControl(''),
    pinCode : new FormControl('',[Validators.required, Validators.pattern(this.pincodeMatch)]),
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

  stalekeyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    const input = event.key;
    const currentValue = (event.target as HTMLInputElement).value;
    let inputChar = String.fromCharCode(event.charCode);
    if (currentValue.length >= 3||input === '-' ||event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
