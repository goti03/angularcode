import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment.js';
import { ApiService } from "..//..//core/api.service";
import { Currency } from '../../shared/currency.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ExcelService } from '../../shared/excel.service';
import { PdfService } from '../../shared/pdf.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-overdue-report',
  templateUrl: './overdue-report.component.html',
  styleUrls: ['./overdue-report.component.css']
})



export class OverDueReportComponent implements OnInit {
  loanNo: any;
  collectionlist = [];
  closeResult: string;
  page:any;
  customerName: any;
  curDate: any;
  firstDate: any;
  endDate: any;
  startDate: any;
  childOrgId: any;
  orgId: any;
  soaDetailList = [];
  brandList = [];
  programList = [];
  SOADetails = [];
  searchBrandList;
  errorMessage: boolean;
  p: any=1;
  p1: any;
  programId: any;
  brandId: any;
  userId:any;
  loanId: any;
  searchSOA: any;

  lenderList1: any;
  lenderCtrl: FormControl;
  filteredLender: Observable<any[]>;

  customerList1 = [];
  overdueList = [];
  customerCtrl: FormControl;
  filteredCustomer: Observable<any[]>;

  searchstartDate: any;
  searchendDate: any;

  customerCheck = false;

  searchList: any;
  message: any;
  sourcingPartnerList = [];
  roleId :any;
  anchorRole:boolean=false;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,
    private apiService: ApiService, public currency: Currency, private set: breadcrumbMessage, public excelservice: ExcelService,
    public pdfservice: PdfService,private crypto: Crypto) { }

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }


  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = Number(this.crypto.decryt(window.localStorage.getItem('roleId')));
    this.p1 = 10;
    this.p = 1;
    this.page=0;
    if(this.roleId==1||this.roleId==3){
      this.brandId=0;
      this.submit();
    }
  else
  {
    this.brandId = this.crypto.decryt(window.localStorage.getItem("orgId"));
    this.submit();
  }
    this.errorMessage = true;
    this.curDate = moment().format('YYYY-MM-DD');
    this.searchstartDate = moment().format('YYYY-MM') + "-01";
    this.searchendDate = this.curDate;
    this.apiService.getBrandDistributerList().subscribe(res => { this.sourcingPartnerList = res.result })
    if(this.roleId==11){
      this.anchorRole=true;
    }
  }
  listSize(e) {
    this.p1 = Number(e.target.value);
  }
  
  submit() {
    this.apiService.getOverDueList(this.brandId).subscribe(data => {
      if (data.status == 200) {
        this.overdueList = data.result;
      } else {
        this.errorMessage = false;
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }
  exportPdf() {
    var title = "Anchor_MIS_report";
    var body = [
                ['LOS Id','Org Name','Dealer Code','Account No','Dealer Address', 'Credit Period','Grace Period','Limit Sanctioned',
                'Loan Outstanding' ,'Status Name ','Substatus Name','Utilization ','OverDue','Anchor Name'],
                ...this.overdueList.map(n => ([n.loanId,n.dealerName, n.dealerCode, n.accountNo, n.dealerLocation, n.dealerLocation,
                   n.creditPeriod, n.gracePeriod,n.limitSanctioned,this.indianCurrency(n.totalOutstanding),
                   n.statusName, n.subStatusName, n.utilization,this.indianCurrency(n.overDue),n.anchorName]))
                ]
    this.pdfservice.pdf(body,title, 'A2');
  }
  exportExcel() {
    var list = [];
    var j = 1;
    for (let i of this.overdueList) {
      const listObj = {
        Sno: j++,
        'LOS Id':i.loanId,
        'Org Name':i.dealerName,
        'Dealer Code': i.dealerCode,
        'Account No': i.accountNo,
        'Dealer Address' :i.dealerLocation,
        'Credit Period':i.creditPeriod,
        'Grace Period' :i.gracePeriod,
        'Limit Sanctioned': i.limitSanctioned,
        'Loan Outstanding' :this.indianCurrency(i.totalOutstanding),
        'Status Name ':i.statusName,
        'Substatus Name' :i.subStatusName,
        'Utilization ':i.utilization,
        'OverDue':this.indianCurrency(i.overDue),
        'Anchor Name':i.anchorName
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'Anchor_MIS_report');
  }

showPageIndex(pageIndex,pagesize){
  this.page = pageIndex;
  console.log(this.page);
  if(this.page!=1){
  this.page = (this.page-1)*pagesize;
}
else
{
  this.page=0;
}
}

}
