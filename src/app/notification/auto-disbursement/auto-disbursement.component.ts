import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Currency } from '../../shared/currency.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auto-disbursement',
  templateUrl: './auto-disbursement.component.html',
  styleUrls: ['./auto-disbursement.component.css']
})
export class AutoDisbursementComponent implements OnInit {
  
  invoiceNo: any;
  err : boolean;
  message : string;
  brandName: any;
  orgName: any;
  autoDisbursementDate: any;
  invoiceReceivedDate: any;
  invoiceAmount: any;
  id: any;
  fundingAmount: any;
  invoiceDate: any;
  adDate: any;
  adTime: any;
  irDate: any;
  irTime: any;

  action : boolean;
  initiated : boolean;
  stopped : boolean;

  remark : any = '';
  remarkStatus : boolean;

  token : any;
  popMessage : any;
  popProceed : any;

  closeResult : any;

  constructor(private apiService : ApiService, private route: ActivatedRoute,public currency : Currency,private modalService: NgbModal) { }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    this.err = false;
    this.message = '';
    this.action = false;
    this.initiated = false;
    this.stopped = false;
    this.remarkStatus = false;
    this.apiService.autoDisbursementNotificationhtml(this.token).subscribe(data => {
      if(data.status == 200){
        if(data.exceptionOccured == 'N'){
          this.brandName = data.result.brandName;
          this.orgName = data.result.orgName;
          this.autoDisbursementDate = data.result.autoDisbursementDate;
          this.adDate = this.autoDisbursementDate.substring(0,10);
          this.adTime = this.autoDisbursementDate.substring(11,19);
          this.invoiceReceivedDate = data.result.invoiceReceivedDate;
          this.irDate = this.invoiceReceivedDate.substring(0,10);
          this.irTime = this.invoiceReceivedDate.substring(11,19);
          this.invoiceAmount = data.result.invoiceAmount;
          this.id = data.result.id;
          this.fundingAmount = data.result.fundingAmount;
          this.invoiceDate = data.result.invoiceDate;
          this.invoiceNo = data.result.invoiceNo;
          window.localStorage.setItem('token', data.result.token);
        }else {
          this.err = true;
          this.message = data.exceptionMessage;
        }
      }else {
        this.err = true;
        this.message = data.exceptionMessage;
      }
    }, error => console.log(error));
  }

  initiateAutoDisbursal(){
    this.apiService.initiateAutoDisbursal(0,this.id).subscribe(data => {
      if(data.status == 200){
        if(data.exceptionOccured == 'N'){
          this.action = true;
          this.initiated = true;
          this.stopped = false;
          this.close();

        }else {
          this.err = true;
          this.message = data.exceptionMessage;
        }
      
      }else {
        this.err = true;
        this.message = data.exceptionMessage;
      }
    }, error => console.log(error));

  }

  indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
  }

  remarkS(){
    this.remarkStatus = true;
  }

  stop(){
    if(this.remark == ''){
      this.remark = 'AUTO DISBURSEMENT STOPPED BY CUSTOMER';
    }
    const obj = {
      id : this.id,
      userId : '0',
      remarks : this.remark
    }
    this.apiService.stopAutoDisbursal(obj).subscribe(data => {
      if(data.status == 200){
        if(data.exceptionOccured == 'N'){
          this.action = true;
          this.initiated = false;
          this.stopped = true;
          this.close();
        }else {
          this.err = true;
          this.message = data.exceptionMessage;
        }

      }else {
        this.err = true;
        this.message = data.exceptionMessage;
      }
    })

  }

  popBefore(a,content){
    this.popProceed = a;
    if(a ==1){
      this.popMessage = "Initiate";
    }else {
      this.popMessage = "Stop Auto";
    }
    this.modalService.open(content, {size: 'lg', keyboard : false, backdrop : 'static', centered : true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  popAfter(){
    if(this.popProceed == 1){
      this.initiateAutoDisbursal();
    }else {
      this.stop();
    }
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

  close(){
    this.modalService.dismissAll();
  }
}
