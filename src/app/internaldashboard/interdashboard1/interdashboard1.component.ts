import { Component, OnInit } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs';
import { CalendarAngularDateFormatter } from 'angular-calendar';
import { ApiService } from "..//..//core/api.service";
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment.js';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Currency } from '../../shared/currency.service';
import {lenderconfiguration} from '../../../environments/lender.config';
import {lender} from '../../../environments/environment';


@Component({
  selector: 'app-interdashboard1',
  templateUrl: './interdashboard1.component.html',
  styleUrls: ['./interdashboard1.component.css']
})
export class Interdashboard1Component implements OnInit {
  newtofinaggDate:any;
  livebutnodisbursementDate:any;
  sanctionbutnotliveDate:any;
  newlist:any;
  newtotallimit:any;
  rejectedlist:any;
  newnodes:any;
  livelist:any;
  newutilization:any;
  newoverduenume:any;
  nedata:any;
  flagtotal:any;
  flagnew:any;
  sanctionlist:any;
newcomer:boolean=false;
totalcomer:boolean=false;
livecomer:boolean=false;
sanctioncomer:boolean=false;
rejectioncomer:boolean=false;
disbursementcomer:boolean=false;
totalLimit:any;
  labelhead:any;
  flagsanctionnolive:any;
  flaglivenodisbursement:any;
  undersanctionlist:any;
  flagrejection:any;
  disbursementlist:any;
  flagundersanction:any;
  totaldata:any;
  disbursementDate:any;
  hello:any;
  flagdisbursement:any;
  undersanctionDate:any;
  companyNames:any;
  maxdate:any;
  env:any;
  flag:any;
  undersanction:boolean=false;
  rejectionDate:any;
  noOfNodes : any;
  constructor(private apiService: ApiService,private route: ActivatedRoute, private router: Router,  public currency: Currency,) { }

