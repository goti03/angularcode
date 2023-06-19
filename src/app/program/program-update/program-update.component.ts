import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Program } from '../programModel';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { Currency } from '../../shared/currency.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { max } from 'date-fns';
import { Crypto } from '../../shared/crypto.service';
import { ElementSchemaRegistry } from '@angular/compiler';
import { lenderconfiguration } from '../../../environments/lender.config';
import { lender } from '../../../environments/environment';
import { threadId } from 'worker_threads';

const my = new Date();

@Component({
  selector: 'app-program-update',
  templateUrl: './program-update.component.html',
  styles: [
    `
      .custom-day {
        text-align: center;
        padding: 0.185rem 0.25rem;
        display: inline-block;
        height: 2rem;
        width: 2rem;
      }
      .custom-day.focused {
        background-color: #e6e6e6;
      }
      .custom-day.range,
      .custom-day:hover {
        background-color: #0275d8;
        color: white;
      }
      .faded {
        opacity: 0.5;
      }
      .weekend {
        background-color: #242a33;
        border-radius: 1rem;
        color: white;
      }
      .hidden {
        display: none;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type=number] {
        -moz-appearance: textfield;
      }
    `
  ]
  // styleUrls: ['./program-update.component.css']
})
export class ProgramUpdateComponent implements OnInit {
  id: number;
  program: Program;
  submitted = false;
  tenurecheck: any;
  model: NgbDateStruct;
  smidatalist:Array<any> = [];
  borrowerRoiType: any;
  model2: NgbDateStruct;
  pfTypeList = [{ id: 1, name: 'flat' }, { id: 2, name: 'percentage' }];
  valuechecker: boolean;
  s: number;
  newROIData: any;
  checkmate: number;
  roicheck: number;
  c: any;
  z: any;
  active: any;
  l: number;
  counter: any;
  borrowerROIType: any;
  lenk: number;
  lens: any;
  borrowerTenureList: any;
  lenz: number;
  m: number;
  newTenuredata: any;
  borrowerLoanTenureType: any;
  count: number;
  x: number;
  programfilter: any;
  get today() {
    return new Date();
  }
  newbeneficiary: any = {};
  beneficiaryList: any;
  beneficiaryDynamic: Array<any> = [];
  companyTypeList: Array<any> = [];
  programLimitList: Array<any> = [];
  Borrower: Array<any> = [];
  newrepayment: any = {};
  lendroi: any;
  borrowRoi: any;
checkflag:any;
  repaymentList: any;
  ProgramModeList: any;
  repaymentDynamic: Array<any> = [];
  programDynamic: Array<any> = [];
  newDynamic: any = {};
  partnerDynamic: Array<any> = [];
  newPartner: any = {};
  masterProgramList: Array<any> = [];
  showlimit:boolean=true;
  showlimitb:boolean=true;
  borrowerROIList: Array<any> = [];
  deletedBorrowerRoiList: Array<any> = [];
  insertborrowerROIList: Array<any> = [];
  updateborrowerROIList: Array<any> = [];
  insertborrowerTenureList: Array<any> = [];
  updateborrowerTenureList: Array<any> = [];
  newROIList: Array<any> = [];
  ROIList: Array<any> = [];
  dataList: Array<any> = [];
  roiTenureList: Array<any> = [];
  LenderList: Array<any> = [];
  PartnerList: Array<any> = [];
  loanTenureList: Array<any> = [];
  borrowerROIListnew: Array<any> = [];
  closeResult: string;
  smiList: Array<any> = [];
  smiTypeList: Array<any> = [];
  smiProcessList: Array<any> = [];
  roiTypeList = [{ id: '1', name: 'Lender Roi' }, { id: '2', name: 'Borrower Roi' }];
  finaggPay = [
    { id: '1', name: 'Yes' },
    { id: '0', name: 'No' }
  ];
  finaggShareType = [
    { id: '1', name: 'Percentage' },
    { id: '2', name: 'Flat Amount' }
  ];
  priority = [
    { id: '1', name: 'priority 1' },
    { id: '2', name: 'priority 2' },
    { id: '3', name: 'priority 3' }
  ];
  setupType = [
    { name: 'default' },
    { name: 'alternate Payment' }
  ];
  ProgramTypeList: any;
  posi:any;
  masterList = [];
  startDate: any;
  endDate: any;
  sd: boolean;
  ed: boolean;
  sdate: any;
  edate: any;
  env: any;
  envlender: any;
  lendersetup: boolean = false;
  cDate = new Date(999 - 12 - 31);
  dsDate: any;
  deDate: any;
  limit: any;

  //   LenderList = [
  //     { id: '1', name: 'UGROW' },
  //     ];

  //     PartnerList = [
  //       { id: '1', name: 'Havells' },
  //       ];

  // ProgramTypeList = [
  //   { id: '1', name: 'Bullet and Line' },
  //   { id: '2', name: 'Line and Line' },
  //   { id: '3', name: 'Line and Bullet' },
  //   { id: '4', name: 'Bullet and Bullet' },
  // ];

  discountFlagList = [{ id: 1, name: 'Yes' }, { id: 0, name: 'No' }];
  discountTypeList = [{ id: 1, name: 'Flat Percentage' }, { id: 2, name: 'Per Day' }];
  notificationTypeList = [{ id: 1, name: 'Consolidated' }, { id: 2, name: 'Line' }];
  notificationFrequncyList = [{ id: 1, name: 'Daily' }, { id: 2, name: 'Once a week' }];

