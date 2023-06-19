import { Component, OnInit } from '@angular/core';
import { ApiService } from "..//..//core/api.service";
import {NgxPaginationModule} from 'ngx-pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment.js';
import { HeatMapCellComponent } from '@swimlane/ngx-charts';
import { ExcelService } from '../../shared/excel.service';
import { Currency } from '../../shared/currency.service';


@Component({
  selector: 'app-subdashboard1',
  templateUrl: './subdashboard1.component.html',
  styleUrls: ['./subdashboard1.component.css']
})
export class Subdashboard1Component implements OnInit {
retailerList:any;
customerlist:any;
i:any;
retailernow:boolean=false;
sum:any;
internallist:any;
disburseDate:any;
disburseFlag:any;
routelabel:any;
lengthretailer:any;
lengthseller:any;
sellernows:boolean=false;
retailers:any;
disburseendDate:any;
disbcount:any;
maxdate:any;
sumnodes:any;
customerslist:any;
p:any=1;
s:any=1;

fromby:any;
  constructor(private apiService: ApiService, private modalService: NgbModal,private route: ActivatedRoute, private router: Router, public excelservice: ExcelService ,public currency: Currency) { }

  ngOnInit() {
    this.sum=0;
this.sumnodes=0;
this.disbcount=0;
    this.maxdate=moment().format('YYYY-MM')
   // this.apiService.gettotalFinaggretailerdetails().subscribe(res=>{this.retailerList=res.result});
    //this.apiService.getFinaggcustomerdetails().subscribe(res=>{this.customerlist=res.result});
  this.disburseDate= window.localStorage.getItem("disbursementDate");
  this.disburseFlag= window.localStorage.getItem("flagdisbursement");
  this.disburseendDate = this.disburseDate
  if(this.disburseFlag=="1")
  {
    this.retailernow=true;
    this.routelabel="Anchor Summary"
  }
  else{
    this.sellernows=true;
    this.routelabel="Seller Summary"
  }
   this.disbursement();
  }
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  invoiceDetails(brand)
    {window.localStorage.setItem("dash","retailer");
window.localStorage.setItem("brandid",brand);
window.localStorage.setItem("invoicefromdate",this.disburseDate);
window.localStorage.setItem("invoicetodate",this.disburseendDate);
this.router.navigate([`internaldashboard/subdashboard2`]);
    }
  
  disbursement()
  {this.sum=0;
    this.sumnodes=0;
    this.disbcount=0;
    const data=
    {
      "date":this.disburseDate,
      "dateend":this.disburseendDate,
    "flag":this.disburseFlag,
    }
    this.apiService.getdisbursementCustomerDetails(data).subscribe(data => {
      if(data.status==200)
      {
  this.customerlist = data.result;
  for(this.i=0;this.i<this.customerlist.length;this.i++)
  {
    this.sum = this.sum + Number(this.customerlist[this.i].disbursementAmt);
    this.sumnodes = this.sumnodes + Number(this.customerlist[this.i].noOfNodes);
    this.disbcount = this.disbcount + Number(this.customerlist[this.i].noOfDisbursals)

  }
 

  this.lengthretailer=this.customerlist.length;


  
  console.log("the customer list is ===="+this.customerlist)

  
  }
      
  
  });
  }
  exportExcel() {
    var list = [];
    var j = 1;
    for (let i of this.customerlist) {
      const listObj = {
        Sno: j++,
        'Seller Name':i.sellerName,
        'Pan Number': i.panNumber,
        'No. of Disbursements': i.noOfDisbursals,
        'Disbursement Amount' :i.disbursementAmt,
        
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'Seller_Disbursement_List');
  }
  exportExcels() {
    var list = [];
    var j = 1;
    for (let i of this.customerlist) {
      const listObj = {
        Sno: j++,
        'Anchor Name':i.anchorName,
        'Pan Number': i.panNumber,
        'No. of Nodes': i.noOfNodes,
        'No. of Disbursements': i.noOfDibursals,
        'Disbursement Amount' :i.disbursementAmt,
        
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'Retailer_Disbursement_List');
  }
  sellerdashboard(org)
  {
window.localStorage.setItem("dash","seller");
window.localStorage.setItem("invoicefromdate",this.disburseDate);
window.localStorage.setItem("invoicetodate",this.disburseendDate);
window.localStorage.setItem("orgName",org);
this.router.navigate(['internaldashboard/subdashboard2']);

  }
gotoList()
{
  this.router.navigate(['internaldashboard/dashboard1']);
}
}
