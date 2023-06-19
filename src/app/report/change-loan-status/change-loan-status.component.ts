import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService} from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-change-loan-status',
  templateUrl: './change-loan-status.component.html',
  styleUrls: ['./change-loan-status.component.css']
})
export class ChangeLoanStatusComponent implements OnInit {

  id:any;
  loanid:any;
  documentTypeList:any;
  HeaderDetails:any;
  fileDynamicList=[];
  fileDynamicFinal=[];
  filenewDynamic={};
  imageEncode=[];
  mobileNo:any;
  stausId:number;
  statusList:any;
  substatusList:any;
  substatusId:number;
  statusFlow:any;
  programId:any;
  saveButton:boolean=true;
  oldstausId:any;
  oldsubstatusId:any;
  programTypeId:any;
  orgId:any;
  remark : any;
  userId:any;
  constructor(private route: ActivatedRoute, private changeDetec: ChangeDetectorRef,private router: Router,private apiService : ApiService, 
    private set : breadcrumbMessage, private currency : Currency,private crypto: Crypto) { }

   ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.route.queryParams.subscribe(params => {
      this.nonStopFlag = params['nonStopFlag'];
    })
    this.loanid = this.route.snapshot.params['loanid'];
    this.programTypeId = this.route.snapshot.params['programTypeId'];
    this.orgId = this.route.snapshot.params['orgId'];
     this.apiService.getLoanHeaderDetails(this.loanid)
                .subscribe(data => {
                  this.HeaderDetails=data.result;
                  this.mobileNo = this.HeaderDetails[0].mobileNo;
                  this.stausId = this.HeaderDetails[0].stausId;
                  this.substatusId = this.HeaderDetails[0].substatusId;
                  this.programId = this.HeaderDetails[0].programTypeId;
                  this.statusFlow = this.HeaderDetails[0].statusflow;
                  this.mobileNo = this.HeaderDetails[0].mobileNo;
                  this.oldstausId = this.HeaderDetails[0].stausId;
                  this.oldsubstatusId = this.HeaderDetails[0].substatusId;
                  this.apiService.getStatusList(Number(this.statusFlow))
                    .subscribe(data => {
                      this.statusList=data.result;
                                
                  }, error => console.log(error));
                    
                
                  this.apiService.getsubStatusList(Number(this.stausId))
                  .subscribe(data => {
                    this.substatusList=data.result;
                              
                  }, error => console.log(error));
                 }, error => console.log(error));
 const data = {
      userId: this.userId,
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      userMedium: "backendApp",
      mobileNo: this.mobileNo
    }
    this.remark = "";
    this.tab = false;
  }

  getsubStatusList(){
      this.apiService.getsubStatusList(Number(this.stausId)).subscribe(data => {
        this.substatusList=data.result;
        this.substatusId=this.substatusList.length==0?0:this.HeaderDetails[0].substatusId;
        this.saveButton=false;
      }, error => console.log(error));
  }

  getStatusList(){   this.saveButton=false;  }


save(){
  if(this.stausId==this.oldstausId && this.substatusId==this.oldsubstatusId){
    this.set.setOption("Should not allow to update some status",false)
    // alert("Should not allow to update same Status");
  }else if(this.stausId==0){
    this.set.setOption("Please select the status",false)
    // alert("Please select the Status");
  }else{
    const  data ={
      remark : this.remark,
      statusid:Number(this.stausId),
      substatusid:Number(this.substatusId),
      loanid:Number(this.loanid),
      userId: this.userId,
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      userMedium: "backendApp",
      mobileNo: this.mobileNo
        };
    this.apiService.updateLoanStaus(data).subscribe(data => {
      if(data.status==200){
        this.set.setOption(data.exceptionMessage,true);
          // window.location.reload();
          this.gotToAction();
      }else{
        this.set.setOption(data.exceptionMessage,false)
        // alert(data.exceptionMessage);
      }
    }, error => console.log(error));

  }
}
nonStopFlag : any;
goToList(){
  if(this.nonStopFlag == 0){
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
  }else{
      this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
  }
}
gotToAction(){
    this.router.navigate(['report/action'],{ queryParams: { 'loanId':this.loanid,
    'orgId':this.orgId,'programTypeId':this.programTypeId,'nonStopFlag' :this.nonStopFlag }});
}
indianCurrency(Amount){
  return this.currency.indianCurrency(Amount);
}

tab : boolean = false;
toggle(){
  this.tab = !this.tab;
}

}
