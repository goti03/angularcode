import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { Crypto } from '../../shared/crypto.service';
import * as moment from 'moment/moment.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from '../../dashboards/dashboard3/smart-data-table';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Currency } from '../../shared/currency.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-seller-disbuserment',
  templateUrl: './seller-disbuserment.component.html',
  styleUrls: ['./seller-disbuserment.component.css']
})
export class SellerDisburesmentComponent implements OnInit {
  moneyRotation: Array<any> = [];
  anchorlist: Array<any> = [];
  loanId: any;
  searchLoanId: any;
  losNo: any;
  orgName: any;
  availLimit: any;
  creditLimit: any;
  outstandingPrincipal: any;
  outstadingInterest: any;
  outstandingCharges: any;
  excessAmount: any;
  totalOutstanding: any;
  showOne: boolean = false;
  rotationAmount: any;
  type: any;
  allowedTranchLimit: any;
  getBuyer: any;
  userId: any;
  date: any;
  totalFunding: any;
  total: any;
  content: any;
  uploaded: boolean = false;
  contentName: any;
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  filePath: any;
  showSubmit: boolean = false;
  errorMsg: string;
  losCtrl: FormControl;
  filteredLos: Observable<any[]>;
  HeaderDetails: Array<any> = [];
  showHeaderDetails: boolean = false;
  smeType:any;
  tranchLimit:any;
  buyerList: Array<any> = [];
  otp:any;
  loanDisbursalId:any;
  message:any;
  closeResult:any;
  regenerateOtp: boolean = false;
  @ViewChild('otpPopup', { static: true }) otpPopup: TemplateRef<any>;
  constructor(private apiService: ApiService, public set: breadcrumbMessage, private changeDetec: ChangeDetectorRef, private crypto: Crypto,
    private currency : Currency,private modalService: NgbModal) { }

