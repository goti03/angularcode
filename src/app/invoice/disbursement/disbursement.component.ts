import { Component, OnInit} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from '../../core/api.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.css']
})
export class DisbursementComponent implements OnInit {

  listVisible: boolean = false;
  disbursement: boolean = false;
  canceldisburse : boolean = false;
  dimId:any;
  customerNo = 'a';
  invoiceNolist = [];

  disburseList = [];
  loanRequestId: any;

  distId = '';

  constructor( private modalService: NgbModal, private apiService : ApiService, private set : breadcrumbMessage,private crypto: Crypto) { }

  closeResult : string = "";

  program : any;
  programId : any;
  orgId : any;
  programList : any;
  customerForProgram : any;
  customerList : any;
  mobileNo:String;

  otpVal : any;
  emptyOtp : boolean = false;

  fundingAmount : number = 0;
  
  o1 : any;
  o2 : any;
  o3 : any;
  o4 : any;

  roleId :any;
  userId:any;
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.orgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.invoiceNolist = [];
    this.disburseList = [];
    this.listVisible = false;
    this.disbursement = false;
    this.canceldisburse = false;
    this.programId = "0";
    this.dimId="0";
    if(this.roleId==16){
      this.apiService.getCustomerListUsingOrgId(this.orgId).subscribe(data => {
        if(data.status == 200){
          this.customerForProgram = data.result;
        }
      })
      this.apiService.getProgramSetupList().subscribe(data=>{
        if(data.status==200){
          this.programList=data.result;
        }
      });
    }else{
      this.orgId = "0";
      this.apiService.getProgramList(this.roleId,this.orgId).subscribe(data => {
     if(data.status == 200){
       this.programList = data.result;
     }
   })
    }
  }
  getProgramId(){
    if(this.roleId==16){
    for(let a of this.customerForProgram){
      if(a.orgId==this.orgId){
        this.programId=a.programId;
      }
    }
    }
  }
  otppopUp(content) {
   this.o1="";
   this.o2="";
   this.o3="";
   this.o4="";
    this.modalService.open(content,  { ariaLabelledBy: 'modal-basic-title' ,centered: true , backdrop : 'static', keyboard : false}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.ngOnInit();
  });
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

  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  disburse(){
    if(this.programId == '0' && this.roleId!=16){
      this.set.setOption('choose program', false);
      return;
    }
    if(this.orgId == '0'){
      this.orgId = 'orgid'
    }
    if(this.programId){
      if(this.roleId==16){
        for(let p of this.programList){
          if(this.programId == p.programId){
            this.program = p.programName;
          }
        }
      }else{
        for(let p of this.programList){
          if(this.programId == p.id){
            this.program = p.name;
          }
        }
      }
      const obj = {
          orgId: this.orgId.toString(),
          programId: this.programId,
          userId:this.userId
      }
      this.apiService.getcustpendinginvdtllist(obj).subscribe(data => {
        if(data.status == 200){
          this.customerList = data.result;
          if(this.customerList.length != 0){
            for(let a of this.customerList){
              a.sumAmount = 0;
              a.totalMark = false;
              for(let b of a.invoiceList){
                b.mark = false;
              }
            }
            this.listVisible = true;
            this.disbursement = true;
            this.canceldisburse = false;
          }
        }
      })
    }else {
      this.set.setOption('Choose program', false);
      return
    }
 
  }



  verifyOtp(){
    if(!this.o1 || !this.o2 || !this.o3 || !this.o4){
      this.emptyOtp = true;
      return;
    }
    this.otpVal=this.o1+this.o2+this.o3+this.o4;
    const obj = {
      userId:this.userId,
      requestType:1,
      loanRequestId:this.loanRequestId,
      dimId:this.dimId.toString(),
      orgId:this.orgId.toString(),
      userMedium:"backend",
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      OTP:this.otpVal,
      currentActivityId:"0"
    }
    this.modalService.dismissAll();
    this.apiService.getdisbursalotpverification(obj).subscribe(data => {
      if(data.status == 200){
        this.emptyOtp = false;
         this.ngOnInit();
        this.set.setOption(data.result,true);
  
      }
      else{
        if(data.exceptionOccured == 'N'){
          this.set.setOption(data.exceptionMessage,true);
        }else {
          this.set.setOption(data.exceptionMessage,false);
        }
      }
    })
  }

  generateorIntitateDisbursement(type,content,loanRequestId,orgid){
    this.calculate();
    this.loanRequestId = loanRequestId;
    const obj = {
    mobileNumber: "",
    typeAgreement: "0",
    lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    userMedium: "mobileApp",
    userId: this.userId,
    retailerId: orgid,
    loanRequestId: loanRequestId,
    loanDisbursalId: "",
    loanAmount: this.customerList[this.customerNo].sumAmount.toString(),
    requestType:type,
    orgid:orgid.toString(),
    invoice_list : this.disburseList,
    }
    this.apiService.disbursalinitiating(obj).subscribe(data => {
      if(data.status == 200){
        if(type == 1){
           this.dimId=data.result[0].dmiId;
           this.orgId=data.result[0].orgid;
           this.mobileNo=data.result[0].mobileNo;
          this.otppopUp(content);
        }
        else
        {
          this.ngOnInit();
        }
        
      }
      if(data.exceptionOccured == 'N'){
        this.set.setOption(data.exceptionMessage,true);
      }else {
        this.set.setOption(data.exceptionMessage,false);
      }
      
    })

  }

  cancelList(){
    if(this.programId == '0' && this.roleId!=16){
      this.set.setOption('Choose Program', false);
      return;
    }
    if(this.orgId == '0'){
      // this.set.setOption('Choose Customer', false);
      // return;
      this.orgId = 'orgid';
    }
    // if(this.programId){
    //   this.set.setOption('Choose program',false);
    //   return;
    // }
    if(this.roleId==16){
      for(let p of this.programList){
        if(this.programId == p.programId){
          this.program = p.programName;
        }
      }
    }else{
      for(let p of this.programList){
        if(this.programId == p.id){
          this.program = p.name;
        }
      }
    }
    const obj = {
      orgId: this.orgId,
      programId: this.programId,
      userId: this.userId 
    }
    this.apiService.disbursalrequestlist(obj).subscribe(data => {
      if(data.status == 200){
        this.listVisible = true;
        this.canceldisburse = true;
        this.disbursement = false;
        this.customerList = data.result;
      }
    })
  }

  resentOtp(t,o,l,d,content){
   this.dimId=d;
    this.orgId=o;
    const obj ={
      userId: this.userId,
      lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
      dimid : d,
      orgId : o,
      loanRequestId : l,
      requestType : t,
      programId : this.programId
    }
    this.apiService.resentOtp(obj).subscribe(data => {

      if((data.status == 200) && (t == 1)){
           this.dimId=d;
           this.orgId=o;
           this.loanRequestId=l;
           this.mobileNo=data.result;
          this.otppopUp(content);
        }
      if(data.exceptionOccured == 'N'){
        this.set.setOption(data.exceptionMessage,true);
        this.set.setOption("Success",true);
      }
    })
  }

  cancelRequest(o,l,d){
    const obj = {
      userId: this.userId,
      lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
      dimid : d,
      orgId : o,
      loanRequestId : l
    }
    this.apiService.cancelDisbursalRequest(obj).subscribe(data => {
      
        if(data.exceptionOccured == 'N'){
          this.set.setOption(data.exceptionMessage,true);
        this.set.setOption(data.result,true);
        this.ngOnInit();
        }else {
          this.set.setOption(data.exceptionMessage,false);
        }
      
    })
  }

  setCustomer(){
    if(this.programId){
      this.apiService.getCustomerListUsingProgramId(this.programId).subscribe(data => {
        if(data.status == 200){
            this.customerForProgram = data.result;
        }
      })
    }
  }

  calculate(){
    this.disburseList = [];
    this.fundingAmount = 0;
    for(let a of this.customerList[this.customerNo].invoiceList){
      if(a.mark == true){
        this.disburseList.push(a);
      }
    }
  }

  mark(customerNo,amount,i,d){
    
    if(this.customerNo == 'a'){
      this.customerNo =  customerNo;
    }
    if(customerNo == this.customerNo){
      if(!this.uniqueDist(d,i)){
        return;
      }
      if((Number(this.customerList[customerNo].sumAmount)+Number(amount)) < Number(this.customerList[customerNo].availLimit)){
        if(this.customerList[customerNo].invoiceList[i].mark == true){
      this.customerList[customerNo].sumAmount = Number(this.customerList[customerNo].sumAmount)+Number(amount); 
        }else {
      this.customerList[customerNo].sumAmount = Number(this.customerList[customerNo].sumAmount)-Number(amount); 
        }
      }else if((this.customerList[customerNo].invoiceList[i].mark == true) && ((Number(this.customerList[customerNo].sumAmount)+Number(amount)) < Number(this.customerList[customerNo].availLimit))){
      this.customerList[customerNo].sumAmount = Number(this.customerList[customerNo].sumAmount)-Number(amount); 
      }
      else {
        this.set.setOption('Should be less than the available limit', false);
        var a1 = setInterval(() => {
        this.customerList[customerNo].invoiceList[i].mark = false;
        clearInterval(a1);
        },1000)
      return;
      }
    }else {
      this.distId = '';
      if(!this.uniqueDist(d,i)){
        return;
      }
      for(let a of this.customerList[this.customerNo].invoiceList){
        a.mark = false;
      }
      this.customerList[this.customerNo].sumAmount = 0;
      this.customerNo = customerNo;
      if((Number(this.customerList[customerNo].sumAmount)+Number(amount)) < Number(this.customerList[customerNo].availLimit)){
        if(this.customerList[customerNo].invoiceList[i].mark == true){
          this.customerList[customerNo].sumAmount = Number(this.customerList[customerNo].sumAmount)+Number(amount); 
            }else {
          this.customerList[customerNo].sumAmount = Number(this.customerList[customerNo].sumAmount)-Number(amount); 
            }
        }else if((this.customerList[customerNo].invoiceList[i].mark == true) && ((Number(this.customerList[customerNo].sumAmount)+Number(amount)) < Number(this.customerList[customerNo].availLimit))){
          this.customerList[customerNo].sumAmount = Number(this.customerList[customerNo].sumAmount)-Number(amount); 
          }else {
          this.set.setOption('Should be less than the available limit', false);
            var a2 = setInterval(() => {
              this.customerList[customerNo].invoiceList[i].mark = false;
              clearInterval(a2);
            },1000)
        return;
        }
    }

}

