import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../core/api.service";
import { breadcrumbMessage } from "../../shared/breadcrumb-message.service";
import * as moment from 'moment/moment.js';
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-pdc',
  templateUrl: './pdc.component.html',
  styleUrls: ['./pdc.component.css']
})
export class PdcComponent implements OnInit {

  BankDetails: Array<any> = [];
  pdcDetails=[];
  pdcBank = [];


  loanid: any;
  programTypeId: any;
  orgId: any;
  userId:any;
  curDate:any;

  bankNameList: [];
  accountTypeList: any;
  HeaderDetails: any;
  mobileNo: any;
  stausId: any;
  substatusId: any;
  programId: any;
  statusFlow: any;
  imageEncode:any;
  size : any;
  today : any;
  llaId:any;

  constructor(private set: breadcrumbMessage,private crypto: Crypto,
     private apiService: ApiService, private route : ActivatedRoute,private router: Router, private currency : Currency) { }
     preventTyping() {
      return false;
    }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.today = moment().format('YYYY-MM-DD');
    this.curDate = moment().format('YYYY-MM-DD HH:ss:mm');
    this.loanid = this.route.snapshot.params['loanid'];
    this.programTypeId = this.route.snapshot.params['programTypeId'];
    this.orgId = this.route.snapshot.params['orgId'];
    if(this.pdcDetails.length==0){
      this.addpdc();
      this.addpdc();
    }
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe( data => {
      this.HeaderDetails = data.result;
      this.mobileNo = this.HeaderDetails[0].mobileNo;
      this.stausId = this.HeaderDetails[0].stausId;
      this.substatusId = this.HeaderDetails[0].substatusId;
      this.programId = this.HeaderDetails[0].programTypeId;
      this.statusFlow = this.HeaderDetails[0].statusflow;
    });
    this.apiService.getAccountTypeList().subscribe(res => {
      this.accountTypeList = res.result;
      this.apiService.getBankNameList().subscribe(res => {
        this.bankNameList = res.result;
        this.apiService.getSellerBankDetails(this.loanid).subscribe(data => {
          if(data.exceptionOccured == 'Y') {
            this.set.setOption(data.exceptionMessage, false);
          }
          else if(data.status == 200) {
            this.BankDetails = data.result;
            this.size = this.BankDetails.length;
            for(let b of this.BankDetails){
              const obj = {
                bankName: b.bankName,
                bankId : b.bankId
              }
              this.pdcBank.push(obj);
            }
            console.log("list::"+JSON.stringify(this.pdcBank));
          } else {
            this.set.setOption(data.exceptionMessage, false);
          }
        }, error => console.log(error));
      });
    });
  

  }
  ext(filename) {
    return filename.split('.').pop();
  }
  uploadfilearray(index, file) {
    var ext = this.ext(file[0].name);
    if (ext == 'jpg' || ext == 'jpeg' || ext == 'png'){
      let reader = new FileReader();
      reader.readAsDataURL(file[0])
      reader.onload = () => {
        console.log("index::"+index);
        console.log("reader.result::"+reader.result);
        this.pdcDetails[index].fileContent = reader.result;
        this.pdcDetails[index].fileName = file[0].name;
        console.log("this.pdcDetails[index]::"+this.pdcDetails[index]);
      };
    }else{
      this.set.setOption("Please choose Image Files", false);
      const files=<HTMLInputElement>document.getElementById('file_'+index);
      files.value="";
    }
}
//   uploadfilearray(index, file) {
//     let reader = new FileReader();
//     reader.readAsDataURL(file[0])
//     var t = this;
//     reader.onload = function () {
//       t.imageEncode.push(reader.result);
//     }
//     this.pdcDetails[index].fileContent = this.imageEncode[0].split(",")[1];
//     this.pdcDetails[index].fileName = file[0].name;
//     this.imageEncode=[];
//     console.log("this.imageEncode::"+this.imageEncode);
// }
  

  add() {
    const bankObj = {
        primaryApplicant: "",
        accountNo: "",
        accountType: "",
        branchName: "",
        bankName: "",
        bankId: "",
        ifscCode: "",
        id : ""
    }
    this.BankDetails.push(bankObj);
  }
  isNullOrUndefinedOrEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  validdateBankDetails() {
    var count = 0;
    for (let b of this.BankDetails) {
      if (this.isNullOrUndefinedOrEmpty(b.id)) {
        if (this.isNullOrUndefinedOrEmpty(b.bankName)) {
          count++;
        } else if (this.isNullOrUndefinedOrEmpty(b.branchName)) {
          count++;
        } else if (this.isNullOrUndefinedOrEmpty(b.primaryApplicant)) {
          count++;
        } else if (this.isNullOrUndefinedOrEmpty(b.ifscCode)) {
          count++;
        } else if (this.isNullOrUndefinedOrEmpty(b.accountNo)) {
          count++;
        } else if (this.isNullOrUndefinedOrEmpty(b.accountType)) {
          count++;
        }
      }

    }
    if (count == 0) {
      return false;
    } else {
      return true;
    }
  }

  save() {
    if (this.validdateBankDetails()) {
      this.set.setOption("Please Enter valid Bank Details", false);
    } else {
      this.apiService.saveBankDetailsop(this.userId, this.loanid, this.BankDetails).subscribe(data => {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
        } else if (data.status == 200) {
          this.set.setOption("Bank add successfully", true);
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
    }
  }

  del(i) {
    this.BankDetails.splice(i,1);
  }
  validateCheckBox(index){
    var checkbox = document.getElementsByName("checkbox");
    for (let i = 0; i < checkbox.length; i++) {
      (checkbox[i] as HTMLInputElement).checked=false;
    }
    (checkbox[index] as HTMLInputElement).checked=true;
    this.llaId=this.BankDetails[index].id;
    for(let p of this.pdcDetails){
        p.bankid=this.BankDetails[index].id;
        p.bankName=this.BankDetails[index].bankName;
        p.accountNumber=this.BankDetails[index].accountNo;
        p.accountType=this.BankDetails[index].accountType;
        p.primaryAccountHolder=this.BankDetails[index].primaryApplicant;
        p.branch=this.BankDetails[index].branchName;
        p.ifscCode=this.BankDetails[index].ifscCode;

    }
    // bankid:'',
    // bankName:'',
    // accountNumber:'',
    // accountType:'',
    // primaryAccountHolder:'',
    // branch:'',
    // ifscCode:'',
  }
  addpdc() {
    const pdcObj =
     {
      bankid:'',
      bankName:'',
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
      file : ''
    }
    this.pdcDetails.push(pdcObj);
  }

  delpdc(i) {
    this.pdcDetails.splice(i,1);
  }

  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  submitpdc() {
    var checkbox = document.getElementsByName("checkbox");
    var count=0;
    for (let i = 0; i < checkbox.length; i++) {
      if((checkbox[i] as HTMLInputElement).checked==true){
        count++;
      }
    }
    if(count==0){
      this.set.setOption("Choose Bank for PDC", false);
    } else {
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
          }else if(p.chequeNumber == null||p.chequeNumber == undefined || p.chequeNumber == ''){
            count++;
          }else if(p.fileName == null||p.fileName == undefined || p.fileName == ''){
            count++;
          }else if(p.fileContent == null||p.fileContent == undefined || p.fileContent == ''){
            count++;
          }else{
            p.fileContent=p.fileContent.split(",")[1]
          }
        }
        console.log(JSON.stringify(this.pdcDetails));
        if(count==0){
          console.log("this.curDate::"+this.curDate);
          const data={
            userId:this.userId,
            lastActivityTime: this.curDate,
            userMedium: "Backend",
            mobileNo: this.mobileNo,
            loanRequestId: this.loanid,
            llaId: this.llaId,
            pdcDetails:this.pdcDetails,
            statusFlow:this.HeaderDetails[0].statusflow
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
                this.set.setOption(data.exceptionMessage ? data.exceptionMessage : "failed" ,false);
              }
            },error=>console.error());
        }else{
        this.set.setOption("Enter All Mandatory Fields",false);
        }
      }
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

  setdetails(i) {
    for(let a of this.BankDetails) {
      if(a.bankId == this.pdcDetails[i].bankid) {
        this.pdcDetails[i].accountNumber = a.accountNo;
        this.pdcDetails[i].branch = a.branchName;
        this.pdcDetails[i].ifscCode = a.ifscCode;
        this.pdcDetails[i].accountType = a.accountType;
        this.pdcDetails[i].primaryAccountHolder = a.primaryApplicant;
      }
    }
  }
  goToList() {
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
  }
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }
}
