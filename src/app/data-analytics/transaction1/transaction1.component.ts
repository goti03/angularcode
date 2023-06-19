import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { ApiService } from '..//..//core/api.service';
import { ExcelService } from '../../shared/excel.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction1.component.html',
  styleUrls: ['./transaction1.component.css']
})
export class Transaction1Component implements OnInit {

  searchstartDate: any;
  searchendDate: any;
  currentdate: any;
  customerList = [];
  message:any;
  maxDate: any;
  constructor(private apiService: ApiService, private set: breadcrumbMessage, public excelservice: ExcelService) { }

  ngOnInit(): void {
    this.currentdate = moment().format('YYYY-MM-DD');
    this.searchstartDate = moment().format('YYYY-MM') + '-01';
    this.searchendDate = this.currentdate;
    this.maxDate=this.currentdate;

  }

  preventTyping() {
    return false;
  }
  month(a) {
    var d = moment(a);
    d.month(); // 1
    a = d.format('M')
    return a
  }
  exportExcel() {

    this.message=''
    if (this.month(this.searchstartDate) == this.month(this.searchendDate)) {
      this.apiService.getCustomerTransactionDetails1(this.searchstartDate, this.searchendDate).subscribe(data => {
        if (data.status == 200) {
          this.customerList = data.result;
          if(this.customerList.length==0){
            this.message="No Data Available"
          }
          const list = [];
          let j = 1;
          for (const i of this.customerList) {
            const listObj = {
              Sno: j++,
              'principalRecieved': i.principalRecieved,
              'normalInterestRecieved': i.normalInterestRecieved,
              'otherChargesRecieved': i.otherChargesRecieved,
              'pan No': i.panNo,
              'roi': i.roi,
              'loanAmount': i.loanAmount,
              'TransactionId': i.TransactionId,
              'organisationName': i.organisationName,
              'closedDate': i.closedDate,
              'programName': i.programName,
              'lenderName': i.lenderName,
              'penalInterestRecieved': i.penalInterestRecieved,
              'disbursementDate': i.disbursementDate,
              'totalRecieved': i.totalRecieved,
              'loanClosedDate': i.loanClosedDate,
              
            };
            list.push(listObj);
          }

          this.excelservice.exportAsExcelFile(list, 'transaction_Data');
          this.message=''
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      });

    } else {
      this.set.setOption('please choose startdate and enddate within the same month',false)
    }
  }
}
