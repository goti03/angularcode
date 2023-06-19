import { Component, OnInit,ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import { MatTabsModule} from '@angular/material/tabs';
import * as Highcharts from 'highcharts';
import * as moment from 'moment/moment.js';
import { ApiService} from "..//..//core/api.service";
import {ExcelService} from '..//..//shared/excel.service';
import { Constant } from '../../core/constant';
import { breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import { environment } from '../../../environments/environment';
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-gemdisbursal',
  templateUrl: './gemdisbursal.component.html',  
   encapsulation: ViewEncapsulation.None
})
export class GemDisbursalComponent implements OnInit {
  statusId:number;
  invoiceList=[];
  invoiceDetailsList=[];
  fileDynamicList = [];
  filenewDynamic: any = {};
  fileUploadData: any = [];
  checkButton:any;
  LoanEmiSchedule :any;
  loanCheckListDetails :any;
  checked = true;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  Partnership=false;
  Proprietorship=false;
  PrivateLimited=false;
  HUF=false;
  LLP=false;
  Manufacturing=false;
  Retail=false;
  Wholesale=false;
  FoodServices=false;
  OtherServices=false;
  male=false;
  female=false;
  Transgender=false;
  Single=false;
  Married=false;
  Others=false;
  gstcheckbox1=false;
  gstcheckbox2=false;
  Savings=false;
  Current=false;
  OD=false;
  CC=false;
  id:any;
  loanid:any;
  orgId:any;
  retailerId:any;
  loanFormDetails:any;
  fees:any;
  lastName:any;
  businessYears:any;
  city:any;
  entityName:any;
  emailId:any;
  bankName:any;
  industryType:any;
  addressTwo:any;
  state:any;
  ifscCode:any;
  incorpDate:any;
  companyType:any;
  panNo:any;
  noOfPartners:any;
  accountType:any;
  branchName:any;
  addressThree:any;
  mobileNo:any;
  customerName:any;
  loanAmount:any;
  dob:any;
  lenderName:any;
  loanDate:any;
  addressOne:any;
  officeState:any;
  officceAddress1:any;
  officceAddress2:any;
  officeCity:any;
  aadharNo:any;
  officePincode:any;
  officeLandmark:any;
  lenderEmail:any;
  countryOfBirth:any;
  desiredTenure:any;
  applicationReferencNo:any;
  yearInBusiness:any;
  typeOfIndustry:any;
  officeMailId:any;
  applicant:any;
  GSTno:any;
  accountNo:any;
  branchAddress:any;
  lenderSite:any;
  placeOfBirth:any;
  countryOfResidenceAsPerTaxLaw:any;
  filePath:any;
  signature:any;
  district:any;
  entityType:any;

  digital:number;
  loanDisbursalId:number;
  bankid:number;
  month:any;
  year:any;
  index:any;
  selector:any;
  submitted = false;
  disbursalData:any;
  disbursalInvoiceData:any;
  disbursalDocuments:any;
  disbursalCheckList:any;
  docId: ReportModel = new ReportModel();
  
  amount:any;
  date1:any;
  date2:any;
  date3:any;
  date4:any;
  date5:any;
  date6:any;
  momentVariable:any;
  programTypeId:any;
  subStatus:any;
  closeResult: string;
  HeaderDetails:any;
  tempGemId:any;
  loanDisbursalNo:any;
  requestList: Observable<ReportModel[]>;
  userId:any;
  constructor(
    private route: ActivatedRoute,private router: Router,private apiService : ApiService,private crypto: Crypto,
    private modalService: NgbModal,private changeDetec: ChangeDetectorRef,private excelService:ExcelService, private set : breadcrumbMessage, private currency : Currency) { 
     }
     preventTyping() {
      return false;
    }
  ngOnInit(): void {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    if(this.userId=='12'){
      this.checkButton=false;
    }else{
      this.checkButton=true;
    }  
    this.submitted = false;
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    this.digital = this.route.snapshot.params['digital'];
    this.programTypeId = this.route.snapshot.params['programTypeId'];
    console.log("data=="+this.id+"loanid=="+this.loanid);
    this.apiService.getLoanHeaderDetails(this.loanid)
                .subscribe(data => {
                  this.HeaderDetails=data.result;
                  this.programTypeId=this.HeaderDetails[0].programTypeId;
                  this.orgId=this.HeaderDetails[0].orgId;
                  this.subStatus=this.HeaderDetails[0].substatusId;
    this.apiService.getDisbursalInvoiceDetails(this.id,this.loanid,this.programTypeId,0) 
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.disbursalInvoiceData = data.result;
      console.log("disbursalInvoiceData==="+JSON.stringify(this.disbursalInvoiceData));
    }, error => console.log(error));
              }, error => console.log(error));
    this.apiService.getDisbursalDetails(this.id,this.loanid) 
    .subscribe(data => {
      // console.log("data=="+JSON.stringify(data));
      this.disbursalData = data.result;
      console.log("disbursalData==="+JSON.stringify(this.disbursalData));
    }, error => console.log(error));

    
    
  }
  action(gemId:string) {
    this.router.navigate(['report/action'],{ queryParams: { 'loanId':this.loanid,
    'orgId':this.orgId,'programTypeId':this.programTypeId }});
  }

  camGstDetails(gemId:string){
    var retailerId=this.crypto.decryt(localStorage.getItem("retailerId"));
    this.router.navigate(['report/camgstsummary'],{ queryParams: { 'customerId':this.id,'loanId':this.loanid,
    'orgId':this.orgId,'retailerId':retailerId,'programTypeId':this.programTypeId,'gemId':gemId }});
  }

