import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-telco-rule',
  templateUrl: './telco-rule.component.html',
  styleUrls: ['./telco-rule.component.css']
})
export class TelcoRuleComponent implements OnInit {
  loanid: any;
  actionId: any;
  HeaderDetails:any
mobileNo:any;
  telcoRuleList: any;
  data: ReportModel = new ReportModel();
  telcoRuleData: Array<any> = [];
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,
     private apiService : ApiService, private set : breadcrumbMessage,private crypto: Crypto) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.loanid = this.route.snapshot.params['loanid'];
    this.actionId = this.route.snapshot.params['id'];
    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails=data.result;
        this.mobileNo =this.HeaderDetails[0].mobileNo;
      }, error => console.log(error));

      var curDate =moment().format('YYYY-MM-DD HH:mm:ss');
      const telcoData = {
        userId: this.userId+"",
        lastActivityTime: curDate,
        loanRequestId: this.loanid,
        ruleName:"telco"
      }

this.apiService.getRuleData(telcoData)
      .subscribe(data => {
        this.telcoRuleList = data.result.list;
        // alert("this.telcoRuleList=="+JSON.stringify(this.telcoRuleList));
      }, error => console.log(error));
    
  }
  gotoList() {
    this.router.navigate(['/report/']);
  }
  submit() {
    var resultStatus = document.getElementsByName("resultStatus");
    var sequenceNo = document.getElementsByName("sequenceNo");
    var remarks = document.getElementsByName("remarks");

    for (let i = 0; i < resultStatus.length; i++) {
      this.data = new ReportModel();
      this.data.id = (sequenceNo[i] as HTMLInputElement).value;
      this.data.resultStatus = (resultStatus[i] as HTMLInputElement).value;
      this.data.remarks = (remarks[i] as HTMLInputElement).value;
      this.data.manualPass=0;
      var Status=(resultStatus[i] as HTMLInputElement).value;
      if(Status =="Yes"){
        this.data.manualPass=1;
      }
      this.telcoRuleData.push(this.data);
    }
    // alert("this.data=="+JSON.stringify(this.data));
    const telcoData = {
      userId: this.userId+"",
      loanRequestId: this.loanid,
      userMedium:"backendApp",
      ruleData:this.telcoRuleData
    }
  
  console.log("telcoData=="+JSON.stringify(telcoData));
  this.apiService.updateTelcoRuleDetails(telcoData)
    .subscribe(data => {
      if (data.status == 200) {
        this.set.setOption("Updated Successfully",true);

        // alert("Updated  Successfully");
        this.gotoList();
      }
      else {
        this.set.setOption("Update Failed, Try again",false);

        // alert("Updated Failed, Try again");
        this.telcoRuleData = null;
      }
    }, error => console.log(error));

  }
  addRowFile() {
    this.filenewDynamic = {
      file:'',comment:'',
    };
    this.fileDynamicList.push(this.filenewDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  
  deleteRowFile(index) {  
  
    if(this.fileDynamicList.length ==1) { 
      this.set.setOption("Can't delete the row when there is only one row",false);
 
      // alert("Can't delete the row when there is only one row");
       return false;  
    } else {  
        this.fileDynamicList.splice(index, 1);  
         return true;  
    }  
  }
}
