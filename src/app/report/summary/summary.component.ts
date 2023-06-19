import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import { ApiService} from "..//..//core/api.service";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  id: number;
  loanid:number;
  submitted = false;
  CustomerBankDetails:any;
  LoanRequestById:any;
  CustomerRetailerInfo:any;
  CustomerDetail:any;
  charts:any;  
  SummaryDetails:any;
  

  highcharts:any;    
  chartOptions:any; 

  requestList: Observable<ReportModel[]>;
  constructor(
    private route: ActivatedRoute,private router: Router,private apiService : ApiService) { 
     }
  ngOnInit(): void {
    this.submitted = false;
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    console.log("data=="+this.id+"loanid=="+this.loanid);

    this.apiService.getLoanRequestById(this.id,this.loanid)
    .subscribe(data => {
      this.LoanRequestById = data.result;
      for (let inv of data.result) {      
    
    this.highcharts = Highcharts;
    this.chartOptions = {  
      chart: {
          type: 'bar'
       },
       title: {
          text: ''
       },
       subtitle : {
          text: ''  
       },
       legend : {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 250,
          y: 100,
          floating: true,
          borderWidth: 1,
         
          backgroundColor: ('#FFFFFF'), shadow: true
          },
          xAxis:{
             categories: [ 'cc Score'], title: {
             text: null,
             visible: false
          } 
       },
       yAxis : {
          min: 0, title: {
             text: '', align: 'high'
          },
          labels: {
             overflow: 'justify'
          },
          visible: false
       },
       tooltip : {
          valueSuffix: ' '
       },
       plotOptions : {
          bar: {
             dataLabels: {
                enabled: true
             }
          }
       },
       credits:{
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

      console.log("LoanRequestById==="+JSON.stringify(this.LoanRequestById));
    }, error => console.log(error));

    this.apiService.getCustomerBankDetails(this.id,this.loanid)
    .subscribe(data => {
      this.CustomerBankDetails = data.result;
      console.log("CustomerBankDetails==="+JSON.stringify(this.CustomerBankDetails));
    }, error => console.log(error));

       
    this.apiService.getCustomerDetailInfo(this.id,this.loanid)
    .subscribe(data => {
      this.CustomerDetail = data.result;
      console.log("CustomerDetail==="+JSON.stringify(this.CustomerDetail));
    }, error => console.log(error));   

    this.apiService.getSummaryDetails(this.id,this.loanid,0)
    .subscribe(data => {
      this.SummaryDetails = data.result;
      console.log("SummaryDetails==="+JSON.stringify(this.SummaryDetails));
    }, error => console.log(error));   
        
   }
 
}
