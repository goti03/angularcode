import { Component, OnInit, ChangeDetectorRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Constant,gemConstant,nonSoleProp,sellerConstant,retailerConstant,vendorConstant,dealerConstant } from '../../../core/constant';
import { breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import { environment,lender } from '../../../../environments/environment';
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-bank-processing',
  templateUrl: './bank-processing.component.html',
  styleUrls: ['./bank-processing.component.css']
})
export class BankProcessingComponent implements OnInit {
  fileTypeList = [
    { id: 'pdf', name: 'pdf' },
    { id: 'xls', name: 'xls' },
  ];
  isPw = [
    { id: '1', name: 'Yes' },
    { id: '0', name: 'No' },
  ];
  List = [];
  List1 = [];
  url=this.apiService.baseUr2.replace("finAggPortalAPIService/api/v1/","uploadFiles/images/");
  stausId: any;
  substatusId: any;
  programId: any;
  statusFlow: any;
  orgId: any;
  isPwavailable: any;
  loanid: any;
  actionId: any;
  pdf: any;
  dob: any;
  firstName: any;
  lastName: any;
  Gender: any;
  panNo: any;
  mobileNo: any;
  address: any;
  uploadFile: any;
  programTypeId: any;
  HeaderDetails: any;
  imageEncode = [];
  accountType: [];
  bankName: [];
  submitted: boolean;
  processButton: boolean;
  excelData: boolean;
  curDate: string;
  data: ReportModel = new ReportModel();
  fileDynamicList: Array<any> = [];
  filenewDynamic: any = {};
  UploadedDocumentsList: Array<any> = [];
  UploadedDocuments: Array<any> = [];
  bankData: Array<any> = [];
  fileNameList: Array<any> = [];
  model2: NgbDateStruct;
  completeProcessButton: any;
  createLoanButton: any;
  dataList=[];
  fiarray: any;
  updateFlag: any;
  excelList: [];
  headerList = [];
  uploadStatement: boolean;
  addRowButton: boolean;
  resetButton:boolean;
  removeBankData:Array<any> = [];
  bankStatmentresetButton:boolean=true;
  ugroLender:boolean=false;
  finaggLender:boolean=false;
  duplicate:any=0;
  showTemplete:boolean=false;
  processFromList=[];
  processFrom:any;
  lenderId:any;
  sellerProgramTypeId = sellerConstant.sellerProgramTypeId;
  DEALERStatusFlow = dealerConstant.DEALERStatusFlow;
  vendorStatusFlow = vendorConstant.VendorStatusFlow;
  nonSoleStatusFlow = nonSoleProp.nonSoleStatusFlow;
  retailerStatusFlow = retailerConstant.retailerStatusFlow;
  fileType:any;
  userId:any;
  constructor(private _sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private changeDetec: ChangeDetectorRef,
    private apiService: ApiService, private dialog: MatDialog, private set : breadcrumbMessage,private crypto: Crypto) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.bankData=[];
    this.bankData.length=0;
    this.processButton=true;
    this.createLoanButton = true;
    this.completeProcessButton = true;
    this.excelData = true;
    this.addRowButton = true;
    this.uploadStatement = false;
    this.isPwavailable = false;
    this.resetButton=false;
    this.loanid = this.route.snapshot.params['loanid'];
    this.actionId = this.route.snapshot.params['id'];
    this.orgId=this.route.snapshot.params['orgId'];  
    this.programTypeId = this.route.snapshot.params['programTypeId'];
    this.processFrom=0;
    var curDate=moment().format('YYYY-MM-DD');
    this.curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    var pre1Date=moment().subtract(1, "months").format("MMM-YYYY");
    var pre2Date=moment().subtract(2, "months").format("MMM-YYYY");
    var pre3Date=moment().subtract(3, "months").format("MMM-YYYY");
    var pre4Date=moment().subtract(4, "months").format("MMM-YYYY");
    var pre5Date=moment().subtract(5, "months").format("MMM-YYYY");
    var pre6Date=moment().subtract(6, "months").format("MMM-YYYY");
    var id1=moment().subtract(1, "months").format("MM-YYYY");
    var id2=moment().subtract(2, "months").format("MM-YYYY");
    var id3=moment().subtract(3, "months").format("MM-YYYY");
    var id4=moment().subtract(4, "months").format("MM-YYYY");
    var id5=moment().subtract(5, "months").format("MM-YYYY");
    var id6=moment().subtract(6, "months").format("MM-YYYY");
    this.processFromList=[{date:pre1Date,id:id1},{date:pre2Date,id:id2},{date:pre3Date,id:id3},{date:pre4Date,id:id4},{date:pre5Date,id:id5},{date:pre6Date,id:id6}];
    console.log("this.processFromList::"+JSON.stringify(this.processFromList));
    this.apiService.getAccountTypeList().subscribe(res => this.accountType = res.result);
    this.apiService.getBankNameList().subscribe(res => this.bankName = res.result);

    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {

        this.HeaderDetails = data.result;
        // alert("this.HeaderDetails::"+JSON.stringify(this.HeaderDetails));
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.statusFlow = this.HeaderDetails[0].statusflow;
        this.stausId = this.HeaderDetails[0].stausId;
        this.substatusId = this.HeaderDetails[0].substatusId;
        this.lenderId = this.HeaderDetails[0].lenderId;
        this.programTypeId = this.HeaderDetails[0].programTypeId;
        this.ugroLender=(this.lenderId==lender.UGRO)?true:false;
        this.finaggLender=(this.lenderId==lender.FINAGG)?true:false;
        this.apiService.getUploadedBankStatements(this.loanid).subscribe(data => {
          this.UploadedDocuments = data.result.bankData;
          let count = 0;
          let processedCount = 0;
          for (let b of this.UploadedDocuments) {
            var tempFileName = b.fileSource.split(",");
            var tempDocId = b.documentId.split(",");
            var tempFilePath = b.filePath.split(",");
            const tempArray = [];
            for (let i = 0; i < tempFileName.length; i++) {
              const tempObj = {
                fileName: tempFileName[i],
                docId: tempDocId[i],
                filePath: tempFilePath[i]
              };
              tempArray.push(tempObj);
            }
            b.fileNameList = tempArray;
          }
          for (let i = 0; i < this.UploadedDocuments.length; i++) {
            if (this.UploadedDocuments[i].processStatus == '0') {
              count++;
            }else{
              processedCount++;
            }
          }
          if(count==0){
            this.processButton = true;
          }else{
            this.processButton = false;
          }
          if(processedCount>0)
          {  this.resetButton = false  }
          

  

          if(this.statusFlow == retailerConstant.retailerStatusFlow){ //retailer
            if(this.substatusId == retailerConstant.Bank_Rule_Pass ){
                this.completeProcessButton = true;
                this.createLoanButton = false;
                this.bankStatmentresetButton=false;
            }else if(this.substatusId == retailerConstant.Bank_Rule_Fail ){
                this.completeProcessButton = false;
                this.createLoanButton = true;
                this.bankStatmentresetButton=false;
            }else if(this.substatusId == retailerConstant.Bank_Statement_Pending ||
                    this.substatusId == retailerConstant.Bank_Statement_Received){
              if(this.UploadedDocuments.length>0 ){
                if(processedCount > 0){
                  this.completeProcessButton = false;
                  this.createLoanButton = true;
                }
              }else{
                this.completeProcessButton = true;
                this.processButton = true;
                this.createLoanButton = true;
              }
            // }else{
            //     this.completeProcessButton = false;
            //     this.createLoanButton = true;
            }
            // if (data.result.bankOverallProcessingStatus == 0) {
            //   this.completeProcessButton = false;
            //   this.createLoanButton = true;
            // } else {
            //   this.completeProcessButton = true;
            //   this.createLoanButton = false;
            // }
          }else{//seller & non sole prop
            this.createLoanButton = true;
            if(this.UploadedDocuments.length>0){
              if(processedCount > 0){
                this.completeProcessButton = false;
                this.createLoanButton = true;
              }
            }else{
              this.completeProcessButton = true;
              this.processButton = true;
              this.createLoanButton = true;
            }
          }
         
        }, error => console.log(error));
        // alert("this.mobileNo:"+this.mobileNo);
      }, error => console.log(error));

    
  }
  removeDoc(id: any) {
    const docId = { documentId: id };
    this.apiService.removeView(this.loanid, docId).subscribe(data => {
      this.ngOnInit();
    }, error => console.log(error));
  }
  skipBankStatement(){
    const data={
      userId:this.userId,
      lastActivityTime:this.curDate,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "0",
      loanRequestId: this.loanid,
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      userMedium: "backendApp",

    };
    this.apiService.skipBankrule(data).subscribe(data => {
      if (data.status == 200) {
        // this.ngOnInit();
        this.gotoAction();
      }else{
        this.ngOnInit();
        this.set.setOption(data.exceptionMessage,false);
      }
    });
  }
  changeFileType(){
    if(this.fileType == 'pdf'){
      this.addRowButton = false;
      this.showTemplete=false;
      this.filenewDynamic = {
        bankName: '', accountType: '', password: '',
        file: '', fileName: '', fileContent: '', processStatus: '', isPw: 0
      };
      this.fileDynamicList.push(this.filenewDynamic);
    }else if(this.fileType == 'xls'){
      this.showTemplete=true;
      this.addRowButton = true;
      this.fileDynamicList.length=0;
      this.filenewDynamic = {
        bankName: '', accountType: '', password: '',
        file: '', fileName: '', fileContent: '', processStatus: '', isPw: 0
      };
      this.fileDynamicList.push(this.filenewDynamic);
    }

  }
  gotoList() {
    this.router.navigate(['/report/']);
  }

  // base64
  ext(filename) {
    return filename.split('.').pop();
  }
  uploadfilearray(file,index) {
    var ext = this.ext(file[0].name);
    if (ext == 'xlsx' || ext == 'pdf'){
      let reader = new FileReader();
      console.log("file0::"+file[0].name);
      reader.readAsDataURL(file[0])
      reader.onload = () => {
        this.fileDynamicList[index].fileContent = reader.result;
        this.fileDynamicList[index].originalFileName = file[0].name;
        this.fileDynamicList[index].fileContent = this.fileDynamicList[index].fileContent.split(",")[1];
        console.log("this.fileDynamicList[index].fileContent::"+this.fileDynamicList[index].fileContent);
        this.fileDynamicList[index].fileName = this.loanid+"_BankStatement_"+moment().format('YYYYMMDDHHmmss_')+index+"."+this.fileType;
        this.fileDynamicList[index].processStatus = "0";
      };
    }else{
      this.set.setOption("Please choose Excel or PDF Files", false);
      const files=<HTMLInputElement>document.getElementById('file_'+index);
      files.value="";
    }
  }
  validateCheckBox(index){
    var checkbox = document.getElementsByName("check");
    for (let i = 0; i < checkbox.length; i++) {
      (checkbox[i] as HTMLInputElement).checked=false;
    }
    (checkbox[index] as HTMLInputElement).checked=true;
  }
  process(type) {
    var checkbox = document.getElementsByName("check");
    this.curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    if(checkbox.length<=0){
      this.set.setOption("Please select bank statement",false);

      // alert("Please Select Bank Statements");
    }else{
      for (let i = 0; i < checkbox.length; i++) {
        var value = (checkbox[i] as HTMLInputElement).checked;
        if (value == true) {
          var fileNameTemp = this.UploadedDocuments[i].fileSource.split(",");
          var temp2 = fileNameTemp[0].split(".");
          var fileType = temp2[temp2.length-1];
          var isPwTemp = this.UploadedDocuments[i].passwordProtected.split(",");
          var passwordTemp = this.UploadedDocuments[i].password.split(",");
          var base64Temp = this.UploadedDocuments[i].encodeData.split("~");
  
          for (let j = 0; j < fileNameTemp.length; j++) {
              const data1 = {
                fileName: fileNameTemp[j],
                isPw: isPwTemp[j],
                password: passwordTemp[j],
                fileContent: base64Temp[j],
                bankName: this.UploadedDocuments[i].bankName,
                accountType: this.UploadedDocuments[i].acctTypeName,
                processStatus: '1'
              }
              this.bankData.push(data1);
          }
        }
      }
      const bankstatementData = {
        userId: this.userId,
        lastActivityTime: this.curDate,
        retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
        currentActivityId: "25",
        loanRequestId: this.loanid,
        retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
        mobileNo: this.mobileNo,
        userMedium: "backendApp",
        fileType: fileType,
        programTypeId: this.programTypeId,
        bankData: this.bankData,
        processFrom: this.processFrom
      };
  if(type==1){
    this.apiService.getParsedBankTransactions(bankstatementData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption("Bank Statement Processed Successfully",true);
        this.bankData=[];
        // alert("Bank Statement Processed Successfully");
        // window.location.reload();
        this.ngOnInit();
        
      } else {
        this.set.setOption(data.exceptionMessage,false);
        // alert(data.exceptionMessage);
        // window.location.reload();
        this.ngOnInit();
      }
    });
  }else{
    this.apiService.uploadBankstatements(bankstatementData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption("Bank Statement Processed Successfully",true);
        // alert("Bank Statement Processed Successfully");
        // window.location.reload();
        this.bankData=[];
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage,false);
        // alert(data.exceptionMessage);
        // window.location.reload();
        this.ngOnInit();
      }
    });

  }
    
    }
  }
  CompleteBankProcess() {
    var curDate1 = moment().format('YYYY-MM-DD HH:mm:ss');
    const bankstatementData = {
      userId: this.userId,
      lastActivityTime: curDate1,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      // loanRequestId: window.localStorage.getItem("loanRequestId") ,
      loanRequestId: this.loanid,
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
      programTypeId: this.programTypeId,
      lenderId:this.lenderId

    }

    this.apiService.getProcessOverAllBankStatements(bankstatementData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption("Process completed Successfully",true);
        // alert("Process completed succesfully");
        if (this.statusFlow == retailerConstant.retailerStatusFlow) {
          this.createLoanButton = false;
          this.completeProcessButton = true;
          this.gotoAction();
        } else {
          this.gotoAction();
        }
      } else {
        this.set.setOption("Bank Rule Failed",true);
        // alert("Bank Rule Failed");
        this.gotoAction();
      }
    });
  }

  createLoan() {
    var curDate1 = moment().format('YYYY-MM-DD HH:mm:ss');
    const createLoan = {
      userId: this.userId + "",
      lastActivityTime: curDate1,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId") + ""),
      currentActivityId: "25",
      loanRequestId: this.loanid + "",
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType") + ""),
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
    }

    this.apiService.ceateLoanApi(createLoan).subscribe(data => {
      if (data.status == 200) {
        // alert("Loan created Successfully");
        this.set.setOption(data.result,true);
        alert(data.result);
        //  this.createLoanButton=true;
        //  this.completeProcessButton=true;
        this.gotoAction();
      } else {
        this.set.setOption(data.exceptionMessage,false);
        // alert(data.result);
        // alert("Failed to create loan");
        // this.createLoanButton=false;
        //  this.completeProcessButton=true;
        this.gotoAction();
      }
    });

  }
  fileNameCheck(){
    var count=0;
    for(let i=0;i<this.fileDynamicList.length;i++){
      for(let j=0;j<this.fileDynamicList.length;j++){
        if(this.fileDynamicList[i].originalFileName==this.fileDynamicList[j].originalFileName&& i!=j){
          count++;
        }
      }
    }
    return (count!=0)?true:false;
  }
  submit() {
    if(this.fileType=="" || this.fileType == null || this.fileType == undefined){
      this.set.setOption("Please select file type",false);
    }else if(this.fileNameCheck()){
      this.set.setOption("Same File Not Allowed",false);
    }else{
      this.save();
    }
  }
  save(){
    this.submitted = true;
    this.curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    var bankname = [];
    var accName = [];
    var fileContent = [];
    console.log("fileDynamicList::" + JSON.stringify(this.fileDynamicList));
    const bankstatementData = {
      userId: this.userId + "",
      lastActivityTime: this.curDate,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      loanRequestId: this.loanid + "",
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
      fileType: this.fileType,
      programTypeId: this.programTypeId,
      bankData: this.fileDynamicList
    };

    console.log(this.UploadedDocuments);
    for (var i = 0; i < this.fileDynamicList.length; i++) {
     for (var j=0;j< this.UploadedDocuments.length; j++)     
    { if((this.fileDynamicList[i].accountType==this.UploadedDocuments[j].acctTypeName) && 
     (this.fileDynamicList[i].bankName==this.UploadedDocuments[j].bankName && this.UploadedDocuments[j].processStatus=='1'))
       this.duplicate=0;
    }
  }


    console.log("bankstatementData::" + JSON.stringify(bankstatementData));
    if (this.fileType == 'pdf' && this.duplicate==0) {
      this.apiService.getParsedBankTransactions(bankstatementData).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Bank Statement uploaded Successfully",true);
          this.fileDynamicList=[];
          this.ngOnInit();
        } else {
          this.set.setOption("Failed to upload",false);
          this.ngOnInit();
        }
      });
    } else if(this.duplicate==0) {
      this.apiService.getParsedBankStatementExcel(bankstatementData).subscribe(data => {
        if (data.status == 200) {
          this.uploadStatement = true;
          this.excelData = false;
          this.updateFlag = data.result.updateFlag;
          this.List = data.result.dataList;
          this.List1 = data.result.headerList;
          this.fiarray = data.result.FIArry;
          var remarks = "";
          for (let i = 0; i < this.List1.length; i++) {
            var list1 = this.List1[i];
            console.log("list1::"+JSON.stringify(list1));
            if (i == 0) {
              var accountNumber = list1[1];
            } else if (i == 1) {
              var ifsc = list1[1];
            } else if (i == 2) {
              var bankName = list1[1];
            } else if (i == 3) {
              var accountType = list1[1];
            }
            remarks = remarks + list1[2];
          }
          const header = {
            accountNo: accountNumber,
            ifscCode: ifsc,
            bank: bankName,
            accType: accountType,
            remark: remarks,
          };
          this.headerList.push(header);
          console.log("headerList::"+JSON.stringify(this.headerList));
          for (let i = 0; i < this.List.length; i++) {
            var list = this.List[i];
            console.log("list::"+JSON.stringify(list));
            const bankData = {
              month: list[1],
              year: list[2],
              week: list[3],
              totalDebit: list[4],
              totalCredit: list[5],
              bal: list[6],
              desc: list[7],
              EMIBounce: list[8],
              remarks: list[9],
            };
            this.dataList.push(bankData);
          }
          console.log("dataList::"+JSON.stringify(this.dataList));
        } else {
          this.excelData = true;
          this.set.setOption("Failed to upload",false);
          // alert("Failed To Upload");
          window.location.reload();
          // this.openDialog2();
        }
      });
    }
    // else
    // { 
    //     const alert='The Bank '+ this.UploadedDocuments[this.duplicate-1].acctTypeName+' - '+this.UploadedDocuments[this.duplicate-1].accountType+' Account already process - Please remove the bank Statement and reupload';
    //     this.set.setOption(alert,false);
    //     this.duplicate=0;
    // }
  }

  continueProcess() {

    this.curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    var bankname = [];
    var accName = [];
    var fileContent = [];
    var fileType = document.getElementsByName("fileType");
    var name1 = document.getElementsByName("file");

    for (var i = 0; i < name1.length; i++) {
      var fileTypes = (fileType[0] as HTMLInputElement).value;
      var temp = (name1[i] as HTMLInputElement).value;
      var temp1 = temp.split("\\");
      var fileName = temp1[(temp1.length - 1)];
      this.fileDynamicList[i].fileName = fileName;
      this.fileDynamicList[i].password = "";
      this.fileDynamicList[i].fileContent = this.fileDynamicList[i].fileContent;
      this.fileDynamicList[i].processStatus = "0";
      this.fileDynamicList[i].isPw = 0;
    }
    console.log("fileDynamicList::" + JSON.stringify(this.fileDynamicList));
    const bankstatementData = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      loanRequestId: this.loanid,
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
      fileType: fileTypes,
      programTypeId: this.programTypeId,
      bankData: this.fileDynamicList,
      FIARRAY: this.fiarray,
    };
    console.log("bankstatementData::" + JSON.stringify(bankstatementData));
    this.apiService.getParsedBankTransactions(bankstatementData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption("Bank Statement Uploaded Successfully",true);
        // alert("Bank Statement Uploaded Successfully");
        window.location.reload();
      } else {
        this.set.setOption(data.exceptionMessage,false);

        // alert(data.exceptionMessage);
        window.location.reload();
      }
    });
    // this.apiService.processBankStatementExcel(this.fiarray,userId,this.loanid).subscribe(data => {
    // if(data.status==200){
    //   alert("Bank Statement Uploaded Successfully");
    //   window.location.reload();
    //   this.excelData=true;
    // }else{
    //   alert("Failed To Upload");
    // }
    // }, error => console.log(error));     

  }
  reupload() {
    window.location.reload();
  }
  downloadPdf(i) {
    var base64 = this.UploadedDocumentsList[i].encodeData;
    const linkSource = 'data:application/pdf;base64,' + base64;
    const downloadLink = document.createElement("a");
    const fileName = this.UploadedDocumentsList[i].fileSource;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  downloadView(filePath, filename: string) {
    // var url = filePath;
    // window.open(filePath, '_blank');
    if(filePath.indexOf("s3.ap-south-1")!=-1){
      var url1=filePath;
      window.open(url1, '_blank');
    }else{
      var url2=filePath+filename;
      window.open(url2, '_blank');
    }
  }
  addRow() {
    this.filenewDynamic = {
      bankName: '', accountType: '', password: '',
      file: '', fileName: '', fileContent: '', processStatus: '', isPw: 0
    };
    this.fileDynamicList.push(this.filenewDynamic);
    this.changeDetec.detectChanges();
    return true;
  }

  deleteRow(index) {

    if (this.fileDynamicList.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row",false);
      // alert("Can't delete the row when there is only one row");
      return false;
    } else {
      this.fileDynamicList.splice(index, 1);
      return true;
    }
  }
  // openDialog1() {
  //   // const dialogRef = this.dialog.open(PopupPage1);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  //  openDialog2() {
  //   // const dialogRef = this.dialog.open(PopupPage2);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  selectFileName(event) {
    const fileData = {
      fileName: event[0].name
    }
    this.fileNameList.push(fileData);
  }
  isODCCLimitAvailable(i,event){
    var val=event.target.value;
    if(val=='CC Account' || val == 'OD Account' || val == 'CCOD Account'){
      this.fileDynamicList[i].isODCCLimitAvailable=true;

    }else{
      this.fileDynamicList[i].isODCCLimitAvailable=false;
    }
  }
  isPassword(i) {
    var val = this.fileDynamicList[i].isPw;
    // alert(val);
    if (val == 0) {
      this.fileDynamicList[i].isPwavailable=false;
      this.isPwavailable = false;
    } else {
      this.fileDynamicList[i].password = "";
      this.fileDynamicList[i].isPwavailable=true;
      this.isPwavailable = true;
    }
  }
  gotoAction() {
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
      this.HeaderDetails = data.result;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
      this.router.navigate(['report/action'],{ queryParams: { 'loanId':this.loanid,
    'orgId':this.orgId,'programTypeId':this.programId }});
    }, error => console.log(error));
  }

