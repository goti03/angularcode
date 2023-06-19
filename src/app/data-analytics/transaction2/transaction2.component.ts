import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { ApiService } from '..//..//core/api.service';
import { ExcelService } from '../../shared/excel.service';
// import { MonthlyMisComponent } from '../../ops/monthly-mis/monthly-mis.component';

@Component({
  selector: 'app-transaction2',
  templateUrl: './transaction2.component.html',
  styleUrls: ['./transaction2.component.css']
})
export class Transaction2Component implements OnInit {

  customerList = [];
  message:any;
  yearsList=[];
  selectedMonth:any;
  selectedYear: any;
  years= [];
  Date:any;
  MonthList=[];
  constructor(private apiService: ApiService, private set: breadcrumbMessage, public excelservice: ExcelService) { }

  ngOnInit(): void {
    this. MonthList=[
      {name:"January",Id:'01'},
      {name:"February",Id:'02'},
      {name:"March",Id:'03'},
      {name:"April",Id:'04'},
      {name:"May",Id:'05'},
      {name:"June",Id:'06'},
      {name:"July",Id:'07'},
      {name:"August",Id:'08'},
      {name:"September",Id:'09'},
      {name:"October",Id:'10'},
      {name:"November",Id:'11'},
      {name:"December",Id:'12'},
    ];

    this.selectedYear =new Date().getFullYear();

    for (let year = this.selectedYear; year >= 2022; year--) {
      this.years.push(year);
  }
  }

  preventTyping() {
    return false;
  }
  exportExcel() {

    console.log( "year",this.selectedYear)
    console.log("month",this.selectedMonth)
    
    this.message=''
    this.Date=('01'+"-"+this.selectedMonth)+"-"+(this.selectedYear)
    const data={
      "date":this.Date,
    }
      this.apiService.getCustomerTransactionDetails2(data).subscribe(data => {
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
              'totalInterestReceived': i.totalInterestReceived,
              'orgName':i.orgName,
              'otherChargesRecieved': i.otherChargesReceived,
              'pan No': i.panNo,
              'roi': i.roi,
              'loanAmount': i.loanAmount,
              'TransactionId': i.TransactionId,
              'loan_request_id': i.loan_request_id,
              'closedDate': i.closedDate,
              'programName': i.programName,
              'lenderName': i.lenderName,
              'penalInterestRecieved': i.penalInterestReceived,
              'disbursementDate': i.disbursementDate,
              'totalRecieved': i.totalRecieved,
              'loanClosedAge': i.loanClosedAge,
              
            };
            list.push(listObj);
          }

          this.excelservice.exportAsExcelFile(list, 'transaction_Data');
          this.message=''
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      });

    
  }
}
