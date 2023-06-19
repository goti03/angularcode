import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';


@Component({
  selector: 'app-charges-waiver-fee',
  templateUrl: './charges-waiver-fee.component.html',
  styleUrls: ['./charges-waiver-fee.component.css']
})
export class ChargesWaiverFeeComponent implements OnInit {

  discountList = [];
  discountListsearch : any;
  p2 : any=1;
page:any;
  chargeList = [];
  chargeListsearch : any;
  p1 : any=1;
  
  constructor(private apiService : ApiService, private set : breadcrumbMessage) { }

  ngOnInit() { 
    this.p1=1;
    this.p2=1;
    this.page=0;
    this.apiService.getdiscountchargeslist().subscribe(data => {
      if(data.status == 200){
        this.discountList = data.result;
      }else{
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
    this.apiService.getchargesmasterlist().subscribe(data => {
      if(data.status == 200){
        this.chargeList = data.result.charges;
      }else{
        this.set.setOption(data.exceptionMessage, false);
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