allMark(a){
  this.customerNo = a;
  this.customerList[a].sumAmount = 0;
  if(this.customerList[a].totalMark == true){
  this.customerNo = a;
  for(let b of this.customerList[a].invoiceList){
    b.mark = true;
    if((Number(this.customerList[a].sumAmount) + Number(b.fundingAmount)) < this.customerList[a].availLimit){
      this.customerList[a].sumAmount = Number(this.customerList[a].sumAmount) + Number(b.fundingAmount);
      continue;
    }else {
      this.set.setOption('You cannot include all disbursement, since it is more than available limit',false);
      break;
    }
  }
  }else {
    this.customerNo = 'a';
    for(let b of this.customerList[a].invoiceList){
      b.mark = false;
    }
    }
  
  
}
move(a) {
  this.emptyOtp = false;
  document.getElementById("otp_"+a).focus();
}

blur(a) {
  this.emptyOtp = false;
  document.getElementById("otp_"+a).blur();
}

uniqueDist(a,b){
  if(this.distId == ''){
    this.distId = a;
    return true;
  }
  if(this.distId == a){
    return true;
  }else {
    this.set.setOption("Choose Invoices with same distributor name", false);
    var time3 = setInterval(() => {
      this.customerList[this.customerNo].invoiceList[b].mark = false;
      clearInterval(time3);
    }, 1000)
    return false;
  }
}
}
