import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { Crypto } from '../../shared/crypto.service';
import * as moment from 'moment/moment.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from '../../dashboards/dashboard3/smart-data-table';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-money-rotation',
  templateUrl: './money-rotation.component.html',
  styleUrls: ['./money-rotation.component.css']
})
export class MoneyRotationComponent implements OnInit {
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
  constructor(private apiService: ApiService, public set: breadcrumbMessage, private changeDetec: ChangeDetectorRef, private crypto: Crypto) { 
    // this.programCtrl = new FormControl();
    this.losCtrl = new FormControl();
    this.apiService.getLOSOutstandingDetails().subscribe(data => {
      if (data.status == 200) {
        this.moneyRotation = data.result;
        this.filteredLos = this.losCtrl.valueChanges
        .pipe(startWith(''),map(list1 => list1 ? this.loslist(list1) : this.moneyRotation.slice()));
        console.log("filteredLos::"+JSON.stringify(this.filteredLos));
      }
    }, error => console.log(error));
  }

  loslist(name: string) {
    return this.moneyRotation.filter(list =>
      list.LOSNo.toLowerCase().includes(name.toLowerCase()));
  }

  enterKey(e) {
    this.showOne = false;
  }
  ngOnInit() {
    this.showSubmit = false;
    this.showOne = false;
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.date = moment().format('YYYY-MM-DD HH:mm:ss');

      this.apiService.getLOSOutstandingDetails().subscribe(res => this.moneyRotation = res.result);

  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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
  showList(data) {
    console.log("data::"+data);
    var loanId;
    this.moneyRotation.forEach((r)=>{
      if(data==r.LOSNo){
        loanId=r.loanRequestId;
      }
    });
    console.log("LOS data:::"+data);
    if(loanId=='' || loanId==null || loanId== undefined){
      this.showOne = false;
      this.set.setOption("Please select Valid LOS Id",false);
    }else{
      this.showOne = true;
      this.moneyRotation.forEach(one => {
        if (loanId == one.loanRequestId) {
          this.loanId = one.loanRequestId;
          this.losNo = one.LOSNo;
          this.orgName = one.orgName;
          this.availLimit = one.availLimit;
          this.creditLimit = one.creditLimit;
          this.outstandingPrincipal = one.outstandingPrincipal;
          this.outstadingInterest = one.outstadingInterest;
          this.outstandingCharges = one.outstandingCharges;
          this.excessAmount = one.excessAmount;
          this.totalOutstanding = one.totalOutstanding;
          this.allowedTranchLimit = one.allowedTranchLimit;
          this.anchorlist = [];
          this.rotationAmount = this.totalOutstanding;
        }
      });
    }
  }

  amountCheck() {
    console.log('this.rotationAmount::' + this.rotationAmount);
    console.log('total::' + this.totalOutstanding);
    if (Number(this.rotationAmount) > Number(this.totalOutstanding)) {
      this.set.setOption("Credit Rotation  Should Not Above Total Outstanding", false);
    }
  }
  chooseBuyer(type, index) {
    this.showSubmit = true;
  
    this.type = type;
   
    this.apiService.getBuyerList(this.loanId, this.type).subscribe(data => {
      if (data.status == 200) {
        this.anchorlist[index].buyerList = JSON.parse(data.result);

      }
    });
  }
 
  getFundingPer(data, index) {
   
    for (let a of  this.anchorlist[index].buyerList) {
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
    if (this.anchorlist[index].fundingAmount < Number(this.allowedTranchLimit) || this.anchorlist[index].fundingAmount == Number(this.allowedTranchLimit)) {
      this.anchorlist[index].fundingAmount = this.anchorlist[index].fundingAmount;
      this.totalFundingcal(index, this.anchorlist[index].fundingAmount);
      this.calculateTotalFundingLimit();
    } else {
      this.errorMsg="Fund Amount is Greater than Allowed Tranch Limit,so we are keep Tranch Limit as Funding Amount";
      this.anchorlist[index].fundingAmount = this.allowedTranchLimit;
      this.clearError();
      this.totalFundingcal(index, this.anchorlist[index].fundingAmount);
      this.calculateTotalFundingLimit();
    }
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
      if (a.type == null || a.type == '') {
        this.set.setOption("Please Choose Account type", false);
        return;
      }else if (a.buyerId == null || a.buyerId == '') {
        this.set.setOption("Please Set The Funding Percentage", false);
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
      }else if (Number(this.rotationAmount)==0) {
        this.set.setOption("Credit-Rotation Amount Should Not Be 0",false);
        return;
      }else if (Number(this.totalFunding)!=Number(this.rotationAmount)) {
        this.set.setOption("Total Funding amount and credit-Rotation Amount Should Be Same",false);
        return;
      }
  }
  const data = {
    loanRequestId: this.loanId,
    lastActivityTime: this.date,
    userMedium: "mobileApp",
    userId: this.userId,
    creditRotation: this.rotationAmount,
    invArray: this.anchorlist
  }
    this.apiService.creditRotation(data).subscribe(data => {
    if (data.status == 200) {
      this.set.setOption(data.exceptionMessage, true);
      this.ngOnInit();
    } else { 
      this.set.setOption(data.exceptionMessage, false);
    }
  });
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
// this.fileDynamicList[index].fileContent = reader.result;
// this.fileDynamicList[index].originalFileName = file[0].name;
// this.fileDynamicList[index].fileContent = this.fileDynamicList[index].fileContent.split(",")[1];

}

