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
  selector: 'app-soa-report',
  templateUrl: './program-report.component.html',
  styleUrls: ['./program-report.component.css']
})
export class ProgramReportComponent implements OnInit {
  loanNo: any;
  collectionlist = [];
  closeResult: string;
  customerName: any;
  curDate: any;
  p1:any;
  page:any
  firstDate: any;
  endDate: any;
  startDate: any;
  childOrgId: any;
  orgId: any;
  soaDetailList = [];
  retailerList = [];
  brandList = [];
  programList = [];
  programReportList = [];
  searchProgramList;
  errorMessage:boolean;
  p:any=1;
  
  programId:any;
  brandId:any;
  roleId :any;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,private crypto: Crypto,
    private apiService: ApiService, private set : breadcrumbMessage) { }
    preventTyping() {
      return false;
    }
  ngOnInit() {
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.page=0;
    this.p=1;
    this.p1=10;
    this.orgId=this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.errorMessage=true;
    this.curDate = moment().format('DD-MM-YYYY');
    this.firstDate = "01-" + moment().format('MM-YYYY');
    this.endDate = moment().format('YYYY-MM-DD');
    this.startDate = moment().format('YYYY-MM') + "-01";
    this.apiService.getProgramList(this.orgId,this.roleId).subscribe(data => {
      this.programId="";
          if (data.status == 200) {
            this.programList = data.result;
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
    // var childOrgId=((document.getElementById("childOrgId")) as HTMLInputElement).value;
    // alert("this.childOrgId1::"+this.childOrgId);
    if(this.orgId==''|| this.orgId == undefined){
      this.orgId='orgId';
    }
    if(this.programId==''|| this.programId == undefined){
      this.programId='programId';
    }
    if(this.brandId==''|| this.brandId == undefined){
      this.brandId='brandId';
    }
    // alert("this.childOrgId2::"+this.childOrgId);
    if(this.startDate!=''){
    if(this.endDate==''){
      this.set.setOption("Please enter End date",false);
      // alert('please enter End Date');
    }
    }
    if(this.endDate!=''){
      if(this.startDate==''){
        this.set.setOption("Please enter start date",false);
        // alert('please enter start Date');
      }
    }
    // if(this.startDate=='' && this.endDate==''){
    //   this.startDate='approvedon';
    // }
    
    const reqData = {
      orgId: this.orgId,
      startDate: this.startDate,
      endDate: this.endDate,
      brandId:this.brandId,
      programId:this.programId
    }
    console.log("reqData::"+JSON.stringify(reqData));
    this.apiService.getSOADetails(this.orgId,reqData)
      .subscribe(data => {
        if (data.status == 200) {
          this.programReportList = data.result;
          if(this.programReportList.length==0){
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
