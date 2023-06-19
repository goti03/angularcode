import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import {Crypto} from '../../shared/crypto.service';
import {lenderconfiguration} from '../../../environments/lender.config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  organisationList=[];
  lenderList=[];
  roleList=[];
  orgType=[{id:'1',name:'Anchor/Distriuter'},{id:'2',name:'Lender'}];
  orgTypeId:any='0';
  orgId:any='0';
  lenderId:any='0';
  roleId:any=0;
  mobileNo:any;
  firstName:any;
  userName:any;
  password:any;
  confirmPassword:any;
  message:any;
  userId:any;
  passMatch = new RegExp("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\@\#\$\%\^\&\*\.\,\:]).{6,15})");

  constructor(private router: Router,private apiService: ApiService,private set: breadcrumbMessage,private crypto: Crypto) {}

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
      this.apiService.getAnchorAndDistributerList().subscribe(data => {
          if (data.status == 200) {
            this.organisationList = data.result;
          } else {
            this.set.setOption(data.exceptionMessage,false);
          }
        }, error => { console.log(error.message); });

      this.apiService.getUserLenderList().subscribe(data => {
          if (data.status == 200) {
            this.lenderList = data.result;
          } else {
            this.set.setOption(data.exceptionMessage,false);
          }
        }, error => { console.log(error.message); });

      this.apiService.getroleList().subscribe(data => {
          if (data.status == 200) {
            this.roleList = data.result;
          } else {
            this.set.setOption(data.exceptionMessage,false);
          }
        }, error => { console.log(error.message); });
  }

  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
}
setOrgId(){
  for(let l of this.lenderList){
    if(l.lenderId==this.lenderId){
      this.orgId=l.orgId;
      break;
    }
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
signin(){
  this.router.navigate(['/authentication/login']);
}
signUp(){
    this.message="";
    if(this.isNullorUndefinedorEmpty(this.orgTypeId)){
        this.message="Please Choose Org Type";
    }else if (this.isNullorUndefinedorEmpty(this.orgId)){
      this.message="Please Choose Organisation";
    }else if (this.isNullorUndefinedorEmpty(this.lenderId) && this.orgTypeId==2){
      this.message="Please Choose Lender";
    }else if (this.isNullorUndefinedorEmpty(this.roleId)){
      this.message="Please Choose Role";
    }else if (this.isNullorUndefinedorEmpty(this.mobileNo)){
      this.message="Please Enter valid Mobile No";
    }else if (this.mobileNo.length!=10){
      this.message="Invalid Mobile No";
    }else if (this.isNullorUndefinedorEmpty(this.firstName)){
      this.message="Please Enter First Name";
    }else if (this.isNullorUndefinedorEmpty(this.userName)){
      this.message="Please Enter User Name";
    }else if (!this.passMatch.test(this.password)) { 
      this.set.setOption("Password in invalid format", false); 
    }else if (this.isNullorUndefinedorEmpty(this.confirmPassword)){
      this.message="Please Confirm password";
    }else if (this.confirmPassword!=this.password){
      this.message="Passwords did not match";
    }else{
      const data={
        roleId:this.roleId,
        userId:this.userId,
        lenderId:this.lenderId,
        orgId:this.orgId,
        mobileNo:this.mobileNo,
        firstName:this.firstName,
        t:this.crypto.encryt(this.userName+lenderconfiguration.spliterKey+this.password)
        // userName:this.userName,
        // password:this.password
      }
      this.apiService.createNewUser(data).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption(data.exceptionMessage,true);
          this.router.navigate(['/authentication/login']);
        } else {
          this.message=data.exceptionMessage;
        }
      }, error => { console.log(error.message); });
    }
  }
}
