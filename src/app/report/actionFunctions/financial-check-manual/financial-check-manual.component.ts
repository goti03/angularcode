import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { breadcrumbMessage } from '../../../shared/breadcrumb-message.service';
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-financial-check-manual',
  templateUrl: './financial-check-manual.component.html',
  styleUrls: ['./financial-check-manual.component.css']
})
export class FinancialCheckManualComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private apiService : ApiService,public set:breadcrumbMessage,private crypto: Crypto) { }

  loanId : any;
  antw : any;
  pat : any;
  lde : any;
  userId:any;
  HeaderDetails=[];
  statusId:any;
  subStatusid:any;
  programId:any;
  statusFlow:any;
  mobileNo:any;
  checkListStatus:any;
  customerId:any;
  programName:any;
  customerName:any;
  panNo:any;
  applicationNo:any;
  applicationDate:any;
  loanAmount:any;
  status:any;
  remarks:any;

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.loanId = this.route.snapshot.params['loanid'];
    this.apiService.getLoanHeaderDetails(this.loanId)
    .subscribe(data => {
      // panNo}}</td>
      //         <td>{{h.applicationNo}}</td>
      //         <td>{{h.applicationDate}}</td>
      //         <td>{{h.loanAmount}}</td>
      //         <td>{{h.status}}</td>
      //         <td>{{h.remarks}}</td>
      this.HeaderDetails = data.result;
      this.programName = this.HeaderDetails[0].programName;
      this.customerName = this.HeaderDetails[0].customerName;
      this.panNo = this.HeaderDetails[0].panNo;
      this.applicationNo = this.HeaderDetails[0].applicationNo;
      this.applicationDate = this.HeaderDetails[0].applicationDate;
      this.loanAmount = this.HeaderDetails[0].loanAmount;
      this.status = this.HeaderDetails[0].status;
      this.remarks = this.HeaderDetails[0].remarks;

      this.statusId = this.HeaderDetails[0].stausId;
      this.subStatusid = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      this.checkListStatus = this.HeaderDetails[0].checkListStatus;
      this.customerId = this.HeaderDetails[0].customerId;
    });
  }

  financialcheck(){
    if(this.lde==null || this.lde == undefined || this.lde == ''){
      this.set.setOption("Please enter Adjustable total Net Worth",false);
    }else if(this.pat==null || this.pat==undefined || this.pat == ''){
      this.set.setOption("please enter profit after tax",false);
    }else if(this.antw == null || this.antw == undefined || this.antw == ''){
      this.set.setOption("please enter Leverage debit equity",false);
    }else{
      const obj = {
        loanId : this.loanId,
        userId : this.userId,
        leverageDebtEquitym : this.lde,
        pat : this.pat,
        atnw : this.antw,
        'userMedium':'Backend'
        
      }
      this.apiService.SaveFinancialSummay(obj).subscribe(data => {
        if(data.status==200){
          this.set.setOption(data.exceptionMessage,true);
          this.goToAction();
        }else{
          this.set.setOption(data.exceptionMessage,false);
        }
      }, error => console.log(error));  
    }
  }
  goToAction(){
    this.apiService.getLoanHeaderDetails(this.loanId).subscribe(data => {
      this.HeaderDetails=data.result;
      this.router.navigate(['report/action'],{ queryParams: { 'loanId':this.loanId,
    'orgId':this.HeaderDetails[0].orgId,'programTypeId':this.HeaderDetails[0].programTypeId }});
    }, error => console.log(error));     
  }
  goToList() {
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanId,'nonStopFlag':'0' }} );
  }
  
}