removeBankStatment()
{ 
  this.removeBankData=[];
  let removeList=document.getElementsByName("remove");
  for(let i=0;i<removeList.length;i++)
  {
    let isRemove = (removeList[i] as HTMLInputElement).checked;
    if(isRemove==true)
    {
      var accountType=this.UploadedDocuments[i].acctTypeId.slice(0, this.UploadedDocuments[i].acctTypeId.indexOf(','));
      var bankId=this.UploadedDocuments[i].bankId.slice(0, this.UploadedDocuments[i].bankId.indexOf(','));
      var llaId=this.UploadedDocuments[i].lla_id;
       const removeApiData={
        accountType:accountType,
        bankId:bankId,
        llaId:llaId

       }
       this.removeBankData.push(removeApiData);
   }
  } 
  const data={
    userId:this.userId,
    lastActivityTime:moment().format('YYYY-MM-DD HH:mm:ss'),
    loanRequestId:this.loanid,
    statusFlow:this.statusFlow,
    retailerId:this.crypto.decryt(window.localStorage.getItem("retailerId")),
    currentActivityId:'25',
    retailerType:this.crypto.decryt(window.localStorage.getItem("retailerType")),
    mobileNo: this.mobileNo,
    userMedium:'backendApp',
    programTypeId:this.programTypeId,
    removeBankData: this.removeBankData
     }
    
  this.apiService.removeProcessedBankStatement(data).subscribe(data=>{
    this.set.setOption(data.exceptionMessage,false);
    // alert(data.exceptionMessage);
    window.location.reload();
  },error => console.log(error));
  
}


