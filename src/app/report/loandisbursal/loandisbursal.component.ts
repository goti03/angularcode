import { Component, OnInit,ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import * as moment from 'moment/moment.js';
import { ApiService} from "..//..//core/api.service";
import { Constant,gemConstant,retailerConstant,sellerConstant,nonSoleProp } from '../../core/constant';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Currency} from '../../shared/currency.service'
import { environment } from '../../../environments/environment';
import { ExcelService } from '..//..//shared/excel.service';
import { PdfService } from '..//..//shared/pdf.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-loandisbursal',
  templateUrl: './loandisbursal.component.html',  
  styleUrls: ['./loandisbursal.component.css'],
   encapsulation: ViewEncapsulation.None
})

export class LoanDisbursalComponent implements OnInit {
  url=this.apiService.baseUrl.replace("finAggMobileAPI/api/v1/","uploadFiles/loanAgreement/");
  errorMSG:any;
  showErrorMSG:boolean=false;
  sellerStatusFlow=sellerConstant.sellerStatusFlow;
  statusId:number;
  fileDynamicList = [];
  p1:any;
  page:any;
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
  p:any;
  id:any;
  loanId:any;
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
  programTypeId:any;
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
  type=1;
  amount:any;
  date1:any;
  date2:any;
  date3:any;
  date4:any;
  date5:any;
  date6:any;
  momentVariable:any;
  invoiceDate:boolean;
  closeResult: string;
  HeaderDetails:any;
  statusFlow:any;
  loanDisbursalNo:any;
  updateDisbursalButton:boolean=false;
  repaymentList=[];
  lenderId:any;
  repaymentMSG:any;
  disbursalMSG:any;
  requestList: Observable<ReportModel[]>;

  invoiceList = [];
  invoiceDateList = [];

  tabList = ['Disbursal', 'Repayment', 'AnchorList'];
  tab : any;
 

  status = [{ status: '1', name: 'Active' }, { status: '0', name: 'Inactive' }];
  searchPanNo;
  searchAnchorPanNo;
  anchorData = [];
  companyTypeList = [];
  companyRatingList = [];
  buyerList = [];
  R1Details = [];
  R1Summary = [];
  resultVallue: any;
  showAnger: boolean;
  stausId: any;
  substatusId: any;
  subStatusid: any;
  programId: any;
  // statusFlow: any;
  // mobileNo: any;
  checkListStatus: any;
  customerId: any;
  // lenderId: any;
  errorMSG1: any;
  newPan: any;
  p11: number = 0;
  q1: number = 1;
  p111 : any =1;
  p222 : any =1;
  p333 : any = 1;
  p444 : any =1;
  userId:any;
  statustype:any;
  constructor(
    private route: ActivatedRoute,private router: Router,private apiService : ApiService,private crypto: Crypto,
    private modalService: NgbModal,private changeDetec: ChangeDetectorRef, private set : breadcrumbMessage, private currency : Currency, public excelservice: ExcelService, public pdfservice: PdfService) { 
     }
     preventTyping() {
      return false;
    }
     indianCurrency(number : any) {
      return this.currency.indianCurrency(number);
    }
    
