import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Program } from '../programModel';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ApiService } from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { Currency } from '../../shared/currency.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { Crypto } from '../../shared/crypto.service';
import { exit } from 'process';
import { EmailListComponent } from '../../sourcing/email-list/email-list.component';
import { lenderconfiguration } from '../../../environments/lender.config';
import { lender } from '../../../environments/environment';

const my = new Date();

@Component({
  selector: 'app-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.css']
})
export class ProgramAddComponent implements OnInit {

  model: NgbDateStruct;
  model2: NgbDateStruct;
  programIds: any;
  programfilter: any;
  get today() {
    return new Date();
  }
  finaggPayHide: boolean;
  program: Program = new Program();
  submitted = false;
  s: any;
  lendersetup: boolean = false;
  lens: any;
  posi: any;
  borrowerROIListnew: Array<any> = [];
  newbeneficiary: any = {};
  newProgramLimit: any = {};
  closeResult: string;
  beneficiaryList: any;
  borrowerLoanTenureType: any;
  checkmate: any;
  money:any;
  newROIData: any;
  fixchecker: any;
  lateFeeList: Array<any> = [];
  l: any;
  tenureList: Array<any> = [];
  beneficiaryDynamic: Array<any> = [];
  showlimit:boolean=true;
  showlimitb:boolean=true;
  programLimitDynamic: Array<any> = [];
  newrepayment: any = {};
  repaymentList: any;
  repaymentDynamic: Array<any> = [];
  lenk: any;
  z: any;
  ProgramModeList: any;
  envlender: any;
  borrowtenure: any;
  ProgramTypeList: any;
  repayment: Array<any> = [];
  programDynamic: Array<any> = [];
  valuechecker: boolean = true;
  newDynamic: any = {};
  partnerDynamic: Array<any> = [];
  newPartner: any = {};
  counter: any;
  programLimit: Array<any> = [];
  lendroi: any
  companyTypeList: Array<any> = [];
  masterProgramList: Array<any> = [];
  LenderList: Array<any> = [];
  PartnerList: Array<any> = [];
  loanTenureList: Array<any> = [];
  pfTypeList = [{ id: 1, name: 'flat' }, { id: 2, name: 'percentage' }];
  masterList = [];
  borrowerROIListTemp: Array<any> = [];
  borrowerTenureListTemp: Array<any> = [];
  startDate: any;
  endDate: any;
  sd: boolean;
  newTenuredata: any;
  roicheck: any;
  m: any
  ed: any;
  c: any;
  edate: any;
  cDate = new Date(999 - 12 - 31);
  dsDate: any;
  deDate: any;
  lenz: any;
  borrowerRoiType: any;
  sdate: any;
  borrowRoi: any;
  env: any;
  borrowerROIList: Array<any> = [];
  borrowerTenureList: Array<any> = [];

  limit: any;
  smiList: Array<any> = [];
  discountFlagList = [{ id: 1, name: 'Yes' }, { id: 0, name: 'No' }];
  discountTypeList = [{ id: 1, name: 'Flat Percentage' }, { id: 2, name: 'Per Day' }];
  notificationTypeList = [{ id: 1, name: 'Consolidated' }, { id: 2, name: 'Line' }];
  notificationFrequncyList = [{ id: 1, name: 'Daily' }, { id: 2, name: 'Once a week' }];
  roiTypeList = [{ id: '1', name: 'Lender Roi' }, { id: '2', name: 'Borrower Roi' }];
  smiProcessList: any;
  smiTypeList: any;
  start: any;


  cashDiscountList = [];
  customConfigList: Array<any> = [];

  userId: any;
  dataType = [{ id: '1', name: 'String' }, { id: '2', name: 'Int' }, { id: '3', name: 'Float' }, { id: '4', name: 'Long' },
  { id: '5', name: 'Decimal' }, { id: '6', name: 'Boolean' }, { id: '7', name: 'Long' }];
  constructor(private router: Router, private changeDetec: ChangeDetectorRef, private datePipe: DatePipe,
    private apiService: ApiService, private fb: FormBuilder, private set: breadcrumbMessage, private modalService: NgbModal,
    private crypto: Crypto,public currency: Currency) { }

  preventTyping() {
    return false;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\+\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  dateFetch(value) {
    var name;
    console.log(this.masterList);
    for (var b = 0; b < this.masterProgramList.length; b++) {
      if (value == this.masterProgramList[b].id) {
        name = this.masterProgramList[b].name;
        break;
      }
    }
    for (var a = 0; a < this.masterList.length; a++) {
      if (name == this.masterList[a].masterName) {
        this.startDate = this.masterList[a].startDate;
        this.dsDate = this.startDate;
        this.endDate = this.masterList[a].endDate;
        this.deDate = this.endDate;
        this.limit = this.masterList[a].totalLimit;
        this.program.startDate = this.startDate;
        this.program.endDate = this.endDate;
        this.program.totalLimit = this.limit;
        this.program.limitPerBorrower = this.limit;
        this.borrowerCheck(this.program.limitPerBorrower);
        break;
      }
    }
    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);
    console.log(this.limit);
    
  }

  sdateCheck(date) {
    var sDate = new Date(date);
    if (this.cDate < sDate) {
      if ((this.startDate <= sDate) && (sDate <= this.endDate)) {
        this.sd = true;
        this.sdate = sDate;
        this.dateCheck();
      }
      else {
        this.program.startDate = '';
        this.set.setOption("The date should be within Master Limit Range " + this.dsDate + " and " + this.deDate, false);
      }
    }
  }
  rangecheck(data) {
    this.roichecker(data);
    if (Number(data) > Number(this.program.maxROI)) {
      this.set.setOption('The ROI entered should be between the min and max roi ', false);
    } else if (Number(data) < Number(this.program.minROI)) {
      this.set.setOption('The ROI entered should be between the min and max roi ', false);
    }
  }
  edateCheck(date) {
    var eDate = new Date(date);
    if (this.cDate < eDate) {
      if ((this.startDate <= eDate) && (eDate <= this.endDate)) {
        this.ed = true;
        this.edate = eDate;
        this.dateCheck();
      }
      else {
        this.program.endDate = '';
        this.set.setOption("The date should be within Master Limit Range " + this.dsDate + " and " + this.deDate, false);
      }
    }
  }

  dateCheck() {
    if (this.sd && this.ed) {
      if (!(this.edate > this.sdate)) {
        this.program.startDate = '';
        this.program.endDate = '';
        this.set.setOption("End date should be ahead of start date", false);
      }
      this.sd = false;
      this.ed = false;
      return;
    }
  }


