import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ReportModel } from '../reportModel';
import * as moment from 'moment/moment.js';
import { DatePipe } from '@angular/common';
import { ApiService} from "..//..//core/api.service";
import { Currency } from '../../shared/currency.service';

@Component({
  selector: 'app-statement-account',
  templateUrl: './statement-account.component.html',
  styleUrls: ['./statement-account.component.css']
})
export class StatementAccountComponent implements OnInit {
  id:any;
  loanid:any;
  statementList:any;
  curDate:any;
  firstDate:any;
   
   startDate:any;
   endDate:any;
   HeaderDetails:any;
   date: ReportModel = new ReportModel();
   model: NgbDateStruct;
   model2: NgbDateStruct;
   p : any=1;
  constructor(private route: ActivatedRoute,private router: Router,private apiService : ApiService,
    private datePipe: DatePipe, private currency : Currency) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    this.route.queryParams.subscribe(params => {
      this.nonStopFlag = params['nonStopFlag'];
    })
    this.apiService.getLoanHeaderDetails(this.loanid)
                .subscribe(data => {
                  this.HeaderDetails=data.result;
              }, error => console.log(error));var date = new Date();
    this.curDate =moment().format('DD-MM-YYYY');
    this.firstDate ="01-"+moment().format('MM-YYYY');
    // alert("this.curDate=="+this.curDate+"firstDate=="+this.firstDate);

    this.date.startDate=this.firstDate;
    this.date.endDate=this.curDate;
    this.apiService.getStatementList(this.loanid,this.date)
    .subscribe(data => {
      this.statementList=data.result;
    }, error => console.log(error));
    this.model = {
      "year": Number(this.date.startDate.split("-")[2]),
      "month": Number(this.date.startDate.split("-")[1]),
      "day": Number(this.date.startDate.split("-")[0])
    }
    this.model2 = {
      "year": Number(this.date.endDate.split("-")[2]),
      "month": Number(this.date.endDate.split("-")[1]),
      "day": Number(this.date.endDate.split("-")[0])
    }
  }
  submit(){
    this.startDate = this.model.day + "-" + this.model.month + "-" + this.model.year;
    this.endDate = this.model2.day + "-" + this.model2.month + "-" + this.model2.year;
    this.date.startDate=this.startDate;
    this.date.endDate=this.endDate;
    this.apiService.getStatementList(this.loanid,this.date)
    .subscribe(data => {
      this.statementList=data.result;
      // alert("statementList=="+JSON.stringify(this.statementList));
    }, error => console.log(error));
  }
  nonStopFlag : any;
  goToList(){
    if(this.nonStopFlag == 0){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }else{
        this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
    }
  }
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }

tab : boolean = false;
toggle(){
  this.tab = !this.tab;
}
}
