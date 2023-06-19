import {Component, OnInit} from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from '../../shared/excel.service';
import { PdfService } from '../../shared/pdf.service';
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';

export interface invoiceList {
  orgId: string;
  orgName: string;
  salesPersonName: String,
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
}

@Component({
  templateUrl: './brand-dashboard.component.html',
  styleUrls: ['./brand-dashboard.component.css']
})
export class BrandDashboardComponent implements OnInit  {
  subtitle: string;
  mtdPaidPB:any;
  mtdPendingPB:any;
  mtdTotalInvoices:any;
  mtdNewInvoicesAmount:any;
  mtdDisburesedInvoicesAmount:any;
  mtdDisburesedInvoices:any;
  mtdNewInvoices:any;

  ytdPaidPB:any;
  ytdPendingPB:any;
  ytdNewInvoices:any;
  ytdTotalInvoices:any;
  ytdDisburesedInvoicesAmount:any;
  ytdDisburesedInvoices:any;
  ytdNewInvoicesAmount:any;

  notOnboarded:any;
  approved:any;
  inProgress:any;
  rejected:any;
  closeResult: string;
  totalInvoiceList=[];
  totalPendingInvoiceList=[];
  totalPaidInvoiceList=[];
  inprogressRetailerList=[];
  approvedRetailerList=[];
  rejectedRetailerList=[];
  notOnboardedRetailerList=[];
  constructor(private apiService : ApiService,private router : Router,private modalService: NgbModal,
    public excelservice: ExcelService, public currency: Currency,private crypto: Crypto,
    public pdfservice: PdfService) {
    this.subtitle = 'This is some text within a card block.';
  }
  invoiceList: invoiceList[] = [];
  orgId:any;
  p:any;
  searchReportList:any;
  lenderId:any;
  ngOnInit(): void {
    this.lenderId=this.crypto.decryt(localStorage.getItem("lenderId"));
    this.orgId=this.crypto.decryt(localStorage.getItem("orgId"));
    this.getInvoiceListSummary();
    this.getBrandDashboardMTDSummary();
    this.getBrandDashboardRetailerSummary();
    this.getRetailerDetails();
    }
    indianCurrency(number: any) {
      return this.currency.indianCurrency(number);
    }
  getRetailerDetails(){
    this.apiService.getRetailerDetails(this.orgId,this.lenderId).subscribe(data => {
      if(data.status === 200) {
        console.log(data.result);
        this.inprogressRetailerList=data.result.inprogress;
        this.approvedRetailerList=data.result.approved;
        this.rejectedRetailerList=data.result.rejected;
        this.notOnboardedRetailerList=data.result.notOnboarded;
      }
    },error => {console.log(error.message);}) ;
  }
  inprogressRetailers(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  approvedRetailers(content){
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  notonboardedRetailers(content){
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  rejectedRetailers(content){
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getInvoiceListSummary() {
    var a="0";

    var b="0";
 
    // this.apiService.getInvoiceListSummary(this.orgId).subscribe(data => {
      this.apiService.getInvoiceListSummary(this.orgId,this.lenderId,a,b).subscribe(data => {
      if(data.status === 200) {
        console.log(data.result);
        this.invoiceList =data.result;
      }
    },error => {console.log(error.message);}) ;
  }
  getBrandDashboardMTDSummary() {
      this.apiService.getBrandDashboardMTDSummary(this.orgId,this.lenderId).subscribe(data => {
      if(data.status === 200) {
        
       this.mtdTotalInvoices= data.result[0].mtdTotalInvoices;
       this.mtdNewInvoicesAmount= data.result[0].mtdNewInvoicesAmount;
       this.mtdDisburesedInvoicesAmount= data.result[0].mtdDisburesedInvoicesAmount;
       this.mtdDisburesedInvoices= data.result[0].mtdDisburesedInvoices;
       this.mtdNewInvoices= data.result[0].mtdNewInvoices;

       this.mtdPaidPB = (this.mtdDisburesedInvoices*100/this.mtdTotalInvoices).toFixed(2);
       this.mtdPendingPB = (this.mtdNewInvoices*100/this.mtdTotalInvoices).toFixed(2);

       this.ytdNewInvoices= data.result[1].ytdNewInvoices;
       this.ytdTotalInvoices= data.result[1].ytdTotalInvoices;
       this.ytdDisburesedInvoicesAmount= data.result[1].ytdDisburesedInvoicesAmount;
       this.ytdDisburesedInvoices= data.result[1].ytdDisburesedInvoices;
       this.ytdNewInvoicesAmount= data.result[1].ytdNewInvoicesAmount;
       this.ytdPaidPB = (this.ytdDisburesedInvoices*100/this.ytdTotalInvoices).toFixed(2);
       this.ytdPendingPB = (this.ytdNewInvoices*100/this.ytdTotalInvoices).toFixed(2); 
       console.log('getBrandDashboardMTDSummary::'+JSON.stringify(data.result));
      }
    },error => {console.log(error.message);}) ;
  }
  getTotalInvoiceList(content,orgId:number) {
    this.apiService.getTotalInvoiceList(orgId,1,'startDate','endDate').subscribe(data => {
      if(data.status==200){
        this.totalInvoiceList=data.result;
      }
    },error => {console.log(error.message);}) ;
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getPendingInvoiceList(content,orgId:number) {
    this.apiService.getTotalPendingInvoiceList(orgId).subscribe(data => {
      if(data.status==200){
        this.totalPendingInvoiceList=data.result;
      }
    },error => {console.log(error.message);}) ;
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getFinaggPaidInvoiceList(content,orgId:number) {
    this.apiService.getTotalPaidInvoiceList(orgId).subscribe(data => {
      if(data.status==200){
        this.totalPaidInvoiceList=data.result;
      }
    },error => {console.log(error.message);}) ;
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
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
  excel() {
    var list = [];
    var j = 1;
    for (let i of this.invoiceList) {
      const listObj = {
        'Sno': (j++),
        'Retailer': i.orgName,
        'Pan No': i.panNo,
        'mobile No': i.mobileNo,
        'Sales Person Name': i.salesPersonName,
        'Sales Person Mobile No': i.salesPersonMobileNo,
        'Approved Limit': this.indianCurrency(i.approvedAmount),
        'Approved On': i.approvedOn,
        'Available Limit': this.indianCurrency(i.availableAmount),
        'Total Invoices': i.totalInvoices,
        'Total Invoice Amount': this.indianCurrency(i.totalInvoiceAmount),
        'FinAgg Paid Invoices': i.finaggPayInvoiceCount,
        'FinAgg Paid Invoice Amount ': this.indianCurrency(i.finaggPayInvoiceAmount),
        'Pending Invoices': i.distOutStandingInvoiceCount,
        'Pending Invoice Amount': this.indianCurrency(i.distOutStandingInvoiceAmount),
        'Pending Repayment': i.repaymentInvoice,
        'Pending Repayment Amount': this.indianCurrency(i.repaymentInvoiceAmount)
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'dashboard_invoiceList');
  }
  pdf() {
    var j = 1;
    var title = "dashboard_invoiceList";
    var body = [
      ['Sno', 'Retailer', 'Pan No', 'mobile No', 'Sales Person Name', 'Sales Person Mobile No',
        'Approved Limit', 'Approved On', 'Available Limit', 'Total Invoices', 'Total Invoice Amount'
        , 'FinAgg Paid Invoices', 'FinAgg Paid Invoice Amount ', 'Pending Invoices', 'Pending Invoice Amount',
        'Pending Repayment', 'Pending Repayment Amount'],
      ...this.invoiceList.map(i => ([j++, i.orgName, i.panNo, i.mobileNo,
      i.salesPersonName, i.salesPersonMobileNo, this.indianCurrency(i.approvedAmount)
      , i.approvedOn, i.availableAmount,
      i.totalInvoices, this.indianCurrency(i.totalInvoiceAmount), i.finaggPayInvoiceCount,
      this.indianCurrency(i.finaggPayInvoiceAmount), i.distOutStandingInvoiceCount,
      this.indianCurrency(i.distOutStandingInvoiceAmount),
      i.repaymentInvoice, this.indianCurrency(i.repaymentInvoiceAmount)]))
    ]
    this.pdfservice.pdf(body, title, 'A2');
  }
  getBrandDashboardRetailerSummary() {
      this.apiService.getBrandDashboardRetailerSummary(this.orgId,this.lenderId).subscribe(data => {
      if(data.status === 200) {
        for(let a of data.result){
          if(a.status=='Not Onboarded'){
            this.notOnboarded=a.statusCount;
          }else if(a.status=='Approved'){
            this.approved=a.statusCount;
          }else if(a.status=='In Progress'){
            this.inProgress=a.statusCount;
          }else if(a.status=='Rejected'){
            this.rejected=a.statusCount;
          }
        }
        console.log(data.result);
      }
    },error => {console.log(error.message);}) ;
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
}
