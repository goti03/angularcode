import { Component, OnInit, TemplateRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable } from "rxjs";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment.js';
import { ApiService } from "..//core/api.service";
import { Constant, gemConstant, retailerConstant, nonSoleProp, sellerConstant, dealerConstant, UGROLendor, vendorConstant } from '../core/constant';
import { breadcrumbMessage } from '../shared/breadcrumb-message.service'
import { environment } from '../../environments/environment';
import { Currency } from '../shared/currency.service';
import {Crypto} from '../shared/crypto.service';

export interface brand {
    brandName: string;
    vintage: String;
    brandPurchase6Months: String;
    brandPayment6Months: String;
    gstTournover: String;
}
export interface business {
    year: any;
    noOfGst: number;
    gstTurnover: number;
}
@Component({
    selector: 'app-gstreport',
    templateUrl: './gstreport.component.html',
    styleUrls: ['./gstreport.component.css']
})
export class GstreportComponent implements OnInit {
    list = [];
    message = '';
    url = environment.mobileAPIUrl;
    maxlimit: any;
    creditPeriodAt90Days: any;
    preApprovalLimit: any;
    approvalLimit: any;
    HeaderDetails = [];
    mobileNo: any;
    value:any;
    customerName:any;
    stausId: any;
    substatusId: any;
    programId: any;
    statusFlow: any;
    ugroLender = false;
    borrowerUPIAddButton: boolean;
    borrowerAddButton: boolean;
    BorrowerOutAddButton: boolean;
    escrowToBeneficiaryAddButton: boolean;
    escrowAddButton: boolean;
    LenderAddButton: boolean;
    FinAggAddButton: boolean;
    BorrowerInAddButton: boolean;
    BeneficiaryAddButton: boolean;
    stackHolderType: any;
    editstackHolderType: any;
    bankName: Array<any> = [];
    accTypeList: Array<any> = [];
    anchorsFundingList: Array<any> = [];
    offeredAmount: any;
    registeredAmount: any;
    roi: any;
    tenure: any;
    interestAmount: any;
    sellerProgramTypeId = sellerConstant.sellerProgramTypeId;
    gemProgramTypeId = gemConstant.gemProgramTypeId;
    programTypeId: any;
    HiddenTab: any;
    uat: boolean;
    id: number;
    loanid: number;
    bankid: number;
    month: any;
    year: any;
    index: any;
    selector: any;
    submitted = false;
    disbursalData: any;
    LoanEmiSchedule: any;
    disbursalInvoiceData: any;
    borrowerDetails = [];
    BorrowerVirtualAccountOutgoing = [];
    BorrowerVirtualAccountIncoming = [];
    FinAgg = [];
    Beneficiary = [];
    Lender = [];
    escrow = [];
    escrowToBeneficiary = [];
    borrowerUPI = [];
    noOfGstList = [];
    // bankSummaryDetails: bank[] = [];
    amount: any;
    date1: any;
    date2: any;
    date3: any;
    date4: any;
    date5: any;
    upiId:any;
    totalAmountselected:any;
    date6: any;
    momentVariable: any;
    skipAndProceed: any;
    closeResult: string;

    hide: boolean;
    BankOutflowGroups: any;
    BankInflowGroups: any;
    customerDetails: any;
    AggregateBankDetails: any;
    title: any;
    highcharts: any;
    chartOptions: any;
    highcharts1: any;
    chartOptions1: any;
    highcharts2: any;
    chartOptions2: any;
    highcharts3: any;
    chartOptions3: any;
    highcharts4: any;
    chartOptions4: any;
    highcharts5: any;
    chartOptions5: any;
    highcharts6: any;
    chartOptions6: any;
    highcharts7: any;
    chartOptions7: any;
    highcharts8: any;
    chartOptions8: any;
    highcharts9: any;
    chartOptions9: any;
    highcharts10: any;
    chartOptions10: any;
    highcharts11: any;
    chartOptions11: any;
    highcharts12: any;
    chartOptions12: any;
    highcharts1a: any;
    chartOptions1a: any;
    highcharts2a: any;
    chartOptions2a: any;
    highcharts3a: any;
    chartOptions3a: any;
    highcharts4a: any;
    chartOptions4a: any;
    highcharts5a: any;
    chartOptions5a: any;
    highcharts6a: any;
    chartOptions6a: any;
    highcharts7a: any;
    chartOptions7a: any;
    highcharts8a: any;
    chartOptions8a: any;
    GSTsummaryDetails1: any;
    highcharts9a: any;
    chartOptions9a: any;
    highcharts10a: any;
    chartOptions10a: any;
    highcharts11a: any;
    chartOptions11a: any;
    highcharts12a: any;
    chartOptions12a: any;
    highcharts13a: any;
    chartOptions13a: any;
    highcharts14a: any;
    chartOptions14a: any;
    highcharts15a: any;
    chartOptions15a: any;
    highcharts16a: any;
    chartOptions16a: any;
    highcharts17a: any;
    chartOptions17a: any;
    highcharts18a: any;
    chartOptions18a: any;
    highcharts19a: any;
    chartOptions19a: any;
    highcharts20a: any;
    chartOptions20a: any;
    GSTsummaryDetails2: any;
    GSTsummaryDetails3: any;
    GSTturnoverDetails: any;
    salesPurchaseRatioDetails1: any;
    salesPurchaseRatioDetails2: any;
    salesPurchaseRatioDetails3: any;
    salesDataPercentage: any;
    topCustomersList: any;
    financeSubLimit: any;
    sellerFinanceSubLimit: any;
    retailerFinanceSubLimit: any;
    preCovidHSNList: any;
    duringCovidHSNList: any;
    postCovidHSNList: any;
    gstnSalesSegment1: any;
    gstnSalesSegment2: any;
    gstnSalesSegment3: any;
    gstBankTurnoverDetails1: any;
    gstBankTurnoverDetails2: any;
    gstBankTurnoverDetails3: any;
    gstDurationList: any;
    salesData: any;
    startDate: Array<any> = [];
    endDate: Array<any> = [];
    CustomerBankDetails: any;
    LoanRequestById: any;
    CustomerRetailerInfo: any;
    CustomerDetail: any;
    charts: any;
    SummaryDetails: any;
    bankSummaryDetails: any;
    businessSummaryDetails: any;
    topCustomers: any;
    totalDebits1: any;
    totalCredits1: any;
    orgId: any;
    retailerId: any;
    gstTurnoverQuarterwise: any;
    bankCreditQuarter: any;

    brandSummaryDetails: brand[] = [];
    businessSummaryDetails1: business[] = [];
    businessSummaryDetails2: business[] = [];
    requestList: Observable<any>;
    brandName: string;
    vintage: String;
    brandPurchase6Months: String;
    brandPayment6Months: String;
    gstTournover: String;
    noOfGst1: number;
    gstTurnover1: number;
    noOfGst2: number;
    gstTurnover2: number;
    export: String;
    noOfAccounts: String;

    CustomerBankMergedDetails: any;
    LoanMonthAvailable: any;
    OutflowChart: any;
    InflowChart: any;

    monitorLimitAmount: number;
    monitorUtilisedAmount: any;
    monitorAvailableLimit: number;

    BankInflowGroupAmount: any;
    BankOutflowGroupAmount: any;

    turnOverInLast12Months: any;
    turnOverInLast15Months: any;
    avgMonthlyTurnover: any;
    turnOverTillApril: any;
    percentageGrowth: any;

    topBuyer: any;
    topPurchsers: any;
    service: any;
    goods: any;
    other: any;

