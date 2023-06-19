import { Component, Inject, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "../../core/api.service";
import * as moment from 'moment/moment.js';
import { gemConstant, retailerConstant, sellerConstant, nonSoleProp, dealerConstant, Constant, UGROLendor,vendorConstant } from '../../core/constant';
import { breadcrumbMessage } from '..//../shared/breadcrumb-message.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment, lender } from '..//../../environments/environment';
import { Currency } from '../../shared/currency.service';
import { Crypto } from '../../shared/crypto.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  fileName: any;
  errrorMSG: any;
  imageEncode = [];
  sanctionConditionList = [];
  internalConditionList=[];
  programList: any;
  @ViewChild('program', { static: true }) program: TemplateRef<any>;
  @ViewChild('standingInstructionPopup', { static: true }) standingInstructionPopup: TemplateRef<any>;
  hideButton: boolean = true;
  actionButton: any;
  id: any;
  idfccheck: boolean = true;
  modeOfPaymentList: any;
  sdfc:boolean;
  modeOfPayment: Array<any> = [];
  uploadedDocs :  any = [];
  pfAmount: any;
  urlerror: boolean = false;
  loanid: any;
  roiList=[];
  subStatusid: any;
  crnDetails:any;
  urlmessage: any;
  virtualAccount:boolean;
  showcasa:boolean;
  urltext: boolean = false;
  urltexts: boolean = false;
  urlmessages: any;
  mobileNo: any;
  showgst:boolean;
  showcrn:boolean=false;
  reasonList: any;
  loanActionstatus: any;
  HeaderDetails: any;
  pendingApiList: any;
  pending: any;
  completed: any;
  programTypeId: any;
  orgId: any;
  closeResult: string;
  appFormButton: boolean;
  gstButton: boolean;
  bureauButton: boolean;
  nachButton: boolean;
  stausId: any;
  pfTypeId: any;
  substatusId: any;
  programId: any;
  statusFlow: any;
  curDate: any;
  gemId: any;
  pfTypeValue: any;
  checkListStatus: boolean;
  customerId: any;
  gemCam: any;
  gemProgramTypeId = gemConstant.gemProgramTypeId;
  retailerProgramTypeId = retailerConstant.retailerProgramTypeId;
  LIVE = retailerConstant.LIVE;
  READY_FOR_LIVE = retailerConstant.READY_FOR_LIVE;
  retailerStatusFlow = retailerConstant.retailerStatusFlow;
  sellerProgramTypeId = sellerConstant.sellerProgramTypeId;
  sellerStatusFlow = sellerConstant.sellerStatusFlow;
  SELLER_GST_RULE_PASS = sellerConstant.SELLER_GST_RULE_PASS;
  SELLER_POSIDEX_PENDING = sellerConstant.SELLER_POSIDEX_PENDING;
  SELLER_DOC_FILENET_COMPLETE = sellerConstant.SELLER_DOC_FILENET_COMPLETE;
  SELLER_BANK_RULE_FAIL = sellerConstant.SELLER_BANK_RULE_FAIL;
  SELLER_GST_PROCESS_PENDING = sellerConstant.SELLER_GST_PROCESS_PENDING;
  nonSoleStatusFlow = nonSoleProp.nonSoleStatusFlow;
  Application_Form = nonSoleProp.Application_Form;
  dealerProgramTypeId = dealerConstant.DEALERProgramTypeId;
  ugroLenderStatusFlow = UGROLendor.UgroStatueFlow;
  ugroLenderProgramTypeId = UGROLendor.UgroProgramTypeId;
  VendorProgramTypeId = vendorConstant.VendorProgramTypeId;
  NACH = nonSoleProp.NACH;
  loanStatusButton: boolean;
  camDownloadButton: boolean;
  gstRuleProcessing: boolean;
  gstRuleProcessingList: any;
  draftApplicationForm: any;
  bankStatmentresetButton: boolean = true;
  getNACHStatusButton: boolean = true;
  downloadLoanApplication: boolean = true;
  CommercialBureauButton: boolean = true;
  DEALERStatusFlow = dealerConstant.DEALERStatusFlow;
  vendorStatusFlow = vendorConstant.VendorStatusFlow;
  userId: any;
  rerunBrandRule: boolean = false;
  runBankRules: boolean = false;
  runConsumerBureau: boolean = false;
  runCommercialRule: boolean = false;
  ugroLender: boolean = false;
  janaLender: boolean = false;
  idfcLender: boolean = false;
  abflLender: boolean = false;
  runConsumerRule = false;
  bankProcessing = false;
  bankRule = false;
  nachPdc = false;
  NachPending = false;
  PDCPending = false;
  downloadForm = false;
  applicationForm = false;
  createLoan = false;
  makeLive = false;
  firstRow = [];
  secondRow = [];
  thirdRow = [];
  fourthRow = [];
  fifthRow = [];
  sixthRow = [];
  seventhRow = [];
  eigthRow = [];
  schemeList = [];
  schemaId: any;
  roleId: any;
  downloadLoanAgreement: any;
  loanexecution: any;
  netbankingUrl: any;
  debitUrl: any;
  nachLinkMsg: any;
  nachLinkMsg1: any;
  debitNachAmount: any;
  netbankingNachAmount: any;
  msgsuccess: boolean = true;
  successmsg: boolean = true;
  downloadTC: any;
  fraudcheckButton: boolean = true;
  creditApproval: boolean = false;
  ConsumerBureauButton: any;
  runConsumerBureauButton: any;
  lenderId: any;
  remarks: any;
  firstCreditApproval: any;
  FCUApproval: any;
  secondCreditApproval: any;
  businessApproval: any;
  camDownload: any;
  finaggCredit: boolean = false;
  lenderCredit: boolean = false;
  finaggOps: boolean = false;
  lenderOps: boolean = false;
  modifyLimit: boolean = false;
  finalLimit: any;
  createdOn: any;
  expiryDate:any;
  crncheck:any;
  
  crnDetailslist:any;
  crnNum:any;
  showopportunity:boolean;
  urnNum:any;
  crnchecks:boolean;
  finalLimitRemarks: any;
  tenure: any;
  customConfigList=[{
    paramName: 'rateChartCode', typeId: '', value: '', functionId: '1001', id: '', lccId: '', userId: this.crypto.decryt(window.localStorage.getItem('userId')),roi:'',activeInd:'1'
  }];
  dataType = [{ id: '1', name: 'String' }, { id: '2', name: 'Int' }, { id: '3', name: 'Float' }, { id: '4', name: 'Long' },
  { id: '5', name: 'Decimal' }, { id: '6', name: 'Boolean' }, { id: '7', name: 'Long' }];
  roi: any;
  currentLimit: any;
  minLimit: any;
  maxLimit: any;
  minRoi: any;
  maxRoi: any;
  todayDate: any;
  futureDate:any;
  errorMsg: any;
  financialCheck: boolean = false;
  financialRule: boolean = false;
  digio: any;
  debitMsg: any;
  netbankingMsg: any;
  digioAmount: any;
  digioesign: any;
  borrowerRoiType: any;
  borrowerTenureType: any;
  adjustMaxPercentage: any;
  adjustMinPercentage: any;
  currentRoi: any;
  tenureRoi: any;
  displayroi: any;
  docVarification: boolean = false;
  internalSanctionCondition: boolean = false;
  pdCall: boolean = false;
  pdVarification: boolean = false;
  crnApiCall: boolean = false;
  dedupeManual: boolean = false;
  dedupeCall: boolean = false;
  amlManual: boolean = false;
  amlApi: boolean = false;
  roiRateChart=false;
  aadhaarVault: boolean = false;
  BreApiCall: boolean = false;
  BreApiWaitingForResponse: boolean = false;
  modeOfPayments: any;
  nachTypeId: any;
  anchorRecommdation: any;
  actionId:any;
  corporateBuyerSelection:any;
  standingRequired:any;
  enach: any;
  availLimit: string;
  IId: any;
  err:boolean;
  delsanctionConditionList = [];
  formattedDate: any;
  closerDate: any;
  delinternalConditionList: any;
  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private crypto: Crypto,
    private modalService: NgbModal, private apiService: ApiService, private set: breadcrumbMessage, private currency: Currency,private changeDetec: ChangeDetectorRef) { }
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\+\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  preventTyping() {
    return false;
  }
  netbanking() {
    this.urltexts = false;
    this.msgsuccess = true;
    this.urlmessage = "";
    var data = {
      "lastActivityTime": "",
      "userMedium": "backend",
      "enachType": "api",
      "userId": this.userId,
      "loanRequestId": this.loanid,
      "loanDisbursalId": "0",
      "mobileNo": this.mobileNo,
      "custName": this.HeaderDetails[0].customerName,
    }
    this.apiService.generateEnachLink(data).subscribe(data => {
      if (data.status == 200) {
        this.urlmessage = data.result.digio;
        if (this.urlmessage == "-") {
          this.msgsuccess = false
        }
        this.urltext = true;

      }
      else {
        this.msgsuccess = false;
        this.urlmessage = data.result.exceptionMessage
        this.urltext = true;
      }

    })
  }


casaAccountCreation(){
  const data={
    userId: this.userId,
    lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    // lastActivityTime: "2022-01-06 09:42:41",
    userMedium: "Backend",
    loanRequestId: this.loanid,
    orgId: this.orgId,
  };
  this.apiService.casaAccountCreation(data).subscribe(data => {
    if (data.status == 200) {
      this.set.setOption('Status Updated Successfully', true);
       this.ngOnInit();
    } else {
      this.set.setOption(data.exceptionMessage, false);
      // this.ngOnInit();
    }
  });
}
uploadStandingInstruction(){
  if (this.fileName != null && this.fileName != undefined && this.fileName != '') {
    const datas=[];
    const filedata = {
      documentTypeId: "78",
      fileName: this.loanid + '_' + this.fileName,
      fileContent: this.imageEncode[0].split(',')[1],
    };
    datas.push(filedata);
    const curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const docDetails = {
      userId: this.userId,
      lastActivityTime: curDate,
      retailerId: this.crypto.decryt(window.localStorage.getItem('retailerId')),
      currentActivityId: '0',
      loanRequestId: this.loanid,
      retailerType: this.crypto.decryt(window.localStorage.getItem('retailerType')),
      mobileNo: this.mobileNo,
      userMedium: 'backEndApp',
      docData: datas
    };
  this.apiService.uploadDocuments(docDetails).subscribe(data => {
    if ((data.status == 200)) {
      this.casaAccountCreation();
      this.modalService.dismissAll();
    }else{
      this.modalService.dismissAll();
      this.errrorMSG="Standing Instruction Upload Failed";
    }
  });
  }else{
    this.errrorMSG="Please Choose File";
  }
 }

 ext(filename) {
  return filename.split('.').pop();
}
 uploadfile(index, file){
  const ext = this.ext(file[0].name);
  if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'pdf' || ext == 'xlsx' ||ext == 'JPG' || ext == 'JPEG' || ext == 'PNG' || ext == 'PDF' || ext == 'XLSX') {
     const  reader = new FileReader();
    reader.readAsDataURL(file[0]);
    this.fileName=file[0].name;
    const t = this;
    reader.onload = function () {
      t.imageEncode.push(reader.result);
    };
  } else {
    this.errrorMSG="Please choose Image,Excel or PDF Files";
    const files = <HTMLInputElement>document.getElementById('myFile');
      files.value = '';
  }
  }
  
statusActionFunction(routerLink,actionId,loanid,orgId,programTypeId){
  this.actionId=actionId;
  var curDate= moment().format('YYYY-MM-DD HH:mm:ss');
  if(routerLink!='/report/sellerAction'){
    this.router.navigate([routerLink, actionId, loanid,orgId,programTypeId]);
  }else{
    if(this.actionId==14 ||this.actionId== 49 ||this.actionId== 68 ){  //Process GST Rule
      const gstData={
        userId:this.userId,
        loanRequestId:this.loanid,
        orgId:this.orgId,
        lastActivityTime:this.curDate,
        mobileNo:this.mobileNo,
        userMedium:"backendApp",
        statusFlow:this.statusFlow,
        statusFlag:'0'
      }
      this.apiService.updateGstnRule(gstData).subscribe(data => {
        if(data.status==200){
          this.set.setOption(data.result,true);
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage,false);
          this.ngOnInit();
        }
      }, error => console.log(error));     
    }else if(this.actionId==15 || this.actionId==28 || this.actionId==34||this.actionId==50){   //Posidex call
      const crnData={
      userId:this.userId,
      loanRequestId:this.loanid,
      lastActivityTime:curDate,
      mobileNo:this.mobileNo,
      userMedium:"backendApp",
      statusFlow:this.statusFlow
    }
      this.apiService.createCrn(crnData).subscribe(data => {
        if(data.status==200){
          this.set.setOption(data.result,true);
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage,false);
          this.ngOnInit();
        }
      }, error => console.log(error));     
    }else if(this.actionId==16||this.actionId==51){  //Commercial Bureau Call
      const bureauData={
        userId:this.userId,
        loanRequestId:this.loanid,
        lastActivityTime:curDate,
        orgId:this.orgId,
        mobileNo:this.mobileNo,
        statusFlow:this.statusFlow,
        userMedium:"backendApp"
      }
    this.apiService.updatebureauCall(bureauData).subscribe(data => {
      if(data.status==200){
        this.set.setOption(data.result,true);
          this.ngOnInit();
      }else{
        this.set.setOption(data.exceptionMessage,false);
        this.ngOnInit();
      }
    }, error => console.log(error));     
    }else if(this.actionId==17 || this.actionId==52){   //Run Bureau rule
      const BureauRuleData={
        userId:this.userId,
        loanRequestId:this.loanid,
        orgId:this.orgId,
        lastActivityTime:curDate,
        mobileNo:this.mobileNo,
        statusFlow:this.statusFlow,
        userMedium:"backendApp",
        statusFlag:'0'
      }
      this.apiService.updatebureauRule(BureauRuleData).subscribe(data => {
        if(data.status==200){
          this.set.setOption(data.result,true);
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage,false);
          this.ngOnInit();
        }
      }, error => console.log(error)); 
    }else if(this.actionId==18 || this.actionId==29 || this.actionId==35 || this.actionId==54){   //Create Loan Application
      const Data={
        userId:this.userId,
        loanRequestId:this.loanid,
        lastActivityTime:curDate,
        mobileNo:this.mobileNo,
        statusFlow:this.statusFlow,
        userMedium:"backendApp"
      }
      this.apiService.createLoan(Data).subscribe(data => {
        if(data.status==200){
          this.set.setOption(data.result,true);
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage,false);
          this.ngOnInit();
        }
      }, error => console.log(error)); 
    }else if(this.actionId==22 || this.actionId==33 || this.actionId==57){   //Check Nach Status
      const Data={
        userId:this.userId,
        loanRequestId:this.loanid,
        lastActivityTime:curDate,
        statusFlow:this.statusFlow
      }
      this.apiService.checkNachStatus(Data).subscribe(data => {
        if(data.status==200){
          this.set.setOption(data.result,true);
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage,false);
          this.ngOnInit();
        }
      }, error => console.log(error)); 
    }else if(this.actionId==30 || this.actionId==58|| this.actionId==46){   //Check loan Status
      const Data={
        userId:this.userId,
        lastActivityTime:curDate,
        loanRequestId:this.loanid,
        statusFlow:this.statusFlow
      }
      this.apiService.checkLoanStatus(Data).subscribe(data => {
        if(data.status==200){
          this.set.setOption(data.result,true);
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage,false);
          this.ngOnInit();
        }
      }, error => console.log(error)); 
    }else{
      this.set.setOption("Request Failed",false);
      this.ngOnInit();
    }
  }
  
}