  limitCheck(value) {
  this.showlimit=true;
    console.log("the value amount is==="+value)
    if (!(Number(this.limit) >= Number(value))) {
      this.set.setOption("The limit should be equal or less than master limit -" + this.limit, false);
      this.program.totalLimit = null;
      this.program.limitPerBorrower = null;
      this.borrowerCheck(0);
    } else {
      this.program.limitPerBorrower = value;
    }
  }

  borrowerCheck(value) {
    this.showlimitb=true;
    if (!(Number(this.program.totalLimit) >=Number(value))) {
      this.set.setOption("The borrower limit should be less than total limit -" + this.program.totalLimit, false);
      this.program.limitPerBorrower = null;
      for (let p of this.programLimitDynamic) {
        p.maxLimitAmount = 0;
        p.minLimitAmount = 0;
      }
    } else {
      for (let p of this.programLimitDynamic) {
        p.maxLimitAmount = value;
      }
    }
  }

  ngOnInit() {
    this.env = lenderconfiguration.env;
console.log("The configuration is=="+this.env)
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.reloadData();
    this.checkmate = 0;
    this.start = 0;
    this.fixchecker = 0;
    this.roicheck = 0;
    this.program.overDuePeriod = 90;
    this.program.eSigningFlag=0;
    this.program.stampPaperFlag=0;
    this.program.hypothecationFlag=0;
    this.program.loanAgreementFlag=0;
    this.program.copyRulesFrom = 0;
    this.program.digitalFlowFlag=0;
    this.program.enach=0;
    this.addCashDiscount();
    //  this.borrowerROIList();
    //  this.borrowerROIAddrow();
    this.submitted = false;
    this.counter = 1;
    this.program.activeInd = "N";
    this.programrule();
    this.SMIAddLenderRow();
    var curDate = moment().format('YYYY-MM-DD');
    this.newPartner = {
      spId: '', spRoi: '', pfTypeId: '', spPfValue: '', borrowerRoi: '',
      borrowerPfValue: '', totalRoiSP: '', totalPfValueSP: '', activeInd: 'Y', spTenure: ''
    };
    this.partnerDynamic.push(this.newPartner);

    this.newbeneficiary = {
      beneficiaryTypeId: 0, finaggPay: 0, finaggShareType: 0, finaggShareValue: 0, remarks: '',
      createdBy: this.userId, createdOn: curDate, activeInd: 1
    };
    this.beneficiaryDynamic.push(this.newbeneficiary);
  }

