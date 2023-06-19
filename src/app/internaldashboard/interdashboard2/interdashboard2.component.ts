import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment.js';
@Component({
  selector: 'app-interdashboard2',
  templateUrl: './interdashboard2.component.html',
  styleUrls: ['./interdashboard2.component.css']
})
export class Interdashboard2Component implements OnInit {

  constructor() { }
appliedDate:any;
livedisbursedDate:any;
livenotdisbursedDate:any;
approvedandnotliveDate:any;
underapprovalwithcreditDate:any;
underapprovalwithcustomerDate:any;
rejectDate:any;
  ngOnInit() {
    this.appliedDate=moment().format('YYYY-MM')
    this.livedisbursedDate=moment().format('YYYY-MM')
   this.livenotdisbursedDate=moment().format('YYYY-MM')
this.approvedandnotliveDate=moment().format('YYYY-MM')
this.underapprovalwithcreditDate=moment().format('YYYY-MM')
this.underapprovalwithcustomerDate=moment().format('YYYY-MM')
this.rejectDate=moment().format('YYYY-MM')

  }
toggleOne()
{
  
}
}
