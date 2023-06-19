import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "../../core/api.service";
import * as moment from 'moment/moment.js';
import { gemConstant, retailerConstant, sellerConstant, nonSoleProp, dealerConstant, Constant, UGROLendor } from '../../core/constant';
import { breadcrumbMessage } from '..//../shared/breadcrumb-message.service'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment, lender } from '..//../../environments/environment';
import { Currency } from '../../shared/currency.service';
import { Crypto } from '../../shared/crypto.service';
import { CreateLoanAPIPopupPage } from '../action/action.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-failed-step-action',
  templateUrl: './failed-step-action.component.html',
  styleUrls: ['./failed-step-action.component.css']
})
export class FailedStepActionComponent implements OnInit {

  bankdetails:any;
  programList:any;
  @ViewChild('program', { static: true }) program: TemplateRef<any>;
  @ViewChild('penny', { static: true }) penny: TemplateRef<any>;
  hideButton: boolean = true;
  actionButton: any;
  id: any;
  idfccheck: boolean = true;

  urlerror: boolean = false;
  loanid: any;
  subStatusid: any;
  urlmessage: any;
  urltext: boolean = false;
  urltexts: boolean = false;
  urlmessages: any;
  mobileNo: any;
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
  substatusId: any;
  programId: any;
  statusFlow: any;
  curDate: any;
  gemId: any;
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
  userId: any;
  rerunBrandRule: boolean = false;
  runConsumerBureau: boolean = false;
  runCommercialRule: boolean = false;
  ugroLender: boolean = false;
  janaLender: boolean = false;
  idfcLender: boolean = false;
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
  finalLimitRemarks: any;
  tenure: any;
  roi: any;
  currentLimit: any;
  minLimit: any;
  maxLimit: any;
  minRoi: any;
  maxRoi: any;
  pendingzero:boolean=false;
  todayDate: any;
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
  pdCall: boolean = false;
  pdVarification: boolean = false;
  crnApiCall: boolean = false;
  dedupeManual: boolean = false;
  dedupeCall: boolean = false;
  amlManual: boolean = false;
  amlApi: boolean = false;
  aadhaarVault: boolean = false;
  merchantApi: boolean = false;
  merchantRule: boolean = false;
  pennyDrop: boolean = false;

  brandRule: boolean = false;
  bureauRule: boolean = false;
  programsSelection: boolean = true;

  Merchant_analysis_Call: any;
  Merchant_analysis_Rule: any;
  Penny_Drop_API_call: any;
  Rerun_Bank_Rule: any;
  Rerun_Brand_Rule: any;
  Rerun_Bureau_Rule: any;
  program_selection: any;
  muteDetails:any; 
  remark:any; 
  ifscCode:any;
  acNumber:any;
  bankName:any;
  accType:any;
  accList:any;
  proceedButton:boolean=true;
  bankId:any;

  bankCtrl : FormControl;
  bankList = [];
  filteredBank : Observable<any[]>;

