import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "..//..//core/api.service";
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-vkyc',
  templateUrl: './vkyc.component.html',
  styleUrls: ['./vkyc.component.css']
})
export class VkycComponent implements OnInit {
  vkycregstatus: any;
  time :any;
  message : string;
  flag: any;
  linkExpiryTimestamp: any;
  statusName: any;
  losId: any;
  subStatusName: any;
  customerName: any;
  consentdate: any;
  updatedate: any;
  maxdate: any;
  consenttodate: any;
  searchvkystatus:any;
  p:any = 1;
  p1:any;
  page:any;
  resendlink: any;
  userId: any;

  constructor(private router: Router, private apiService: ApiService,private set: breadcrumbMessage,private crypto: Crypto) { }
  startDate: any;
  currentDate:any;
  endDate: any;
  err : boolean;

  ngOnInit() {
    this.p=1;
    this.p1=10;
    this.page=0;
    this.message = "";
    this.consentdate = moment().format('YYYY-MM') + '-01';
    this.currentDate=moment().format('YYYY-MM-DD');
    this.maxdate = moment().format('YYYY-MM') + '-01';
    this.updatedate = moment().format('YYYY-MM-DD');
    this.err = false;

    // this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    // this.endDate = moment().format('YYYY-MM-DD');
    // this.currentDate = moment().format('YYYY-MM-DD');
// this.vkyc();
  }

  vkyc(){
    const data={
      startDate:this.consentdate,
      endDate:this.updatedate,
    
    }
    this.apiService.vkycRegistrationStatus(data)
    .subscribe(data => {
      if(data.status == 200){
        this.vkycregstatus = data.result.list;
       console.log("vycstatus::::::::"+JSON.stringify(this.vkycregstatus));
       for(let i=0;i<this.vkycregstatus.length;i++){
        this.flag = this.vkycregstatus[i].flag;
        this.linkExpiryTimestamp = this.vkycregstatus[i].linkExpiryTimestamp;
        this.statusName = this.vkycregstatus[i].statusName;
        this.losId = this.vkycregstatus[i].losId;
        this.subStatusName = this.vkycregstatus[i].subStatusName;
        this.customerName = this.vkycregstatus[i].customerName;

        console.log("flag::::::::"+JSON.stringify(this.flag));
        console.log("linkExpiryTimestamp::::::::"+JSON.stringify(this.linkExpiryTimestamp));
        console.log("statusName::::::::"+JSON.stringify(this.statusName));
        console.log("losId::::::::"+JSON.stringify(this.losId));
        console.log("subStatusName::::::::"+JSON.stringify(this.subStatusName));
        console.log("customerName::::::::"+JSON.stringify(this.customerName));



       }
       
      }else{
        this.err = true;
        this.set.setOption(false,data.exceptionMessage);
      }
    }, error => console.log(error));
  }

  checkenddate(){
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.consenttodate =  moment(this.consentdate).add(7, 'days').format('YYYY-MM-DD');
  var enddate = moment(this.consenttodate);
  var currentdate = moment(this.currentDate);
  var duration = currentdate.diff(enddate,'days');
  console.log("the duration differnce is ==="+duration)
    if(duration<0){
      this.consenttodate=moment().format("YYYY-MM-DD");
    }
    }

    checkstartdate(){
      this.consentdate=  moment(this.consenttodate).subtract(7, 'days').format('YYYY-MM-DD');
  }

  resetSearch(){
    this.consentdate = moment().format('YYYY-MM') + '-01';
    this.updatedate = moment().format('YYYY-MM-DD');
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

  resendlinkgenerate(a){
    const data={
      userId : this.userId,
      lastActivityTime: moment().format('YYYY-MM-DD'),
      userMedium: "admin",
      loanRequestId:  String(a),
    
    }
    this.apiService.resendVkycGenerateLink(data)
    .subscribe(data => {
      if(data.status == 200){
        this.vkyc();
        this.err = true;
        this.set.setOption("Link Sent Successfully", true);
        this.resendlink = data.result.list;
       console.log("vycstatus::::::::"+JSON.stringify(this.resendlink));
      }else{
        this.err = true;
        this.set.setOption(false,data.exceptionMessage);
      }
    }, error => console.log(error));
  }
  clearError(){
    this.time = setInterval(() => {
      this.err = false;
      this.message = "";
      clearInterval(this.time);
    }, 8000);
  }

}
