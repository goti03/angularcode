import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from "../../core/api.service";
import { Currency } from '../../shared/currency.service'
import { breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-gst3b',
  templateUrl: './gst3b.component.html',
  styleUrls: ['./gst3b.component.css']
})
export class Gst3bComponent implements OnInit {

  orgId : any;
  gstnNo : any;
  loanid : any;
  r1List = [];
  gstList = [];
  maxdate:any;
  gstNo : any;
  returnPeriod : any;
  filedDate : any;
  salesList = [];
  purchaseList = [];
  salesPeriod = [];
  purchasePeriod = [];
  orgGstId:any;
  hide:any;
  HeaderDetails: any;
  substatusId:any;
  programId:any;
  stausId:any;
  statusFlow:any;
  mobileNo:any;
  constructor(private apiService : ApiService, private route : ActivatedRoute, private currency : Currency,
    private set : breadcrumbMessage, private router: Router) { }
    preventTyping() {
      return false;
    }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nonStopFlag = params['nonStopFlag'];
    })
    this.tabSwitch(0);
    this.hide=false;
    this.maxdate = moment().subtract(1, 'months').format('YYYY-MM');
    this.orgId =  this.route.snapshot.params['orgId'];
    this.loanid = this.route.snapshot.params['loanid'];
    this.apiService.getLoanHeaderDetails(this.loanid)
    .subscribe(data => {
      this.HeaderDetails = data.result;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      console.log("substatusId::" + this.substatusId);
    }, error => console.log(error));
    this.apiService.getGSTDetails(this.orgId).subscribe( data => {
        this.gstList = data.result;
        if(this.gstList){
            this.hide=true;
        }
        this.gstnNo = this.gstList[0].gstNo;
        var data = this.gstList[0].gst3b_return_period;
        // var year = data.substring(0,4);
        // var month = data.substring(5,7);
        // this.returnPeriod = new Date(month+"/01/"+year);
        this.returnPeriod = this.gstList[0].gst3b_return_period;
        this.filedDate = this.gstList[0].gst3b_filing_date;
        this.orgGstId = this.gstList[0].orgGstId;
        // this.filedDate = moment().format('YYYY-MM-DD');
        this.apiService.getGstn3bList(this.orgId, this.gstList[0].gstNo).subscribe(data => {
          this.salesList = data.result.sales;
          this.purchaseList = data.result.purchase;
          // console.log(this.purchaseList);
          this.reload();
          // console.log("sales::"+this.salesPeriod);
          // console.log("purchase::"+this.purchasePeriod);
      })
    })


  }

  reload() {

    for(var a1=0; a1<this.purchaseList.length; a1++)
    {
      this.purchasePeriod[a1]= this.purchaseList[a1].period;
    }
    for(var b1=0; b1<this.purchasePeriod.length;b1++)
    {
      var m = this.purchasePeriod[b1].substring(0,2);
      var y = this.purchasePeriod[b1].substring(2,6);
      var date = new Date(m+"/01/"+y);
      this.purchasePeriod[b1]=date;
    }
    for(var a=0; a<this.salesList.length; a++)
    {
      this.salesPeriod[a] = this.salesList[a].period;
    } 
    for(var b=0; b<this.salesPeriod.length;b++)
    {
      var m = this.salesPeriod[b].substring(0,2);
      var y = this.salesPeriod[b].substring(2,6);
      var date = new Date(m+"/01/"+y);
      this.salesPeriod[b]=date;
    }
  }

  changeGstNo(e){
    this.gstnNo = e.target.value;
    for(var a=0;a<this.gstList.length;a++){
      if(this.gstList[a].gstNo == e.target.value){       
        var data = this.gstList[0].gst3b_return_period;
        var year = data.substring(0,4);
        var month = data.substring(5,7);
        // this.returnPeriod = new Date(month+"/01/"+year);
        this.returnPeriod = this.gstList[a].gst3b_return_period;
        this.filedDate = this.gstList[a].gst3b_filing_date;
        this.orgGstId=this.gstList[a].orgGstId;
        // this.filedDate = new Date(this.filedDate);
       }
    }
    this.salesPeriod = [];
    this.purchasePeriod = [];
    this.salesList = [];
    this.purchaseList = [];
    this.apiService.getGstn3bList(this.orgId, e.target.value).subscribe(data => {
      this.salesList = data.result.sales;
      this.purchaseList = data.result.purchase;
      this.reload(); 
    })
    
  }


  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }

  addSales(){
    const salesObj = {
      Cgst : '0',
      Igst : '0',
      Sgst : '0',
      headerId : '',
      month : '',
      orgId : this.orgId,
      period: '',
      taxableValue : '0',
      year : '',
      gst : ''
    }
    this.salesList.push(salesObj);
  }

  delsales(index){
    this.salesList.splice(index, 1);
    this.salesPeriod.splice(index, 1);
  }

  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addPurchases(){
    const purchaseObj = {
      cessAmt : '0',
      cgstAmt : '0',
      headerId : '',
      igstAmt : '0',
      month : '',
      orgId : this.orgId,
      period : '',
      sgstAmt : '0',
      year : '',
      gst : ''
    }
    this.purchaseList.push(purchaseObj);
  }

  delpurchase(index){
    this.purchaseList.splice(index, 1);
    this.purchasePeriod.splice(index, 1);
  }
  
  save(){
    for(var a=0; a<this.salesList.length; a++){
      var m, y;
      if(this.salesPeriod[a].length === 7){
        m = this.salesPeriod[a].toString().substring(5,7);
        this.salesList[a].month = m;
        y = this.salesPeriod[a].toString().substring(0,4);
        this.salesList[a].year = y;
      }else{
        m = this.salesPeriod[a].getMonth()+1;
        if(m < 10)
        {
          m = "0"+m;
        }
        y = this.salesPeriod[a].getFullYear();
        y = y.toString();
      }
      this.salesList[a].period = m+y;
    }
    for(var a1=0; a1<this.purchaseList.length; a1++){
      var m, y;
      if(this.purchasePeriod[a1].length === 7){
        m = this.purchasePeriod[a1].toString().substring(5,7);
        this.purchaseList[a1].month = m;
        y = this.purchasePeriod[a1].toString().substring(0,4);
        this.purchaseList[a1].year = y;
      }else{
        m = this.purchasePeriod[a1].getMonth()+1;
        if(m < 10)
        {
          m = "0"+m;
        }
        y = this.purchasePeriod[a1].getFullYear();
        y = y.toString();
      }
      this.purchaseList[a1].period = m+y;
    }
    // for(var a=0; a<this.salesList.length;a++){
    //   this.salesList[a].month = this.salesList[a].period.substring(0,2);
    //   this.salesList[a].year = this.salesList[a].period.substring(3,6);
    // }
    // for(var a1=0; a1<this.purchaseList.length;a1++){
    //   this.purchaseList[a1].month = this.purchaseList[a1].period.substring(0,2);
    //   this.purchaseList[a1].year = this.purchaseList[a1].period.substring(3,6);
    //   this.purchaseList[a1].taxableValue = 0;
    // }

    console.log(this.salesList);
    console.log(this.purchaseList);
    // if(this.validate3BPurchase()){
    //     this.set.setOption("Please check 3b purchase details,all are mandatory fields",false);
    // }else if(this.validate3BSales()){
    //     this.set.setOption("Please check 3b sales details,all are mandatory fields",false);
    // }else{
      const list = {
        orgGstId:this.orgGstId,
        returnPeriod:this.returnPeriod,
        filedDate:this.filedDate,
        Sales3B : this.salesList,
        Purchase3B : this.purchaseList,
        gst:this.gstnNo,
        orgId:this.orgId
      }
  
      this.apiService.saveGstn3BList(list).subscribe(data => {
        if(data.status == 200){
          this.set.setOption("Updated Successfully", true);
          this.goToList();
        }else{
          this.set.setOption("Failed to update", false);
        }
      })
    // }
  
  }
  validate3BPurchase(){
    var count=0;
    if(this.salesList){
      for(var a=0; a<this.salesList.length; a++){
        if(this.isNullorUndefinedorEmpty(this.salesList[a].taxableValue)){
          count++;
        }else if(this.isNullorUndefinedorEmpty(this.salesList[a].Igst)){
          count++;
        }else if(this.isNullorUndefinedorEmpty(this.salesList[a].Cgst)){
          count++;
        }else if(this.isNullorUndefinedorEmpty(this.salesList[a].Sgst)){
          count++;
        }
      }
      if(count == 0){
        return false;
      }else{
        return true;
      }
    }
  }
  validate3BSales(){
    var count=0;
    if(this.salesList){
      for(var a=0; a<this.purchaseList.length; a++){
        if(this.isNullorUndefinedorEmpty(this.salesList[a].igstAmt)){
          count++;
        }else if(this.isNullorUndefinedorEmpty(this.salesList[a].cgstAmt)){
          count++;
        }else if(this.isNullorUndefinedorEmpty(this.salesList[a].sgstAmt)){
          count++;
        }else if(this.isNullorUndefinedorEmpty(this.salesList[a].cessAmt)){
          count++;
        }
      }
      if(count == 0){
        return false;
      }else{
        return true;
      }
    }
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == null || str == undefined);
}
nonStopFlag : any;
  goToList(){
    if(this.nonStopFlag == 0){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
  }else{
      this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
  }
  }

  tabList = ['Sales', 'Purchases'];
  tab : any;
  tabSwitch(a){
    var count = 0;
    for(let b of this.tabList){
      if(this.tab == b){
        document.getElementById('tab_'+count).classList.remove('active');
      }
      count++;
    }
    this.tab = this.tabList[a];
    document.getElementById('tab_'+a).classList.add('active');
  }

  tab1 : boolean = false;
toggle(){
  this.tab1 = !this.tab1;
}

}