saveFile(){
  var curDate =moment().format('YYYY-MM-DD HH:mm:ss');
  var file=document.getElementsByName("file");
  var comment=document.getElementsByName("comment");
for(let i=0;i<file.length;i++){
  var name=(file[i] as HTMLInputElement).value;
  const alert = "filepath::"+name;
  this.set.setOption(alert,true)
  var remark=(comment[i] as HTMLInputElement).value;
  var temp=name.split("\\");
  const alert1 = "temp::"+temp;
  this.set.setOption(alert1,true)
  var filename=temp[(temp.length-1)];
  const filedata={
  fileName:filename,
  remarks:remark,
  filePath:name,
  }
  this.fileUploadData.push(filedata);
}
var remarks=(document.getElementById("commonRemarks") as HTMLInputElement).value;
const uploadedData={
  statusId:this.statusId,
  loanDisbursalId:this.loanDisbursalId,
  loanRequestId:this.loanid,
  remarks:remarks,
  userId: this.userId,
  createdOn:curDate,
  subStatusId:'42',
  usermedium:'backendApp',
  fileData:this.fileUploadData
}

  this.apiService.uploadDisbursalFile(uploadedData) 
    .subscribe(data => {
      if(data.status==200){
        this.set.setOption("Updated Successfully",true)
        // alert("Update Successfully");
        this.getDismissReason("Cross click");
        this.ngOnInit();
        this.fileDynamicList=[];
        }else{
          this.set.setOption("Update Failed",false)
        // alert("Update Failed");
        this.ngOnInit();
        this.fileDynamicList=[];
        }
      console.log("Data::"+JSON.stringify(data));
      console.log("uploadDisbursalFile::"+JSON.stringify(data.result));
        }, error => console.log(error));
    
  }
  saveDisbursal(){
    var utr=(document.getElementById("utr") as HTMLInputElement).value;
    var utrAmount=(document.getElementById("utrAmount") as HTMLInputElement).value;
    var disb_date=(document.getElementById("disb_date") as HTMLInputElement).value;
    var remarks=(document.getElementById("remarks") as HTMLInputElement).value;
    console.log("utr::"+utr+" disb_date::"+disb_date+" remarks::"+remarks);
    const data={
      gemId:this.loanDisbursalNo,
      loanDisbursalNo:this.loanDisbursalNo,
      utrAmount:utrAmount,
      utrNo:utr,
      createdOn:disb_date,
      remarks:remarks,
      userId:this.userId,
    }
    if(utr != '' && utr != '0'){
      this.apiService.saveDisbursalUtrNo(data) 
      .subscribe(data => {
        if(data.status==200){
          this.set.setOption("UTR Number updated successfuly",true)
          // alert("UTR Number Updated Successfully");
          window.location.reload();
        }else{
          this.set.setOption("Failed to Update",false)
          // alert("Failed To Update");
        }
      }, error => console.log(error));
      this.modalService.dismissAll();
    }else{
      this.set.setOption("Please Enter Valid UTR number",false)

      // alert("Please Enter Valid UTR No");
    }
    
  }
  updateDisbursal(content,gemId:number,loanDisbursalNo:number){
    this.tempGemId=gemId;
    this.loanDisbursalNo=loanDisbursalNo;
    this.modalService.open(content, {size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  Repayment(content) {
 this.modalService.open(content,{ size: 'xl' }).result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openDoc(content,loanDisbursalId:number) {
    this.loanid = this.route.snapshot.params['loanid'];
    this.apiService.getDisbursalDocuments(this.loanid,loanDisbursalId) 
    .subscribe(data => {
      this.disbursalDocuments = data.result;
    }, error => console.log(error));
    this.apiService.getLoanEmiSchedule(this.loanid,loanDisbursalId) 
    .subscribe(data => {
      this.LoanEmiSchedule = data.result;
    }, error => console.log(error));
 this.modalService.open(content,{ size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  addRowFile(index) {
    this.filenewDynamic = {
      file:'',comment:'',
    };
    this.fileDynamicList.push(this.filenewDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  
  deleteRowFile(index) {  
  
    if(this.fileDynamicList.length ==1) {  
      this.set.setOption("Can't delete the row when there is only one row",false)

      // alert("Can't delete the row when there is only one row");
       return false;  
    } else {  
        this.fileDynamicList.splice(index, 1);  
         return true;  
    }  
  }

  
  openSchedule(content,loanDisbursalId:number) {
    this.loanid = this.route.snapshot.params['loanid'];
    this.apiService.getLoanEmiSchedule(this.loanid,loanDisbursalId) 
    .subscribe(data => {
      this.LoanEmiSchedule = data.result;
    }, error => console.log(error));
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  updateLanNo(content,gemId:number) {
    this.tempGemId=gemId;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  savelan(){
  var lanNo=(document.getElementById("lanNo") as HTMLInputElement).value;
  var createdOn=(document.getElementById("createdOn") as HTMLInputElement).value;
  var lanRemarks=(document.getElementById("lanRemarks") as HTMLInputElement).value;
  console.log("gemId::"+ this.tempGemId +"  lanNo::"+lanNo+" createdOn::"+createdOn+" lanRemarks::"+lanRemarks);

  const data={
    lanNo:lanNo,
    createdOn:createdOn,
    lanRemarks:lanRemarks,
  }
  if(lanNo != '' && lanNo != '0'){
    /*
    this.apiService.saveDisbursalLanNo(this.tempGemId,data) 
    .subscribe(data => {
      if(data.status==200){
        alert("Lan No Updated Successfully");
        window.location.reload();
      }else{
        alert("Failed To Update");
      }
    }, error => console.log(error));
    this.modalService.dismissAll();
    */
  }else{
    this.set.setOption("Please Enter Valid LAN Number",false)

    // alert("Please Enter Valid lan No");
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
  downloadView(filename:string){
    var url=this.apiService.baseUrl.replace("finAggMobileAPI/api/v1/","uploadFiles/images/")+filename;
    window.open(url, '_blank');
  }
  removeView(id:any){
    // alert("2");
    this.docId.documentId=id;
    this.apiService.removeView(this.loanid,this.docId)
    .subscribe(data => {
   }, error => console.log(error));
   this.ngOnInit();
  }
  downloadInvoiceExcel(gemId:string){
    this.apiService.generateInvoiceExcel(gemId).subscribe(res => {
      this.invoiceList = res.result;
      let i=1;
      for(let il of this.invoiceList){
        console.log("this.invoiceList"+i+" "+this.invoiceList[i]);
        const data={
          Sno:i,
          Invoice_No:il.Invoice_No,
          Invoice_Amount:il.Invoice_Amount,
          Invoice_Date:il.Invoice_Date,
          Margin:il.Margin,
          ROI:il.ROI,
          Tenure:il.Tenure,
          Disbursal_Bank_Name:il.Disbursal_Bank_Name,
          Account_Number:il.Account_Number,
          IFSC_Code:il.IFSC_Code,
          Favouring:il.Favouring
          }
          this.invoiceDetailsList.push(data);
          i++;
      }
      console.log('data::'+JSON.stringify(this.invoiceDetailsList));

      this.excelService.exportAsExcelFile(this.invoiceDetailsList, gemId+'_Order_Details');
    }, error => console.log(error));
    
  }
  goToList(){
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
  }
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }
}
