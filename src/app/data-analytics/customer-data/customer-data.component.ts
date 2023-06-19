import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { ApiService } from '..//..//core/api.service';
import { ExcelService } from '../../shared/excel.service';


@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent implements OnInit {

  searchstartDate: any;
  searchendDate: any;
  currentdate: any;
  customerList = [];
  message:any;
  constructor(private apiService: ApiService, private set: breadcrumbMessage, public excelservice: ExcelService) { }

  ngOnInit(): void {
    this.currentdate = moment().format('YYYY-MM-DD');
    this.searchstartDate = moment().format('YYYY-MM') + '-01';
    this.searchendDate = this.currentdate;

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
      this.apiService.getCustomerDump(this.searchstartDate, this.searchendDate).subscribe(data => {
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
              'creditLimitamount': i.creditLimitamount,
              'pincode': i.pincode,
              'city': i.city,
              'panNumber': i.panNo,
              'loanRequestId': i.loanRequestId,
              'state': i.state,
              'sanctionDate': i.sanctionDate,
            };
            list.push(listObj);
          }

          this.excelservice.exportAsExcelFile(list, 'customer_Data');
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

