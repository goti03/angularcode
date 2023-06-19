import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../../core/api.service";
import { breadcrumbMessage } from "../../../shared/breadcrumb-message.service";
import * as moment from 'moment/moment.js';
import { Currency } from '../../../shared/currency.service';
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-nach-download',
  templateUrl: './nach-download.component.html',
  styleUrls: ['./nach-download.component.css']
})
export class NachDownloadComponent implements OnInit {
  BankDetails: Array<any> = [];
  accountTypeList: any;
  loanid: any;
  orgId: any;
  programTypeId: any;
  HeaderDetails = [];
  numbers = [];
  imageEncode = [];
  noOfChequeValue: number = 2;
  NachPdc: number;
  curDate: any;
  pdcDetails = [];
  bankNameList = [];
  accountType = [];
  mobileNo: any;
  stausId: any;
  substatusId: any;
  programId: any;
  statusFlow: any;
  today: any;
  size: any;
  pdcBank = [];
  llaId: any;
  nachBank = [];
  check:any;
  userId:any;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private crypto: Crypto,
    private router: Router, private set: breadcrumbMessage, private changeDetec: ChangeDetectorRef, private currency : Currency) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.today = moment().format('YYYY-MM-DD');
    this.loanid = this.route.snapshot.params['loanid'];
    this.programTypeId = this.route.snapshot.params['programTypeId'];
    this.orgId = this.route.snapshot.params['orgId'];
    this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
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
          if (data.exceptionOccured == 'Y') {
            this.set.setOption(data.exceptionMessage, false);
          }
          else if (data.status == 200) {
            this.BankDetails = data.result;
            this.size = this.BankDetails.length;
            for (let b of this.BankDetails) {
              const obj = {
                bankName: b.bankName,
                id: b.id
              }
              this.nachBank.push(obj);
              if(b.enach == 1) {
                b.enach = true;
                this.llaId=b.id;
              } else if (this.isNullOrUndefinedOrEmpty(b.enach)) {
                b.enach = false;
              } else {
                b.enach = false;
              }
            }
          } else {
            this.set.setOption(data.exceptionMessage, false);
          }
        }, error => console.log(error));
      });
    });

  }
  add() {
    const bankObj = {
      primaryApplicant: "",
      accountNo: "",
      accountType: "",
      branchName: "",
      bankName: "",
      bankId: "",
      ifscCode: "",
      id: ""
    }
    this.BankDetails.push(bankObj);
  }
  validateCheckBox(index){
    var checkbox = document.getElementsByName("checkbox");
    for (let i = 0; i < checkbox.length; i++) {
      (checkbox[i] as HTMLInputElement).checked=false;
    }
    (checkbox[index] as HTMLInputElement).checked=true;
    this.llaId=this.BankDetails[index].id;
  }

  isNullOrUndefinedOrEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  del(i) {
    this.BankDetails.splice(i,1);
  }
  validdateBankDetails() {
    var count = 0;
    for (let b of this.BankDetails) {
      if (b.id == this.llaId ) {
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
  proceedNach() {
    if (this.validdateBankDetails()) {
      this.set.setOption("Please Enter valid Bank Details", false);
    } else {
      this.apiService.saveBankDetailsop(this.userId, this.loanid, this.BankDetails).subscribe(data => {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
           } else if (data.status == 200) {
          this.set.setOption("NACH Bank details Uploaded",true);
          } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
//update primary flag
      var checkbox = document.getElementsByName("checkbox");
          var count=0;
          for (let i = 0; i < checkbox.length; i++) {
            if((checkbox[i] as HTMLInputElement).checked==true){
              count++;
            }
          }
         if(count!=0){
          const data={
            llaId:this.llaId,
            loanid:this.loanid,
            statusFlow:this.statusFlow,
           }
           this.apiService.UpdateNachBankDetails(data).subscribe(data => {
            if(data.status==200){ 
                this.set.setOption("NACH Bank details Uploaded",true);
                this.gotoAction();
            }else{
              this.set.setOption(data.exceptionMessage,false);
            }
           },error=>console.error(error));
         }else{
           this.set.setOption("Please Choose Bank For NACH",false);
         }
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

  downloadNachForm() {
    this.apiService.downloadForm(this.loanid, 0, 3).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
        } else {
          window.open(data.result, '_blank');
          this.router.navigate(['/report/uploadNachForm/', 0, this.loanid, this.orgId, this.programTypeId]);
        }
      } else {
        this.set.setOption(data.result, false);
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

  goToList() {
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

  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }
}
