import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
// import { Observable } from "rxjs";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment.js';
import { ApiService } from "..//..//core/api.service";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { Currency } from '../../shared/currency.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { FormControl } from '@angular/forms';
// import { startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { lender } from '../../../environments/environment';
import { lenderconfiguration } from '../../../environments/lender.config';
import { map } from 'rxjs/operators/map';
import {Crypto} from '../../shared/crypto.service';  



@Component({
  selector: 'app-soa-report',
  templateUrl: './SOA-report.component.html',
  styleUrls: ['./SOA-report.component.css']
})



export class SOAReportComponent implements OnInit {
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
  soaDetailList = [];
  brandList = [];
  programList = [];
  SOADetails = [];
  searchBrandList;
  errorMessage: boolean;
  p: any;
  p1: any;
  page:any;
  programId: any;
  brandId: any;
  userId: any;
  loanId: any;
  searchSOA: any;

  lenderList1: any;
  lenderCtrl: FormControl;
  filteredLender: Observable<any[]>;

  customerList1 = [];
  customerCtrl: FormControl;
  filteredCustomer: Observable<any[]>;
type:any;
allowselect:boolean=false;
  searchstartDate: any;
  searchendDate: any;
env:any;
  customerCheck = false;
  lan:any;
  lenderIdp:any;
  pan:any;
  searchList: any;
  message: any;
  roleId: any;
  isLender: any;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,
    private apiService: ApiService, public currency: Currency, private set: breadcrumbMessage, private crypto: Crypto) {
    this.customerCtrl = new FormControl();

    this.apiService.getCustomerList().subscribe(data => {
      if (data.status == 200) {
        this.customerList1 = data.result;
        for (let c of this.customerList1) {
          c.customerInfo = c.orgName + " - " + c.loanRequestNo +" - "+c.pan+" - "+c.lan;
        }
        console.log(data.result);
        this.filteredCustomer = this.customerCtrl.valueChanges
          .pipe(
            startWith(''),
            map(list => list ? this.customerlist(list) : this.customerList1.slice())
          );
        console.log("this.filteredCustomer::"+JSON.stringify(this.filteredCustomer));
      }
    }, error => console.log(error));


  }
  preventTyping() {
    return false;
  }
  customerlist(name: string) {
    return this.customerList1.filter(list =>
      // list.orgName.toLowerCase().indexOf(name.toLowerCase()) === 0);
      list.customerInfo.toLowerCase().includes(name.toLowerCase()));
  }

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }

  ngOnInit() {
    this.p1 = 10;
    this.p = 1;
    this.page=0;
    this.env=lenderconfiguration.env;
    this.lenderIdp=Number(this.crypto.decryt(window.localStorage.getItem('lenderId')));
    this.errorMessage = true;
    this.type="";
    this.curDate = moment().format('YYYY-MM-DD');
    this.searchstartDate = moment().format('YYYY-MM') + "-01";
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    if(this.env=='Jana')
    {
      this.isLender="0";
      this.type="Borrower";
      this.allowselect=false;
    }
   else if(this.roleId==1){
      this.isLender="";
      this.allowselect=true;
    }else if(this.roleId==13||this.roleId==14||this.roleId==7||this.lenderIdp!=0){
      this.isLender="1";
      this.type="Lender";
    this.allowselect=false;
    }
    else if(this.roleId==4||this.roleId==5||this.roleId==8||this.roleId==3||this.roleId==6) {
      this.isLender="0";
      this.type="Borrower";
      this.allowselect=false;
    }
    this.searchendDate = this.curDate;
    this.userId=this.crypto.decryt(window.localStorage.getItem('userId'));
    console.log(this.userId);
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
}
  export(e) {
    console.log("I am called for excel");
    if (this.isNullorUndefinedorEmpty(this.customerCtrl.value)) {
      this.set.setOption("Customer name is Mandatory", false);
      return;
    } else if (this.isNullorUndefinedorEmpty(this.searchstartDate)) {
      this.set.setOption("Start date is Mandatory", false);
      return;
    }else if (this.isNullorUndefinedorEmpty(this.searchendDate)) {
      this.set.setOption("End date is Mandatory", false);
      return;
    }else 
    {
      // console.log("icon is cliked");
          var customerInfo = this.customerCtrl.value;
          var loanId;
          for (let a of this.customerList1) {
            var dataCheck = a.orgName + " - " + a.loanRequestNo +" - "+a.pan+" - "+a.lan;
            if (customerInfo == dataCheck) {
              loanId = a.loanId;
            }
          }
          const data1 = {
            "currentActivityId": "25",
            "lastActivityTime": moment().format('YYYY-MM-DD HH:mm:ss'),
            "loanRequestId": loanId,
            "userId": this.userId,
            "userMedium": "backendApp",
            "from": moment(this.searchstartDate).format('DD-MM-YYYY'),
            "to": moment(this.searchendDate).format('DD-MM-YYYY'),
            "fileType": e,
            "lan":this.lan,
            "pan":this.pan,
            "isLender":this.isLender
          }
          console.log("data_sent::::" + JSON.stringify(data1));
          this.apiService.getSOAReport(data1).subscribe(data => {
            if (data.status == 200) {
              window.open(data.result, '_blank');
            } else {
              this.set.setOption(data.result, false);
            }
          }, error => { console.log(error.message); });
    }
  }


  listSize(e) {
    this.p1 = Number(e.target.value);
  }

  submit() {
    this.errorMessage = true;
    if (this.isNullorUndefinedorEmpty(this.customerCtrl.value) || this.isNullorUndefinedorEmpty(this.searchstartDate) || this.isNullorUndefinedorEmpty(this.searchendDate)) {
      this.set.setOption("All fields are mandatory", false);
      return;
    } else {
      var customerInfo = this.customerCtrl.value;
      var loanId;
      for (let a of this.customerList1) {
        var dataCheck = a.orgName + " - " + a.loanRequestNo +" - "+a.pan+" - "+a.lan;
        if (customerInfo == dataCheck) {
          loanId = a.loanId;
        }
      }
      this.lan=(this.lan)?this.lan:'lan';
      this.pan=(this.pan)?this.pan:'pan';
      this.apiService.getSoaReport(loanId, this.searchstartDate, this.searchendDate,this.lan,this.pan).subscribe(data => {
        this.SOADetails = data.result;
        if (this.SOADetails.length == 0) {
          this.message = "No Data Available";
          this.errorMessage = false;
        }
      })

    }
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
 









