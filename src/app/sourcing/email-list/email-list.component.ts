import { Component, OnInit} from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService} from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {ExcelService} from '..//..//shared/excel.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';

@Component({
  selector: 'app-emailList',
  templateUrl: './email-list.component.html'
})
export class EmailListComponent implements OnInit{
  model2: NgbDateStruct;
  model: NgbDateStruct;
  firstDate:any;
  startDate:any;
  endDate:any;
  emailList=[];
  searchEmailList;
  p:any;
  clickStatus:any;
  typeId:any;
  campaignTypeList =[{"id":"1","name":"Email"},{"id":"2","name":"SMS"},{"id":"3","name":"Whatsapp"}];
  constructor(private excelService:ExcelService,private modalService: NgbModal,private http: HttpClient, private apiService: ApiService,private router: Router,
    private set : breadcrumbMessage) { }
    preventTyping() {
      return false;
    } 
  ngOnInit() {
    this.firstDate =moment().format('YYYY-MM')+"-01";
    this.endDate =moment().format('YYYY-MM-DD');
    this.clickStatus=1;
    const  emailData = {
      emailClick: this.clickStatus,
      startDate:this.firstDate,
      endDate:this.endDate
    }
    this.apiService.getEmailList(emailData).subscribe(res => this.emailList = res.result);
  }
  exportExcel():void {
    this.excelService.exportAsExcelFile(this.emailList, 'Seller_Click_Report');
  }
  submit(){
    
    // this.firstDate = this.model2.year + "-" + this.model2.month + "-" + this.model2.day;
    // this.endDate = this.model.year + "-" + this.model.month + "-" + this.model.day;
    // var emailClick=((document.getElementById("emailClick")) as HTMLInputElement).value;
    if(this.typeId == null || this.typeId == undefined || this.typeId == '0'){
      this.set.setOption("please select Campaign",false);
    }else{
      const  emailData = {
        emailClick: this.clickStatus,
        startDate:this.firstDate,
        endDate:this.endDate,
        typeId:this.typeId,
      }
      this.apiService.getEmailList(emailData).subscribe(data =>
        {
          if(data.status== 200){
            this.emailList = data.result
          }else{
            this.set.setOption(data.exceptionMessage,false);
          }
          }, error => console.log(error));
    }
  }
}