import { Component, OnInit,ChangeDetectorRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency } from '../../../shared/currency.service';
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-upload-loan-form',
  templateUrl: './upload-loan-form.component.html',
  styleUrls: ['./upload-loan-form.component.css']
})
export class UploadLoanFormComponent implements OnInit {
  
  loanid: any;
  actionId: any;
  stausId:any;
  substatusId:any;
  programId:any;
  orgId:any;

  fileSource1: any;
  fileName1: any;
  fileSource2: any;
  fileName2: any;

  dob: any;
  firstName: any;
  lastName: any;
  Gender: any;
  panNo: any;
  mobileNo: any;
  address: any;
  uploadFile: any;
  HeaderDetails: any;
  imageEncode = [];
  loanFormEncode = [];
  loanAgreementEncode = [];
  formData = [];

  fileNameList = [];
  checklistStatus:boolean;
  data: ReportModel = new ReportModel();
  UploadedDocuments:Array<any>=[];
  UploadedDocumentsList:Array<any>=[];
  filenetList:Array<any>=[];
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  model2: NgbDateStruct;
  url:any;
  statusFlow:any;
  submitted: boolean;
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,
    private apiService : ApiService, private set : breadcrumbMessage, private currency : Currency,private crypto: Crypto) { }  
    validation = new FormGroup({
      loanAgreement: new FormControl('', [Validators.required]),
      loanForm: new FormControl('', [Validators.required]),
    })
    ngOnInit() {
      this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
      this.submitted = false; 
      this.loanid = this.route.snapshot.params['loanid'];
      this.orgId = this.route.snapshot.params['orgId'];
      this.actionId = this.route.snapshot.params['id'];
      this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails=data.result;
          this.mobileNo = this.HeaderDetails[0].mobileNo;
          this.statusFlow= this.HeaderDetails[0].statusflow;
      }, error => console.log(error));
     
    }
    goToList(){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }
    gotoList() {
      this.router.navigate(['/report/']);
    }

// base64
ext(filename) {
  return filename.split('.').pop();
}
uploadfileLoanAgreearray(file){ 
  var ext = this.ext(file[0].name);
  if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'pdf' || ext == 'xlsx' ){
    console.log("1");
    let  reader = new FileReader();
    reader.readAsDataURL(file[0])
    this.fileName1 = file[0].name;
    var t = this;
    reader.onload = function () {
      t.loanAgreementEncode.push(reader.result)
      console.log(reader.result);
    }
  }else{
    this.set.setOption("Please choose Image,Excel or PDF Files", false);
    const files=<HTMLInputElement>document.getElementById('loanAgreement');
      files.value="";
  }
  }
