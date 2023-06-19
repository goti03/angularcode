
import { Component, OnInit,ChangeDetectorRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import { Currency } from '../../../shared/currency.service';

@Component({
  selector: 'app-upload-filenet',
  templateUrl: './upload-filenet.component.html',
  styleUrls: ['./upload-filenet.component.css']
})
export class UploadFilenetComponent implements OnInit {
  
  loanid: any;
  actionId: any;
  stausId:any;
  substatusId:any;
  programId:any;
  statusFlow:any;
  orgId:any;
  
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
  fileNameList = [];
  checklistStatus:boolean;
  data: ReportModel = new ReportModel();
  UploadedDocuments:Array<any>=[];
  UploadedDocumentsList:Array<any>=[];
  filenetList:Array<any>=[];
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  model2: NgbDateStruct;
  selectAll:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,
    private apiService : ApiService, private set : breadcrumbMessage, private currency : Currency) { }  
    
    ngOnInit() {
      this.loanid = this.route.snapshot.params['loanid'];
      this.orgId=this.route.snapshot.params['orgId'];  
      this.actionId = this.route.snapshot.params['id'];
      this.apiService.getUploadedDocuments(this.loanid).subscribe(data => {
     this.UploadedDocuments=data.result;
    //  var i=0;
    //  for(let la of this.UploadedDocuments){
        // if(la.status=='Y')
        // {
        //    this.checklistStatus=true;
        // }
        // if(la.uploadedStatus==0){
        //   const data={
        //     documentName:la.documentName,
        //     fileSource:la.fileSource,
        //     filePath:la.filePath,
        //     documentId:la.documentId,
        //     finnovDocName:la.finnovDocName
        //   }
          // this.UploadedDocumentsList.push(data);
        // }
        // i++;
    //  }
      }, error => console.log(error));   
   
      this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
      
        this.HeaderDetails=data.result;
          this.mobileNo = this.HeaderDetails[0].mobileNo;
          this.statusFlow= this.HeaderDetails[0].statusflow;
      }, error => console.log(error));
      
   
    }
    gotoList() {
      this.router.navigate(['/report/']);
    }
    checkStatus(){
      var value=(document.getElementById("selectAll") as HTMLInputElement).checked;
      if(value == true){
        var checkbox=document.getElementsByName("check");
        for(let i=0;i<checkbox.length;i++){
          var id="check_"+i;
          (document.getElementById(id) as HTMLInputElement).checked = true;
        }
      }else{
        var checkbox=document.getElementsByName("check");
        for(let i=0;i<checkbox.length;i++){
          var id="check_"+i;
          (document.getElementById(id) as HTMLInputElement).checked = false;
        }
      }
    }
// base64

uploadfilearray(file)
  { let  reader = new FileReader();
    reader.readAsDataURL(file[0])
    var  t= this;
    reader.onload = function (){
    t.imageEncode.push(reader.result)
    }
  }
  selectFileName(event){
    const fileData={
      fileName:event[0].name
    }
    this.fileNameList.push(fileData);
  }
    submit(){
      var checkbox=document.getElementsByName("check");
      // alert("checkbox.length::"+checkbox.length);
      for(let i=0;i<checkbox.length;i++){
        var id="check_"+i;
        // alert(id);
        // var value=(checkbox[i] as HTMLInputElement).checked;
        var value=(document.getElementById(id) as HTMLInputElement).checked;
        if(value == true){
          // alert(i+" id::"+this.UploadedDocuments[i].id);
          const data1={
            loanId:this.loanid,
            fileName:this.UploadedDocuments[i].fileSource,
            filePath:this.UploadedDocuments[i].filePath,
            documentName:this.UploadedDocuments[i].documentName,
            // documentTypeId:this.UploadedDocuments[i].documentId,
            id:this.UploadedDocuments[i].id,
            docTypeId:this.UploadedDocuments[i].documentType,
            idfcDocName:this.UploadedDocuments[i].idfcDocName,
            encodedData :'',
            flowProcess:'1',
            statusFlow:this.statusFlow
          }
          this.filenetList.push(data1)
          ;
          }
      }
      // alert("filenetList::"+JSON.stringactionify(this.filenetList));
      this.apiService.UploadToFilenet(this.filenetList).subscribe(data => {
      if(data.status==200){
        this.set.setOption("Uploaded successfully",true);

        // alert("Uploaded Successfully");
        this.gotoAction();
      }else{
        this.set.setOption(data.exceptionMessage,false);

        // alert(data.exceptionMessage);
        // window.location.reload();
        this.ngOnInit();
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
    
    downloadView(filePath, filename:string){
      // var url=filePath+filename;
      // window.open(filePath, '_blank');
      console.log("index::"+filePath.indexOf("s3.ap-south-1"));
      if(filePath.indexOf("s3.ap-south-1")!=-1){
        var url1=filePath;
        window.open(url1, '_blank');
      }else{
        var url2=filePath+filename;
        window.open(url2, '_blank');
      }
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
indianCurrency(Amount){
  return this.currency.indianCurrency(Amount);
}
}
