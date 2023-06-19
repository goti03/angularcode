import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReportModel } from '../../../report/reportModel';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from "@angular/material";
import {MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-bankstatement-upload',
  templateUrl: './bankstatement-upload.component.html',
  styleUrls: ['./bankstatement-upload.component.css']
})

export class BankstatementUploadComponent implements OnInit {
  fileType = [
    { id: 'pdf', name: 'pdf' },
    { id: 'xls', name: 'xls' },
  ];
  isPw = [
    { id: '1', name: 'Yes' },
    { id: '0', name: 'No' },
  ];
  
  loanid: any;
  actionId: any;
  curDate: any;
  bankItemData: any;
  HeaderDetails: any;
  ruleDynamicWhen: Array<ReportModel> = [];
  tempRowWhen: Array<ReportModel> = [];
  newDynamic: any = {};
  bankName = [];
  accountType = [];
  imageEncode = [];
  fileDynamicList = [];
  filenewDynamic: any = {};
  fileUploadData: any = [];
  closeResult: string;
  submitted:boolean;
  mobileNo:any;
  isPwavailable:any;
  programTypeId:any; 
  orgId:any; 
  userId:any;

  constructor(private route: ActivatedRoute, private router: Router,private modalService: NgbModal,private crypto: Crypto,
    private changeDetec: ChangeDetectorRef, private apiService: ApiService,private dialog: MatDialog, private set : breadcrumbMessage ) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.isPwavailable=false;
    this.submitted = false;
    this.loanid = this.route.snapshot.params['loanid'];
    this.actionId = this.route.snapshot.params['id'];
    this.programTypeId = this.route.snapshot.params['programTypeId'];
    this.orgId = this.route.snapshot.params['orgId'];
    window.localStorage.setItem("loanRequestId",this.loanid);
    window.localStorage.setItem("actionId",this.actionId);
    window.localStorage.setItem("programTypeId",this.programTypeId);
    window.localStorage.setItem("orgId",this.orgId);
    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails=data.result;
        this.mobileNo=this.HeaderDetails[0].mobileNo;
      }, error => console.log(error));


    this.getBankName();
    this.getAccountTypeList();
    this.addRow(1);

  }
