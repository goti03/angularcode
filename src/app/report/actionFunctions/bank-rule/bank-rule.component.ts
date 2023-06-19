import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { RuleDynamic } from '../../../rules/ruleDynamic';
import {breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-bank-role',
  templateUrl: './bank-rule.component.html',
  styleUrls: ['./bank-rule.component.css']
})
export class BankRuleComponent implements OnInit {
  loanid: any;
  actionId: any;
  mobileNo: any;
  HeaderDetails: any;
  bankRuleList: any;
  data: ReportModel = new ReportModel();
  bankRuleData: Array<any> = [];
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,private crypto: Crypto,
    private apiService : ApiService,private changeDetec: ChangeDetectorRef, private set : breadcrumbMessage) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.loanid = this.route.snapshot.params['loanid'];
    this.actionId = this.route.snapshot.params['id'];
    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails=data.result;
        this.mobileNo=this.HeaderDetails[0].mobileNo;
      }, error => console.log(error));
      
      var curDate =moment().format('YYYY-MM-DD HH:mm:ss');
      const bankData = {
        userId: this.userId+"",
        lastActivityTime: curDate,
        loanRequestId: this.loanid,
        ruleName:"bank"
      }
      this.apiService.getRuleData(bankData)
      .subscribe(data => {
        this.bankRuleList = data.result.list;
        // alert("this.bankRuleList=="+JSON.stringify(this.bankRuleList));
      }, error => console.log(error));

  }
  gotoList() {
    this.router.navigate(['/report/']);
  }
 
  submit() {
    let index = (document.getElementById("indexValue") as HTMLInputElement).value;
    var y: number = +index;
    y = y + 1;
    // alert("index=="+y);
    var resultStatus = document.getElementsByName("resultStatus");
    var sequenceNo = document.getElementsByName("sequenceNo");
    var remarks = document.getElementsByName("remarks");
    var parameter = document.getElementsByName("parameter");
    var resultValue = document.getElementsByName("resultValue");

    for (let i = 0; i < remarks.length; i++) {
      this.data = new ReportModel();
      this.data.id = (sequenceNo[i] as HTMLInputElement).value;
      this.data.resultStatus = (resultStatus[i] as HTMLInputElement).value;
      this.data.resultValue = (resultValue[i] as HTMLInputElement).value;
      this.data.parameter1 = (parameter[i] as HTMLInputElement).value;
      this.data.remarks = (remarks[i] as HTMLInputElement).value;
      var Status=(resultStatus[i] as HTMLInputElement).value;
      this.data.manualPass=0;
      if(Status =="Yes"){
        this.data.manualPass=1;
      }
      this.bankRuleData.push(this.data);
    }
    const bankData = {
      userId: this.userId+"",
      loanRequestId: this.loanid,
      userMedium:"backendApp",
      ruleData:this.bankRuleData,
      mobileNo: this.mobileNo
    }
    // alert("mobile no=="+window.localStorage.getItem('mobileNo'));
    console.log("bankData=="+JSON.stringify(bankData));
    this.apiService.updateBankRuleDetails(bankData).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Updated Successfully",true);
          // alert("Updated  Successfully");
          this.gotoList();
        }
        else {
          this.set.setOption("Update Failed, Try again",false);
          // alert("Updated Failed, Try again");
          this.bankRuleData = null;
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
