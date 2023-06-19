import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../core/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import { templateJitUrl } from '@angular/compiler';
import { ExcelService } from '../../shared/excel.service';
import { data } from '../../dashboards/dashboard3/smart-data-table';
import { Currency } from '../../shared/currency.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-Update-2A.component',
  templateUrl: './Update-2A.component.html',
  styleUrls: ['./Update-2A.component.css']
})
export class Update2AComponent implements OnInit {

  orgId : any;
  gstnNo : any;
  loanid : any;
  list = [];
  gstList = [];
  period = [];
  month2aData1 = [];
  month2aData2 = [];
  edit2aSData = [];
  gstNo:any;
  hide:any;
  returnPeriod : any;
  filedDate : any;
  HeaderDetails: any;
  substatusId:any;
  programId:any;
  stausId:any;
  statusFlow:any;
  mobileNo:any;
  orgGstId:any;
  panNo:any;
  showButton:any;
  userId:any;
  searchReportList:any;
  p:any=1;
  p11:any=1;
  p12:any=1;
  p13:any=1;
  roleId:any;
  constructor(private apiService : ApiService, private route : ActivatedRoute, 
    private set : breadcrumbMessage, private router: Router,private excelService: ExcelService,private currency : Currency,
    private crypto: Crypto  ) { }
  
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }
  nonStopFlag : any;
  goToList() {
    if(this.nonStopFlag == 0){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }else{
        this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
    }
  }
  setSearchList(){}
  ngOnInit() {
    this.roleId=this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.route.queryParams.subscribe(params => {
      this.nonStopFlag = params['nonStopFlag'];
    })
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.tabSwitch(0);
    this.hide=false;
    this.showButton=false;
    this.orgId = this.route.snapshot.params['orgId']; 
    this.loanid = this.route.snapshot.params['loanid'];
    
    this.apiService.getDealerAnchorPan(this.loanid).subscribe(data => {
      if(data.status==200){
        this.panNo=data.result;
     
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });
    this.apiService.get2ADataSummary(13,this.orgId).subscribe(data => {
      if(data.status==200){
        this.month2aData1=data.result;
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });
    this.apiService.get2ADataSummary(7,this.orgId).subscribe(data => {
      if(data.status==200){
        this.month2aData2=data.result;
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
      this.HeaderDetails = data.result;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      console.log("substatusId::" + this.substatusId);
    }, error => console.log(error));
    this.apiService.getGst2AList(this.orgId).subscribe(res => {
      if(res.status==200){
        this.list=res.result;
      }else{
        this.set.setOption(res.exceptionMessage,false);
      }
    }, error => console.log(error));
  }
  updateCheck(a:any){
    a.validation=1;
    this.showButton=true;
  }
  validateTotalAmount(a:any){
    if(a.totalValue==null||a.totalValue==undefined||a.totalValue==0){
      this.set.setOption("Please Enter Valid Amount",false);
      a.totalValue=='';
    }
  }
  getTradeName(a:any){
    this.apiService.getTradeName(a.panNo,this.orgId,this.userId).subscribe(data => {
      if(data.status){
        this.ngOnInit();
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });
  }
  save(){
    var temp=[];
    for(let a of this.edit2aSData){
      if(a.validation==1){
        temp.push(a);
      }
    }
    this.apiService.updateGst2AList(temp).subscribe(res => {
      if(res.status==200){
        this.ngOnInit();
        this.set.setOption(res.exceptionMessage,true);
      }else{
        this.set.setOption(res.exceptionMessage,false);
      }
    }); 
  }
  download2ADataExcel() {
    this.apiService.getGst2AExcelList(this.orgId).subscribe(res => {
      var temp=res.result;
      var temp1=[];
      let i=1;
      for(let t of temp){
        const data={
          'sNo':i++,
          'Ctin':t.ctin,
          'Month':t.month,
          'Year':t.year,
          'No Of Invoices':t.noOfInvoice,
          'Total Value':t.totalValue,
          'Taxable Value':t.taxableValue,
          'Igst Value':t.igstValue,
          'Cgst Value':t.cgstValue,
          'Sgst Value':t.sgstValue,
        }
        temp1.push(data);
      }
      this.excelService.exportAsExcelFile(temp1, this.loanid + '_2A_Data');
    }, error => console.log(error));

  }

  tabList = ['2aData', '6122aData'];
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

