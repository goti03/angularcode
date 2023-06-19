import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Program } from '../programModel';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '..//..//core/api.service';
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
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
  selector: 'app-program-copy',
  templateUrl: './program-copy.component.html',
  styleUrls: ['./program-copy.component.css']
})
export class ProgramCopyComponent implements OnInit {
overdue: any;
  get today() {
    return new Date();
  }
  constructor(private route: ActivatedRoute, private router: Router,
    private changeDetec: ChangeDetectorRef, private apiService: ApiService, private set: breadcrumbMessage, private crypto: Crypto, private modalService: NgbModal, public currency: Currency) { }
  id: number;
  program: Program;
  submitted = false;
  tenurecheck: any;
  idCheck: number;
  // paymentModeone: any[];
  processingFeeList: Array<any> = [];
  model: NgbDateStruct;
  smidatalist: Array<any> = [];
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
  newbeneficiary: any = {};
  beneficiaryList: any;
  beneficiaryDynamic: Array<any> = [];
  companyTypeList: Array<any> = [];
  programLimitList: Array<any> = [];
  Borrower: Array<any> = [];
  newrepayment: any = {};
  lendroi: any;
  borrowRoi: any;
  checkflag: any;
  repaymentList: any;
  ProgramModeList: any;
  repaymentDynamic: Array<any> = [];
  programDynamic: Array<any> = [];
  newDynamic: any = {};
  paymentModeList: Array<any> = [];
  partnerDynamic: Array<any> = [];
  newPartner: any = {};
  masterProgramList: Array<any> = [];
  showlimit = true;
  showlimitb = true;
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
  posi: any;
  masterList = [];
  startDate: any;
  endDate: any;
  sd: boolean;
  ed: boolean;
  sdate: any;
  edate: any;
  env: any;
  envlender: any;
  lendersetup = false;
  cDate = new Date(999 - 12 - 31);
  dsDate: any;
  deDate: any;
  limit: any;
  discountFlagList = [{ id: 1, name: 'Yes' }, { id: 0, name: 'No' }];
  discountTypeList = [{ id: 1, name: 'Flat Percentage' }, { id: 2, name: 'Per Day' }];
  notificationTypeList = [{ id: 1, name: 'Consolidated' }, { id: 2, name: 'Line' }];
  notificationFrequncyList = [{ id: 1, name: 'Daily' }, { id: 2, name: 'Once a week' }];
  cashDiscountList = [];
  tenureFlaglist = [];
  cashDiscountList1 = [];
  lateFeeList = [];
  userId: any;
  i: any;
  customConfigList: Array<any> = [];
  deletedCustomConfig: any;
  dataType = [{ id: '1', name: 'String' }, { id: '2', name: 'Int' }, { id: '3', name: 'Float' }, { id: '4', name: 'Long' },
   { id: '5', name: 'Decimal' }, { id: '6', name: 'Boolean' }, { id: '7', name: 'Long' }];
  fldgPercentageShow = false;
    preventTyping() {
      return false;
    }
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\+\.\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getFldgValue() {
    if (this.program.fldg == 1) {
      this.fldgPercentageShow = true;
    } else {
      this.fldgPercentageShow = false;
      this.program.fldgPercentage = 0;
    }
  }
  ngOnInit(): void {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.id = this.route.snapshot.params['id'];
    this.env = lenderconfiguration.env;
    this.reloadData();
    this.program = new Program();
    this.roicheck = 0;
    this.checkflag = 0;
    this.lendroi = 0;
    if(this.env!='Abfl') {
      this.program.breRule=1;
      this.program.staleDays='0';
    }
    this.borrowRoi = 0;
    this.program.copyRulesFrom = 0;
    this.apiService.getSMIDetails(this.id).subscribe(res => this.smiList = res.result);
    for(let c of this.smiList){
      delete c.processId;
            }
    this.apiService.getLateFeeDetails(this.id).subscribe(res => this.lateFeeList = res.result);
    for(let c of this.lateFeeList){
delete c.lfId;
      }
    this.apiService.getProgramSetup(this.id)
    .subscribe(data => {
      if (data.status == 200) {
        this.program = data.result;
        this.program.programName='';
        this.smichecker();
        this.programrule();
          this.active = this.program.activeInd;
          this.cashDiscountList = data.result.cashDiscount;
          this.cashDiscountList1 = this.cashDiscountList;
          this.borrowerROIType = this.program.borrowerRoiType;
          this.program.programName='';
          this.borrowerLoanTenureType = this.program.borrowerLoanTenureType;
          const list = [];
          for (const a of this.cashDiscountList) {
            if (a.activeInd == '1') {
              list.push(a);
            }
          }
          this.cashDiscountList = list;
          this.dateFetch(this.program.masterProgramId, 1);
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
        }
        this.model = {
          'year': Number(this.program.startDate.split('-')[0]),
          'month': Number(this.program.startDate.split('-')[1]),
          'day': Number(this.program.startDate.split('-')[2])
        };
        this.model2 = {
          'year': Number(this.program.endDate.split('-')[0]),
          'month': Number(this.program.endDate.split('-')[1]),
          'day': Number(this.program.endDate.split('-')[2])
        };

        this.conditionsCheck();
      }, error => console.log(error));

      this.apiService.getProgramSetup(this.id)
      .subscribe(data => {
        if (data.status == 200) {
          this.program = data.result;
          this.program.programName='';

          this.borrowerLoanTenureType=this.program.borrowerLoanTenureType;
          this.borrowerROIType=this.program.borrowerRoiType;
          this.processingFeeList = this.program.programConfig;
          this.getFldgValue();
          this.dateFetch(this.program.masterProgramId, 1);
          if(this.env=="FIN") {
            this.program.masterProgramId=0;
            this.program.partner[0].borrowerPfValue="";
            this.program.partner[0].borrowerRoi="";
            this.program.partner[0].pfTypeId="";
            this.program.partner[0].pspId="";
            this.program.partner[0].spId="";
            this.program.partner[0].spPfValue="";
            this.program.partner[0].spRoi="";
            this.program.partner[0].spTenure="";
            this.program.partner[0].totalPfValueSP="";
            this.program.partner[0].totalRoiSP="";
          }
          // this.programsetup();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
        this.conditionsCheck();
        this.hello();
      }, error => console.log(error));
    this.submitted = false;
  }

  hello() {
    if (this.program.interestType == 'Front End' || this.program.interestType == 'Rear End') {
      this.program.interestRunType = 1;
    } else {
      this.program.interestRunType = 2;
    }
  }
  smichecker( ) {let p;
    if (this.smiList.length != 0) {
      for (p = 0; p < this.smiList.length; p++) {
        if (this.smiList[p].roiType == '1') {this.checkflag = 1;
        this.smidatalist.push(this.smiList[p].typeId);
        }
      }
      if (this.checkflag == 1) {
        this.SMIAddLenderRow();
      } else {
        this.smiaddrowstart();
      }
    } else {
      this.smiaddrowstart();
    }
  }
  SMIAddLenderRow() {if (!(this.smidatalist.includes('1'))) {
  this.newDynamic = {
    processId: '', typeId: '1', roiType: '1', roi: ''
  };
  this.smiList.push(this.newDynamic);
}if (!(this.smidatalist.includes('2'))) {
  this.newDynamic = {
    processId: '', typeId: '2', roiType: '1', roi: ''
  };
  this.smiList.push(this.newDynamic);
}if (!(this.smidatalist.includes('3'))) {

  this.newDynamic = {
    processId: '', typeId: '3', roiType: '1', roi: ''
  };
  this.smiList.push(this.newDynamic);
}if (!(this.smidatalist.includes('4'))) {
  this.newDynamic = {
    processId: '', typeId: '4', roiType: '1', roi: ''
  };
  this.smiList.push(this.newDynamic);
}
}
smiaddrowstart() {
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
showlimits() {
  this.showlimit = false;
}
showlimitborrower() {
  this.showlimitb = false;
}
conditionsCheck() {
  const programLimitData = [];
  const partnerData = [];
  const beneficiaryData = [];
  const lendersData = [];
  const repaymentData = [];

    if (this.program.partner.length > 0) {
      this.program.partner.forEach(function (partner) {
        partnerData.push(partner);
      });
    }
    if (this.program.lenders.length > 0) {
      this.program.lenders.forEach(function (lenders) {
        lendersData.push(lenders);
      });
    }
    if (this.program.beneficiary.length > 0) {
      this.program.beneficiary.forEach(function (beneficiary) {
        beneficiaryData.push(beneficiary);
      });
    }
    if (this.program.programLimit.length > 0) {
      this.program.programLimit.forEach(function (programLimit) {
        programLimitData.push(programLimit);
      });
    }
    if (this.program.repayment.length > 0) {
      this.program.repayment.forEach(function (repayment) {
        repaymentData.push(repayment);
      });
    }
    this.programLimitList = programLimitData;
    this.repaymentDynamic = repaymentData;
    this.beneficiaryDynamic = beneficiaryData;

    this.partnerDynamic = partnerData;
    if (this.borrowerROIType == '2' && this.borrowerLoanTenureType == '1') {
      if (this.dataList.length < 1) {
        this.fixed(this.partnerDynamic[0].spTenure);
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
    this.newTenuredata = { ptId: '', tenure: '' };
    this.roiTenureList.push(this.newTenuredata);
    this.borrowerROIAddrow();

  }



  borrowerROIAddrow() {
    this.newROIData = { tenure: '', brandVintageto: '', brandVintageFrom: '', bureauScoreFrom: '', bureauScoreTo: '', liquidCollateral: '', roi: '', activeInd:'1' };
    this.borrowerROIList.push(this.newROIData);
  }

  updateProgram() {
    this.program.activeInd = this.active;
    const curdate = moment().format('YYYY-MM-DD HH:mm:ss');
    const newDate2 = new Date(curdate);
    this.program.createdOn = newDate2;
    this.program.createdBy = Number(this.userId);

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
          this.apiService.saveCustomConfiguration(this.id, this.programDynamic[0].lenderId, this.customConfigList)
          .subscribe(data => {});
          this.apiService.updateSMIDetails(this.smiList, this.id).subscribe(data => {
            if (data.status == 200) {
              this.apiService.updateLateFeeDetails(this.lateFeeList, this.id).subscribe(data => {
                if (data.status == 200) {
                } else {
                  this.set.setOption('Late fee details Not configured', true);
                }
                this.set.setOption('Program Updated Successfuly', true);
                this.gotoList();
              });
            } else {
              this.set.setOption('SMI details Update Failed', false);
            }
          });
        } else {
          this.set.setOption('Failed to Update Program', false);
        }
      }, error => console.log(error));
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == null || str == undefined);
  }
  checkCashDiscount() {
    let discountCount = 0;
    for (const a of this.cashDiscountList) {
      discountCount++;
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
    let count = 0;
    if (this.smiList) {
      for (const s of this.smiList) {
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
      return true;
    }
  }

  // programsetup() {
  //   this.processingFeeList.forEach((pf) => {
  //     this.paymentModeone.forEach((pm) => {
  //       if (pf.prpmId == pm.id) {
  //         pm.paymentModeoneflag = true;
  //       }
  //       if (pf.prpmId == pm.id && pf.isDefault == 1) {
  //         pm.defaultpaymentflag = true;
  //       }
  //     });
  //   });
  // }
  dynamicBorrowerType() {
    let returnValue=false;
    if(this.borrowerLoanTenureType=='2'||this.borrowerROIType=='2') {
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
      for(const t of this.updateborrowerTenureList) {
          if(this.isNullorUndefinedorEmpty(t.tenure)) {
            returnValue = true;
            return ;
          }
      }
    }
    return returnValue;
  }


  gotoList() {
    window.localStorage.setItem('programkey', 'updated');
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
      this.set.setOption('Can\'t delete the row when there is only one row', false);
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
      this.set.setOption('Can\'t delete the row when there is only one row', false);
      return false;
    } else {
      this.lateFeeList.splice(index, 1);
      return true;
    }
  }
  customAddRow() {
    this.newDynamic = {
      paramName: '', typeId: '', value: '', functionId: '1001', id: '', lccId: '', userId: this.userId};
    this.customConfigList.push(this.newDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  deleteCustomConfig(index) {
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
      this.envlender = lender.jana;
      this.programDynamic[this.programDynamic.length - 1].lenderId = this.envlender;
      this.programDynamic[this.programDynamic.length - 1].finAggRoi = '0';
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = '0';
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = '100';
      this.programDynamic[this.programDynamic.length - 1].lenderRoi = this.program.minROI;
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = '0';
      this.programDynamic[this.programDynamic.length - 1].lenderPercentage = '100';
      this.programDynamic[this.programDynamic.length - 1].pfTypeId = 1;
      this.programDynamic[this.programDynamic.length - 1].riskSharingStatus = 'NO';
      this.programDynamic[this.programDynamic.length - 1].finAggPfValue = '0';
      this.programDynamic[this.programDynamic.length - 1].riskSharingPercentage = '0';
      this.programDynamic[this.programDynamic.length - 1].lenderPfValue = '0';
      this.programDynamic[this.programDynamic.length - 1].totalPfValue = '0';
      this.programDynamic[this.programDynamic.length - 1].lenderLimit = this.program.totalLimit;
      this.programDynamic[this.programDynamic.length - 1].lenderTenure = this.program.loanTenure;
      for (this.m = 0; this.m < this.programDynamic.length; this.m++) {
        this.programDynamic[this.m].finAggRoi = '0';
        this.programDynamic[this.m].finAggPfValue = '0';
        this.programDynamic[this.programDynamic.length - 1].lenderPercentage = '100';
      }
      this.m = 0;
      this.lendersetup = true;
    } 
    // else if (this.env == 'Tvsc') {
    //   this.envlender = lender.tvs;
    //   this.programDynamic[this.programDynamic.length - 1].lenderId = this.envlender;
    //   this.programDynamic[this.programDynamic.length - 1].finAggRoi = '0';
    //   this.programDynamic[this.programDynamic.length - 1].finAggPfValue = '0';
    //   this.programDynamic[this.programDynamic.length - 1].lenderPercentage = '100';
    //   this.programDynamic[this.programDynamic.length - 1].lenderPercentage = '100';
    //   this.programDynamic[this.programDynamic.length - 1].pfTypeId = 1;
    //   this.programDynamic[this.programDynamic.length - 1].lenderRoi = this.program.minROI;
    //   this.programDynamic[this.programDynamic.length - 1].riskSharingStatus = 'NO';
    //   this.programDynamic[this.programDynamic.length - 1].finAggPfValue = '0';
    //   this.programDynamic[this.programDynamic.length - 1].riskSharingPercentage = '0';
    //   this.programDynamic[this.programDynamic.length - 1].lenderPfValue = '0';
    //   this.programDynamic[this.programDynamic.length - 1].totalPfValue = '0';
    //   for (this.m = 0; this.m < this.programDynamic.length; this.m++) {
    //     this.programDynamic[this.m].finAggRoi = '0';
    //     this.programDynamic[this.m].finAggPfValue = '0';
    //     this.programDynamic[this.m].lenderPercentage = '100';
    //   }
    //   this.m = 0;
    //   this.lendersetup = true;
    // // } else if (this.env == 'Abfl') {
    // //   this.envlender = lender.abfl;
    // //   this.programDynamic[this.programDynamic.length - 1].lenderId = this.envlender;
    // //   this.programDynamic[this.programDynamic.length - 1].finAggRoi = '0';
    // //   this.programDynamic[this.programDynamic.length - 1].finAggPfValue = '0';
    // //   this.programDynamic[this.programDynamic.length - 1].lenderPercentage = '100';
    // //   this.programDynamic[this.programDynamic.length - 1].lenderPercentage = '100';
    // //   this.programDynamic[this.programDynamic.length - 1].pfTypeId = 1;
    // //   this.programDynamic[this.programDynamic.length - 1].lenderRoi = this.program.minROI;
    // //   this.programDynamic[this.programDynamic.length - 1].riskSharingStatus = 'NO';
    // //   this.programDynamic[this.programDynamic.length - 1].finAggPfValue = '0';
    // //   this.programDynamic[this.programDynamic.length - 1].riskSharingPercentage = '0';
    // //   this.programDynamic[this.programDynamic.length - 1].lenderPfValue = '0';
    // //   this.programDynamic[this.programDynamic.length - 1].totalPfValue = '0';
    // //   for (this.m = 0; this.m < this.programDynamic.length; this.m++) {
    // //     this.programDynamic[this.m].finAggRoi = '0';
    // //     this.programDynamic[this.m].finAggPfValue = '0';
    // //     this.programDynamic[this.m].lenderPercentage = '100';
    // //   }
    // //   this.programDynamic[this.programDynamic.length - 1].lenderLimit = this.program.totalLimit;
    // //   this.programDynamic[this.programDynamic.length - 1].lenderTenure = this.program.loanTenure;
    // //   this.m = 0;
    // //   this.lendersetup = true;
    // } 
    else {
      this.lendersetup = false;
    }
    this.changeDetec.detectChanges();
    return true;
  }
  deleteRow(index) {
    if (this.programDynamic.length == 1) {
      this.set.setOption('Can\'t delete the row when there is only one row', false);
      return false;
    } else {
      this.programDynamic.splice(index, 1);
      return true;
    }
  }
  // addrow condition

  // reypayment addrow condition
  reypaymentAddRow() {
    const curDate = moment().format('YYYY-MM-DD');
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
      this.set.setOption('Can\'t delete the row when there is only one row', false);
      return false;
    } else {
      this.repaymentDynamic.splice(index, 1);
      return true;
    }
  }
  // reypayment addrow condition


  calculateLenderROI(index) {
    const lenderROI = this.programDynamic[index].lenderRoi;
    const finaggROI = this.programDynamic[index].finAggRoi;
    const totalLenderROI = +lenderROI + +finaggROI;
    this.programDynamic[index].totalRoi = totalLenderROI;
  }

  calculateLenderPF(index) {
    const lenderPF = this.programDynamic[index].lenderPfValue;
    const finaggPF = this.programDynamic[index].finAggPfValue;
    const totalLenderPF = +lenderPF + +finaggPF;
    this.programDynamic[index].totalPfValue = totalLenderPF;
  }

  calculateSpRoi(index) {
    const sourcingRoi = this.partnerDynamic[index].spRoi;
    const borrowerSourcingRoi = this.partnerDynamic[index].borrowerRoi;
    const totalSpRoi = +sourcingRoi + +borrowerSourcingRoi;
    this.partnerDynamic[index].totalRoiSP = totalSpRoi;
  }

  calculateSpPf(index) {
    const spPF = this.partnerDynamic[index].spPfValue;
    const borrowerPF = this.partnerDynamic[index].borrowerPfValue;
    const totalSpPF = +spPF + +borrowerPF;
    this.partnerDynamic[index].totalPfValueSP = totalSpPF;
  }

  reloadData() {
    // this.apiService.getPaymentModeList().subscribe(res => {
    //   this.paymentModeone = res.result;
    // });
    this.apiService.getSmiProcessList().subscribe(res => { this.smiProcessList = res.result; });
    this.apiService.getSmiTypeList().subscribe(res => this.smiTypeList = res.result);
    this.apiService.getMasterList().subscribe(res => this.masterList = res.result);
    this.apiService.getMasterProgramList().subscribe(res => this.masterProgramList = res.result);
    this.apiService.getProgramLenderList().subscribe(res => this.LenderList = res.result);
    if (this.env == 'Jana') {
      this.envlender = lender.jana;
      this.lendersetup = true;
    } 
    // else if (this.env == 'Tvsc') {
    //   this.envlender = lender.tvs;
    //   this.lendersetup = true;
    // // } else if (this.env == 'Abfl') {
    // //   this.envlender = lender.abfl;
    // //   this.lendersetup = true;
    // } 
    else {
      this.envlender = lender.FINAGG;
    }
    this.apiService.getCustomConfiguration(this.id, this.envlender).subscribe(res => {
      if (res.status == 200) {
        this.customConfigList = res.result;
        for (const c of this.customConfigList) {
          c.userId = this.userId;
        }
      }
    });
    const dataone = {
      'programId': this.id
    };

    this.apiService.selectBorrowerTenureDetails(dataone).subscribe(data => {
      if (data.status == 200) {
        this.borrowerROIList = data.result;
        for(const c of this.borrowerROIList) {c.roi =Number(c.roi).toFixed(2);
        }
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
    });

  }

  dateFetch(value, flag) {
    let name;
    for (let b = 0; b < this.masterProgramList.length; b++) {
      if (value == this.masterProgramList[b].id) {
        name = this.masterProgramList[b].name;
        break;
      }
    }
    for (let a = 0; a < this.masterList.length; a++) {
      if (name == this.masterList[a].masterName) {
        this.startDate = this.masterList[a].startDate;
        this.dsDate = this.startDate;
        this.endDate = this.masterList[a].endDate;
        this.deDate = this.endDate;
        this.limit = this.masterList[a].totalLimit;
        this.program.startDate = (flag == 0) ? this.startDate : this.program.startDate;
        this.program.endDate = (flag == 0) ? this.endDate : this.program.endDate;
        this.program.totalLimit = (flag == 0) ?this.limit:this.program.totalLimit;
        this.program.limitPerBorrower = (flag == 0) ?this.limit:this.program.limitPerBorrower;
        this.borrowerCheck(this.program.limitPerBorrower);
        break;
      }
    }
    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);

  }

  sdateCheck(date) {
    const sDate = new Date(date);
    if (this.cDate < sDate) {
      if ((this.startDate <= sDate) && (sDate <= this.endDate)) {
        this.sd = true;
        this.sdate = sDate;
        this.dateCheck();
      } else {
        this.program.startDate = '';
        this.set.setOption('The date should be within Master Limit Range ' + this.dsDate + ' and ' + this.deDate, false);
      }
    }
  }

  edateCheck(date) {
    const eDate = new Date(date);
    if (this.cDate < eDate) {
      if ((this.startDate <= eDate) && (eDate <= this.endDate)) {
        this.ed = true;
        this.edate = eDate;
        this.dateCheck();
      } else {
        this.program.endDate = '';
        this.set.setOption('The date should be within Master Limit Range ' + this.dsDate + ' and ' + this.deDate, false);
      }
    }
  }

  dateCheck() {
    if (this.sd && this.ed) {
      if (!(this.edate > this.sdate)) {
        this.program.startDate = '';
        this.program.endDate = '';
        this.set.setOption('End date should be ahead of start date', false);
      }
      this.sd = false;
      this.ed = false;
      return;
    }
  }

  getBorrowerLoanTenureType() {
    if (this.borrowerROIType == '1' && this.borrowerLoanTenureType == '1') {
      this.borrowerROIList = [];
      this.borrowerTenureList = [];
    } else {
      // const dataone = {
      //   'programId': this.id
      // };
      // this.apiService.selectBorrowerTenureDetails(dataone).subscribe(data => {
      //   if (data.status == 200) {
      //     this.borrowerROIList = data.result;
      //   }
      // });
  }
}

  limitCheck(value) {
    this.showlimit = true;
    if (!(Number(this.limit) >= Number(value))) {
      this.set.setOption('The limit should be equal or less than master limit -' + this.limit, false);
      this.program.totalLimit = null;
    }
  }

  borrowerCheck(value) {
    this.showlimitb = true;
    if (!(Number(this.program.totalLimit ) >= Number(value))) {
      this.set.setOption('The borrower limit should be less than total limit -' + this.program.totalLimit, false);
      this.program.limitPerBorrower = null;
    }
  }
  validateCompanyMaxLimit(i, value) {
    if (!(this.program.limitPerBorrower >= value)) {
      this.programLimitList[i].maxLimitAmount = '';
      this.set.setOption('The limit should be less than borrower limit - ' + this.program.limitPerBorrower, false);
    }
    if ((!(value >= this.programLimitList[i].minLimitAmount)) && (this.programLimitList[i].minLimitAmount)) {
      this.programLimitList[i].maxLimitAmount = '';
      this.set.setOption('The max limit should be greater than min limit', false);
    }

  }

  validateCompanyMinLimit(i, value) {
    if (!(this.program.limitPerBorrower >= value)) {
      this.programLimitList[i].minLimitAmount = '';
      this.set.setOption('The limit should be less than borrower limit - ' + this.program.limitPerBorrower, false);
    }
    if ((!(value < this.programLimitList[i].maxLimitAmount)) && (this.programLimitList[i].maxLimitAmount)) {
      this.programLimitList[i].minLimitAmount = '';
      this.set.setOption('The min limit should be less than max limit', false);
    }
  }

  addCashDiscount() {
    let tday;
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
    };
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
          this.cashDiscountList[i].toDay = '';
        } else {
          this.cashDiscountList[i].fromDay = '';
        }
        this.set.setOption('Today must be great than FromDay', false);
        return false;
      } else {
        return;
      }
    }
  }
  checkUpto(i) {
    if (i != 0 && Number(this.lateFeeList[i - 1].upto) > Number(this.lateFeeList[i].upto)) {
      this.lateFeeList[i].checkUpto = true;
    } else {
      this.lateFeeList[i].checkUpto = false;
    }
  }
  checkPercentage(index) {
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

  validateUpto(index) {
    for (let i = 0; i < index; i++) {
      if (Number(this.lateFeeList[i].upto) > Number(this.lateFeeList[index].upto)) {
        this.lateFeeList[index].upto = '';
        break;
      }
    }
  }
  getBorrowerRoiType() {
    if (this.borrowerROIType == '1' && this.borrowerLoanTenureType == '1') {
      this.borrowerROIList = [];
      this.borrowerTenureList = [];
    } else {
      // this.fixed(this.partnerDynamic[0].spTenure);
    }
  }
  checklimits(num) {
    if (Number(num) > 100) {
      this.set.setOption('Liquid Collateral %age value should not be greater than 100', false);
    }
  }
  checklimit(num) {
    if (Number(num) > 100) {
      this.set.setOption('ROI value should not be greater than 100', false);
    }
  }
  rangecheck(data,i) {this.roichecker(data);
    this.borrowerROIList[i].roi=Number(data).toFixed(2);
  if (Number(data) > Number(this.program.maxROI)) {
      this.set.setOption('The ROI entered should be between the min and max roi ', false);
    } else if (Number(data) < Number(this.program.minROI)) {
      this.set.setOption('The ROI entered should be between the min and max roi ', false);
    }
  }

  fixed(data) {
    if (this.borrowerLoanTenureType == '1') {
      // this.newTenuredata = { ptId: 'a', tenure: '' };
      // this.roiTenureList = [];
      // this.roiTenureList.push(this.newTenuredata);
      // this.roiTenureList[0].tenure = data;
      // this.newROIData = { prId: 'a', ptId: '', tenure: '', brandVintageto: '', brandVintageFrom: '', bureauScoreFrom: '', bureauScoreTo: '', liquidCollateral: '', roi: '', uqId: 'a' };
      // this.borrowerROIList.push(this.newROIData);
      // this.borrowerROIList[0].tenure = data;
    }
  }

rangechecking(data) {this.roichecker(data);
  this.borrowRoi = data;
  if (Number(data) > Number(this.program.maxROI)) {
      this.set.setOption('The ROI entered should be between the min and max roi ', false);
    } else if (Number(data) < Number(this.program.minROI)) {
      this.set.setOption('The ROI entered should be between the min and max roi ', false);
    }
}
rangechecker(data, datatwo, datathree, data4) { this.roichecker(data);

 if (datatwo == '1' || datatwo == '2') {
      if (Number(data) < Number(this.program.minROI) || Number(data) > Number(this.program.maxROI)) {
        this.set.setOption('The ROI entered should be between the min and max roi ', false);
      }
    }
}

  rangechecks(data) {
    this.roichecker(data);
    this.lendroi = data;
    if (Number(data ) < Number(this.program.minROI)) {
      this.set.setOption('The lender ROI should be between the min and max ROI', false);
    } else if (Number(data) > Number(this.program.maxROI)) {
      this.set.setOption('The lender ROI should be between the min and  max ROI', false);
  }
  }
  programrule() {
    this.apiService.getfilteredProgramList(this.program.programTypeId)
      .subscribe(data => {
        if (data.status == 200) {
          this.programfilter = data.result;
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
  }


roichecker(data) {
  if (String(data).includes('.')) {
    this.posi = String(data).indexOf('.');
    if ((String(data).length - Number(this.posi)) > 3) {
     this.set.setOption('The ROI can only have a maximum of 2 decimal points', false);
    }
  }
}
indianCurrency(number: any) {
  return this.currency.indianCurrency(number);
}

defaultcheck(s, i) {
  s.defaultpaymentflag = (s.paymentModeoneflag == false && s.defaultpaymentflag == true) ? false : s.defaultpaymentflag;
}

// paymodecheck(s, i) {
//   s.paymentModeoneflag = (s.defaultpaymentflag == true) ? true : s.paymentModeoneflag;
//   this.paymentModeone.forEach((pm) => {pm.defaultpaymentflag = (pm.id == s.id) ? s.paymentModeoneflag : false; });
// }
reject(){
  this.modalService.dismissAll();
}

  stalecheck(data) {
    if(Number(data)>100||Number(data)<30) {
      this.program.staleDays='0';
      this.set.setOption('Stale days should be between 30 and 100',false);
    }
    }
    onSubmit() {
      this.modalService.dismissAll()
      this.submitted = true;
      const curDate = moment().format('YYYY-MM-DD');
      // for (const s of this.paymentModeone) {
      //   if (s.defaultpaymentflag == true) {
      //     this.idCheck = 1;
      //   }
      //   if (s.paymentModeoneflag == true) {
      //     const req = {
      //       'prpmId': s.id,
      //       'isActive': '1',
      //       'isDefault': this.idCheck,
      //       'createdBy': this.userId,
      //       'createdOn': curDate,
      //       'modifiedBy': this.userId,
      //       'modifiedOn': curDate
      //     };
      //     this.paymentModeList.push(req);
      //   }
      // }

      this.program.beneficiary = this.beneficiaryDynamic;
      for(let p of this.program.beneficiary){
        delete p.pbId;
      }
      this.program.repayment = this.repaymentDynamic;
      this.program.programLimit = this.programLimitList;
      for (let i = 0; i < this.programDynamic.length; i++) {
        this.programDynamic[i].lenderSequence = i + 1;
      }

      let totalLenderROINew = 0;
      let totalLenderPFNew = 0;
      let limitNew = 0;

      for (let i = 0; i < this.programDynamic.length; i++) {
        totalLenderROINew = +this.programDynamic[i].totalRoi + +totalLenderROINew;
        totalLenderPFNew = +this.programDynamic[i].totalPfValue + +totalLenderPFNew;
        limitNew = +this.programDynamic[i].lenderLimit + +limitNew;
      }
      let totalSpROINew = 0;
      let totalSpPFNew = 0;
      for (let i = 0; i < this.partnerDynamic.length; i++) {
        totalSpROINew = +this.partnerDynamic[i].totalRoiSP;
        totalSpPFNew = +this.partnerDynamic[i].totalPfValueSP;
      }
      const minRoi = this.program.minROI;
      const maxRoi = this.program.maxROI;
      const totLimit = this.program.totalLimit;
      if (this.isNullorUndefinedorEmpty(this.program.masterProgramId)) {
        this.set.setOption('Please select master program', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.programTypeId)) {
        this.set.setOption('Please select program type', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.programName)) {
        this.set.setOption('Please enter program name', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.startDate)) {
        this.set.setOption('Please enter start date', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.endDate)) {
        this.set.setOption('Please enter end date', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.totalLimit)) {
        this.set.setOption('Please enter total limi', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.limitPerBorrower)) {
        this.set.setOption('Please enter borrower limit', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.minROI)) {
        this.set.setOption('Please enter min ROI', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.maxROI)) {
        this.set.setOption('Please enter max ROI', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.installmentType)) {
        this.set.setOption('Please select installment type', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.noOfInstallment)) {
        this.set.setOption('Please select no of installment', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.loanTenure)) {
        this.set.setOption('Please select loan tenure', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.loanTenureUnit)) {
        this.set.setOption('Please select loan tenure unit', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.interestType)) {
        this.set.setOption('Please select interest type', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.noOfTranchesPerDay)) {
        this.set.setOption('Please select No Of Tranches Per Day', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.tranchLimitPercentage)) {
        this.set.setOption('Please select Tranch Limit Percentage', false);
      } else if (this.program.coApplicantSoleProp == null) {
        this.set.setOption('Please select Co-Applicant Sole Prop', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.adjustMinPercentage)) {
        this.set.setOption('Please select Adjust Min Percentage', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.adjustMaxPercentage)) {
        this.set.setOption('Please select Adjust Max Percentage', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.notificationTypeId)) {
        this.set.setOption('Please select Notification Type', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.notificationFreqId)) {
        this.set.setOption('Please Enter Notification Frequncy', false);
      } else if (this.program.loanToSoleProp == null) {
        this.set.setOption('Please Enter Loan To Sole Prop', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.requiredMonthsBankStatement)) {
        this.set.setOption('Please Enter Bank Statements for these many months', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.gracePeriod)) {
        this.set.setOption('Please Enter Grace Period', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.orderInvoiceDisbursal)) {
        this.set.setOption('Please Enter Order Invoice Disbursal', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.minimumValueofAcceptedInvoice)) {
        this.set.setOption('Please Enter Minimum Value Of Accepted Invoice', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.dueDateSelection)) {
        this.set.setOption('Please Enter Due Date Selection', false);
      } else if (this.isNullorUndefinedorEmpty(this.program.maxFreeCredit)) {
        this.set.setOption('Please Enter valid Maximum Free Credit', false);
      }  
      // else if (this.isNullorUndefinedorEmpty(this.program.staleDays)) {
      //   this.set.setOption('Please Enter valid Stale Days', false);
      // }
      else if (this.program.orderInvoiceDisbursal == 1 && this.isNullorUndefinedorEmpty(this.program.orderInvoiceDisbursal)) {
        this.set.setOption('Please Enter Order Invoice Disbursal Limit', false);
      } else if (this.program.cashDiscountFlag == 1 && this.checkCashDiscount()) {
        this.set.setOption('Check Cash discount list', false);
      } else if (this.program.programTypeId == 2 && this.isNullorUndefinedorEmpty(this.program.smeType)) {
        this.set.setOption('Please Enter SME Type', false);
      } else if (this.validateSMIList()) {
        this.set.setOption('Please Enter Valid SMI Details', false);
      } else if (this.program.programTypeId == 4 && this.program.copyRulesFrom == 0 && this.env != 'Jana') {
        this.set.setOption('Please Enter program rule  to map', false);
      } else if (this.set.validateSpecialChar(this.program.programName)) {
        this.set.setOption('Special Characters Not Allowed', false);
      } else if (this.set.validateSpecialChar(this.program.totalLimit)) {
        this.set.setOption('Special Characters Not Allowed', false);
      } else if (this.set.validateSpecialChar(this.program.limitPerBorrower)) {
        this.set.setOption('Special Characters Not Allowed', false);
      } else if (this.set.validateSpecialChar(this.program.minROI)) {
        this.set.setOption('Special Characters Not Allowed', false);
      } else if (this.set.validateSpecialChar(this.program.maxROI)) {
        this.set.setOption('Special Characters Not Allowed', false);
      } else if (this.set.validateSpecialChar(this.program.noOfInstallment)) {
        this.set.setOption('Special Characters Not Allowed', false);
      } else if (this.set.validateSpecialChar(this.program.loanTenure)) {
        this.set.setOption('Special Characters Not Allowed', false);
      } else if (this.set.validateSpecialChar(this.program.requiredMonthsBankStatement)) {
        this.set.setOption('Special Characters Not Allowed', false);
      } else if (this.dynamicBorrowerType()) {
        this.set.setOption('Please Check Borrower ROI List', false);
      } else if (limitNew == totLimit) {
        this.program.partner = this.partnerDynamic;
        this.program.lenders = this.programDynamic;
        this.program.cashDiscount = this.cashDiscountList;
        this.program.programConfig = this.paymentModeList;
        if (this.program.interestType == 'Front End') {
          this.program.interestTypeId = 2;
      } else if (this.program.interestType == 'Rear End') {
        this.program.interestTypeId = 1;
      } else if(this.program.interestType=='Monthly Rear End') {
        this.program.interestTypeId = 3;
      }
      this.save();
      } else {
        this.set.setOption('Total Limit and Lender Limit are not the same!', false);
        return false;
      }
    }
  submitPopup(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
    save() {
      this.program.activeInd = 'N';
      const curdate = moment().format('YYYY-MM-DD HH:mm:ss');
      const newDate2 = new Date(curdate);
      this.program.createdOn = newDate2;
      this.program.createdBy = Number(this.userId);
      this.program.borrowerRoiType=this.borrowerRoiType;
      this.program.borrowerLoanTenureType=this.borrowerLoanTenureType;
      for(let p of this.program.partner){
        delete p.pspId;
      }
      for(let p of this.program.programConfig){
        delete p.prpmId;
      }
      for(let p of this.program.lenders){
        delete p.plId;
      }
      for(let p of this.program.programLimit){
        delete p.id;
      }
      for(let p of this.program.repayment){
        delete p.pr_id;
      }
      for(let p of this.program.cashDiscount){
        delete p.cdId;
      }
   
    delete this.program.programId
      const msg = null;
      let errMsg = null;
      this.apiService.createProgramSetup(this.program)
        .subscribe(data => {
          if (data.status == 200) {
            this.set.setOption('Program added Successfully', true);
            const programId = data.result.programId;

            this.program = new Program();
            this.apiService.saveCustomConfiguration(programId, this.programDynamic[0].lenderId, this.customConfigList)
              .subscribe(data => { });
            const tenureList=this.borrowerROIList.map(item => item.tenure).filter((value, index, self) => self.indexOf(value) === index);
            const borrowerData= {
              tenureList:tenureList,
              programId:programId,
              borrowerROIList:this.borrowerROIList,
              userId:this.userId
            };
            this.apiService.insertBorrowerTenureDetail(borrowerData).subscribe(resp => {});
            this.apiService.insertSmiDetails(programId, this.smiList).subscribe(data => {
              if (data.status == 200) {
                this.apiService.insertLateFeeDetails(programId, this.lateFeeList).subscribe(data => {
                  if (data.status == 200) {
                  } else {
                    this.set.setOption('Late Fee Details not configured', true);
                  }
                  this.gotoList();
                });
              } else {
                this.set.setOption('SMI Details Update Failed', false);
              }
            });
          } else {
            this.set.setOption('Failed to add program', false);
          }
        }, error => errMsg = error);
    }

    checkValidation(){
      this.program.stampPaperFlag='0';
    }
    
    checkeStampDutyProcurement(){
      this.program.eStampDutyProcurementFlag = '0';
    }
}
