import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '..//..//core/api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import * as moment from 'moment';
import { Crypto } from '../../shared/crypto.service';
import { Currency } from '../../shared/currency.service';
import { lenderconfiguration } from '../../../environments/jana.config';


@Component({
  selector: 'app-e-sign',
  templateUrl: './e-sign.component.html',
  styleUrls: ['./e-sign.component.css']
})
export class ESignComponent implements OnInit {
  loanId:any;
  orgId: any;
  custId:any;
  retId:any;
  ESignDetails: any;
  loanReqId: any;
  invitationSentDate: any;
  remarks: any;
  p: any = 1;
  p1:any
  eSignFlag: any;
  eStampFlag: any;
  documentType: any;
  closeResult: any;
  lid: any;
  document: any;
  signature: any;
  stamping: any;
  docId: any;
  documentId: any;
  eSignaturetxnStatus: number;
  geteSignaturetxnStatus: any;
  requests: any;
  name: any;
  email: any;
  phone: any;
  signed: any;
  signUrl: any;
  active: any;
  rejected: any;
  expiryDate: any;
  signType: any;
  toDate: string;
  toinviteDate: string;
  toexpiryDate: string;
  newexpiryDate: any;
  HeaderDetails= [];
  stausId: any;
  substatusId: any;
  programId: any;
  statusFlow: any;
  mobileNo: any;
  nonStopFlag: any;
  loanAmount:any;
  lenderId:any;
  brandId:any;
  customerName:any;
  oldstausId:any;
  approvalStatus:any;
  oldsubstatusId:any;
  skipAndProceed:any;
  substatusList: any;
  statusList: any;
  env: any;
  tab = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal,private set: breadcrumbMessage,private crypto: Crypto,public currency: Currency) { }

  ngOnInit(): void {
    this.tab = false;
    this.env=lenderconfiguration.env;
    this.p1 = 10;
    this.orgId = this.route.snapshot.params['orgId'];
    this.loanId=this.route.snapshot.params['loanId'];
    this.custId=this.route.snapshot.params['custId'];
    this.retId=this.route.snapshot.params['retId'];
    console.log("loanid::::::::::::"+ this.loanId);
    this.esigncheck();
    this.apiService.getLoanHeaderDetails(this.loanId)
    .subscribe(data => {
        this.HeaderDetails = data.result;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.stausId = this.HeaderDetails[0].stausId;
        this.substatusId = this.HeaderDetails[0].substatusId;
        this.programId = this.HeaderDetails[0].programTypeId;
        this.statusFlow = this.HeaderDetails[0].statusflow;
        this.loanAmount=this.HeaderDetails[0].loanAmount;
        this.lenderId=this.HeaderDetails[0].lenderId;
        this.brandId=this.HeaderDetails[0].brandId;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.customerName = this.HeaderDetails[0].companyName;
        this.oldstausId = this.HeaderDetails[0].stausId;
        this.approvalStatus = this.HeaderDetails[0].status;
        this.oldsubstatusId = this.HeaderDetails[0].substatusId;
        // this.skipAndProceed = (this.HeaderDetails[0].skipAndProceed == '1') ? false : true;
        this.apiService.getStatusList(Number(this.statusFlow)).subscribe(data => {
            this.statusList = data.result;

        }, error => console.log(error));
        this.apiService.getsubStatusList(Number(this.stausId)).subscribe(data => {
            this.substatusList = data.result;

        }, error => console.log(error));
    }, error => console.log(error));
  }

  esigncheck(){
    this.apiService.getESignDetails(this.loanId).subscribe(res => {
      if (res.status == 200) {
        this.ESignDetails = res.result;
        if(this.ESignDetails < 1){
          this.set.setOption('No Data Available', false);
        }
        else{
        for(let i=0;i<this.ESignDetails.length;i++){
          this.loanReqId = this.ESignDetails[i].loanReqId;
          this.invitationSentDate = this.ESignDetails[i].invitationSentDate;
          this.remarks = this.ESignDetails[i].remarks;
          this.eSignFlag = this.ESignDetails[i].eSignFlag;
          this.eStampFlag = this.ESignDetails[i].eStampFlag;
          this.documentType = this.ESignDetails[i].documentType;
          this.docId = this.ESignDetails[i].docId;
        }                
          this.toinviteDate= moment(this.invitationSentDate).format('DD-MM-YYYY');
      }
      }else{
        }
      })
    }

    nextButton() {
      console.log('this.p::' + this.p);
      if (this.ESignDetails.length == 10) {
        this.p = Number(this.p) + 1;
      }
    }
  
  previousButton() {
    if (this.p != 1) {
      this.p = Number(this.p) - 1;
    }
  }

  esignfunction(content,loanId,doc,esign,estamp,docId){
    this.lid=loanId;
    this.document=doc;
    this.signature=esign;
    this.stamping=estamp;
    this.documentId=docId;
    if(this.document == '30'){
     this.document= 'SanctionLetter';
    }if(this.document == '18'){
      this.document= 'Loan Aggrement';
    }if(this.document == '91'){
      this.document= 'Hypothecation Letter';
    }
    if(this.documentId!=''){
    this.eSignaturetxnStatusfunction();
    }else{
      this.geteSignaturetxnStatus=[];
    }
   this.modalService.dismissAll();
      this.modalService.open(content, { size: 'lg', centered : true, backdrop : 'static' , keyboard : false }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  
  close(){
    this.modalService.dismissAll();
  }

 
  
  eSignaturetxnStatusfunction(){
    const data = {
      documentId:this.documentId,
      userId:this.crypto.decryt((window.localStorage.getItem('userId'))),
      loanRequestId:this.loanId
    }
    this.apiService.eSignaturetxnStatus(data).subscribe(data => {
      if (data.status == 200) {
          this.geteSignaturetxnStatus = data.result.data.requests;
for(let j=0;j<this.geteSignaturetxnStatus.length;j++){
  this.name = this.geteSignaturetxnStatus[j].name;
  this.email = this.geteSignaturetxnStatus[j].email;
  this.phone = this.geteSignaturetxnStatus[j].phone;
  this.signed = this.geteSignaturetxnStatus[j].signed;
  this.signUrl = this.geteSignaturetxnStatus[j].signUrl;
  this.active = this.geteSignaturetxnStatus[j].active;
  this.rejected = this.geteSignaturetxnStatus[j].rejected;
  this.expiryDate = this.geteSignaturetxnStatus[j].expiryDate;
  this.signType = this.geteSignaturetxnStatus[j].signType;
        }
        var c = this.expiryDate.toString().split(" ");
        this.newexpiryDate = c[0];
   }
      else {
        this.set.setOption('No Data Available', true);
      }
    });
  


  }
  toggle() {
    this.tab = !this.tab;
  }
  goToList() {
 
      this.router.navigate(['/report/loanRequestList']);

  }
  preventTyping() {
    return false;
  }
  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
}
}