reload(){
  this.set.setOption("reload",false);
  // alert("reload");
  this.ruleDynamicWhen=[];
}
  getBankName() {
    this.apiService.getBankNameList().subscribe(res => this.bankName = res.result);
    console.log("bankName.length======", this.bankName);
  }

  getAccountTypeList() {
    this.apiService.getAccountTypeList().subscribe(res => this.accountType = res.result);
    console.log("accounttype.length======", this.accountType);
  }

  addRowWhen(index) {}

  addRow(index) {
    this.filenewDynamic = {
      bankName:'',accountType:'',password:'',
      file:'',fileName:'',fileContent:'',processStatus:'',isPw:0
    };
    this.fileDynamicList.push(this.filenewDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  
  deleteRow(index) {  
  
    if(this.fileDynamicList.length ==1) {  
      this.set.setOption("Can't delete the row when there is only one row",false);
       return false;  
    } else {  
        this.fileDynamicList.splice(index, 1);  
         return true;  
    }  
  } 
  saveFile(){

    var name1=document.getElementsByName("file");
    var name2=document.getElementsByName("comment");
    for(var i=0;i<=name1.length;i++){
      var name=(name1[i] as HTMLInputElement).value;
      var remark=(name2[i] as HTMLInputElement).value;
      var temp=name.split("\\");
      var filename=temp[(temp.length-1)];
      const uploadFileData = {
        filename:filename,
        userId:this.userId ,
        remarks:remark
      };
      this.fileUploadData.push(uploadFileData);
    }
    this.apiService.uploadFileDocument(this.fileUploadData).subscribe(data => {
      if(data.status==200){
        this.set.setOption("File uploaded Successfully",true);
        this.gotoList();
    }else{
      this.set.setOption("Failed to upload",true);
    }
    });
  }
  isPassword(i){
    var val=this.fileDynamicList[i].isPw;
    if(val==0){
      this.isPwavailable=false;
    }else{
      this.fileDynamicList[i].password="";
      this.isPwavailable=true;
    }
  }
  submit() {
    this.submitted = true;
    this.set.setOption("Please wait, we are processing the bank statement",false);
    this.curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    var bankname=[];
    var accName=[];
    var fileContent=[];
    var fileName=[];
    var fileType=document.getElementsByName("fileType");
    var name1=document.getElementsByName("uploadFile");
    for(var i=0;i<name1.length;i++){
      var name=(name1[i] as HTMLInputElement).value;
      var fileTypes=(fileType[0] as HTMLInputElement).value;
      var temp=name.split("\\");
      var filename=temp[(temp.length-1)];
      this.fileDynamicList[i].fileName=filename;
      this.fileDynamicList[i].fileContent=this.imageEncode[i].split(",")[1];
      this.fileDynamicList[i].processStatus="0";
    }
      const bankstatementData = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      loanRequestId: this.loanid + "",
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
      fileType: fileTypes,
      programTypeId:this.programTypeId,
      bankData: this.fileDynamicList
    };
    this.apiService.getParsedBankTransactions(bankstatementData).subscribe(data => {
      if(data.status==200){
        this.openDialog1();
    }else{
      this.openDialog2();
    }
    });
  }

  completeProcess(){
    window.location.reload();
  }

  gotoList() {
    this.router.navigate(['/report/']);
  }
  ext(filename) {
    return filename.split('.').pop();
  }

  uploadfilearray(file,index){
  var ext = this.ext(file[0].name);
  if (ext == 'xlsx' || ext == 'pdf'){
    let reader = new FileReader();
    reader.readAsDataURL(file[0])
    var t = this;
    reader.onload = function () {
      t.imageEncode.push(reader.result)
    }
  }else{
    this.set.setOption("Please choose Excel or PDF Files", false);
    const files=<HTMLInputElement>document.getElementById('uploadFile_'+index);
    files.value="";
  }

  }
  addRowFile() {
    this.filenewDynamic = {
      file:'',comment:'',processStatus:'',isPw:0
    };
    this.fileDynamicList.push(this.filenewDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  
  deleteRowFile(index) {  
  
    if(this.fileDynamicList.length ==1) {  
      this.set.setOption("Can't delete the row when there is only one row",false);
       return false;  
    } else {  
        this.fileDynamicList.splice(index, 1);  
         return true;  
    }  
  }

  actionPopUp(content) {
    this.modalService.open(content,{ size: 'sm' }).result.then((result) => {
         this.closeResult = `Closed with: ${result}`;
       }, (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       });
     }
   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return  `with: ${reason}`;
     }
   }
   openDialog1() {
    const dialogRef = this.dialog.open(SuccessPopupPage);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
   openDialog2() {
    const dialogRef = this.dialog.open(FailedPopupPage);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  }

@Component({
  selector: 'popup-Page',
  templateUrl: './successPopupPage.html',
  styleUrls: ['./bankstatement-upload.component.css']
})
export class SuccessPopupPage {
text:any;
loanid:any;
actionId:any;
programTypeId:any;
orgId:any;
  constructor(private route: ActivatedRoute,private router: Router,
  private dialogRef: MatDialogRef<SuccessPopupPage>,private crypto: Crypto,
  private apiService : ApiService,private dialog: MatDialog){}
   close() {
    this.dialogRef.close();
    this.loanid=this.crypto.decryt(window.localStorage.getItem("loanRequestId"));
    this.actionId=this.crypto.decryt(window.localStorage.getItem("actionId"));
    this.programTypeId=this.crypto.decryt(window.localStorage.getItem("programTypeId"));
    this.orgId=this.crypto.decryt(window.localStorage.getItem("orgId"));
    this.router.navigate(['report/bankstatementcomplete',this.loanid,this.orgId,this.programTypeId]); 
    

    }
    open() {
      this.dialogRef.close();
      window.location.reload();
    }
    gotoList(){
      this.router.navigate(['/report/']); 
    }

}


@Component({
  selector: 'popup-Page',
  templateUrl: './failedPopupPage.html',
  styleUrls: ['./bankstatement-upload.component.css']
})

export class FailedPopupPage {
text:any;
loanid:any;
actionId:any;
  constructor(private route: ActivatedRoute,private router: Router,
   private dialogRef: MatDialogRef<FailedPopupPage>,private apiService : ApiService,private dialog: MatDialog){}
   close() {
    this.gotoList();
    window.location.reload();
    }
    open() {
      this.dialogRef.close();
      window.location.reload();
    }
    gotoList(){
      this.router.navigate(['/report/']); 
    }

}
