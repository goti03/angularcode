import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from "..//..//core/api.service";
import { Currency } from '../../shared/currency.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
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
  HeaderDetails:any;
  name:any;
  day1: Array<any> = [];
  month1: Array<any> = [];
  Year1: Array<any> = [];
  day2: Array<any> = [];
  month2: Array<any> = [];
  Year2: Array<any> = [];
  day3: Array<any> = [];
  month3: Array<any> = [];
  Year3: Array<any> = [];

  constructor(private route: ActivatedRoute,private apiService : ApiService,
     private router: Router, private currency : Currency) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    this.orgId = this.route.snapshot.params['orgId'];
    this.retailerId = this.route.snapshot.params['retailerId'];
    this.apiService.getLoanHeaderDetails(this.loanid)
                .subscribe(data => {
                  this.HeaderDetails=data.result;
              }, error => console.log(error));
    this.apiService.getloanFormDetails(this.loanid,0)
                .subscribe(data => {
                  this.loanDate=data.result.loanDate;
                  this.applicationReferencNo=data.result.applicationReferencNo;
                  this.city=data.result.city;
                  //FINANCE REQUIREMENT
                  this.loanAmount=data.result.loanAmount;
                  this.desiredTenure=data.result.desiredTenure;
                  //COMPANY DETAILS
                  this.entityName=data.result.entityName;
                  this.name=data.result.entityName;
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
                  this.accountNo=data.result.accountNo;
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
  }
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }
}
