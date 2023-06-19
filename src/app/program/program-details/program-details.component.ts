import { Component, OnInit } from '@angular/core';
import { Program } from '../programModel';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { Currency } from '../../shared/currency.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { data } from '../../dashboards/dashboard3/smart-data-table';
import { lenderconfiguration } from '../../../environments/lender.config';
import { lender } from '../../../environments/environment';
import { Crypto } from '../../shared/crypto.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit {
  id: number;
  program: Program;
  beneficiaryDynamic: Array<any> = [];
  companyTypeList: Array<any> = [];
  repaymentDynamic: Array<any> = [];
  programLimitDynamic: Array<any> = [];
  programDynamic: Array<any> = [];
  lateFeeList: Array<any> = [];
  length: any;
  newDynamic: any = {};
  roiFlag: any;
  tenureFlag: any;
  borrowerROIList: Array<any> = [];
  ROIList: Array<any> = [];
  partnerDynamic: Array<any> = [];
  newPartner: any = {};
  tenureList: any;
  roiTenureList: Array<any> = [];
  masterProgramList: Array<any> = [];
  ProgramTypeList: Array<any> = [];
  masterList: Array<any> = [];
  tenureFlaglist = [];
  LenderList: Array<any> = [];
  dataList: Array<any> = [];
  PartnerList: Array<any> = [];
  smiList: Array<any> = [];
  env: any;
  envlender: any;
  repaymentList: any;
  beneficiaryList: any;
  m: any;
  startDate: any;
  endDate: any;
  cashDiscountList: any[];
  customConfigList: any;
  dataType = [{ id: '1', name: 'String' }, { id: '2', name: 'Int' }, { id: '3', name: 'Float' }, { id: '4', name: 'Long' },
  { id: '5', name: 'Decimal' }, { id: '6', name: 'Boolean' }, { id: '7', name: 'Long' }];
  programfilter: any;
  borrowerROIType: any;
  borrowerLoanTenureType: any;
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,
    private apiService: ApiService, public currency: Currency, private set: breadcrumbMessage,private crypto: Crypto) { }

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }


  ngOnInit(): void {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.program = new Program();
    this.roiFlag = "0";
    this.tenureFlag = "0";
    this.env = lenderconfiguration.env;
    this.id = this.route.snapshot.params['id'];
    if (this.env == 'Jana') {
      this.envlender = lender.jana
    }else if (this.env == 'Tvsc') {
      this.envlender = lender.tvs
    }else if (this.env == 'Abfl') {
      this.envlender = lender.abfl
    }else {
      this.envlender = lender.FINAGG
    }
    this.apiService.getSMIDetails(this.id).subscribe(res => this.smiList = res.result);
    this.apiService.getLateFeeDetails(this.id).subscribe(res => this.lateFeeList = res.result);
    
    this.apiService.getProgramSetup(this.id)
    .subscribe(data => {
      console.log(data)
      if (data.status == 200) {
        this.program = data.result;
        const dataone={
          "programId": this.id 
        }
        this.apiService.selectBorrowerTenureDetails(dataone).subscribe(data => {
          if (data.status == 200) {
            this.dataList = data.result;
            this.borrowerROIList = this.dataList;
            this.apiService.getCustomConfiguration(this.id,this.program.lenders[0].lenderId).subscribe(res =>{
              if(res.status==200){
                this.customConfigList = res.result
                for(let c of this.customConfigList){
                  c.userId=this.userId;
                  c.roi=Number(c.roi)+'.0';
                }
              }
            });
          }
        });
          this.borrowerROIType = this.program.borrowerRoiType;
          this.borrowerLoanTenureType = this.program.borrowerLoanTenureType;
          this.cashDiscountList = this.program.cashDiscount;
          var list = [];
          for (let a of this.cashDiscountList) {
            if (a.activeInd == '1') {
              list.push(a);
            }
          }
          this.cashDiscountList = list;
          this.startDate = moment(this.program.startDate).format('DD-MM-YYYY');
          this.endDate = moment(this.program.endDate).format('DD-MM-YYYY');
        } else {
          this.set.setOption(data.exceptionMessage, false);
          // alert(data.exceptionMessage);
        }
        // this.program = data;
        this.conditionsCheck();
      }, error => console.log(error));
    this.reloadData();
  }



  conditionsCheck() {
    if (this.program.partner.length > 0) {
      var partnerData = [];
      this.program.partner.forEach(function (partner) {
        partnerData.push(partner);

      });
      console.log("partnerData==", partnerData);
    }

    if (this.program.beneficiary.length > 0) {
      var beneficiaryData = [];
      this.program.beneficiary.forEach(function (beneficiary) {
        beneficiaryData.push(beneficiary);
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

    if (this.program.lenders.length > 0) {
      var lendersData = [];
      this.program.lenders.forEach(function (lenders) {
        lendersData.push(lenders);

      });
      console.log("lendersData==", lendersData);
    }
    if (this.program.lenders.length > 0) {
      var lendersData = [];
      this.program.lenders.forEach(function (lenders) {
        lendersData.push(lenders);

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

    this.programLimitDynamic = programLimitData;
    this.repaymentDynamic = repaymentData;
    this.beneficiaryDynamic = beneficiaryData;
    this.partnerDynamic = partnerData;
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
    this.apiService.getfilteredProgramList(this.program.programTypeId)
      .subscribe(data => {
        if (data.status == 200) {
          this.programfilter = data.result;
          console.log("the data in progrsm is ===" + this.programfilter);
        } else {
          this.set.setOption(data.exceptionMessage, false);
          // alert(data.exceptionMessage);
        }
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['program/list']);

  }
  reloadData() {

    this.apiService.getMasterList().subscribe(res => this.masterList = res.result);
    this.apiService.getProgramTypeList().subscribe(res => this.ProgramTypeList = res.result);
    this.apiService.getMasterProgramList().subscribe(res => this.masterProgramList = res.result);
    this.apiService.getProgramLenderList().subscribe(res => this.LenderList = res.result);
    this.apiService.getPartnerList().subscribe(res => this.PartnerList = res.result);
    this.apiService.getRepaymentList().subscribe(res => this.repaymentList = res.result);
    this.apiService.getBeneficiaryList().subscribe(res => this.beneficiaryList = res.result);
    this.apiService.getCompanyTypeList().subscribe(res => {
      this.companyTypeList = res.result;
    });
    const dataone =
    {
      "programId": this.id
    }
    // this.apiService.selectBorrowerTenureDetails(dataone).subscribe(data => {
    //   if (data.status == 200) {
    //     this.borrowerROIList = data.result;
    //     for(const c of this.borrowerROIList) {c.roi =parseFloat(c.roi).toFixed(2);
    //     }
    //   }
    // });

    this.apiService.selectRoiTenureFlag(dataone).subscribe(data => {
      if (data.status == 200) {
        this.tenureFlaglist = data.result;
        if (this.tenureFlaglist[0].tenureflag == "2") {

          this.tenureFlag = "2";
        }
        else {


          this.tenureFlag = "1";
        }
        if (this.tenureFlaglist[0].roiflag == "1") {
          this.roiFlag = "1"
        }
        else {
          this.roiFlag = "2"
        }
      }
    })
    this.apiService.selectonlyTenureDetails(dataone).subscribe(data => {
      if (data.status == 200) {
        this.roiTenureList = data.result;

        //  this.tenureList = this.roiTenureList[0].tenure;
        //  for(this.m=0;this.m<this.tenureList.length;this.m++)
        //  {
        //    console.log("the tenure list is --"+this.roiTenureList[0].tenure)
        //  }
        //  console.log("the new data is=="+this.roiTenureList[0].roiflag)
        //   }
        //   else {
        //     this.set.setOption(data.exceptionMessage, false);
        //   }
      }
    });

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
    this.apiService.selectBorrowerTenureDetails(dataone).subscribe(data => {
      if (data.status == 200) {
        this.dataList = data.result;
        if (this.dataList.length > 0) {
          console.log("i am called now for roi");
          console.log("The flag is===" + this.dataList[0].roiflag);


        }

        console.log("The data length is===" + this.dataList.length);

        // this.borrowerROIList = this.dataList.splice(0, this.ROIList.length);

      }
    });
  }


}
