import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { ApiService} from "..//..//..//core/api.service";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { breadcrumbMessage } from '../../../shared/breadcrumb-message.service'
import { Currency } from '../../../shared/currency.service';

@Component({
  selector: 'app-upload-loan-doc',
  templateUrl: './upload-loan-doc.component.html',
  styleUrls: ['./upload-loan-doc.component.css']
})
export class UploadLoanDocComponent implements OnInit {
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required])
  });
  HeaderDetails:any
  loanid: any;
  actionId: any;
  documentTypeList: any;
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
    private apiService : ApiService, private set : breadcrumbMessage, private currency : Currency) { }
    goToList(){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }
  ngOnInit() {
    this.orgId=this.route.snapshot.params['orgId'];
    this.loanid = this.route.snapshot.params['loanid'];
    this.actionId = this.route.snapshot.params['id'];
    this.apiService.getLoanHeaderDetails(this.loanid)
    .subscribe(data => {
    
      this.HeaderDetails=data.result;
      this.mobileNo =this.HeaderDetails[0].mobileNo;
      this.statusFlow=this.HeaderDetails[0].statusflow;
    }, error => console.log(error));
    
    this.apiService.getDocumentTypeList().subscribe(data => {
      this.documentTypeList=data.result;
    }, error => console.log(error));
   
  }
  gotoList() {
    this.router.navigate(['/report/']);
  }
  ext(filename) {
    return filename.split('.').pop();
  }
  onFileChange(event,index) {
    var ext = this.ext(event.target.files[0].name);
    if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'pdf' || ext == 'xlsx' ){
      if (event.target.files.length > 0) {
          console.log("event.target.files=="+event.target.files[0]);
          const file = event.target.files[0];
        }
    }else{
      this.set.setOption("Please choose Image,Excel or PDF Files", false);
      const files=<HTMLInputElement>document.getElementById('file_'+index);
      files.value="";
    }
  }
  submit(){
    this.actionId = this.route.snapshot.params['id'];
    this.data.documentTypeId='18';
    this.data.loanDisbursalId='0';
    this.data.substatusId='38';
    this.data.statusId='36';
    this.data.reasonId='0';
    this.data.remarks='';
    var name=(document.getElementById("loanDoc") as HTMLInputElement).value;
    var name1=(document.getElementById("loanDoc") as HTMLInputElement).name;
    var temp=name.split("\\");
    var filename=temp[(temp.length-1)];
    this.data.fileName=this.loanid+"_"+filename;
    this.apiService.uploanDocuments(this.loanid,this.data)
    .subscribe(data => {
      if(data.message=='success'){
        this.set.setOption("Status update is success",true);

        // alert("status update is successfully");
      this.gotoList();
      }
      else{

        this.data=null;
        this.set.setOption("Update failed, Please try again",false);

        // alert("Updae Was Failed Please Try again");
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
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  } 
}