  ngOnInit() {
    this.env=lenderconfiguration.env;
    this.newtofinaggDate =moment().format('YYYY-MM')
    this.maxdate=moment().format('YYYY-MM')
    window.localStorage.setItem("anchorwise","");
    this.livebutnodisbursementDate=moment().format('YYYY-MM')
    this.sanctionbutnotliveDate=moment().format('YYYY-MM')
    this.undersanctionDate=moment().format('YYYY-MM')
    this.disbursementDate=moment().format('YYYY-MM')
    this.flag="1";
    this.flagtotal="1";
    this.flagrejection="1";
    this.flagdisbursement="1";
    this.flagsanctionnolive="1";
    this.companyNames="FinAGG"
    this.flagundersanction="1";
    this.flagnew="1";
    this.flaglivenodisbursement="1";
    if(this.env=="Jana")
    {
      this.companyNames="JANA"
    }
    else if(this.env=="Abfl")
    {
      this.companyNames="ABFL";
    }
    
    window.localStorage.setItem("fromby","All");
this. rejectionDate=moment().format('YYYY-MM')
this.reloaddata()
  }
 
reloaddata()
{
  this.newtofinaggDetails()
  this.totalfinaggDetails()
  this.disbursementDetails()
  this.livebutnodisbursementDetails()
  this.sanctionbutnotliveDetails()
  this.undersanctionDetails()
this.rejectedDetails()

}
indianCurrency(number: any) {
  return this.currency.indianCurrency(number);
}
gotoList()
{ window.localStorage.setItem("newdate",this.newtofinaggDate)

  this.router.navigate(['internaldashboard/subdashboard1']);
}

gotoretailerList()
{
  window.localStorage.setItem("disbursementDate",this.disbursementDate)
  window.localStorage.setItem("flagdisbursement","1")
  this.router.navigate(['internaldashboard/subdashboard1']);
}
gotosellerList()
{
  window.localStorage.setItem("disbursementDate",this.disbursementDate)
  window.localStorage.setItem("flagdisbursement","2")
  this.router.navigate(['internaldashboard/subdashboard1']);
}
newtofinaggDetails()
{
  const data=
  {
    "date":this.newtofinaggDate,
  "flag":this.flagnew
  }
  this.apiService.newtofinaggDetails(data).subscribe(data => {
    if(data.status==200)
    {
this.newlist = data.result;
this.noOfNodes = this.newlist.noOfNodes;

this.newcomer=true;
console.log(" thereis " +data.result);
console.log("bye" +data.result.noOfNodes);
console.log("hello "+this.newlist.noOfNodes);
this.newlist.totalLimit = this.indianCurrency(Number(this.newlist.totalLimit))
this.newlist.utilization = this.indianCurrency(Number(this.newlist.utilization))
if(this.newlist.overDueNo==0)
{
  this.newlist.overDueAmount="Rs 0.0";
}
else
{
this.newlist.overDueAmount = this.indianCurrency(Number(this.newlist.overDueAmount))
    }
  }
});
}
totalfinaggDetails()
{
  const data=
  {
  
  "flag":this.flagtotal
  }
  this.apiService.totaloffinaggDetails(data).subscribe(data => {
    if(data.status==200)
    {this.totalcomer=true;
this.totaldata=data.result;
this.totaldata.totalLimit = this.indianCurrency(Number(this.totaldata.totalLimit))
this.totaldata.utilization = this.indianCurrency(Number(this.totaldata.utilization))
if(this.totaldata.overDueAmount==null)
{
  this.totaldata.overDueAmount="Rs 0.0";

}
else{
this.totaldata.overDueAmount = this.indianCurrency(Number(this.totaldata.overDueAmount))
}
    }

});
}

livebutnodisbursementDetails()
{
  const data=
  {
    "date": this.livebutnodisbursementDate,
  "flag":this.flaglivenodisbursement
  }
  this.apiService.livenotdisbursementDetails(data).subscribe(data => {
    if(data.status==200)
    {this.livecomer=true;
this.livelist = data.result;
this.livelist.totalLimit = this.indianCurrency(Number(this.livelist.totalLimit))

}
    

});

}

sanctionbutnotliveDetails()
{
  const data=
  {
    "date":  this.sanctionbutnotliveDate,
  "flag":this.flagsanctionnolive
  }
  this.apiService.sanctionnotlivelistDetails(data).subscribe(data => {
    if(data.status==200)
    {this.sanctioncomer=true;
this.sanctionlist = data.result;
this.sanctionlist.totalLimit = this.indianCurrency(Number(this.sanctionlist.totalLimit))
    }

});


}
onsanctionnolivetabClick(event)
{
  console.log(event.tab.index);
  console.log(event.tab.textLabel);
  if(event.tab.textLabel=="Retailer&Dealer")
  {
    this.flagsanctionnolive="2";
  this.sanctionbutnotliveDetails();
  }
  else if(event.tab.textLabel=="Seller Up")
  {
    this.flagsanctionnolive= "3";
    this.sanctionbutnotliveDetails();

  }
  else 
  {
    this.flagsanctionnolive="1";
    this.sanctionbutnotliveDetails();
  }
}
onUndersanctiontabClick(event)
{
  console.log(event.tab.index);
  console.log(event.tab.textLabel);
  if(event.tab.textLabel=="Retailer&Dealer")
  {
  this.flagundersanction="2";
  this.undersanctionDetails();
  }
  else if(event.tab.textLabel=="Seller Up")
  {
    this.flagundersanction="3";
    this.undersanctionDetails();

  }
  else 

  {
    this.flagundersanction="1";
    this.undersanctionDetails();
  }
}

onNewtabClick(event)
{
  console.log(event.tab.index);
 
  if(event.tab.textLabel=="Retailer&Dealer")
  { window.localStorage.setItem("fromby","newretailer");
  this.flagnew="2";
  this.newtofinaggDetails();
  }
  else if(event.tab.textLabel=="Seller Up")
  {
    this.flagnew="3";
    window.localStorage.setItem("fromby","newseller");
    this.newtofinaggDetails();

  }
  else 
  {
    this.flagnew="1";
    this.newtofinaggDetails();
  }
}
onLivenodisbursementtabClick(event)
{
  console.log(event.tab.index);
  console.log(event.tab.textLabel);
  if(event.tab.textLabel=="Retailer&Dealer")
  {
  this.flaglivenodisbursement="2";
  this.livebutnodisbursementDetails();
  }
  else if(event.tab.textLabel=="Seller Up")
  {
    this.flaglivenodisbursement="3";
    this.livebutnodisbursementDetails();

  }
  else 
  {
    this.flaglivenodisbursement="1";
    this.livebutnodisbursementDetails();
  }

}

rejectiontabClicks(event)
{
  console.log(event.tab.index);
  console.log(event.tab.textLabel);
  if(event.tab.textLabel=="Retailer&Dealer")
  {
  this.flagrejection="2";
  this.rejectedDetails();
  }
  else if(event.tab.textLabel=="Seller Up")
  {
    this.flagrejection="3";
    this.rejectedDetails();

  }
  else 
  {
    this.flagrejection="1";
    this.rejectedDetails();
  }
}
onTotaltabClicks(event) {
  console.log(event.tab.index);
  console.log(event.tab.textLabel);
  if(event.tab.textLabel=="Retailer&Dealer")
  {
  this.flagtotal="2";
  window.localStorage.setItem("fromby","totalretailer");
  this.totalfinaggDetails();
  }
  else if(event.tab.textLabel=="Seller Up")
  {
    this.flagtotal="3";
    window.localStorage.setItem("fromby","totalseller");
    this.totalfinaggDetails();

  }
  else 
  {
    this.flagtotal="1";
    window.localStorage.setItem("fromby","All");
    this.totalfinaggDetails();
  }

}

onDisbursementtabClick(event)
{
  console.log(event.tab.index);
  console.log(event.tab.textLabel);
  if(event.tab.textLabel=="Retailer&Dealer")
  {
  this.flagdisbursement="2";
  window.localStorage.setItem("fromby","totalretailer");
  this.disbursementDetails();
  }
  else if(event.tab.textLabel=="Seller Up")
  {
    this.flagdisbursement="3";
    window.localStorage.setItem("fromby","totalseller");
    this.disbursementDetails();

  }
  else 
  {
    this.flagdisbursement="1";
    window.localStorage.setItem("fromby","All");
    this.disbursementDetails();
  }
}
undersanctionDetails()
{
  const data=
  {
    "date":this.undersanctionDate,
  "flag":this.flagundersanction
  }
  this.apiService.undersanctionlistDetails(data).subscribe(data => {
    if(data.status==200)
    {this.undersanction=true;
this.undersanctionlist = data.result;
this.undersanctionlist.totalLimit = this.indianCurrency(Number(this.undersanctionlist.totalLimit))

}


  });
}


rejectedDetails()
{
  const data=
  {
    "date":this.rejectionDate,
  "flag":this.flagrejection
  }
  this.apiService.rejectedlistDetails(data).subscribe(data => {
    if(data.status==200)
    {this.rejectioncomer=true;
this.rejectedlist = data.result;
this.rejectedlist.totalLimit = this.indianCurrency(Number(this.rejectedlist.totalLimit))

    }


  });
}

disbursementDetails()
{
  const data=
  {
    "date":this.disbursementDate,
  "flag":this.flagdisbursement
  }
  this.apiService.getdisbursementDetails(data).subscribe(data => {
    if(data.status==200)
    {this.disbursementcomer=true;
this.disbursementlist = data.result;
this.disbursementlist.totalLimit =  this.indianCurrency(Number(this.disbursementlist.totalLimit))
  }

  });
}

}