  primaryApplicant:any;
  branchName:any;
  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private crypto: Crypto,
    private modalService: NgbModal, private apiService: ApiService, private set: breadcrumbMessage, private currency: Currency) { 
    this.bankCtrl = new FormControl();
    this.apiService.getbankList().subscribe(data => {
      if (data.status == 200) {
        this.bankList = JSON.parse(data.result);
        console.log(this.bankList);
        this.filteredBank = this.bankCtrl.valueChanges
        .pipe(
          startWith(''),
        map(list => list ? this.bankListfunc(list) : this.bankList.slice())
        );
      } 
    }, error => console.log(error));
    }

 bankListfunc(name: string) {
    console.log(this.filteredBank);
    return this.bankList.filter(list =>
      list.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
setBankId(id){
  console.log("id::"+id);
this.bankId=id;
}
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\+\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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
        this.set.setOption("Status updated Successfully", true);
        this.ngOnInit();
      } else {
        this.set.setOption("Failed to update", false);
        this.ngOnInit();
      }
    });
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
      "retailerType": "2"
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
  action(actionId) {
    if (actionId == Constant.Merchant_analysis_Call) {
      this.merchantAnalysisApiCall();
    } else if (actionId == Constant.Merchant_analysis_Rule) {
      this.merchantAnalysisRule();
    } else if (actionId == Constant.Penny_Drop_API_call) {
      this.chooseBank(this.penny);
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
    this.apiService.getHulProgramList(this.loanid, 1).subscribe(data => {
      if (data.status == 200) {
        this.programList = data.result;
      }
    });
    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getBankDetails(value){
    this.ifscCode=value.ifscCode;
    this.acNumber=value.accountNo;
    this.accType=value.accountType;
    this.bankName=value.bankName;
    this.bankId=value.bankId;
    this.id=value.id;
    this.primaryApplicant=value.primaryApplicant;
    this.branchName=value.branchName;
    this.checkValidation();
  }
  chooseBank(content) {
    this.checkValidation();
     this.apiService.getAccountType().subscribe(data => {
        if(data.status == 200){
          this.accList = JSON.parse(data.result);
        }
      }, error => console.log(error));
    this.apiService.getBankDetails(this.loanid).subscribe(data => {
      if (data.status == 200) {
        this.bankdetails = data.result;
        if(this.bankdetails.length==1){
            this.ifscCode=this.bankdetails[0].ifscCode;
            this.acNumber=this.bankdetails[0].accountNo;
            this.accType=this.bankdetails[0].accountType;
            this.bankName=this.bankdetails[0].bankName;
            this.id=this.bankdetails[0].id;
            this.bankId=this.bankdetails[0].bankId;
            this.primaryApplicant=this.bankdetails[0].primaryApplicant,
            this.branchName=this.bankdetails[0].branchName;
            this.checkValidation();
        }
      }
    });
    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  muteAction(content, sum: any) {
    this.muteDetails = sum;
    this.remark='';
    this.modalService.open(content, { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}
  muteFailedAction(actionId) {
    const data = {
      actionId: actionId,
      remarks: this.remark,
      status: 'succcess',
      userId: this.userId,
      userMedium: 'PWA',
      loanRequestId: this.loanid
    }
    this.apiService.updateActionStatus(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage,"true")
        this.ngOnInit();
    
        this.modalService.dismissAll();
      } else {
        // this.set.setOption(data.exceptionMessage, false);
        this.errorMsg=data.exceptionMessage;
      }
    }
    );
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
gotoloanpage()
{
  this.router.navigate(['/report/loanRequestList'], { queryParams: { 'loanId': this.loanid, 'nonStopFlag': '0' } });
}
  saveProgram() {
    if (this.isNullorUndefinedorEmpty(this.programId)) {
      this.errorMsg = "Please Choose Program";
    } else {
      const data = {
        loanId: this.loanid,
        orgId: this.orgId,
        programId: this.programId,
        userId: this.userId,
        currentActivityId: '65',
        userMedium: 'Backend'
      }
      this.apiService.saveProgramDetails(data).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption(data.exceptionMessage, true);
          this.ngOnInit();
          this.onboarding();
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
      fileName: '',
      fileNameBack: '',
      mobileNo: this.mobileNo.toString(),
      fileType: '1',
      userId: this.userId,
      lastActivityTime: this.curDate,
      loanRequestId: this.loanid,
      currentActivityId: '56',
      name: this.HeaderDetails[0].customerName,
      lastName: '',
      address: '',
      docNo: this.HeaderDetails[0].panNo,
      gender: '',
      userMedium: "PWA"
    }
    this.apiService.merchantAnalysisRule(data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage,true);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage,false);
        this.ngOnInit();
      }
    });
  }
  pennyDropApi() {
    if (this.isNullorUndefinedorEmpty(this.ifscCode) || this.ifscCode.length!=11) {
        this.errorMsg="please Enter valid IFSC Code";
    }else if (this.isNullorUndefinedorEmpty(this.acNumber) || this.acNumber.length<5) {
        this.errorMsg="please Enter valid A/C Number";
    }else{

    const data = {
      loanRequestId: this.loanid,
      userId: this.userId,
      userMedium: 'Backend',
      ifscCode:this.ifscCode,
      acNumber:this.acNumber,
      accountType:this.accType,
      bankName:this.bankName,
      id:this.id,
      bankId:this.bankId,
      primaryApplicant:this.primaryApplicant,
      branchName:this.branchName,
      currentActivityId:'0'
    }
    this.apiService.pennyDropApiCall(data).subscribe(data => {
      if (data.status == 200) {
        this.modalService.dismissAll();
        this.ngOnInit();
      }else{
        this.modalService.dismissAll();
        this.set.setOption(data.exceptionMessage,false);
      }
    });
    }
    
  }
  checkValidation(){
    if (this.isNullorUndefinedorEmpty(this.ifscCode) || this.ifscCode.length!=11) {
      this.proceedButton=true;
    }else if (this.isNullorUndefinedorEmpty(this.acNumber) || this.acNumber.length<5) {
      this.proceedButton=true;
    }else if (this.isNullorUndefinedorEmpty(this.accType)) {
      this.proceedButton=true;
    }else if (this.isNullorUndefinedorEmpty(this.bankName)) {
      this.proceedButton=true;
    }else{
      this.proceedButton=false;
    }
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
      lenderId: this.lenderId
    }
    this.apiService.getProcessOverAllBankStatements(bankstatementData).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
 this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, true);
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
        this.set.setOption(data.exceptionMessage,true);
     this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage,false);
        this.ngOnInit();
      }
    });
  }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.todayDate = moment().format('YYYY-MM-DD');
    this.gstRuleProcessing = true;
    this.bureauButton = true;
    this.createLoan = false;
    this.fraudcheckButton = true;
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
    this.Merchant_analysis_Call = Constant.Merchant_analysis_Call;
    this.Merchant_analysis_Rule = Constant.Merchant_analysis_Rule;
    this.Penny_Drop_API_call = Constant.Penny_Drop_API_call;
    this.Rerun_Bank_Rule = Constant.Rerun_Bank_Rule;
    this.Rerun_Brand_Rule = Constant.Rerun_Brand_Rule;
    this.Rerun_Bureau_Rule = Constant.Rerun_Bureau_Rule;
    this.program_selection = Constant.program_selection;

    this.apiService.getPendingApiList(this.loanid)
      .subscribe(data => {
        if (data.status == 200) {
          this.pendingApiList = data.result;
          console.log("the length is ===="+this.pendingApiList.length)
          if(this.pendingApiList.length==0)
          {
            this.pendingzero=true;
          }
          this.merchantApi = false;
          this.merchantRule = false;
          this.pennyDrop = false;
          this.bankRule = false;
          this.brandRule = false;
          this.bureauRule = false;
          this.programsSelection = false;
          for (let b of this.pendingApiList) {
            if (b.actionId == Constant.Merchant_analysis_Call) {
              this.merchantApi = true;
            } else if (b.actionId == Constant.Merchant_analysis_Rule) {
              this.merchantRule = true;
            } else if (b.actionId == Constant.Penny_Drop_API_call) {
              this.pennyDrop = true;
            } else if (b.actionId == Constant.Rerun_Bank_Rule) {
              this.bankRule = true;
            } else if (b.actionId == Constant.Rerun_Brand_Rule) {
              this.brandRule = true;
            } else if (b.actionId == Constant.Rerun_Bureau_Rule) {
              this.bureauRule = true;
            } else if (b.actionId == Constant.program_selection) {
              this.programsSelection = true;
            }
          }
        }
      });
    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails = data.result;
        this.stausId = this.HeaderDetails[0].stausId;
        this.substatusId = this.HeaderDetails[0].substatusId;
        this.subStatusid = this.HeaderDetails[0].substatusId;
        this.programId = this.HeaderDetails[0].programTypeId;
        this.statusFlow = this.HeaderDetails[0].statusflow;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.checkListStatus = this.HeaderDetails[0].checkListStatus;
        this.customerId = this.HeaderDetails[0].customerId;
        this.lenderId = this.HeaderDetails[0].lenderId;
        this.orgId=this.HeaderDetails[0].orgId;
      }, error => console.log(error));

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
          this.set.setOption(data.exceptionMessage,true);
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
  }

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
          this.ngOnInit();
        }
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();
      }
    }, error => console.log(error));
  }
  gotoAction() {
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
      this.HeaderDetails = data.result;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
      this.router.navigate(['report/action'], {
        queryParams: {
          'loanId': this.loanid,
          'orgId': this.orgId, 'programTypeId': this.programId
        }
      });
    }, error => console.log(error));
  }
  gotoList() {
    this.router.navigate(['/report/']);
  }
  nonStopFlag: any;
  goToList() {
    if (this.nonStopFlag == 0) {
      this.router.navigate(['/report/loanRequestList'], { queryParams: { 'loanId': this.loanid, 'nonStopFlag': '0' } });
    } else {
      this.router.navigate(['/report/draftLoanRequestList'], { queryParams: { 'loanId': this.loanid, 'nonStopFlag': '1' } });
    }
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
onboarding(){
  const data1 = {
    mobileNo: this.mobileNo,
    userId: window.localStorage.getItem('userId'),
    loanRequestId: this.loanid,
    retailerType: '1',
    currentActivityId: '66',
    lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    orgId:  this.orgId,
    userMedium: 'PWA',
    programTypeId: '8',
    statusFlag: '1',
    fileType: 'pdf',
    processFrom: '',
    bureauType: '1',
    programId:  this.programId
  }
  this.apiService.processHulOnboarding(data1).subscribe(data => { 
    if (data.status == 200 && data.exceptionOccured == 'N' && data.result.apiMsg == 'Success') {
    
    
    }

  });
}




}
