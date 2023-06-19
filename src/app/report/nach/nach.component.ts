import { Component, OnInit, ChangeDetectorRef,TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../core/api.service";
import { breadcrumbMessage } from "../../shared/breadcrumb-message.service";
import * as moment from 'moment/moment.js';
import { Currency } from '../../shared/currency.service';
import { NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-nach',
  templateUrl: './nach.component.html',
  styleUrls: ['./nach.component.css']
})
export class NachComponent implements OnInit {

  @ViewChild('nachLinkGeneration', { static: true }) nachLinkGeneration: TemplateRef<any>;
  urlmessage:any;
  urltext:boolean=false;
  urltexts:boolean=false;
  urlmessages:any;
  idfccheck:boolean=true;
  netbankingUrl: any;
  debitUrl: any;
  nachLinkMsg: any;
  nachLinkMsg1: any;
  debitNachAmount:any;
  netbankingNachAmount:any;  
  digio: any;
  debitMsg: any;
  netbankingMsg: any;
  digioAmount: any;
  digioesign: any;
  closeResult: string;

  loanid : any;
  orgId : any;
  programTypeId : any;
  HeaderDetails = [];
  numbers = [];
  imageEncode = [];
  noOfChequeValue : number = 2;
  NachPdc : number;
  curDate:any;
  pdcDetails=[];
  bankNameList=[];
  accountType=[];
  userId:any;
  mobileNo:any;
  stausId:any;
  substatusId:any;
  programId:any;
  statusFlow:any;
  digioAadhaar:any;
  digioDebitNet:any;
  constructor( private route : ActivatedRoute, private apiService : ApiService, private crypto: Crypto,
    private router: Router, private set : breadcrumbMessage,  private changeDetec: ChangeDetectorRef, private currency : Currency,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.apiService.getBankNameList().subscribe(res => this.bankNameList = res.result);
    this.apiService.getAccountTypeList().subscribe(res => this.accountType = res.result);
    this.curDate = moment().format('YYYY-MM-DD h:mm:ss');
    this.NachPdc = 0;
    // this.numbers = Array(this.noOfChequeValue).fill(0);
    this.loanid = this.route.snapshot.params['loanid'];
    this.programTypeId = this.route.snapshot.params['programTypeId'];
    this.orgId = this.route.snapshot.params['orgId'];
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe( data => {
      this.HeaderDetails = data.result;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
    });

    this.pdcDetails=[
      {
        bankid:0,
        accountNumber:'',
        accountType:'',
        primaryAccountHolder:'',
        branch:'',
        ifscCode:'',
        chequeDate:'',
        chequeNumber:'',
        chequeValue:'',
        fileName:'',
        fileContent:'',
        file:''
      },
      {
        bankid:0,
        accountNumber:'',
        accountType:'',
        primaryAccountHolder:'',
        branch:'',
        ifscCode:'',
        chequeDate:'',
        chequeValue:'',
        chequeNumber:'',
        fileName:'',
        fileContent:'',
        file:''
      }
    ];

  }
  submitPdc(){
    var count=0;
    for(let p of this.pdcDetails){
      if(p.bankid == null||p.bankid == undefined || p.bankid == ''){
        count++;
      }else if(p.accountNumber == null||p.accountNumber == undefined || p.accountNumber == ''){
        count++;
      }else if(p.accountType == null||p.accountType == undefined || p.accountType == ''){
        count++;
      }else if(p.primaryAccountHolder == null||p.primaryAccountHolder == undefined || p.primaryAccountHolder == ''){
        count++;
      }else if(p.branch == null||p.branch == undefined || p.branch == ''){
        count++;
      }else if(p.ifscCode == null||p.ifscCode == undefined || p.ifscCode == ''){
        count++;
      }else if(p.chequeDate == null||p.chequeDate == undefined || p.chequeDate == ''){
        count++;
      }else if(p.chequeValue == null||p.chequeValue == undefined || p.chequeValue == ''){
        count++;
      }else if(p.fileName == null||p.fileName == undefined || p.fileName == ''){
        count++;
      }else if(p.fileContent == null||p.fileContent == undefined || p.fileContent == ''){
        count++;
      }else if(p.file == null||p.file == undefined || p.file == ''){
        count++;
      }else{
        p.fileContent=p.fileContent.split(",")[1]
      }
    }
    if(count==0){
      const data={
        userId:this.userId,
        lastActivityTime: this.curDate,
        userMedium: "Backend",
        mobileNo: this.mobileNo,
        loanRequestId: this.loanid,
        pdcDetails:this.pdcDetails,
        }
        console.log("pdcDetails::"+JSON.stringify(data));
        this.apiService.uploadPDC(data).subscribe(data=>{
          if(data.status==200){
            if(data.exceptionOccured=='Y'){
              this.set.setOption(data.exceptionMessage,false);
            }else{
              this.set.setOption(data.result,true);
              this.gotoAction();
            }
          }else{
            this.set.setOption(data.exceptionMessage,false);
          }
        })
    }else{
    this.set.setOption("Enter All Mandatory Fields",false);
    }
    
  }

