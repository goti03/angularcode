import { Component, OnInit,ChangeDetectorRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { gemConstant, retailerConstant, sellerConstant, nonSoleProp, dealerConstant,Constant } from '../../../core/constant';
import { breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-upload-filenet',
  template: ``,
  styleUrls: ['./seller-action.component.css']
})
export class SellerActionComponent implements OnInit {
  
  loanid: any;
  actionId: any;
  dob: any;
  firstName: any;
  lastName: any;
  Gender: any;
  panNo: any;
  mobileNo: any;
  statusFlow: any;
  address: any;
  uploadFile: any;
  HeaderDetails: any;
  imageEncode = [];
  orgId:any;
  checklistStatus:boolean;
  data: ReportModel = new ReportModel();
  UploadedDocuments:Array<any>=[];
  UploadedDocumentsList:Array<any>=[];
  filenetList:Array<any>=[];
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  model2: NgbDateStruct;
  substatusId:any;
  stausId:any;
  programId:any;
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,
    private apiService : ApiService, private set : breadcrumbMessage,private crypto: Crypto) { }  
    
    ngOnInit() {
      this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
      this.orgId=this.route.snapshot.params['orgId'];
      this.loanid = this.route.snapshot.params['loanid'];
      this.actionId = this.route.snapshot.params['id'];
      // alert("this.actionId::"+this.actionId);
      this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
          this.HeaderDetails=data.result;
          this.mobileNo = this.HeaderDetails[0].mobileNo;
          this.stausId = this.HeaderDetails[0].stausId;
          this.substatusId = this.HeaderDetails[0].substatusId;
          this.programId = this.HeaderDetails[0].programTypeId;
          this.statusFlow=this.HeaderDetails[0].statusflow;
          var curDate= moment().format('YYYY-MM-DD HH:mm:ss');
      
    if(this.actionId==14 ||this.actionId== 49 ||this.actionId== 68 ){  //Process GST Rule
        const gstData={
          userId:this.userId,
          loanRequestId:this.loanid,
          orgId:this.orgId,
          lastActivityTime:curDate,
          mobileNo:this.mobileNo,
          userMedium:"backendApp",
          statusFlow:this.statusFlow,
          statusFlag:'0'
        }
        this.apiService.updateGstnRule(gstData).subscribe(data => {
          if(data.status==200){
            // alert("GST Rules Updated Successfully");
            this.set.setOption(data.result,true);

            // alert(data.result);
            // this.gotoList();
            this.gotoAction();
          }else{
            // alert("Failed to Update");
            this.set.setOption(data.exceptionMessage,false);

            // alert(Constant.errorMSG);
            this.gotoAction();
          }
        }, error => console.log(error));     
      }else if(this.actionId==15 || this.actionId==28 || this.actionId==34||this.actionId==50){   //Posidex call
        const crnData={
        userId:this.userId,
        loanRequestId:this.loanid,
        lastActivityTime:curDate,
        mobileNo:this.mobileNo,
        userMedium:"backendApp",
        statusFlow:this.statusFlow
      }
        this.apiService.createCrn(crnData).subscribe(data => {
          // alert("data::"+JSON.stringify(data));
          if(data.status==200){
            // alert("Updated Successfully");
            this.set.setOption(data.result,true);

            // alert(data.result);
            // this.gotoList();
            this.gotoAction();
          }else{
            // alert("Failed to Update");
            this.set.setOption(data.exceptionMessage,false);

            // alert(Constant.errorMSG);
            this.gotoAction();
          }
        }, error => console.log(error));     
      }else if(this.actionId==16||this.actionId==51){  //Commercial Bureau Call
        const bureauData={
          userId:this.userId,
        loanRequestId:this.loanid,
        lastActivityTime:curDate,
        orgId:this.orgId,
        mobileNo:this.mobileNo,
        statusFlow:this.statusFlow,
        userMedium:"backendApp"
      }
      this.apiService.updatebureauCall(bureauData).subscribe(data => {
        if(data.status==200){
          // alert("Commercial Bureau Call Updated Successfully");
          this.set.setOption(data.result,true);

          // alert(data.result);
          // this.gotoList();
          this.gotoAction();
        }else{
          // alert("Failed to Update");
          this.set.setOption(data.exceptionMessage,false);

          // alert(Constant.errorMSG);
          this.gotoAction();
        }
      }, error => console.log(error));     
      }else if(this.actionId==17 || this.actionId==52){   //Run Bureau rule
        const BureauRuleData={
          userId:this.userId,
          loanRequestId:this.loanid,
          orgId:this.orgId,
          lastActivityTime:curDate,
          mobileNo:this.mobileNo,
          statusFlow:this.statusFlow,
          userMedium:"backendApp",
          statusFlag:'0'
        }
        this.apiService.updatebureauRule(BureauRuleData).subscribe(data => {
          if(data.status==200){
            // alert("Updated Successfully");
            this.set.setOption(data.result,true);

            // alert(data.result);
            // this.gotoList();
            this.gotoAction();
          }else{
            // alert("Failed to Update");
            this.set.setOption(data.exceptionMessage,false);

            // alert(Constant.errorMSG);
            this.gotoAction();
          }
        }, error => console.log(error)); 
      }else if(this.actionId==18 || this.actionId==29 || this.actionId==35 || this.actionId==54){   //Create Loan Application
        const Data={
          userId:this.userId,
          loanRequestId:this.loanid,
          lastActivityTime:curDate,
          mobileNo:this.mobileNo,
          statusFlow:this.statusFlow,
          userMedium:"backendApp"
        }
        this.apiService.createLoan(Data).subscribe(data => {
          if(data.status==200){
            // alert("Loan Appliction Created Successfully");
            this.set.setOption(data.result,true);

            // alert(data.result);
            // this.gotoList();
            this.gotoAction();
          }else{
            // alert("Failed to Update");
            this.set.setOption(data.exceptionMessage,false);

            // alert(Constant.errorMSG);
            this.gotoAction();
          }
        }, error => console.log(error)); 
      }else if(this.actionId==22 || this.actionId==33 || this.actionId==57){   //Check Nach Status
        const Data={
          userId:this.userId,
          loanRequestId:this.loanid,
          lastActivityTime:curDate,
          statusFlow:this.statusFlow
        }
        this.apiService.checkNachStatus(Data).subscribe(data => {
          if(data.status==200){
            // alert("Nach Approved Successfully");
            this.set.setOption(data.result,true);

            // alert(data.result);
            // this.gotoList();
            this.gotoAction();
          }else{
            // alert("Nach Verification Failed");
            this.set.setOption(data.exceptionMessage,false);

            // alert(Constant.errorMSG);
            this.gotoAction();
          }
        }, error => console.log(error)); 
      }else if(this.actionId==30 || this.actionId==58|| this.actionId==46){   //Check loan Status
        const Data={
          userId:this.userId,
          lastActivityTime:curDate,
          loanRequestId:this.loanid,
          statusFlow:this.statusFlow
        }
        this.apiService.checkLoanStatus(Data).subscribe(data => {
          if(data.status==200){
            // alert("Loan Status Verified Successfully ");
            this.set.setOption(data.result,true);

            // alert(data.result);
            // this.gotoList();
            this.gotoAction();
          }else{
            this.set.setOption(data.exceptionMessage,false);

            // alert(Constant.errorMSG);
            // alert("Loan Status Verification Failed");
            this.gotoAction();
          }
        }, error => console.log(error)); 
      }else{
        this.set.setOption("Request Failed",false);

        // alert("Request Failed");
        // this.gotoList();
        this.gotoAction();
      }
      
      }, error => console.log(error));
    }
    gotoList() {
      this.router.navigate(['/report/']);
    }
    gotoAction(){
      this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
        this.HeaderDetails=data.result;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.stausId = this.HeaderDetails[0].stausId;
        this.substatusId = this.HeaderDetails[0].substatusId;
        this.programId = this.HeaderDetails[0].programTypeId;
        this.statusFlow=this.HeaderDetails[0].statusflow;
        this.router.navigate(['report/action'],{ queryParams: { 'loanId':this.loanid,
    'orgId':this.orgId,'programTypeId':this.programId }});
      }, error => console.log(error));     
    }
    goToList(){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }
  }
