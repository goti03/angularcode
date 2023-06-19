import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import {Crypto} from '../../shared/crypto.service';
import {lenderconfiguration} from '../../../environments/lender.config';
@Component({
  selector: 'app-signup',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  userName:any;
  oldPassword:any;
  newPassword:any="";
  confirmPassword:any="";
  userId:any;
  password:any;
  message:any;
  errorMessage:any;
  staticAlertClosed = true;
  passMatch = new RegExp("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\@\#\$\%\^\&\*\_\.\:]).{6,15})");
  constructor(public set:breadcrumbMessage,private apiService: ApiService,private router: Router,private crypto: Crypto) {}

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.apiService.getUserName(this.userId).subscribe(data=>{
      if(data.status==200){
        var userData=this.crypto.decryt(data.result[0].userData);
        this.userName=userData.split(lenderconfiguration.spliterKey)[0];
        this.password=userData.split(lenderconfiguration.spliterKey)[1];
        // this.userName=data.result[0].userName;
        // this.password=data.result[0].password;
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });
  }
  goToLoginPage(){
    this.router.navigate(['authentication/login']);
  }
  validate(){
      return (this.newPassword.length>0 && !this.passMatch.test(this.newPassword))?true:false;
  }
  validateConfirmPassword(){
      return (this.newPassword.length>0 && this.confirmPassword.length>0 && this.newPassword!=this.confirmPassword)?true:false;
  }
  changePassword(){
    this.errorMessage='';
    this.message='';
    if(this.oldPassword == null || this.oldPassword == undefined || this.oldPassword == ''){
      this.errorMessage="old password is required";
    }else if (!this.passMatch.test(this.newPassword)) { 
      this.message="Password in invalid format"; 
    }else if(this.newPassword == null || this.newPassword == undefined || this.newPassword == ''){
      this.errorMessage="new password is required";
    }else if(this.confirmPassword == null || this.confirmPassword == undefined || this.confirmPassword == ''){
      this.errorMessage="confirm password is required";
    }else if(this.oldPassword!=this.password){
      this.errorMessage="incorrect old password";
    }else if(this.newPassword==this.oldPassword){
      this.errorMessage="old password and new password cannot be same";
    }else if(this.newPassword!=this.confirmPassword){
      this.errorMessage=" Password & Confirm Password does not match";
    }else{
      const data={
        t:this.crypto.encryt(this.newPassword+lenderconfiguration.spliterKey+this.userId)
        // newPassword:this.crypto.encryt(this.newPassword),
        // userId:this.crypto.encryt(this.userId),
      }
      this.apiService.updatePassword(data).subscribe(data=>{
        if(data.status==200){
        this.staticAlertClosed = false;
        this.set.setOption(data.exceptionMessage,true);
        this.router.navigate(['/program/list']);
        }else{
          this.errorMessage="Failed to Update";
        }
      }); 
    }
    
  }
}