  ngOnInit(): void {
    this.statustype='1';
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.p1=10;
    this.page=0;
    this.tabSwitch(0);
    if(this.userId=='12'){
      this.checkButton=false;
    }else{
      this.checkButton=true;
    }  
    this.submitted = false;
    this.route.queryParams.subscribe(params => { 
      this.id = params['customerId'];
      this.loanId = params['loanId'];
      this.orgId = params['orgId'];
      this.digital = params['digital'];
      this.nonStopFlag = params['nonStopFlag'];
    })
    console.log("data=="+this.id+"loanId=="+this.loanId);
    this.apiService.getLoanHeaderDetails(this.loanId).subscribe(data => {
          this.HeaderDetails=data.result;
          this.programTypeId=data.result[0].programTypeId;
          this.statusFlow= this.HeaderDetails[0].statusflow;
          this.lenderId=this.HeaderDetails[0].lenderId;
          if(this.statusFlow == gemConstant.gemStatusFlow){
            this.invoiceDate=true;
          }else{
            this.invoiceDate=false;
          }
          if(this.lenderId==sellerConstant.finagg_lender_id ){
            this.updateDisbursalButton=true;
          }
    this.apiService.getDisbursalInvoiceDetails(this.id,this.loanId,this.programTypeId,this.statustype) .subscribe(data => {
        this.disbursalInvoiceData = data.result;
        // this.split(this.disbursalInvoiceData, this.invoiceList);
        // this.split(this.disbursalInvoiceData, this.invoiceDateList);
        for(let d of this.disbursalInvoiceData){
          d.invoiceList=d.invoice_no.split(",");
          d.invoiceDateList=d.invoice_date.split(",");
        }
        // console.log("invoiceList::"+JSON.stringify(this.invoiceList));
        // console.log("invoiceDateList::"+JSON.stringify(this.invoiceDateList));
        if(this.disbursalInvoiceData.length==0){
          this.disbursalMSG='Data Not Available';
        }else{
          this.disbursalMSG='';
        }
        console.log("this.disbursalInvoiceData::")+JSON.stringify(this.disbursalInvoiceData);
        }, error => console.log(error));
    this.apiService.getRepaymentInvoiceDetails(this.id,this.loanId,this.programTypeId) .subscribe(data => {
        this.repaymentList = data.result;
        if(this.repaymentList.length==0){
          this.repaymentMSG='Data Not Available';
        }
        console.log("this.disbursalInvoiceData::")+JSON.stringify(this.disbursalInvoiceData);
        }, error => console.log(error));
    }, error => console.log(error));
    
    this.apiService.getDisbursalDetails(this.id,this.loanId).subscribe(data => {
      this.disbursalData = data.result;
    }, error => console.log(error));

    
    this.apiService.getR1DataList(this.orgId,this.type).subscribe(data => {
      if (data.status == 200) {
        this.R1Details = data.result.R1Details;
        this.R1Summary = data.result.R1Summary;
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
    this.apiService.getLoanHeaderDetails(this.loanId)
      .subscribe(data => {
        this.HeaderDetails = data.result;
        this.stausId = this.HeaderDetails[0].stausId;
        this.substatusId = this.HeaderDetails[0].substatusId;
        this.subStatusid = this.HeaderDetails[0].substatusId;
        this.programId = this.HeaderDetails[0].programTypeId;
        this.statusFlow = this.HeaderDetails[0].statusflow;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.checkListStatus = this.HeaderDetails[0].checkListStatus;
        this.customerId = this.HeaderDetails[0].customerId;
        this.lenderId = this.HeaderDetails[0].lenderId;
      });
    this.apiService.getAnchorsOverallData(this.loanId,this.type).subscribe(data => {
      if (data.status == 200) {
        this.anchorData = data.result.anchorData;
        this.companyTypeList = data.result.companyTypeData;
        this.companyRatingList = data.result.ratingData;
        console.log("companyRatingList::" + JSON.stringify(this.companyRatingList));
        console.log("companyTypeList::" + JSON.stringify(this.companyTypeList));

      }
      console.log("getAnchorsOverallData ::" + data);
    });
    this.apiService.getBuyersList(this.orgId,this.type).subscribe(data => {
      if (data.status == 200) {
        this.buyerList = data.result;
        if (this.buyerList.length > 0) {
          this.showAnger = true;
        } else {
          this.showAnger = false;
        }
        this.apiService.getResultValueList(this.loanId,this.type).subscribe(data => {
          if (data.status == 200 && data.result.resultValue) {
            this.resultVallue = data.result.resultValue;
            if (this.resultVallue != null && this.resultVallue != undefined) {
              var temp = this.resultVallue.split(",");
              var checkbox = document.getElementsByName("check");
              // alert("temp.length::"+temp.length);
              for (let i = 0; i < this.buyerList.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  // console.log( "buyerPan:: "+this.buyerList[i].buyerPan + "  temp:: "+ temp[j]);
                  if (this.buyerList[i].buyerPan == temp[j]) {
                    this.buyerList[i].Checkflag = '1';
                    console.log("buyerPan:: " + this.buyerList[i].buyerPan + "  temp:: " + temp[j]);
                    break;
                    // var id="check_"+i;
                    // alert( "buyerPan:: "+this.buyerList[i].buyerPan + "  temp:: "+ temp[j]);
                    // (document.getElementById(id) as HTMLInputElement).checked = true;
                    // break;
                  } else {
                    this.buyerList[i].Checkflag = 0;
                  }
                }
              }
            }
          }
          console.log(" this.buyerList::" + JSON.stringify(this.buyerList));

        }, error => console.log(error));
      }
    }, error => console.log(error));
    this.tab1 = false;
  }

  getDisInvoiceDetails(){
    this.apiService.getDisbursalInvoiceDetails(this.id,this.loanId,this.programTypeId,this.statustype) .subscribe(data => {
      this.disbursalInvoiceData = data.result;
      for(let d of this.disbursalInvoiceData){
        d.invoiceList=d.invoice_no.split(",");
        d.invoiceDateList=d.invoice_date.split(",");
      }
      if(this.disbursalInvoiceData.length==0){
        this.disbursalMSG='Data Not Available';
      }else{
        this.disbursalMSG='';
      }
      console.log("this.disbursalInvoiceData::")+JSON.stringify(this.disbursalInvoiceData);
      }, error => console.log(error));
  }

  disbursalAction(loanRequestId:number,disbursalId:number,subStatus:number){
      window.localStorage.setItem("goback","disbursallist");
    this.router.navigate(['/report/disbursalAction/',loanRequestId,disbursalId,subStatus]);
  }
// private closPopUp(reason: any): string {
//   this.saveFile();
//   if (reason === ModalDismissReasons.ESC) {
//     return 'by pressing ESC';
//   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//     return 'by clicking on a backdrop';
//   } else {
//     return  `with: ${reason}`;
//   }
// }
updateDisbursal(content,loanDisbursalNo:number){
  this.loanDisbursalNo=loanDisbursalNo;
  this.modalService.open(content, {size:'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

split(a, b) {
  for(let c of a){
    var b1 = [];
    if(c.invoice_no.indexOf(',') != -1){
      var d = c.invoice_no.split(',');
      for(let e of d){
        b1.push(e)
      }
    } else {
      b1.push(c.invoice_no);
    }
    b.push(b1);
  }
}
saveFile(){
  var curDate =moment().format('YYYY-MM-DD HH:mm:ss');
  var file=document.getElementsByName("file");
  var comment=document.getElementsByName("comment");
for(let i=0;i<file.length;i++){
  var name=(file[i] as HTMLInputElement).value;
  const alert = "filepath::"+name;
  this.set.setOption(alert,true);
  var remark=(comment[i] as HTMLInputElement).value;
  var temp=name.split("\\");
  const alert1 = "temp::"+temp;
  this.set.setOption(alert1,true);
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
  loanRequestId:this.loanId,
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
        // alert("Update Successfully");
        this.set.setOption("Updated Successfully",true);
        this.getDismissReason("Cross click");
        this.ngOnInit();
        this.fileDynamicList=[];
        }else{
        this.set.setOption("Update failed",false);
        // alert("Update Failed");
        this.ngOnInit();
        this.fileDynamicList=[];
        }
      console.log("Data::"+JSON.stringify(data));
      console.log("uploadDisbursalFile::"+JSON.stringify(data.result));
        }, error => console.log(error));
    
  }
  openApplicationForm(content,loanDisbursalId:number) {
    
    // alert("loanDisbursalId=="+loanDisbursalId);
    this.apiService.getloanFormDetails(this.loanId,loanDisbursalId)
                .subscribe(data => {
                  this.loanDate=data.result.loanDate;
                  this.applicationReferencNo=data.result.applicationReferencNo;
                  this.city=data.result.city;
                  
                  //FINANCE REQUIREMENT
                  this.loanAmount=data.result.loanAmount;
                  this.desiredTenure=data.result.desiredTenure;
                  //COMPANY DETAILS
                  this.entityName=data.result.entityName;
                  this.typeOfIndustry=data.result.typeOfIndustry;
                  if(this.typeOfIndustry=="Manufacturing"){this.Manufacturing=true;}
                  else if(this.typeOfIndustry=="Retaile"){this.Retail=true;}
                  else if(this.typeOfIndustry=="Wholesale"){this.Wholesale=true;}
                  else if(this.typeOfIndustry=="FoodServices"){this.FoodServices=true;}
                  else {this.OtherServices=true;}
                  this.yearInBusiness=data.result.yearInBusiness;
                  this.incorpDate=data.result.incorpDate;
                  this.panNo=data.result.panNo;
                  this.noOfPartners=data.result.noOfPartners;
                  this.officceAddress1=data.result.officceAddress1;
                  this.officceAddress2=data.result.officceAddress2;
                  this.officeState=data.result.officeState;
                  this.officeCity=data.result.officeCity;
                  this.officePincode=data.result.officePincode;
                  this.officeLandmark=data.result.officeLandmark;
                  this.officeMailId=data.result.officeMailId;
                  //PERSONAL DETAILS
                  this.applicant=data.result.applicant;
                  // alert("this.applicant=="+JSON.stringify(this.applicant) );
                  for(let a of this.applicant){
                    if(a.gender=="Transgender"){this.Transgender=true;}
                    else if(a.gender=="FEMALE"){this.female=true;}
                    else{this.male=true;}
                    if(a.maritalStatus=="Others"){this.Others=true;}
                    else if(a.maritalStatus=="Married"){this.Married=true;}
                    else{this.Single=true;}
                  }
                  //GOODS AND SERVICES TAX
                  this.GSTno=data.result.GSTno;
                  if(this.GSTno!= null && this.GSTno!= " "){
                    this.gstcheckbox1=true;
                  }else{this.gstcheckbox2=true;}
                  this.accountNo=data.accountNo;
                  this.branchAddress=data.result.branchAddress;
                  this.accountType=data.result.accountType;
                  if(this.accountType=="Current"){this.Current=true;}
                  else if(this.accountType=="OD"){this.OD=true;}
                  else if(this.accountType=="CC"){this.CC=true;}
                  else if(this.accountType=="Savings"){this.Savings=true;}
                  this.branchName=data.result.branchName;
                  this.lenderSite=data.result.lenderSite;
                  this.filePath=data.result.filePath;
                  this.signature=data.result.signature;

                    this.fees=data.result.fees;
                    this.placeOfBirth=data.result.placeOfBirth;
                    this.countryOfResidenceAsPerTaxLaw=data.result.countryOfResidenceAsPerTaxLaw;
                    this.bankName=data.result.bankName;
                    this.customerName=data.result.customerName;
                    this.lenderName=data.result.lenderName;
                    this.lenderEmail=data.result.lenderEmail;
                    this.countryOfBirth=data.result.countryOfBirth;
                    this.district=data.result.district;
                    this.entityType=data.result.entityType;
                  
            
            if(this.entityType=='Private Ltd'){
              this.PrivateLimited=true;
            }else if(this.entityType=='Partnership'){
              this.Partnership=true;
            }else if(this.entityType=='HUF'){
              this.HUF=true;
            }else{
              this.Proprietorship=true;
            }
           
    }, error => console.log(error));
 this.modalService.open(content,{ size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
  }
  openCheckBox(content,loanDisbursalId:number) {
    // alert(loanDisbursalId);
    
    this.apiService.getDisbursalCheckList(this.loanId,loanDisbursalId,this.digital)
    .subscribe(data => {
      this.loanCheckListDetails=data.result;
       }, error => console.log(error));   
 this.modalService.open(content,{ size: 'xl' }).result.then((result) => {

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
    
    this.apiService.getDisbursalDocuments(this.loanId,loanDisbursalId) 
    .subscribe(data => {
      this.disbursalDocuments = data.result;
    }, error => console.log(error));
    this.apiService.getLoanEmiSchedule(this.loanId,loanDisbursalId) 
    .subscribe(data => {
      this.LoanEmiSchedule = data.result;
    }, error => console.log(error));
 this.modalService.open(content,{ size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  saveDisbursal(){
    this.showErrorMSG=true;
    var utr=(document.getElementById("utr") as HTMLInputElement).value;
    var disb_date=(document.getElementById("disb_date") as HTMLInputElement).value;
    var remarks=(document.getElementById("remarks") as HTMLInputElement).value;
    console.log("utr::"+utr+" disb_date::"+disb_date+" remarks::"+remarks);
    const data={
      loanDisbursalNo:this.loanDisbursalNo,
      utrNo:utr,
      createdOn:disb_date,
      remarks:remarks,
      userId:this.userId,
    }
    if(utr=='' || utr == '0' || utr == null){
      this.errorMSG="Please Enter Valid Transaction Refference No";
    }else if(disb_date == '' || disb_date == '0' || disb_date == null){
      this.errorMSG="Please Enter Transaction Date";
    }else if(remarks == '' || remarks == null){
      this.errorMSG="Please Enter Remarks";
    }else{
      this.showErrorMSG=false;
      this.apiService.saveDisbursalUtrNo(data) 
      .subscribe(data => {
        if(data.status==200){
          this.set.setOption("UTR Number Updated Successfully",true);
          // alert("UTR Number Updated Successfully");
          this.modalService.dismissAll();
        }else{
          this.set.setOption("Failed to Update",false);
          // alert("Failed To Update");
        }
      }, error => console.log(error));
      
    }
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
      this.set.setOption("Can't delete the row when there is only one row",false);
      // alert("Can't delete the row when there is only one row");
       return false;  
    } else {  
        this.fileDynamicList.splice(index, 1);  
         return true;  
    }  
  }
  actionPopUp(content,loanDisbursalId:number,statusId:number) {
  this.loanDisbursalId=loanDisbursalId;
  this.statusId=statusId;
 this.modalService.open(content,{ size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  openSchedule(content,loanDisbursalId:number) {
    
    this.apiService.getLoanEmiSchedule(this.loanId,loanDisbursalId) 
    .subscribe(data => {
      this.LoanEmiSchedule = data.result;
    }, error => console.log(error));
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
  downloadView(filePath,filename:string){
    // var url=filePath+filename;
    // window.open(url, '_blank');
    if(filePath.indexOf("s3.ap-south-1")!=-1){
      var url1=filePath;
      window.open(url1, '_blank');
    }else{
      var url2=filePath+filename;
      window.open(url2, '_blank');
    }
  }
  removeView(id:any){
    // alert("2");
    this.docId.documentId=id;
    this.apiService.removeView(this.loanId,this.docId)
    .subscribe(data => {
   }, error => console.log(error));
   this.ngOnInit();
  }
  nonStopFlag : any;
  goToList(){
    if(this.nonStopFlag == 0){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanId,'nonStopFlag':'0' }} );
    }else{
        this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanId,'nonStopFlag':'1' }} );
    }
  }


  tabSwitch(a){
    var count = 0;
    for(let b of this.tabList){
      if(this.tab == b){
        document.getElementById('tab_'+count).classList.remove('active');
      }
      count++;
    }
    this.tab = this.tabList[a];
    document.getElementById('tab_'+a).classList.add('active');
  }

  updateFundingLimit() {
    var arrayList = [];
    let count = true;
    let update = false;
    for (let a of this.anchorData) {
      if (a.validation == 1) {
        if(a.startDate == ''){
          a.startDate=null;
        }
        update = true;
        // if (a.ratingCompanyTypeId == 0) {
        //   count = false;
        // } else if (a.ratingId == 0) {
        //   count = false;
        // } else {
          arrayList.push(a);
        // }
      }
    }
    if (update) {
      // if (count) {
        const data = {
          userId: this.userId,
          anchorData: arrayList,
        }
        this.apiService.updateAnchorDetails(data).subscribe(data => {
          if (data.status == 200) {
            this.set.setOption(data.exceptionMessage, true);
            this.ngOnInit();
          } else {
            this.set.setOption(data.exceptionMessage, false);
            this.ngOnInit();
          }

        }, error => console.log(error));
      // } else {
      //   this.set.setOption("Please enter valid details", false);
      // }
    } else {
      this.set.setOption("Please enter valid details", false);
    }


  }
  saveBuyer() {
    var checkbox = document.getElementsByName("check");
    var temArray = [];
    // for(let i=0;i<checkbox.length;i++){
    //   var id="check_"+i;
    //   if((checkbox[i] as HTMLInputElement).checked ){
    //     console.log("this.buyerList "+i+" ::"+this.buyerList[i]);
    //     temArray.push(this.buyerList[i].buyerPan);
    //   }
    // }
    // var panNumbers = temArray.join(", "); 
    const formData = new FormData();
    formData.append('panNumbers', this.resultVallue);
    formData.append('loanId', this.loanId);
    this.apiService.saveResultValue(formData).subscribe(data => {

      if (data.status == 200) {
        // alert("Result Value Updated Successfully");
      } else {
        this.set.setOption("Update failed", false);

        // alert("Update Failed");
      }
    }, error => console.log(error));
  }
  getCheckedPanNo(b:any,content) {
    if(b.Checkflag == 1 || b.Checkflag == true){
      for(let a of this.anchorData){
        if(b.buyerPan == a.panNo){
          b.Checkflag = 1;
          this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
          return;
        }
      }
      b.Checkflag = 0;
    }else {
      b.Checkflag=1;
    }
    var checkbox = document.getElementsByName("check");
    var temArray = [];
    for (let a of this.buyerList) {
      if (a.Checkflag == 1) {
        temArray.push(a.buyerPan);
      }
    }
    this.resultVallue = temArray.join(",");
  }
  validateNewPan(panNo) {
    var count = 0;
    if (this.resultVallue == undefined || this.resultVallue == null || this.resultVallue == '') {
      return false;
    } else {
      var temp = this.resultVallue.split(",");
      for (let j = 0; j < temp.length; j++) {
        if (temp[j] == panNo) {
          return true;
          break;
        } else {
          return false;
        }
      }
    }

  }
  showPageIndex(pageIndex,pagesize){
    this.page = pageIndex;
    console.log(this.page);
    if(this.page!=1){
    this.page = (this.page-1)*pagesize;
  }
  else
  {
    this.page=0;
  }
  }
 
  addPan() {

    // alert(this.newPan)
    const data = {
      // orgId:this.orgId,
      loanId: this.loanId,
      panCard: this.newPan,
      // invoiceAmount:this.newInvoice
    };
    this.errorMSG1 = "";
    //validation
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (this.newPan == null || this.newPan == undefined) {
      this.errorMSG1 = "PAN Number is Required";
      this.set.setOption(this.errorMSG1, false);
    } else if (!regex.test(this.newPan.toUpperCase())) {
      this.errorMSG1 = "Invalid PAN Number";
      this.set.setOption(this.errorMSG1, false);
    } else if (this.validateNewPan(this.newPan)) {
      this.errorMSG1 = "PAN Number already Exists";
      this.set.setOption(this.errorMSG1, false);
    } else {
      //insert
      this.apiService.saveAnchorDetails(data).subscribe(data => {
        if (data.status == 200) {
          this.newPan = ''
        } else {
          // this.set.setOption("Failed To Upload New Anchor",false);
          this.errorMSG1 = "Can't Find the Shortlisted Anchors,Please Run the GSTN Rule ";
          this.set.setOption(this.errorMSG1, false);

        }
      }, error => console.log(error));



      //render
      this.apiService.getBuyersList(this.orgId,this.type).subscribe(data => {
        if (data.status == 200) {
          this.buyerList = data.result;
          this.apiService.getResultValueList(this.loanId,this.type).subscribe(data => {
            if (data.status == 200 && data.result.resultValue) {
              this.resultVallue = data.result.resultValue;
              var temp = this.resultVallue.split(",");
              for (let i = 0; i < this.buyerList.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  if (this.buyerList[i].buyerPan == temp[j]) {
                    this.buyerList[i].Checkflag = '1';
                    console.log("buyerPan:: " + this.buyerList[i].buyerPan + "  temp:: " + temp[j]);
                    break;
                  } else {
                    this.buyerList[i].Checkflag = 0;
                  }
                }
              }
            }
            console.log(" this.buyerList::" + JSON.stringify(this.buyerList));
          }, error => console.log(error));
        }
      }, error => console.log(error));
    }
  }
  generateAnchorProfile() {
    this.apiService.generateAnchorProfile(this.loanId, this.userId,this.type)
      .subscribe(data => {
        if (data.status == 200) {
          if (data.exceptionOccured == 'Y') {
            this.set.setOption(data.exceptionMessage, false);
            this.ngOnInit();
          } else {
            this.set.setOption("Anchor Profile Generated Successfully", true);
            this.ngOnInit();
          }
          
          // alert("Anchor Profile Generated Successfully");
          // window.location.reload();
        } else {
          this.set.setOption(data.exceptionMessage, false);
          this.ngOnInit();
          // alert("Update Failed");
        }
      }, error => console.log(error));
  }
  checkChanges(f: any) {
    // if (f.ratingId == 0 && f.ratingCompanyTypeId == 0) {
    //   f.validation = 0;
    // } else {
      f.validation = 1;
    // }
  }
  setFundingPercentage(index: any, f: any) {
    // if(f.panNo.substring(3,4) != 'C' || f.panNo.substring(3,4) != 'L'){
    //   f.fundingPercentage = 'NIL';
    //   return;
    // }
    f.fundingPercentage=(f.fundingPercentage==null||f.fundingPercentage=='')?'NIL':f.fundingPercentage;
    this.checkChanges(f);
    for (let r of this.companyRatingList) {
      if (f.ratingId != 0 && r.raingId == f.ratingId) {
        f.fundingPercentage = r.fundingPercentage;
        f.validation = 1;
      }
    }
  }

  top(b){
    this.p = 1;
    this.apiService.getBuyersList(this.orgId,this.type).subscribe(data1 => {
      if (data1.status == 200) {
        this.buyerList = data1.result;
        this.apiService.getResultValueList(this.loanId,this.type).subscribe(data => {
          if (data.status == 200 && data.result.resultValue) {
            this.resultVallue = data.result.resultValue;
            var temp = this.resultVallue.split(",");
            for (let i = 0; i < this.buyerList.length; i++) {
              for (let j = 0; j < temp.length; j++) {
                if (this.buyerList[i].buyerPan == temp[j]) {
                  this.buyerList[i].Checkflag = '1';
                  console.log("buyerPan:: " + this.buyerList[i].buyerPan + "  temp:: " + temp[j]);
                  break;
                } else {
                  this.buyerList[i].Checkflag = 0;
                }
              }
            }

            // sorting
            if(b == 0){
              b = this.buyerList.length;
            }
            var list = this.buyerList;
            this.buyerList = [];
            list.sort(function(c,d){return Number(d.invoiceValue)-Number(c.invoiceValue)});
            if(b == 5){
            var list1 = list.filter((a) => a.buyerPan.substring(3,4) != 'P');
            list = list1;
            }
            if(list.length != 0 ){
              for(var a = 0; a < b && a < list.length ;a++){
                  this.buyerList.push(list[a]);
              }
            }else {
              this.set.setOption("No Data Available", false);
            }


          }else if(!data.result.resultValue){
            this.set.setOption("Data is not available", false);
          }
          console.log(" this.buyerList::" + JSON.stringify(this.buyerList));
        }, error => console.log(error));
      }else{
        this.set.setOption(data1.exceptionMessage, false);
      }
    }, error => console.log(error));
    
  }

  excel() {
    var list = [];
    var j = 1;
    for (let i of this.anchorData) {
      const listObj = {
        'Sno': (j++),
        'Pan No': i.panNo,
        'Anchor Name': i.buyerName,
        'Company Type': i.companyTypeName,
        'Company Rating': i.rateName,
        'Funding %age': i.fundingPercentage,
        'Escrow A/c No': i.vaNumber,
        'Limit Usage': '',
        'Amount': '',
        'Tenure': '',
        'ROI': '',
        'Since': i.startDate,
        'No of Invoices': i.totalInvoices,
        'Invoice Amount': i.invoiceValue,
        'Gst Register Date': i.gstRegisterDate,
        'Status': (i.isAnchorActive == 1) ? ' Active' : 'Inactive',
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, 'AnchorFundingList');
  }
  pdf() {
    var j = 1;
    var title = "dashboard_invoiceList";
    var body = [
      [
        'Sno', 'Pan No', 'Anchor Name', 'Company Type',
        'Company Rating', 'Funding %age', 'Escrow A/c No', 'Limit Usage',
        'Amount', 'Tenure', 'ROI', 'Since', 'No of Invoices', 'Invoice Amount', 'Gst Register Date',
        'Status',],
      ...this.anchorData.map(i => ([j++, i.panNo, i.buyerName, i.companyTypeName, i.rateName, i.fundingPercentage, i.vaNumber, '', '', '', '',
      i.startDate, i.totalInvoices, i.invoiceValue, i.gstRegisterDate, (i.isAnchorActive == 1) ? ' Active' : 'Inactive',]))
    ]
    this.pdfservice.pdf(body, title, 'A3');
  }

  DownloadR1Summary() {

    var list = [];
    var j = 1;
    for (let d of this.R1Summary) {

      const listObj = {
        'Sno': (j++),
        'panNo': d.panNo,
        'invoiceValue': this.indianCurrency(d.invoiceValue),
        'NoofInvoices': d.NoOfInvoice,
        'start_date': d.StartDate,
        'gstRegisterDate': d.GstregisterDate

      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, this.orgId + '_R1_Summary');
  }
  DownloadR1Data() {

    var list = [];
    var j = 1;
    for (let d of this.R1Details) {
      const listObj = {
        'Sno': (j++),
        'buyer_gst': d.buyerGst,
        'MONTH': d.month,
        'YEAR': d.year,
        'invoiceValue': this.indianCurrency(d.invoiceValue),
        'NoofInvoices': d.NoOfInvoice,
      }
      // const listObj = {
      //   'Sno': (j++),
      //   'panNo':d.panNo,
      //   'invoiceValue':invoiceValue,
      //   'NoofInvoices':NoOfInvoice,
      //   'start_date':StartDate,
      //   'gstRegisterDate':GstregisterDate

      // }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, this.orgId + '_R1_data');

  }

  tab1 : boolean = false;
toggle(){
  this.tab1 = !this.tab1;
}

}
