import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment.js';
import { ApiService } from "..//..//core/api.service";
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'

@Component({
  selector: 'app-status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.css']
})
export class StatusDetailsComponent implements OnInit {
  loanNo: any;
  collectionlist = [];
  closeResult: string;
  customerName: any;
  page:any;
  p1:any;
  curDate: any;
  firstDate: any;
  endDate: any;
  startDate: any;
  childOrgId: any;
  orgId: any;
  brandDetailList = [];
  retailerList = [];
  statusList = [];
  searchStatusList;
  errorMessage:boolean;
  p:any=1;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,
    private apiService: ApiService, private set : breadcrumbMessage) { }

  ngOnInit() {
    this.p1=10;
    this.page=0;
    this.errorMessage=true;
    this.apiService.getStatusReport().subscribe(data => {
        if (data.status == 200) {
          this.statusList = data.result;
          if(this.statusList.length==0){
            this.errorMessage=false;
          }else{
            this.errorMessage=true;
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
      this.set.setOption("Please enter End date",false);

      // alert('please enter End Date');
    }
    }
    if(this.endDate!=''){
      if(this.startDate==''){
        this.set.setOption("Please enter start Date", false);

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