  save() {
  
    this.program.activeInd = "N";
    let curdate = moment().format('YYYY-MM-DD HH:mm:ss');
    let newDate2 = new Date(curdate);
    this.program.createdOn = newDate2;
    this.program.createdBy = Number(this.userId);
    this.program.borrowerRoiType=this.borrowerRoiType;
    this.program.borrowerLoanTenureType=this.borrowerLoanTenureType;
    
    let msg = null;
    let errMsg = null;
    this.apiService.createProgramSetup(this.program)
      .subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Program added Successfully", true);
          var programId = data.result.programId;
          this.programIds = programId;
          this.program = new Program();
          this.apiService.saveCustomConfiguration(programId.toString(), this.programDynamic[0].lenderId, this.customConfigList)
            .subscribe(data => { });
            const tenureList=this.borrowerROIList.map(item => item.tenure).filter((value, index, self) => self.indexOf(value) === index);
            const deletedBorrowerRoiList=[];
            const borrowerData= {
              tenureList:tenureList,
              programId:programId+'',
              borrowerROIList:this.borrowerROIList,
              userId:this.userId,
              deletedBorrowerRoiList:deletedBorrowerRoiList
            };
          this.apiService.insertBorrowerTenureDetail(borrowerData).subscribe(resp => {});
          this.apiService.insertSmiDetails(programId, this.smiList).subscribe(data => {
            if (data.status == 200) {
              this.apiService.insertLateFeeDetails(programId, this.lateFeeList).subscribe(data => {
                if (data.status == 200) {

              
                } else {
                  this.set.setOption("Late Fee Details not configured", true);
                }
                this.gotoList();
              });
            } else {
              this.set.setOption("SMI Details Update Failed", false);
            }
          });
        } else {
          this.set.setOption("Failed to add program", false);

          // alert("Failed to Add Program");
        }
      }, error => errMsg = error);
    console.log("msg==", msg);
    console.log("errMsg==", errMsg);

  }
  checkCashDiscount() {
    var discountCount = 0;
    for (let a of this.cashDiscountList) {
      discountCount++;
      // if((Number(a.fromDay) > Number(a.toDay)) && (discountCount != this.cashDiscountList.length-1)){
      //   return true;
      // }else if(Number(a.fromDay) < Number(a.toDay) && discountCount == this.cashDiscountList.length-1){
      //   return true;
      if (a.fromDay == null || a.fromDay == undefined) {
        return true;
      } else if (this.isNullorUndefinedorEmpty(a.toDay)) {
        return true;
      } else if (this.isNullorUndefinedorEmpty(a.cashDiscountValue)) {
        return true;
      } else if (this.isNullorUndefinedorEmpty(a.cashDiscountType)) {
        return true;
      } else {
        return false;
      }
    }
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == null || str == undefined);
  }
  insertBorrowerTenureDetails() {
    const dataone=
    {"programId":this.programIds,
      "roiFlag": this.borrowerRoiType,
      "tenureFlag": this.borrowerLoanTenureType
    }
    this.apiService.updateRoiTenureFlag(dataone).subscribe(dataone=>{
      if(dataone.status==200)
      {
        
      }
      else{
        this.set.setOption(dataone.exceptionMessage,false)
      }
    })
   
    
    
    const data = {
      "tenurearray": this.borrowerTenureList,
      "roiarray": this.borrowerROIList,
      "programId": this.programIds,
      "userId": this.crypto.decryt(window.localStorage.getItem('userId')),
      "roiFlag": this.borrowerRoiType,
      "tenureFlag": this.borrowerLoanTenureType

    }
    this.apiService.insertBorrowerTenureDetails(data).subscribe(data => {
      if (data.status == 200) {
this.set.setOption(data.exceptionMessage,true);
      }
      else {
        this.set.setOption(data.exceptionMessage, false);
      }
    
    });
  
  
  }
  validateSMIList() {
    var count = 0;
    if (this.smiList) {

      for (let s of this.smiList) {
        if (this.isNullorUndefinedorEmpty(s.processId)) {
          count++;
        } else if (this.isNullorUndefinedorEmpty(s.typeId)) {
          count++;
        } else if (this.isNullorUndefinedorEmpty(s.roiType)) {
          count++;
        } else if (this.isNullorUndefinedorEmpty(s.roi)) {
          count++;
        }
      }
      if (count == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  validateLateFeeList() {
    var count = 0;
    if (this.lateFeeList) {
      for (let l of this.lateFeeList) {
        if (this.isNullorUndefinedorEmpty(l.upto)) {
          count++;
        } else if (this.isNullorUndefinedorEmpty(l.days)) {
          count++;
        } else if (this.isNullorUndefinedorEmpty(l.typeId)) {
          count++;
        } else if (this.isNullorUndefinedorEmpty(l.charge)) {
          count++;
        } else if (this.isNullorUndefinedorEmpty(l.gstPercentage)) {
          count++;
        } else if (this.isNullorUndefinedorEmpty(l.isActive)) {
          count++;
        }
      }
      if (count == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  getBorrowerRoiType() {
    if (this.borrowerRoiType == 1) {

    }
    }
  

  rangechecks(data) {
    this.roichecker(data);
    this.lendroi = data;
    console.log("the env is=="+this.env)
    if (this.env == 'FIN') {
 
      if (Number(data) < 12) {
        this.set.setOption("The lender ROI should be greater than 12 and lesser than max ROI", false);
      }
      else if (Number(data) > Number(this.program.maxROI)) {
        this.set.setOption("The lender ROI should be greater than 12 and lesser than max ROI", false);   }   }
    else {
      if (Number(data) < Number(this.program.minROI)) {
        this.set.setOption("The lender ROI should be between the min and max ROI", false);      }
    else if (Number(data) > Number(this.program.maxROI)) {
        this.set.setOption("The lender ROI should be between the min and  max ROI", false);

    }
  }
}

  getBorrowerLoanTenureType() {
    console.log("the list should be empty");
    if (this.borrowerLoanTenureType == "1") {


      this.borrowerROIList = []
      this.borrowerTenureList = []
    } else {

    }
  }
  checklimits(num) {
    if (Number(num) > 100) {
      this.set.setOption('Liquid Collateral %age value should not be greater than 100', false);
    }
  }
  checklimit(num) {
    console.log("the number is called" + num)
    if (Number(num) > 100) {
      this.set.setOption("ROI value should not be greater than 100", false);
    }
  }
  trasher(i) {
    if (i > this.borrowerTenureList.length - 1) {
      this.borrowerROIList.splice(i, 1);
    } else {
      this.set.setOption('Cannot delete the first ROI for a tenure alone. Kindly delete the corresponding tenure', false);
    }
  }
  trashes(i, data) {
    this.borrowerTenureList.splice(i, 1)
    for (this.m = 0; this.m < this.borrowerROIList.length; this.m++) {
      if (this.borrowerROIList[this.m].tenure == data) {
        this.borrowerROIList.splice(this.m, 1)
      }
    }
  }
  dynamicBorrowerType() {
    let returnValue=false;
    if(this.borrowerLoanTenureType=='2'||this.borrowerRoiType=='2') {
      for(const r of this.borrowerROIList) {
        if(this.isNullorUndefinedorEmpty(r.tenure)) {
          returnValue = true;
          return ;
        } else if(this.isNullorUndefinedorEmpty(r.brandVintageFrom)) {
          returnValue = true;
          return ;
        } else if(this.isNullorUndefinedorEmpty(r.brandVintageto)) {
          returnValue = true;
          return ;
        } else if(this.isNullorUndefinedorEmpty(r.bureauScoreFrom)) {
          returnValue = true;
          return ;
        } else if(this.isNullorUndefinedorEmpty(r.bureauScoreTo)) {
          returnValue = true;
          return ;
        } else if(this.isNullorUndefinedorEmpty(r.liquidCollateral)) {
          returnValue = true;
          return ;
        } else if (this.isNullorUndefinedorEmpty(r.roi)) {
          returnValue = true;
          return ;
        }
      }
    }
    return returnValue;
  }
  onSubmit() {
    this.submitted = true;

    console.log("ProgramDYnamic==", this.programDynamic);
    console.log("partnerDynamic==", this.partnerDynamic);
    this.program.beneficiary = this.beneficiaryDynamic;
    this.program.repayment = this.repaymentDynamic;
    this.program.programLimit = this.programLimitDynamic;
    for (let i = 0; i < this.programDynamic.length; i++) {
      // console.log ("Block statement execution no." + i);
      this.programDynamic[i].lenderSequence = i + 1;
    }

    var totalLenderROINew = 0;
    var totalLenderPFNew = 0;
    var limitNew = 0;

    for (let i = 0; i < this.programDynamic.length; i++) {
      totalLenderROINew = +this.programDynamic[i].totalRoi + +totalLenderROINew;
      totalLenderPFNew = +this.programDynamic[i].totalPfValue + +totalLenderPFNew;
      limitNew = +this.programDynamic[i].lenderLimit + +limitNew;
    }
    // console.log("totalLenderROINew " + totalLenderROINew);
    // console.log("totalLenderPFNew " + totalLenderPFNew);
    // console.log("limitNew " + limitNew);

    var totalSpROINew = 0;
    var totalSpPFNew = 0;
    for (let i = 0; i < this.partnerDynamic.length; i++) {
      totalSpROINew = +this.partnerDynamic[i].totalRoiSP;
      totalSpPFNew = +this.partnerDynamic[i].totalPfValueSP;
    }
    var minRoi = this.program.minROI;
    var maxRoi = this.program.maxROI;
    var totLimit = this.program.totalLimit;

    if (this.isNullorUndefinedorEmpty(this.program.masterProgramId)) {
      this.set.setOption("Please select master program", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.programTypeId)) {
      this.set.setOption("Please select program type", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.programName)) {
      this.set.setOption("Please enter program name", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.startDate)) {
      this.set.setOption("Please enter start date", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.endDate)) {
      this.set.setOption("Please enter end date", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.totalLimit)) {
      this.set.setOption("Please enter total limi", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.limitPerBorrower)) {
      this.set.setOption("Please enter borrower limit", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.minROI)) {
      this.set.setOption("Please enter min ROI", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.maxROI)) {
      this.set.setOption("Please enter max ROI", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.installmentType)) {
      this.set.setOption("Please select installment type", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.noOfInstallment)) {
      this.set.setOption("Please select no of installment", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.loanTenure)) {
      this.set.setOption("Please select loan tenure", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.loanTenureUnit)) {
      this.set.setOption("Please select loan tenure unit", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.interestType)) {
      this.set.setOption("Please select interest type", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.noOfTranchesPerDay)) {
      this.set.setOption("Please select No Of Tranches Per Day", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.tranchLimitPercentage)) {
      this.set.setOption("Please select Tranch Limit Percentage", false);
    } else if (this.program.coApplicantSoleProp == null) {
      this.set.setOption("Please select Co-Applicant Sole Prop", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.adjustMinPercentage)) {
      this.set.setOption("Please select Adjust Min Percentage", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.adjustMaxPercentage)) {
      this.set.setOption("Please select Adjust Max Percentage", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.notificationTypeId)) {
      this.set.setOption("Please select Notification Type", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.notificationFreqId)) {
      this.set.setOption("Please Enter Notification Frequncy", false);
    } else if (this.program.loanToSoleProp == null) {
      this.set.setOption("Please Enter Loan To Sole Prop", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.requiredMonthsBankStatement)) {
      this.set.setOption("Please Enter Bank Statements for these many months", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.gracePeriod)) {
      this.set.setOption("Please Enter Grace Period", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.orderInvoiceDisbursal)) {
      this.set.setOption("Please Enter Order Invoice Disbursal", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.minimumValueofAcceptedInvoice)) {
      this.set.setOption("Please Enter Minimum Value Of Accepted Invoice", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.dueDateSelection)) {
      this.set.setOption("Please Enter Due Date Selection", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.maxFreeCredit)) {
      this.set.setOption("Please Enter valid Maximum Free Credit", false);
    } else if (this.program.orderInvoiceDisbursal == 1 && this.isNullorUndefinedorEmpty(this.program.orderInvoiceDisbursal)) {
      this.set.setOption("Please Enter Order Invoice Disbursal Limit", false);
    } else if (this.program.cashDiscountFlag == 1 && this.checkCashDiscount()) {
      this.set.setOption("Check Cash discount list", false);
    } else if (this.validateSMIList()) {
      this.set.setOption("Please Enter Valid SMI Details", false);
    }else if (this.program.programTypeId == 4 && this.program.copyRulesFrom==0&&this.env!='Jana') {
      this.set.setOption("Please Enter program rule  to map", false);
    }else if (this.set.validateSpecialChar(this.program.programName)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.totalLimit)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.limitPerBorrower)) {
      this.set.setOption("Special Characters Not Allowed",false);
    } 
    // else if (this.isNullorUndefinedorEmpty(this.program.staleDays)) {
    //   this.set.setOption("Please Enter valid staleDays", false);
    // }
    else if (this.set.validateSpecialChar(this.program.minROI)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.maxROI)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.noOfInstallment)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.loanTenure)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.requiredMonthsBankStatement)) {
      this.set.setOption("Special Characters Not Allowed",false);
    } else if (this.dynamicBorrowerType()) {
      this.set.setOption('Please Check Borrower ROI List', false);
    } else if (limitNew == totLimit) {
    this.program.partner = this.partnerDynamic;
    this.program.lenders = this.programDynamic;
    this.program.cashDiscount = this.cashDiscountList;
    if(this.program.interestType=="Front End"){
      this.program.interestTypeId=2;
    }
    else if(this.program.interestType=="Rear End"){
      this.program.interestTypeId=1;
    } else if(this.program.interestType=="Monthly Rear End"){
      this.program.interestTypeId=3;
    }
    this.save();

    } else {
      this.set.setOption("Total Limit and Lender Limit are not the same!", false);
      return false;
    }
  }
  roichecker(data) {
    if (String(data).includes('.')) {
      this.posi = String(data).indexOf('.');
      if ((String(data).length - Number(this.posi)) > 3) {
        this.set.setOption('The ROI can only have a maximum of 2 decimal points', false);
      }
    }
  }
  gotoList() {
    window.localStorage.setItem("programkey", "create");
    this.router.navigate(['/program/list']);
  }
  finaggpayType() {
    var finaggPay = (document.getElementById("finaggPay") as HTMLInputElement).value;
    if (finaggPay == "0") {
      this.finaggPayHide = false;
    } else {
      this.finaggPayHide = true;
    }

  }
  repayFinaggPayType(index, event) {
    const value = event.target.value;
    // alert("value=="+value);
    if (value == '1') {
      var tempId = 'FINAGGShare_' + index;
      var temp = document.getElementById(tempId);
      var options_str = '<select class="form-control" [(ngModel)]="dynamic.finaggShareType" name="FINAGGShareType_{{i}}"style="width: 100px;">';
      options_str += '<option value="1">Percentage</option>';
      options_str += '<option value="2">Flat Amount</option>';
      options_str += '</select>';
      temp.innerHTML = options_str;

      var tempId1 = 'FINAGGValue_' + index;
      var temp1 = document.getElementById(tempId1);
      var options_str1 = '<input type="number" class="form-control" [(ngModel)]="dynamic.finaggShareValue"';
      options_str1 += 'name="FINAGGShareValue_{{i}}" style="width: 100px;" />';
      temp1.innerHTML = options_str1;
    } else {
      var tempId = 'FINAGGShare_' + index;
      var temp = document.getElementById(tempId);
      var options_str = '';
      temp.innerHTML = options_str;

      var tempId1 = 'FINAGGValue_' + index;
      var temp1 = document.getElementById(tempId1);
      var options_str1 = '';
      temp1.innerHTML = options_str1;
    }


  }
  showlimits()
  {
    this.showlimit=false;
  }
  showlimitborrower()
  {
    this.showlimitb=false;
  }
  newrow() {
    if (this.checker()) {
      console.log("i am now called");
      this.roicheck = 5;
      if (this.l != 1) {
        this.counter += 1;
      }
      this.checkmate = 6;
      this.lenk = this.borrowerROIList.length;
      this.lens = this.borrowerTenureList.length;
      console.log("the length of the list is==" + this.lens)

      for (this.s = 0; this.s < this.lens; this.s++) {
        this.borrowerROIAddrow();
      }
      this.lenz = this.borrowerROIList.length;
      console.log("the length of the new list is ====" + this.lenz)
      this.s = this.lenk;
      this.m = 0;
      while (this.s < this.lenz) {
        console.log("the old tenure is ===+" + this.borrowerROIList[this.m].tenure)
        this.borrowerROIList[this.s].tenure = this.borrowerROIList[this.m].tenure
        this.m++;
        this.s++;
      }
    }
    else {
      this.set.setOption("Starting value should not be greater then Ending Value", false);
    }
  }
  newiteratedrow() {

  }
  borrowerROIAddrowNew() {
    this.newROIData = { tenure: '', brandVintageto: '', brandVintageFrom: '', bureauScoreFrom: '', bureauScoreTo: '', liquidCollateral: '', roi: '' }
    this.borrowerROIListnew.push(this.newROIData);
  }
  borrowerROIAddrow() {
    this.newROIData = { tenure: '', brandVintageto: '', brandVintageFrom: '', bureauScoreFrom: '', bureauScoreTo: '', liquidCollateral: '', roi: '',activeInd:'1' };
    this.borrowerROIList.push(this.newROIData);
  }
  // addrow condition
  SMIAddRow() {
    this.newDynamic = {
      processId: '', typeId: '', roiType: '2', roi: ''
    };
    this.smiList.push(this.newDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  SMIAddLenderRow()
  {
    this.newDynamic = {
      processId: '', typeId: '1', roiType: '1', roi: ''
    };
    this.smiList.push(this.newDynamic);
    this.newDynamic = {
      processId: '', typeId: '2', roiType: '1', roi: ''
    };
    this.smiList.push(this.newDynamic);
    
    this.newDynamic = {
      processId: '', typeId: '3', roiType: '1', roi: ''
    };
    this.smiList.push(this.newDynamic);
    this.newDynamic = {
      processId: '', typeId: '4', roiType: '1', roi: ''
    };
    this.smiList.push(this.newDynamic);
  }
  deleteSMIRow(index) {
    if (this.smiList.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);
      return false;
    }
      else {
      this.smiList.splice(index, 1);
      return true;
    }
  }
  lateFeeAddRow() {
    this.newDynamic = {
      upto: '', typeId: '', days: '', charge: '', gstPercentage: '', isActive: '1'
    };
    this.lateFeeList.push(this.newDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  deleteLateFeeRow(index) {
    if (this.lateFeeList.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);
      return false;
    } else {
      this.lateFeeList.splice(index, 1);
      return true;
    }
  }
  customAddRow() {
    this.newDynamic = {
      paramName: '', typeId: '', value: '', functionId: '1001', id: '', lccId: '', userId: this.userId,activeInd:'1',roi:'0'
    };
    this.customConfigList.push(this.newDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  customAddRows() {
    this.newDynamic = {
      paramName: 'productCode', typeId: '1', value: '', functionId: '1001', id: '', lccId: '',roi:'0' ,userId: this.userId
    };
    this.customConfigList.push(this.newDynamic);
    this.newDynamic = {
      paramName: 'scheduleCode', typeId: '1', value: '', functionId: '1001', id: '', lccId: '',roi:'0' , userId: this.userId
    };
    this.customConfigList.push(this.newDynamic);
    this.newDynamic = {
      paramName: 'rateChartCode', typeId: '1', value: '', functionId: '1001', id: '', lccId: '', roi:'0' ,userId: this.userId
    };
    this.customConfigList.push(this.newDynamic);
    this.newDynamic = {
      paramName: 'vaProductCode', typeId: '1', value: '', functionId: '1001', id: '', lccId: '', roi:'0' ,userId: this.userId
    };
    this.customConfigList.push(this.newDynamic);

    this.changeDetec.detectChanges();
    return true;
  }
  deleteCustomConfig(index) {
  

      this.customConfigList.splice(index, 1);
      return true;
    
  }
  addRow() {
    //this.addLender();
    this.newDynamic = {
      lenderId: '', lenderSequence: this.programDynamic.length + 1,
      lenderPercentage: '', lenderLimit: '', lenderRoi: '', pfTypeId: '', lenderPfValue: '', riskSharingStatus: '',
      riskSharingPercentage: '', finAggRoi: '',
      finAggPfValue: '', totalRoi: '', totalPfValue: '', activeInd: 'Y', lenderTenure: ''
    };
    this.programDynamic.push(this.newDynamic);
    if (this.env == 'Jana') {
      console.log(" the lender is jana")
      this.envlender = lender.jana;
      console.log("the  id of the lender jana is === " + lender.jana)
      console.log("The ID of the lender is====" + this.LenderList[0].id)

      this.programDynamic[this.programDynamic.length - 1].lenderId = this.envlender;
      this.programDynamic[this.programDynamic.length - 1].finAggRoi = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderRoi = this.program.minROI;
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = "100";
      this.programDynamic[this.programDynamic.length - 1].pfTypeId = 1;
      this.programDynamic[this.programDynamic.length - 1].riskSharingStatus = "NO";
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].riskSharingPercentage = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].totalPfValue = "0";
      if (this.programDynamic.length < 2) {
        this.partnerDynamic[0].borrowerRoi = this.program.minROI
        this.partnerDynamic[0].totalRoiSP = this.program.minROI
      }
      this.programDynamic[this.programDynamic.length - 1].totalRoi = this.program.minROI;
      this.programDynamic[this.programDynamic.length - 1].lenderLimit = this.program.totalLimit
      this.programDynamic[this.programDynamic.length - 1].lenderTenure = this.program.loanTenure
      this.customAddRows();
      this.lendersetup = true;
    }
    else if (this.env == 'Tvsc') {
      console.log(" the lender is tvs")
      this.envlender = lender.tvs;
      console.log("the  id of the lender jana is === " + lender.tvs)
      console.log("The ID of the lender is====" + this.LenderList[0].id)

      this.programDynamic[this.programDynamic.length - 1].lenderId = this.envlender;
      this.programDynamic[this.programDynamic.length - 1].finAggRoi = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderRoi = this.program.minROI;
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = "100";
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = "100";
      this.programDynamic[this.programDynamic.length - 1].pfTypeId = 1;
      this.programDynamic[this.programDynamic.length - 1].riskSharingStatus = "NO";
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].riskSharingPercentage = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderPfValue = "0";
      if (this.programDynamic.length < 2) {
        this.partnerDynamic[0].borrowerRoi = this.program.minROI
        this.partnerDynamic[0].totalRoiSP = this.program.minROI
      }
      this.programDynamic[this.programDynamic.length - 1].lenderLimit = this.program.totalLimit
      this.programDynamic[this.programDynamic.length - 1].lenderTenure = this.program.loanTenure
      this.lendersetup = true;
    }
    else if(this.env=='Abfl')
    {
      console.log(" the lender is abfl")
      this.envlender = lender.abfl;
      console.log("the  id of the lender jana is === " + lender.tvs)
      console.log("The ID of the lender is====" + this.LenderList[0].id)

      this.programDynamic[this.programDynamic.length - 1].lenderId = this.envlender;
      this.programDynamic[this.programDynamic.length - 1].finAggRoi = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderRoi = this.program.minROI;
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = "100";
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = "100";
      this.programDynamic[this.programDynamic.length - 1].pfTypeId = 1;
      this.programDynamic[this.programDynamic.length - 1].riskSharingStatus = "NO";
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].riskSharingPercentage = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderLimit = this.program.totalLimit
      this.programDynamic[this.programDynamic.length - 1].lenderTenure = this.program.loanTenure
      if (this.programDynamic.length < 2) {
        this.partnerDynamic[0].borrowerRoi = this.program.minROI
        this.partnerDynamic[0].totalRoiSP = this.program.minROI
      }
      this.lendersetup = true;
    }
    else {
      this.lendersetup = false;
    }

    // console.log("programDynamic",this.programDynamic);  
    this.changeDetec.detectChanges();
    return true;
  }
  deleteRow(index) {
    if (this.programDynamic.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);

      // alert("Can't delete the row when there is only one row");
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning',{ positionClass: 'toast-top-right'  });  
      return false;
    } else {
      this.programDynamic.splice(index, 1);
      //this.removeLender(index);
      // this.toastr.warning('Row deleted successfully', 'Delete row',{ positionClass: 'toast-top-right'  });  
      return true;
    }
  }
  // addrow condition

  // reypayment addrow condition
  reypaymentAddRow() {
    //this.addrepaymentStatus();
    var curDate = moment().format('YYYY-MM-DD');
    this.newrepayment = {
      setupType: 0, priority: 0, repaymentTypeId: 0, finaggPay: 0,
      finaggShareType: 0, finaggShareValue: 0, remarks: '', activeInd: 1,
      createdBy: this.userId, createdOn: curDate
    };
    this.repaymentDynamic.push(this.newrepayment);
    this.changeDetec.detectChanges();
    return true;
  }

  reypaymentDeleteRow(index) {
    if (this.repaymentDynamic.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);

      // alert("Can't delete the row when there is only one row");
      return false;
    } else {
      this.repaymentDynamic.splice(index, 1);
      //this.removerepaymentStatus(index);
      return true;
    }
  }
  // reypayment addrow condition
  // programLimit Addrow 
  programLimitAddRow() {
    var curDate = moment().format('YYYY-MM-DD');
    this.newProgramLimit = {
      companyTypeId: 0, minLimitAmount: 0, maxLimitAmount: 0, activeInd: 1,
      createdBy: this.userId, createdOn: curDate, modifiedBy: this.userId, modifiedOn: curDate
    };
    this.programLimitDynamic.push(this.newProgramLimit);
    this.changeDetec.detectChanges();
    return true;
  }
  programLimitDeleteRow(index) {
    if (this.repaymentDynamic.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);

      // alert("Can't delete the row when there is only one row");
      return false;
    } else {
      this.repaymentDynamic.splice(index, 1);
      return true;
    }
  }
  // addrow End
  calculateLenderROI(index) {
    var lenderROI = this.programDynamic[index].lenderRoi;
    var finaggROI = this.programDynamic[index].finAggRoi;

    var totalLenderROI = +lenderROI + +finaggROI;

    this.programDynamic[index].totalRoi = totalLenderROI;

    // console.log("totalLenderROINew " + totalLenderROINew);
    // console.log("totalLenderPFNew " + totalLenderPFNew);



    // console.log("totalLenderROI "+totalLenderROI);

  }
  validateCompanyMaxLimit(i, value) {
    if (!(this.program.limitPerBorrower >= value)) {
      this.programLimitDynamic[i].maxLimitAmount = '';
      this.set.setOption("The limit should be less than borrower limit - " + this.program.limitPerBorrower, false);
    }
    if ((!(value >= this.programLimitDynamic[i].minLimitAmount)) && (this.programLimitDynamic[i].minLimitAmount)) {
      this.programLimitDynamic[i].maxLimitAmount = '';
      this.set.setOption("The max limit should be greater than min limit", false);
    }

  }
  validateCompanyMinLimit(i, value) {
    if (!(Number(this.program.limitPerBorrower) >= Number(value))) {
      this.programLimitDynamic[i].minLimitAmount = '';
      this.set.setOption("The limit should be less than borrower limit - " + this.program.limitPerBorrower, false);
    }
    if ((!(Number(value) < this.programLimitDynamic[i].maxLimitAmount)) && (this.programLimitDynamic[i].maxLimitAmount)) {
      this.programLimitDynamic[i].minLimitAmount = '';
      this.set.setOption("The min limit should be less than max limit", false);
    }
  }


  calculateLenderPF(index) {
    var lenderPF = this.programDynamic[index].lenderPfValue;
    var finaggPF = this.programDynamic[index].finAggPfValue;

    var totalLenderPF = +lenderPF + +finaggPF;

    this.programDynamic[index].totalPfValue = totalLenderPF;



    // console.log("totalLenderPF "+totalLenderPF);

  }

  calculateSpRoi(index) {
    var sourcingRoi = this.partnerDynamic[index].spRoi;
    var borrowerSourcingRoi = this.partnerDynamic[index].borrowerRoi;

    var totalSpRoi = +sourcingRoi + +borrowerSourcingRoi;

    this.partnerDynamic[index].totalRoiSP = totalSpRoi;

    // console.log("totalSpRoi "+totalSpRoi);
  }

  calculateSpPf(index) {
    var spPF = this.partnerDynamic[index].spPfValue;
    var borrowerPF = this.partnerDynamic[index].borrowerPfValue;

    var totalSpPF = +spPF + +borrowerPF;

    this.partnerDynamic[index].totalPfValueSP = totalSpPF;

    // console.log("totalSpPF "+totalSpPF);
  }

  reloadData() {
    this.apiService.getSmiProcessList().subscribe(res => { this.smiProcessList = res.result; });
    this.apiService.getSmiTypeList().subscribe(res => this.smiTypeList = res.result);
    this.apiService.getMasterList().subscribe(res => this.masterList = res.result);

    this.apiService.getMasterProgramList().subscribe(res => this.masterProgramList = res.result);

    this.apiService.getProgramLenderList().subscribe(data => {
      if (data.status == 200) {
        this.LenderList = data.result;



      }
    });
    this.apiService.getPartnerList().subscribe(res => this.PartnerList = res.result);
    this.apiService.getProgramTypeList().subscribe(res => this.ProgramTypeList = res.result);
    this.apiService.getProgramModeList().subscribe(res => this.ProgramModeList = res.result);
    this.apiService.getRepaymentList().subscribe(res => this.repaymentList = res.result);
    this.apiService.getBeneficiaryList().subscribe(res => this.beneficiaryList = res.result);
    this.apiService.getLoanTenureList().subscribe(res => this.loanTenureList = res.result);
    this.apiService.getCompanyTypeList().subscribe(res => {
      this.companyTypeList = res.result;
      var curDate = moment().format('YYYY-MM-DD');
      for (let i = 0; i < this.companyTypeList.length; i++) {
        this.newProgramLimit = {
          companyTypeId: this.companyTypeList[i].id, minLimitAmount: 0, maxLimitAmount: 0, activeInd: 1,
          createdBy: this.userId, createdOn: curDate, modifiedBy: this.userId, modifiedOn: curDate
        };
        this.programLimitDynamic.push(this.newProgramLimit);
      }
    });

  }

  programaddForm = this.fb.group({
    masterprogramName: new FormControl('', [Validators.required]),
    programType: new FormControl('', [Validators.required]),
    programName: new FormControl('', [Validators.required]),
    programMode: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    totalLimit: new FormControl('', [Validators.required]),
    borrowerLimit: new FormControl('', [Validators.required]),
    minRoi: new FormControl('', [Validators.required]),
    maxRoi: new FormControl('', [Validators.required]),
    installmentType: new FormControl('', [Validators.required]),
    noOfInstallment: new FormControl('', [Validators.required]),
    loanTenure: new FormControl('', [Validators.required]),
    loanTenureUnit: new FormControl('', [Validators.required]),
    interestType: new FormControl('', [Validators.required]),
    noOfTranchesPerDay: new FormControl('', [Validators.required]),
    tranchLimitPercentage: new FormControl('', [Validators.required]),
    coApplicantSoleProp: new FormControl('', [Validators.required]),
    adjustminPercentage: new FormControl('', [Validators.required]),
    adjustmaxPercentage: new FormControl('', [Validators.required]),
    sp: this.fb.group({
      spId: new FormControl('', [Validators.required]),
      roiPercentage: new FormControl('', [Validators.required]),
      pfType: new FormControl('', [Validators.required]),
      pf: new FormControl('', [Validators.required]),
      borrowerroiPercentage: new FormControl('', [Validators.required]),
      borrowerPf: new FormControl('', [Validators.required]),
      totalroiPercentage: new FormControl('', [Validators.required]),
      totalPf: new FormControl('', [Validators.required])
    }),
    beneficiarySetup: this.fb.group({
      beneficiary: new FormControl('', [Validators.required]),
      finaggPay: new FormControl('', [Validators.required]),
      finaggshareType: new FormControl('', [Validators.required]),
      finaggshareValue: new FormControl('', [Validators.required]),
    }),
    //lender :  this.fb.array([]),
    //repaymentStatus :  this.fb.array([])
  })

  // get lender():FormArray {
  //   return this.programaddForm.get('lender') as FormArray
  // }

  // get repaymentStatus():FormArray {
  //   return this.programaddForm.get('repaymentStatus') as FormArray
  // }

  // newLender() : FormGroup {
  //   return this.fb.group({
  //     lenderName : new FormControl('',[Validators.required]),
  //     lenderPercentage : new FormControl('',[Validators.required]),
  //     limit : new FormControl('',[Validators.required]),
  //     roiPercentage : new FormControl('',[Validators.required]),
  //     pfType : new FormControl('',[Validators.required]),
  //     pf : new FormControl('',[Validators.required]),
  //     riskSharingStatus : new FormControl('',[Validators.required]),
  //     riskSharingPercentage : new FormControl('',[Validators.required])
  //   })
  // }

  // newrepaymentStatus() : FormGroup {
  //   return this.fb.group({
  //     setupType : new FormControl('',[Validators.required]),
  //     priority : new FormControl('',[Validators.required]),
  //     repaymentType : new FormControl('',[Validators.required]),
  //     finaggPay : new FormControl('',[Validators.required]),
  //   })
  // }

  // addLender() {
  //   this.lender.push(this.newLender());
  // }

  // removeLender(index: number){
  //   this.lender.removeAt(index);
  // }

  // addrepaymentStatus() {
  //   this.repaymentStatus.push(this.newrepaymentStatus());
  // }

  // removerepaymentStatus(index: number){
  //   this.repaymentStatus.removeAt(index);
  // }


  viewTenure(content) {




    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  startendcheckDate() {
    return null;
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
  addCashDiscount() {
    var tday;
    if (this.cashDiscountList.length == 0) {
      tday = 0;
    } else {
      tday = Number(this.cashDiscountList[this.cashDiscountList.length - 1].toDay) + 1;
    }
    const obj = {
      cashDiscountType: '',
      cashDiscountValue: '',
      fromDay: tday,
      toDay: -1,
      activeInd: '1',
      createdBy: this.userId,
      createdOn: moment().format('YYYY-MM-DD'),
      modifiedBy: '',
      modifiedOn: ''
    }
    this.cashDiscountList.push(obj);
  }

  removeCashDiscount(i) {
    this.cashDiscountList.splice(i, 1);
    this.cashDiscountList[i].fromDay = this.cashDiscountList[i - 1].toDay + 1;
  }

  setFromDay(i) {
    if (this.checkCashDiscountDay(i, 2)) {
      if (this.cashDiscountList[i + 1]) {
        this.cashDiscountList[i + 1].fromDay = this.cashDiscountList[i].toDay + 1;
      } else {
        return;
      }
    } else {
      return;
    }
  }

  checkCashDiscountDay(i, a) {
    if (Number(this.cashDiscountList[i].toDay) > Number(this.cashDiscountList[i].fromDay)) {
      return true;
    } else {
      if (this.cashDiscountList[i].toDay != -1) {
        if (a == 2) {
          this.cashDiscountList[i].toDay = "";
        } else {
          this.cashDiscountList[i].fromDay = "";
        }
        this.set.setOption("Today must be great than FromDay", false);
        return false;
      } else {
        return;
      }
    }
  }
  validateGstPercentage(index) {
    // if(this.lateFeeList[index].gstPercentage>100){
    //   this.set.setOption("Gst Percentage Must be less than 100",false);
    //   this.lateFeeList[index].gstPercentage="";
    // }
  }
  checkUpto(i) {
    if (i != 0 && this.lateFeeList[i + 1].upto < this.lateFeeList[i].upto) {
      this.lateFeeList[i].checkUpto = true;
    } else {
      this.lateFeeList[i].checkUpto = false;
    }
  }
  validateUpto(index) {
    for (let i = 0; i < index; i++) {
      console.log(this.lateFeeList[i].upto + ">" + this.lateFeeList[index].upto);
      if (this.lateFeeList[i].upto > this.lateFeeList[index].upto) {
        // this.set.setOption(this.lateFeeList[index].upto+" must be greater than "+this.lateFeeList[i].upto,false);
        this.lateFeeList[index].upto = "";
        break;
      }
    }
  }

  selector(pos, tenures) {
    console.log("position is==" + pos)
    console.log("tenure to be added is==" + tenures)
    if (pos < this.borrowerTenureList.length - 2) {
      console.log("first editor is called")
      this.m = pos;
      while (this.m < this.borrowerROIList.length) {
        console.log("the index edited is====" + this.m)
        this.borrowerROIList[this.m].tenure = tenures;

        this.m = this.m + this.borrowerTenureList.length

      }


    }
    else if ((pos == (this.borrowerTenureList.length - 1)) && (this.checkmate == 2)) {

      console.log("the new tenure value is now====" + tenures)
      console.log("the position is====" + pos);
      this.lens = this.counter + 1;
      this.checkmate = 3;
      this.lens = this.borrowerTenureList.length * this.lens;
      console.log("the number of times is " + this.lens)
      for (this.m = 0; this.m < this.lens; this.m++) {
        console.log("Add row is iterating" + this.m + "times");
        this.borrowerROIAddrowNew();
      }
      this.lens = this.borrowerROIListnew.length;
      console.log("the new length is===" + this.lens)
      this.m = pos;
      console.log("the data is new====" + this.borrowerROIListnew[this.m].tenure)
      this.borrowerROIListnew[this.m].tenure = tenures;


      for (this.m = 0; this.m < this.borrowerROIListnew.length; this.m++) {
        console.log("the newly inserted data is===" + this.borrowerROIListnew[this.m].tenure + "in index" + this.m)
      }
      this.m = 0;
      while (this.m < this.borrowerROIListnew.length) {
        if (this.borrowerROIListnew[this.m].tenure == '') {



          console.log("the data at index" + this.m + "is" + this.borrowerROIList[this.m].tenure);
          this.borrowerROIListnew[this.m] = this.borrowerROIList[this.m]
          console.log("the new at index" + this.m + "is" + this.borrowerROIListnew[this.m].tenure);
          this.m = this.m + 1;

        }
        else {
          console.log("second choice is selected");

          break;
        }

      }



      this.borrowerROIList = this.borrowerROIListnew.splice(0, pos + 1);
      for (this.s = 0; this.s < this.borrowerROIList.length; this.s++) {
        console.log("the data is====" + this.borrowerROIList[this.s].tenure)
      }
      this.c = this.counter
      this.looper()
    }
    else {
      console.log("second editor is called")
      this.m = pos;
      while (this.m < this.borrowerROIList.length) {
        console.log("the index edited is====" + this.m);
        this.borrowerROIList[this.m].tenure = tenures;
        this.m = this.m + this.borrowerTenureList.length
      }


    }
  }

  looper() {
    this.l = 1;
    for (this.z = 0; this.z < this.c - 1; this.z++) {
      console.log(" i called " + this.s + "times")
      this.newrow();
    }
    this.l = 2;
  }
  borrowerTenureAddRow() {
    this.checkmate = 2;
    this.start = 1;
    if (this.checker()) {
      console.log("the roi check is now" + this.roicheck)
      this.newTenuredata = { tenure: '' }
      this.borrowerTenureList.push(this.newTenuredata);
      if (this.roicheck == 0) {
        console.log("new row is added");
        this.borrowerROIAddrow()
      }
    }
    else {
      this.set.setOption("Starting value should not be greater than Ending value", false)
    }
  }

  checker() {
    for (this.s = 0; this.s < this.borrowerROIList.length; this.s++) {
      if (this.borrowerROIList[this.s].brandVintageFrom != '' && this.borrowerROIList[this.s].brandVintageto != '' && this.borrowerROIList[this.s].bureauScoreFrom != '' && this.borrowerROIList[this.s].bureauScoreTo != '') {
        if (Number(this.borrowerROIList[this.s].brandVintageFrom) > Number(this.borrowerROIList[this.s].brandVintageto) || Number(this.borrowerROIList[this.s].bureauScoreFrom) > Number(this.borrowerROIList[this.s].bureauScoreTo)) {
          this.valuechecker = false;
          break;

        }
        else {
          this.valuechecker = true;
        }
      }
      else this.valuechecker = true;
    }

    return this.valuechecker
  }
  fixed(name) {
    if (this.borrowerLoanTenureType == 1)

      if (this.fixchecker == 0) {

        this.newTenuredata = { tenure: name }

        this.borrowerTenureList = [];
        this.borrowerTenureList.push(this.newTenuredata);
        this.newROIData = { tenure: name, brandVintageto: '', brandVintageFrom: '', bureauScoreFrom: '', bureauScoreTo: '', liquidCollateral: '', roi: '' }
        this.borrowerROIList = [];
        this.borrowerROIList.push(this.newROIData);
        this.fixchecker = 3;
      }
      else {
        this.fixer(name)
      }
  }
  rangechecking(data) {
    this.roichecker(data)
    this.borrowRoi = data;
    console.log("the data is =====" + data)
    console.log("The min ROI is =====" + this.program.minROI)

    if (Number(data) > Number(this.program.maxROI)) {
      this.set.setOption("The ROI entered should be between the min and max roi ", false);
    }
    else if (Number(data) < Number(this.program.minROI)) {
      this.set.setOption("The ROI entered should be between the min and max roi ", false);
    }
  }
  fixer(names) {
    this.fixchecker = 2

    this.borrowerTenureList[0].tenure = names
    this.borrowerROIList[0].tenure = names
  }
  rangechecker(data, datatwo, datathree, data4) {
    console.log("I should be called")
    this.roichecker(data)
    if (datatwo == "1") {
      if (Number(data )<Number( this.program.minROI) || Number(data )>Number( this.program.maxROI)) {
        this.set.setOption("The ROI entered should be between the min and max roi ", false);
      }
    
      if (datathree == "2") {
        if(this.env=='FIN'){
        data4.roi = this.borrowRoi
        }
      }
      else {
        if(this.env=='FIN')
        {
        data4.roi = this.lendroi
        }
      }
    }
    else {
      if(datatwo=="1"||datatwo=="2")
      {
      if (Number(data) < Number(this.program.minROI) || Number(data) > Number(this.program.maxROI)) {
        this.set.setOption("The ROI entered should be between the min and max roi ", false);
      }
    }
    }
  }
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  programrule() {
    console.log("THe data in program is===" + this.program.programTypeId)
    this.apiService.getfilteredProgramList(this.program.programTypeId)
      .subscribe(data => {
        if (data.status == 200) {

          this.programfilter = data.result;
          console.log("THe data in program is===" + this.programfilter)
        } else {
          this.set.setOption(data.exceptionMessage, false);
          // alert(data.exceptionMessage);
        }
      }, error => console.log(error));
  }

  checkValidation(){
    this.program.stampPaperFlag='0';
  }
  checkeStampDutyProcurement(){
    this.program.eStampDutyProcurementFlag = '0';
  }
}


