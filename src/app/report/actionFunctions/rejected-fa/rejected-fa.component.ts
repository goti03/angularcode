import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { ApiService } from "..//..//..//core/api.service";
import { breadcrumbMessage} from '../../../shared/breadcrumb-message.service'

@Component({
  selector: 'app-rejected-fa',
  templateUrl: './rejected-fa.component.html',
  styleUrls: ['./rejected-fa.component.css']
})
export class RejectedFaComponent implements OnInit {
  loanid: any;
  actionId: any;
  reasonList: any;
  reasonId: any;
  remarks: any;
  HeaderDetails: any;
  data: ReportModel = new ReportModel();
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  mobileNo:any;
  statusFlow:any;
  stausId:any;
  substatusId:any;
  programId:any;
  orgId:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,
    private apiService: ApiService, private set : breadcrumbMessage) { }

  ngOnInit() {
    this.loanid = this.route.snapshot.params['loanid'];
    this.actionId = this.route.snapshot.params['id'];
    this.apiService.getReasonList()
      .subscribe(data => {
        this.reasonList = data.result;
        this.mobileNo=this.HeaderDetails[0].mobileNo;
      }, error => console.log(error));

      this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
      
        this.HeaderDetails=data.result;
        this.mobileNo =this.HeaderDetails[0].mobileNo;
        this.statusFlow=this.HeaderDetails[0].statusflow;
      }, error => console.log(error));

  }
  gotoList() {
    this.router.navigate(['/report/']);
  }
  submit() {
    this.reasonId = (document.getElementById("reasonid") as HTMLInputElement).value;
    this.remarks = (document.getElementById("remarks") as HTMLInputElement).value;
    this.data.statusId = this.actionId;
    this.data.reasonId = this.reasonId;
    this.data.remarks = this.remarks;
    if (this.reasonId == "" || this.reasonId == 0) {
      this.set.setOption("Please select valid reason",false);
      // alert("please select valid reason");
    } else {
      this.apiService.updateLoanActionStatus(this.loanid, this.data).subscribe(data => {
        if (data.message == 'success') {
          this.set.setOption("Updated Successfully",true);
          // alert("Updated Successfully");
          this.gotoAction();
        } else {
          this.set.setOption("Update Failed",false);
          // alert("Update Failed");
        }
      }, error => console.log(error), () => console.info('Status Updated successfully'));
    }
    this.data = new ReportModel();
    //  alert("this.reasonId=="+this.reasonId+" this.remarks=="+this.remarks);

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
      this.set.setOption("Can't delete the row when there is only one row",true);
      // alert("Can't delete the row when there is only one row");
       return false;  
    } else {  
        this.fileDynamicList.splice(index, 1);  
         return true;  
    }  
  } 
  gotoAction(){
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
      this.HeaderDetails=data.result;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow=this.HeaderDetails[0].statusflow;
      this.orgId=this.HeaderDetails[0].orgId;
      this.router.navigate(['report/action'],{ queryParams: { 'loanId':this.loanid,
    'orgId':this.orgId,'programTypeId':this.programId }});
    }, error => console.log(error));     
  }  
}
