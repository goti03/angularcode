import { Component, OnInit } from '@angular/core';
import { ApiService } from "..//..//core/api.service";
import {NgxPaginationModule} from 'ngx-pagination';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { HeatMapCellComponent } from '@swimlane/ngx-charts';
import { ExcelService } from '../../shared/excel.service';
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-nonidentified-payment',
  templateUrl: './nonidentified-payment.component.html',
  styleUrls: ['./nonidentified-payment.component.css']
})
export class NonidentifiedPaymentComponent implements OnInit {
  accountType:any;
  paymentlist:any;
  p1:any;
  p:any;
  orgId:any;
  tranch:boolean=true;
  i:any;
  finalamt:any;
  rowid:any;
  mapper:any;
  mapping:any;
  paylist:any;
  dataset:any;
  errormsg:any;
orgIds:any
  page:any;
  closeResult: String = "";
  userId:any;
  mappingType:any;
  allaccountType:any;
  accountnameCtrl: FormControl;
  proceedc:boolean=false;
  filteredaccountname: Observable<any[]>;

  constructor(private apiService: ApiService, private modalService: NgbModal,private route: ActivatedRoute, private router: Router, public excelservice: ExcelService ,public currency: Currency, private set: breadcrumbMessage,private crypto: Crypto) {
    this.accountnameCtrl = new FormControl();

    this.apiService.getorgaccount().subscribe(data => {
      if (data.status == 200) {
        this.allaccountType= data.result;
        console.log(data.result);
        for (let c of this.allaccountType) {
          c.accountInfo = c.orgName
        }
        console.log("this.accountType :" + this.allaccountType);
        this.filteredaccountname = this.accountnameCtrl.valueChanges
          .pipe(startWith(''), 
          map(list => list ? this.accountTypeList(list) : this.allaccountType.slice())
          );
        console.log("filteredorgname:" + this.  filteredaccountname);
      }
    }, error => console.log(error));
   }
   accountTypeList(name: any): any {
    console.log(name);
    return this.allaccountType.filter(list =>
      list.accountInfo.toLowerCase().includes(name.toLowerCase()));
  }

  ngOnInit() {
    var c;
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.p1=5;
    this.page=0;
    this.mappingType=1;
    c=window.localStorage.getItem("a")
    if(c=="yes"){
      this.set.setOption("Payment done Successfully",true)
    }
    this.p=1;
    this.proceedc=false;
    this.mapping="Mapping Via Tranch"
    window.localStorage.setItem("a","no")
    this.apiService.getorgaccount().subscribe(res => this.accountType = res.result);
    this.apiService.getunidentifiedpaymentlist().subscribe(data=>{
      if(data.status==200){
this.paymentlist = data.result;
}
else { this.set.setOption(data.exceptionMessage,false)
  //this.errormsg = data.exceptionMessage;
}
    });
  }
  showPageIndex(pageIndex,pagesize){
    this.page = pageIndex;
    console.log(this.page);
    if(this.page!=1){
    this.page = (this.page-1)*pagesize;
  }
  else
  {
    this.page=0;}}
 
  orgMapping(content,rowid,amt) {
   this.mapper=1;
   this.proceedc=false;
   this.errormsg="";
    this.accountnameCtrl = new FormControl();
    this.dataset="";
    this.rowid=rowid;
    this.finalamt=amt;
    this.mappingType=1;
    this.tranch=true;
    this.mapping="Mapping Via Tranch"

    this.tranch=true;
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  tranchreset()
  { this.mapping="Mapping Via Tranch"
this.mappingType=1;
this.tranch=true;
  }
pfreset()
{ this.mapping="Mapping Via PF"
this.tranch=false;
  this.mappingType=2;
}
changer(data)
{this.proceedc=false;
  this.accountnameCtrl = new FormControl();
  if(data=="1") {
    this.tranchreset();
  }
  else{
    this.pfreset();
  }
}
reject(){
  this.modalService.dismissAll();
}
confirms() {
this.proceedc=true;
}
confirmstranch() {

  if(this.isNullorUndefinedorEmpty(this.accountnameCtrl.value))
  {
this.errormsg="please select organization"
  }
  else{
  this.proceedc=true;
  }
}
isNullorUndefinedorEmpty(str) {
  return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
}
acceptpf()
{var a;
  if(this.isNullorUndefinedorEmpty(this.accountnameCtrl.value)){
a ="0"
  }
  else{
    if(!this.isNullorUndefinedorEmpty(this.accountnameCtrl.value)) {
    for(let m of this.allaccountType) {

  if((m.orgName)==this.accountnameCtrl.value) {
  a = m.orgId
break;}  } }}
  const data={
    "id":this.rowid,
    "orgId": a,
    "userId":this.userId,
    "batchAmt":this.finalamt,
    "mappingType":this.mappingType
  }
  this.apiService.mapOrganization(data).subscribe(data => {
    if (data.status == 200) {
window.localStorage.setItem("a","yes")
this.ngOnInit();
//   this.set.setOption("Payment done Successfully",true)
   
      // window.localStorage.setItem('mobileNob', this.mobilenumber);
    }else { this.set.setOption(data.exceptionMessage,false)
      //this.errormsg = data.exceptionMessage;
    }
  }, error => console.log(error));
}
registerOrganization(){
  var a;
  if(this.isNullorUndefinedorEmpty(this.accountnameCtrl.value)){
this.errormsg="please select organization"
  }
  else{
    if(!this.isNullorUndefinedorEmpty(this.accountnameCtrl.value)) {
    for(let m of this.allaccountType) {

  if((m.orgName)==this.accountnameCtrl.value) {
    this.orgIds = m.orgId
    break;
  }
  }
  }
}
const data={
  "id":this.rowid,
  "orgId": this.orgIds,
  "userId":this.userId,
  "batchAmt":this.finalamt,
    "mappingType":this.mappingType
}
this.apiService.mapOrganization(data).subscribe(data => {
  if (data.status == 200) {
    window.localStorage.setItem("a","yes")
    this.ngOnInit();
 //this.set.setOption("Organization Mapped Successfully",true)
 
    // window.localStorage.setItem('mobileNob', this.mobilenumber);
  }else { this.set.setOption(data.exceptionMessage,false)
    //this.errormsg = data.exceptionMessage;
  }
}, error => console.log(error));
  }
indianCurrency(number: any) {
  return this.currency.indianCurrency(number);
}
}