  gotoList() {
    this.router.navigate(['/report/']);
  }

  uploadfilearray(index, file) {
      this.imageEncode = [];
      let reader = new FileReader();
      reader.readAsDataURL(file[0])
      reader.onload = () => {
        this.pdcDetails[index].fileContent = reader.result;
        this.pdcDetails[index].fileName = file[0].name;
      };
  }

  downloadNachForm(){
    this.apiService.downloadForm(this.loanid,0,3).subscribe(data => {
      if(data.status==200){
        if(data.exceptionOccured=='Y'){
          this.set.setOption  (data.exceptionMessage,false);
        }else{
          window.open(data.result, '_blank');
          this.router.navigate(['/report/uploadNachForm/',0,this.loanid,this.orgId,this.programTypeId]);
        }
      }else{
        this.set.setOption(data.result,false);
      }
    }, error => console.log(error));
  }

  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  goToList(){
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
  }
  gotoAction() {
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
      this.HeaderDetails = data.result;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
      this.router.navigate(['report/action'],{ queryParams: { 'loanId':this.loanid,
    'orgId':this.orgId,'programTypeId':this.programId }});
    }, error => console.log(error));
  }
  popup(content) {

    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  nachpdcroute(){
    if(this.NachPdc == 1) {
      this.router.navigate(['/report/nachDownload', this.loanid, this.orgId, this.programTypeId]);
    } else if(this.NachPdc == 2) {
      this.router.navigate(['/report/pdc', this.loanid, this.orgId, this.programTypeId]);
    } else if(this.NachPdc == 3) {
      this.Emandate();
    } else {
      this.set.setOption("Choose either NACH/PDC", false);
    }
  }
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }
  Emandate() {
    this.digioAadhaar=false;
    this.digioDebitNet=false;
    this.urltext=false;
    this.urltexts=false;
    if(this.HeaderDetails[0].lenderId!=100){
      this.idfccheck=false;
    }
  this.netbankingUrl = "";
  this.debitUrl = "";
  this.nachLinkMsg = "";
  this.nachLinkMsg1 = "";
  var data = {
    "lastActivityTime": "",
    "userMedium": "backend",
    "userId": this.userId,
    "loanRequestId": this.loanid,
    "loanDisbursalId": "0",
    "mobileNo": this.mobileNo,
    "custName":this.HeaderDetails[0].customerName,
  }
  this.apiService.generateEnachLink(data).subscribe(data => {
    if (data.status == 200) {
      this.debitUrl = data.result.debitUrl;
      this.netbankingUrl = data.result.netbankingUrl;
      this.debitNachAmount = (data.result.debitNachAmount)? data.result.debitNachAmount: "0.0" ;
      this.netbankingNachAmount = (data.result.netbankingNachAmount)? data.result.netbankingNachAmount : "0.0";
      this.digioAmount = (data.result.digioAmount)? data.result.digioAmount : "0.0";
      this.digio = data.result.digio;
      this.digioesign = data.result.digioesign;
      this.debitMsg = data.result.debitMsg;
      this.netbankingMsg = data.result.netbankingMsg;
      this.digioAadhaar = (this.digioesign != '' && this.digioesign != null && this.digioesign != undefined);
      this.digioDebitNet = (this.digio != '' && this.digio != null && this.digio != undefined);
    }else {
      this.nachLinkMsg = data.result.debitMsg;
      this.nachLinkMsg1 = data.result.netbankingMsg;
    }
    this.modalService.open(this.nachLinkGeneration, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  })
}
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
