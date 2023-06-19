import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../core/api.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment.js';
import { lenderconfiguration } from '../../../environments/lender.config';
import { link } from '../../../environments/environment';
import {Crypto} from '../../shared/crypto.service'; 

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  gstCredentialList:any;
  searchList:any;
  p:any=1;
  p1:any;
  gstpassword:boolean;
  page:any;
  userId:any;
  closeResult:any;
  actionMessage:any;

  constructor(private apiService:ApiService,private set:breadcrumbMessage,private modalService: NgbModal,
    private dialog: MatDialog,private crypto: Crypto) { }
  
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.p1=10;
    this.gstpassword = lenderconfiguration.gstpassword;
    this.page=0;
    this.apiService.gstCredentialDetails().subscribe(data => {
      if(data.status==200){
        this.gstCredentialList=data.result;
        
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    });
    // this.set.setOption();
  }
  showPageIndex(pageIndex,pagesize){
    this.page = pageIndex;
    console.log(this.page);
    if(this.page!=1){
    this.page = (this.page-1)*pagesize;
  }
  else
  {
    this.page=0;
  }
  }
 
  retrigger(orgGstId,orgId){
    this.modalService.dismissAll();
    const data={
      orgGstId:this.gst.orgGstId,
      orgId:this.gst.orgId,
    }
    this.apiService.updateGstAuthentication(data).subscribe(data => {
      if(data.status==200){
        this.set.setOption(data.exceptionMessage,true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    });
  }
  requestOtp(userName,gstNo,orgGstId,orgId){
    if(this.gst.userName == ''){
      this.actionMessage = "Enter User Name";
      return;
    }
    this.actionMessage = '';
    this.modalService.dismissAll();
    const data1={
      orgGstId:this.gst.orgGstId,
      orgId:this.gst.orgId,
    }
    this.apiService.updateGstAuthentication(data1).subscribe(data => {
      if(data.status==200){
        const data={
          userId:this.userId,
          gstUser:this.gst.userName,
          gstNo:this.gst.gstNo,
          loanRequestId:this.gst.loanRequestId,
          password : ''
        }
        this.apiService.authenticateRequestOTP(data).subscribe(data => {
          if(data.status==200){
            if(data.exceptionOccured=='Y'){
              this.set.setOption(data.exceptionMessage,false);
            }else{
              const dialogRef = this.dialog.open(requestOtpPopup, {
                data: {
                  userId:this.userId,
                  gstUser:this.gst.userName,
                  gstNo:this.gst.gstNo,
                  loanRequestId: this.gst.loanRequestId
                }
              });
              dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result: ${result}`);
                // window.location.reload();
                this.ngOnInit();
              });
            }
            
          } else {
            this.set.setOption(data.exceptionMessage, false);
            this.ngOnInit();
          }
        });
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    });
  }

  searchbox : boolean;
  utility(a){
    if(a == 1){
     this.searchbox = false; 
    }else{
     this.searchbox = true; 
    } 
   }

   visible : boolean = false;
   passvis(){
     this.visible = !this.visible;
   }

   gst : any;
   action(content,a){
     this.gst = a;
     this.pass = false;
     this.actionMessage = '';
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  pass : boolean = false;
  empPass : boolean = false;
  passcode : any = '';
  password(){
    if(this.passcode == ''){
      this.empPass = true;
      return;
    }
    this.empPass = false;
    this.modalService.dismissAll();
    const data={
      userId:this.userId,
      gstUser:this.gst.userName,
      gstNo:this.gst.gstNo,
      loanRequestId:this.gst.loanRequestId,
      password : this.passcode
    }
    this.apiService.authenticateRequestOTP(data).subscribe(data => {
      if(data.status==200){
          this.set.setOption(data.result,true);
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
      this.ngOnInit();
    });

  }

  passbox(){
    if(this.gst.userName == ''){
      this.actionMessage = "Enter User Name";
      return;
    }
    this.actionMessage = '';
    this.pass=true;
  }

  send(){
    this.modalService.dismissAll();
      var linktosend = link.gstnlink + this.gst.loanRequestId + "/" + this.gst.mobileNo + "/" + this.gst.orgId +"/" + this.userId + "/2";
      const obj = {
        loanRequestId : this.gst.loanRequestId,
        link : linktosend
      }
      this.apiService.gstnVerifyLink(obj).subscribe(data => {
        if(data.status == 200){
          this.set.setOption( data.result, true);
        }else{
          this.set.setOption( data.exceptionMessage, false);
        }
      }, error => console.log(error));
  }

}







@Component({
  selector: 'requestOtp-popup',
  template: `<div class="modal-header">
  <h4 class="modal-title" id="modal-basic-title">Request Gst authentication Otp</h4>
  <button type="button" class="close" aria-label="Close" (click)="getDismissReason('Cross click')">
    <span aria-hidden="true">×</span>
  </button>
</div>
<div class="modal-body">
<span *ngIf="errorMessage" style="color:red;text-align: center;">{{errorMessage}}</span>
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th>S No</th>
        <th>GST No</th>
        <th>User Name</th>
        <th>OTP</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>{{gstNo}}</td>
        <td>{{gstUser}}</td>
        <td>
        <input type="text" [(ngModel)]="otp"  class="form-control"  >
         </td>
      </tr>
    </tbody>

  </table>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-success" (click)="getAuthToken()">save</button>
</div>`,
})

export class requestOtpPopup implements OnInit {
 
  errorMessage: any;
  showErrorMessage: boolean = false;
  errorMsg: boolean = false;
  todayDate: any;
  userId:any;
  gstUser:any;
  gstNo:any;
  otp:any;
  loanRequestId: any;
  constructor(private route: ActivatedRoute, 
    private dialogRef: MatDialogRef<requestOtpPopup>,
     @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) { }

    keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  ngOnInit() {
    this.userId=this.data.userId;
    this.gstUser=this.data.gstUser;
    this.gstNo=this.data.gstNo;
    this.loanRequestId = this.data.loanRequestId;
    this.todayDate = moment().format('YYYY-MM-DD');
  }
  getAuthToken(){
    const data={
      userId:this.userId,
      gstUser:this.gstUser,
      gstNo:this.gstNo,
      otp:this.otp,
      loanRequestId:this.loanRequestId
    }
    if(this.otp==''||this.otp==null||this.otp==undefined){
      this.errorMessage="Please Enter Otp";
    }else{
      this.apiService.getAuthToken(data).subscribe(data => {
        if (data.status == 200) {
          if (data.exceptionOccured == 'Y') {
            this.errorMessage = data.exceptionMessage;
          } else {
            this.dialogRef.close();
          }
        } else {
          this.errorMessage = data.exceptionMessage;
          // alert("Update was Failed");
        }
      }, error => console.log(error));
    }
   
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.dialogRef.close();
      return `with: ${reason}`;
    }
  }


}