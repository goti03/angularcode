import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'; 
import { data } from '../../dashboards/dashboard3/smart-data-table';
import { ApiService } from "..//../core/api.service";
import {ExcelService} from '../../shared/excel.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { numberFormat } from 'highcharts';
import {Currency} from '../../shared/currency.service';
import { state } from '@angular/animations';
import {PdfService} from '../../shared/pdf.service';
import { breadcrumbMessage } from "../../shared/breadcrumb-message.service";
import {Crypto} from '../../shared/crypto.service';  

@Component({
  selector: 'app-pending-repayment',
  templateUrl: './pending-repayment.component.html',
  styleUrls: ['./pending-repayment.component.css']
})
export class PendingRepaymentComponent implements OnInit {
  pendingRepaymentList=[];
  customerName=[];
  p:any;
  remarks:any;
  searchList:any;
  postDate = {
    loanId : "",
    startDate : "",
    endDate : "",
  }
  searchResult = [];
  resultWarning:any;
  isDisabled=true;
  submitted=false;
  roleId:any;
  page1:any=0;
  page2:any=0;
  q1:any=1;
  q2:any=1;
  p1:any=4;
  p2:any=4;

  constructor(public router : Router,public apiservice:ApiService,
    public excelservice:ExcelService,  public currency : Currency, public pdfservice :PdfService, private set : breadcrumbMessage, private crypto: Crypto ) { }

    indianCurrency(number : any) {
      return this.currency.indianCurrency(number);
    }
    showPageIndex1(pageIndex,pagesize){
      this.page1 = pageIndex;
      if(this.page1!=1){
      this.page1 = (this.page1-1)*pagesize;
      }else{
        this.page1=0;}
    }
    showPageIndex2(pageIndex,pagesize){
      this.page2 = pageIndex;
      if(this.page2!=1){
      this.page2 = (this.page2-1)*pagesize;
      }else{
        this.page2=0;}
    }
    preventTyping() {
      return false;
    }
  ngOnInit() {
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    console.log(this.roleId);
    this.q1=1;
    this.q2=1;
    this.apiservice.pendingRepayments().subscribe(data=>{
      if(data.status==200){
          this.pendingRepaymentList=data.result;
      }else{
      }
    })

    this.apiservice.getCustomerList().subscribe(data => {
      if(data.status==200){
        this.customerName=data.result;
      }
      else{

      }
    })

  }

  searchSubmit() {
    
   this.submitted = true;
    if(this.searchForm.valid)
    {
      this.search();
    }
    else
    {

    } 
  }

  search() {
    this.searchResult = [];
    if(this.postDate.loanId==""){
      this.postDate.loanId='loanId';
    }
    if((this.postDate.loanId!="") &&(this.postDate.startDate!="") &&(this.postDate.endDate!=""))
    {
    this.apiservice.listAll(this.postDate).subscribe(data => {
      if(data.status==200) {
        //console.log(data.result);
        if(data.result.length!=0)
        {
        this.isDisabled = false;
        this.searchResult = data.result;
        this.resultWarning ="";
        }
        else
        {
          this.isDisabled = true;
          this.resultWarning = "No data in the given Date."
          this.set.setOption(this.resultWarning, false);
        }
      }
      else{
        
      }
    });
    }
    else
    {
      this.resultWarning="Dates are Mandatory!";
      this.set.setOption(this.resultWarning, false);
    }
  }

  detail(id) {
    
        this.router.navigate(['/report/detailedtranch', id])

  }

  description(id) {
    
    this.router.navigate(['/report/descriptionpending', id])

}

exportPendingList() {
  var list = [];
  for(let p of this.pendingRepaymentList)
  {
    var listObj = {
      CustomerName:p.customerName,
      ReceivedAmount:p.receivedAmount,
      Date:p.creditDate,
      Status:p.processStatus,
      Remarks:p.remarks,
    }
    list.push(listObj);
  }
  this.excelservice.exportAsExcelFile(list,'Pending_Repayment_List');  
}


  export() {
            this.excelservice.exportAsExcelFile(this.searchResult,'search');  
  }
  matchDate  = new RegExp('^[1-9][0-9][0-9][0-9][-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[0-1])$');

  searchForm = new FormGroup({
    
    startDate: new FormControl('',[Validators.required, Validators.pattern(this.matchDate)]),
    endDate: new FormControl('',[Validators.required, Validators.pattern(this.matchDate)]),
    customerName : new FormControl('')
  });

  pdf() {
    var title = "Pending_repayment_report";
    var body = [
                ['Customer Name', 'Paid Amount', 'Date','Remarks'],
                ...this.pendingRepaymentList.map(p => ([p.customerName,p.receivedAmount,p.creditDate,p.remarks]))
                ]
    this.pdfservice.pdf(body,title, 'A4');
  }

}
