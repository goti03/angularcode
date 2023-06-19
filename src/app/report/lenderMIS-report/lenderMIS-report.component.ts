import { Component, OnInit } from '@angular/core';
// import { Observable } from "rxjs";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment.js';
import { ApiService } from "..//..//core/api.service";
import { Currency } from '../../shared/currency.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { FormControl } from '@angular/forms';
// import { startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ExcelService } from '../../shared/excel.service';
import { PdfService } from '../../shared/pdf.service';
import {Crypto} from '../../shared/crypto.service';
// import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-lenderMIS-report',
  templateUrl: './lenderMIS-report.component.html',
  styleUrls: ['./lenderMIS-report.component.css']
})

export class LenderMISReportComponent implements OnInit {
  loanNo: any;
  collectionlist = [];
  closeResult: string;
  customerName: any;
  curDate: any;
  firstDate: any;
  endDate: any;
  startDate: any;
  childOrgId: any;
  orgId: any;
  page:any;
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
  lenderMISList = [];
  LenderList = [];
  roleId:any;
  anchorRole:boolean=false;
  lenderRole:boolean=false;
  lenderId:any;
//   columnDefs: ColDef[] = [
//     { field: 'make' },
//     { field: 'model' },
//     { field: 'price'}
// ];
// rowData = [
//   { make: 'Toyota', model: 'Celica', price: 35000 },
//   { make: 'Ford', model: 'Mondeo', price: 32000 },
//   { make: 'Porsche', model: 'Boxter', price: 72000 }
// ];
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,private crypto: Crypto,
    private apiService: ApiService, public currency: Currency, private set: breadcrumbMessage, public excelservice: ExcelService,
    public pdfservice: PdfService) { }

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }


  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = Number(this.crypto.decryt(window.localStorage.getItem('roleId')));

    this.p1 = 10;
    this.p = 1;
    this.apiService.getProgramLenderList().subscribe(res => this.LenderList = res.result);
    this.lenderId=(this.roleId==7||this.roleId==13||this.roleId==14)?  this.crypto.decryt(window.localStorage.getItem('lenderId')):'0';
    this.lenderRole=(this.roleId==7||this.roleId==13||this.roleId==14)?true:false;
    this.brandId = this.crypto.decryt(window.localStorage.getItem("orgId"));
    this.errorMessage = true;
this.page=0;
    this.curDate = moment().format('YYYY-MM-DD');
    this.searchstartDate = moment().format('YYYY-MM') + "-01";
    this.searchendDate = this.curDate;
    this.submit();
  }
  listSize(e) {
    this.p1 = Number(e.target.value);
    
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
  
  submit() {
    this.apiService.getLenderMISDetails(this.lenderId).subscribe(data => {
      if (data.status == 200) {
        this.lenderMISList = data.result;
      } else {
        this.errorMessage = false;
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }
  exportPdf() {
    var title = "lenderMIS_report";
    var body = [
                ['Loan End Date','Sanction Date','Utilization Date','Total Principal', 'Total Interest',
                'Total Charges' ,'Total Outstanding','overDue','Available Limit ','LAN No','Lender ROI'],
                ...this.lenderMISList.map(n => ([n.loanEndDate, n.sanctionedLimit, n.utilizedAmount, n.totalPrincipal,
                   n.totalInterest, n.totalCharges,n.totalOutstanding,
                   n.overDue, n.availableLimit, n.lanNo,n.lenderRoi]))
                ]
    this.pdfservice.pdf(body,title, 'A2');
  }
  exportExcel() {
    var list = [];
    var j = 1;
    for (let i of this.lenderMISList) {
      const listObj = {
        Sno: j++,
        'Loan Id':i.loanRequestId,
        'Customer Name':i.customerName,
        'program Name':i.programName,
        'Lender ROI ':i.lenderRoi,
        'LAN No' :i.lanNo,
        'Loan Creation Date':i.limitCreationDate,
        'Loan End Date':i.loanEndDate,
        'Sanction Limit': Number(i.sanctionedLimit),
        'Utilization Limit': Number(i.utilizedAmount),
        'Total Principal' :Number(i.totalPrincipal),
        'Total Interest':Number(i.totalInterest),
        'Total Charges' :Number(i.totalCharges),
        'Total Outstanding': Number(i.totalOutstanding),
        'overDue' :Number(i.overDue),
        'Available Limit':Number(i.availableLimit),
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'lender_MIS');
  }
  
}
