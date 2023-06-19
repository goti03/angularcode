import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import { MatTabsModule} from '@angular/material/tabs';
import * as Highcharts from 'highcharts';
import * as moment from 'moment/moment.js';
import { ApiService} from "..//..//core/api.service";

@Component({
  selector: 'app-disbursal',
  templateUrl: './disbursal.component.html',  
   encapsulation: ViewEncapsulation.None
})
export class DisbursalComponent implements OnInit {
  id: number;
  loanid:number;
  bankid:number;
  month:any;
  year:any;
  index:any;
  selector:any;
  submitted = false;
  disbursalData:any;
  disbursalInvoiceData:any;

  amount:any;
  date1:any;
  date2:any;
  date3:any;
  date4:any;
  date5:any;
  date6:any;
  momentVariable:any;
  programTypeId:any;
  closeResult: string;

  requestList: Observable<ReportModel[]>;
  constructor(
    private route: ActivatedRoute,private router: Router,private apiService : ApiService,
    private modalService: NgbModal) { 
     }
  ngOnInit(): void {
    this.submitted = false;
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    console.log("data=="+this.id+"loanid=="+this.loanid);

    this.apiService.getDisbursalDetails(this.id,this.loanid) 
    .subscribe(data => {
      this.disbursalData = data.result;
      console.log("disbursalData==="+JSON.stringify(this.disbursalData));
    }, error => console.log(error));
    this.apiService.getLoanHeaderDetails(this.loanid)
    .subscribe(data => {
      this.programTypeId=data.result[0].programTypeId;
      this.apiService.getDisbursalInvoiceDetails(this.id,this.loanid,this.programTypeId,0) 
    .subscribe(data => {
      this.disbursalInvoiceData = data.result;
      console.log("disbursalInvoiceData==="+JSON.stringify(this.disbursalInvoiceData));
    }, error => console.log(error));
    }, error => console.log(error));
    
  }
  
  open(content,emidate:any,emiamount:any) {
    this.amount = emiamount;    
    this.date1  = emidate;
    
    var mov = moment(emidate, 'DD-MM-YYYY').add(7, 'days').calendar();
    var momentVar = moment(mov, 'MM/DD/YYYY');  
    this.date2 = momentVar.format('DD-MM-YYYY');   
    var mov1 = moment(this.date2, 'DD-MM-YYYY').add(7, 'days').calendar();
    var momentVar1 = moment(mov1, 'MM/DD/YYYY');  
    this.date3 = momentVar1.format('DD-MM-YYYY');   
    var mov2 = moment(this.date3, 'DD-MM-YYYY').add(7, 'days').calendar();
    var momentVar2 = moment(mov2, 'MM/DD/YYYY');  
    this.date4 = momentVar2.format('DD-MM-YYYY');   
    var mov3 = moment(this.date4, 'DD-MM-YYYY').add(7, 'days').calendar();
    var momentVar3 = moment(mov3, 'MM/DD/YYYY');  
    this.date5 = momentVar3.format('DD-MM-YYYY');   
    var mov4 = moment(this.date5, 'DD-MM-YYYY').add(7, 'days').calendar();
    var momentVar4 = moment(mov4, 'MM/DD/YYYY');  
    this.date6 = momentVar4.format('DD-MM-YYYY');   
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
