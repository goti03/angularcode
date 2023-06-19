import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment.js';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pg-transaction-data',
  templateUrl: './pg-transaction-data.component.html',
  styleUrls: ['./pg-transaction-data.component.css']
})
export class PgTransactionDataComponent implements OnInit {
  pgTransaction: any;
  searchpgTransaction: any;

  constructor(private apiService: ApiService, private modalService: NgbModal, private set: breadcrumbMessage) { }
  startDate: any;
  currentDate:any;
  endDate: any;
  searchLenderList;
  p1: any;
  p: any = 1;
  page: any;
  
  ngOnInit() {
    this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
    this.currentDate = moment().format('YYYY-MM-DD');
    this.p1 = 10;
    this.page = 0;
    this.pgTransactionData();
  }

  // nextButton() {
  //   if (this.invoiceList.length == 10) {
  //     this.p = Number(this.p) + 1;
  //     this.searchListfun();
  //   }
  // }

  //   previousButton() {
  //     if (this.p != 1) {
  //       this.p = Number(this.p) - 1;
  //       this.searchListfun();
  //     }
  //     this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  //     this.endDate = moment().format('YYYY-MM-DD');
  //     this.searchListfun();
  //   }

  

  pgTransactionData(){
    this.searchpgTransaction = '';
    const data={
      startDate:this.startDate,
      endDate:this.endDate,
    
    }
    this.apiService.pgTransactionData(data).subscribe((data=>{
      if(data.status==200){
      this.pgTransaction = data.result.response;
      
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }    }));
   }

   checkenddate(){
    this.endDate=  moment(this.startDate).add(7, 'days').format('YYYY-MM-DD');
  var enddate = moment(this.endDate);
  var currentdate = moment(this.currentDate)
  var duration = currentdate.diff(enddate,'days');
  
  console.log("the duration differnce is ==="+duration)
    if(duration<0){
      this.endDate=moment().format("YYYY-MM-DD")
    }
    }

    checkstartdate(){
      this.startDate=  moment(this.endDate).subtract(7, 'days').format("YYYY-MM-DD");
     
      }

      showPageIndex(pageIndex, pagesize) {
        this.page = pageIndex;
        console.log(this.page);
        if (this.page != 1) {
          this.page = (this.page - 1) * pagesize;
        } else {
          this.page = 0;
        }
      }

      resetSearch(){
        this.startDate='';
        this.endDate ='';
      }

      preventTyping() {
        return false;
      }
  }

  
