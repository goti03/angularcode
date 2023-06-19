import { Component, OnInit } from '@angular/core';
import { Currency } from '../../shared/currency.service';

@Component({
  selector: 'app-orderinvoicesuccess',
  templateUrl: './orderinvoicesuccess.component.html',
  styleUrls: ['./orderinvoicesuccess.component.css']
})
export class OrderinvoicesuccessComponent implements OnInit {
  companyname: any;
  availlimit: any;
  fundz: any;
  maskedNo: any;
  phoneNo: any;
  orderamountnew:any;
fundamountnew:any;
  ordernum: any;
  orderAmounts: any;
  fundAmounts: any;
  loanrequest: any;
  fund: boolean = true;
  messages:any;
  constructor(public currency: Currency) { }

  ngOnInit() {
    this.companyname = window.localStorage.getItem("point1");
    this.availlimit = window.localStorage.getItem("newlimit");
    this.fundz = window.localStorage.getItem("fundamountz")
    this.messages=window.localStorage.getItem("finalmessage")
    this.orderAmounts = window.localStorage.getItem("ordermountz");
    this.fundAmounts = window.localStorage.getItem("fundamountz");
    this.orderamountnew=this.indianCurrency(this.orderAmounts);
    
    this.fundamountnew=this.indianCurrency(this.fundAmounts);
    this.ordernum = window.localStorage.getItem("ordernum");
    
   
    this.availlimit = this.indianCurrency(this.availlimit)
    this.loanrequest = window.localStorage.getItem("loanrequest")
    if (this.messages=="Success" ) {
      this.fund = false;
    }

  }
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }


}
