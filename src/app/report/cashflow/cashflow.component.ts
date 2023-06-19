import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import * as Highcharts from 'highcharts';
import { ApiService} from "..//..//core/api.service";

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class CashflowComponent implements OnInit {
  id: number;
  loanid:number;
  bankid:number;
  month:any;
  year:any;
  index:any;
  selector:any;
  submitted = false;
  OutflowChart = false;
  InflowChart = false;
  title:any;    
  datas:any;    
  highcharts2:any;    
  chartOptions2:any;    
  highcharts:any;    
  chartOptions:any;    
  CustomerBankDetails:any;
  CustomerBureauDetails:any;
  CustomerBankMergedDetails:any;
  LoanRequestById:any;
  AggregateBankDetails:any;
  LoanMonthAvailable:any;
  BankOutflowGroups:any;
  BankInflowGroups:any;
  BankOutflowGroupAmount:any;
  BankInflowGroupAmount:any;


  requestList: Observable<ReportModel[]>;
  constructor(
    private route: ActivatedRoute,private router: Router,private apiService : ApiService
    ) { 
     }
  ngOnInit(): void {
    this.submitted = false;    
    this.loanid = this.route.snapshot.params['loanid'];
    this.id = this.route.snapshot.params['id'];
    // this.id = 42;
    // this.loanid = 189;

    console.log("data=="+this.id+"loanid=="+this.loanid);

    this.apiService.getCustomerBankMergedDetails(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.CustomerBankMergedDetails = data.result;
      console.log("CustomerBankMergedDetails==="+JSON.stringify(this.CustomerBankMergedDetails));
    }, error => console.log(error));


    this.apiService.getCustomerBankDetails(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.CustomerBankDetails = data.result;
      console.log("CustomerBankDetails==="+JSON.stringify(this.CustomerBankDetails));
    }, error => console.log(error));
   
     this.loanid = this.route.snapshot.params['loanid'];
    this.apiService.getLoanMonthAvailable(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.LoanMonthAvailable = data.result;
      //console.log("LoanMonthAvailable==="+JSON.stringify(this.LoanMonthAvailable));
    }, error => console.log(error));  
  }
  
  reloadPage(){
    this.AggregateBankDetails = null;
    this.BankOutflowGroups = null;
    this.BankInflowGroups = null;
    this.BankInflowGroupAmount=null;
    this.BankOutflowGroupAmount=null;
    this.OutflowChart = false;
    this.InflowChart = false;
    this.selector=0;
  }
  monthTrads(year:any){
    if(year!=0||year!=' '){
      this.selector=2;
    this.OutflowChart = false;
    this.InflowChart = false;
    // this.id = 42;
    // this.loanid = 189;
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];

    // this.month = ((document.getElementById("loanMonth") as HTMLInputElement).value);
   var temp=year.split("and");
    this.month=temp[1];
    this.year=temp[0];
    this.bankid=temp[2];
    this.index=temp[3];
    console.log("this.bankid=="+this.bankid+" this.selector=="+this.selector);
        this.apiService.getAggregateBankDetailswithBankId(this.id,this.loanid,this.month, this.year,this.bankid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.AggregateBankDetails = data.result;
      console.log("AggregateBankDetails==="+JSON.stringify(this.AggregateBankDetails));
    }, error => console.log(error));

    this.apiService.getBankOutflowGroupswithBankId(this.id,this.loanid,this.bankid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.BankOutflowGroups = data.result;
      //console.log("BankOutflowGroups==="+JSON.stringify(this.BankOutflowGroups));
    }, error => console.log(error));
  
    this.apiService.getBankInflowGroupswithBankId(this.id,this.loanid,this.bankid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.BankInflowGroups = data.result;
      //console.log("BankInflowGroups==="+JSON.stringify(this.BankInflowGroups));
    }, error => console.log(error));  
 
  }else{
    this.reloadPage();
  }
  }
  monthTradsMerged(year:any){
    if(year!=0||year!=' '){
      this.selector=1;
      // this.id = 42;
      // this.loanid = 189;
      this.id = this.route.snapshot.params['id'];
      this.loanid = this.route.snapshot.params['loanid'];
    this.OutflowChart = false;
    this.InflowChart = false;
    // this.month = ((document.getElementById("loanMonth") as HTMLInputElement).value);
   var temp=year.split("and");
    this.month=temp[1];
    this.year=temp[0];
    console.log("this.month=="+this.month+"this.year=="+this.year);
    console.log("data=="+this.id+"loanid=="+this.loanid+"month=="+this.month+"year=="+year);

     this.apiService.getAggregateBankDetails(this.id,this.loanid,this.month, this.year)
     .subscribe(data => {
       // console.log("data=="+JSON.stringify(data));
       this.AggregateBankDetails = data.result;
       console.log("AggregateBankDetails==="+JSON.stringify(this.AggregateBankDetails));
     }, error => console.log(error));
    this.submitted = true;
    console.log("submitted=="+this.submitted);
    
   
    this.apiService.getBankOutflowGroups(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.BankOutflowGroups = data.result;
      //console.log("BankOutflowGroups==="+JSON.stringify(this.BankOutflowGroups));
    }, error => console.log(error));
  
    this.apiService.getBankInflowGroups(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.BankInflowGroups = data.result;
      //console.log("BankInflowGroups==="+JSON.stringify(this.BankInflowGroups));
    }, error => console.log(error));    

    }else{
      this.reloadPage();
    }
    
  }
  bankAccountDetails(){
    this.reloadPage();
   
  }
  mergedAccountDetails(){
    
    this.reloadPage();
    (document.getElementById("loanYear") as HTMLInputElement).value='0';
  }
 
  BankInflow(groupId:any){
    // this.id = 42;
    // this.loanid = 189;
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    console.log("data=="+this.id+"loanid=="+this.loanid);
    console.log("groupId=="+groupId);
    var temp1=groupId.split("and");
    groupId=temp1[0];
    if(this.selector==1){
      console.log("groupid="+groupId+" index=="+this.index+" this.selector=="+this.selector);
      var temp=((document.getElementById("loanYear") as HTMLInputElement).value).split("and");  
    }else if(this.selector==2){
      this.index=temp1[1];
      console.log("groupid="+groupId+" index=="+this.index+" this.selector=="+this.selector);
      var temp=((document.getElementById("monthAva"+this.index) as HTMLInputElement).value).split("and");  
    }
    
    this.month =temp[1] ;
    this.year = temp[0];
    
    console.log("this.month="+this.month+" this.year="+this.year);
     this.apiService.getBankInflowGroupAmount(groupId,this.month,this.year,this.loanid)
     .subscribe(data => {
       console.log("data=="+JSON.stringify(data));
       this.BankInflowGroupAmount = data.result;

       var mny =   this.month +' - '+this.year;

      for (let inv of this.BankInflowGroupAmount) {
        this.title = 'FinnAgg';    
        this.highcharts = Highcharts;
        this.chartOptions = { 
  
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
        },
        series: [{
            name: 'Year & Month',            
            data: [inv.inflowAmt]
    
        }]
    
  };


    }

       console.log("BankInflowGroupAmount==="+JSON.stringify(this.BankInflowGroupAmount));
     }, error => console.log(error));
     
     this.InflowChart = true;
  }


  BankOutflow(groupId:any){
    // this.id = 42;
    // this.loanid = 189;
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    console.log("this.id=="+this.id+" this.loanid=="+this.loanid+" groupId== "+groupId)
    var temp1=groupId.split("and");
    groupId=temp1[0];
    if(this.selector==1){
      console.log("groupid="+groupId+" index=="+this.index+" this.selector=="+this.selector);
      var temp=((document.getElementById("loanYear") as HTMLInputElement).value).split("and");  
    }else if(this.selector==2){
      this.index=temp1[1];
      console.log("groupid="+groupId+" index=="+this.index+" this.selector=="+this.selector);
      var temp=((document.getElementById("monthAva"+this.index) as HTMLInputElement).value).split("and");  
    }
    this.month =temp[1] ;
    this.year = temp[0];
    console.log("this.month="+this.month+" this.year="+this.year);
    this.apiService.getBankOutflowGroupAmount(groupId,this.month,this.year,this.loanid)
    .subscribe(data => {
    // console.log("data=="+JSON.stringify(data));
    this.BankOutflowGroupAmount = data.result;
    var mny =   this.month +' - '+this.year;
   
    for (let inv1 of this.BankOutflowGroupAmount) {
      this.title = 'FinnAgg';    
      console.log(typeof inv1.outflowAmt);
      this.highcharts2 = Highcharts;
      this.chartOptions2 = { 

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
      },
      series: [{
          name: 'Year & Month',            
          data: [inv1.outflowAmt]
  
      }]
  
};

      
    }
    
    console.log("BankOutflowGroupAmount==="+JSON.stringify(this.BankOutflowGroupAmount));
     }, error => console.log(error));

     this.OutflowChart = true;   
  }

  

}