showcrnpop(content)
{const data={
  "userId":this.userId,
  "loanRequestId":this.loanid,
  "mobileNo":this.mobileNo,
  "lastActivityTime":moment().format('YYYY-MM-DD HH:mm:ss')
}
this.apiService.applicantCRNdata(data).subscribe(data => {
  if(data.status==200){

this.crnDetails=data.result.list;
  }else{
    this.set.setOption(data.exceptionMessage,false);
  }
}, error => console.log(error)); 
  this.modalService.open(content, { size: 'xl' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  aadhar() {
    this.urlmessages = "";
    this.successmsg = true;
    this.urltexts = false;
    var data = {
      "lastActivityTime": "",
      "userMedium": "backend",
      "enachType": "esign",
      "userId": this.userId,
      "loanRequestId": this.loanid,
      "loanDisbursalId": "0",
      "mobileNo": this.mobileNo,
      "custName": this.HeaderDetails[0].customerName,
    }
    this.apiService.generateEnachLink(data).subscribe(data => {
      if (data.status == 200) {

        this.urlmessages = data.result.digioesign;
        if (this.urlmessages == "-") {
          this.successmsg = false;
        }
        this.urltexts = true;
      }
      else {
        this.successmsg = false;
        this.urlmessages = data.exceptionMessage
        this.urlerror = true;
      }

    })
  }
  createSdfc(){
    console.log("sdfc is here")
    const sdfcData={
      userId:this.userId,
      loanRequestId:this.loanid,
      lastActivityTime:moment().format('YYYY-MM-DD HH:mm:ss'),
      mobileNo:this.mobileNo,
      orgId:this.orgId,
      userMedium:"backendApp",
      statusFlow:this.statusFlow
    }
      this.apiService.createSdfc(sdfcData).subscribe(data => {
        console.log("sdfc now")
        if(data.status==200){
          this.set.setOption(data.result,true);
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage,false);
          this.ngOnInit();
        }
      }, error => console.log(error)); 
    }
    createvirtualAccount(){
      const sdfcData={
        userId:this.userId,
        loanRequestId:this.loanid,
        lastActivityTime:moment().format('YYYY-MM-DD HH:mm:ss'),
        mobileNo:this.mobileNo,
        orgId:this.orgId,
        userMedium:"backendApp",
        statusFlow:this.statusFlow
      }
        this.apiService.createVirtualAccount(sdfcData).subscribe(data => {
          if(data.status==200){
            this.set.setOption(data.result,true);
            this.ngOnInit();
          }else{
            this.set.setOption(data.exceptionMessage,false);
            this.ngOnInit();
          }
        }, error => console.log(error)); 
      }
  nach(content) {
    this.urltext = false;
    this.urltexts = false;
    if (this.HeaderDetails[0].lenderId != 100) {
      this.idfccheck = false;
    }
    this.netbankingUrl = "";
    this.debitUrl = "";
    this.nachLinkMsg = "";
    this.nachLinkMsg1 = "";
    var data = {
      "lastActivityTime": "",
      "userMedium": "backend",
      "userId": this.userId,
      "loanRequestId": this.loanid,
      "loanDisbursalId": "0",
      "mobileNo": this.mobileNo,
      "custName": this.HeaderDetails[0].customerName,
    }
    this.apiService.generateEnachLink(data).subscribe(data => {
      if (data.status == 200) {
        this.debitUrl = data.result.debitUrl;
        this.netbankingUrl = data.result.netbankingUrl;
        this.debitNachAmount = (data.result.debitNachAmount) ? data.result.debitNachAmount : "0.0";
        this.netbankingNachAmount = (data.result.netbankingNachAmount) ? data.result.netbankingNachAmount : "0.0";
        this.digioAmount = (data.result.digioAmount) ? data.result.digioAmount : "0.0";
        this.digio = data.result.digio;
        this.digioesign = data.result.digioesign;

        this.debitMsg = data.result.debitMsg;
        this.netbankingMsg = data.result.netbankingMsg;
        this.aadhar();
        this.netbanking();
      } else {
        this.nachLinkMsg = data.result.debitMsg;
        this.nachLinkMsg1 = data.result.netbankingMsg;
      }
      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    })
  }
  crnUpdation() {for(const l of this.crnDetailslist) {
    l.userId=this.crypto.decryt(window.localStorage.getItem('userId'));
  }
  this.apiService.updateCrnDetails(this.crnDetailslist).subscribe(obj=> {
    if(obj.status==200) {
      this.modalService.dismissAll();
      this.set.setOption('CRN details Updated Successfully', true);
      this.updateAcceptStatus();
    } else {
      this.modalService.dismissAll();
      this.set.setOption(obj.exceptionMessage,false);
    }
  });
}

crnsaver(a) {a.crnNo = Number(a.crnNo);
  this.crnchecks=true;
}
  updateCrnStatus(content) {
  
    this.crncheck=1;
    this.crnchecks=false;
   // this.updateAcceptStatus();
    const data= {
      'loanRequestId':this.loanid
    };
  
    this.apiService.getCrnDetails(data).subscribe(objRes=> {
      if(objRes.status==200) {
  this.crnDetailslist = objRes.result;
  this.crncheck=0;
  }
    });
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
  

  updateAcceptStatus() {
    const data = {
      loanId: this.loanid,
      subStatusId: this.substatusId,
      statusId: this.stausId,
      userId: this.userId,
      userMedium: 'backendApp',
      statusFlow: this.statusFlow,
      lenderId: this.lenderId
    };
    this.apiService.updateAcceptStatus(data).subscribe(data => {
      if (data.status == 200) {
        if((this.stausId=="230"&&this.subStatusid=="540")||(this.stausId=="230"&&this.subStatusid=="539")){
          this.set.setOption('Status Updated Successfully', true);
          this.checkStandingInstructionsForAutoDisbursement();
          this.showcasa=true;
        }else{
        this.set.setOption('Status Updated Successfully', true);
        this.ngOnInit();
        }
      } else {
        this.set.setOption('Failed to update', false);
        this.ngOnInit();
      }
    });
  }
  checkStandingInstruction(){
    if(this.standingRequired){
      this.errrorMSG='';
      this.modalService.open(this.standingInstructionPopup, { size: 'lg', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{
     this.casaAccountCreation(); 
    }
  }
  
  rejectPopup(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  updateRejectStatus() {
    const data = {
      loanId: this.loanid,
      subStatusId: this.substatusId,
      statusId: this.stausId,
      userId: this.userId,
      userMedium: 'backendApp',
      statusFlow: this.statusFlow,
      remarks: this.remarks,
      lenderId: this.lenderId
    };
    this.apiService.updateRejectStatus(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption("Status updated Successfully", true);
        this.ngOnInit();
        this.modalService.dismissAll();
      } else {
        this.set.setOption("Failed to update", false);
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    });
  }

  resetStatusHistory() {
    // if (this.completed) {
    this.completed = [];
    this.pending = [];
    this.firstRow = [];
    this.secondRow = [];
    this.thirdRow = [];
    this.fourthRow = [];
    this.fifthRow = [];
    this.sixthRow = [];
    this.seventhRow = [];
    this.eigthRow = [];
    // }
  }
  rejectedFa(id: number) {
    this.router.navigate(['report/rejectedFa', id, this.loanid]);
  }
  telcoRule(id: number) {
    this.router.navigate(['report/telcoRule', id, this.loanid]);
  }
  checklist(id: any, loanid: any, orgId: any, retailerId: any) {
    this.router.navigate(['report/checklist', id, loanid, orgId, retailerId]);
  }

  
  runFinancialRule() {
    const data = {
      'userId': this.userId,
      'orgId': this.orgId,
      'loanRequestId': this.loanid,
      'userMedium': 'Backend'
    }
    this.apiService.runFinancialRule(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    });
  }

  internalSanctionPopUp(content){
    this.closerDate =this.formattedDate;

    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.apiService.getSanctionCondition(this.loanid).subscribe(res => {
      this.internalConditionList = res.result;
      // this.delinternalConditionList = res.result.map(item => {
      //   delete item.expiryDate;
      //   return item;
      // });
      if (this.internalConditionList.length == 0) {
        this.addInternalRow();
      }
    }, error => console.log(error));
  }
  addInternalRow(){
    const internalSanctionRow = {
      id: 0,
      loanId: this.loanid, 
      conditionDesc: '',
      activeInd: '1', 
      createdBy: this.userId, 
      createdOn: moment().format('YYYY-MM-DD HH:mm:ss'), 
      remarks: '', 
      type: '1',
      closerDate:this.closerDate
    }; 
    this.internalConditionList.push(internalSanctionRow);
    return true;

  }
  saveInternalSanction(){
    const data = {
      statusFlow:this.statusFlow,
      loanId: this.loanid,
      userId: this.userId,
      sanctionConditionList:this.internalConditionList
    }
    this.apiService.saveSanctionCondition(data).subscribe((res)=>{
      if(res.status == 200){
        const data = {
          userId: this.userId,
          lastActivityTime: this.curDate,
          userMedium: 'Backend',
          loanId: Number(this.loanid),
          orgId: this.orgId,
          subStatusId: this.substatusId,
          statusId: this.stausId,
        }
        this.apiService.updateStatus(data).subscribe(data => {
          if (data.status == 200) {
            this.set.setOption(data.exceptionMessage, true);
            this.modalService.dismissAll();
            this.ngOnInit();
          } else {
            this.err=true;
            this.errorMsg=data.exceptionMessage;
          }
        });
      } else {
        this.err=true;
        this.errorMsg=res.exceptionMessage;
      }
    })
  }
  reviewModifyLimit(content) {
    // this.finalLimit='';
    // this.roi='';
    this.tenure = '';
    this.schemaId = "0";
    this.createdOn = this.todayDate;
    // this.expiryDate= this.todayDate;
    this.expiryDate =this.formattedDate;
    this.finalLimitRemarks = '';
    this.schemeList = [];
    this.modeOfPayments = '';
    this.pfAmount = '';
    this.modeOfPaymentList = [];
    this.apiService.getSchemaList(this.programId).subscribe(data => {
      if (data.status == 200) {
        this.schemeList = data.result;
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });

    this.apiService.getCommonList().subscribe(data => {
      if (data.status == 200) {
        this.modeOfPaymentList = data.result.modeOfPayment;
      }
    });

    this.apiService.getFinalLimitRangelimit(this.loanid).subscribe(res => {
      if (res.status == 200) {
        this.currentLimit = res.result.creditLimit;
        this.minLimit = res.result.minLimit;
        this.maxLimit = res.result.maxLimit;
        this.minRoi = res.result.minRoi;
        this.maxRoi = res.result.maxRoi;
        this.currentRoi = res.result.currentRoi;
        this.tenureRoi = res.result.tenureRoi;
        console.log("this.tenureRoi::" + JSON.stringify(res.result));
        this.borrowerRoiType = res.result.borrowerRoiType;
        this.borrowerTenureType = res.result.borrowerTenureType;
        this.adjustMaxPercentage = res.result.adjustMaxPercentage;
        this.roiList=res.result.roi;
        this.adjustMinPercentage = res.result.adjustMinPercentage;
        this.finalLimit = res.result.creditLimit;
        this.customerId = res.result.customerId;
        this.pfTypeId = (res.result.pfTypeName == 'Flat')?'1':'2';
        this.pfTypeValue = res.result.pfTypeValue;
        // this.pfAmount = res.result.PFAmount;
        // this.modeOfPayment = res.result.paymentModeList;
        console.log("this.roi::") + this.roi;
        console.log("this.finalLimit::" + this.finalLimit);
        this.modalService.open(content, { size: 'xl' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      } else {
        this.set.setOption(res.exceptionMessage, false);
      }
    }, error => console.log(error));
    this.apiService.getSanctionCondition(this.loanid).subscribe(res => {
      this.sanctionConditionList = res.result;
      // this.delsanctionConditionList = res.result;
      // this.delsanctionConditionList = res.result.map(item => {
      //   delete item.closerDate;
      //   return item;
      // });
      if (this.sanctionConditionList.length == 0) {
        this.addRow();
      }
    }, error => console.log(error));
  }

  addRow() {
    const newDynamic = {
      id: 0, loanId: this.loanid, conditionDesc: '',activeInd: '1', createdBy: this.userId, createdOn: moment().format('YYYY-MM-DD HH:mm:ss'), remarks: '', type: '2',expiryDate:this.expiryDate
    };
    this.sanctionConditionList.push(newDynamic);
    this.changeDetec.detectChanges();
    return true;
  }

  deleteRow(index) {
    if (this.sanctionConditionList.length == 1) {
      this.errorMsg = "Can't delete the row when there is only one row";
      return false;
    } else {
      this.sanctionConditionList.splice(index, 1);
      return true;
    }
  }
  // "currentRoi": "0.0",
  // "maxLimit": "30000.0",
  // "maxRoi": "24.0",
  // "adjustMaxPercentage": "14.0",
  // "customerId": "1049",
  // "creditLimit": "1000000",
  // "minLimit": "20000.0",
  // "adjustMinPercentage": "1
  limitChnage() {
    this.errorMsg = "";
    if (!(Number(this.minLimit) <= Number(this.finalLimit) && Number(this.finalLimit) <= Number(this.maxLimit))) {
      this.errorMsg = "Finanl limit Range should be " + this.minLimit + " to " + this.maxLimit;
    }
  }
  roiChange() {
    this.errorMsg = "";
    if (!(Number(this.minRoi) <= Number(this.roi) && Number(this.roi) <= Number(this.maxRoi))) {
      this.errorMsg = "Roi Range should be " + this.minRoi + " to " + this.maxRoi;
    }
  }
  roicheck() {
    for (let s of this.tenureRoi) {
      if (s.tenure == this.tenure) {
        this.roi = s.roi;
        this.roiValidation();
      }
      
    }
  }
  saveFinalLimit() {
    
    this.errorMsg = "";
    this.customConfigList[0].roi=this.roi;
    if (!(Number(this.minLimit) <= Number(this.finalLimit) && Number(this.finalLimit) <= Number(this.maxLimit))) {
      this.errorMsg = "Final limit Range should be " + this.minLimit + " to " + this.maxLimit;
    } else if (!(Number(this.minRoi) <= Number(this.roi) && Number(this.roi) <= Number(this.maxRoi))) {
      this.errorMsg = "Roi Range should be " + this.minRoi + " to " + this.maxRoi;
    }else if (this.tenure == null || this.tenure == undefined || this.tenure == 0) {
      this.errorMsg = "please enter valid tenure days";
    } 
    else if (this.schemaId == null || this.schemaId == undefined || (this.programTypeId == this.sellerProgramTypeId && this.schemaId == '0')) {
      this.errorMsg = "please enter valid Scheme";
    } else if (this.roiRateChart && (this.customConfigList[0].paramName==null || this.customConfigList[0].paramName==undefined || this.customConfigList[0].paramName=='')) {
      this.errorMsg = 'please Enter Param Name';
    } else if (this.roiRateChart && (this.customConfigList[0].typeId==null || this.customConfigList[0].typeId==undefined || this.customConfigList[0].typeId=='')) {
      this.errorMsg = 'please Enter Type';
    } else if (this.roiRateChart && (this.customConfigList[0].value==null || this.customConfigList[0].value==undefined || this.customConfigList[0].value=='')) {
      this.errorMsg = 'please Enter Value';
    } else if (this.roiRateChart && (this.customConfigList[0].roi==null || this.customConfigList[0].roi==undefined || this.customConfigList[0].roi=='')) {
      this.errorMsg = 'please Enter Roi';
      //  }   else  if (this.pfTypeId == null || this.pfTypeId == undefined || this.pfTypeId == '') {
      //   this.errorMsg = 'please choose Pf Type';
      // } else  if (this.pfTypeValue == null || this.pfTypeValue == undefined || this.pfTypeValue == '') {
      //   this.errorMsg = 'please enter valid PF value';
      // } else  if (this.pfAmount == null || this.pfAmount == undefined || this.pfAmount == '') {
      //   this.errorMsg = 'please enter valid PF Amount';
      // } else if (this.modeOfPayments == null || this.modeOfPayments == undefined || this.modeOfPayments == '') {
      //   this.errorMsg = 'please choose Mode Of Payment';
      // } else if (this.roiRateChart && (this.customConfigList[0].paramName==null || this.customConfigList[0].paramName==undefined || this.customConfigList[0].paramName=='')) {
      //   this.errorMsg = 'please Enter Param Name';
      }
 
    
    else {
      if(this.roiRateChart) {
        this.apiService.saveCustomConfiguration(this.programId, this.lenderId, this.customConfigList)
        .subscribe(data => {
          if(data.status==200) {
            this.modalService.dismissAll();
            var count = 0;
            for (let i = 0; i < this.sanctionConditionList.length; i++) {
              if (this.sanctionConditionList[i].conditionDesc == undefined || this.sanctionConditionList[i].conditionDesc == null || this.sanctionConditionList[i].conditionDesc == '') {
                count++;
                // this.set.setOption("please enter Condition Describtion");
                this.errorMsg = 'please enter Condition Describtion';
                break;
              } 
              // else if (this.sanctionConditionList[i].type == undefined || this.sanctionConditionList[i].type == null || this.sanctionConditionList[i].type == '') {
              //   count++;
              //   this.errorMsg = 'please enter Type';
              //   break;
              // }
            }
            if (count == 0) {
            const data = {
              finalLimit: parseFloat(this.finalLimit).toFixed(2),
              roi: parseFloat(this.roi).toFixed(2),
              tenure: this.tenure,
              createdOn: this.createdOn,
              remarks: this.finalLimitRemarks,
              statusFlow: this.statusFlow,
              loanId: this.loanid,
              isLive:'0',
              userMedium: 'Backend',
              userId: this.userId,
              lenderId: this.lenderId,
              schemaId: this.schemaId,
              borrowerRoiType: this.borrowerRoiType,
              borrowerTenureType: this.borrowerTenureType,
              PFAmount: this.pfAmount.toString(),
              paymentMode: this.modeOfPayments,
              pfTypeId  : this.pfTypeId,
              pfTypeValue   : this.pfTypeValue,
              sanctionConditionList: this.sanctionConditionList
            };
            this.apiService.saveFinalLimits(data).subscribe(data => {
              if (data.status == 200) {
                this.modalService.dismissAll();
                this.ngOnInit();
                this.set.setOption(data.exceptionMessage, true);
              } else {
                this.ngOnInit();
                this.set.setOption(data.exceptionMessage, false);
              }
            });
          }else{
            this.set.setOption(data.exceptionMessage,false);
          }
         } else {
            this.set.setOption(data.exceptionMessage,false);
          }
        });
      } else{
      // this.modalService.dismissAll();
      var count = 0;
      for (let i = 0; i < this.sanctionConditionList.length; i++) {
        if (this.sanctionConditionList[i].conditionDesc == undefined || this.sanctionConditionList[i].conditionDesc == null || this.sanctionConditionList[i].conditionDesc == '') {
          count++;
          // this.set.setOption("please enter Condition Describtion");
          this.errorMsg = 'please enter Condition Describtion';
          break;
        } 
        // else if (this.sanctionConditionList[i].type == undefined || this.sanctionConditionList[i].type == null || this.sanctionConditionList[i].type == '') {
        //   count++;
        //   this.errorMsg = 'please enter Type';
        //   break;
        // }
      }
      if (count == 0) {
      const data = {
        finalLimit: parseFloat(this.finalLimit).toFixed(2),
        roi: parseFloat(this.roi).toFixed(2),
        tenure: this.tenure,
        createdOn: this.createdOn,
        remarks: this.finalLimitRemarks,
        statusFlow: this.statusFlow,
        loanId: this.loanid,
        userMedium: 'Backend',
        userId: this.userId,
        lenderId: this.lenderId,
        schemaId: this.schemaId,
        borrowerRoiType: this.borrowerRoiType,
        borrowerTenureType: this.borrowerTenureType,
        PFAmount: "100",
        paymentMode: "1",
        sanctionConditionList: this.sanctionConditionList

        // PFAmount: this.pfAmount,
        // paymentMode: this.modeOfPayments
      }
      this.apiService.saveFinalLimits(data).subscribe(data => {
        if (data.status == 200) {
          this.modalService.dismissAll();
          this.ngOnInit();
          this.set.setOption(data.exceptionMessage, true);
        } else {
          this.ngOnInit();
          this.set.setOption(data.exceptionMessage, false);
        }
      });
    }else{

    }
  }
  }
  }

  clearMsg() {
    this.errorMsg = '';
  }

  pfValidation() {
    if (this.pfTypeId == '1') {
      this.pfAmount = this.pfTypeValue;
    } else if (this.pfTypeId == '2') {
      if (this.pfTypeValue > 100) {
        this.errorMsg = 'Pf Percentage Should Not Above 100%';
        this.pfAmount = 0;
        this.pfTypeValue = 0;
        setTimeout(() => {
          this.clearMsg();
        }, 5000);
        }
          this.pfAmount = (this.finalLimit * this.pfTypeValue / 100).toFixed(2);

    }

  }
  reRunBrandRule() {
    const data = {
      "currentActivityId": "0",
      "lastActivityTime": this.curDate,
      "loanRequestId": this.loanid,
      "userId": this.userId,
      "userMedium": "backendApp",
      "mobileNumber": this.mobileNo,
      "programTypeId": this.programTypeId,
      "retailerId": this.orgId,
      "retailerType": "2",
      "statusFlag":"1"
    }
    this.apiService.reEunBrandRule(data).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, true);
          this.ngOnInit();
        } else {
          this.set.setOption(data.message, true);
          this.ngOnInit();

        }
        // alert(data.message);
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    });
  }
  action(actionId: any) {
    // switch (actionId){
    //   case Constant.Merchant_analysis_Call:
    //     this.merchantAnalysisApiCall();  
    //   case Constant.Merchant_analysis_Call:
    //     this.merchantAnalysisRule();
    //   case Constant.Penny_Drop_API_call:
    //     this.pennyDropApi();
    //   case Constant.Rerun_Bank_Rule:
    //     this.rerunBankRules();
    //   case Constant.Rerun_Brand_Rule:
    //     this.rerunBrandRules();
    //   case Constant.Rerun_Bureau_Rule:
    //     this.rerunBureauRules();
    //   case Constant.program_selection:

    // }
    if (actionId == Constant.Merchant_analysis_Call) {
      this.merchantAnalysisApiCall();
    } else if (actionId == Constant.Merchant_analysis_Rule) {
      this.merchantAnalysisRule();
    } else if (actionId == Constant.Penny_Drop_API_call) {
      this.pennyDropApi();
    } else if (actionId == Constant.Rerun_Bank_Rule) {
      this.rerunBankRules();
    } else if (actionId == Constant.Rerun_Brand_Rule) {
      this.rerunBrandRules();
    } else if (actionId == Constant.Rerun_Bureau_Rule) {
      this.rerunBureauRules();
    } else if (actionId == Constant.program_selection) {
      this.programSelection(this.program);
    }
  }
  programSelection(content) {
    this.errorMsg="";
    this.apiService.getHulProgramList(this.loanid, 1).subscribe(data => {
      if (data.status == 200) {
        this.programList = data.result;
        // this.programTypeId= this.programList[0].programTypeId
      }
    });
    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  roiValidation() {
 
      this.roiRateChart=true;
          for(const r of this.roiList) {
            if(Number(r.roi)==Number(this.roi)) {
              this.roiRateChart=false;
              break;
            }
          }
        }
  

  saveProgram() {
   
    if (this.isNullorUndefinedorEmpty(this.programId)) {
      this.errorMsg = "Please Choose Program";
    } else  if (this.isNullorUndefinedorEmpty(this.anchorRecommdation)&& this.programTypeId=='6') {
      this.errorMsg = "Please Enter Anchor Recommdation";
    } else {
      const data = {
        loanId: this.loanid,
        orgId: this.orgId,
        programId: this.programId,
        anchorRecommdation:(this.anchorRecommdation=="")?'0':this.anchorRecommdation,
        userId: this.userId,
        currentActivityId: '65',
        userMedium: 'Backend',
      }
      this.apiService.saveProgramDetails(data).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption(data.exceptionMessage, true);
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
        this.modalService.dismissAll();
      });
    }
  }

  close() {
    this.modalService.dismissAll();
  }

  merchantAnalysisRule() {
    const data = {
      loanRequestId: this.loanid,
      userId: this.userId,
      userMedium: 'Backend',
      docNo: this.HeaderDetails[0].panNo
    }
    this.apiService.merchantAnalysisRule(data).subscribe(data => {
      if (data.Status == 200) {
        this.ngOnInit();
      } else {
        this.ngOnInit();
      }
    });
  }
  pennyDropApi() {
    const data = {
      loanRequestId: this.loanid,
      userId: this.userId,
      userMedium: 'Backend'
    }
    this.apiService.pennyDropApiCall(data).subscribe(data => {
      if (data.status == 200) {
        this.ngOnInit();
      }
    });
  }
  rerunBankRules() {
    // if(this.ugroLender){

    // }else if(this.janaLender){

    // }else if(this.idfcLender){

    // }

    const bankstatementData = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      loanRequestId: this.loanid,
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
      programTypeId: this.programTypeId,
      lenderId: this.lenderId,
      statusFlag:"1"
    }
    this.apiService.getProcessOverAllBankStatements(bankstatementData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    });

  }
  rerunBrandRules() {

  }
  rerunBureauRules() {

  }
  merchantAnalysisApiCall() {
    const data = {
      fileName: '',
      fileNameBack: '',
      mobileNo: this.mobileNo.toString(),
      fileType: '1',
      userId: window.localStorage.getItem('userId'),
      lastActivityTime: this.curDate,
      loanRequestId: this.loanid,
      currentActivityId: '56',
      name: this.HeaderDetails[0].customerName,
      lastName: '',
      // dob : (this.dob) ? moment(this.dob).format('DD-MM-YYYY'): '',
      address: '',
      docNo: this.HeaderDetails[0].panNo,
      gender: '',
      userMedium: "PWA"
    }
    this.apiService.processHUlpan(data).subscribe(data => {
      if (data.status == 200) {
        this.ngOnInit();
      } else {
        this.ngOnInit();
      }
    });
  }
  ngOnInit() {
    this.availLimit = window.localStorage.getItem('availLimit_x');
    console.log("avail99999::::::::::;;"+this.availLimit);
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.todayDate = moment().format('YYYY-MM-DD');
    this.futureDate = moment().add(1, 'days');
    this.formattedDate = this.futureDate.format('YYYY-MM-DD');
    this.gstRuleProcessing = true;
    this.bureauButton = true;
    this.createLoan = false;
    this.fraudcheckButton = true;
    this.sdfc=false;
this.virtualAccount=false;
    this.ConsumerBureauButton = true;
    this.runConsumerBureauButton = true;
    this.gstButton = true;
    this.appFormButton = true;
    this.nachButton = true;
    this.gemCam = true;
    this.camDownloadButton = true;
    this.loanStatusButton = true;
    this.checkListStatus = false;
    this.draftApplicationForm = true;
    this.route.queryParams.subscribe(params => {
      this.programTypeId = params['programTypeId'];
      this.loanid = params['loanId'];
      this.orgId = params['orgId'];
      this.nonStopFlag = params['nonStopFlag'];
    })

    this.apiService.getPendingApiList(this.loanid)
      .subscribe(data => {
        if (data.status == 200) {
          this.pendingApiList = data.result;
        }
      });
    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails = data.result;
        this.stausId = this.HeaderDetails[0].stausId;
        this.substatusId = this.HeaderDetails[0].substatusId;
        this.subStatusid = this.HeaderDetails[0].substatusId;
        this.programTypeId = this.HeaderDetails[0].programTypeId;
        this.programId = this.HeaderDetails[0].programId;
        this.statusFlow = this.HeaderDetails[0].statusflow;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        if((this.stausId=="230"&&this.subStatusid=="540")||(this.stausId=="230"&&this.subStatusid=="539")){
          this.set.setOption('Status Updated Successfully', true);
          this.checkStandingInstructionsForAutoDisbursement();
          this.showcasa=true;
        }
        this.checkListStatus = this.HeaderDetails[0].checkListStatus;
        this.customerId = this.HeaderDetails[0].customerId;
        this.lenderId = this.HeaderDetails[0].lenderId;
        var pan = this.HeaderDetails[0].panNo;
        if(pan.charAt(3)!="P"){
          this.showcrn=true;
        }
        this.nachTypeId = this.HeaderDetails[0].nachType;
        console.log("substatusId::" + this.substatusId);
        console.log("subStatusid::" + this.subStatusid);
        this.apiService.getLoanActionstatus(this.subStatusid)
          .subscribe(data => {
            this.loanActionstatus = data.result;
          }, error => console.log(error));
        this.apiService.getLoanStatusHistory(this.loanid, this.programTypeId, this.statusFlow)
          .subscribe(data => {
            this.resetStatusHistory();
            this.completed = data.result.completed;
            for (let i = 0; i < data.result.completed.length; i++) {
              if (i < 11) {
                const data1 = {
                  id: data.result.completed[i].id,
                  name: data.result.completed[i].name,
                  date: data.result.completed[i].date,
                  flag: data.result.completed[i].flag,
                  externalId:data.result.completed[i].externalId
                }
                this.firstRow.push(data1);
              } else if (i > 11 && i <= 21) {
                const data1 = {
                  id: data.result.completed[i].id,
                  name: data.result.completed[i].name,
                  date: data.result.completed[i].date,
                  flag: data.result.completed[i].flag,
                  externalId:data.result.completed[i].externalId
                }
                this.secondRow.push(data1);
              } else if (i > 21 && i <= 31) {
                const data1 = {
                  id: data.result.completed[i].id,
                  name: data.result.completed[i].name,
                  date: data.result.completed[i].date,
                  flag: data.result.completed[i].flag,
                  externalId:data.result.completed[i].externalId
                }
                this.thirdRow.push(data1);
              } else if (i > 31 && i <= 41) {
                const data1 = {
                  id: data.result.completed[i].id,
                  name: data.result.completed[i].name,
                  date: data.result.completed[i].date,
                  flag: data.result.completed[i].flag,
                  externalId:data.result.completed[i].externalId

                }
                this.fourthRow.push(data1);
              } else if (i > 41 && i <= 51) {
                const data1 = {
                  id: data.result.completed[i].id,
                  name: data.result.completed[i].name,
                  date: data.result.completed[i].date,
                  flag: data.result.completed[i].flag,
                  externalId:data.result.completed[i].externalId

                }
                this.fifthRow.push(data1);
              } else if (i > 51 && i <= 61) {
                const data1 = {
                  id: data.result.completed[i].id,
                  name: data.result.completed[i].name,
                  date: data.result.completed[i].date,
                  flag: data.result.completed[i].flag,
                  externalId:data.result.completed[i].externalId

                }
                this.sixthRow.push(data1);
              } else if (i > 61 && i <= 71) {
                const data1 = {
                  id: data.result.completed[i].id,
                  name: data.result.completed[i].name,
                  date: data.result.completed[i].date,
                  flag: data.result.completed[i].flag,
                  externalId:data.result.completed[i].externalId

                }
                this.seventhRow.push(data1);
              } else if (i > 71 && i <= 81) {
                const data1 = {
                  id: data.result.completed[i].id,
                  name: data.result.completed[i].name,
                  date: data.result.completed[i].date,
                  flag: data.result.completed[i].flag,
                  externalId:data.result.completed[i].externalId

                }
                this.eigthRow.push(data1);
              }
            }
          }, error => console.log(error));
        // }
        console.log("this.stausId::" + this.stausId);
        this.finaggCredit = false;
        this.lenderCredit = false;
        this.finaggOps = false;
        this.lenderOps = false;
        this.modifyLimit = false;
        this.ugroLender = (this.lenderId == lender.UGRO) ? true : false;
        this.janaLender = (this.lenderId == lender.jana) ? true : false;
        this.idfcLender = (this.lenderId == lender.IDFC) ? true : false;
        this.abflLender = (this.lenderId == lender.abfl) ? true : false;
        if (this.statusFlow == this.retailerStatusFlow) {
          this.appFormButton = true;
          this.bureauButton = true;
          this.gstButton = true;
          this.appFormButton = true;
          this.createLoan = false;
          this.makeLive = false;
          if (this.substatusId == retailerConstant.retailer_Finagg_Credit_Approve_reject) {
            this.finaggCredit = true;
            this.camDownloadButton = false;
          } else if (this.substatusId == retailerConstant.retailer_Lender_Credit_Approve_reject) {
            this.lenderCredit = true;
            this.camDownloadButton = false;
          } else if (this.substatusId == retailerConstant.retailer_Finagg_Ops_Approve_reject) {
            this.finaggOps = true;
            this.camDownloadButton = false;
          } else if (this.substatusId == retailerConstant.retailer_Lender_Ops_Approve_reject) {
            this.lenderOps = true;
            this.camDownloadButton = false;
          } else if (this.substatusId == retailerConstant.retailer_Modify_Limit) {
            this.modifyLimit = true;
            this.camDownloadButton = false;
          } else if (this.substatusId == retailerConstant.retailer_create_loan) {
            this.createLoan = true;
            this.checkStandingInstructionsForAutoDisbursement();
            this.makeLive = (this.lenderId == lender.FINAGG);
            this.camDownloadButton = false;
          } else if (this.substatusId == retailerConstant.Bank_Statement_Pending) {
            this.rerunBrandRule = true;
            this.camDownloadButton = false;
          } else if (this.stausId == retailerConstant.LIVE) {
            this.downloadForm = true;
          }
          if (this.stausId == retailerConstant.Loan_Status || this.subStatusid == retailerConstant.NACH_Form_Upload_Pending ||
            this.subStatusid == retailerConstant.NACH_Rejected || this.stausId == retailerConstant.LIVE) {
            this.nachButton = false;
            this.appFormButton = false;
            this.camDownloadButton = false;
          }

          if (this.subStatusid == retailerConstant.NACH_Form_Upload_Complete || this.subStatusid == retailerConstant.NACH_Status_Awaited) {
            this.appFormButton = false;
            this.getNACHStatusButton = false;
            this.camDownloadButton = false;
          }
        } else if (this.statusFlow == this.sellerStatusFlow) {
          this.loanStatusButton = true;
          this.bureauButton = true;
          this.nachButton = true;
          this.gstButton = true;
          this.appFormButton = true;
          this.camDownloadButton = true;
          this.downloadTC = false;
          this.applicationForm = false;
          this.creditApproval = false;
          this.bankProcessing = false;
          this.CommercialBureauButton = true;
          this.gstRuleProcessing = true;
          this.fraudcheckButton = true;
          this.ConsumerBureauButton = true;
          this.runConsumerRule = false;
          this.runCommercialRule = false;
          this.downloadLoanApplication = true;
          this.downloadForm = false;
          if (this.substatusId == sellerConstant.seller_Finagg_Credit_Approve_reject) {
            this.finaggCredit = true;
            this.camDownloadButton = false;
          } else if (this.substatusId == sellerConstant.seller_Lender_Credit_Approve_reject) {
            this.lenderCredit = true;
            this.camDownloadButton = false;
          } else if (this.substatusId == sellerConstant.seller_Finagg_Ops_Approve_reject) {
            this.finaggOps = true;
            this.camDownloadButton = false;
          } else if (this.substatusId == sellerConstant.seller_Lender_Ops_Approve_reject) {
            this.lenderOps = true;
            this.camDownloadButton = false;
          } else if (this.substatusId == sellerConstant.SELLER_Modify_Limit) {
            this.modifyLimit = true;
            this.camDownloadButton = false;
          } else if (this.stausId == sellerConstant.OnBoarding || this.stausId == sellerConstant.GST_Processing || this.stausId == sellerConstant.GST_Rule) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
            this.downloadTC = false;
            this.applicationForm = false;
            this.draftApplicationForm = true;
            this.gstRuleProcessing = true;
            if (this.subStatusid == sellerConstant.SELLER_Draft_Application_Form ||
              this.subStatusid == dealerConstant.DEALER_Draft_Application_Form) {
              this.draftApplicationForm = false;
            } else if (this.subStatusid == sellerConstant.SELLER_GST_PROCESS_PENDING || this.subStatusid == sellerConstant.SELLER_GST_PROCESS_COMPLETE) {
              this.gstRuleProcessing = (this.ugroLender) ? false : true;
              this.apiService.getGstnProcessList(this.orgId).subscribe(data => {
                this.gstRuleProcessingList = data.result;
                
              }, error => console.log(error));
            } else if (this.subStatusid == sellerConstant.SELLER_GST_RULE_FAIL) {
              this.gstButton = false;
            }
          } else if (this.stausId == sellerConstant.Bank_Processing) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = false;
            this.appFormButton = true;//edit application form
            this.camDownloadButton = false;
            this.bankStatmentresetButton = (this.subStatusid == 60) ? false : true;
            this.bankProcessing = (this.ugroLender) ? true : false;
          } else if (this.stausId == sellerConstant.Application_Form) {
            this.applicationForm = true;
            this.camDownloadButton = false;
          } else if (this.stausId == sellerConstant.Loan_Docs_Upload) {
            this.loanStatusButton = true;
            this.bureauButton = false;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = false;
            this.bankStatmentresetButton = false;
          } else if (this.stausId == sellerConstant.Fraud_Check) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
            this.bankStatmentresetButton = true;
            this.fraudcheckButton = (this.ugroLender) ? false : true;
          } else if (this.subStatusid == sellerConstant.SELLER_ApproveReject) {
            this.creditApproval = true;
          } else if (this.subStatusid == sellerConstant.SELLER_Consumer_Bureau_CALL_Initiated ||
            this.subStatusid == sellerConstant.SELLER_Consumer_Bureau_CALL_NO_Response) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
            this.bankStatmentresetButton = true;
            this.ConsumerBureauButton = (this.ugroLender) ? false : true;
          } else if (this.subStatusid == sellerConstant.SELLER_Consumer_Bureau_CALL_Request_Completed) {
            this.runConsumerRule = (this.ugroLender) ? true : false;
          } else if (this.stausId == sellerConstant.Posidex_Call) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
            this.bankStatmentresetButton = true;
          } else if (this.subStatusid == sellerConstant.SELLER_COMMERCIAL_BUREAU_PENDING ||
            this.subStatusid == sellerConstant.SELLER_COMMERCIAL_BUREAU_RES_FAILED) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
            this.bankStatmentresetButton = true;
            this.CommercialBureauButton = (this.ugroLender) ? false : true;
          } else if (this.subStatusid == sellerConstant.SELLER_COMMERCIAL_BUREAU_RES_RECEIVED) {
            this.runCommercialRule = (this.ugroLender) ? true : false;
          } else if (this.stausId == sellerConstant.Commercial_Bureau_rule) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = false;
            this.bankStatmentresetButton = false;
          } else if (this.stausId == sellerConstant.Create_Loan) {
            this.checkStandingInstructionsForAutoDisbursement();
            if (this.lenderId == lender.UGRO || this.lenderId == lender.abfl) {
              this.createLoan = (this.ugroLender || this.abflLender) ? true : false;
              this.camDownloadButton = (this.ugroLender || this.abflLender) ? false : true;
            } else {
              this.loanStatusButton = true;
              this.nachButton = false;
              this.gstButton = true;
              this.appFormButton = true;
              this.bureauButton = false;
              this.camDownloadButton = false;
            }
            if (this.subStatusid == sellerConstant.SELLER_LOAN_STATUS_REJECTED)
              this.nachButton = true;
          } else if (this.stausId == sellerConstant.Application_Form) {
            this.loanStatusButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.bureauButton = true;
            this.camDownloadButton = (this.ugroLender) ? false : true;
            this.appFormButton = true;
          } else if (this.stausId == sellerConstant.Loan_Status &&
            this.subStatusid != sellerConstant.SELLER_LOAN_STATUS_APPROVED &&
            this.subStatusid != sellerConstant.SELLER_LOAN_STATUS_REJECTED) {
            this.loanStatusButton = false;
            this.bureauButton = true;
            this.nachButton = false;
            this.gstButton = true;
            this.camDownloadButton = false;
            this.downloadLoanApplication = false;
            this.appFormButton = false;
          } else if (this.stausId == sellerConstant.Loan_Application_And_Agreement) {
            if (this.lenderId == lender.UGRO) {
              this.downloadTC = (this.ugroLender) ? true : false;
              this.camDownloadButton = (this.ugroLender) ? false : true;
              this.downloadForm = (this.HeaderDetails[0].loanAmount >= 1000000) ? true : false;

            } else {
              this.loanStatusButton = false;
              this.bureauButton = true;
              this.nachButton = false;
              this.gstButton = true;
              this.camDownloadButton = false;
              this.appFormButton = false;
            }
          } else if (this.stausId == sellerConstant.NACH) {
            this.loanStatusButton = false;
            this.bureauButton = true;
            // if (this.subStatusid == sellerConstant.SELLER_NACH_REJECTED || this.subStatusid == sellerConstant.SELLER_NACH_UPLOAD_PENDING) { this.nachButton = false; }
            // if (this.subStatusid == sellerConstant.SELLER_NACH_ACCEPTED || this.subStatusid == sellerConstant.SELLER_NACH_UPLOAD_COMPLETE || this.subStatusid == sellerConstant.SELLER_NACH_STATUS_AWAITED) { this.nachButton = true; }
            // if (this.subStatusid == sellerConstant.SELLER_NACH_STATUS_AWAITED || this.subStatusid == sellerConstant.SELLER_NACH_UPLOAD_COMPLETE) { this.getNACHStatusButton = false; }
            this.nachButton = false;
            this.gstButton = true;
            this.downloadLoanApplication = false;
            this.camDownloadButton = false;
            this.appFormButton = false;
          } else if (this.stausId == sellerConstant.Live) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
          } else if (this.stausId == sellerConstant.Ready_for_live) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
          }


          // if(this.stausId == sellerConstant.Posidex_Call || this.stausId==sellerConstant.Commercial_Bureau || this.stausId==sellerConstant.Bank_Processing) {
          //   this.loanStatusButton=true;
          //   this.bureauButton = true;
          //   this.nachButton=true;
          // }else{
          //   this.loanStatusButton=false;
          //   this.bureauButton = false;
          //   this.nachButton=false;
          // }

          // if (this.stausId > this.SELLER_GST_RULE_PASS && this.stausId != this.SELLER_POSIDEX_PENDING && this.stausId != this.SELLER_DOC_FILENET_COMPLETE) {

          //   this.nachButton=false;
          // }
          // if (this.stausId >= this.SELLER_BANK_RULE_FAIL && this.stausId != this.SELLER_POSIDEX_PENDING && this.stausId != this.SELLER_DOC_FILENET_COMPLETE) {
          //   this.bureauButton = false;
          // }
          // if (this.stausId >= this.SELLER_GST_PROCESS_PENDING && this.stausId != this.SELLER_POSIDEX_PENDING && this.stausId != this.SELLER_DOC_FILENET_COMPLETE) {
          //   this.gstButton = false;
          // }
        } else if (this.statusFlow == this.nonSoleStatusFlow) {
          this.loanStatusButton = true;
          this.bureauButton = true;
          this.nachButton = true;
          this.gstButton = true;
          this.appFormButton = true;
          this.camDownloadButton = true;
          if (this.substatusId == nonSoleProp.non_sole_Finagg_Credit_Approve_reject) {
            this.finaggCredit = true;
          } else if (this.substatusId == nonSoleProp.non_sole_Lender_Credit_Approve_reject) {
            this.lenderCredit = true;
          } else if (this.substatusId == nonSoleProp.non_sole_Finagg_Ops_Approve_reject) {
            this.finaggOps = true;
          } else if (this.substatusId == nonSoleProp.non_sole_Lender_Ops_Approve_reject) {
            this.lenderOps = true;
          } else if (this.substatusId == nonSoleProp.non_sole_Modify_Limit) {
            this.modifyLimit = true;
          } else if (this.substatusId == nonSoleProp.Bank_Statement_Pending) {
            this.rerunBrandRule = true;
          }
          if (this.substatusId == nonSoleProp.Brand_Rule_Fail) {
            this.rerunBrandRule = true;
          }
          if (this.stausId >= this.Application_Form && this.stausId <= this.NACH) {
            this.appFormButton = false;

            if (this.subStatusid == nonSoleProp.NACH_Form_Upload_Pending || this.subStatusid == nonSoleProp.NACH_Rejected)
              this.nachButton = false;
            if (this.subStatusid == nonSoleProp.NACH_Accepted || this.subStatusid == nonSoleProp.NACH_Form_Upload_Complete || this.subStatusid == nonSoleProp.NACH_Status_Awaited)
              this.nachButton = true;
            if (this.subStatusid == nonSoleProp.NACH_Status_Awaited || this.subStatusid == nonSoleProp.NACH_Form_Upload_Complete)
              this.getNACHStatusButton = false;


          }
          // if(this.stausId > 56 && this.stausId!= 64 && this.stausId != 63){

          if (this.subStatusid >= 99 && this.subStatusid <= 106) {
            this.bankStatmentresetButton = false;
          }

          this.bureauButton = true;
          this.gstButton = true;
          if (this.stausId == nonSoleProp.Loan_Status) {
            this.loanStatusButton = false;
            this.bureauButton = true;
            this.nachButton = false;
            this.gstButton = true;
            this.appFormButton = false;
            this.camDownloadButton = true;
            this.downloadLoanApplication = false;
          } else if (this.stausId == nonSoleProp.Loan_Application_And_Agreement) {
            this.loanStatusButton = false;
            this.bureauButton = true;
            this.nachButton = false;
            this.gstButton = true;
            this.appFormButton = false;
            this.camDownloadButton = true;
            this.downloadLoanApplication = false;
          } else if (this.stausId == nonSoleProp.NACH) {
            this.loanStatusButton = false;
            this.bureauButton = true;
            this.nachButton = false;
            this.gstButton = true;
            this.appFormButton = false;
            this.camDownloadButton = true;
            this.downloadLoanApplication = false;
          }
        } else if (this.statusFlow == this.DEALERStatusFlow) {
          this.actionButton = true;
          this.createLoan = false;
          this.runConsumerBureau = false;
          this.hideButton = true;
          this.financialCheck = false;
          this.financialRule = false;
          this.docVarification = false;
          this.internalSanctionCondition = false;
          this.pdCall = false;
          this.pdVarification = false;
          this.crnApiCall = false;
          this.dedupeManual = false;
          this.dedupeCall = false;
          this.amlManual = false;
          this.amlApi = false;
          this.aadhaarVault = false;
          this.BreApiCall = false;
          this.runCommercialRule =false;
          this.BreApiWaitingForResponse =false;
          if (this.substatusId == dealerConstant.DEALER_Finagg_Credit_Approve_reject) {
            this.finaggCredit = true;
          } else if (this.substatusId == dealerConstant.DEALER_Lender_Credit_Approve_reject) {
            this.lenderCredit = true;
          } else if (this.substatusId == dealerConstant.DEALER_Finagg_Ops_Approve_reject) {
            this.finaggOps = true;
          } else if (this.substatusId == dealerConstant.DEALER_Lender_Ops_Approve_reject) {
            this.lenderOps = true;
          } else if (this.substatusId == dealerConstant.Dealer_Modify_Limit) {
            this.modifyLimit = true;
            this.camDownloadButton=false;
            this.appFormButton=false;
          } else if (this.substatusId == dealerConstant.Dealer_Bank_Proceesing_Pending) {
            this.rerunBrandRule = true;
          } else if (this.substatusId == dealerConstant.Dealer_Fraud_CALL_Initiated) {
            this.fraudcheckButton = false;
          } else if (this.substatusId == dealerConstant.Dealer_Consumer_Bureau_CALL_Initiated ||
            this.substatusId == dealerConstant.Dealer_Consumer_Bureau_NO_Response) {
            this.ConsumerBureauButton = false;
          } else if (this.substatusId == dealerConstant.Dealer_Consumer_Bureau_Request_Completed ||
            this.substatusId == dealerConstant.Dealer_Consumer_Bureau_Rule_Fail) {
            this.runConsumerRule = true;
          } else if (this.substatusId == dealerConstant.Dealer_Financial_CALL_Initiated ||
            this.substatusId == dealerConstant.Dealer_Financial_CALL_NO_Response) {
            this.financialCheck = true;
          } else if (this.substatusId == dealerConstant.Dealer_Financial_CALL_Completed) {
            this.financialRule = true;
          } else if (this.substatusId == dealerConstant.Dealer_Nach_Form_Upload_Pending) {
            this.NachPending = true;
            this.downloadForm = (this.HeaderDetails[0].loanAmount > 2500000) ? true : false;
            this.downloadTC = true;
          } else if (this.substatusId == dealerConstant.Dealer_NACH_PDC_Pending) {
            this.nachPdc = true;
            this.downloadForm = (this.HeaderDetails[0].loanAmount > 2500000) ? true : false;
            this.downloadTC = true;
          } else if (this.substatusId == dealerConstant.Dealer_Aadhaar_Vault_API_Call_Pending || this.substatusId == dealerConstant.Dealer_Aadhaar_Vault_API_Call_Failled) {
            this.aadhaarVault = true;
            this.appFormButton = false;
          } else if (this.substatusId == dealerConstant.Dealer_AML_API_Call_Pending || this.substatusId == dealerConstant.Dealer_AML_API_Call_Failled) {
            this.amlApi = true;
            this.appFormButton = false;
          } else if (this.substatusId == dealerConstant.Dealer_AML_Manual_Verify_Pending) {
            this.amlManual = true;
            this.appFormButton = false;
          } else if (this.substatusId == dealerConstant.Dealer_Dedupe_Call_Pending || this.substatusId == dealerConstant.Dealer_Dedupe_Call_Failled) {
            this.dedupeCall = true;
            this.appFormButton = false;
          } else if (this.substatusId == dealerConstant.Dealer_Dedupe_Manual_Verify_Pending) {
            this.dedupeManual = true;
            this.appFormButton = false;
          } else if (this.substatusId == dealerConstant.Dealer_CRN_API_Call_Pending || this.substatusId == dealerConstant.Dealer_CRN_API_Call_Failled) {
            this.crnApiCall = true;
            this.appFormButton = false;
          } else if (this.substatusId == dealerConstant.Dealer_PD_Pending) {
            this.pdCall = true;
          } else if (this.substatusId == dealerConstant.Dealer_PD_complete) {
            this.pdVarification = true;
          } else if (this.substatusId == dealerConstant.Dealer_Doc_Verification_Pending) {
            this.docVarification = true;
          } else if (this.substatusId == dealerConstant.Dealer_internal_sanction_condition_pending){
            this.internalSanctionCondition = true;
          }
          else if (this.substatusId == dealerConstant.Dealer_Brand_Fail) {
            this.rerunBrandRule = true;
          } else if (this.substatusId == dealerConstant.Dealer_Bre_api_call_pending ||
            this.substatusId == dealerConstant.Dealer_Bre_api_call_failed) {
            this.BreApiCall = true;
          } else if (this.substatusId == dealerConstant.Dealer_Bre_api_call_pending ){
            this.BreApiWaitingForResponse = true;
          } else if (this.stausId == dealerConstant.Dealer_OnBoarding || this.stausId == dealerConstant.Dealer_GST_Processing || this.stausId == dealerConstant.Dealer_GST_Rule) {

            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
            if (this.subStatusid == dealerConstant.DEALER_Draft_Application_Form) {
              this.draftApplicationForm = false;
            } else {
              this.draftApplicationForm = true;
            }

            if (this.subStatusid == dealerConstant.DEALER_GST_PROCESS_PENDING) {
             this.gstRuleProcessing = false;
             this.showgst=false;
              this.apiService.getGstnProcessList(this.orgId).subscribe(data => {
                this.gstRuleProcessingList = data.result;
                for(let g of this.gstRuleProcessingList){
                  if(g.dataProcessed=="Completed"){
            //        this.gstRuleProcessing=true;
                    this.showgst=true;
                    break;
                  }

                }
              }, error => console.log(error));
            } else {
              this.gstRuleProcessing = true;
            }
          } else if (this.stausId == dealerConstant.Dealer_Bank_Processing) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = false;
            this.rerunBrandRule = true;
            this.runBankRules = (this.subStatusid == dealerConstant.Dealer_Bank_Rule_Fail)?true:false;
            this.appFormButton = true;//edit application form
            this.camDownloadButton = false;
            this.bankStatmentresetButton = (this.subStatusid == 60) ? false : true;
            this.runConsumerBureau = true;
          } else if (this.stausId == dealerConstant.DEALER_LOAN_DOCS_IDFC) {
            this.loanStatusButton = true;
            this.bureauButton = false;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
            this.bankStatmentresetButton = false;
          } else if (this.stausId == dealerConstant.Dealer_Posidex_Call) {
            if (this.lenderId == lender.UGRO) {
              this.hideButton = false;
              this.CommercialBureauButton = false;
            } else {
              this.loanStatusButton = true;
              this.bureauButton = true;
              this.nachButton = true;
              this.gstButton = false;
              this.appFormButton = false;
              this.camDownloadButton = false;
              this.bankStatmentresetButton = false;
            }
          } else if (this.substatusId == dealerConstant.Dealer_Commercial_Bureau_Pending) {
            if (this.lenderId == lender.UGRO) {
              this.hideButton = false;
              this.CommercialBureauButton = false;
            } else {
              this.loanStatusButton = true;
              this.bureauButton = true;
              this.nachButton = true;
              this.gstButton = false;
              this.appFormButton = false;
              this.camDownloadButton = false;
              this.bankStatmentresetButton = false;
            }
          } else if (this.substatusId == dealerConstant.Dealer_Commercial_Bureau_Reponse_Received) {
            if (this.lenderId == lender.UGRO) {
              this.hideButton = false;
              this.runCommercialRule = true;
            } else {
              this.hideButton = false;
              this.runCommercialRule = true;
              this.loanStatusButton = true;
              this.bureauButton = true;
              this.nachButton = true;
              this.gstButton = true;
              this.appFormButton = true;
              this.camDownloadButton = false;
              this.bankStatmentresetButton = false;
            }
          } else if (this.stausId == dealerConstant.Dealer_Bureau_Rule) {
            if (this.lenderId == lender.UGRO) {
              this.hideButton = false;
              this.runCommercialRule = true;
            } else {
              this.runCommercialRule = true;
              this.loanStatusButton = true;
              this.bureauButton = true;
              this.nachButton = true;
              this.gstButton = true;
              this.appFormButton = true;
              this.camDownloadButton = false;
              this.bankStatmentresetButton = false;
            }
          } else if (this.stausId == dealerConstant.Dealer_Create_Loan) {
            this.checkStandingInstructionsForAutoDisbursement();
            if (this.lenderId == lender.UGRO || this.lenderId == lender.jana || this.lenderId == lender.abfl) {
              this.actionButton = false;
              this.camDownloadButton = false;
              this.createLoan = true;
              this.downloadTC = true;
              this.hideButton = false;
              this.downloadForm = (this.HeaderDetails[0].loanAmount > 2500000) ? true : false;
              this.downloadTC = true;
            } else {
              this.loanStatusButton = true;
              this.nachButton = false;
              this.gstButton = true;
              this.appFormButton = true;
              this.bureauButton = false;
              this.camDownloadButton = false;
            }
            if (this.subStatusid == dealerConstant.DEALER_LOAN_STATUS_REJECTED)
              this.nachButton = true;
          } else if (this.stausId == dealerConstant.Dealer_Appilcation_Form) {
            this.loanStatusButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.bureauButton = true;
            this.camDownloadButton = false;
            this.appFormButton = true;
          } else if (this.stausId == dealerConstant.Dealer_Loan_Status) {
            if (this.subStatusid != dealerConstant.Dealer_Loan_Status_Pending) {
              this.loanStatusButton = (this.idfcLender) ? false : true;
            }
            this.bureauButton = true;
            this.nachButton = false;
            this.gstButton = true;
            this.camDownloadButton = false;
            this.appFormButton = false;
            this.downloadLoanApplication = false;
          } else if (this.stausId == dealerConstant.Dealer_Loan_Application_And_Agreement) {
            this.loanStatusButton = (this.idfcLender) ? false : true;;
            this.bureauButton = true;
            this.nachButton = false;
            this.gstButton = true;
            this.camDownloadButton = false;
            this.appFormButton = false;
          } else if (this.stausId == dealerConstant.Dealer_Nach) {
            this.loanStatusButton = (this.idfcLender) ? false : true;;
            this.bureauButton = true;
            // if (this.subStatusid == dealerConstant.DEALER_NACH_REJECTED || this.subStatusid == dealerConstant.DEALER_NACH_UPLOAD_PENDING) { this.nachButton = true; }
            // if (this.subStatusid == dealerConstant.DEALER_NACH_ACCEPTED || this.subStatusid == dealerConstant.DEALER_NACH_UPLOAD_COMPLETE || this.subStatusid == dealerConstant.DEALER_NACH_STATUS_AWAITED) { this.nachButton = false; }
            // if (this.subStatusid == dealerConstant.DEALER_NACH_STATUS_AWAITED || this.subStatusid == dealerConstant.DEALER_NACH_UPLOAD_COMPLETE) { this.getNACHStatusButton = false; }
            this.gstButton = true;
            this.camDownloadButton = false;
            this.appFormButton = false;
            this.downloadLoanApplication = false;
            this.nachButton = false;
          } else if (this.stausId == dealerConstant.Dealer_Live) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
          } else if (this.stausId == dealerConstant.Dealer_Ready_for_Live) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
          } else if(this.stausId==dealerConstant.DEALER_SFDC_CALL){
            if(this.substatusId==dealerConstant.Dealer_Sdfc_Call_Pending||this.substatusId==dealerConstant.Dealer_Sdfc_Call_NoResponse){
              this.sdfc=true;
            }
          
          }else if(this.stausId==dealerConstant.DEALER_VA_CALL){
            if(this.substatusId==dealerConstant.Dealer_Va_Call_Pending||this.substatusId==dealerConstant.Dealer_Va_Call_NoResponse){
              this.virtualAccount=true;
            }
          }
          
          
          else {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
          }


        } else if (this.statusFlow == this.vendorStatusFlow) {
          this.actionButton = true;
          this.createLoan = false;
          this.runConsumerBureau = false;
          this.hideButton = true;
          this.financialCheck = false;
          this.financialRule = false;
          this.docVarification=false;
          this.internalSanctionCondition=false;
          this.pdCall=false;
          this.pdVarification=false;
          this.crnApiCall=false;
          this.dedupeManual=false;
          this.dedupeCall=false;
          this.amlManual=false;
          this.amlApi=false;
          this.aadhaarVault=false;
          this.BreApiCall=false;
          this.bankProcessing=false;
          this.applicationForm=false;
          this.downloadLoanApplication=true;
          if (this.substatusId == vendorConstant.Vendor_Finagg_credit_Approve_Reject) {
            this.finaggCredit = true;
          } else if (this.substatusId == vendorConstant.Vendor_Lender_Credit_Approve_Reject) {
            this.lenderCredit = true;
          } else if (this.substatusId == vendorConstant.Vendor_Finagg_Ops_Approve_Reject) {
            this.finaggOps = true;
          } else if (this.substatusId == vendorConstant.Vendor_Lender_Ops_Approve_Reject) {
            this.lenderOps = true;
          } else if (this.substatusId == vendorConstant.Vendor_Modify_Limit) {
            this.modifyLimit = true;
            this.camDownloadButton=false;
            this.appFormButton=false;
          } else if (this.substatusId == vendorConstant.Vendor_Bank_Process_Pending) {
            this.rerunBrandRule = true;
            this.bankProcessing=true;
          } else if (this.substatusId == vendorConstant.Vendor_Fraud_CALL_Initiated) {
            this.fraudcheckButton = false;
          } else if (this.substatusId == vendorConstant.Vendor_Application_Form_Update_Pending) {
            this.applicationForm=true;
            this.camDownloadButton = false
          } else if (this.substatusId == vendorConstant.Vendor_Consumer_Bureau_CALL_Initiated ||
            this.substatusId == vendorConstant.Vendor_Consumer_Bureau_NO_Response) {
            this.ConsumerBureauButton = false;
          } else if (this.substatusId == vendorConstant.Vendor_Consumer_Bureau_Request_Completed||
            this.substatusId == vendorConstant.Vendor_Consumer_Bureau_Rule_Fail) {
            this.runConsumerRule = true;
          } else if (this.substatusId == vendorConstant.Vendor_Financial_CALL_Initiated ||
            this.substatusId == vendorConstant.Vendor_Financial_CALL_NO_Response) {
            this.financialCheck = true;
          } else if (this.substatusId == vendorConstant.Vendor_Financial_CALL_Completed) {
            this.financialRule = true;
          } else if (this.substatusId == vendorConstant.Vendor_NACH_Form_Upload_Pending) {
            this.NachPending = true;
            this.downloadForm = (this.HeaderDetails[0].loanAmount > 2500000) ? true : false;
            this.downloadTC = true;
          } else if (this.substatusId == vendorConstant.Vendor_NACH_PDC_Pending) {
            this.nachPdc = true;
            this.downloadForm = (this.HeaderDetails[0].loanAmount > 2500000) ? true : false;
            this.downloadTC = true;
          } else if (this.substatusId == vendorConstant.Vendor_Aadhaar_Vault_API_Call_Pending || this.substatusId == vendorConstant.Vendor_Aadhaar_Vault_API_Call_Failled) {
              this.aadhaarVault=true;
              this.appFormButton = false;
          } else if (this.substatusId == vendorConstant.Vendor_AML_API_Call_Pending || this.substatusId == vendorConstant.Vendor_AML_API_Call_Failled) {
              this.amlApi=true;
              this.appFormButton = false;
          } else if (this.substatusId == vendorConstant.Vendor_AML_Manual_Verify_Pending) {
              this.amlManual=true;
              this.appFormButton = false;
          } else if (this.substatusId == vendorConstant.Vendor_Dedupe_Call_Pending || this.substatusId == vendorConstant.Vendor_Dedupe_Call_Failled) {
              this.dedupeCall=true;
              this.appFormButton = false;
          } else if (this.substatusId == vendorConstant.Vendor_Dedupe_Manual_Verify_Pending) {
              this.dedupeManual=true;
              this.appFormButton = false;
          } else if (this.substatusId == vendorConstant.Vendor_CRN_API_Call_Pending || this.substatusId == vendorConstant.Vendor_CRN_API_Call_Failled) {
              this.crnApiCall=true;
              this.appFormButton = false;
          } else if (this.substatusId == vendorConstant.Vendor_PD_Pending) {
              this.pdCall=true;
          } else if (this.substatusId == vendorConstant.Vendor_PD_complete) {
              this.pdVarification=true;
          } else if (this.substatusId == vendorConstant.Vendor_Doc_Verification_Pending) {
              this.docVarification=true;
          // } else if (this.substatusId == vendorConstant.Vendor_PDC_Pending) {
          //   this.PDCPending = true;
          //   this.applicationForm = true;
          //   this.camDownload = true;
          } else if (this.substatusId == vendorConstant.Vendor_internal_sanction_condition_pending) {
            this.internalSanctionCondition=true;
          }
          else if (this.substatusId == vendorConstant.Vendor_Brand_Rule_Fail) {
            this.rerunBrandRule = true;
          // }else if (this.substatusId == vendorConstant.Dealer_Bre_api_call_pending ||
          //   this.substatusId == vendorConstant.Dealer_Bre_api_call_failed ) {
          //     this.BreApiCall=true;
          }else if (this.stausId == vendorConstant.Vendor_OnBoarding || this.stausId == vendorConstant.Vendor_GST_Processing || this.stausId == vendorConstant.Vendor_GST_Rule) {

            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
            if (this.subStatusid == vendorConstant.Vendor_Draft_Application_Form) {
              this.draftApplicationForm = false;
            } else {
              this.draftApplicationForm = true;
            }
            if(this.stausId == vendorConstant.Vendor_GST_Processing )   {
            this.gstButton = false;    }
            else{
              this.gstButton = true;
            }

            if (this.subStatusid == vendorConstant.Vendor_GST_Processing_Pending) {
              this.gstRuleProcessing = false;
              this.showgst=false;
              this.apiService.getGstnProcessList(this.orgId).subscribe(data => {
                this.gstRuleProcessingList = data.result;
                for(let g of this.gstRuleProcessingList){
                  if(g.dataProcessed=="Completed"){
            //        this.gstRuleProcessing=true;
                    this.showgst=true;
                    break;
                  }

                }
              }, error => console.log(error));
            } else {
              this.gstRuleProcessing = true;
            }
          } else if (this.stausId == vendorConstant.Vendor_Bank_Processing) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = false;
            this.appFormButton = true;//edit application form
            this.camDownloadButton = false;
            this.rerunBrandRule = true;
            this.runBankRules = (this.subStatusid == vendorConstant.Vendor_Bank_Rule_Fail)?true:false;
            this.bankStatmentresetButton = (this.subStatusid == 60) ? false : true;
            this.runConsumerBureau = true;
          } else if (this.stausId == vendorConstant.Vendor_Loan_Doc_Upload) {
            this.loanStatusButton = true;
            this.bureauButton = false;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
            this.bankStatmentresetButton = false;
          } else if (this.stausId == vendorConstant.Vendor_Posidex_Call) {
            if (this.lenderId == lender.UGRO) {
              this.hideButton = false;
              this.CommercialBureauButton = false;
            } else {
              this.loanStatusButton = true;
              this.bureauButton = true;
              this.nachButton = true;
              this.gstButton = false;
              this.appFormButton = false;
              this.camDownloadButton = false;
              this.bankStatmentresetButton = false;
            }
          } else if (this.substatusId == vendorConstant.Vendor_Commercial_Bureau_Call_Pending) {
            if (this.lenderId == lender.UGRO) {
              this.hideButton = false;
              this.CommercialBureauButton = false;
            } else {
              this.hideButton = false;
              this.CommercialBureauButton = false;
              this.loanStatusButton = true;
              this.bureauButton = true;
              this.nachButton = true;
              this.gstButton = false;
              this.appFormButton = false;
              this.camDownloadButton = false;
              this.bankStatmentresetButton = false;
            }
          } else if (this.substatusId == vendorConstant.Vendor_Commercial_Bureau_Response_Received) {
            if (this.lenderId == lender.UGRO) {
              this.hideButton = false;
              this.runCommercialRule = true;
            } else {
              this.hideButton = false;
              this.runCommercialRule = true;
              this.loanStatusButton = true;
              this.bureauButton = true;
              this.nachButton = true;
              this.gstButton = true;
              this.appFormButton = true;
              this.camDownloadButton = false;
              this.bankStatmentresetButton = false;
            }
          } else if (this.stausId == vendorConstant.Vendor_Bureau_Rule) {
            if (this.lenderId == lender.UGRO) {
              this.hideButton = false;
              this.runCommercialRule = true;
            } else {
              this.loanStatusButton = true;
              this.bureauButton = true;
              this.nachButton = true;
              this.gstButton = true;
              this.appFormButton = true;
              this.camDownloadButton = false;
              this.bankStatmentresetButton = false;
            }
          } else if (this.stausId == vendorConstant.Vendor_Create_Loan) {
            this.checkStandingInstructionsForAutoDisbursement();
            if (this.lenderId == lender.UGRO || this.lenderId == lender.jana || this.lenderId == lender.abfl) {
              this.actionButton = false;
              this.camDownloadButton = false;
              this.createLoan = true;
              this.downloadTC = true;
              this.hideButton = false;
              this.downloadForm = (this.HeaderDetails[0].loanAmount > 2500000) ? true : false;
              this.downloadTC = true;
            } else {
              this.loanStatusButton = true;
              this.nachButton = false;
              this.gstButton = true;
              this.appFormButton = true;
              this.bureauButton = false;
              this.camDownloadButton = false;
            }
            if (this.subStatusid == vendorConstant.Vendor_Loan_Status_Rejected)
              this.nachButton = true;
          } else if (this.stausId == vendorConstant.Vendor_Draft_Application_Form) {
            this.loanStatusButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.bureauButton = true;
            this.camDownloadButton = false;
            this.appFormButton = true;
          } else if (this.stausId == vendorConstant.Vendor_Loan_Status) {
            if (this.subStatusid != vendorConstant.Vendor_Loan_Status_Pending) {
              this.loanStatusButton = (this.idfcLender)? false:true;
            }
            this.bureauButton = true;
            this.nachButton = false;
            this.gstButton = true;
            this.camDownloadButton = false;
            this.appFormButton = false;
            this.downloadLoanApplication = false;
          } else if (this.stausId == vendorConstant.Vendor_Loan_Application_And_Agreement) {
            this.loanStatusButton = (this.idfcLender)? false:true;;
            this.bureauButton = true;
            this.nachButton = false;
            this.gstButton = true;
            this.camDownloadButton = false;
            this.appFormButton = false;
            this.downloadLoanApplication = false;
          } else if (this.stausId == vendorConstant.Vendor_Nach) {
            this.loanStatusButton = (this.idfcLender)? false:true;;
            this.bureauButton = true;
            this.gstButton = true;
            this.camDownloadButton = false;
            this.appFormButton = false;
            this.downloadLoanApplication = false;
            this.nachButton = false;
          } else if (this.stausId == vendorConstant.Vendor_Live) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
          } else if (this.stausId == vendorConstant.Vendor_Ready_for_Live) {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
          }else if(this.stausId==vendorConstant.VENDOR_SFDC_CALL){
            if(this.substatusId==vendorConstant.Vendor_Sdfc_Call_Pending||this.substatusId==vendorConstant.Vendor_Sdfc_Call_NoResponse){
              this.sdfc=true;
            }
          }else if(this.stausId==vendorConstant.VENDOR_VA_CALL){
            if(this.substatusId==vendorConstant.Vendor_Va_Call_Pending||this.substatusId==vendorConstant.Vendor_Va_Call_NoResponse){
              this.virtualAccount=true;
            } 
          }else {
            this.loanStatusButton = true;
            this.bureauButton = true;
            this.nachButton = true;
            this.gstButton = true;
            this.appFormButton = true;
            this.camDownloadButton = true;
          }


        } else if (this.statusFlow == UGROLendor.UgroStatueFlow) {
          this.rerunBrandRule = false;
          this.runConsumerBureau = false;
          this.runConsumerRule = false;
          this.bankProcessing = false;
          this.applicationForm = false;
          this.nachPdc = false;
          this.NachPending = false;
          this.PDCPending = false;
          this.downloadForm = false;
          this.createLoan = false;
          this.creditApproval = false;
          this.downloadLoanAgreement = false;
          this.loanexecution = false;
          this.firstCreditApproval = false;
          this.FCUApproval = false;
          this.secondCreditApproval = false;
          this.businessApproval = false;
          this.camDownload = false;
          if (this.substatusId == UGROLendor.Ugro_Lendor_Brand_Rule_Fail) {
            this.rerunBrandRule = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_Consumer_Bureau_Pending) {
            this.runConsumerBureau = true;
            this.applicationForm = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_Consumer_Bureau_No_Response) {
            this.runConsumerBureau = true;
            this.applicationForm = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_Consumer_Bureau_Complete) {
            this.runConsumerRule = true;
            this.applicationForm = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_Bank_Process_Pending) {
            this.bankProcessing = true;
            this.applicationForm = true;
            this.rerunBrandRule = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_Bank_Rule_Fail) {
            this.bankProcessing = true;
            this.applicationForm = true;
            this.rerunBrandRule = true;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_NACHPDC_Pending) {
            this.nachPdc = true;
            this.applicationForm = true;
            this.downloadTC = true;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_NACH_Pending) {
            this.NachPending = true;
            this.applicationForm = true;
            this.downloadTC = true;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_PDC_Pending) {
            this.PDCPending = true;
            this.applicationForm = true;
            this.downloadTC = true;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_Fist_Credit_Approve_reject) {
            this.firstCreditApproval = true;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_FCU_Approve_reject) {
            this.FCUApproval = true;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_Second_Credit_Approve_reject) {
            this.secondCreditApproval = true;
            this.downloadForm = true;
            this.camDownload = true;
            this.downloadTC = true;
          } else if (this.substatusId == UGROLendor.Ugro_Business_Approve_reject) {
            this.businessApproval = true;
            this.downloadForm = true;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_Create_Loan_Pending) {
            this.checkStandingInstructionsForAutoDisbursement();
            this.createLoan = true;
            this.applicationForm = true;
            this.downloadTC = true;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_Loan_execution_Pending) {
            this.loanexecution = true;
            this.downloadTC = false;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_Loan_Application_and_Agreement_Pending) {
            this.downloadLoanAgreement = true;
            this.downloadTC = false;
            // this.downloadForm = false;
            this.downloadForm = true;
            this.camDownload = true;
          } else if (this.substatusId == UGROLendor.Ugro_Lendor_Loan_Live) {
            this.downloadForm = false;
            this.downloadTC = false;
          } else if (this.substatusId == UGROLendor.Ugro_Modify_Limit) {
            this.modifyLimit = true;
            this.camDownload = true;
          } else {
            this.rerunBrandRule = false;
            this.runConsumerBureau = false;
            this.runConsumerRule = false;
            this.bankProcessing = false;
            this.bankRule = false;
            this.nachPdc = false;
            this.NachPending = false;
            this.PDCPending = false;
            this.downloadForm = false;
            this.applicationForm = false;
            this.createLoan = false;
            this.loanexecution = false;
            this.camDownload = false;
          }
        }
        else {
          this.appFormButton = true;
          this.bureauButton = true;
          this.gstButton = true;
        }
      }, error => console.log(error));

  }

  popUp(content,a,exct){
    console.log('ttttt',a);
    console.log('IIIIdDDDD',exct);
    this.IId=exct
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log('aaaaa',a);
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   }

   downloadRequest(){
    this.apiService.downloadRequestResponse(this.IId,1).subscribe(data => {
      if (data.status == 200) {
        window.open(data.result, '_blank')
        // this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
        this.modalService.dismissAll();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.modalService.dismissAll();
      }
    }, 
    err => {
       this.set.setOption(err.error.exceptionMessage, false);
       this.modalService.dismissAll();
    }
    );
   }

   downloadResponse(){
    this.apiService.downloadRequestResponse(this.IId,2).subscribe(data => {
      if (data.status == 200) {
        window.open(data.result, '_blank')
        // this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
        this.modalService.dismissAll();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.modalService.dismissAll();
      }
    }, 
    err => {
       this.set.setOption(err.error.exceptionMessage, false);
       this.modalService.dismissAll();
    }
    );
   }
   
  checkStandingInstructionsForAutoDisbursement(){
    this.apiService.getProgramSetup(this.programId).subscribe((data)=>{
      if(data.status==200){
        if(data.result.autoDisbursementFlag=='1'){
          this.apiService.getUploadedDocumentswithcategory(this.loanid).subscribe(objRes => {
            if(objRes.status == 200){
              var temp=objRes.result;
              this.standingRequired=true;
              temp.forEach((u)=>{
                if(u.documentType=='78'){
                  this.standingRequired=false;
                }
              });
              console.log("this.standingRequired::"+this.standingRequired);
              // for(let u of objRes.result){
              //   if(u.documentType=='78'){
                  
              //   }
              // }
            }
          });
        }
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });
  }
  selectCorporateBuyer(){
    this.router.navigate(['/report/anchorUpdate', this.loanid,this.orgId]);
  }
  aadhaarVaultApiCall() {
    const data = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      userMedium: 'Backend',
      loanRequestId: this.loanid,
      orgId: this.orgId
    }
    this.apiService.aadhaarVaultFetch(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  amlApiCall() {
    const data = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      userMedium: 'Backend',
      loanRequestId: this.loanid,
      orgId: this.orgId
    }
    this.apiService.amlCall(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  dedupeApiCall() {
    const data = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      userMedium: 'Backend',
      loanRequestId: this.loanid,
      orgId: this.orgId
    }
    this.apiService.deDupeApiCall(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  crnCall() {
    const data = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      userMedium: 'Backend',
      loanRequestId: this.loanid,
      orgId: this.orgId
    }
    this.apiService.customerCreationCall(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  pdApiCall() {
    const data = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      userMedium: 'Backend',
      loanId: Number(this.loanid),
      orgId: this.orgId,
      subStatusId: this.substatusId,
      statusId: this.stausId,
    }
    this.apiService.updateStatus(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  breApiCall() {
    const data = {
      loanRequestId: this.loanid,
      userId: this.userId,
      userMedium: 'Backend'
    }
    this.apiService.breApiCall(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  docVerificationApiCall() {
    const data = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      userMedium: 'Backend',
      loanId: Number(this.loanid),
      orgId: this.orgId,
      subStatusId: this.substatusId,
      statusId: this.stausId,
    }
    this.apiService.updateStatus(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  goTo() {
    if (window.confirm('move to live')) {
      const data = {
        loanId: this.loanid,
        subStatusId: this.substatusId,
        statusId: this.stausId,
        userId: this.userId,
        userMedium: 'Backend'
      }
      this.apiService.updateStatus(data).subscribe(data => {
        if (data.status == 200) {
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
    }
  }

  createLoanApi() {

    const dialogRef = this.dialog.open(CreateLoanAPIPopupPage, {
      data: {
        'statusId': this.stausId,
        'subStatusid': this.subStatusid,
        'loanId': this.loanid,
        'statusFlow': this.statusFlow,
        'orgId': this.orgId,
        'mobileNo':this.mobileNo,
        'standingRequired':this.standingRequired,
        'userId':this.userId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // window.location.reload();
      this.ngOnInit();
    });
  }
  updateLoanStatus() {
    const data = {
      loanId: this.loanid,
      subStatusId: this.substatusId,
      statusId: this.stausId,
      userId: this.userId,
      userMedium: 'Backend'
    }
    this.apiService.updateStatus(data)
      .subscribe(data => {
        if (data.status == 200) {
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
  }
  CommercialBureau() {
    const bureauData = {
      userId: this.userId,
      loanRequestId: this.loanid,
      lastActivityTime: this.curDate,
      orgId: this.orgId,
      // mobileNo: this.mobileNo,
      // statusFlow: this.statusFlow,
      userMedium: "backendApp"
    }
    this.apiService.commercialBureau(bureauData).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
        } else {
          this.set.setOption(data.exceptionMessage, true);
        }
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();

        // window.location.reload();
      }
    }, error => console.log(error));

  }
  
  downloadAggrement() {
    const data1 = {
      mobileNumber: this.mobileNo,
      typeAgreement: '0',
      lastActivityTime: this.curDate,
      userId: this.userId,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      loanRequestId: this.loanid,
      loanDisbursalId: '0',
      userMedium: 'bankendApp'
    }
    this.apiService.generateLoanAgreement(data1)
      .subscribe(data => {
        if (data.status == 200) {
          window.open(data.result.myUrl, '_blank');
        } else {
          this.set.setOption("Can't download this file", false);

          // alert("can't download this file");
        }
      }, error => console.log(error));
  }
  fraudCheck() {
    const Data = {
      userId: this.userId,
      loanRequestId: this.loanid,
      lastActivityTime: this.curDate,
      orgId: this.orgId,
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
      statusFlow: this.statusFlow,
      statusId: this.stausId,
      subStatusId: this.subStatusid
    }
    this.apiService.fraudCheckApi(Data).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
        } else {
          this.ngOnInit();
        }
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    }, error => console.log(error));
  }
  FinancialCheckManualComponent() {
    this.router.navigate(['/report/finanicalCheck', this.loanid]);
  }
  nachPDCPage() {
    this.router.navigate(['report/nach', this.loanid, this.orgId, this.programTypeId]);
  }
  editApplicationForm(actionId: any, loanid: any, orgId: any, programTypeId: any) {
    this.router.navigate(['report/sellerLoanForm', actionId, loanid, orgId, programTypeId, 1]);
  }
  openApplicationForm(actionId: any, loanid: any, orgId: any, programTypeId: any) {
    this.router.navigate(['report/sellerLoanForm', actionId, loanid, orgId, programTypeId, 0]);
  }
  draftApplication(actionId: any, loanid: any, orgId: any, programTypeId: any) {
    this.router.navigate(['report/sellerLoanForm', actionId, loanid, orgId, programTypeId, 2]);
  }
  downloadLoanApplicationPage(actionId: any, loanid: any, orgId: any, programTypeId: any) {
    this.router.navigate(['report/uploadLoanForm', actionId, loanid, orgId, programTypeId]);
  }
  // downloadNachForm(){
  //   this.apiService.downloadForm(this.loanid,0,3).subscribe(data => {
  // if(data.status==200){
  //   if(data.exceptionOccured=='Y'){
  //     this.set.setOption(data.exceptionMessage,false);
  //   }else{
  //     window.open(data.result, '_blank');
  //   }
  // }else{
  //   this.set.setOption("Unable to download file",false);

  // // alert("can't download this file");
  // }
  //   }, error => console.log(error));
  // }
  downloadCam(loanId: number) {
    this.apiService.downloadCam(loanId).subscribe(data => {
      if (data.status == 200) {
        window.open(data.result, '_blank');
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }
  downloadNachForm() {
    this.apiService.downloadForm(this.loanid, 0, 3).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.result, false);
          this.ngOnInit();
        } else {
          window.open(data.result, '_blank');
          this.ngOnInit();
        }
      } else if (data.status == 401) {
        this.set.setOption(data.result, false);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }
  // nachForm(loanid: any, orgId: any, programTypeId: any)
  // {
  //   this.router.navigate(['/report/nach/', this.loanid, this.orgId, this.programId]);
  // }

  reRunGstRule(actionId: any, loanid: any, orgId: any, programTypeId: any) {
    const gstData = {
      userId: this.userId,
      loanRequestId: loanid,
      orgId: orgId,
      lastActivityTime: this.curDate,
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
      statusFlow: this.statusFlow,
      statusFlag: '1'
    }
    this.apiService.updateGstnRule(gstData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.result, true);

        // this.set.setOption(data.result);
        window.location.reload();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        window.location.reload();
      }
    }, error => console.log(error));
  }
  runGstRule(actionId: any, loanid: any, orgId: any, programTypeId: any) {
    const gstData = {
      userId: this.userId,
      loanRequestId: loanid,
      orgId: orgId,
      lastActivityTime: this.curDate,
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
      statusFlow: this.statusFlow,
      statusFlag: '0'
    }
    this.apiService.updateGstnRule(gstData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.result, true);

        // this.set.setOption(data.result);
        // window.location.reload();
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    }, error => console.log(error));
  }
  reRunBureauRule(actionId: any, loanid: any, orgId: any, programTypeId: any) {
    const BureauRuleData = {
      userId: this.userId,
      loanRequestId: loanid,
      orgId: orgId,
      lastActivityTime: this.curDate,
      mobileNo: this.mobileNo,
      statusFlow: this.statusFlow,
      userMedium: "backendApp",
      statusFlag: '0'
    }
    this.apiService.updatebureauRule(BureauRuleData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.result, true);

        // this.set.setOption(data.result);
        // window.location.reload();
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        // window.location.reload();
        this.ngOnInit();
      }
    }, error => console.log(error));
  }

  checkLoanStatus() {
    const checkLoanStatusData = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      loanRequestId: this.loanid,
      statusFlow: this.statusFlow
    }
    this.apiService.checkLoanStatus(checkLoanStatusData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.result, true);

        // this.set.setOption(data.result);
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }





  openReasonPopUp(content) {
    this.apiService.getReasonList()
      .subscribe(data => {
        this.reasonList = data.result;
      }, error => console.log(error));
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }


  resetBankStatment() {
    const data = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      loanRequestId: this.loanid,
      statusFlow: this.statusFlow,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: '25',
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      userMedium: 'backendApp',
      programTypeId: this.programTypeId
    }
    this.apiService.resetProcessedBankStatement(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.result, true);

        // this.set.setOption(data.result);
        this.gotoList();

      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));


  }
  bankprocessing() {
    this.router.navigate(['/report/bankProcessing/', 0, this.loanid, this.orgId, this.programTypeId]);
  }
  consumerBureau() {
    const Data = {
      userId: this.userId,
      loanRequestId: this.loanid,
      lastActivityTime: this.curDate,
      orgId: this.orgId,
      // mobileNo: this.mobileNo,
      // statusFlow: this.statusFlow,
      userMedium: "backendApp"
    }
    this.apiService.consumerBureau(Data).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, true);
          this.ngOnInit();
        }
      } else if (data.status == 500) {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    }, error => console.log(error));
  }
  runBureauRule(type: any) {
    const Data = {
      userId: this.userId,
      loanRequestId: this.loanid,
      lastActivityTime: this.curDate,
      orgId: this.orgId,
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
      statusFlow: this.statusFlow,
      statusId: this.stausId,
      subStatusId: this.subStatusid,
      bureauType: type + '',
    }
    this.apiService.bureauRule(Data).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, true);
          this.ngOnInit();
        }
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    }, error => console.log(error));
  }
  downloadLoanForm(type: any) {
    this.apiService.downloadForm(this.loanid, 0, type).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
        } else {
          window.open(data.result, '_blank');
        }
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }
  gotoAction() {
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
      this.HeaderDetails = data.result;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programTypeId = this.HeaderDetails[0].programTypeId;
      this.programId = this.HeaderDetails[0].programId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
      this.router.navigate(['report/action'], {
        queryParams: {
          'loanId': this.loanid,
          'orgId': this.orgId, 'programTypeId': this.programTypeId
        }
      });
    }, error => console.log(error));
  }
  gotoList() {
    this.router.navigate(['/report/']);
  }
  nonStopFlag: any;
  goToList() {
    if (this.nonStopFlag == 1) {
      this.router.navigate(['/report/draftLoanRequestList'], { queryParams: { 'loanId': this.loanid, 'nonStopFlag': '1' } });
    } else {
      this.router.navigate(['/report/loanRequestList'], { queryParams: { 'loanId': this.loanid, 'nonStopFlag': '0' } });
    }
  }
  UpdateNachBankDetails() {
    this.router.navigate(['/report/nachDownload', this.loanid, this.orgId, this.programTypeId]);
  }
  UpdateNachForm() {
    this.router.navigate(['/report/uploadNachForm', 0, this.loanid, this.orgId, this.programTypeId]);
  }
  getNACHStatus(loanid: String) {
    const Data = {
      userId: this.userId,
      loanRequestId: loanid,
      lastActivityTime: this.curDate,
      statusFlow: '0'
    }
    this.apiService.checkNachStatus(Data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.result, true);

        // this.set.setOption("Nach Approved Successfully");
        // this.set.setOption(data.result);
      } else {
        this.set.setOption(data.exceptionMessage, false);
        //  this.set.setOption(data.result);

      }
    }, error => console.log(error));
  }

  makeItLive() {
    const Data = {
      loanId: this.loanid,
      lan: this.loanid,
      createdDate: this.curDate,
      remarks: "Approved",
      subStatusId: "0",
      statusId: "36",
      userId: this.userId,
      userMedium: "backendApp",
      statusFlow: this.statusFlow,
      orgId: this.orgId
    };
    this.apiService.saveCreateLoanInfo(Data).subscribe(data => {
      if (data.status == 200 && data.exceptionOccured == 'N') {
        this.set.setOption(data.exceptionMessage, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }

  createLoanAPI() {
    const createLoan = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      loanRequestId: this.loanid + "",
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      userMedium: "backendApp",
    }

    this.apiService.ceateLoanApi(createLoan).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.result, true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    });

  }

  toLog() {
    this.router.navigate([`report/viewlog/${this.loanid}`]);
  }
  indianCurrency(Amount) {
    return this.currency.indianCurrency(Amount);
  }


  tab: boolean = false;
  toggle() {
    this.tab = !this.tab;

  }
  navitoreintiate() {

    this.router.navigate(['report/actionreinitiate'], {
      queryParams: {
        'loanId': this.loanid,
        'orgId': this.orgId, 'programTypeId': this.programTypeId, 'nonStopFlag': this.nonStopFlag
      }
    });
  }
  // repayment enable
  repaySetup(content: any) {
    this.errorMsg="";
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  cancel() {
    this.modalService.dismissAll();
  }
  saveNach() {
    if (this.isNullorUndefinedorEmpty(this.remarks)) {
      this.errorMsg = "Please Enter the Remark";
    } else {
      const data = {
        remark: this.remarks,
        userId: this.userId
      }
      this.apiService.saveNachEnable(this.loanid, data).subscribe(data => {
        if (data.status == 200) {
          if (data.exceptionOccured == "N") {
            this.set.setOption("data.exceptionMessage", true);
            this.modalService.dismissAll();
          }else{
            this.set.setOption("Failed To Save Data",false);
            this.modalService.dismissAll();
          }
        }
      });
    }
  }
  viewDocs(content,docuentTypeId){
    this.uploadedDocs=[];
    this.apiService.getUploadedDocumentswithcategory(this.loanid).subscribe(objRes => {
      if(objRes.status == 200){
        for(let u of objRes.result){
          if(u.documentType==docuentTypeId){
            this.uploadedDocs.push(u);
          }
        }
       
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
       // console.log("Before::"+JSON.stringify(this.uploadedDocs));
      }
        });
  }  
downloadView(filePath: any, filename: any) {
   
  if (filePath.indexOf("s3.ap-south-1") != -1) {
    var url1 = filePath;
    window.open(url1, '_blank');
  } else {
    var url2 = filePath + filename;
    window.open(url2, '_blank');
  }
}
  setProgramTypeId(){
    // console.log("this.programId::"+this.programId);
    for(let a of this.programList){
      if(a.id==this.programId){
        this.programTypeId=a.programTypeId;
        break;
      }
    }
  }
  newnach(content) {    
              const Data = {
                userId: this.userId,
                lastActivityTime: this.curDate,
                userMedium: "postman",
                loanRequestId: this.loanid,
                orgId: this.orgId,
            };
            this.apiService.eNachMandatEinquiry(Data).subscribe(data => {
              if (data.status == 200) {
                this.enach = data.result.respDetails;
              }
            });
          // }
          this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      }
}



@Component({
  selector: 'create-loan',
  template: `<div class="modal-header">
  <h4 class="modal-title" id="modal-basic-title">Create Loan Info</h4>
  <button type="button" class="close" aria-label="Close" (click)="getDismissReason('Cross click')">
    <span aria-hidden="true">X</span>
  </button>
</div>
<div class="modal-body">
<span *ngIf="showErrorMessage" style="color:red;text-align: center;">{{errorMessage}}</span>
<span *ngIf="errorMsg" style="color:red;text-align: center;">{{errorMessage}}</span>

  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Lan No</th>
        <th>Created Date</th>
        <th>Remarks</th>
        <th *ngIf="standingRequired">Standing Instructions For Auto Disbursement</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
        <input type="text"  [(ngModel)]="lan" class="form-control" (keypress)="alphanumkeyPress($event)"
        style="text-transform: uppercase;"  >
        </td>
        <td>
        <input type="date" [(ngModel)]="lanCreateDate" class="form-control" max="{{todayDate}}" (keypress)="preventTyping()" >
        </td>
        <td><input type="text" [(ngModel)]="lanRemarks" class="form-control"  ></td>
        <td><input type="file" *ngIf="standingRequired" [(ngModel)]="standingInstructionDoc" class="form-control" (change)="uploadfilearray(i,$event.target.files)" ></td>
      </tr>
    </tbody>

  </table>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-success" (click)="saveCreateLoan()">save</button>
</div>`,
})

export class CreateLoanAPIPopupPage implements OnInit {
  text: any;
  finnoId: any;
  lan: any;
  lanCreateDate: any;
  lanRemarks: any;
  loanid: any;
  actionId: any;
  errorMessage: any;
  showErrorMessage: boolean = false;
  errorMsg: boolean = false;
  HeaderDetails = [];
  createLoanForm: FormGroup;
  dateMatch = new RegExp("^[1-9][0-9]{3}([0][1-9]||[1][0-2])([0][1-9]||[1-2][0-9]||[3][0-2])");
  requestList = [];
  todayDate: any;
  userId: any;
  fileName:any;
  fileSource:any;
  standingRequired:boolean=false;
  standingInstructionDoc:any;
  futureDate: moment.Moment;
  formattedDate: string;
  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateLoanAPIPopupPage>, @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService, private dialog: MatDialog,
    private set: breadcrumbMessage, private crypto: Crypto) { }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  get f() { return this.createLoanForm.controls; }
  preventTyping() {
    return false;
  }
  ext(filename) {
    return filename.split('.').pop();
  }
  uploadfilearray(index, file) {
    var ext = this.ext(file[0].name);
    if ((ext == 'jpg') || (ext == 'jpeg') || (ext == 'png') || (ext == 'pdf')) {
      let reader = new FileReader();
      reader.readAsDataURL(file[0])
      reader.onload = () => {
        this.fileSource = reader.result;
        this.fileName = file[0].name;
      };
    } else {
      this.set.setOption("The accepted data format are as follow : jpg, jpeg, png, pdf", false);
    }

  }
  onSubmit() {
    if(this.standingRequired){
      var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
          var fileDynamicFinal=[];
            const filedata = {
              documentTypeId: '78',
              fileName: this.data.loanId + "_" + this.fileName,
              fileContent: this.fileSource.split(",")[1],
            };
          fileDynamicFinal.push(filedata);
          
          const docDetails = {
            userId: this.data.userId,
            lastActivityTime: curDate,
            retailerId: this.crypto.decryt(window.localStorage.getItem('retailerId')),
            currentActivityId: '0',
            loanRequestId: this.data.loanId,
            retailerType: this.crypto.decryt(window.localStorage.getItem('retailerType')),
            mobileNo: this.data.mobileNo,
            userMedium: 'backEndApp',
            docData: fileDynamicFinal
          }
          console.log("docDetails::" + JSON.stringify(docDetails));
          this.apiService.uploadDocuments(docDetails).subscribe(data => {
          }, error => console.log(error));
    }
  }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    // this.standingRequired=this.data.standingRequired;
    this.standingRequired=this.data.standingRequired;
    this.todayDate = moment().format('YYYY-MM-DD');
    this.futureDate = moment().add(1, 'days');
    this.formattedDate = this.futureDate.format('YYYY-MM-DD');
  }
 
  validateDate(create_date) {
    var temp = create_date.split("-");
    var createdDate = temp[0] + temp[1] + temp[2];
    var currentDate = moment().format('YYYYMMDD');
    // alert("date::"+temp[0]+temp[1]+temp[2]+"  current date::"+moment().format('YYYYMMDD'));
    if (createdDate >= currentDate) {
      return false;
    } else {
      return true;
    }

  }


 
  saveCreateLoan() {

    this.showErrorMessage = true;
    if (this.lan == null || this.lan == undefined || this.lan == '') {
      this.errorMessage = 'Please Enter Lan Number';
    } else if (this.lanCreateDate == null || this.lanCreateDate == undefined || this.lanCreateDate == '') {
      this.errorMessage = 'Please Enter Created Date';
    } else if (this.lanRemarks == null || this.lanRemarks == undefined || this.lanRemarks == '') {
      this.errorMessage = 'Please Enter Remarks';
    } else if (this.standingRequired && (this.standingInstructionDoc == null || this.standingInstructionDoc == undefined || this.standingInstructionDoc == '')) {
      this.errorMessage = 'Please update Standing Instruction Document For Auto Disbursement';
    } else {
      this.onSubmit();
      this.showErrorMessage = false;
      // this.set.setOption("Lan created successfully", true);
      const Data = {
        loanId: this.data.loanId,
        lan: this.lan,
        createdDate: this.lanCreateDate,
        remarks: this.lanRemarks,
        subStatusId: this.data.subStatusid,
        statusId: this.data.statusId,
        userId: this.userId,
        userMedium: "backendApp",
        statusFlow: this.data.statusFlow,
        orgId: this.data.orgId,
      };
      this.apiService.saveCreateLoanInfo(Data).subscribe(data => {
        if (data.status == 200) {
          if (data.exceptionOccured == 'Y') {
            this.errorMsg = true;
            this.errorMessage = data.exceptionMessage;
            // this.set.setOption(data.exceptionMessage, false);
          } else {
            this.errorMsg = false;
            this.set.setOption("Lan created successfully", true);
            this.apiService.sanctionNotification(this.data.loanId).subscribe(data => { });
            this.dialogRef.close();
          }
        } else {
          this.errorMsg = true;
          this.errorMessage = data.exceptionMessage;
          // alert("Update was Failed");
        }
      }, error => console.log(error));
    }
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.dialogRef.close();
      return `with: ${reason}`;
    }
  }
  
  alphanumkeyPress(event: any) {
    const pattern = /[a-zA-Z0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }

 
}
