import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from '../../shared/currency.service';
import { ExcelService } from '../../shared/excel.service';
import { PdfService } from '../../shared/pdf.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import {Crypto} from '../../shared/crypto.service';

export interface invoiceList {
  orgId: string;
  orgName: string;
   orgids:string;
  salesPersonName: string;
  totalInvoices: string;
  totalInvoiceAmount: string;
  totalPushed: string;
  totalPushedInvoiceAmount: string;
  totalPaidInvoiceAmount: string;
  regularPayInvoiceCount: string;
  finaggPayInvoiceCount: string;
  regularPayInvoiceAmount: string;
  finaggPayInvoiceAmount: string;
  outStandingInvoiceCount: string;
  outStandingInvoiceAmount: string;
  distTotalInvoices: string;
  distTotalInvoiceAmount: string;
  distOutStandingInvoiceCount: string;
  distOutStandingInvoiceAmount: string;
  finaggPayCashDiscountAmount: string;
  approvedAmount: String,
  approvedOn: String,
  availableAmount: String,
  repaymentInvoiceAmount: String,
  repaymentInvoice: String,
  salesPersonMobileNo: String,
  mobileNo: String,
  panNo: String,
  postAvailableAmount:string;
  excessAmount:string;
  UnFinancedInvoices:string;
  UnFinancedInvoiceAmount:string;
  TrancheOpenInvoices:string;
  TrancheOpenInvoiceAmount:string;
  TrancheRepayInvoices:string;
  TrancheRepayInvoiceAmount:string;
  TrancheFullyInvoices:string;
  TrancheFullyInvoiceAmount:string;
  overDueInvoices:string;
  overDueInvoiceAmount:string;
  anchorRefNo:string;
}

