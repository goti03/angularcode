import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import { ApiService} from "..//..//core/api.service";
// import { MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-cicreport',
  templateUrl: './cicreport.component.html',
  styleUrls: ['./cicreport.component.css']
})
export class CicReportComponent implements OnInit {
  id: number;
  loanid:number;
  submitted = false;
  cicSummaryDetails:any;
  cicSummaryData:any;

  requestList: Observable<ReportModel[]>;
  constructor(
    private route: ActivatedRoute,private router: Router,private apiService : ApiService) { 
     }
  ngOnInit(): void {
    this.submitted = false;
    // this.id = this.route.snapshot.params['id'];
    // this.loanid = this.route.snapshot.params['loanid'];

     this.loanid = this.route.snapshot.params['loanid'];
    this.id = this.route.snapshot.params['id'];
    // this.id = 42;
    // this.loanid = 189;
    console.log("data=="+this.id+"loanid=="+this.loanid);

    this.apiService.getcicSummaryData(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.cicSummaryData = data.result;
      console.log("cicSummaryData==="+JSON.stringify(this.cicSummaryData));
    }, error => console.log(error));

    this.apiService.getcicSummaryDetails(this.id,this.loanid)
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.cicSummaryDetails = data.result;
      console.log("cicSummaryDetails==="+JSON.stringify(this.cicSummaryDetails));
    }, error => console.log(error));
    
    
   
  }
 
}
