import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment.js';
import { ApiService } from "..//..//core/api.service";
import {Currency} from '../../shared/currency.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {
  loanNo: any;
  collectionlist = [];
  closeResult: string;
  customerName: any;
  curDate: any;
  firstDate: any;
  page:any;
  endDate: any;
  startDate: any;
  childOrgId: any;
  orgId: any;
  brandDetailList = [];
  p1:any;
  retailerList = [];
  searchBrandList;
  errorMessage:boolean;
  p:any = 1;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,private crypto: Crypto,
    private apiService: ApiService,  public currency : Currency, private set : breadcrumbMessage) { }

    preventTyping() {
      return false;
    }

  ngOnInit() {
    this.p=1;
    this.p1=10;

    this.errorMessage=true;
    this.page=0;
    this.orgId=this.crypto.decryt(localStorage.getItem("orgId"));
    this.curDate = moment().format('DD-MM-YYYY');
    this.firstDate = "01-" + moment().format('MM-YYYY');
    this.endDate = moment().format('YYYY-MM-DD');
    this.startDate = moment().format('YYYY-MM') + "-01";
    this.childOrgId='childorgid';
    const reqData = {
      childOrgId: 'childorgid',
      startDate: this.startDate,
      endDate: this.endDate
    }
    

    this.apiService.getChildRetailerList(this.orgId).subscribe(data => {
        if (data.status == 200) {
          this.retailerList = data.result;
        } else {
          // alert(data.exceptionMessage);
        }
      }, error => console.log(error));
    this.apiService.getbrandList(this.orgId,reqData).subscribe(data => {
        if (data.status == 200) {
          this.brandDetailList = data.result;
          if(this.brandDetailList.length==0){
            this.errorMessage=false;
          }else{
            this.errorMessage=true;
            this.childOrgId=data.result[0].childOrgId;
          }
        } else {
          // alert(data.exceptionMessage);
        }
      }, error => console.log(error));
  }

  submit() {
    // var childOrgId=((document.getElementById("childOrgId")) as HTMLInputElement).value;
    // alert("this.childOrgId1::"+this.childOrgId);
    if(this.childOrgId==''|| this.childOrgId == undefined){
      this.childOrgId='childorgid';
    }
    // alert("this.childOrgId2::"+this.childOrgId);
    if(this.startDate!=''){
    if(this.endDate==''){
      this.set.setOption("Please enter End Date",false);

      // alert('please enter End Date');
    }
    }
    if(this.endDate!=''){
      if(this.startDate==''){
        this.set.setOption("Please enter Start Date",false);

        // alert('please enter start Date');
      }
    }
    if(this.startDate=='' && this.startDate==''){
      this.startDate='approvedon';
    }
    
    const reqData = {
      childOrgId: this.childOrgId,
      startDate: this.startDate,
      endDate: this.endDate
    }
    console.log("reqData::"+JSON.stringify(reqData));
    this.apiService.getbrandList(this.orgId,reqData)
      .subscribe(data => {
        if (data.status == 200) {
          this.brandDetailList = data.result;
          if(this.brandDetailList.length==0){
            this.errorMessage=false;
          }else{
            this.errorMessage=true;
          }
        } else {
          // alert(data.exceptionMessage);
        }
      }, error => console.log(error));
  }
  
  indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
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
