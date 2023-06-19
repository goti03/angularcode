import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Crypto} from '../../shared/crypto.service';
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { log } from 'console';

@Component({
  selector: 'app-view-pdd-document',
  templateUrl: './view-pdd-document.component.html',
  styleUrls: ['./view-pdd-document.component.css']
})
export class ViewPddDocumentComponent implements OnInit {
  sanctionList=[];
  conditionList=[];
  p:any;
  p1:any;
  fileDynamicFinal = [];
  fileDynamicList = [];
  imageEncode = [];
  HeaderDetails=[];
  mobileNo:any;
  filenewDynamic :any = [];
  newstatus: any;
  oldId: any;
  checkstatus: boolean;

  constructor(private apiService: ApiService,private route: ActivatedRoute, private router: Router,private set: breadcrumbMessage,private crypto: Crypto) { }

  ngOnInit() {
    this.p1 = 10;
    this.p = 1;
    const data = {
      startDate: '',
      endDate: '',
      panNo: '',
      anchor: '',
      status: '',
      loanId:this.route.snapshot.params['loanId'],
      customerName: ''
    }
    this.apiService.getSanctionConditionList(0,data).subscribe((res)=>{
      if(res.status == 200){
        this.sanctionList = res.result.list;
        this.apiService.getSanctionListforLos(this.route.snapshot.params['loanId']).subscribe((res)=>{
          if(res.status == 200){
            this.conditionList = res.result;
          }
        })
      }
    })
    this.apiService.getLoanHeaderDetails(this.route.snapshot.params['loanId']).subscribe((res)=>{
      if(res.status == 200){
        this.HeaderDetails = res.result;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
      }
    })
this.addRowFile()
  }
uploadDoc(){
  console.log("status",this.newstatus);
  this.fileDynamicFinal=[]
  for (let f of this.conditionList) {
    if(f.fileSource || f.checkstatus){
      const filedata = {
        documentTypeId: '98',
        fileName: this.route.snapshot.params['loanId'] + "_" + f.fileName ,
        // fileContent: (f.fileSource) ? f.fileSource.split(",")[1] : '',
        fileContent: (f.fileSource) ? f.fileSource.split(",")[1] : '',
        id: f.Id ,
        // status: f.status
        status: f.status
      };
      this.fileDynamicFinal.push(filedata)
    }
   
    // (f.fileSource) ? this.fileDynamicFinal.push(filedata) : ''
    
    // console.log('this.fileDynamicFinal.push(filedata)',this.fileDynamicFinal.push(filedata));
    
  }
  var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const docDetails = {
          userId: this.crypto.decryt(window.localStorage.getItem('userId')),
          lastActivityTime: curDate,
          retailerId: this.crypto.decryt(window.localStorage.getItem('retailerId')),
          currentActivityId: '0',
          loanRequestId: this.route.snapshot.params['loanId'],
          retailerType: this.crypto.decryt(window.localStorage.getItem('retailerType')),
          mobileNo: this.mobileNo,
          userMedium: 'backEndApp',
          docData: this.fileDynamicFinal,
        }
        console.log("docDetails::" + JSON.stringify(docDetails));
        this.apiService.uploadDocuments(docDetails).subscribe(data => {
          if ((data.status == 200)) {
            if (data.exceptionOccured == 'Y') {
              this.set.setOption(data.exceptionMessage, false);
              this.ngOnInit();
            } else {
              this.set.setOption("Documents uploaded Successfully", true);
              // window.location.reload();
              this.ngOnInit();
            }
          } else {
            this.set.setOption("Failed to upload Documents", false);
            this.ngOnInit();
          }
        }, error => console.log(error));
}
ext(filename) {
  return filename.split('.').pop();
}

uploadfilearray(index, file,x) {
  var ext = this.ext(file[0].name);
  if ( (ext == 'pdf') ) {
    this.imageEncode = [];
    let reader = new FileReader();
    reader.readAsDataURL(file[0])
    reader.onload = () => {
      this.conditionList[index].fileSource = reader.result;
      this.conditionList[index].fileName = file[0].name;
      this.conditionList[index].id = x;
      console.log('this.fileDynamicList[index].fileName',this.conditionList[index].id);
      
    };
  } else {
    this.set.setOption("The accepted data format are as follow : pdf", false);

  }

}
addRowFile() {
  this.filenewDynamic = {
    file: '', docType: '0', fileSource: '', fileName: '', docErrorMsg: '', fileErrorMsg: '',id:''
  };
  this.conditionList.push(this.filenewDynamic);
  // this.changeDetec.detectChanges();
  // if (this.fileDynamicList.length > 0) {
  //   this.saveButton = false;
  // }
  return true;

}
onStatusChange(status,newid){
  console.log("newid:::"+newid);
  console.log("fffstatus:::"+status);
  
  for (let f of this.conditionList) {
    this.oldId = f.Id;
    console.log("oldId:::"+this.oldId);
      if(newid == this.oldId){
    console.log("statusnewid:::"+newid);
    console.log("statusoldId:::"+this.oldId);
    f.status=status;
    if(status ==f.status){
      console.log("called");
      f.checkstatus=true;
          }
  }
  }

// console.log("Status:::::",this.newstatus);

}
}