    lastYearTurnOver: any;
    noOfMonthsInLastYearTurnOver: any;
    avgLastYearTurnOver: any;
    lastQ1TurnOver: any;
    noOfMonthsInLastQ1TurnOver: any;
    avglastQ1TurnOver: any;
    lastQ2TurnOver: any;
    noOfMonthsInLastQ2TurnOver: any;
    avglastQ2TurnOver: any;
    lastQ3TurnOver: any;
    noOfMonthsInLastQ3TurnOver: any;
    avglastQ3TurnOver: any;
    lastMonthsTurnOver: any;
    noOfMonthsInLasMonthsTurnOver: any;
    avglastMonthsTurnOver: any;
    bsNoOfMonths: any;
    otherIncome: any;
    avgOtherIncome: any;
    totalIncome: any;
    avgTotalIncome: any;
    totalTurnOver: any;
    avgTurnOver: any;
    totalPurchase: any;
    avgPurchase: any;
    cashWithdraw: any;
    salary: any;
    nonGstUtilities: any;
    gstTx: any;
    avgTotalPurchase: any;
    avgCashWithdraw: any;
    avgSalary: any;
    avgNonGstUtilities: any;
    avgGstTx: any;
    avgTotalCost: any;
    profitBeforeTax: any;
    ebitda: any;
    marginEbitda: any;
    profitAfterTax: any;
    Seller: boolean;
    Retailer: boolean;
    showTab: boolean;
    dealer: boolean;
    gemId: any;
    generateAnchorButton: any;
    updateButton: any;
    muteDetails: any;
    muteRemarks: String;
    brandData: any;
    accountMessage: any;
    roleId :any;

    borrowerDetailMail = [];
    BorrowerVirtualAccountOutgoingMail = [];
    BorrowerVirtualAccountIncomingMail = [];
    escrowToBeneficiaryMail = [];
    LenderMail = [];
    FinAggMail = [];
    escrowMail = [];
    borrowerUPIMail = [];
    oldstausId: any;
    oldsubstatusId: any;
    substatusList: any;
    statusList: any;
    remark: String;
    errorMsg: any;
    @ViewChild('statusChangePopup', { static: true }) statusChangePopup: TemplateRef<any>;
    popUPName = "statusChangePopup";

    loandisbursallist: any;
    loandisid: any;
    userId:any;
    loanDisbursalAmt: any;
    screen: any;
    chargeInfo: any;
    waiveInfo: any;
    ldi: any = 1;
    cl: any = 1;
    dl: any = 1;
    discountList: any;
    invoiceList = [];
    invoiceDateList = [];

    nonStopFlag : any;
    type: any;

    constructor(
        private route: ActivatedRoute, private router: Router,
        private apiService: ApiService,
        private modalService: NgbModal,
        private set: breadcrumbMessage, public currency: Currency,private crypto: Crypto) {
    }
    reloadPage() {
        this.AggregateBankDetails = null;
        this.BankOutflowGroups = null;
        this.BankInflowGroups = null;
        this.BankInflowGroupAmount = null;
        this.BankOutflowGroupAmount = null;
        this.OutflowChart = false;
        this.InflowChart = false;
        this.selector = 0;
    }
    BankOutflow(groupId: any) {
        // this.id = 42;
        // this.loanid = 189;
        this.BankOutflowGroupAmount = null;
        console.log("this.id==" + this.id + " this.loanid==" + this.loanid + " groupId== " + groupId)
        var temp1 = groupId.split("and");
        groupId = temp1[0];
        if (groupId != 0) {
            if (this.selector == 1) {
                console.log("groupid=" + groupId + " index==" + this.index + " this.selector==" + this.selector);
                var temp = ((document.getElementById("loanYear") as HTMLInputElement).value).split("and");
            } else if (this.selector == 2) {
                this.index = temp1[1];
                console.log("groupid=" + groupId + " index==" + this.index + " this.selector==" + this.selector);
                var temp = ((document.getElementById("monthAva" + this.index) as HTMLInputElement).value).split("and");
            }
            this.month = temp[1];
            this.year = temp[0];
            console.log("this.month=" + this.month + " this.year=" + this.year);
            this.apiService.getBankOutflowGroupAmount(groupId, this.month, this.year, this.loanid)
                .subscribe(data => {
                    // console.log("data=="+JSON.stringify(data));
                    this.BankOutflowGroupAmount = data.result;
                    var mny = this.month + ' - ' + this.year;

                    for (let inv1 of this.BankOutflowGroupAmount) {
                        this.title = 'FinnAgg';
                        console.log(typeof inv1.outflowAmt);
                        this.highcharts14a = Highcharts;
                        this.chartOptions14a = {

                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Cash OutFlow'
                            }, credits: {
                                enabled: false
                            },
                            xAxis: {
                                categories: [
                                    mny
                                ],
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'INR'
                                }
                            }, colors: ['#151B54'],
                            series: [{
                                name: 'Year & Month',
                                data: [inv1.outflowAmt]

                            }]

                        };


                    }

                    console.log("BankOutflowGroupAmount===" + JSON.stringify(this.BankOutflowGroupAmount));
                }, error => console.log(error));