  loslist(name: string) {
    return this.moneyRotation.filter(list =>
      list.LOSNo.toLowerCase().includes(name.toLowerCase()));
  }

  
  ngOnInit() {
    this.showSubmit = false;
    this.showOne = false;
    this.showHeaderDetails = false;
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.date = moment().format('YYYY-MM-DD HH:mm:ss');
      // this.apiService.getLOSOutstandingDetails().subscribe(res => this.moneyRotation = res.result);

  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }
  addAnchorlist() {
      const obj = {
        type: '',
        fundingPercentage: '',
        buyerId:'',
        invoiceNo: '',
        invoiceAmount: '',
        invoiceDate: '',
        fundingAmount: '',
        fileName:'',
        fileContent: '',
      }
      this.anchorlist.push(obj);
      this.changeDetec.detectChanges();
      return true;
  }
  remove(i) {
    // this.totalFunding=Number(this.totalFunding)-Number(this.anchorlist[i].fundingAmount);
    this.anchorlist.splice(i, 1);
    this.calculateTotalFundingLimit();
    return true;
  }
  showList(loanId) {
    this.showHeaderDetails=false;
    this.anchorlist=[];
    this.loanId=loanId.split("/")[loanId.split("/").length-1];
    this.apiService.getLoanHeaderDetails(this.loanId).subscribe((data)=>{
      if(data.status==200){
        this.HeaderDetails=data.result;
        if(this.HeaderDetails[0].programTypeId!='2'){
          this.set.setOption("Please Enter Seller Case",false);
        }else if(this.HeaderDetails[0].status!='Approved'){
          this.set.setOption(this.searchLoanId+" is Not Approved,Please Complete Onboarding",false);
        }else if(this.HeaderDetails[0].stausId != 188 && this.HeaderDetails[0].stausId != 63){
          console.log("this.HeaderDetails[0].statusId::"+this.HeaderDetails[0].stausId);
          this.set.setOption(this.searchLoanId+" is Not Live, Please Complete Onboarding ",false);
        }else{
          this.showHeaderDetails=true;
          this.smeType=this.HeaderDetails[0].smeType;
          if(this.smeType=='1'||this.smeType=='2'){
            this.chooseBuyer(this.smeType);
          }
          this.addAnchorlist();
         
        }
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });
  }

  amountCheck() {
    console.log('this.rotationAmount::' + this.rotationAmount);
    console.log('total::' + this.totalOutstanding);
    if (Number(this.rotationAmount) > Number(this.totalOutstanding)) {
      this.set.setOption("Credit Rotation  Should Not Above Total Outstanding", false);
    }
  }
  chooseBuyer(type) {
    this.showSubmit = true;
    this.type = type;
    this.apiService.getBuyerList(this.loanId, this.type).subscribe(data => {
      if (data.status == 200) {
        this.buyerList = JSON.parse(data.result);
      }
    });
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
}
  enterKey(e) {
    if (e.keyCode === 13 && this.isNullorUndefinedorEmpty(this.searchLoanId)) {
      this.showList(this.searchLoanId);
    }
  }
  getFundingPer(data, index) {
    for (let a of  this.buyerList) {
      if (data == a.orgId) {
        this.anchorlist[index].fundingPercentage = a.fundingPercentage;
        this.calFundingLimit(index);
        break;
      }
    }
  }
  calFundingLimit(index) {
    this.anchorlist[index].fundingAmount = this.anchorlist[index].invoiceAmount * this.anchorlist[index].fundingPercentage / 100;
    this.anchorlist[index].fundingAmount=this.anchorlist[index].fundingAmount.toFixed(2);
    // if (this.anchorlist[index].fundingAmount < Number(this.allowedTranchLimit) || this.anchorlist[index].fundingAmount == Number(this.allowedTranchLimit)) {
    //   this.anchorlist[index].fundingAmount = this.anchorlist[index].fundingAmount;
    //   this.totalFundingcal(index, this.anchorlist[index].fundingAmount);
    //   this.calculateTotalFundingLimit();
    // } else {
    //   this.errorMsg="Fund Amount is Greater than Allowed Tranch Limit,so we are keep Tranch Limit as Funding Amount";
    //   this.anchorlist[index].fundingAmount = this.allowedTranchLimit;
    //   this.clearError();
    //   this.totalFundingcal(index, this.anchorlist[index].fundingAmount);
    //   this.calculateTotalFundingLimit();
    // }
  }
  clearError(){
    setInterval(() => {
      this.errorMsg="";
    }, 10000)
    
  }
changeDateFormat(date,i){
  this.anchorlist[i].invoiceDate=moment(date).format('DD-MM-YYYY');
}
  totalFundingcal(i, data) {
    // this.totalFunding = (i == 0) ? data : (Number(this.totalFunding) + Number(data));
    // this.totalFunding=this.totalFunding.toFixed(2);
  }
  calculateTotalFundingLimit(){
    var total=0;
    this.anchorlist.forEach((a)=>{total=Number(a.fundingAmount)+Number(total)});
    this.totalFunding=total.toFixed(2);
    console.log("total::"+total);
  }
  invoiceNoCheck(index){
    for (let i=0;i<this.anchorlist.length;i++) {
      if(this.anchorlist[index].invoiceNo==this.anchorlist[i].invoiceNo && index!=i){
        this.set.setOption(this.anchorlist[index].invoiceNo+" this invoice no already exist",false);
        this.anchorlist[index].invoiceNo="";
        break;
      }
    }
  }
  onSubmit() {
    for (let a of this.anchorlist) {
      a.buyerId=Number(a.buyerId);
      if (this.HeaderDetails[0].smeType == null || this.HeaderDetails[0].smeType=='') {
        this.set.setOption("Please Choose SME Type", false);
        return;
      }else if (a.buyerId == null || a.buyerId == '') {
        this.set.setOption("Please Choose Anchor Name", false);
        return;
      }else if (a.fundingPercentage == null || a.fundingPercentage == '') {
        this.set.setOption("Please Set The Funding Percentage", false);
        return;
      }else if (a.invoiceNo == null || a.invoiceNo == '') {
        this.set.setOption("Please Enter Invoice No", false);
        return;
      }else if (a.invoiceAmount == null || a.invoiceAmount == '') {
        this.set.setOption("Please Enter Invoice Amount", false);
        return;
      }else if (a.invoiceDate == null || a.invoiceDate == '') {
        this.set.setOption("Please Choose Invoice Date", false);
        return;
      } else if (a.fundingAmount == null || a.fundingAmount == '') {
        this.set.setOption("Please Set The Funding Amount", false);
        return;
      }else if (a.fileContent == null || a.fileContent == '') {
        this.set.setOption("Please Upload the Invoice  File", false);
        return;
      }
  }
  var totalLimit=0;
  for(let l of this.anchorlist){
    totalLimit=Number(totalLimit)+Number(l.fundingAmount);
  }
  var totalavailableLimit=(this.HeaderDetails[0].availableLimit>this.HeaderDetails[0].tranchLimit)?this.HeaderDetails[0].tranchLimit:this.HeaderDetails[0].availableLimit;
  if(totalLimit>=totalavailableLimit ){
    this.set.setOption( totalLimit+" total Funding limit is must be less than "+totalavailableLimit, false);
    return;
  }
  const data = {
    loanRequestId: this.loanId,
    lastActivityTime: this.date,
    userMedium: "backEndApp",
    userId: this.userId,
    retailerId:this.HeaderDetails[0].orgId,
    currentActivityId:'19',
    invoiceData: this.anchorlist,
    type:Number(this.HeaderDetails[0].smeType),
    mobileNo:this.HeaderDetails[0].mobileNo
  }
    this.apiService.saveuploadInvoice(data).subscribe(data => {
    if (data.status == 200) {
      this.set.setOption(data.exceptionMessage, true);
      this.loanDisbursalId=data.result.loanDisbursalId;
      const request={
        mobileNumber : this.HeaderDetails[0].mobileNo,
        type : '4',
        retailerId : this.HeaderDetails[0].orgId,
        userId : this.userId,
        lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
        retailerType : '3',
        loanDisbursalId : data.result.loanDisbursalId,
        loanRequestId : this.loanId,
        consent : 'Y',
        userMedium : 'PWA'
      };
      this.apiService.getOtp(request).subscribe((res)=>{
        if(res.status==200){
          this.otpPop(this.otpPopup);
          this.loanForm();
        }else{
          this.set.setOption(res.exceptionMessage,false);  
        }
      }); 
    } else { 
      this.set.setOption(data.exceptionMessage, false);
    }
  });
  }
  getOtp(){
    const request={
      mobileNumber : this.HeaderDetails[0].mobileNo,
      type : '4',
      retailerId : this.HeaderDetails[0].orgId,
      userId : this.userId,
      lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
      retailerType : '3',
      loanDisbursalId : this.loanDisbursalId,
      loanRequestId : this.loanId,
      consent : 'Y',
      userMedium : 'PWA'
    };
    this.apiService.getOtp(request).subscribe((res)=>{
      if(res.status==200){
        
      }
    }); 
  }
  loanForm(){
    const obj = {
      mobileNumber : this.HeaderDetails[0].mobileNo,
      typeAgreement : 0,
      lastActivityTime : moment().format('YYYY-MM-DD HH:mm:ss'),
      userId : this.userId,
      retailerId : this.HeaderDetails[0].orgId,
      loanRequestId : this.loanId,
      loanDisbursalId : this.loanDisbursalId,
      userMedium: 'mobileApp'
    }
    this.apiService.generateLoanAgreement(obj).subscribe(objRes => {
      if(objRes.status == 200){
        
      }else{
        this.set.setOption(objRes.exceptionMessage,false);
      }
    }, error => console.log(error));
  }
ext(filename) {
  return filename.split('.').pop();
}
onFileChange(event, index) {
  var ext = this.ext(event.target.files[0].name);
  if ((ext == 'jpg') || (ext == 'jpeg') || (ext == 'png')|| (ext == 'xlsx' || ext == 'pdf')) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.anchorlist[index].fileContent  = reader.result;
        this.anchorlist[index].fileContent = this.anchorlist[index].fileContent.split(",")[1];
        this.anchorlist[index].fileName = event.target.files[0].name;
        this.uploaded = true;
      };
    }
  }
}

verifyOtp(){
  this.regenerateOtp=false;
  const obj2 = {
    mobileNumber: this.HeaderDetails[0].mobileNo ,
    type: '4',
    lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    userId: this.userId,
    retailerId: this.HeaderDetails[0].orgId,
    currentActivityId: '56',
    loanRequestId: this.loanId,
    loanDisbursalId: this.loanDisbursalId,
    karzaRequestId: '',
    retailerType: '3',
    userMedium: 'backEndApp',
    OTP: Number(this.otp)
  };
  this.apiService.verifyOtp(obj2).subscribe(obj2Res => {
    if (obj2Res.status == 200) {
      this.modalService.dismissAll();
      this.set.setOption(obj2Res.exceptionMessage,true);
      this.ngOnInit();
    }else{
      this.regenerateOtp=true;
      this.message=obj2Res.exceptionMessage;
    }
  });
}
otpPop(content){
  this.modalService.open(content, { size: 'sm' }).result.then((result) => {
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
    return `with: ${reason}`;
  }
}
}

