import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import * as Highcharts from 'highcharts';
import { isNumber } from 'util';
import { ApiService} from "..//..//core/api.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  id: number;
  loanid: number;  
  
  CustomerDetailInfo:Array<any>;
  TelcoDetailInfo:any;
  CustomerRetailerInfo:any;
  CustomerBrandInvoiceInfo:any;
  CustomerBrandDetailsInfo:any;
  LoanRequestStatus:any;    

  title:any;    
  datas:any;    
  highcharts:any;    
  chartOptions:any;     

  firstValue:number;
  secondValue:number;
  thirdValue:number;
  fourthValue:number;
  fifthValue:number;
  sixthValue:number;

  requestList: Observable<ReportModel[]>;
  constructor(
    private route: ActivatedRoute,private router: Router,private apiService : ApiService) { 
     }

     overviewDetails(id: number,loanid: number){
      console.log("id=="+id+"loanid=="+loanid);
      console.log("requestList.length=="+this.requestList);
      this.router.navigate(['report/overview', id,loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
    }
    
    cashflowDetails(id: number,loanid: number){
      console.log("id=="+id+"loanid=="+loanid);
      // console.log("requestList.length=="+this.requestList);
      this.router.navigate(['report/cashflow', id,loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
    }
  
    summaryReportDetails(id: number,loanid: number){
      console.log("id=="+id+"loanid=="+loanid);
      // console.log("requestList.length=="+this.requestList);
      this.router.navigate(['report/summary', id,loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}}); 
    }
    cicReportDetails(id: number,loanid: number){
      console.log("id=="+id+"loanid=="+loanid);
      // console.log("requestList.length=="+this.requestList);
      this.router.navigate(['report/cicReport', id,loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}}); 
    }
  
    ReportDetails(id: number,loanid: number){
      console.log("id=="+id+"loanid=="+loanid);
      // console.log("requestList.length=="+this.requestList);
      this.router.navigate(['tab', id,loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}}); 
    }
  
  nonStopFlag : any;
  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    this.route.queryParams.subscribe(params => {
      this.nonStopFlag = params['nonStopFlag'];
    })
    console.log("data=="+this.id+"loanid=="+this.loanid);


    

    this.apiService.getCustomerDetailInfo(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.CustomerDetailInfo = data.result;
      //console.log("CustomerDetailInfo==="+JSON.stringify(this.CustomerDetailInfo));
    }, error => console.log(error));
  
    this.apiService.getCustomerTelcoDetailInfo(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.TelcoDetailInfo = data.result;
     // console.log("TelcoDetailInfo==="+JSON.stringify(this.TelcoDetailInfo));
    }, error => console.log(error));
    
    this.apiService.getCustomerRetailerInfo(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.CustomerRetailerInfo = data.result;
     // console.log("CustomerRetailerInfo==="+JSON.stringify(this.CustomerRetailerInfo));
    }, error => console.log(error));
    
    this.apiService.getLoanRequestStatus(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.LoanRequestStatus = data.result;
     // console.log("LoanRequestStatus==="+JSON.stringify(this.LoanRequestStatus));
    }, error => console.log(error));
    
    this.apiService.getCustomerBrandDetailsInfo(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.CustomerBrandDetailsInfo = data.result;
      
      //console.log("CustomerBrandDetailsInfo==="+JSON.stringify(this.CustomerBrandDetailsInfo));
    }, error => console.log(error));

    this.apiService.getCustomerBrandInvoiceInfo(this.id,this.loanid)
    .subscribe(data => {       
    this.CustomerBrandInvoiceInfo = data.result;

        for (let inv of this.CustomerBrandInvoiceInfo) {
      
          this.firstValue   = inv.FirstMonthValue;
          this.secondValue  = inv.SecondMonthValue;
          this.thirdValue   = inv.ThirdMonthValue;
          this.fourthValue  = inv.FourthMonthValue;
          this.fifthValue   = inv.FifthMonthValue;
          this.sixthValue   = inv.SixthMonthValue;

          console.log(typeof inv.FirstMonthValue);

          this.title = 'FinnAgg';    
          this.highcharts = Highcharts;
          this.chartOptions = {   
          series: [{
            name: 'Month & Year',        
            data: [this.firstValue,this.secondValue,this.thirdValue,this.fourthValue,this.fifthValue,this.sixthValue]            
          }],
          chart: {
            type: "spline"
          },
          title: {
          text: "Invoice Details"
          }, credits: {
            enabled: false
        },
          xAxis:{
          categories:[inv.FirstMonth,inv.SecondMonth,
            inv.ThirdMonth,inv.FourthMonth,
            inv.FifthMonth,inv.SixthMonth]
          },   
  
          yAxis: {          
          title:{
          text:"Invoice Value"
          } 
        }
      };
    }
}, error => console.log(error));   
    
}

highcharts1 = Highcharts;
chartOptions1 = {   
series: [{name: 'Bank Statement',        
          data: [25000,70000,10000]},
      { name: 'GST',        
        data: [30000,50000,50000]}
      ],
chart: {
  type: "spline"
},
title: {
text: ""
}, credits: {
  enabled: false
},
xAxis:{
categories:[2018,2019,2020]
},   

yAxis: {          
title:{
text:"INR"
} 
}
}; 

}
 

