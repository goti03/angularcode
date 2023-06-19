import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../core/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import { Currency } from '../../shared/currency.service';
import * as moment from 'moment/moment.js';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-gstr1',
  templateUrl: './gstr1.component.html',
  styleUrls: ['./gstr1.component.css']
})
export class Gstr1Component implements OnInit {

  orgId : any;
  gstnNo : any;
  loanid : any;
  updateGstR1List = [];
  r1List = [];
  gstList = [];
  period = [];
  gstNo:any;
  hide:any;
  returnPeriod : any;
  filedDate : any;
  HeaderDetails: any;
  substatusId:any;

  programId:any;
  maxdate:any;
  stausId:any;
  statusFlow:any;
  mobileNo:any;
  orgGstId:any;
  roleId:any;
  constructor(private apiService : ApiService, private route : ActivatedRoute, private set : breadcrumbMessage, private router: Router,private currency : Currency,
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
  preventTyping() {
    return false;
  }
  ngOnInit() {
    this.roleId=Number(this.crypto.decryt(window.localStorage.getItem('roleId')));
    this.route.queryParams.subscribe(params => {
      this.nonStopFlag = params['nonStopFlag'];
    })
    this.hide=false;
    this.orgId = this.route.snapshot.params['orgId']; 
    this.loanid = this.route.snapshot.params['loanid']; 
    this.maxdate = moment().subtract(1, 'months').format('YYYY-MM');
    this.apiService.getLoanHeaderDetails(this.loanid)
    .subscribe(data => {
      this.HeaderDetails = data.result;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programId;
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
      this.returnPeriod = this.gstList[0].gstr1_return_period;
      this.filedDate = this.gstList[0].gstr1_filing_date;
      this.orgGstId = this.gstList[0].orgGstId;
    this.apiService.getGstnr1List(this.orgId, this.gstList[0].gstNo).subscribe(data => {
                this.r1List = data.result;
                console.log(this.r1List);
                this.reload();
            }, error => console.log(error));
      var data = this.gstList[0].gstr1_return_period;
    }, error => console.log(error));

    // this.apiService.getGstnR1GstList(this.orgId).subscribe( data => {
    //   if(data.status==200){
    //     this.gstList = data.result;
    //     if(this.gstList){
    //       this.hide=true;
    //       }
    //     console.log(data.result);
    //     if(this.gstList.length>0){
    //       this.gstnNo = this.gstList[0].gstNo;
    //       this.apiService.getGstnr1List(this.orgId, this.gstList[0].gstNo).subscribe(data => {
    //         this.r1List = data.result;
    //         console.log(this.r1List);
    //         this.reload();
    //     }, error => console.log(error));
    //     }
    //   }
    //         }, error => console.log(error));
    

  }

  reload()
  {
    for(var a=0; a<this.r1List.length;a++)
    {
      this.r1List[a].totalval = Number(this.r1List[a].totalval);
      this.r1List[a].totalIgst = Number(this.r1List[a].totalIgst);
      this.r1List[a].totalCgst = Number(this.r1List[a].totalCgst);
      this.r1List[a].totalSgst = Number(this.r1List[a].totalSgst);
      this.r1List[a].oldTotalval = Number(this.r1List[a].oldTotalval);
      this.r1List[a].oldTotalIgst = Number(this.r1List[a].oldTotalIgst);
      this.r1List[a].oldTotalCgst = Number(this.r1List[a].oldTotalCgst);
      this.r1List[a].oldTotalSgst = Number(this.r1List[a].oldTotalSgst);
    }
    for(var a1=0; a1<this.r1List.length; a1++)
    {
      // this.period[a1]= this.r1List[a1].retPeriod;
      this.r1List[a1].period= this.r1List[a1].retPeriod;
      var m = this.r1List[a1].period.substring(0,2);
      var y = this.r1List[a1].period.substring(2,6);
      var date = new Date(m+"/01/"+y);
      // this.period[b1]=date;
      this.r1List[a1].period=date;
    }
    // console.log(this.period);
    // for(var b1=0; b1<this.period.length;b1++)
    // {
    //   var m = this.period[b1].substring(0,2);
    //   var y = this.period[b1].substring(2,6);
    //   var date = new Date(m+"/01/"+y);
    //   this.period[b1]=date;
    //   this.r1List[a1].period=date;
    // }
    // console.log(this.period);
  }

  changeGstNo(e)
  {
    this.gstnNo = e.target.value;
    // this.period = [];
    for(var a=0;a<this.gstList.length;a++){
      if(this.gstList[a].gstNo == e.target.value){       
        var data = this.gstList[0].gstr1_return_period;
        var year = data.substring(0,4);
        var month = data.substring(5,7);
        // this.returnPeriod = new Date(month+"/01/"+year);
        this.returnPeriod = this.gstList[a].gstr1_return_period;
        this.filedDate = this.gstList[a].gstr1_filing_date;
        this.orgGstId=this.gstList[a].orgGstId;
        // this.filedDate = new Date(this.filedDate);
       }
      }
    this.apiService.getGstnr1List(this.orgId, e.target.value).subscribe(data => {
      this.r1List = data.result;
      this.reload();
  })
  }

  addR1()
  {
    const r1Obj = {
      gstNo : this.gstnNo,
      headerId : '',
      orgId : this.orgId,
      retPeriod : '0',
      totalIgst : '0',
      totalCgst : '0',
      totalSgst : '0',
      totalval : '0'
    }
    this.r1List.push(r1Obj);
  }

  delR1(index){
    this.r1List.splice(index, 1);
    // this.period.splice(index, 1);
  }

  nonStopFlag : any;
  goToList(){
    if(this.nonStopFlag == 0){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }else{
        this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
    }
  }
  gstR1UpdateFlag(r1){
    r1.updateFlag='1';
  }
  
  updateMonth(r1,event){
    var count=0;
    var date=event.target.value;
    date = date.toString().substring(5,7)+date.toString().substring(0,4);   
    r1.retPeriod=date;
    for(let r of this.r1List){
      if(r.retPeriod==date){
        count++;
      }
    }
    if(count>1){
      this.set.setOption(moment(event.target.value).format('MMMM YYYY')+" already Exist",false);
      r1.period="";
    }
    console.log("count::"+count);
  }
  save(){
    for(var a=0; a<this.r1List.length; a++){
      var m, y;
      if(this.r1List[a].period.length === 7){
        m = this.r1List[a].period.toString().substring(5,7);
        this.r1List[a].month = m;
        y = this.r1List[a].period.toString().substring(0,4);
        this.r1List[a].year = y;
      }else{
        m = this.r1List[a].period.getMonth()+1;
        if(m < 10){
          m = "0"+m;
        }
        y = this.r1List[a].period.getFullYear();
        y = y.toString();
      }
      // if(this.period[a].length === 7){
      //   m = this.period[a].toString().substring(5,7);
      //   this.r1List[a].month = m;
      //   y = this.period[a].toString().substring(0,4);
      //   this.r1List[a].year = y;
      // }else{
      //   m = this.period[a].getMonth()+1;
      //   if(m < 10){
      //     m = "0"+m;
      //   }
      //   y = this.period[a].getFullYear();
      //   y = y.toString();
      // }
      this.r1List[a].month=m;
      this.r1List[a].year=y;
      this.r1List[a].retPeriod = m+y;
    }
    for(let g of this.r1List){
      if(g.headerId==''||g.updateFlag=='1'){
        this.updateGstR1List.push(g);
      }
    }
    console.log("this.updateGstR1List::"+this.updateGstR1List);
    const data={
      orgGstId:this.orgGstId,
      returnPeriod:this.returnPeriod,
      filedDate:this.filedDate,
      r1List:this.r1List
    }
    console.log(data);
    this.apiService.saveGstnR1List(data).subscribe(data => {
      if(data.status == 200){
        this.set.setOption("Updated successfully",true);
        this.goToList();
      }else{
        this.set.setOption("Failed to update",false)
      }
    })
  }

  tab1 : boolean = false;
  toggle(){
    this.tab1 = !this.tab1;
  }
}
