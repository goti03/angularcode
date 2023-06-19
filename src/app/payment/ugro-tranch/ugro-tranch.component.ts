import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { threadId } from 'worker_threads';
import { ApiService } from '../../core/api.service';
import { Crypto } from '../../shared/crypto.service';
import { Currency } from '../../shared/currency.service';
import { ExcelService } from '../../shared/excel.service';
import { PdfService } from '../../shared/pdf.service';
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';

@Component({
  selector: 'app-ugro-tranch',
  templateUrl: './ugro-tranch.component.html',
  styleUrls: ['./ugro-tranch.component.css']
})
export class UgroTranchComponent implements OnInit {
  userId: any;
  consolidateviewlist = [];
  request: any;
  lpid: any;
  status: any;
  lp1id: any;
  total: number = 0.00;
  loanId: any;
  p:any;
  constructor(private apiservice: ApiService, private crypto: Crypto, private currency: Currency, public pdfservice: PdfService, private router: Router, public route: ActivatedRoute, public excelservice: ExcelService, public set: breadcrumbMessage) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.lpid = this.route.snapshot.params['lpid'];
    this.apiservice.getconsolidateViewList(this.lpid).subscribe(data => {
      if (data.status = 200) {

        this.consolidateviewlist = data.result.data;
        this.lp1id = data.result.lpid;
        this.loanId=this.consolidateviewlist[0].loanRequestId;
        console.log( this.loanId);
 
        for (let a of this.consolidateviewlist) {
          a.total = 0;
        }
       
        var b = this.consolidateviewlist.map((a, i) => {
          a.total = (i == 0) ? a.amount : Number(this.consolidateviewlist[i].amount) + Number(this.consolidateviewlist[i - 1].total);
        });
      }
    });
  }
  approvalON() {
    const data = {
      // request: this.request,
      userId: this.userId,
      lpid: this.lp1id,
      status: '1'
    }
    this.apiservice.getconsolidateapproval(data).subscribe(data => {
      if (data.status == 200) {
        this.router.navigate(['/payment/repay'])
      }
    });
  }
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  rejectOn() {
    const data = {

      userId: this.userId,
      lpid: this.lp1id,
      status: '2'
    }
    this.apiservice.getconsolidateapproval(data).subscribe(data => {
      if (data.status == 200) {
        this.router.navigate(['/payment/repay'])
      }
    });
  }
  exportExcel() {
    var list = [];
    var j = 1;
    for (let p of this.consolidateviewlist) {
      const listObj = {
        Sno: j++,
        'CustomerName': p.orgName,
        'Lan-No': p.lanNo,
        'Loan Disbursal Id': p.loandisbursalId,
        'Amount': p.amount,
        'Adjust Principle': p.adjustAmountprinciple,
        'Adjust Interest': p.adjustAmountInterest,
        'Adjust Other Charges': p.adjustOtherCharges,
        'Total Amount': p.total
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'Pending_Repayment_List');
  }
 
  downloadSOA(e, loanId) {
    const data1 = {
      "currentActivityId": "25",
      "lastActivityTime": moment().format('YYYY-MM-DD HH:mm:ss'),
      "loanRequestId": loanId,
      "userId": this.userId,
      "userMedium": "backendApp",
      "from": moment().format('DD-MM-YYYY'),
      "to": moment().format('DD-MM-YYYY'),
      "fileType": e,
      "isLender":1
    }
    console.log("data_sent::::" + JSON.stringify(data1));
    this.apiservice.getSOAReport(data1).subscribe(data => {
      if (data.status == 200) {
        window.open(data.result, '_blank');
      } else {
        this.set.setOption(data.result, false);
      }
    }, error => { console.log(error.message); });
  }
}