@Component({
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {
  subtitle: string;
  mtdPaidPB: any;
  mtdPendingPB: any;
  mtdTotalInvoices: any;
  mtdNewInvoicesAmount: any;
  mtdDisburesedInvoicesAmount: any;
  mtdDisburesedInvoices: any;
  mtdNewInvoices: any;
  orgIds:any;
  ytdPaidPB: any;
  ytdPendingPB: any;
  ytdNewInvoices: any;
  ytdTotalInvoices: any;
  ytdDisburesedInvoicesAmount: any;
  ytdDisburesedInvoices: any;
  ytdNewInvoicesAmount: any;
  newcomer:boolean=false;
  notOnboarded: any;
  approved: any;
  inProgress: any;
  rejected: any;
  closeResult: string;
  totalInvoiceList = [];
  totalPendingInvoiceList = [];
  totalPaidInvoiceList = [];
  inprogressRetailerList = [];
  approvedRetailerList = [];
  rejectedRetailerList = [];
  notOnboardedRetailerList = [];
  repaymentInvoiceList = [];
  retailerList = [];
  brandList = [];
  programList = [];
  dashboardBrandList = [];
  startDate: any;
  endDate: any;
  overDue: any;
  unfinancedInvoiceList=[];
  tranchOpenInvoiceList=[];
  tranchRepayInvoiceList=[];
  tranchFullyInvoiceList=[];
  overDueInvoiceList=[];
  brandId: any;
  programId: any;
  programName: any;
  brandName: any;
  roleId:any;
  invoiceListMSG: any;
  p:any;
  searchReportList:any;
  lenderId:any;
  showInvoiceListMSG: boolean = false;
  totaldInvoiceList: any;
  unfinancedInvoiceLaist: any;
  orgshow: any;
  invoiceLista: any;
  undfinancedInvoiceList: any;
  tranchOpendInvoiceList: any;
  tranchdRepayInvoiceList: any;
  tranchdFullyInvoiceList: any;
  overDuedInvoiceList: any;
  errormessage: any;
  showAnger: boolean=false;
  showAnger2: boolean =false;
  showAnger3: boolean = false;
  showAnger4: boolean =false;
  showAnger5: boolean =false;
  constructor(private apiService: ApiService, private router: Router, public excelservice: ExcelService, private modalService: NgbModal, public currency: Currency,
    public pdfservice: PdfService, private set: breadcrumbMessage,private crypto: Crypto) {
    this.subtitle = 'This is some text within a card block.';
  }
  invoiceList: invoiceList[] = [];
  orgId: any;

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  excel() {
    var list = [];
    var j = 1;
    for (let i of this.invoiceList) {
      const listObj = {
        'Sno': (j++),
        'Retailer': i.orgName,
        'Pan No': i.panNo,
        'mobile No': i.mobileNo,
        'Anchor Ref No':i.anchorRefNo,
        'Sales Person Name': i.salesPersonName,
        'Sales Person Mobile No': i.salesPersonMobileNo,
        'Approved Limit': i.approvedAmount,
        'Approved On': i.approvedOn,
        'Available Limit': i.availableAmount,
        'Post Available Limit':i.postAvailableAmount,
        'Excess Amount':i.excessAmount,
        'Total Invoices': i.totalInvoices,
        'Total Invoice Amount': i.totalInvoiceAmount,
        'UnFinanced Invoices':i.UnFinancedInvoices,
        'UnFinanced Invoices Amount':i.UnFinancedInvoiceAmount,
        'Tranche-Open Invoices':i.TrancheOpenInvoices,
        'Tranche-Open Invoice Amount':i.TrancheOpenInvoiceAmount,
        'Tranche-Under Repayment Invoices':i.TrancheRepayInvoices,
        'Tranche-Under Repayment Invoice Amount':i.TrancheRepayInvoiceAmount,
        'Tranche-Fully Paid Invoices':i.TrancheFullyInvoices,
        'Tranche-Fully Paid Invoice Amount':i.TrancheFullyInvoiceAmount,
        'Over Due Invoices':i.overDueInvoices,
        'Over Due Invoice Amount':i.overDueInvoiceAmount,
        // 'FinAgg Paid Invoices': i.finaggPayInvoiceCount,
        // 'FinAgg Paid Invoice Amount ': this.indianCurrency(i.finaggPayInvoiceAmount),
        // 'Pending Invoices': i.distOutStandingInvoiceCount,
        // 'Pending Invoice Amount': this.indianCurrency(i.distOutStandingInvoiceAmount),
        // 'Pending Repayment': i.repaymentInvoice,
        // 'Pending Repayment Amount': this.indianCurrency(i.repaymentInvoiceAmount)

      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'dashboard_invoiceList');
  }
  pdf() {
    var j = 1;
    var title = "dashboard_invoiceList";
    var body = [
      ['Sno', 'Retailer', 'Pan No', 'mobile No','Anchor Ref No', 'Sales Person Name', 'Sales Person Mobile No',
        'Approved Limit', 'Approved On', 'Available Limit','Post Available Limit','Excess Amount','Total Invoices',
        'Total Invoice Amount','UnFinanced Invoices','UnFinanced Invoices Amount',
        'Tranche-Open Invoices','Tranche-Open Invoice Amount','Tranche-Under Repayment Invoices',
        'Tranche-Under Repayment Invoice Amount','Tranche-Fully Paid Invoices','Tranche-Fully Paid Invoice Amount',
        'Over Due Invoices','Over Due Invoice Amount', ],
      ...this.invoiceList.map(i => ([j++, i.orgName, i.panNo, i.mobileNo,i.anchorRefNo,
      i.salesPersonName, i.salesPersonMobileNo, this.indianCurrency(i.approvedAmount)
      , i.approvedOn, i.availableAmount,
      this.indianCurrency(i.postAvailableAmount),this.indianCurrency(i.excessAmount),i.totalInvoices,
      this.indianCurrency(i.totalInvoiceAmount),i.UnFinancedInvoices,this.indianCurrency(i.UnFinancedInvoiceAmount),
      i.TrancheOpenInvoices,this.indianCurrency(i.TrancheOpenInvoiceAmount),i.TrancheRepayInvoices,
      this.indianCurrency(i.TrancheRepayInvoiceAmount),i.TrancheFullyInvoices,this.indianCurrency(i.TrancheFullyInvoiceAmount),
      i.overDueInvoices,this.indianCurrency(i.overDueInvoiceAmount)]))
    ]
    this.pdfservice.pdf(body, title, 'A2');
  }
  ngOnInit(): void {
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.lenderId = Number(this.crypto.decryt(window.localStorage.getItem('lenderId')));
    
    if(this.roleId == '7'){
      this.orgId = 'orgId';
    }else if (this.roleId == '4' || this.roleId == '8') {
      this.orgId = this.crypto.decryt(localStorage.getItem("orgId"));
    } else if (this.roleId != '3') {
      this.orgId = this.crypto.decryt(localStorage.getItem("orgId"));
    } else {
      this.orgId = this.crypto.decryt(localStorage.getItem("orgId"));
      }
      
    this.getInvoiceListSummary();
    this.getBrandDashboardMTDSummary();
    this.getBrandDashboardRetailerSummary();
    this.getRetailerDetails();
    this.apiService.getDashboardBrandList(  ).subscribe(data => {
      this.dashboardBrandList = data.result;
    }, error => { console.log(error.message); });
    

  }

  submit() {

  }
  resetOrgId() {
    this.showInvoiceListMSG = false;
    this.notOnboarded = 0;
    this.approved = 0;
    this.inProgress = 0;
    this.rejected = 0;
    this.getInvoiceListSummary();
    this.getBrandDashboardMTDSummary();
    this.getBrandDashboardRetailerSummary();
    this.getRetailerDetails();
  }
  getBrandDetails() {
    this.orgId = "";
    this.brandId = "";
    this.apiService.getBrandNameList(this.programId).subscribe(data => {
      if (data.status == 200) {
        this.brandList = data.result;
      }
    }, error => console.log(error));
  }
  getRetailerList() {
    this.orgId = "";
    this.apiService.getParentRetailerList(this.programId, this.brandId).subscribe(data => {
      if (data.status == 200) {
        this.retailerList = data.result;
      }
    }, error => console.log(error));
  }
  getRetailerDetails() {
    this.apiService.getRetailerDetails(this.orgId,this.lenderId).subscribe(data => {
      if (data.status === 200) {
        console.log(data.result);
        this.inprogressRetailerList = data.result.inprogress;
        this.approvedRetailerList = data.result.approved;
        this.rejectedRetailerList = data.result.rejected;
        this.notOnboardedRetailerList = data.result.notOnboarded;
      }
    }, error => { console.log(error.message); });
  }
  inprogressRetailers(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  approvedRetailers(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  notonboardedRetailers(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  rejectedRetailers(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getInvoiceListSummary() {
    var a="0";

    var b="0";
    if(this.roleId=="8")
    {
      b= this.crypto.decryt(window.localStorage.getItem("orgId")).toString();
    }
    if(this.roleId=="11")
    {
      a=this.crypto.decryt(window.localStorage.getItem("orgId")).toString();
    }
    // this.apiService.getInvoiceListSummary(this.orgId).subscribe(data => {
    this.apiService.getInvoiceListSummary(this.orgId,this.lenderId,a,b).subscribe(data => {
      if (data.status === 200) {
        console.log(data.result);
        this.invoiceList = data.result;
        // alert("invoiceList:"+this.invoiceList.length);
        if (this.invoiceList.length == 0) {
          this.invoiceListMSG = "Data Not Available";
          this.showInvoiceListMSG = true;

        }
      }
    }, error => { console.log(error.message); });
  }
  getBrandDashboardMTDSummary() {
   // var orgIds=(this.lenderId==0)?this.orgId:'0';
    this.apiService.getBrandDashboardMTDSummary(this.orgId,this.lenderId).subscribe(data => {
      if (data.status === 200) {

        this.mtdTotalInvoices = data.result[0].mtdTotalInvoices;
        this.mtdNewInvoicesAmount = data.result[0].mtdNewInvoicesAmount;
        this.mtdDisburesedInvoicesAmount = data.result[0].mtdDisburesedInvoicesAmount;
        this.mtdDisburesedInvoices = data.result[0].mtdDisburesedInvoices;
        this.mtdNewInvoices = data.result[0].mtdNewInvoices;

        this.mtdPaidPB = (this.mtdDisburesedInvoices * 100 / this.mtdTotalInvoices).toFixed(2);
        this.mtdPendingPB = (this.mtdNewInvoices * 100 / this.mtdTotalInvoices).toFixed(2);

        this.ytdNewInvoices = data.result[1].ytdNewInvoices;
        this.ytdTotalInvoices = data.result[1].ytdTotalInvoices;
        this.ytdDisburesedInvoicesAmount = data.result[1].ytdDisburesedInvoicesAmount;
        this.ytdDisburesedInvoices = data.result[1].ytdDisburesedInvoices;
        this.ytdNewInvoicesAmount = data.result[1].ytdNewInvoicesAmount;
        this.ytdPaidPB = (this.ytdDisburesedInvoices * 100 / this.ytdTotalInvoices).toFixed(2);
        this.ytdPendingPB = (this.ytdNewInvoices * 100 / this.ytdTotalInvoices).toFixed(2);
        console.log('getBrandDashboardMTDSummary::' + JSON.stringify(data.result));
      }
    }, error => { console.log(error.message); });
  }
  getTotalInvoiceList(content,orgId:number) {
    this.apiService.getTotalInvoiceList(orgId,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.totalInvoiceList=data.result;
        console.log(data.result);
      }
    },error => {console.log(error.message);}) ;
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onNewtabClick(event){   
    if(event.tab.textLabel=="UnFinanced Invoices")
    { 
    this.getUndfincancedInvoiceList();
    }
    else if(event.tab.textLabel=="Tranche-Open Invoices")
    { 
    this.getdtranchOpenInvoiceList();
    }
    else if(event.tab.textLabel=="Tranche-Under Repayment Invoices"){
    this.getdTranchRepayInvoiceList();
    }
    else if(event.tab.textLabel=="Tranche-Fully Paid Invoices"){
    this.getdTranchFullyInvoiceList();
    }else {
    this.getdOverDueInvoiceList();
    }

 }

  getUndfincancedInvoiceList(){
  this.apiService.getUnFinancedInvoices(this.orgshow,1,'startDate','endDate').subscribe(data => {
    if(data.status==200){
        this.undfinancedInvoiceList=data.result;
        this.showAnger=(this.undfinancedInvoiceList.length==0)?true:false;
        console.log("this.showAnger"+this.showAnger);
    }
  

  },error => {console.log(error.message);}) ;
}
getdtranchOpenInvoiceList(){
  this.apiService.getTranchOpen(this.orgshow,1,'startDate','endDate').subscribe(data => {
    if(data.status==200){
      this.tranchOpendInvoiceList=data.result;
      this.showAnger2=(this.tranchOpendInvoiceList.length==0)?true:false;
      console.log("this.showAnger2"+this.showAnger2);

    }
  },error => {console.log(error.message);}) };
  getdTranchRepayInvoiceList(){
    this.apiService.getTranchRepayment(this.orgshow,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.tranchdRepayInvoiceList=data.result;
        this.showAnger3=(this.tranchdRepayInvoiceList.length==0)?true:false;
        console.log("this.showAnger3"+this.showAnger3);
      }
    },error => {console.log(error.message);}) ;
   
  }
  getdTranchFullyInvoiceList(){
    this.apiService.getTranchfullyPaid(this.orgshow,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.tranchdFullyInvoiceList=data.result;
        this.showAnger4=(this.tranchdFullyInvoiceList.length==0)?true:false;
        console.log("this.showAnger4"+this.showAnger4);
      }
    },error => {console.log(error.message);}) ;
  }
  getdOverDueInvoiceList(){
    this.apiService.getTranchOverDue(this.orgshow,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.overDuedInvoiceList=data.result;
        this.showAnger5=(this.overDuedInvoiceList.length==0)?true:false;
        console.log("this.showAnger5"+this.showAnger5);
      }
    },error => {console.log(error.message);}) ;
  }



  getUnfincancedInvoiceList(content,orgId:number) {
    this.apiService.getUnFinancedInvoices(orgId,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.unfinancedInvoiceList=data.result;
      }
    },error => {console.log(error.message);}) ;
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getUnfincancedInvoiceLaist(orgId:number) {
    this.apiService.getUnFinancedInvoices(orgId,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.unfinancedInvoiceLaist=data.result;
      }
    },error => {console.log(error.message);}) ;}

  gettranchOpenInvoiceList(content,orgId:number) {
    this.apiService.getTranchOpen(orgId,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.tranchOpenInvoiceList=data.result;
      }
    },error => {console.log(error.message);}) ;
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  getTranchRepayInvoiceList(content,orgId:number) {
    this.apiService.getTranchRepayment(orgId,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.tranchRepayInvoiceList=data.result;
      }
    },error => {console.log(error.message);}) ;
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

 

  getTranchFullyInvoiceList(content,orgId:number) {
    this.apiService.getTranchfullyPaid(orgId,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.tranchFullyInvoiceList=data.result;
      }
    },error => {console.log(error.message);}) ;
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  getOverDueInvoiceList(content,orgId:number) {
    this.apiService.getTranchOverDue(orgId,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.overDueInvoiceList=data.result;
      }
    },error => {console.log(error.message);}) ;
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

 

  getPendingInvoiceList(content, orgId: number) {
    this.apiService.getTotalPendingInvoiceList(orgId).subscribe(data => {
      if (data.status == 200) {
        this.totalPendingInvoiceList = data.result;
      }
    }, error => { console.log(error.message); });
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getFinaggPaidInvoiceList(content, orgId: number) {
    this.apiService.getTotalPaidInvoiceList(orgId).subscribe(data => {
      if (data.status == 200) {
        this.totalPaidInvoiceList = data.result;
      }
    }, error => { console.log(error.message); });
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getPendingRepaymentInvoiceList(content, orgId: number) {
    this.apiService.getRepaymentInvoiceList(orgId).subscribe(data => {
      if (data.status == 200) {
        this.repaymentInvoiceList = data.result;
      }
    }, error => { console.log(error.message); });
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
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

  getBrandDashboardRetailerSummary() {
    this.apiService.getBrandDashboardRetailerSummary(this.orgId,this.lenderId).subscribe(data => {
      if (data.status === 200) {
        for (let a of data.result) {
          if (a.status == 'Not Onboarded') {
            this.notOnboarded = a.statusCount;
          } else if (a.status == 'Approved') {
            this.approved = a.statusCount;
          } else if (a.status == 'In Progress') {
            this.inProgress = a.statusCount;
          } else if (a.status == 'Rejected') {
            this.rejected = a.statusCount;
          }
        }
        console.log(data.result);
      }
    }, error => { console.log(error.message); });
  }
  // This is for the dashboar line chart
  // lineChart
  public lineChartData: Array<any> = [
    { data: [50, 130, 80, 120, 180, 140, 250], label: 'FinAgg Paid' },
    { data: [80, 100, 60, 80, 70, 90, 150], label: 'Regular Paid' }
  ];

  public lineChartLabels: Array<any> = [
    'Dec 19',
    'Jan 20',
    'Feb 20',
    'Mar 20',
    'Apr 20',
    'May 20',
    'Jun 20'

  ];
  public lineChartOptions: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(120, 130, 140, 0.13)'
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: 'rgba(120, 130, 140, 0.13)'
          }
        }
      ]
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(25,118,210,0.0)',
      borderColor: 'rgba(25,118,210,1)',
      pointBackgroundColor: 'rgba(25,118,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(25,118,210,0.5)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(38,218,210,0.0)',
      borderColor: 'rgba(38,218,210,1)',
      pointBackgroundColor: 'rgba(38,218,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(38,218,210,0.5)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  // Doughnut
  public doughnutChartLabels: string[] = ['Sales', 'Earning', 'Cost'];

  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // Sales Analytics Pie chart
  public pieChartLabels: string[] = ['Sales', 'Earning', 'Cost'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  // bar chart
  public barChartData: Array<any> = [
    { data: [1.1, 1.4, 1.1, 0.9, 2.1, 1, 0.3], label: 'Cost' }
  ];
  public barChartLabels: Array<any> = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7'
  ];
  public barChartOptions: any = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.2,
        categoryPercentage: 0.5
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      hoverBackgroundColor: 'rgba(255, 255, 255, 0.3)',
      hoverBorderWidth: 2,
      hoverBorderColor: 'rgba(255, 255, 255, 0.3)'
    }
  ];
  public barChartLegend = false;
  public barChartType = 'bar';

  beneList = [];
  p1 : any = 1;
  beneapi(content, orgId){
    this.apiService.getorgbankdetails('1',orgId).subscribe(data => {
      if(data.status == 200){
        this.beneList = data.result;  
        this.modalService.open(content, { size: 'xl' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }else { 
        this.set.setOption(data.exceptionMessage, false);
      }
      this.orgId = '';
    }, error => console.log(error));
  }

  open(content,orgId){
    // this.orgshow = orgId;
    this.orgshow =orgId;
    var a="0";

    var b="0";
    if(this.roleId=="8")
    {
      b= this.crypto.decryt(window.localStorage.getItem("orgId")).toString();
    }
    if(this.roleId=="11")
    {
      a=this.crypto.decryt(window.localStorage.getItem("orgId")).toString();
    }
    this.apiService.getInvoiceDashboardData(orgId,this.lenderId,a,b).subscribe(data => {
      if (data.status === 200) {
        console.log(data.result);
        this.invoiceLista = data.result;
     
      }
    }, error => { console.log(error.message); });
    
    
      this.apiService.getTotalInvoiceList(orgId,1,'startDate','endDate').subscribe(data => {
        if(data.status==200){
          this.totaldInvoiceList=data.result;
          
          console.log(data.result);
        }
      },error => {console.log(error.message);})


    console.log("open called arjun");
    this.modalService.open(content, { windowClass:"myCustomModalClass"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