uploadLoanFormarray(file){
  var ext = this.ext(file[0].name);
  if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'pdf' || ext == 'xlsx' ){
    console.log("2");
     let  reader = new FileReader();
    reader.readAsDataURL(file[0])
   this.fileName2 = file[0].name;
    var t = this;
    reader.onload = function () {
      t.loanFormEncode.push(reader.result)
      console.log(reader.result);
    }
  }else{
    this.set.setOption("Please choose Image,Excel or PDF Files", false);
    const files=<HTMLInputElement>document.getElementById('loanForm');
      files.value="";
  }
  }
  // selectFileName(event){
  //   const fileData={
  //     fileName:event[0].name
  //   }
  //   this.fileNameList.push(fileData);
  // }

    submit(){
      this.submitted = true;

    if (this.fileName2 == null || this.fileName2 == undefined || this.fileName2 == '') {

    } else if (this.fileName1 == null || this.fileName1 == undefined || this.fileName2 == '') {

    } else if(this.validateFileName()){
      this.set.setOption("Same File Can't upload ",false);
    }else {
      const loanForm = {
        docTypeId: "26",
        fileName: this.loanid + "_Signed_" + this.fileName2,
        encodedData: this.loanFormEncode[0].split(",")[1],
        loanId: this.loanid,
        idfcDocName: "APPLICATION FORM",
        filePath: "",
        documentName: "",
        flowProcess: '2',
        id: "0",
        statusFlow: this.statusFlow
      };
      const loanAgreement = {
        docTypeId: "34",
        fileName: this.loanid + "_Signed_" + this.fileName2,
        encodedData: this.loanAgreementEncode[0].split(",")[1],
        loanId: this.loanid,
        idfcDocName: "LOAN AGREEMENT",
        filePath: "",
        documentName: "",
        flowProcess: '2',
        id: "0",
        statusFlow: this.statusFlow
      }
      this.formData.push(loanForm);
      this.formData.push(loanAgreement);
      this.apiService.UploadToFilenet(this.formData).subscribe(data => {
        if (data.status == 200) {
          if (data.exceptionOccured == 'Y') {
            this.set.setOption(data.exceptionMessage,false);
            // window.location.reload();
            this.gotoAction();
          } else {
            this.set.setOption(data.result,true);
            this.gotoAction();
          }
          
        } else {
          this.set.setOption(data.exceptionMessage,false);
          // window.location.reload();
          this.ngOnInit();
        }
      }, error => console.log(error));
    
    }
    //   var temp3=document.getElementsByName("aggrementFile");
    //   var temp4=(temp3[0] as HTMLInputElement).value;
    //   var temp5=temp4.split("\\");
    //   var aggrementFile=temp5[(temp5.length-1)];
    //   console.log("aggrementFile::"+aggrementFile);
    //   var temp=document.getElementsByName("formFile");
    //   var temp1=(temp[0] as HTMLInputElement).value;
    //   var temp2=temp1.split("\\");
    //   var formFile=temp2[(temp2.length-1)];
    //   console.log("formFile::"+formFile);
      
      
    //   const loanForm=
    //     {
    //     docTypeId:"26",
    //     fileName:this.loanid+"_Signed_"+formFile,
    //     encodedData:this.loanFormEncode[0].split(",")[1],
    //     loanId:this.loanid,
    //     idfcDocName:"APPLICATION FORM",
    //     filePath:"",
    //     documentName:"",
    //     flowProcess:'2',
    //     id:"0",
    //     statusFlow:this.statusFlow
    //   };
    //   const loanAgreement={
    //     docTypeId:"34",
    //     fileName:this.loanid+"_Signed_"+aggrementFile,
    //     encodedData:this.loanAgreementEncode[0].split(",")[1],
    //     loanId:this.loanid,
    //     idfcDocName:"LOAN AGREEMENT",
    //     filePath:"",
    //     documentName:"",
    //     flowProcess:'2',
    //     id:"0",
    //     statusFlow:this.statusFlow
    //   }
    // this.formData.push(loanForm);
    // this.formData.push(loanAgreement);

    // var curDate =moment().format('YYYY-MM-DD HH:mm:ss');
    //   this.apiService.UploadToFilenet(this.formData).subscribe(data => {
    //   if(data.status==200){
    //     this.set.setOption("Uploaded Successfully",true);

    //     // alert("Uploaded Successfully");
    //     this.gotoAction();
    //   }else{
    //     this.set.setOption("Failed to update",false);

    //     // alert("Failed To Upload");
    //     window.location.reload();
    //   }
    //   }, error => console.log(error));
    }

    addRowFile(index) {
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
    
    downloadView(myUrl){
      const alert = "myUrl::"+myUrl;
      this.set.setOption(alert,true);

     
      var url=myUrl;
      window.open(url, '_blank');
    }
    downloadPdf(i) {
      var base64=this.UploadedDocuments[i].encodeData;
      const linkSource = 'data:application/pdf;base64,' + base64;
      const downloadLink = document.createElement("a");
      const fileName = this.UploadedDocuments[i].fileSource;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
}
downloadAggrement(){
  var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
  const data1={
    mobileNumber:this.mobileNo,
    typeAgreement:'0',
    lastActivityTime:curDate,
    userId:this.userId,
    retailerId:this.crypto.decryt(window.localStorage.getItem("retailerId")),
    loanRequestId:this.loanid,
    loanDisbursalId:'0',
    userMedium:'bankendApp'
   }
   this.apiService.generateLoanAgreement(data1)
   .subscribe(data => {
    if(data.status==200){
      window.open(data.result.myUrl, '_blank');
    }else{
      this.set.setOption("Can't download this file",false);

      // alert("can't download this file");
    }
  }, error => console.log(error));
}
downloadNachForm(){
  this.apiService.downloadForm(this.loanid,0,3).subscribe(data => {
    if(data.status==200){
      window.open(data.result, '_blank');
    }else{
      this.set.setOption("Unable to download file",false);

    // alert("can't download this file");
    }
  }, error => console.log(error));
}
downloadLoanForm(){
  this.apiService.downloadForm(this.loanid,0,2).subscribe(data => {
    if(data.status==200){
      window.open(data.result, '_blank');
    }else{
      this.set.setOption("Unable to download file",false);

      // alert("can't download this file");
    }
  }, error => console.log(error));
}
downloadSanctionLetter(){
  this.apiService.downloadForm(this.loanid,0,1).subscribe(data => {
    if(data.status==200){
      window.open(data.result, '_blank');
    }else{
      this.set.setOption("Unable to download file",false);

      // alert("can't download this file");
    }
  }, error => console.log(error));
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

validateFileName(){
  if(this.fileName1==this.fileName2){
    return true;
  }else{
  return false;
  }
    }
    indianCurrency(Amount){
      return this.currency.indianCurrency(Amount);
    }

    downloadHypothecationLetter(){
      this.apiService.downloadForm(this.loanid, 0, 8).subscribe(data => {
        if (data.status == 200) {
          window.open(data.result, '_blank');
        } else {
          this.set.setOption('Unable to download file', false);
    
          // alert("can't download this file");
        }
      }, error => console.log(error));
    }
}
