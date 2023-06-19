import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/api.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from '../../shared/currency.service';
import { MOMENT } from 'angular-calendar';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import { ExcelService } from '../../shared/excel.service';
import { TreeMapModule } from '@swimlane/ngx-charts';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FocusTrap } from '@angular/cdk/a11y';

export interface retailerList{

}

@Component({
  selector: 'app-detailscreen',
  templateUrl: './detailscreen.component.html',
  styleUrls: ['./detailscreen.component.css']
})
export class DetailscreenComponent implements OnInit {

consentdate:any;
p:any=1;
searchDisbursalList:any;
page:any;
p1:any;
updatedate:any;
maxdate:any;
retailer:boolean=false;
datemins:any;
l:any;
loanrequestid:any;
detailslist:any;
  constructor(private apiService: ApiService, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private set: breadcrumbMessage, private datePipe: DatePipe, public excelservice: ExcelService) { }

  ngOnInit() {
    this.consentdate = moment().format('YYYY-MM')+"-01";
    this.maxdate=moment().format('YYYY-MM')+"-01";
    this.updatedate=moment().format('YYYY-MM-DD')
    this.displaydetails();
    this.p1=5;
    this.page=0;

  }
  preventTyping() {
    return false;
  }
  gotoList(loanrequestid){
    this.loanrequestid=loanrequestid;
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanrequestid,'nonStopFlag':'0' }} );
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
}

displaydetails(){ 
  const data={
    'startDate':this.consentdate,
    'endDate':this.updatedate
  }
   
this.apiService.viewHulCustomerDetails(data).subscribe(data => {
  if (data.status == 200) {
    this.detailslist = data.result;
  if(this.detailslist.length<1){
    this.set.setOption("No retailers are present within these dates", false);  
  }else{
    this.retailer=false;
    for(let i=0;i<this.detailslist.length;i++){
        this.detailslist[i].udc=(this.isNullorUndefinedorEmpty(this.detailslist[i].udc))?"NO":"YES";
        this.detailslist[i].okyc=(this.isNullorUndefinedorEmpty(this.detailslist[i].okyc))?"NO":"YES";
        this.detailslist[i].paperNach=(this.isNullorUndefinedorEmpty(this.detailslist[i].paperNach))?"NO":"YES";
    }
  }
  }else{
    this.set.setOption(data.exceptionMessage, false);  
  }
}
);
}
exportExcel() {
  var list = [];
  var j = 1;
  for (let i of this.detailslist) {
    const listObj = {
      Sno: j++,
      'Consent Date':i.consentDate,
      'Update Date': i.faUpdateDate,
      'Loan Request Id': i.loanRequestId,
      'Retailer Code' :i.retCode,
      'Request Id':i.requestId,
      'District Code' :i.distCode,
      'Vintage': i.vintage,
      'District name' :i.distName,
      'Mobile Number':i.mobileNo,
      'Org Id' :i.orgId,
      'Org Name ':i.orgName,
      'Program Id ':i.programId,
      'Program Name':i.programName,
      'okyc':i.okyc,
      'udc':i.udc,
      'paper nach':i.paperNach,
      'Approval Status':i.approvalStatus,
      'Loan Limit':i.loanLimit,
      'Bank Name':i.bankName,
      'UTR':i.utrNo,
      'OD Acknowledgement':i.loanStatus
      
    }
    list.push(listObj);
  }

  this.excelservice.exportAsExcelFile(list, 'HUL_Consent_List');
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

  