            this.OutflowChart = true;
        }
        else {
            this.OutflowChart = false;
        }

    }
    BankInflow(groupId: any) {
        // this.id = 42;
        // this.loanid = 189;
        this.BankInflowGroupAmount = null;
        console.log("data==" + this.id + "loanid==" + this.loanid);
        console.log("groupId==" + groupId);
        var temp1 = groupId.split("and");
        groupId = temp1[0];
        if (groupId != 0) {
            if (this.selector == 1) {
                console.log("groupid=" + groupId + " index==" + this.index + " this.selector==" + this.selector);
                var temp = ((document.getElementById("loanYear") as HTMLInputElement).value).split("and");
            } else if (this.selector == 2) {
                this.index = temp1[1];
                console.log("groupid=" + groupId + " index==" + this.index + " this.selector==" + this.selector);
                var temp = ((document.getElementById("monthAva" + this.index) as HTMLInputElement).value).split("and");
            }

            this.month = temp[1];
            this.year = temp[0];

            console.log("this.month=" + this.month + " this.year=" + this.year);
            this.apiService.getBankInflowGroupAmount(groupId, this.month, this.year, this.loanid)
                .subscribe(data => {
                    console.log("data==" + JSON.stringify(data));
                    this.BankInflowGroupAmount = data.result;

                    var mny = this.month + ' - ' + this.year;

                    for (let inv of this.BankInflowGroupAmount) {
                        this.title = 'FinnAgg';
                        this.highcharts13a = Highcharts;
                        this.chartOptions13a = {

                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Cash InFlow'
                            }, credits: {
                                enabled: false
                            },
                            xAxis: {
                                categories: [
                                    mny
                                ],
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'INR'
                                }
                            }, colors: ['#151B54'],

                            series: [{
                                name: 'Year & Month',
                                data: [inv.inflowAmt]

                            }]

                        };


                    }

                    console.log("BankInflowGroupAmount===" + JSON.stringify(this.BankInflowGroupAmount));
                }, error => console.log(error));

            this.InflowChart = true;
        } else {
            this.InflowChart = false;
        }


    }

    changeBankAccounts(event: any) {
        var llaId = event.target.value;

        this.apiService.getLoanMonthAvailable(this.id, llaId)
            .subscribe(data => {
                this.LoanMonthAvailable = data.result;
            }, error => console.log(error));
    }
    monthTradsMerged(event: any) {
        var llaId = event.target.value;
        //alert("llaId="+llaId);
        this.selector = 1;
        this.OutflowChart = false;
        this.InflowChart = false;

        this.apiService.getAggregateBankDetails(this.id, llaId, this.month, this.year)
            .subscribe(data => {
                this.AggregateBankDetails = data.result;
                console.log("AggregateBankDetails===" + JSON.stringify(this.AggregateBankDetails));
            }, error => console.log(error));
        this.submitted = true;

        this.apiService.getBankOutflowGroups(this.id, this.loanid)
            .subscribe(data => {
                this.BankOutflowGroups = data.result;
            }, error => console.log(error));

        this.apiService.getBankInflowGroups(this.id, this.loanid)
            .subscribe(data => {
                this.BankInflowGroups = data.result;
            }, error => console.log(error));



    }
    keyPress(event: any) {
        // alert(event);
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    alphakeyPress(event: any) {
        const pattern = /[a-zA-Z//\s]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }

    }
    alphanumkeyPress(event: any) {
        const pattern = /[a-zA-Z0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }

    }
    addBorrowerDetails(content) {
        this.modalService.open(content, { size: 'xl' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    updateFundingLimit() {
        var arrayList = [];
        let count = 0;
        for (let i = 0; i < this.anchorsFundingList.length; i++) {
            const data = {
                buyerId: this.anchorsFundingList[i].buyerId,
                fundingAmount: this.anchorsFundingList[i].fundingPercentage,
            }
            arrayList.push(data);
            if (this.anchorsFundingList[i].fundingPercentage <= 0 || this.anchorsFundingList[i].fundingPercentage != '') {
                count++;
            }
        }
        if (count > 0) {
            this.apiService.updateFundingLimit(this.loanid, arrayList)
                .subscribe(data => {
                    if (data.status == 200) {
                        this.set.setOption("Funding Limit Updated Successfully", true);

                        // alert("Funding Limit Updated Successfully");
                        // window.location.reload();
                        this.ngOnInit();
                    } else {
                        this.set.setOption("Updated Failed", false);
                        this.ngOnInit();
                        // alert("Update Failed");
                    }
                }, error => console.log(error));
        }
    }
    generateAnchorProfile() {
        this.apiService.generateAnchorProfile(this.loanid, this.userId,this.type)
            .subscribe(data => {
                if (data.status == 200) {
                    if (data.exceptionOccured == 'Y') {
                        this.set.setOption(data.exceptionMessage, false);
                    } else {
                        this.set.setOption("Anchor Profile Generated Successfully", true);
                    }
                    window.location.reload();
                } else {
                    this.set.setOption(data.exceptionMessage, false);
                }
            }, error => console.log(error));
    }
    gotoList(data) {
        if(this.nonStopFlag == 0){
            this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'firmName':data,'nonStopFlag':'0' }} );
        }else{
            this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'firmName':data,'nonStopFlag':'1' }} );
        }
    }

    indianCurrency(number: any) {
        return this.currency.indianCurrency(number);
    }

    getsubStatusList() {
        this.apiService.getsubStatusList(Number(this.stausId)).subscribe(data => {
            this.substatusList = data.result;
        }, error => console.log(error));
    }

    ngOnInit() {
        this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
        this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
        this.generateAnchorButton = false;
        this.updateButton = false;
        this.gemId = '0';
        this.hide = false;
        this.route.queryParams.subscribe(params => { 
            this.id = params['customerId'];
            this.loanid = params['loanId'];
            this.orgId = params['orgId'];
            this.retailerId = params['retailerId'];
            this.programTypeId = params['programTypeId'];
            this.nonStopFlag = params['nonStopFlag'];
          })
        this.uat = false;
        let number = 100;
        this.submitted = false;
        this.apiService.getLoanHeaderDetails(this.loanid)
            .subscribe(data => {
                this.HeaderDetails = data.result;
                this.mobileNo = this.HeaderDetails[0].mobileNo;
                this.stausId = this.HeaderDetails[0].stausId;
                this.substatusId = this.HeaderDetails[0].substatusId;
                this.programId = this.HeaderDetails[0].programTypeId;
                this.statusFlow = this.HeaderDetails[0].statusflow;
                this.mobileNo = this.HeaderDetails[0].mobileNo;
                this.customerName=this.HeaderDetails[0].companyName;
                this.oldstausId = this.HeaderDetails[0].stausId;
                this.oldsubstatusId = this.HeaderDetails[0].substatusId;
                this.skipAndProceed = (this.HeaderDetails[0].skipAndProceed == '1') ? false : true;
                this.apiService.getStatusList(Number(this.statusFlow)).subscribe(data => {
                    this.statusList = data.result;

                }, error => console.log(error));
                this.apiService.getsubStatusList(Number(this.stausId)).subscribe(data => {
                    this.substatusList = data.result;

                }, error => console.log(error));
            }, error => console.log(error));

        if (this.programTypeId == this.sellerProgramTypeId) {
            this.Seller = true;
            this.Retailer = false;
            this.HiddenTab = false;
            this.ugroLender = false;
        } else if (this.programTypeId == this.gemProgramTypeId) {
            this.Seller = false;
            this.HiddenTab = false;
            this.hide = false;
            this.Retailer = false;
            this.showTab = true;
            this.ugroLender = false;
        } else if (this.programTypeId == dealerConstant.DEALERProgramTypeId || this.programTypeId == vendorConstant.VendorProgramTypeId) {
            this.Seller = false;
            this.HiddenTab = false;
            this.hide = false;
            this.Retailer = false;
            this.showTab = false;
            this.dealer = true;
            this.ugroLender = false;
        } else if (this.programTypeId == UGROLendor.UgroProgramTypeId) {
            this.showTab = false;
            this.Seller = false;
            this.Retailer = false;
            this.ugroLender = true;
            this.HiddenTab = false;

        } else {
            this.ugroLender = false;
            this.showTab = false;
            this.Seller = false;
            this.Retailer = true;
            this.HiddenTab = false;
        }
        this.apiService.getCustomerDetailInfo(this.id, this.loanid)
            .subscribe(data => {
                this.CustomerDetail = data.result;
            }, error => console.log(error));
        this.apiService.getCustomerDetails(this.id, this.loanid).subscribe(data => {
            this.customerDetails = data.result;
            var temp = data.result[0].GSTNo.split(",");
            for (let i = 0; i < temp.length; i++) {
                const data = { gstNo: temp[i] };
                this.noOfGstList.push(data);
            }
        }, error => console.log(error));
        this.screen = 0;
        if(this.roleId=="32")
        {
            this.tabSwitch(16);
        }
        else{
        this.tabSwitch(0);
        }

    }

    ifscMatch = new RegExp("^[A-Za-z]{4}0[A-Z0-9]{6}$");
    phoneMatch = new RegExp("[0-9]{10}")
    emailMatch = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")

    split(a, b) {
        if ((a) && (a[0].beneMail)) {
            var a1 = a[0].beneMail;
            if (a1.indexOf(',') != -1) {
                var d = a1.split(',');
                for (let c of d) {
                    b.push(c);
                }
            } else if (a1.indexOf(' ') != -1) {
                var d = a1.split(' ');
                for (let c of d) {
                    b.push(c);
                }
            }
        }
    }
    verifyEmail(beneMail) {
        var count = 0;
        var temp = beneMail.split(",");
        for (let b of temp) {
            if (!this.emailMatch.test(b)) {
                count++;
            }
        }
        if (count == 0) {
            return false;
        } else {
            return true;
        }
    }

    saveBankDetails() {
        var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
        var bankName = (document.getElementById("bankName") as HTMLInputElement).value;
        var accountNo = (document.getElementById("accountNo") as HTMLInputElement).value;
        var accountType = (document.getElementById("accountType") as HTMLInputElement).value;
        var ifscCode = (document.getElementById("ifscCode") as HTMLInputElement).value;
        var beneId = (document.getElementById("beneId") as HTMLInputElement).value;
        var beneName = (document.getElementById("beneName") as HTMLInputElement).value;
        var beneMobile = (document.getElementById("beneMobile") as HTMLInputElement).value;
        var beneMail = (document.getElementById("beneMail") as HTMLInputElement).value;
        if (!this.ifscMatch.test(ifscCode)) {
            this.accountMessage = "Please enter valid IFSCCODE";
            (document.getElementById("ifscCode") as HTMLInputElement).value = "";
            return;
        } else if (!this.phoneMatch.test(beneMobile)) {
            this.accountMessage = "Please enter valid Mobile";
            (document.getElementById("beneMobile") as HTMLInputElement).value = "";
            return;
        } else if (!this.emailMatch.test(beneMail)) {
            this.accountMessage = "Please enter valid email Id";
            (document.getElementById("beneMail") as HTMLInputElement).value = "";
            return;
        } else {
            this.accountMessage = "";
        }
        if (bankName == undefined || bankName == null || bankName == '') {
            this.accountMessage = "Please enter Bank Name";
        } else if (accountNo == undefined || accountNo == null || accountNo == '') {
            this.accountMessage = "please enter Bank Account No";
        } else if (accountType == undefined || accountType == null || accountType == '') {
            this.accountMessage = "Please enter Bank Account Type", false;
        } else if (ifscCode == undefined || ifscCode == null || ifscCode == '') {
            this.accountMessage = "Please enter IFSC Code";
        } else if (beneId == undefined || beneId == null || beneId == '') {
            this.accountMessage = "please enter Beneficiary Id";
        } else if (beneName == undefined || beneName == null || beneName == '') {
            this.accountMessage = "please enter Beneficiary Name";
        } else if (beneMobile == undefined || beneMobile == null || beneMobile == '') {
            this.accountMessage = "please enter Beneficiary Mobile";
        } else if (beneMail == undefined || beneMail == null || beneMail == '') {
            this.accountMessage = "please enter Beneficiary Mail";
        }else {
            this.accountMessage = "";
            ifscCode = ifscCode.toUpperCase();
            const data = {
                loanId: this.loanid,
                orgId: this.orgId,
                stackHolderType: this.stackHolderType,
                bankName: bankName,
                accountNo: accountNo,
                accountType: accountType,
                ifscCode: ifscCode,
                status: status,
                userId: this.userId,
                curDate: curDate,
                beneId: beneId,
                beneName: beneName,
                beneMobile: beneMobile,
                beneMail: beneMail
            }
            console.log(data);
            this.apiService.saveBankDetails(data)
                .subscribe(data => {
                    if (data.status == 200) {
                        this.modalService.dismissAll();
                        this.ngOnInit();
                    } else {
                        this.modalService.dismissAll();
                        this.set.setOption("Sorry! We are not able to process your request currently, Please try again. If problem persists, Please contact Tech Support.", false);
                    }
                }, error => console.log(error));
        }
    }
    qrcode(content,upiId)
    {this.upiId=upiId;
        this.value = `upi://pay?pa=${this.upiId}&pn=FinAGG&mc=6211&tn=Finagg Pay&am=${this.totalAmountselected}&tn=&cu=INR`;
     //   this.value = `upi://pay?pa=${this.upiId}&pn=FinAGG&tr=123132REF"+moment().format('YYYYMMDDHHmmss')+"&tn=FinAGG Pay&am=${this.totalAmountselected}&cu=INR`;
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
           // this.qrgenerator();
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });  
    }

  printer() {

    var imgWidth = 104.14;
    var pageHeight = 200;
    var imgHeight = 147.32;
    var heightLeft = imgHeight;
    var data = document.getElementById('qrcodecontent');
    html2canvas(data,).then(canvas => {
      // Few necessary setting options
      console.log("green goblin");
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a6'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
 
        pdf.save(this.upiId+".pdf");
  
      
  
      this.qrgenerator();
    });
  }
    qrgenerator() {
       
      console.log("qr code is called");
      this.value = `upi://pay?pa=${this.upiId}&pn=FinAGG&mc=6211&tn=Finagg Pay&am=${this.totalAmountselected}&tn=&cu=INR`;
       // this.value='www.google.com'
       //  this.value = `upi://pay?pa=${this.upiId}&pn=FinAGG&tr=123132REF"+moment().format('YYYYMMDDHHmmss')+"&tn=FinAGG Pay&am=${this.totalAmountselected}&cu=INR`;
       
       //   this.printer();
    
      }
    BankDetails(content, stackHolderType) {
        this.stackHolderType = stackHolderType;
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    editBankDetailspop(content, stackHolderType) {
        // this.stackHolderType=stackHolderType;
        this.editstackHolderType = stackHolderType;
        if (stackHolderType == 101) {
            this.list = this.borrowerDetails;
        }
        else if (stackHolderType == 102) {
            this.list = this.BorrowerVirtualAccountOutgoing;
        }
        else if (stackHolderType == 103) {
            this.list = this.BorrowerVirtualAccountIncoming;
        }
        else if (stackHolderType == 108) {
            this.list = this.escrowToBeneficiary;
        }
        else if (stackHolderType == 105) {
            this.list = this.Lender;
        }
        else if (stackHolderType == 106) {
            this.list = this.FinAgg;
        }
        else if (stackHolderType == 107) {
            this.list = this.escrow;
        }
        else if (stackHolderType == 109) {
            this.list = this.borrowerUPI;
        }
        console.log(this.list);
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.refresh();
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.refresh();
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });


    }
    refresh() {
        this.apiService.getAccountTabDetails(this.loanid, this.gemId)
            .subscribe(data => {
                if (data.status == 200) {
                    this.borrowerDetails = data.result.borrowerDetails;
                    this.BorrowerVirtualAccountOutgoing = data.result.BorrowerVirtualAccountOutgoing;
                    this.BorrowerVirtualAccountIncoming = data.result.BorrowerVirtualAccountIncoming;
                    this.FinAgg = data.result.FinAgg;
                    this.Beneficiary = data.result.Beneficiary;
                    this.Lender = data.result.Lender;
                    this.escrow = data.result.escrowArray;
                    this.escrowToBeneficiary = data.result.escrowToBeneficiaryArray;
                    this.borrowerUPI = data.result.borrowerUPIArray;

                    if (this.borrowerDetails.length == 0) {
                        this.borrowerAddButton = true;
                    } else {
                        this.borrowerAddButton = false;
                    }
                    if (this.BorrowerVirtualAccountOutgoing.length == 0) {
                        this.BorrowerOutAddButton = true;
                    } else {
                        this.BorrowerOutAddButton = false;
                    }
                    if (this.BorrowerVirtualAccountIncoming.length == 0) {
                        this.BorrowerInAddButton = true;
                    } else {
                        this.BorrowerInAddButton = false;
                    }

                    if (this.Beneficiary.length == 0) {
                        this.BeneficiaryAddButton = true;
                    } else {
                        this.BeneficiaryAddButton = false;
                    }

                    if (this.Lender.length == 0) {
                        this.LenderAddButton = true;
                    } else {
                        this.LenderAddButton = false;
                    }

                    if (this.escrow.length == 0) {
                        this.escrowAddButton = true;
                    } else {
                        this.escrowAddButton = false;
                    }

                    if (this.escrowToBeneficiary.length == 0) {
                        this.escrowToBeneficiaryAddButton = true;
                    } else {
                        this.escrowToBeneficiaryAddButton = false;
                    }

                    if (this.borrowerUPI.length == 0) {
                        this.borrowerUPIAddButton = true;
                    } else {
                        this.borrowerUPIAddButton = false;
                    }


                    if (this.FinAgg.length == 0) {
                        this.FinAggAddButton = true;
                    } else {
                        this.FinAggAddButton = false;
                    }

                } else {

                    alert(data.exceptionMessage);
                }
            }, error => console.log(error));
    }
    showSchedule(content, loanDisbursalId: any) {
        this.apiService.getLoanEmiSchedule(this.loanid, loanDisbursalId)
            .subscribe(data => {
                this.LoanEmiSchedule = data.result;
            }, error => console.log(error));
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

    muteCondition(content, sum: any) {
        this.muteDetails = sum;
        this.modalService.open(content, { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }


    muteConditionUpdate(muteConditionid: Number, entity: any) {
        if (this.muteRemarks == null || this.muteRemarks == undefined || this.muteRemarks == '') {
            this.errorMsg = "Please Enter Remarks";
        } else {
            const data = {
                id: muteConditionid,
                loanid: this.loanid,
                Remarks: this.muteRemarks,
                userId: this.userId,
                curDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            };
            this.apiService.muteCondition(data).subscribe(data => {
                if (data.status == 200) {
                    this.set.setOption(data.exceptionMessage, true);
                    this.modalService.dismissAll();
                    if (data.result.status == true) {
                        if (entity == "MerchantAnalysisData") {
                            const data1 = {
                                loanId: this.loanid
                            }
                            this.apiService.updateActivityId(data1).subscribe(data => { });
                        }
                        this.statusPopup(this.statusChangePopup);
                    } else {
                        this.apiService.getSummaryDetails(this.id, this.loanid, this.gemId).subscribe(data => {
                            this.SummaryDetails = data.result;
                        }, error => console.log(error));
                    }
                    this.muteRemarks = "";
                }
                else {
                    this.set.setOption("Please Contact Support Team", false);
                    // alert("Please Contact Support Team");
                }
            }, error => console.log(error));
        }
    }
    statusPopup(content) {
        this.errorMsg = "";
        this.modalService.open(content, { size: 'lg', centered: true, backdrop: 'static', keyboard: false }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    UpdateStatus() {
        if (this.stausId == this.oldstausId && this.substatusId == this.oldsubstatusId) {
            // this.set.setOption("Should not allow to update some status",false)
            this.errorMsg = "Same status cannot be updated";
        } else if (this.stausId == 0 || this.substatusId == 0) {
            // this.set.setOption("Please select the status",false)
            this.errorMsg = "Please select the status";
        } else {
            const data = {
                remark: this.remark,
                statusid: Number(this.stausId),
                substatusid: Number(this.substatusId),
                loanid: Number(this.loanid),
                userId: this.userId,
                lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
                currentActivityId: "25",
                retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
                userMedium: "backendApp",
                mobileNo: this.mobileNo
            };
            this.apiService.updateLoanStaus(data)
                .subscribe(data => {
                    if (data.status == 200) {
                        this.modalService.dismissAll();
                        this.set.setOption("Status Updated Successfully", true);
                        // this.errorMsg=data.exceptionMessage;
                        this.apiService.getSummaryDetails(this.id, this.loanid, this.gemId).subscribe(data => {
                            this.SummaryDetails = data.result;
                        }, error => console.log(error));
                    } else {
                        // this.set.setOption(data.exceptionMessage,false)
                        this.errorMsg = data.exceptionMessage;
                        // alert(data.exceptionMessage);
                    }
                }, error => console.log(error));
        }
    }
    isNullorUndefinedorEmpty(str) {
        return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
    }
    editBankDetails() {
        this.message = '';
        if (!this.ifscMatch.test(this.list[0].ifscCode)) {
            this.message = "Please enter a valid IFSCCODE";
            // this.list[0].ifscCode = "";
            return;
        } else if (!this.phoneMatch.test(this.list[0].beneMobile)) {
            this.message = "Please enter a valid Mobile Number";
            // this.list[0].beneMobile = "";
            return;
            //    }
            //    else if(this.verifyEmail(this.list[0].beneMail)) 
            //    {
            //        this.message = "Please enter a valid email id";
            //        // this.list[0].beneMobile = "";
            //        return;
        } else if (!this.emailMatch.test(this.list[0].beneMail)) {
            this.message = "Please enter a valid email id";
            // this.list[0].beneMobile = "";
            return;
        } else {
            this.message = "";
        }
        if ((this.isNullorUndefinedorEmpty(this.list[0].bankId)) || (this.isNullorUndefinedorEmpty(this.list[0].accTypeId)) || (this.isNullorUndefinedorEmpty(this.list[0].accountNo)) || (this.isNullorUndefinedorEmpty(this.list[0].ifscCode))) {
            this.message = "Mandatory to fill";
            return;
        }
        var bankName1 = '';
        var bankName = '';
        for (var a = 0; a < this.bankName.length; a++) {
            if (this.list[0].bankId == this.bankName[a].bankId) {
                bankName1 = this.bankName[a].bankName;
                bankName = bankName1;
                //    bankName = this.list[0].bankId+'~'+bankName1;
            }
        }

        var accountType1 = '';
        var accountType = '';
        for (var a = 0; a < this.accTypeList.length; a++) {
            if (this.list[0].accTypeId == this.accTypeList[a].accId) {
                accountType1 = this.accTypeList[a].accName;
                //    accountType = this.list[0].accTypeId+'~'+accountType1;
                accountType = accountType1;
            }
        }
        if (this.isNullorUndefinedorEmpty(this.list[0].beneId) || this.isNullorUndefinedorEmpty(this.list[0].beneId)) {
            this.list[0].beneId = '';
        }
        var ifscCode = this.list[0].ifscCode.toUpperCase();
        const bankDetails = {
            loanId: this.loanid,
            orgId: this.orgId,
            stackHolderType: this.editstackHolderType.toString(),
            bankId: this.list[0].bankId,
            accountNo: this.list[0].accountNo,
            accountType: accountType,
            ifscCode: ifscCode,
            beneId: this.list[0].beneId,
            bankName: bankName,
            accountTypeId: this.list[0].accTypeId,
            userId: this.userId,
            beneName: this.list[0].beneName,
            beneMobile: this.list[0].beneMobile,
            beneMail: this.list[0].beneMail
        }
        // console.log(data);
        // var data1 =  [ {bankDetails:  bankDetails}];
        // // data1.push(bankDetails);
        console.log(bankDetails);
        this.apiService.editAccountTabDetails(bankDetails).subscribe(
            data => {
                if (data.status == 200) {
                    this.set.setOption("Updated successfully", true);
                    this.modalService.dismissAll();
                    this.ngOnInit();
                } else {
                    this.modalService.dismissAll();
                    this.set.setOption("Failed to update", false);
                }
            }
        )
    }

    charge(a) {
        this.loandisid = a;
        this.apiService.getloandisbursalcharges(a).subscribe(data => {
            if (data.status == 200) {
                if (data.exceptionOccured == 'N') {
                    this.chargeInfo = data.result.charges;
                    this.loanDisbursalAmt = data.result.loanDisbursalAmt;
                    for (let a of this.chargeInfo) {
                        a.mark = false;
                        a.chgst = 0;
                    }
                    this.screen = 1;
                } else {
                    this.set.setOption(data.exceptionMessage, false);
                }
            } else {
                this.set.setOption(data.exceptionMessage, false);
            }
        }, error => console.log(error));
    }

    backtoloandisbursal() {
        this.screen = 0;
    }

    setC(a) {
        if (a.charge != '') {
            a.mark = true;
            var b = (Number(a.gst) / 100) * Number(a.charge);
            a.chgst = b + Number(a.charge);
        } else {
            a.mark = false;
            a.chgst = 0;
        }
    }

    editcharge() {
        var list = [];
        for (let a of this.chargeInfo) {
            if (a.mark == true) {
                var check;
                if (a.chargedType == 1) {
                    check = a.minCharge;
                } else {
                    check = Number(this.loanDisbursalAmt) * (Number(a.minCharge) / 100);
                }
                if (Number(a.charge) >= Number(check)) {
                    const obj = {
                        chargeId: a.chargeId,
                        chargeValue: a.chgst,
                        chargeName: a.chargeName
                    }
                    list.push(obj);
                } else {
                    this.set.setOption(`Charge is lesser than its Minimum Charge`, false);
                    return;
                }
            }
        }
        if (list.length == 0) {
            this.set.setOption("Please make sure you checked the box before saving.", false);
            return;
        }
        const obj = {
            userId: this.userId,
            loanDisbursalId: this.loandisid,
            loanRequestId: this.loanid,
            charges: list
        }
        this.apiService.adddisbursalothercharges(obj).subscribe(data => {
            if (data.status == 200) {
                if (data.exceptionOccured == 'N') {
                    this.set.setOption(data.result, true);
                    this.ngOnInit();
                } else {
                    this.set.setOption(data.exceptionMessage, false);
                }
            } else {
                this.set.setOption(data.exceptionMessage, false);
            }
        }, error => console.log(error));
    }

    waive(a) {
        this.loandisid = a;
        this.apiService.getdisbursalchargesfordiscount(a).subscribe(data => {
            if (data.status == 200) {
                if (data.exceptionOccured == 'N') {
                    this.waiveInfo = data.result.charges;
                    for (let a of this.waiveInfo) {
                        a.discountValue = '';
                        a.discountId = '';
                        a.discountName = '';
                        a.mark = false;
                    }
                    this.screen = 2;
                } else {
                    this.set.setOption(data.exceptionMessage, false);
                }
            } else {
                this.set.setOption(data.exceptionMessage, false);
            }
        }, error => console.log(error));
    }

    editdiscount() {
        var list = [];
        for (let a of this.waiveInfo) {
            if (a.mark == true) {
                if (a.discountValue != '' && a.discountId != '' && a.discountId != null && a.discountValue != null) {
                    list.push(a);
                } else {
                    this.set.setOption("Enter the fields", false);
                    return;
                }
            }
        }
        if (list.length == 0) {
            this.set.setOption("Please make sure you checked the box before saving.", false);
            return;
        }
        const obj = {
            userId: this.userId,
            loanRequestId: this.loanid,
            loanDisbursalId: this.loandisid,
            charges: list
        }
        this.apiService.adddisbursaldiscount(obj).subscribe(data => {
            if (data.status == 200) {
                if (data.exceptionOccured == 'N') {
                    this.set.setOption(data.result, true);
                    this.ngOnInit();
                } else {
                    this.set.setOption(data.exceptionMessage, false);
                }
            } else {
                this.set.setOption(data.exceptionMessage, false);
            }
        }, error => console.log(error));
    }

    setW(a) {
        if (a.discountValue != '') {
            a.mark = true;
        } else {
            a.mark = false;
        }
    }

    setDiscountName(b) {
        for (let a of this.discountList) {
            if (a.discountId == b.discountId) {
                b.discountName = a.discountName;
                b.mark = true;
            }
        }
    }

    tab: boolean = false;
    toggle() {
        this.tab = !this.tab;
    }

    tabIndex: any = 0;
    tabSwitch(a) {

        switch (a) {
            case 0:
                this.apiService.businessSummaryDetails(this.orgId).subscribe(data => {
                    this.businessSummaryDetails = data.result;
                }, error => console.log(error));
                this.apiService.bankSummaryDetails(this.loanid).subscribe(data => {
                    this.bankSummaryDetails = data.result;
                }, error => console.log(error));
                this.apiService.brandSummaryDetails(this.orgId, this.loanid).subscribe(data => {
                    this.brandSummaryDetails = data.result;
                }, error => console.log(error));
                break;
            case 1:
                this.apiService.gstTurnover(this.orgId)
                    .subscribe(data => {
                        console.log("data==" + JSON.stringify(data));
                        this.turnOverInLast15Months = data.result.turnOverInLast12Months;
                        this.turnOverInLast12Months = data.result.turnOverInLast12Months;
                        this.avgMonthlyTurnover = data.result.avgMonthlyTurnover;
                        this.turnOverTillApril = data.result.turnOverInLast12Months;
                        this.percentageGrowth = data.result.percentageGrowth;
                        this.GSTturnoverDetails = data.result.turnOverData;
                        var gstAmount: Array<any> = [];
                        var date: Array<any> = [];
                        for (let g2 of this.GSTturnoverDetails) {
                            gstAmount.push(g2.value);
                            date.push(g2.monYear);
                        }
                        this.highcharts18a = Highcharts;
                        this.chartOptions18a = {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'GST Summary'
                            },
                            xAxis: {
                                categories: date,
                                crosshair: true
                            }, credits: {
                                enabled: false
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: ''
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y} </b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            }, colors: ['#1589FF'],
                            series: [{
                                name: 'GST Amount',
                                data: gstAmount
                            }]
                        };
                    }, error => console.log(error));
                this.apiService.gstTurnoverQuarterwise(this.orgId)
                    .subscribe(data => {
                        this.gstTurnoverQuarterwise = data.result;
                        var quarter1: Array<any> = [];
                        var quarter2: Array<any> = [];
                        var quarter3: Array<any> = [];
                        var quarter4: Array<any> = [];
                        var date: Array<any> = [];

                        for (let fy of this.gstTurnoverQuarterwise) {
                            date.push(fy.financialYear);
                            for (let qd of fy.quarterData) {
                                if (qd.quarterName == 'Q1') {
                                    quarter1.push(qd.totalSales);
                                } else if (qd.quarterName == 'Q2') {
                                    quarter2.push(qd.totalSales);
                                } else if (qd.quarterName == 'Q3') {
                                    quarter3.push(qd.totalSales);
                                } else if (qd.quarterName == 'Q4') {
                                    quarter4.push(qd.totalSales);
                                }

                            }
                        }
                        this.highcharts1a = Highcharts;
                        this.chartOptions1a = {
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: 'Quarter wise Sales'
                            },
                            xAxis: {
                                categories: date
                            }, credits: {
                                enabled: false
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: ''
                                }
                            },
                            legend: {
                                reversed: true
                            },
                            plotOptions: {
                                series: {
                                    stacking: 'normal'
                                }
                            },
                            colors: ['#F4B849', '#E59D16', '#BE861C', '#845A0B'],
                            series: [{
                                name: 'Q1',
                                data: quarter1
                            }, {
                                name: 'Q2',
                                data: quarter2
                            }, {
                                name: 'Q3',
                                data: quarter3
                            }, {
                                name: 'Q4',
                                data: quarter4
                            }]
                        };
                    }, error => console.log(error));
                this.apiService.bankCreditQuarter(this.orgId)
                    .subscribe(data => {
                        this.bankCreditQuarter = data.result;
                        var quarter1: Array<any> = [];
                        var quarter2: Array<any> = [];
                        var quarter3: Array<any> = [];
                        var quarter4: Array<any> = [];
                        var date: Array<any> = [];
                        for (let fy of this.bankCreditQuarter) {
                            date.push(fy.financialYear);
                            for (let qd of fy.quarterData) {
                                if (qd.quarterName == 'Q1') {
                                    quarter1.push(qd.totalSales);
                                } else if (qd.quarterName == 'Q2') {
                                    quarter2.push(qd.totalSales);
                                } else if (qd.quarterName == 'Q3') {
                                    quarter3.push(qd.totalSales);
                                } else if (qd.quarterName == 'Q4') {
                                    quarter4.push(qd.totalSales);
                                }

                            }
                        }
                        this.highcharts2a = Highcharts;
                        this.chartOptions2a = {
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: 'Quarter wise '
                            },
                            xAxis: {
                                categories: date
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: ''
                                }
                            }, credits: {
                                enabled: false
                            },
                            legend: {
                                reversed: true
                            },
                            plotOptions: {
                                series: {
                                    stacking: 'normal'
                                }
                            },
                            colors: ['#F4B849', '#E59D16', '#BE861C', '#845A0B'],
                            series: [{
                                name: 'Q1',
                                data: quarter1
                            }, {
                                name: 'Q2',
                                data: quarter2
                            }, {
                                name: 'Q3',
                                data: quarter3
                            }, {
                                name: 'Q4',
                                data: quarter4
                            }]
                        };
                    }, error => console.log(error));
                this.apiService.gstNewBankTurnoverList(this.orgId).subscribe(data => {
                    this.gstBankTurnoverDetails3 = data.result;
                    var gstamt: Array<any> = [];
                    var bankamt: Array<any> = [];
                    var period: Array<any> = [];
                    for (let gb of this.gstBankTurnoverDetails3) {
                        gstamt.push(gb.gst);
                        bankamt.push(gb.bank);
                        period.push(gb.month);
                    }
                    this.highcharts17a = Highcharts;
                    this.chartOptions17a = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Turnover / BTO'
                        },
                        xAxis: {
                            categories: period,
                            crosshair: true
                        }, credits: {
                            enabled: false
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: ''
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y} </b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        }, colors: [' #54C571', '#1589FF'],
                        series: [{
                            name: 'GST',
                            data: gstamt
                        }, {
                            name: 'Bank',
                            data: bankamt
                        }]
                    };
                }, error => console.log(error));
                this.apiService.salesPurchaseRatioDetails(this.orgId).subscribe(data => {
                    this.salesPurchaseRatioDetails1 = data.result;
                    var month: Array<any> = [];
                    var sale: Array<any> = [];
                    var purchase: Array<any> = [];
                    var ratio: Array<any> = [];
                    for (let sp of this.salesPurchaseRatioDetails1) {
                        month.push(sp.month);
                        sale.push(sp.sale);
                        purchase.push(sp.purchase);
                        ratio.push(sp.ratio);
                    }
                    this.highcharts16a = Highcharts;
                    this.chartOptions16a = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Sales Purchase Ratio'
                        },
                        xAxis: {
                            categories: month,
                            crosshair: true
                        }, credits: {
                            enabled: false
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: ''
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y} </b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        }, colors: [' #54C571', '#1589FF'],
                        series: [{
                            name: 'Sales',
                            data: sale
                        }, {
                            name: 'Purchase',
                            data: purchase
                        }]
                    };
                }, error => console.log(error));
                this.apiService.getSaleData(this.orgId).subscribe(data => {
                    this.salesData = data.result;
                    this.highcharts4a = Highcharts;
                    this.chartOptions4a = {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        }, credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Sales Data'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        accessibility: {
                            point: {
                                valueSuffix: '%'
                            }
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        }, colors: [' #54C571', '#1589FF', '#736F6E', '#FDD017', '#FF5733'],
                        series: [{
                            name: 'value',
                            colorByPoint: true,
                            data: this.salesData
                        }]
                    };

                }, error => console.log(error));
                this.apiService.gstNewBankTurnoverList(this.orgId).subscribe(data => {
                    this.gstBankTurnoverDetails3 = data.result;
                    var gstamt: Array<any> = [];
                    var bankamt: Array<any> = [];
                    var period: Array<any> = [];
                    for (let gb of this.gstBankTurnoverDetails3) {
                        gstamt.push(gb.gst);
                        bankamt.push(gb.bank);
                        period.push(gb.month);
                    }
                    this.highcharts17a = Highcharts;
                    this.chartOptions17a = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Turnover / BTO'
                        },
                        xAxis: {
                            categories: period,
                            crosshair: true
                        }, credits: {
                            enabled: false
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: ''
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y} </b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        }, colors: [' #54C571', '#1589FF'],
                        series: [{
                            name: 'GST',
                            data: gstamt
                        }, {
                            name: 'Bank',
                            data: bankamt
                        }]
                    };
                }, error => console.log(error));
                break;
            case 2:
                this.apiService.getCustomerBankMergedDetails(this.id, this.loanid)
                    .subscribe(data => {
                        this.CustomerBankMergedDetails = data.result;

                        console.log("CustomerBankMergedDetails===" + JSON.stringify(this.CustomerBankMergedDetails));
                    }, error => console.log(error));
                this.apiService.topCustomers(this.orgId).subscribe(data => {
                    this.topCustomers = data.result;
                }, error => console.log(error));
                this.apiService.getLoanMonthAvailable(this.id, this.loanid)
                    .subscribe(data => {
                        this.LoanMonthAvailable = data.result;
                    }, error => console.log(error));
                break;
            case 3:

                break;
            case 4:
                break;
            case 5:
                this.apiService.getLoanRequestById(this.id, this.loanid)
                    .subscribe(data => {
                        this.LoanRequestById = data.result;
                        for (let inv of data.result) {
                            this.highcharts20a = Highcharts;
                            this.chartOptions20a = {
                                chart: {
                                    type: 'bar'
                                },
                                title: {
                                    text: ''
                                },
                                subtitle: {
                                    text: ''
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'left',
                                    verticalAlign: 'top',
                                    x: 250,
                                    y: 100,
                                    floating: true,
                                    borderWidth: 1,

                                    backgroundColor: ('#FFFFFF'), shadow: true
                                },
                                xAxis: {
                                    categories: ['cc Score'], title: {
                                        text: null,
                                        visible: false
                                    }
                                },
                                yAxis: {
                                    min: 0, title: {
                                        text: '', align: 'high'
                                    },
                                    labels: {
                                        overflow: 'justify'
                                    },
                                    visible: false
                                },
                                tooltip: {
                                    valueSuffix: ' '
                                },
                                plotOptions: {
                                    bar: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                series: [
                                    {
                                        name: 'Cibil',
                                        data: [inv.cibil]
                                    },

                                ]
                            };
                        }
                        console.log("LoanRequestById===" + JSON.stringify(this.LoanRequestById));
                    }, error => console.log(error));
                this.apiService.getSummaryDetails(this.id, this.loanid, this.gemId)
                    .subscribe(data => {
                        this.SummaryDetails = data.result;
                    }, error => console.log(error));
                this.apiService.getBrandDataList(this.loanid).subscribe(data => {
                    if (data.status == 200) {
                        this.brandData = data.result
                    } else {
                        this.set.setOption(data.exceptionMessage, false);
                    }
                }, error => console.log(error));
                break;
            case 6:
                this.apiService.getBrandDataList(this.loanid).subscribe(data => {
                    if (data.status == 200) {
                        this.brandData = data.result
                    } else {
                        this.set.setOption(data.exceptionMessage, false);
                    }
                }, error => console.log(error));
                break;
            case 7:
                this.apiService.getDisbursalDetails(this.id, this.loanid)
                    .subscribe(data => {
                        this.disbursalData = data.result;
                    }, error => console.log(error));
                this.apiService.getLoanHeaderDetails(this.loanid)
                    .subscribe(data => {
                        this.programTypeId = data.result[0].programTypeId;
                        this.apiService.getDisbursalInvoiceDetails(this.id, this.loanid, this.programTypeId,0)
                            .subscribe(data => {
                                this.disbursalInvoiceData = data.result;
                                for (let d of this.disbursalInvoiceData) {
                                    if (d.invoice_no.split(",").length == 0) {
                                        this.invoiceList.push(d.invoice_no)
                                    } else {
                                        this.invoiceList.push(d.invoice_no.split(","));
                                    }
                                    if (d.invoice_date.split(",").length == 0) {
                                        this.invoiceDateList.push(d.invoice_date)
                                    } else {
                                        this.invoiceDateList.push(d.invoice_date.split(","));
                                    }
                                }
                                this.monitorLimitAmount = 0;
                                this.monitorAvailableLimit = 0;
                                this.monitorUtilisedAmount = 0;
                                for (let dd of this.disbursalInvoiceData) {
                                    this.monitorLimitAmount = dd.creditlimit;
                                    this.monitorAvailableLimit = dd.availableLimit;
                                    this.monitorUtilisedAmount = (this.monitorLimitAmount - this.monitorAvailableLimit).toFixed(2);
                                }
                            }, error => console.log(error));
                    }, error => console.log(error));
                break;
            case 8:
                this.apiService.brandSummaryDetails(this.orgId, this.loanid).subscribe(data => {
                    this.brandSummaryDetails = data.result;
                }, error => console.log(error));
                break;
            case 9:
                this.apiService.brandSummaryDetails(this.orgId, this.loanid).subscribe(data => {
                    this.brandSummaryDetails = data.result;
                }, error => console.log(error));
                this.apiService.retailerFinanceSubLimit(this.loanid, this.programTypeId).subscribe(data => {
                    this.retailerFinanceSubLimit = data.result;
                    for (let r of this.retailerFinanceSubLimit) {
                        if (r.parameter1 == 'maxlimit') {
                            this.maxlimit = r.resultValue;
                        } else if (r.parameter1 == 'creditPeriodAt90Days') {
                            this.creditPeriodAt90Days = r.resultValue;
                        } else if (r.parameter1 == 'preApprovalLimit') {
                            this.preApprovalLimit = r.resultValue;
                        } else if (r.parameter1 == 'approvalLimit') {
                            this.approvalLimit = r.resultValue;
                        }
                    }
                }, error => console.log(error));
                break;
            case 10:
                if (this.programTypeId == this.gemProgramTypeId) {
                    this.apiService.gemFinanceSubLimit(this.loanid, this.gemId).subscribe(data => {
                        this.financeSubLimit = data.result;
                        this.registeredAmount = data.result.requestedAmount;
                        this.offeredAmount = data.result.offerAmount;
                        this.roi = data.result.roi;
                        this.tenure = data.result.tenure;
                        this.interestAmount = data.result.interestAmount;
                    }, error => console.log(error));
                } else {
                    this.apiService.sellerFinanceSubLimit(this.loanid, this.programTypeId).subscribe(data => {
                        this.sellerFinanceSubLimit = data.result;
                    }, error => console.log(error));
                }
                this.apiService.getDisbursalDetails(this.id, this.loanid)
                    .subscribe(data => {
                        this.disbursalData = data.result;
                    }, error => console.log(error));
                break;
            case 11:
                this.apiService.getDisbursalDetails(this.id, this.loanid)
                    .subscribe(data => {
                        this.disbursalData = data.result;
                    }, error => console.log(error));
                this.apiService.getLoanHeaderDetails(this.loanid)
                    .subscribe(data => {
                        this.programTypeId = data.result[0].programTypeId;
                        this.apiService.getDisbursalInvoiceDetails(this.id, this.loanid, this.programTypeId,0)
                            .subscribe(data => {
                                this.disbursalInvoiceData = data.result;
                                for (let d of this.disbursalInvoiceData) {
                                    if (d.invoice_no.split(",").length == 0) {
                                        this.invoiceList.push(d.invoice_no)
                                    } else {
                                        this.invoiceList.push(d.invoice_no.split(","));
                                    }
                                    if (d.invoice_date.split(",").length == 0) {
                                        this.invoiceDateList.push(d.invoice_date)
                                    } else {
                                        this.invoiceDateList.push(d.invoice_date.split(","));
                                    }
                                }
                                this.monitorLimitAmount = 0;
                                this.monitorAvailableLimit = 0;
                                this.monitorUtilisedAmount = 0;
                                for (let dd of this.disbursalInvoiceData) {
                                    this.monitorLimitAmount = dd.creditlimit;
                                    this.monitorAvailableLimit = dd.availableLimit;
                                    this.monitorUtilisedAmount = (this.monitorLimitAmount - this.monitorAvailableLimit).toFixed(2);
                                }
                            }, error => console.log(error));
                    }, error => console.log(error));
                break;
            case 12:
                this.apiService.getDisbursalDetails(this.id, this.loanid)
                    .subscribe(data => {
                        this.disbursalData = data.result;
                    }, error => console.log(error));
                this.apiService.getLoanHeaderDetails(this.loanid)
                    .subscribe(data => {
                        this.programTypeId = data.result[0].programTypeId;
                        this.apiService.getDisbursalInvoiceDetails(this.id, this.loanid, this.programTypeId,0)
                            .subscribe(data => {
                                this.disbursalInvoiceData = data.result;
                                for (let d of this.disbursalInvoiceData) {
                                    if (d.invoice_no.split(",").length == 0) {
                                        this.invoiceList.push(d.invoice_no)
                                    } else {
                                        this.invoiceList.push(d.invoice_no.split(","));
                                    }
                                    if (d.invoice_date.split(",").length == 0) {
                                        this.invoiceDateList.push(d.invoice_date)
                                    } else {
                                        this.invoiceDateList.push(d.invoice_date.split(","));
                                    }
                                }
                                this.monitorLimitAmount = 0;
                                this.monitorAvailableLimit = 0;
                                this.monitorUtilisedAmount = 0;
                                for (let dd of this.disbursalInvoiceData) {
                                    this.monitorLimitAmount = dd.creditlimit;
                                    this.monitorAvailableLimit = dd.availableLimit;
                                    this.monitorUtilisedAmount = (this.monitorLimitAmount - this.monitorAvailableLimit).toFixed(2);
                                }
                            }, error => console.log(error));
                    }, error => console.log(error));
                break;
            case 13:
                this.apiService.getBankNameList().subscribe(res => this.bankName = res.result);
                this.apiService.getAccountTypeList().subscribe(data => {
                    this.accTypeList = data.result;
                }, error => console.log(error));
                this.apiService.getAccountTabDetails(this.loanid, this.gemId)
                    .subscribe(data => {
                        if (data.status == 200) {
                            this.borrowerDetails = data.result.borrowerDetails;
                            this.BorrowerVirtualAccountOutgoing = data.result.BorrowerVirtualAccountOutgoing;
                            this.BorrowerVirtualAccountIncoming = data.result.BorrowerVirtualAccountIncoming;
                            this.FinAgg = data.result.FinAgg;
                            this.Beneficiary = data.result.Beneficiary;
                            this.Lender = data.result.Lender;
                            this.escrow = data.result.escrowArray;
                            this.escrowToBeneficiary = data.result.escrowToBeneficiaryArray;

                            this.borrowerUPI = data.result.borrowerUPIArray;
                            if (this.borrowerDetails.length == 0) {
                                this.borrowerAddButton = true;
                            } else {
                                this.borrowerDetailMail = [];
                                this.split(this.borrowerDetails, this.borrowerDetailMail);
                                this.borrowerAddButton = false;
                            }
                            if (this.BorrowerVirtualAccountOutgoing.length == 0) {
                                this.BorrowerOutAddButton = true;
                            } else {
                                this.BorrowerVirtualAccountOutgoingMail = [];
                                this.split(this.BorrowerVirtualAccountOutgoing, this.BorrowerVirtualAccountOutgoingMail);
                                this.BorrowerOutAddButton = false;
                            }
                            if (this.BorrowerVirtualAccountIncoming.length == 0) {
                                this.BorrowerInAddButton = true;
                            } else {
                                this.BorrowerVirtualAccountIncomingMail = [];
                                this.split(this.BorrowerVirtualAccountIncoming, this.BorrowerVirtualAccountIncomingMail);
                                this.BorrowerInAddButton = false;
                            }

                            if (this.Beneficiary.length == 0) {
                                this.BeneficiaryAddButton = true;
                            } else {
                                this.BeneficiaryAddButton = false;
                            }

                            if (this.Lender.length == 0) {
                                this.LenderAddButton = true;
                            } else {
                                this.LenderMail = [];
                                this.split(this.Lender, this.LenderMail);
                                this.LenderAddButton = false;
                            }

                            if (this.escrow.length == 0) {
                                this.escrowAddButton = true;
                            } else {
                                this.escrowMail = [];
                                this.split(this.escrow, this.escrowMail);
                                this.escrowAddButton = false;
                            }

                            if (this.escrowToBeneficiary.length == 0) {
                                this.escrowToBeneficiaryAddButton = true;
                            } else {
                                this.escrowToBeneficiaryMail = [];
                                this.split(this.escrowToBeneficiary, this.escrowToBeneficiaryMail);
                                this.escrowToBeneficiaryAddButton = false;
                            }

                            if (this.borrowerUPI.length == 0) {
                                this.borrowerUPIAddButton = true;
                            } else {
                                this.borrowerUPIMail = [];
                                this.split(this.borrowerUPI, this.borrowerUPIMail);
                                this.borrowerUPIAddButton = false;
                            }


                            if (this.FinAgg.length == 0) {
                                this.FinAggAddButton = true;
                            } else {
                                this.FinAggMail = [];
                                this.split(this.FinAgg, this.FinAggMail);
                                this.FinAggAddButton = false;
                            }

                        } else {

                            alert(data.exceptionMessage);
                        }
                    }, error => console.log(error));
                break;
            case 14:
                this.apiService.getAnchorsFundingList(this.loanid)
                    .subscribe(data => {
                        this.anchorsFundingList = data.result;
                        if (this.anchorsFundingList.length <= 0) {
                            this.generateAnchorButton = false;
                            this.updateButton = true;
                        } else {
                            this.generateAnchorButton = true;
                            this.updateButton = false;
                        }
                    }, error => console.log(error));
                break;
            case 15:
                this.apiService.getcustomerdisbursallist(this.loanid).subscribe(data => {
                    if (data.status == 200) {
                        this.loandisbursallist = data.result;
                    } else {
                        console.log(data.exceptionMessage);
                    }
                }, error => console.log(error));
                this.apiService.getdiscountchargeslist().subscribe(data => {
                    if (data.status == 200) {
                        this.discountList = data.result;
                    }
                }, error => console.log(error));
                break;
                case 16:
                    this.apiService.getQRupiList(this.orgId)
                    .subscribe(data => {
                        if (data.status == 200) {
                        
                            this.borrowerUPI = data.result;}
                        else alert(data.exceptionMessage);
                    },error=>console.log(error));
                    break;
        }
        try {
            document.getElementById(`tab_${this.tabIndex}`).classList.remove('active');
        } catch {
            console.log("error");
        }
        this.tabIndex = a;
        document.getElementById('tab_' + a).classList.add('active');
    }
}
