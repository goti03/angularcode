import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment.js';
import { ApiService } from "..//..//core/api.service";
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-repayment-report',
  templateUrl: './repayment-report.component.html',
  styleUrls: ['./repayment-report.component.css']
})
export class RepaymentReportComponent implements OnInit {
  loanNo: any;
  collectionlist = [];
  closeResult: string;
  customerName: any;
  curDate: any;
  firstDate: any;
  endDate: any;
p1:any;
page:any;
  startDate: any;
  childOrgId: any;
  orgId: any;
  repaymentDetailList = [];
  retailerList = [];
  searchBrandList;
  errorMessage:boolean;
  p:any=1;
  programId:any;
  brandId:any;
  roleId :any;
  brandList = [];
  programList = [];
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,
    private apiService: ApiService, private set : breadcrumbMessage,private crypto: Crypto) { }
    preventTyping() {
      return false;
    }
  ngOnInit() {
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.p1=10;
    this.p=1;
    this.page=0;
    this.orgId=this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.errorMessage=true;
    this.curDate = moment().format('DD-MM-YYYY');
    this.firstDate = "01-" + moment().format('MM-YYYY');
    this.endDate = moment().format('YYYY-MM-DD');
    this.startDate = moment().format('YYYY-MM') + "-01";
    // this.brandId=" ";
    // this.programId=" ";
    this.programId="";
    this.apiService.getProgramList(this.roleId,this.orgId).subscribe(data => {
      if (data.status == 200) {
        this.programList = data.result;
        // this.brandId="";
      } 
    }, error => console.log(error));
  }
  getBrandDetails(){
    this.orgId="";
    this.brandId="";
    this.apiService.getBrandNameList(this.programId).subscribe(data => {
      if (data.status == 200) {
        this.brandList = data.result;
      } 
    }, error => console.log(error));
  }
  getRetailerDetails(){
    this.orgId="";
    this.apiService.getParentRetailerList(this.programId,this.brandId).subscribe(data => {
      if (data.status == 200) {
        this.retailerList = data.result;
      } 
    }, error => console.log(error));
  }

  submit() {
    if(this.orgId==''|| this.orgId == undefined){
      this.orgId='orgId';
    }
    if(this.programId==''|| this.programId == undefined){
      this.programId='programId';
    }
    if(this.brandId==''|| this.brandId == undefined){
      this.brandId='brandId';
    }
    if(this.startDate!=''){
    if(this.endDate==''){
      this.set.setOption("Please enter End date",false);
      // alert('please enter End Date');
    }
    }
    if(this.endDate!=''){
      if(this.startDate==''){
        this.set.setOption("Please enter Start date",false);
        // alert('please enter start Date');
      }
    }
    if(this.startDate=='' && this.startDate==''){
      this.startDate='approvedon';
    }
    
    const reqData = {
      orgId: this.orgId,
      startDate: this.startDate,
      endDate: this.endDate,
      brandId:this.brandId,
      programId:this.programId
    }
    
    this.apiService.getRepaymentDetails(this.orgId,reqData)
      .subscribe(data => {
        if (data.status == 200) {
          this.repaymentDetailList = data.result;
          if(this.repaymentDetailList.length==0){
            this.errorMessage=false;
          }else{
            this.errorMessage=true;
          }
        } else {
          // alert(data.exceptionMessage);
        }
      }, error => console.log(error));
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