  cashDiscountList = [];
  tenureFlaglist=[];
  cashDiscountList1 = [];
  lateFeeList = [];
  userId: any;
  i: any;
  customConfigList: Array<any> = [];
  deletedCustomConfig:any;
  dataType=[{ id: '1', name: 'String' }, { id: '2', name: 'Int' }, { id: '3', name: 'Float' }, { id: '4', name: 'Long' },
   { id: '5', name: 'Decimal' }, { id: '6', name: 'Boolean' }, { id: '7', name: 'Long' }];
  constructor(private route: ActivatedRoute, private router: Router,
    private changeDetec: ChangeDetectorRef, private apiService: ApiService, private set: breadcrumbMessage, private crypto: Crypto, private modalService: NgbModal,public currency: Currency) { }
    preventTyping() {
      return false;
    }
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\+\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  ngOnInit(): void {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.id = this.route.snapshot.params['id'];
    console.log("The environment needed is ==="+ lenderconfiguration.env)
    this.env = lenderconfiguration.env;
    this.reloadData();
    this.program = new Program();
    this.roicheck = 0;
    this.checkflag=0;
    this.lendroi = 0;
 // this.program.eStampDutyProcurementFlag=0;
    // this.program.stampDutyFlag=0;
    // this.program.stampPaperFlag=0;
    // this.program.hypothecationFlag=0;
    // this.program.loanAgreementFlag=0;
    // this.program.eSigningFlag=0;
    this.borrowRoi = 0;
    this.program.copyRulesFrom = 0;

    this.apiService.getSMIDetails(this.id).subscribe(res => this.smiList = res.result);
 
    
    this.apiService.getLateFeeDetails(this.id).subscribe(res => this.lateFeeList = res.result);
    this.apiService.getProgramSetup(this.id)
    .subscribe(data => {
      console.log(data)
      if (data.status == 200) {
        this.program = data.result;
        this.borrowerLoanTenureType=this.program.borrowerLoanTenureType;
        this.borrowerROIType=this.program.borrowerRoiType;
        const dataone={
          "programId": this.id 
        }
        this.apiService.selectBorrowerTenureDetails(dataone).subscribe(data => {
          if (data.status == 200) {
            this.dataList = data.result;
            this.borrowerROIList = this.dataList;
            for(let b of this.borrowerROIList){
              b.activeInd='1';
            }
            this.apiService.getCustomConfiguration(this.id,this.program.lenders[0].lenderId).subscribe(res =>{
              if(res.status==200){
                this.customConfigList = res.result
                for(let c of this.customConfigList){
                  c.userId=this.userId;
                  c.roi=Number(c.roi).toFixed(1);
                  c.activeInd='1';
                }
              }
            });
          }
        });
        this.smichecker();
        this.programrule();
          this.active = this.program.activeInd
          this.cashDiscountList = data.result.cashDiscount;
          this.cashDiscountList1 = this.cashDiscountList;
          var list = [];
          for (let a of this.cashDiscountList) {
            if (a.activeInd == '1') {
              list.push(a);
            }
          }
          this.cashDiscountList = list;
        
          this.dateFetch(this.program.masterProgramId);

          this.limitCheck(this.program.totalLimit);
          this.borrowerCheck(this.program.limitPerBorrower);
          this.sdateCheck(this.program.startDate);
          this.edateCheck(this.program.endDate);

          for (let i = 0; i < this.programLimitList.length; i++) {
            this.validateCompanyMaxLimit(i, this.programLimitList[i].maxLimitAmount);
            this.validateCompanyMinLimit(i, this.programLimitList[i].minLimitAmount);
          }
        } else {
          this.set.setOption(data.exceptionMessage, false);
          // alert(data.exceptionMessage);
        }

        this.model = {
          "year": Number(this.program.startDate.split("-")[0]),
          "month": Number(this.program.startDate.split("-")[1]),
          "day": Number(this.program.startDate.split("-")[2])
        }
        this.model2 = {
          "year": Number(this.program.endDate.split("-")[0]),
          "month": Number(this.program.endDate.split("-")[1]),
          "day": Number(this.program.endDate.split("-")[2])
        }

        this.conditionsCheck();
      }, error => console.log(error));

    this.submitted = false;
   
  }
  smichecker( )
  {var p;
    if(this.smiList.length!=0)
    {
      for(p=0;p<this.smiList.length;p++)
      {
if(this.smiList[p].roiType=="1")
{this.checkflag=1;
this.smidatalist.push(this.smiList[p].typeId)
}
      }
      if(this.checkflag==1)
      {
      this.SMIAddLenderRow();
      }else{
        this.smiaddrowstart();
      }
    }
    else{
      this.smiaddrowstart();
    }
  }
  SMIAddLenderRow()
{if(!(this.smidatalist.includes("1")))
{


  this.newDynamic = {
    processId: '', typeId: '1', roiType: '1', roi: ''
  };
  this.smiList.push(this.newDynamic);
}if(!(this.smidatalist.includes("2")))
{
  this.newDynamic = {
    processId: '', typeId: '2', roiType: '1', roi: ''
  };
  this.smiList.push(this.newDynamic);
}if(!(this.smidatalist.includes("3"))){
  
  this.newDynamic = {
    processId: '', typeId: '3', roiType: '1', roi: ''
  };
  this.smiList.push(this.newDynamic);
}if(!(this.smidatalist.includes("4"))){
  this.newDynamic = {
    processId: '', typeId: '4', roiType: '1', roi: ''
  };
  this.smiList.push(this.newDynamic);
}
}
smiaddrowstart()
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
showlimits()
{
  this.showlimit=false;
}
showlimitborrower()
{
  this.showlimitb=false;
}
  conditionsCheck() {

    if (this.program.partner.length > 0) {
      var partnerData = [];
      this.program.partner.forEach(function (partner) {
        partnerData.push(partner);

      });
      console.log("partnerData==", partnerData);
    }

    if (this.program.lenders.length > 0) {
      var lendersData = [];
      this.program.lenders.forEach(function (lenders) {
        lendersData.push(lenders);

      });
      console.log("lendersData==", lendersData);
    }
    if (this.program.beneficiary.length > 0) {
      var beneficiaryData = [];
      this.program.beneficiary.forEach(function (beneficiary) {
        beneficiaryData.push(beneficiary);
      });
      console.log("lendersData==", lendersData);
    }
    if (this.program.programLimit.length > 0) {
      var programLimitData = [];
      this.program.programLimit.forEach(function (programLimit) {
        programLimitData.push(programLimit);
      });
      console.log("lendersData==", lendersData);
    }
    // alert("this.program.beneficiary"+JSON.stringify(this.program.beneficiary));
    if (this.program.repayment.length > 0) {
      var repaymentData = [];
      this.program.repayment.forEach(function (repayment) {
        repaymentData.push(repayment);
      });
      //  alert("this.program.repayment"+JSON.stringify(this.program.repayment));
      console.log("lendersData==", lendersData);
    }
    this.programLimitList = programLimitData;
    this.repaymentDynamic = repaymentData;
    this.beneficiaryDynamic = beneficiaryData;

    this.partnerDynamic = partnerData;
    if(this.borrowerROIType=="2"&&this.borrowerLoanTenureType=="1")
    {console.log("the dynamic roi is called")
    console.log("the dataList length is ===="+this.dataList.length)
      if(this.dataList.length<1)
      {console.log("i am called the tenure is ==="+this.partnerDynamic[0].spTenure)
        this.fixed(this.partnerDynamic[0].spTenure)
      }
    }
    this.programDynamic = lendersData.sort((a, b) => {
     
      if (a.lenderSequence > b.lenderSequence) {
        return 1;
      } else if (a.lenderSequence < b.lenderSequence) {
        return -1;
      } else {
        return 0;
      }
    });

    console.log('partnerDynamic', this.partnerDynamic);
    console.log('programDynamic', this.programDynamic);
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
      this.lens = this.roiTenureList.length;
      console.log("the length of the list is==" + this.lens)

      for (this.s = 0; this.s < this.lenk; this.s++) {
        this.borrowerROIAddrowunique();
      }
      this.lenz = this.borrowerROIList.length;
      console.log("the length of the new list is ====" + this.lenz)
      this.s = this.lenk
      this.m = 0;
      while (this.s < this.lenz) {
        console.log("the old tenure is ===+" + this.borrowerROIList[this.m].tenure)
        this.borrowerROIList[this.s].tenure = this.borrowerROIList[this.m].tenure
        if (this.borrowerROIList[this.m].ptId.includes("a")) {
          this.borrowerROIList[this.s].uqId = this.borrowerROIList[this.m].uqId;
        }
        this.borrowerROIList[this.s].ptId = String("a" + this.borrowerROIList[this.m].ptId)
        console.log("the new pt Id is=====" + this.borrowerROIList[this.s].ptId)
        // this.borrowerROIList[this.s].tenure = String("a"+this.borrowerROIList[this.m])

        this.m++;
        this.s++;
      }
    }
    else {
      this.set.setOption("Starting value should not be greater then Ending Value", false);
    }
  }
  viewTenure(content) {
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
  borrowerTenureAddRow() {
    this.checkmate = 2;

    console.log("the roi check is now" + this.roicheck)
    this.newTenuredata = { ptId: '', tenure: '' }
    this.roiTenureList.push(this.newTenuredata);
 
      console.log("new row is added");
      this.borrowerROIAddrow()
    
  }



  borrowerROIAddrow() {
    this.newROIData = { tenure: '', brandVintageto: '', brandVintageFrom: '', bureauScoreFrom: '', bureauScoreTo: '', liquidCollateral: '', roi: '', activeInd:'1' };
    this.borrowerROIList.push(this.newROIData);
  }
  borrowerROIAddrowunique() {
    console.log("I am called to add a new row")
    this.newROIData = { prId: 'a', ptId: '', tenure: '', brandVintageto: '', brandVintageFrom: '', bureauScoreFrom: '', bureauScoreTo: '', liquidCollateral: '', roi: '', uqId: 'b' }

    this.borrowerROIList.push(this.newROIData);
  }
  selector(pos, tenures, ptid) {
    console.log("position is==" + pos)
    console.log("tenure to be added is==" + tenures)
    console.log("The pt id is ===" + ptid)
    console.log("the checkmate function is now===" + this.checkmate)
    if (pos <= this.roiTenureList.length - 2) {
      console.log("first editor is called")
      this.m = ptid;
      this.i = 0;

      while (this.i < this.borrowerROIList.length) {
        console.log("the pt id of the row is====" + this.borrowerROIList[this.i].ptId);
        console.log("the pt id added is now====" + ptid)
        if (this.borrowerROIList[this.i].ptId == ptid || this.borrowerROIList[this.i].ptId.includes(String("a" + ptid)))
          this.borrowerROIList[this.i].tenure = tenures;
        console.log("the updated tenure is===" + this.borrowerROIList[this.i].tenure)


        this.i++

      }


    }
    else if ((pos == (this.roiTenureList.length - 1)) ){

      console.log("the new tenure value is now====" + tenures)
      console.log("the position is====" + pos);
      console.log("the counter value is ====" + this.counter)
      this.lens = this.counter + 1;
      this.checkmate = 3;


      for (this.m = 0; this.m < 1; this.m++) {
        console.log("Add row is iterating" + this.m + "times");
        // this.borrowerROIAddrow();
      }

      this.m = this.borrowerROIList.length - 1;
      this.x = this.roiTenureList.length - 1;
      console.log("the data is new====" + this.borrowerROIList[this.m].tenure)
      this.borrowerROIList[this.m].tenure = tenures;
      this.borrowerROIList[this.m].ptId = String("a" + pos);
      this.roiTenureList[this.x].ptId = String("a" + pos);

      console.log("the new tenue is=======" + this.borrowerROIList[this.m].tenure + "the positon is===" + this.m)
    }
    else {
      console.log("second editor is called")
      this.m = pos;
      this.i = 0;
      while (this.i < this.borrowerROIList.length) {
        console.log("the pt id of the row is====" + this.borrowerROIList[this.i].ptId);
        if (this.borrowerROIList[this.i].ptId == ptid || this.borrowerROIList[this.i].ptId.includes(String("a" + ptid))) {
          console.log("the new tenure is===" + tenures)
          this.borrowerROIList[this.i].tenure = tenures;
          console.log("the updated tenure is===" + this.borrowerROIList[this.i].tenure)
        }

        this.i++;

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

  checker() {
    for (this.s = 0; this.s < this.borrowerROIList.length; this.s++) {
      if (this.borrowerROIList[this.s].brandVintageFrom != '' && this.borrowerROIList[this.s].brandVintageto != '' && this.borrowerROIList[this.s].bureauScoreFrom != '' && this.borrowerROIList[this.s].bureauScoreTo != '') {
        if (this.borrowerROIList[this.s].brandVintageFrom > this.borrowerROIList[this.s].brandVintageto || this.borrowerROIList[this.s].bureauScoreFrom > this.borrowerROIList[this.s].bureauScoreTo) {
          this.valuechecker = false;
          break;

        }
        else {
          this.valuechecker = true;
        }
      }
      else this.valuechecker = true;
    }
    this.valuechecker = true;
    return this.valuechecker
  }

  updateProgram() {
    this.program.activeInd = this.active
    let curdate = moment().format('YYYY-MM-DD HH:mm:ss');
    let newDate2 = new Date(curdate);
    this.program.createdOn = newDate2;
    this.program.createdBy = Number(this.userId);
    this.program.borrowerRoiType=this.borrowerROIType;
    this.program.borrowerLoanTenureType=this.borrowerLoanTenureType;
    
    this.apiService.updateProgramSetup(this.id, this.program)
      .subscribe(data => {
        if (data.status == 200) {
          const tenureList=this.borrowerROIList.map(item => item.tenure).filter((value, index, self) => self.indexOf(value) === index);
          const borrowerData= {
            tenureList:tenureList,
            programId:this.id,
            borrowerROIList:this.borrowerROIList,
            userId:this.userId,
            deletedBorrowerRoiList:this.deletedBorrowerRoiList
          };
          this.apiService.insertBorrowerTenureDetail(borrowerData).subscribe(resp => {});
          this.apiService.saveCustomConfiguration(this.id,this.program.lenders[0].lenderId,this.customConfigList)
          .subscribe(data => {});
          this.apiService.updateSMIDetails(this.smiList, this.id).subscribe(data => {
            if (data.status == 200) {
              this.apiService.updateLateFeeDetails(this.lateFeeList, this.id).subscribe(data => {
                if (data.status == 200) {
              
                } else {
                  this.set.setOption("Late fee details Not configured", true);
                }
                this.set.setOption("Program Updated Successfuly", true);
       
                this.gotoList();
              });
            } else {
              this.set.setOption("SMI details Update Failed", false);
            }
          });
        }
        else {
          this.set.setOption("Failed to Update Program", false);
          // alert("Failed to Update Program");
        }
      }, error => console.log(error));

  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == null || str == undefined);
  }
  checkCashDiscount() {
    var discountCount = 0;
    for (let a of this.cashDiscountList) {
      discountCount++;
      // if((Number(a.fromDay) > Number(a.toDay)) && discountCount != 1 && (discountCount != this.cashDiscountList.length-1)){
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
  validateSMIList() {
    var count = 0;
    if (this.smiList) {
      console.log("the rule is called")
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
        console.log("the count is now==" + count)
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
  onSubmit() {
    // var a = Math.max(this.cashDiscountList1.length, this.cashDiscountList.length);
    // for (var b = 0; b < a; b++) {
    // console.log(b);
    //   if (this.cashDiscountList1[b] && this.cashDiscountList[b]) {
    //     this.cashDiscountList[b].cdId = this.cashDiscountList1[b].cdId;
    //     console.log("1");
    //   } else if (this.cashDiscountList1[b] && !this.cashDiscountList[b]) {
    //     this.cashDiscountList.push(this.cashDiscountList1[b]);
    //     this.cashDiscountList[b].activeInd = '0';
    //     console.log("4");
    //   }
    //   console.log("this.cashDiscountList1::"+ JSON.stringify(this.cashDiscountList1));
    //   console.log("this.cashDiscountList::"+ JSON.stringify(this.cashDiscountList));
    //   console.log("makka");
    // }
    // for(let i = 0; i < this.cashDiscountList.length; i++){
    //   this.cashDiscountList[i].modifiedBy=localStorage.getItem('userId');
    //   this.cashDiscountList[i].modifiedOn=moment().format('YYYY-MM-DD');
    // }
    console.log("ProgramDYnamic==", this.programDynamic);
    console.log("partnerDynamic==", this.partnerDynamic);

    // alert("start::" + this.program.startDate);
    // alert("end::" + this.program.endDate);
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

    var totalSpROINew = 0;
    var totalSpPFNew = 0;
    for (let i = 0; i < this.partnerDynamic.length; i++) {
      totalSpROINew = +this.partnerDynamic[i].totalRoiSP;
      totalSpPFNew = +this.partnerDynamic[i].totalPfValueSP;
    }
    if (this.isNullorUndefinedorEmpty(this.program.masterProgramId)) {
      this.set.setOption("Please select master program", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.programTypeId)) {
      this.set.setOption("Please select program type", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.programName)) {
      this.set.setOption("Please enter program name", false);
    } else if (this.isNullorUndefinedorEmpty(this.startDate)) {
      this.set.setOption("Please enter start date", false);
    } else if (this.isNullorUndefinedorEmpty(this.endDate)) {
      this.set.setOption("Please enter end date", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.totalLimit)) {
      this.set.setOption("Please enter total limit", false);
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
    } else if (this.isNullorUndefinedorEmpty(this.program.adjustMinPercentage)) {
      this.set.setOption("Please select Adjust Min Percentage", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.adjustMaxPercentage)) {
      this.set.setOption("Please select Adjust Max Percentage", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.notificationTypeId)) {
      this.set.setOption("Please select Notification Type", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.notificationFreqId)) {
      this.set.setOption("Please Enter Notification Frequncy", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.requiredMonthsBankStatement)) {
      this.set.setOption("Please Enter Bank Statements for these many months", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.gracePeriod)) {
      this.set.setOption("Please Enter Grace Period", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.orderInvoiceDisbursal)) {
      this.set.setOption("Please Enter Order Invoice Disbursal", false);
    } else if (this.program.orderInvoiceDisbursal == 1 && this.isNullorUndefinedorEmpty(this.program.orderInvoiceDisbursal)) {
      this.set.setOption("Please Enter Order Invoice Disbursal Limit", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.maxFreeCredit)) {
      this.set.setOption("Please Enter valid Maximum Free Credit", false);
      // }else if (this.isNullorUndefinedorEmpty(this.program.overDuePeriod)) {
      //   this.set.setOption("Please Enter Over Due Period", false);
    } 
    // else if (this.isNullorUndefinedorEmpty(this.program.staleDays)) {
    //   this.set.setOption("Please Enter valid staleDays", false);
    //   // }else if (this.isNullorUndefinedorEmpty(this.program.overDuePeriod)) {
    //   //   this.set.setOption("Please Enter Over Due Period", false);
    // }
    else if (this.program.loanToSoleProp == null) {
      this.set.setOption("Please Enter Loan To Sole Prop", false);
    } else if (this.program.coApplicantSoleProp == null || this.program.coApplicantSoleProp == undefined) {
      this.set.setOption("Please select Co-Applicant Sole Prop", false);
    } else if (this.isNullorUndefinedorEmpty(this.program.minimumValueofAcceptedInvoice)) {
      this.set.setOption("Please Enter Minimum Value Of Accepted Invoice", false);
    } else if (this.program.cashDiscountFlag == 1 && this.checkCashDiscount()) {
      this.set.setOption("Check Cash discount list", false);
    } else if (this.validateSMIList()) {
      this.set.setOption("Please Enter Valid SMI Details", false);
    } else if (this.program.programTypeId == 4 && this.program.copyRulesFrom == 0&&this.env!='Jana') {
      this.set.setOption("Please Enter program rule  to map", false);
    }else if (this.set.validateSpecialChar(this.program.programName)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.totalLimit)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.limitPerBorrower)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.minROI)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.maxROI)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.noOfInstallment)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.loanTenure)) {
      this.set.setOption("Special Characters Not Allowed",false);
    }else if (this.set.validateSpecialChar(this.program.requiredMonthsBankStatement)) {
      this.set.setOption("Special Characters Not Allowed",false);
    } else 
    // if (totalLenderROINew == totalSpROINew || this.program.cashDiscountFlag == 1) 
    {this.program.partner = this.partnerDynamic;
      this.program.lenders = this.programDynamic;
      this.program.beneficiary = this.beneficiaryDynamic;
      this.program.repayment = this.repaymentDynamic;
      this.program.programLimit = this.programLimitList;
      this.program.cashDiscount = this.cashDiscountList
     
        // this.program.startDate = this.model.year + "-" + this.model.month + "-" + this.model.day;
        // this.program.endDate = this.model2.year + "-" + this.model2.month + "-" + this.model2.day;
        this.submitted = true;
        // alert("Success");
        if(this.program.interestType=="Front End"){
          this.program.interestTypeId=2;
        }
        else if(this.program.interestType=="Rear End"){
          this.program.interestTypeId=1;
        }
        else if(this.program.interestType=="Monthly Rear End"){
          this.program.interestTypeId=3;
        }
        this.updateProgram();
      } 
    }
  

  gotoList() {
    window.localStorage.setItem("programkey", "updated");
    this.router.navigate(['/program/list']);
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
  deleteSMIRow(index) {
    if (this.smiList.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);
      return false;
    } else {
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
      paramName: '', typeId: '', value: '', functionId: '1001',id:'',lccId:'',userId:this.userId,activeInd:'1'};
    this.customConfigList.push(this.newDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  deleteCustomConfig(index,s) {
      var temp=[];
      if(s.id){
        s.activeInd='0';
        temp.push(s);
        this.apiService.saveCustomConfiguration(this.id,this.program.lenders[0].lenderId,temp)
        .subscribe(data => {});      
      }
      // const data={
      //   id:this.customConfigList[index].id,
      //   lccId:this.customConfigList[index].lccId,
      // };
      // this.deletedCustomConfig.push(data);
      this.customConfigList.splice(index, 1);
      return true;
    }
  
  addRow() {
    this.newDynamic = {
      lenderId: '', lenderSequence: this.programDynamic.length + 1,
      lenderPercentage: '', lenderLimit: '', lenderRoi: '', pfTypeId: '', lenderPfValue: '', riskSharingStatus: '',
      riskSharingPercentage: '', finAggRoi: '',
      finAggPfValue: '', totalRoi: '', totalPfValue: '', activeInd: 'Y', lenderTenure: ''
    };
    this.programDynamic.push(this.newDynamic);
    if (this.env == 'Jana') {
      console.log(" the lender is jaa")
      this.envlender = lender.jana;
      console.log("the  id of the lender jana is === " + lender.jana)
      console.log("The ID of the lender is====" + this.LenderList[0].id)

      this.programDynamic[this.programDynamic.length - 1].lenderId = this.envlender;
      this.programDynamic[this.programDynamic.length - 1].finAggRoi = "0";
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = "100";
      this.programDynamic[this.programDynamic.length-1].lenderRoi=this.program.minROI;
      this.programDynamic[this.programDynamic.length-1].finAggPfValue="0";
      this.programDynamic[this.programDynamic.length-1].lenderPercentage="100";
      this.programDynamic[this.programDynamic.length-1].pfTypeId=1;

      this.programDynamic[this.programDynamic.length-1].riskSharingStatus="NO";
      this.programDynamic[this.programDynamic.length-1].finAggPfValue="0";
      this.programDynamic[this.programDynamic.length-1].riskSharingPercentage="0";
      this.programDynamic[this.programDynamic.length-1].lenderPfValue="0";
      this.programDynamic[this.programDynamic.length-1].totalPfValue="0";

      this.programDynamic[this.programDynamic.length - 1].lenderLimit = this.program.totalLimit
      this.programDynamic[this.programDynamic.length - 1].lenderTenure = this.program.loanTenure
      for (this.m = 0; this.m < this.programDynamic.length; this.m++) {
        this.programDynamic[this.m].finAggRoi = "0";
        this.programDynamic[this.m].finAggPfValue = "0";

        this.programDynamic[this.programDynamic.length - 1].lenderPercentage = "100";
      }
      this.m = 0;
      this.lendersetup = true;

    }
    else if (this.env == 'Tvsc') {
      console.log(" the lender is TVS")
      this.envlender = lender.tvs;
      this.programDynamic[this.programDynamic.length - 1].lenderId = this.envlender;
      this.programDynamic[this.programDynamic.length - 1].finAggRoi = "0";
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = "100";
      this.programDynamic[this.programDynamic.length-1].lenderPercentage="100";
      this.programDynamic[this.programDynamic.length-1].pfTypeId=1;
      this.programDynamic[this.programDynamic.length-1].lenderRoi=this.program.minROI;
      this.programDynamic[this.programDynamic.length-1].riskSharingStatus="NO";
      this.programDynamic[this.programDynamic.length-1].finAggPfValue="0";
      this.programDynamic[this.programDynamic.length-1].riskSharingPercentage="0";
      this.programDynamic[this.programDynamic.length-1].lenderPfValue="0";
      this.programDynamic[this.programDynamic.length-1].totalPfValue="0";
      for (this.m = 0; this.m < this.programDynamic.length; this.m++) {
        this.programDynamic[this.m].finAggRoi = "0";
        this.programDynamic[this.m].finAggPfValue = "0";
        this.programDynamic[this.m].lenderPercentage = "100";
      }
      this.m = 0;
      this.lendersetup = true;
    }
    else if (this.env == 'Abfl') {
      console.log(" the lender is ABFL")
      this.envlender = lender.abfl;
      this.programDynamic[this.programDynamic.length - 1].lenderId = this.envlender;
      this.programDynamic[this.programDynamic.length - 1].finAggRoi = "0";
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = "0";
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = "100";
      this.programDynamic[this.programDynamic.length-1].lenderPercentage="100";
      this.programDynamic[this.programDynamic.length-1].pfTypeId=1;
      this.programDynamic[this.programDynamic.length-1].lenderRoi=this.program.minROI;
      this.programDynamic[this.programDynamic.length-1].riskSharingStatus="NO";
      this.programDynamic[this.programDynamic.length-1].finAggPfValue="0";
      this.programDynamic[this.programDynamic.length-1].riskSharingPercentage="0";
      this.programDynamic[this.programDynamic.length-1].lenderPfValue="0";
      this.programDynamic[this.programDynamic.length-1].totalPfValue="0";
      for (this.m = 0; this.m < this.programDynamic.length; this.m++) {
        this.programDynamic[this.m].finAggRoi = "0";
        this.programDynamic[this.m].finAggPfValue = "0";
        this.programDynamic[this.m].lenderPercentage = "100";
      }

      this.programDynamic[this.programDynamic.length - 1].lenderLimit = this.program.totalLimit
      this.programDynamic[this.programDynamic.length - 1].lenderTenure = this.program.loanTenure
      this.m = 0;
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
      // this.toastr.warning('Row deleted successfully', 'Delete row',{ positionClass: 'toast-top-right'  });  
      return true;
    }
  }
  // addrow condition

  // reypayment addrow condition
  reypaymentAddRow() {
    var curDate = moment().format('YYYY-MM-DD');
    this.newrepayment = {
      setupType: '', priority: 0, repaymentTypeId: 0, finaggPay: 0,
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
      return true;
    }
  }
  // reypayment addrow condition


  calculateLenderROI(index) {
    var lenderROI = this.programDynamic[index].lenderRoi;
    var finaggROI = this.programDynamic[index].finAggRoi;

    var totalLenderROI = +lenderROI + +finaggROI;

    this.programDynamic[index].totalRoi = totalLenderROI;



    // console.log("totalLenderROI "+totalLenderROI);

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
    this.apiService.getProgramLenderList().subscribe(res => this.LenderList = res.result);
    console.log("the environment is === "+this.env)
    if (this.env == 'Jana') {
      console.log("I am called");
      this.envlender = lender.jana
      this.lendersetup = true; }
    else if (this.env == 'Tvsc') {
      this.envlender = lender.tvs
      this.lendersetup = true;   }
    else if(this.env=='Abfl')
    { this.envlender = lender.abfl
      this.lendersetup=true;
    }
    else
    {console.log("I should not be called")
      this.envlender = lender.FINAGG }

   
    const dataone =
    {
      "programId": this.id
    }
    this.apiService.selectRoiTenureFlag(dataone).subscribe(data=>{
      if(data.status==200)
      {
        this.tenureFlaglist=data.result;
        if (this.tenureFlaglist[0].tenureflag == "2") {
          this.borrowerLoanTenureType = "2"
          this.tenurecheck = "2";
        }
        else {

          this.borrowerLoanTenureType = "1"
          this.tenurecheck = "1";
        }
        if (this.tenureFlaglist[0].roiflag == "1") {
          this.borrowerROIType = "1"
        }
        else {
          this.borrowerROIType = "2"
        }
      }
    })
    this.apiService.selectonlyTenureDetails(dataone).subscribe(data => {
      if (data.status == 200) {
        this.roiTenureList = data.result;


      }
    });

    this.apiService.selectonlyROIDetails(dataone).subscribe(data => {
      if (data.status == 200) {
        this.ROIList = data.result;

        console.log("the length is ===" + this.ROIList.length)

        console.log("the borrower ROI List length is==" + this.borrowerROIList.length)

        //   }
      }
    });
    
   

    this.apiService.getPartnerList().subscribe(res => this.PartnerList = res.result);
    this.apiService.getRepaymentList().subscribe(res => this.repaymentList = res.result);
    this.apiService.getBeneficiaryList().subscribe(res => this.beneficiaryList = res.result);
    this.apiService.getLoanTenureList().subscribe(res => this.loanTenureList = res.result);
    this.apiService.getProgramTypeList().subscribe(res => this.ProgramTypeList = res.result);
    this.apiService.getProgramModeList().subscribe(res => this.ProgramModeList = res.result);
    this.apiService.getCompanyTypeList().subscribe(res => {
      this.companyTypeList = res.result;
      // let userId=+localStorage.getItem('userId');
      //   var curDate =moment().format('YYYY-MM-DD');
      // for(let i=0;i<this.companyTypeList.length;i++){
      //   this.newProgramLimit = {
      //     companyTypeId:this.companyTypeList[i].id,minLimitAmount:0,maxLimitAmount:0,activeInd:1,
      //     createdBy: userId, createdOn: curDate,modifiedBy:userId,modifiedOn:curDate
      //   };
      //   this.programLimitDynamic.push(this.newProgramLimit);
      // }
    });
  
  }

  dateFetch(value) {
    var name;
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
        break;
      }
    }
    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);

  }

  sdateCheck(date) {
    var sDate = new Date(date);
    // alert(this.cDate+"<"+sDate);
    // alert("this.startDate <= sDate"+this.startDate +"<="+ sDate);
    // alert("sDate <= this.endDate"+sDate +"<="+ this.endDate);
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
 
  getBorrowerLoanTenureType() {
    console.log("the list should be empty");
    if (this.borrowerLoanTenureType == "1") {
      this.borrowerROIList = []
      this.borrowerTenureList = []
}
     else {

    
  }
}

  limitCheck(value) {
    this.showlimit=true;
    if (!(Number(this.limit) >= Number(value))) {
      this.set.setOption("The limit should be equal or less than master limit -" + this.limit, false);
      this.program.totalLimit = null;
    }
  }

  borrowerCheck(value) {
    this.showlimitb=true;
    if (!(Number(this.program.totalLimit )>= Number(value))) {
      this.set.setOption("The borrower limit should be less than total limit -" + this.program.totalLimit, false);
      this.program.limitPerBorrower = null;
    }
  }
  validateCompanyMaxLimit(i, value) {
    if (!(this.program.limitPerBorrower >= value)) {
      this.programLimitList[i].maxLimitAmount = '';
      this.set.setOption("The limit should be less than borrower limit - " + this.program.limitPerBorrower, false);
    }
    if ((!(value >= this.programLimitList[i].minLimitAmount)) && (this.programLimitList[i].minLimitAmount)) {
      this.programLimitList[i].maxLimitAmount = '';
      this.set.setOption("The max limit should be greater than min limit", false);
    }

  }

  validateCompanyMinLimit(i, value) {
    if (!(this.program.limitPerBorrower >= value)) {
      this.programLimitList[i].minLimitAmount = '';
      this.set.setOption("The limit should be less than borrower limit - " + this.program.limitPerBorrower, false);
    }
    if ((!(value < this.programLimitList[i].maxLimitAmount)) && (this.programLimitList[i].maxLimitAmount)) {
      this.programLimitList[i].minLimitAmount = '';
      this.set.setOption("The min limit should be less than max limit", false);
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
      modifiedOn: '',
      cdId: ''
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
  insertBorrowerTenureDetails() {
    if (this.roiTenureList.length > 0 && this.insertborrowerROIList.length > 0) {
      const data = {
        "tenurearray": this.insertborrowerTenureList,
        "roiarray": this.insertborrowerROIList,
        "programId": this.id,
        "userId": this.crypto.decryt(window.localStorage.getItem('userId')),
        "roiFlag": this.borrowerROIType,
        "tenureFlag": this.borrowerLoanTenureType



      }
      this.apiService.insertBorrowerTenureDetails(data).subscribe(data => {
        if (data.status == 200) {

        }
        else {
          this.set.setOption(data.exceptionMessage, false);
        }
      });
    }
    else {
      console.log("there is nothing to be inserted");
    }
  }
  insertBorrowerROIDetails() {
    if (this.roiTenureList.length > 0 && this.insertborrowerROIList.length > 0) {
      const data = {

        "roiarray": this.newROIList,
        "programId": this.id,
        "userId": this.crypto.decryt(window.localStorage.getItem('userId')),
        "roiFlag": this.borrowerROIType,
        "tenureFlag": this.borrowerLoanTenureType



      }
      this.apiService.insertBorrowerROIDetails(data).subscribe(data => {
        if (data.status == 200) {

        }
        else {
          //         this.set.setOption(data.exceptionMessage, false);
        }
      });
    }
    else {
      console.log("there is nothing to be inserted");
    }
  }
  flagupdate()
  {
    const dataone=
    {      "programId": this.id,
      "roiFlag": this.borrowerROIType,
      "tenureFlag": this.borrowerLoanTenureType
    }
    this.apiService.updateRoiTenureFlag(dataone).subscribe(dataone=>{
      if(dataone.status==200)
      {
        
      }
      else{
        this.set.setOption(dataone.exceptionMessage,false)
      }
    });
  }
  updateBorrowerTenureDetails() {
   
    if(this.borrowerLoanTenureType=="2"&&this.tenurecheck=="2")
    {
    const data = {
      "tenurearray": this.updateborrowerTenureList,
      "roiarray": this.borrowerROIList,
"programId":this.id,
      "userId": this.crypto.decryt(window.localStorage.getItem('userId')),
      "roiFlag": this.borrowerROIType,
      "tenureFlag": this.borrowerLoanTenureType




    }
    this.apiService.updateBorrowerTenureDetails(data).subscribe(data => {
      if (data.status == 200) {

      }
      else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  else{}
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
    // if(Number(this.lateFeeList[index].gstPercentage)>100){
    //   this.set.setOption("Gst Percentage Must be less than 100",false);
    //   this.lateFeeList[index].gstPercentage="";
    // }
  }
  checkUpto(i) {
    if (i != 0 && Number(this.lateFeeList[i - 1].upto) > Number(this.lateFeeList[i].upto)) {
      this.lateFeeList[i].checkUpto = true;
    } else {
      this.lateFeeList[i].checkUpto = false;
    }
  }
  checkPercentage(index) {
    console.log("this.lateFeeList[index].gstPercentage.length::" + this.lateFeeList[index].gstPercentage.length);
    console.log("this.lateFeeList[index].gstPercentage::" + this.lateFeeList[index].gstPercentage);
    if (this.lateFeeList[index].gstPercentage.length == 3) {
      if (Number(this.lateFeeList[index].gstPercentage) > 100) {
        this.lateFeeList[index].checkPercentage = false;
      } else {
        this.lateFeeList[index].checkPercentage = true;
      }
    }
  }
  trasher(i) {
    if (this.borrowerROIList.length>1) {
      this.borrowerROIList[i].activeInd='0';
      this.deletedBorrowerRoiList.push(this.borrowerROIList[i]);
      this.borrowerROIList.splice(i, 1);
    } else {
      this.set.setOption('Cannot delete the first ROI for a tenure alone. Kindly delete the corresponding tenure', false);
    }
  }
  trashes(i, ptId) {

    if (ptId.includes('a')) {

    }
    else {
      this.apiService.deleteTenureentry(ptId).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Tenure Deleted Successfully", true)

        } else {
          this.set.setOption("Failed to delete Tenure", false)
        }

      });

    }
    this.roiTenureList.splice(i, 1)
    for (this.m = 0; this.m < this.borrowerROIList.length; this.m++) {
      if (this.borrowerROIList[this.m].ptId == ptId || this.borrowerROIList[this.m].ptId.includes(String("a" + ptId))) {
        this.borrowerROIList.splice(this.m, 1);
      }
    }
  }





  transfer() {
    this.flagupdate();
    if(this.borrowerLoanTenureType=="2")
    {
    for (this.m = 0; this.m < this.borrowerROIList.length; this.m++) {
      if (this.borrowerROIList[this.m].prId.includes('a')) {
        this.insertborrowerROIList.push(this.borrowerROIList[this.m]);
      }
      else {
        this.updateborrowerROIList.push(this.borrowerROIList[this.m]);
      }
    }
    for (this.m = 0; this.m < this.roiTenureList.length; this.m++) {
      if (this.roiTenureList[this.m].ptId.includes('a')) {
        console.log("i should be called");
        this.insertborrowerTenureList.push(this.roiTenureList[this.m]);
      }
      else {
        console.log("but i am called");
        this.updateborrowerTenureList.push(this.roiTenureList[this.m]);
      }
    }
    for (this.m = 0; this.m < this.borrowerROIList.length; this.m++) {
      if (this.borrowerROIList[this.m].ptId.includes('a')) {
        if (this.borrowerROIList[this.m].uqId == "b") {
          this.borrowerROIList[this.m].ptId = Number(this.borrowerROIList[this.m].ptId.replace("a", ""));
          this.newROIList.push(this.borrowerROIList[this.m])
        }
      }
    }

    this.insertBorrowerROIDetails();
  }
  else{

  }
  }

  validateUpto(index) {
    for (let i = 0; i < index; i++) {
      if (Number(this.lateFeeList[i].upto) > Number(this.lateFeeList[index].upto)) {
        // this.set.setOption(this.lateFeeList[index].upto+" must be greater than "+this.lateFeeList[i].upto,false);
        this.lateFeeList[index].upto = "";
        break;
      }
    }
  }
  getBorrowerRoiType() {
    if (this.borrowerRoiType == "1") {

    } else {
this.fixed(this.partnerDynamic[0].spTenure)
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
  rangecheck(data) {this.roichecker(data);
    if (Number(data) > Number(this.program.maxROI)) {
        this.set.setOption('The ROI entered should be between the min and max roi ', false);
      } else if (Number(data) < Number(this.program.minROI)) {
        this.set.setOption('The ROI entered should be between the min and max roi ', false);
      }
    }


  fixed(data) {
    if (this.borrowerLoanTenureType == "1") {
      this.newTenuredata = { ptId: 'a', tenure: '' }

      this.roiTenureList = [];
      this.roiTenureList.push(this.newTenuredata);
      this.roiTenureList[0].tenure = data;
      this.newROIData = { prId: 'a', ptId: '', tenure: '', brandVintageto: '', brandVintageFrom: '', bureauScoreFrom: '', bureauScoreTo: '', liquidCollateral: '', roi: '', uqId: 'a' }

      this.borrowerROIList.push(this.newROIData);
      this.borrowerROIList[0].tenure = data;
    }
  }

rangechecking(data)
{this.roichecker(data)
  this.borrowRoi=data;
  if(Number(data)>Number(this.program.maxROI))
    {
      this.set.setOption("The ROI entered should be between the min and max roi ",false);
    }
    else if (Number(data) <Number(this.program.minROI)) {
      this.set.setOption("The ROI entered should be between the min and max roi ", false);
    }
  
}
rangechecker(data,datatwo,datathree,data4)
{ this.roichecker(data)
  
 if(datatwo=="1"||datatwo=="2")
      {
      if (Number(data) < Number(this.program.minROI) || Number(data) > Number(this.program.maxROI)) {
        this.set.setOption("The ROI entered should be between the min and max roi ", false);
      }
    }
}



  rangechecks(data) {
    this.roichecker(data);
    this.lendroi = data
    if (Number(data )< Number(this.program.minROI)) {
      this.set.setOption("The lender ROI should be between the min and max ROI", false);
    }
    else if (Number(data) > Number(this.program.maxROI)) {
      this.set.setOption("The lender ROI should be between the min and  max ROI", false);

    
  }
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


roichecker(data)
{console.log("the roi decimal check is called");
  if(String(data).includes("."))
  {
    this.posi = String(data).indexOf(".")
    console.log("the position of the decimal point is ==="+this.posi)

    if((String(data).length-Number(this.posi))>3)


    {console.log("the difference is ==="+(String(data).length-Number(this.posi)))
     this.set.setOption("The ROI can only have a maximum of 2 decimal points",false);
    }
  }
}
indianCurrency(number: any) {
  return this.currency.indianCurrency(number);
}

checkValidation(){
  this.program.stampPaperFlag='0';
}

checkeStampDutyProcurement(){
  this.program.eStampDutyProcurementFlag = '0';
}
}