resetBankStatment(){

const data={
userId:this.userId,
lastActivityTime:moment().format('YYYY-MM-DD HH:mm:ss'),
loanRequestId:this.loanid,
statusFlow:this.statusFlow,
retailerId:this.crypto.decryt(window.localStorage.getItem("retailerId")),
currentActivityId:'25',
retailerType:this.crypto.decryt(window.localStorage.getItem("retailerType")),
mobileNo: this.mobileNo,
userMedium:'backendApp',
programTypeId:this.programTypeId
 }
 this.apiService.resetProcessedBankStatement(data).subscribe(data => {
  if(data.status==200){
    this.set.setOption(data.result,true);
    // alert(data.exceptionMessage);
    this.gotoList();
    window.location.reload();
  }else{
    this.set.setOption(data.exceptionMessage,false);
    // alert(data.exceptionMessage);
  }
}, error => console.log(error)); 


}

goToList(){
  this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
}
 checkStatus(reqId){
    const data = {
      userId : this.userId,
      loanRequestId : this.loanid,
      perfiosProcessId : reqId,
      programTypeId:this.programTypeId
    }
    this.apiService.checkStatus(data).subscribe(data => {
      if(data.status == 200){
        this.set.setOption(data.result,true);
        this.ngOnInit();
      }else{
        this.set.setOption(data.exceptionMessage,false);
        this.ngOnInit();
      }
    }, error => console.log(error));
  }
}
