import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "..//..//core/api.service";
import { NgbDateStruct, NgbDate, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment.js';
import { gemConstant, retailerConstant, sellerConstant, nonSoleProp, ugroConstant, dealerConstant, UGROLendor } from '../../core/constant';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { environment,lender } from '..//../../environments/environment';
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-nach-form',
  templateUrl: './loan-application-form.component.html',
  styleUrls: ['./loan-application-form.component.css']
})
export class LoanApplicationFormComponent implements OnInit {
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  model3: NgbDateStruct;
  todayDate: any;
  // formModel: applicationFormModel = new applicationFormModel();
  loanid: any;
  ownershipProof:any
  submitted: any;
  fieldTextType = false;
  noOfPartner: any;
  newDynamic: any = {};
  applicantDynamic: Array<any> = [];
  entityType = [
    { name: 'Partnership' },
    { name: 'Proprietorship' },
    { name: 'PrivateLimited' },
    { name: 'HUF' },
    { name: 'LLP' },
  ];
  userId:any;
  companyDetails = {
    indstryType: '',
    yearsOfBusiness: '',
    incorporationDate: '',
    officeState: '',
    officeCity: '',
    officePincode: '',
    officeLandmark: '',
    mobileNo: '',
    emailId: ''
  }
  addressPropertyList = [];
  residentialList = [];
  religionList = [];
  PreferenceCategory = [];
  loanToList = [];
  statusList = [];
  education = [];
  salutation = [];

  IndustryType = [{ name: 'Manufacturing' }, { name: 'RETAILER' }, { name: 'Wholesale' },
  { name: 'Food Services' }, { name: 'Other Services' }];
  DocumentType = [{ name: 'Pan Card' }];
  AccontType = [{ name: 'Savings' }, { name: 'Current' }, { name: 'OD' }, { name: 'CC' }];
  ModeOfPayment = [{ name: 'PDC' }, { name: 'ECS' }, { name: 'NACH' }];
  MaritalList = [{ name: 'Single' }, { name: 'Married' }, { name: 'Others' }];
  GenderList = [{ name: 'Male' }, { name: 'Female' }, { name: 'Transgender' }];
  BankDetails: Array<any> = [];
  FormDetails: Array<any> = [];
  deleteList: Array<any> = [];
  imageFile = [];
  panFile = [];
  applicantDetails: Array<any> = [];
  applicantList: Array<any> = [];
  addressList: Array<any> = [];
  finalArray: Array<any> = [];
  businessTypeList: Array<any> = [];
  cityList: Array<any> = [];
  branchList: Array<any> = [];
  names:any;
  orgId: any;
  statusFlow: any;
  mobileNo: any;
  // appForm: FormGroup;
  HeaderDetails: any;
  flag: any;
  stausId: any;
  substatusId: any;
  programId: any;
  natureofBusiness: any;
  draftApplication: any;
  accountTypeList: [];
  bankNameList: [];
  stateList: [];
  gstList = [];
  gstUpdateList: [];
  fixedDate: any;
  gstUpdateObj = {
    orgGstId: '',
    gst3b_return_period: '',
    gst3b_filling_date: '',
    gstr1_return_period: '',
    gstr1_filling_date: '',
  }
  sv: boolean = false;
  min = [];
  min1 = [];
  min2 = [];
  min3 = [];
  words=[];
  maxDate: Date;
  maxDate1: Date;
  systemVerifyFailed = [];
  ugroaslender: boolean;
  monthDiff:number;
  loanTo=[{name:'Yes'},{name:'No'}];
  status=[{status:'Y',name:'Active'},{status:'N',name:'Inactive'}];
  minAge:any;
  lenderId:any;
  ugroLender:any;
  janaLender:any;
  idfcLender:any;
  default : any = '';
  
  allbranchList: any;
  branchnameCtrl: FormControl;
  filteredbranch: Observable<any[]>;
  programTypeId:any;
  anchorRecommendation:any;
  customerId:any;
  SummaryDetails=[];
  showAnchorRecom:any;
  timer:any;
  constructor(private route: ActivatedRoute, private apiService: ApiService,private dialog: MatDialog,private crypto: Crypto,
    private router: Router, private changeDetec: ChangeDetectorRef, private set: breadcrumbMessage, private currency : Currency) { 
      this.branchnameCtrl = new FormControl();
      this.apiService.getBranchList().subscribe(data => {
        if (data.status == 200) {

          this.allbranchList = data.result;
          console.log(" this.allbranchList "+ this.allbranchList );
          console.log(data.result);
          for (let c of this.allbranchList) {
            c.branchInfo = c.name;
          }
          this.filteredbranch = this.branchnameCtrl.valueChanges
            .pipe(startWith(''),
              map(list1 => list1 ? this.branchlist(list1) : this.allbranchList.slice())
            );
        }
      }, error => console.log(error));
      
    }
    branchlist(name: string) {
      return this.allbranchList.filter(list =>
        list.branchInfo.toLowerCase().includes(name.toLowerCase()));
    }
  systemVerifiedCheck(index, e) {
    // this.gstList[index].isActive=e.target.value;
    if (e.target.value === "N") {
      this.systemVerifyFailed[index] = 0;
    }else{
      this.systemVerifyFailed[index] = 1;
    }
  }

  delApplicant(index){
    if(this.applicantList[index].applicantId){
      this.deleteList.push(this.applicantList[index].applicantId);
    }
    this.applicantList.splice(index,1);
  }

  addApplicant() {
    const applicantListObj = {
      fatherName:'',
      drivingLicenseExpirydate:'',
      occupation:'',
      fatherLastName: '',
      previousLoanTaken: 'No',
      perCountry: '',
      passport: '',
      womanBeneficiary : 0,
      voterId : '',
      applicantId : '',
      loanTo: 7,
      others: '',
      perAddress: '',
      applicantLastName: '',
      ownershipPer: '',
      fatherMidName: '',
      applicantMidName: '',
      motherName: '',
      applicantName : '',
      curState : '',
      motherMidName: '',
      PreferenceCategory : '',
      dob:'',
      mailId:'',
      maritalStatus:'0',
      gender:'',
      passportExpiryDate:'',
      minorityCommunity:2,
      perCity:'',
      applicantSequence:'',
      applicantResideSince:this.FormDetails[0].incorporationDate,
      lender:'',
      curAddress:'',
      residentialStatus:'14',
      motherLastName:'',
      curPropertyType:13,
      curCity:'',
      perState:'',
      perDistrict:'',
      curDistrict:'',
      curLandmark:'',
      perCitizen:'',
      panNo:'',
      perPincode:'',
      mobileNo:'',
      aadharNo:'',    
      curPincode:'',
      religion:8,
      perPropertyType:13,
      curCountry:'',
      perLandmark:'',
      drivingLicense:'',
      annualHouseHold:'',
      curCitizen:'',
      previousLoanId:'',
      shareholdingPercentage : '',
      salutation : '',
      education : ''
    };
    this.applicantList.push(applicantListObj)
  }


  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  setCityValue(value) {
    this.apiService.getCityListBystatetid(value).subscribe(data => {
      this.cityList = data.result;

    });
  }
  getStateCityValue(value) {
    this.apiService.getAddressByPincode(value).subscribe(data => {
      if (data.status == 200) {
        this.FormDetails[0].officeCity = data.result[0].cityName;
        this.FormDetails[0].officeState = data.result[0].stateName;
        this.setCityValue(data.result[0].stateName);
      }
    });
  }
  getAddressByPincode(pincode) {
    if (pincode.length == 6) {
      this.apiService.getAddressByPincode(pincode).subscribe(data => {
        if (data.status == 200) {
          this.FormDetails[0].officeCity = data.result[0].cityName;
          this.FormDetails[0].officeState = data.result[0].stateName;
          this.setCityValue(data.result[0].stateName);
        }
      });
    } else {
      this.set.setOption(pincode+" is Invalid Pincode",false);
      this.FormDetails[0].officePincode = '';
    }

  }



  toggleFieldTextType() {
    console.log('Aadhar number invisible');
    this.fieldTextType = !this.fieldTextType;
  }
  preventTyping() {
    return false;
  }
  isNullorUndefinedorEmpty(str) {
      return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
  }
  ngOnInit() {
    this.janaLender=false;
    this.idfcLender=false;
    this.ugroLender=false;
    this.showAnchorRecom=false;
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.minAge=moment().subtract(18, 'year').format('YYYY-MM-DD');
    this.ugroaslender = false;
    this.todayDate = moment().format('YYYY-MM-DD');
    this.maxDate = new Date();
    var m = this.maxDate.getMonth();
    var y = this.maxDate.getFullYear();
    this.maxDate1 = new Date("01/" + m + "/" + y);
    this.applicantDetails.length = 0;
    for (let i = 0; i < this.applicantDetails.length; i++) {
      this.applicantDetails.splice(i, 1);
    }
    this.natureofBusiness = true;
    // this.appForm = this.formBuilder.group({
    //   mobileNumber: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   landmark: ['', Validators.required],
    // });
    
    this.apiService.getStateList().subscribe(data => { this.stateList = data.result });
    this.apiService.getAccountTypeList().subscribe(res => this.accountTypeList = res.result);
    this.apiService.getBankNameList().subscribe(res => this.bankNameList = res.result);
    this.loanid = this.route.snapshot.params['loanid'];
    this.orgId = this.route.snapshot.params['orgId'];
    this.flag = this.route.snapshot.params['flag'];
    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails = data.result;
        this.stausId = this.HeaderDetails[0].stausId;
        this.substatusId = this.HeaderDetails[0].substatusId;
        this.programId = this.HeaderDetails[0].programTypeId;
        this.programTypeId = this.HeaderDetails[0].programTypeId;
        this.statusFlow = this.HeaderDetails[0].statusflow;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.lenderId = this.HeaderDetails[0].lenderId;
        this.apiService.getSummaryDetails(this.customerId, this.loanid, 0).subscribe(data => {
          this.SummaryDetails = data.result;
          for(let s of this.SummaryDetails){
            var entity=s.entity.toLowerCase();
              if (entity.indexOf("bank") != -1) {
                this.showAnchorRecom=true;
            }
          }
        }, error => console.log(error));

        if(this.lenderId==lender.jana){
          this.janaLender=true;
        }else if(this.lenderId==lender.IDFC){
          this.idfcLender=true;
        }else if(this.lenderId==lender.UGRO && this.statusFlow!=sellerConstant.sellerStatusFlow ){
          this.ugroLender=true;
        }
          console.log("substatusId::" + this.substatusId);
      }, error => console.log(error));
    this.apiService.getGSTDetails(this.orgId).subscribe(
      data => {

        this.gstList = data.result;
        for (var a = 0; a < this.gstList.length; a++) {
          var a1 = moment();
          var b1 = moment(this.gstList[a].gst3b_return_period, 'YYYY-MM-DD');
          this.gstList[a].monthDiff=this.monthDifference(b1,a1);
          this.min[a] = this.gstList[a].gst3b_return_period;
          this.gstList[a].gst3b_return_period=moment(this.gstList[a].gst3b_return_period).format("YYYY-MM");
          this.min1[a] = this.gstList[a].gst3b_filing_date;
          this.min2[a] = this.gstList[a].gstr1_return_period;
          this.gstList[a].gstr1_return_period=moment(this.gstList[a].gstr1_return_period).format("YYYY-MM");
          this.min3[a] = this.gstList[a].gstr1_filing_date;
       
        }
        console.log(this.gstList);
      })
    if (this.flag == '1') {
      this.draftApplication = true;
      console.log("flag11==" + this.flag);
    } else if (this.flag == '2') {
      this.draftApplication = false;
      console.log("flag2==" + this.flag);
    } else {
      this.flag = '0';
      this.draftApplication = true;
      console.log("flag00==" + this.flag);
    }
    this.apiService.getSellerFormDetails(this.loanid).subscribe(data => {
      this.FormDetails = data.result.companyList;
      this.BankDetails = data.result.bankList;
      for(var a of this.BankDetails) {
        if(a.enach == 1) {
          a.enach = true;
        } else if (this.isNullorUndefinedorEmpty(a.enach)) {
          a.enach = false;
        } else {
          a.enach = false;
        }
      }
      if(this.BankDetails.length==1 && this.BankDetails[0].enach==false){
        this.BankDetails[0].enach=(this.BankDetails.length==1)?true : false;
      }
       
      this.applicantList = data.result.applicantList;
      this.addressList = data.result.addressList;
      this.FormDetails[0].addressOne = this.addressList[0].city + '~' + this.addressList[0].state + '~' +
      this.addressList[0].pincode + '~' + this.addressList[0].address + '~' + this.addressList[0].addressId;
      this.FormDetails[0].officeState = this.addressList[0].state;
      this.FormDetails[0].orgAddressId = this.addressList[0].addressId;
      this.FormDetails[0].officeCity = this.addressList[0].city;
      this.FormDetails[0].officePincode = this.addressList[0].pincode;
      this.FormDetails[0].officeAddress = this.addressList[0].address;
      if(this.isNullorUndefinedorEmpty(this.FormDetails[0].officeState) || this.isNullorUndefinedorEmpty(this.FormDetails[0].officeCity)){
        this.getAddressByPincode(this.FormDetails[0].officePincode);
      }
      this.anchorRecommendation=this.FormDetails[0].anchorRecommendation;
      this.apiService.getCityListBystatetid(this.FormDetails[0].officeState).subscribe(data => {this.cityList = data.result;});
      // (y != undefined) ? y : x;
      // this.FormDetails[0].ownershipProof = this.isNullorUndefinedorEmpty(this.FormDetails[0].industryType) ? 1 : this.FormDetails[0].ownershipProof;
      this.FormDetails[0].industryType = this.isNullorUndefinedorEmpty(this.FormDetails[0].industryType) ? 'Manufacturing' : this.FormDetails[0].industryType;
      this.FormDetails[0].natureOfBusiness = this.isNullorUndefinedorEmpty(this.FormDetails[0].natureOfBusiness) ? 'OTHER WHOLESALE' : this.FormDetails[0].natureOfBusiness;
      this.FormDetails[0].resideSince = this.isNullorUndefinedorEmpty(this.FormDetails[0].resideSince) ? this.FormDetails[0].incorporationDate : this.FormDetails[0].resideSince;
      this.FormDetails[0].propertytype = this.isNullorUndefinedorEmpty(this.FormDetails[0].propertytype) ? '11' : this.FormDetails[0].propertytype;
      if(this.idfcLender||this.janaLender){
        // this.apiService.getBranchList().subscribe(data => {
          for(let m of this.allbranchList)  {
            if(m.id== this.FormDetails[0].branchId ){
              this.FormDetails[0].branchId=m.name;
            }
          }
        // }, error => console.log(error));
      }
      for (let i = 0; i < this.applicantList.length; i++) {
        var names=this.applicantList[i].applicantName;
        var spaceCount = (names.split(" ").length);
        this.words = this.applicantList[i].applicantName.split(" ",spaceCount);
        if(spaceCount==3){
          this.applicantList[i].applicantName=this.words[0];
          this.applicantList[i].applicantMidName=this.words[1];
          this.applicantList[i].applicantLastName=this.words[2];
        }else if(spaceCount==2){
          this.applicantList[i].applicantName=this.words[0];
          this.applicantList[i].applicantLastName=this.words[1];
        }else {
          this.applicantList[i].applicantName=this.words[0];
        }
        if(this.FormDetails[0].panCard[3] != 'P' && this.applicantList){
          this.applicantList[0].mailId=this.isNullorUndefinedorEmpty(this.applicantList[0].mailId) ? this.FormDetails[0].emailId : this.applicantList[0].mailId;
        }
        this.applicantList[i].previousLoanTaken = this.isNullorUndefinedorEmpty(this.applicantList[i].previousLoanTaken) || this.applicantList[i].previousLoanTaken=='2'   ? 'No' : this.applicantList[i].previousLoanTaken;
        this.applicantList[i].previousLoanTaken = this.applicantList[i].previousLoanTaken=='1'   ? 'Yes' : this.applicantList[i].previousLoanTaken;
        this.applicantList[i].maritalStatus = this.isNullorUndefinedorEmpty(this.applicantList[i].maritalStatus) ? '0': this.applicantList[i].maritalStatus;
        this.applicantList[i].curPropertyType = this.isNullorUndefinedorEmpty(this.applicantList[i].curPropertyType) ? '11' : this.applicantList[i].curPropertyType;
        this.applicantList[i].perPropertyType = this.isNullorUndefinedorEmpty(this.applicantList[i].perPropertyType) ? '11' : this.applicantList[i].perPropertyType;
        this.applicantList[i].applicantResideSince = this.isNullorUndefinedorEmpty(this.applicantList[i].applicantResideSince) ? this.FormDetails[0].resideSince : this.applicantList[i].applicantResideSince;
        this.applicantList[i].residentialStatus = this.isNullorUndefinedorEmpty(this.applicantList[i].residentialStatus)  ? '14' : this.applicantList[i].residentialStatus;
        this.applicantList[i].loanTo = this.isNullorUndefinedorEmpty(this.applicantList[i].loanTo)  ? '7' : this.applicantList[i].loanTo;
        this.applicantList[i].religion = this.isNullorUndefinedorEmpty(this.applicantList[i].religion) ? '8' : this.applicantList[i].religion;
        this.applicantList[i].minorityCommunity = this.isNullorUndefinedorEmpty(this.applicantList[i].minorityCommunity) ? '2' : this.applicantList[i].minorityCommunity;
        if(this.applicantList[i].curpincode !=''){
          if(this.applicantList[i].curDistrict !=''|| this.applicantList[i].curCity !=''||this.applicantList[i].curState !=''){
            this.validatePinCode(i,1,1);   
            }
          }
        if(this.applicantList[i].perpincode !=''){
          if(this.applicantList[i].perDistrict !=''|| this.applicantList[i].perCity !=''||this.applicantList[i].perState !=''){
            this.validatePinCode(i,2,1);   
            }
          }
      }
      console.log("this.FormDetails::" + JSON.stringify(this.FormDetails));
   //   this.getAddressByPincode(this.FormDetails[0].officePincode);
      // if (!this.draftApplication) {


        // this.FormDetails[0].industryType = 'Manufacturing';
        // this.FormDetails[0].natureOfBusiness = 'OTHER WHOLESALE';
        // this.FormDetails[0].propertytype = '11';
        // this.FormDetails[0].resideSince = this.FormDetails[0].incorporationDate;
        // for (let i = 0; i < this.applicantList.length; i++) {
        //   this.applicantList[i].previousLoanTaken = '2';
        //   this.applicantList[i].maritalStatus = 'Married';
        //   this.applicantList[i].curPropertyType = '11';
        //   this.applicantList[i].perPropertyType = '11';
        // }
      // }
      // this.getCityList();
    }, error => console.log(error));

    this.apiService.getCommonList().subscribe(data => {
      console.log("data::::::::"+JSON.stringify(data.result));
      this.addressPropertyList = data.result.propertytypeList;
      this.religionList = data.result.religionList;
      this.loanToList = data.result.loanToList;
      this.statusList = data.result.statusList;
      this.residentialList = data.result.residentialList;
      this.PreferenceCategory = data.result.PreferenceCategoryList;
      this.education = data.result.education;
      this.salutation = data.result.salutation;
      this.ownershipProof = data.result.ownershipProof;
    }, error => console.log(error));

    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails = data.result;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.statusFlow = this.HeaderDetails[0].statusflow;
        this.lenderId = this.HeaderDetails[0].lenderId;
        if (this.statusFlow == UGROLendor.UgroStatueFlow) {
          this.ugroaslender = true;
        }
        if (this.statusFlow == sellerConstant.sellerStatusFlow || this.statusFlow == 5 || this.statusFlow == UGROLendor.UgroStatueFlow || this.statusFlow == ugroConstant.UGRO_StatusFlow) {
          this.natureofBusiness = false;
        }
      }, error => console.log(error));

    this.apiService.getBusinessTypeList().subscribe(data => {
      this.businessTypeList = data.result;
    }, error => console.log(error));

  }
  getlength(number) {
    return number.toString().length;
  }
  validatePinCode(index, type,datas) {
    if (type == 1) {
      var length = this.getlength(this.applicantList[index].curPincode);
      if (length == 6) {
        this.apiService.getAddressByPincode(this.applicantList[index].curPincode).subscribe(data => {
          if (data.result.length > 0) {
            if (data.status == 200) {
              if(datas == 1){
              this.applicantList[index].curDistrict =this.isNullorUndefinedorEmpty(this.applicantList[index].curDistrict)?this.applicantList[index].curDistrict = data.result[0].districtName:this.applicantList[index].curDistrict;
              this.applicantList[index].curCity =this.isNullorUndefinedorEmpty(this.applicantList[index].curCity)?this.applicantList[index].curCity = data.result[0].cityName:this.applicantList[index].curCity;
              this.applicantList[index].curState =this.isNullorUndefinedorEmpty(this.applicantList[index].curState)?this.applicantList[index].curState = data.result[0].stateName:this.applicantList[index].curState;
            }else{
              this.applicantList[index].curDistrict = data.result[0].districtName;
              this.applicantList[index].curCity = data.result[0].cityName;
              this.applicantList[index].curState = data.result[0].stateName;
            }
          } else {
              this.applicantList[index].curPincode = '';
              this.set.setOption(this.applicantList[index].curPincode+" is Invalid PIN Code", false);
            }
          } else {
            this.applicantList[index].curPincode = '';
            this.set.setOption(this.applicantList[index].curPincode+" is Invalid PIN Code", false);
          }
        }, error => console.log(error));
      } else {
        this.applicantList[index].curPincode = '';
        this.set.setOption("Please enter valid PIN Code", false);
      }
    } else {
      var length = this.getlength(this.applicantList[index].perPincode);
      if (length == 6) {
        this.apiService.getAddressByPincode(this.applicantList[index].perPincode).subscribe(data => {
          if (data.result.length > 0) {
            if (data.status == 200) {
              if(datas == 1){
                this.applicantList[index].perDistrict =this.isNullorUndefinedorEmpty(this.applicantList[index].perDistrict)?this.applicantList[index].perDistrict = data.result[0].districtName:this.applicantList[index].perDistrict;
                this.applicantList[index].perCity =this.isNullorUndefinedorEmpty(this.applicantList[index].perCity)?this.applicantList[index].perCity = data.result[0].cityName:this.applicantList[index].perCity;
                this.applicantList[index].perState =this.isNullorUndefinedorEmpty(this.applicantList[index].perState)?this.applicantList[index].perState = data.result[0].stateName:this.applicantList[index].perState;
              }else{
                this.applicantList[index].perDistrict = data.result[0].districtName;
                this.applicantList[index].perCity = data.result[0].cityName;
                this.applicantList[index].perState = data.result[0].stateName;
              }
            } else {
              this.applicantList[index].perPincode = '';
              this.set.setOption(this.applicantList[index].perPincode+" is Invalid PIN Code", false);
            }
          } else {
            this.applicantList[index].perPincode = '';
            this.set.setOption(this.applicantList[index].perPincode+" is Invalid PIN Code", false);
          }
        }, error => console.log(error));
      } else {
        this.applicantList[index].perPincode = '';
        this.set.setOption("Please enter valid PIN Code", false);
      }
    }
  }
  // get f() { return this.appForm.controls; }

  getaddress(val: any, i: any) {
    var temp = val.split("~");
    var city = temp[0];
    var state = temp[1];
    var pincode = temp[2];
    // alert("pincode::"+pincode);
    var address = temp[3];
    var addressId = temp[4];
    // var stateId=temp[5];
    this.FormDetails[0].addressOne = address;
    this.FormDetails[0].officeState = state;
    this.FormDetails[0].orgAddressId = addressId;
    this.FormDetails[0].officeCity = city;
    this.FormDetails[0].officePincode = pincode;
    this.getAddressByPincode(pincode);

    // this.FormDetails[0].stateId=stateId;

  }
  getCityList() {
    this.apiService.getCityList().subscribe(data => {
      this.cityList = data.result;
    }, error => console.log(error));
  }
  checkPreviousLoan(index: any) {
    if (this.applicantList[index].previousLoanTaken == 'No') {
      this.applicantList[index].lanNo = '';
    }
  }
  checkWomanBeneficiary(index: any) {
    var checkBox = document.getElementsByName("womanBeneficiary");
    if ((checkBox[index] as HTMLInputElement).checked) {
      this.applicantList[index].womanBeneficiary = 1;
    } else {
      this.applicantList[index].womanBeneficiary = 0;
    }
  }
  uploadImage(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file[0])
    var t = this;
    reader.onload = function () {
      t.imageFile.push(reader.result)
    }
  }
  uploadpan(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file[0])
    var t = this;
    reader.onload = function () {
      t.panFile.push(reader.result)
    }
  }
  gotoList() {
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
  }

  checkAddress(index: any) {
    // var id="active_"+index;
    var checkBox = document.getElementsByName("active");
    // al((checkBox[index] as HTMLInputElement).checked);
    if ((checkBox[index] as HTMLInputElement).checked) {
      this.applicantList[index].perCity = this.applicantList[index].curCity;
      this.applicantList[index].perState = this.applicantList[index].curState;
      this.applicantList[index].perLandmark = this.applicantList[index].curLandmark;
      this.applicantList[index].perDistrict = this.applicantList[index].curDistrict;
      this.applicantList[index].perPincode = this.applicantList[index].curPincode;
      this.applicantList[index].perCitizen = this.applicantList[index].curCitizen;
      this.applicantList[index].perAddress = this.applicantList[index].curAddress;
      this.applicantList[index].perCountry = this.applicantList[index].curAddress;
    } else {
      this.applicantList[index].perCity = "";
      this.applicantList[index].perState = "";
      this.applicantList[index].perLandmark = "";
      this.applicantList[index].perDistrict = "";
      this.applicantList[index].perPincode = "";
      this.applicantList[index].perAddress = "";
      // this.applicantList[index].perCitizen="";
      // this.applicantList[index].perCountry="";
      // this.applicantList[index].perCity=this.applicantList[index].perCity;
      // this.applicantList[index].perState=this.applicantList[index].perState;
      // this.applicantList[index].perLandmark=this.applicantList[index].perLandmark;
      // this.applicantList[index].perDistrict=this.applicantList[index].perDistrict;
      // this.applicantList[index].perPincode=this.applicantList[index].perPincode;
      // this.applicantList[index].perAddress=this.applicantList[index].perAddress;
      // this.applicantList[index].perCitizen=this.applicantList[index].perCitizen;
      // this.applicantList[index].perCountry=this.applicantList[index].perCountry;
    }
  }

  panMatch = new RegExp("^[A-Z]{5}[0-9]{4}[A-Z]{1}");

  panCheck() {
    var count = 0;
    for(var a=0; a<this.applicantList.length;a++){
      console.log("this.applicantList[a].panNo::"+this.applicantList[a].panNo);
      if(!this.panMatch.test(this.applicantList[a].panNo)){
        count++;
        this.set.setOption(this.applicantList[a].panNo+" is Invalid PAN Number",false);
        break;
      }
    }
    if(count==0){
      return false;
    }else{
      return true;
    }
  }

  uniqueId(){
    var count = 0;
    for(var a = 0; a < this.applicantList.length; a++){
      for(var b = 0; b < this.applicantList.length; b++){
        if(this.ugroLender==false  && (this.applicantList[a].aadharNo == this.applicantList[b].aadharNo) && (a != b)){
          count = count + 1;
          this.set.setOption('Aadhaar Number should be unique for each applicant',false);
          break;
        }else if((this.applicantList[a].panNo == this.applicantList[b].panNo )  && (a != b)){
          count = count + 1;
          this.set.setOption('Pan Number should be unique for each applicant',false);
          break;
        }else if((this.applicantList[a].mobileNo == this.applicantList[b].mobileNo)  && (a != b)){
          count = count + 1;
          this.set.setOption('Mobile Number should be unique for each applicant',false);
          break;
        }
      }
    }
    // for(let c of this.applicantList){
    //   if(c.mobileNo == this.FormDetails[0].mobileNo && this.FormDetails[0].panCard[3] != 'P' ) {
    //     count = count + 1;
    //     this.set.setOption('Applicant Mobile number should not be same as Company Number',false);
    //     break;
    //   }
    // }
    if(count == 0){
      return false;
    }else {
      return true;
    }
  }

  onSubmit() {
    var branchValidation=0;
   if(this.panCheck()){
      
    }
    if(this.uniqueId()){
      return;
    }
    
    if (this.draftApplication && (this.FormDetails[0].industryType == undefined || this.FormDetails[0].industryType == null || this.FormDetails[0].industryType == '')) {
      this.set.setOption("Please enter industry type", false);
      // alert("Please enter industry type");
    } else if (this.FormDetails[0].incorporationDate == undefined || this.FormDetails[0].incorporationDate == null || this.FormDetails[0].incorporationDate == '') {
      this.set.setOption("Please enter Incorporation Date", false);
      // alert("please enter Incorporation Date");
    } else if (this.FormDetails[0].officeState == undefined || this.FormDetails[0].officeState == null || this.FormDetails[0].officeState == '') {
      this.set.setOption("Please enter Office State", false);
      // alert("please enter  Office State");
    } else if (this.FormDetails[0].officeCity == undefined || this.FormDetails[0].officeCity == null || this.FormDetails[0].officeCity == '') {
      // alert("please enter Office City");
      this.set.setOption("Please enter office city", false);
    } else if (this.FormDetails[0].officePincode == undefined || this.FormDetails[0].officePincode == null || this.FormDetails[0].officePincode == '') {
      // alert("please enter Office Pincode");
      this.set.setOption("Please enter office Pincode", false);
      // } else if (this.FormDetails[0].officeLandmark == null || this.FormDetails[0].officeLandmark == '') {
      //   alert("please enter Office Landmark");
    } else if (this.FormDetails[0].emailId == undefined || this.FormDetails[0].emailId == null || this.FormDetails[0].emailId == '') {
      // alert("please enter Email Id");
      this.set.setOption("please enter company Email Id", false);
    } else if (this.draftApplication && (this.FormDetails[0].mobileNo==undefined || this.FormDetails[0].mobileNo == null || this.FormDetails[0].mobileNo == '')) {
      // alert("please enter Mobile No");
      this.set.setOption("please enter Mobile No", false);
    } else if (this.ugroLender==false && this.draftApplication && (this.FormDetails[0].propertytype == undefined || this.FormDetails[0].propertytype == null || this.FormDetails[0].propertytype == '')) {
      // alert("please enter Property Type");
      this.set.setOption("please enter Property Type", false);
    } else if (this.FormDetails[0].resideSince == null || this.FormDetails[0].resideSince == '' || this.FormDetails[0].resideSince == undefined) {
      // alert("please enter Residing Since");
      this.set.setOption("please enter Residing Since", false);
    } else if (this.FormDetails[0].branchId == null || this.FormDetails[0].branchId == '' || this.FormDetails[0].branchId == undefined) {
      // alert("please enter Nearest IDFC Branch");
      this.set.setOption("please enter Nearest IDFC Branch", false);
    } else if (this.statusFlow == sellerConstant.sellerStatusFlow && (this.FormDetails[0].natureOfBusiness == undefined || this.FormDetails[0].natureOfBusiness == null || this.FormDetails[0].natureOfBusiness == '')) {
      // alert("please enter Nature of Business");
      this.set.setOption("please enter Nature of Business", false);
    } else if (this.flag!=2 && this.validateBank()) {
    } else if (this.flag==2 && this.validateGSTNList()) {
      this.set.setOption('Please Enter GST Details', false);
    } else if ((this.programTypeId==6||this.programTypeId==4) && this.showAnchorRecom && (this.FormDetails[0].anchorRecommendation == null || this.FormDetails[0].anchorRecommendation == '' || this.FormDetails[0].anchorRecommendation == undefined)) {
      this.set.setOption('Please Enter Anchor Recommendation', false);
    } 
    else if ((this.idfcLender||this.janaLender) && ( this.isNullorUndefinedorEmpty(this.FormDetails[0].branchId))) {
      this.set.setOption('Please Enter Valide Nearest Branch ', false);
    } 
    else {
      // this.submitted = true;
      this.save();

    }

  }
  caluculateInCorpDate() {
    var a = moment();
    var b = moment(this.FormDetails[0].incorporationDate, 'YYYY-MM-DD');
    var age = moment.duration(a.diff(b));
    var years = age.years();
    var months = age.months();
    this.FormDetails[0].yearsOfBusiness = years + " Year(s)," + months + " Month(s)";
  }
  validateGSTNList() {
    var count = 0;
    if (this.gstList.length > 0) {
      for (let g of this.gstList) {
        if (g.gstNo == null || g.gstNo == undefined || g.gstNo == '' || g.gstNo == 'null') {
          count++;
        } else if (g.gst3b_return_period == null || g.gst3b_return_period == undefined || g.gst3b_return_period == '' || g.gst3b_return_period == 'null') {
          count++;
        } else if (g.gst3b_filing_date == null || g.gst3b_filing_date == undefined || g.gst3b_filing_date == '' || g.gst3b_filing_date == 'null') {
          count++;
        } else if (g.gstr1_return_period == null || g.gstr1_return_period == undefined || g.gstr1_return_period == '' || g.gstr1_return_period == 'null') {
          count++;
        } else if (g.gstr1_filing_date == null || g.gstr1_filing_date == undefined || g.gstr1_filing_date == '' || g.gstr1_filing_date == 'null') {
          count++;
        } else if (g.isActive == null || g.isActive == undefined || g.isActive == '' || g.isActive == 'null') {
          count++;
        }
      }
      if (count == 0) {
        return false
      } else {
        return true;
      }
    } else {
      this.gstList = [];
      return false;
    }
  }


  validateBank() {
    var count = 0;
    var checkboxCount = 0;
    for (let i = 0; i < this.BankDetails.length; i++) {
      if (this.BankDetails[i].bankName == undefined || this.BankDetails[i].bankName == null || this.BankDetails[i].bankName == '') {
        count++;
        this.set.setOption("please enter Bank Name", false);
        // alert("please enter Bank Name");
      } else if (this.ugroLender==false && (this.BankDetails[i].branchName == undefined || this.BankDetails[i].branchName == null || this.BankDetails[i].branchName == '')) {
        count++;
        // alert("please enter Branch Name");
        this.set.setOption("please enter Branch Name", false);
      } else if (this.BankDetails[i].primaryApplicant == undefined || this.BankDetails[i].primaryApplicant == null || this.BankDetails[i].primaryApplicant == '') {
        count++;
        this.set.setOption("please enter Primary Applicant Name", false);
        // alert("please enter Primary Applicant Name");
      } else if (this.BankDetails[i].ifscCode == undefined || this.BankDetails[i].ifscCode == null || this.BankDetails[i].ifscCode == '') {
        // alert("please enter IFSC Code");
        this.set.setOption("please enter IFSC Code", false);
        count++;
      } else if (this.BankDetails[i].accountNo == undefined || this.BankDetails[i].accountNo == null || this.BankDetails[i].accountNo == '') {
        // alert("please enter Account Number");
        this.set.setOption("please enter Account Number", false);
        count++;
        break;
      } else if (this.BankDetails[i].accountType == undefined || this.BankDetails[i].accountType == null || this.BankDetails[i].accountType == '') {
        // alert("please enter Account Type");
        this.set.setOption("please enter Account Type", false);
        count++;
        break;
      }
      if(this.BankDetails[i].enach == true) {
        this.BankDetails[i].enach =1;
        checkboxCount++;
      } else {
        this.BankDetails[i].enach =0;
      }
    }
    
    if (count == 0) {
      if(checkboxCount==0 && this.BankDetails.length>0){
        this.set.setOption("please Choose Bank for E-nach", false);
        return true;
      }else{
        return false;
      }
    } else {
      return true;
    }

  }
  monthDifference(d1, d2) {
    var months;
    months = (d2.years() - d1.years()) * 12;
    months -= d1.months();
    months += d2.months();
    return months <= 0 ? 0 : months;
}
  systemVerifying(event, i) {

    
    
    var a = new Date(); // current date   
    var ad = a.getDate();
    var b = new Date(event.target.value); // past date
    var difference = (a.getFullYear()*12 + a.getMonth()) - (b.getFullYear()*12 + b.getMonth());
    if(ad <= 25)
    {
      if(difference <= 2)
      {
         this.sv = true;
         this.gstList[i].systemVerify = 1;
      }
      else
      {
        this.sv = false;
        this.gstList[i].systemVerify = 0;
      }
    }
    else
    {
      if(difference <= 1)
      {
         this.sv = true;
         this.gstList[i].systemVerify = 1;
      }
      else
      {
        this.sv = false;
        this.gstList[i].systemVerify = 0;
      }
    }
  }

  checkforenach(i) {
    if(this.BankDetails[i].enach == 1) {
      var count = 0;
      for(var a of this.BankDetails)  {
        if(count != i) {
          a.enach = 0;
        }
        count ++;
      }
    }
  }



  save() { 
    var branchValidation=0;
   
    var count = 0;
    this.applicantDetails = [];
    var shp = 0;
    for (let i = 0; i < this.applicantList.length; i++) {
      shp =Number(shp)+ Number(this.applicantList[i].shareholdingPercentage);
      if(this.applicantList[i].applicantSequence==''){
        this.applicantList[i].applicantSequence=(i+1);
      }
      var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
      if (this.applicantList[i].applicantName == null || this.applicantList[i].applicantName == '') {
        this.set.setOption("Please enter Applicant Name", false);
        return;
      }else if (this.applicantList[i].education == null || this.applicantList[i].education == '') {
        this.set.setOption("please choose Educational qualification", false);
        return;
      }else if (this.applicantList[i].salutation == null || this.applicantList[i].salutation == '') {
        this.set.setOption("please choose Salutation (Ms. / Mr.)", false);
        return;
      } else if (this.ugroLender==false && (this.applicantList[i].applicantLastName == null || this.applicantList[i].applicantLastName == '')) {
        this.set.setOption("please enter Applicant Last Name", false);
        return;
      } else if (this.ugroLender==false && (this.applicantList[i].fatherName == null || this.applicantList[i].fatherName == '')) {
        this.set.setOption("please enter Father Name", false);
        return;
      } else if (this.ugroLender==false && (this.applicantList[i].motherName == null || this.applicantList[i].motherName == '')) {
        this.set.setOption("please enter Mother Name", false);
        return;
      } else if (this.applicantList[i].dob == null || this.applicantList[i].dob == '') {
        this.set.setOption("please enter  Date of Birth", false);
        return;
      } else if (this.applicantList[i].gender == null || this.applicantList[i].gender == '') {
        this.set.setOption("please enter Gender Details", false);
        return;
      } else if (this.ugroLender==false && (this.applicantList[i].aadharNo == null || this.applicantList[i].aadharNo == '')) {
        this.set.setOption("please enter Aadhar No", false);
        return;
      } else if (this.draftApplication && (this.applicantList[i].maritalStatus == null || this.applicantList[i].maritalStatus == ''||this.applicantList[i].maritalStatus=='0')) {
        this.set.setOption("please enter Marital Status", false);
        return;
      } else if (this.applicantList[i].mobileNo == null || this.applicantList[i].mobileNo == '') {
        this.set.setOption("please enter Mobile No", false);
        return;
      } else if (this.draftApplication && (this.applicantList[i].mailId == null || this.applicantList[i].mailId == '')) {
        this.set.setOption("please enter Applicant Mail Id", false);
        return;
      } else if (this.applicantList[i].panNo == null || this.applicantList[i].panNo == '') {
        this.set.setOption("please enter Pan No", false);
        return;
      } else if (this.applicantList[i].curCity == null || this.applicantList[i].curCity == '') {
        this.set.setOption("please enter Current City", false);
        return;
      } else if (this.applicantList[i].curState == null || this.applicantList[i].curState == '') {
        this.set.setOption("please enter Current State", false);
        return;
      } else if (this.applicantList[i].curDistrict == null || this.applicantList[i].curDistrict == '') {
        this.set.setOption("please enter Current District", false);
        return;
      } else if (this.applicantList[i].curPincode == null || this.applicantList[i].curPincode == '') {
        this.set.setOption("please select Current Pincode", false);
        return;
      } else if (this.applicantList[i].perState == null || this.applicantList[i].perState == '') {
        this.set.setOption("please select Permanent State", false);
        return;
      } else if (this.applicantList[i].perCity == null || this.applicantList[i].perCity == '') {
        this.set.setOption("please select Permanent City", false);
        return;
      } else if (this.applicantList[i].perDistrict == null || this.applicantList[i].perDistrict == '') {
        this.set.setOption("please enter Permanent District", false);
        return;
      } else if (this.applicantList[i].perPincode == null || this.applicantList[i].perPincode == '') {
        this.set.setOption("please enter Permanent Pincode", false);
        return;
      } else if (this.applicantList[i].perAddress == null || this.applicantList[i].perAddress == '') {
        this.set.setOption("please enter Permanent Address", false);
        return;
      } else if (this.draftApplication && (this.applicantList[i].previousLoanTaken == null || this.applicantList[i].previousLoanTaken == '')) {
        this.set.setOption("please enter Previous Loan Taken", false);
        return;
      } else if (this.ugroLender==false && this.draftApplication && (this.applicantList[i].curPropertyType == 'null' || this.applicantList[i].curPropertyType == ''
        || this.applicantList[i].curPropertyType == '0')) {
        this.set.setOption("please enter Current Address Property Type", false);
        return;
      } else if (this.applicantList[i].applicantResideSince == 'null' || this.applicantList[i].applicantResideSince == '') {
        this.set.setOption("please enter Reside Since", false);
        return;
      } else if (this.draftApplication && (this.applicantList[i].loanTo == null || this.applicantList[i].loanTo == '')) {
        this.set.setOption("please enter Category", false);
        return;
      } else if (this.draftApplication && (this.applicantList[i].religion == null || this.applicantList[i].religion == '')) {
        this.set.setOption("please enter religion", false);
        return;
      } else if (this.draftApplication && (this.applicantList[i].minorityCommunity == null || this.applicantList[i].minorityCommunity == '')) {
        this.set.setOption("please enter minority status", false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].applicantName)) {
        this.set.setOption(" Special Characters Not Allowed in Applicant Name",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].fatherName)) {
        this.set.setOption(" Special Characters Not Allowed in Father Name",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].motherName)) {
        this.set.setOption(" Special Characters Not Allowed in Mother Name",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].aadharNo)) {
        this.set.setOption(" Special Characters Not Allowed in aadharNo",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].curCity)) {
        this.set.setOption(" Special Characters Not Allowed in curCity",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].curState)) {
        this.set.setOption(" Special Characters Not Allowed in curState",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].curLandmark)) {
        this.set.setOption(" Special Characters Not Allowed in curLandmark",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].curDistrict)) {
        this.set.setOption(" Special Characters Not Allowed in curDistrict",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].perCity)) {
        this.set.setOption(" Special Characters Not Allowed in Permanent City",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].perDistrict)) {
        this.set.setOption(" Special Characters Not Allowed in Permanent District",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].perLandmark)) {
        this.set.setOption(" Special Characters Not Allowed in Permanent Landmark",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].lanNo)) {
        this.set.setOption(" Special Characters Not Allowed in lanNo",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].drivingLicense)) {
        this.set.setOption(" Special Characters Not Allowed in drivingLicense",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].passport)) {
        this.set.setOption(" Special Characters Not Allowed in passport",false);
        return;
      } else if (this.set.validateSpecialChar(this.applicantList[i].occupation)) {
        this.set.setOption(" Special Characters Not Allowed in occupation",false);
        return;
      } else {
        for(let m of this.allbranchList)  {
          if(m.name.toLowerCase()==this.branchnameCtrl.value.toLowerCase()){
            this.FormDetails[0].branchId = m.id;
            branchValidation=1;
            break;
          }
        }
        if(branchValidation==0){
          this.set.setOption('Please Enter Valide Nearest Branch ', false);
          return;
        }
        const FileData = {
          applicantSequence: this.applicantList[i].applicantSequence,
          applicantName: this.applicantList[i].applicantName,
          applicantId: this.applicantList[i].applicantId,
          fatherName: this.applicantList[i].fatherName,
          motherName: this.applicantList[i].motherName,
          dob: this.applicantList[i].dob,
          gender: this.applicantList[i].gender,
          aadhaarNo: this.applicantList[i].aadharNo,
          maritalStatus: this.applicantList[i].maritalStatus,
          mobileNo: this.applicantList[i].mobileNo,
          emailId: this.applicantList[i].mailId,
          panCard: this.applicantList[i].panNo,
          curCity: this.applicantList[i].curCity,
          curState: this.applicantList[i].curState,
          curLandMark: this.applicantList[i].curLandmark,
          curDistrict: this.applicantList[i].curDistrict,
          curPinCode: this.applicantList[i].curPincode,
          curAddress: this.applicantList[i].curAddress,
          curCountry: "Indian",
          curCitizen: "India",
          perState: this.applicantList[i].perState,
          perCity: this.applicantList[i].perCity,
          perDistrict: this.applicantList[i].perDistrict,
          perLandMark: this.applicantList[i].perLandmark,
          perPinCode: this.applicantList[i].perPincode,
          perAddress: this.applicantList[i].perAddress,
          previousLoanTaken: this.applicantList[i].previousLoanTaken,
          perCitizen: "Indian",
          perCountry: "India",
          userId: this.userId,
          createdOn: curDate,
          lanNo: this.applicantList[i].lanNo,
          voterId: this.applicantList[i].voterId,
          drivingLicense: this.applicantList[i].drivingLicense,
          drivingLicenseExpirydate: this.applicantList[i].drivingLicenseExpirydate,
          passport: this.applicantList[i].passport,
          passportExpiryDate: this.applicantList[i].passportExpiryDate,
          occupation: this.applicantList[i].occupation,
          curPropertyType: this.applicantList[i].curPropertyType,
          perPropertyType: this.applicantList[i].perPropertyType,
          residentialStatus: this.applicantList[i].residentialStatus,
          loanTo: this.applicantList[i].loanTo,
          religion: this.applicantList[i].religion,
          minorityStatus: this.applicantList[i].minorityCommunity,
          houseHoldIncome: this.applicantList[i].annualHouseHold,
          PreferenceCategory: this.applicantList[i].PreferenceCategory,
          womanBeneficiary: this.applicantList[i].womanBeneficiary,
          applicantResideSince: this.applicantList[i].applicantResideSince,

          applicantMidName: this.applicantList[i].applicantMidName,
          applicantLastName: this.applicantList[i].applicantLastName,
          fatherMidName: this.applicantList[i].fatherMidName,
          fatherLastName: this.applicantList[i].fatherLastName,
          motherMidName: this.applicantList[i].motherMidName,
          motherLastName: this.applicantList[i].motherLastName,
          shareholdingPercentage : this.applicantList[i].shareholdingPercentage,
          salutation : this.applicantList[i].salutation,
          education : this.applicantList[i].education,
        };
        this.applicantDetails.push(FileData);
      }


     
    }

    //  }

    //  if(this.applicantDetails == null || this.applicantDetails == []){
    //   alert("Please Enter Apllicant Details");
    //  }else{
      // alert("shp::"+shp);
      if(shp < 51) {
        this.set.setOption("The cummulative share holding percentage should be greater than 51", false);
         return;
       }
    if (this.flag!=2) {
      this.gstList = undefined;
    }

    const data = {
      indstryType: this.FormDetails[0].industryType,
      incorporationDate: this.FormDetails[0].incorporationDate,
      officeAddress: this.FormDetails[0].officeAddress,
      officeState: this.FormDetails[0].officeState,
      officeCity: this.FormDetails[0].officeCity,
      branchId: this.FormDetails[0].branchId,
      natureOfBusiness: this.FormDetails[0].natureOfBusiness,
      officePincode: this.FormDetails[0].officePincode,
      officeLandmark: this.FormDetails[0].officeLandmark,
      orgAddressId: this.FormDetails[0].orgAddressId,
      emailId: this.FormDetails[0].emailId,
      applicantDetails: this.applicantDetails,
      gstnFilingList: this.gstList,
      bankDetails: this.BankDetails,
      deleteList:this.deleteList,
      orgId: this.orgId,
      statusFlow: this.statusFlow + "",
      resideSince: this.FormDetails[0].resideSince,
      ownershipProof: this.FormDetails[0].ownershipProof,
      propertytype: this.FormDetails[0].propertytype,
      statusFlag: this.flag,
      lenderId : this.lenderId,
      anchorRecommendation: this.FormDetails[0].anchorRecommendation
    }
    // if (count > 0) {
    //   this.set.setOption("Please enter all the mandatory fields", false);
    // } else 
    if(this.validateSystemVerify()){
      this.set.setOption("GSTN Verification failed, please check the 3B return period", false);
      const dialogRef = this.dialog.open(GSTDetailsPopUp, {
        data:{
          result:data,
          gstList:this.gstList,
          loanId:this.loanid,
          orgId:this.orgId
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        // window.location.reload();
        this.ngOnInit();
      });
    }else {
      this.saveApplicatDetails(data);
      if(this.anchorRecommendation!=this.FormDetails[0].anchorRecommendation){
        this.runBrandRule();
        this.timer=setInterval(() => {
            if(this.programTypeId==4){
              this.runBankRule();
            }else{
              clearInterval(this.timer);
            } 
          }, 10000);
        }
    }

    //  }
  }
  saveApplicatDetails(data){
    this.apiService.saveFormDetails(this.loanid, data).subscribe(data => {
      if (data.status == 200) {
        this.submitted = true;
          this.set.setOption("updated Successfully", true);
          this.gotoAction();
        } else {
          this.submitted = false;
          this.applicantDetails = [];
          this.set.setOption("Failed to update", false);
        }
      }, error => console.log(error));
    }
runBankRule(){
  var curDate1 = moment().format('YYYY-MM-DD HH:mm:ss');
  const bankstatementData = {
    userId: this.userId,
    lastActivityTime: curDate1,
    retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
    currentActivityId: "25",
    loanRequestId: this.loanid,
    retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
    mobileNo: this.mobileNo,
    userMedium: "backendApp",
    programTypeId: this.programTypeId,
    lenderId:this.lenderId,
    statusFlag:"1"
  }
  this.apiService.getProcessOverAllBankStatements(bankstatementData).subscribe(data => {
    if (data.status == 200) {
      clearInterval(this.timer);
      // this.set.setOption("Process completed Successfully",true);
      // this.gotoAction();
    } else {
      clearInterval(this.timer);
      // this.set.setOption(data.exceptionMessage,true);
      // this.gotoAction();
    }
  });
}
runBrandRule(){
  var curDate1 = moment().format('YYYY-MM-DD HH:mm:ss');
  const data = {
    "currentActivityId": "0",
    "lastActivityTime": curDate1,
    "loanRequestId": this.loanid,
    "userId": this.userId,
    "userMedium": "backendApp",
    "mobileNumber": this.mobileNo,
    "programTypeId": this.programTypeId,
    "retailerId": this.orgId,
    "retailerType": "2",
    "statusFlag":"1"
  }
  this.apiService.reEunBrandRule(data).subscribe(data => {
    if (data.status == 200) {
      // if (data.exceptionOccured == 'Y') {
      //   this.set.setOption(data.exceptionMessage, true);
      //   this.ngOnInit();
      // } else {
      //   this.set.setOption(data.message, true);
      //   this.ngOnInit();

      // }
      // alert(data.message);
    } else {
      // this.set.setOption(data.exceptionMessage, false);
      // this.ngOnInit();
    }
  });
}
    //  }
  validateSystemVerify(){
    var count=0;
    if (this.flag == 2) {
      for (var a = 0; a < this.systemVerifyFailed.length; a++) {
        if ((Number(this.systemVerifyFailed[a]) === 1) && (Number(this.gstList[a].systemVerify) === 0)) {
          count++; 
          
        }
      }
      if(count!=0){
        return true;
      }else{
        return false;
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
  
  goToList() {
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
  }
  indianCurrency(Amount){
    return this.currency.indianCurrency(Amount);
  }
}



@Component({
  selector: 'gst-credentials',
  template: `<div class="modal-header">
  <h4 class="modal-title" id="modal-basic-title">GST Details</h4>
  <button type="button" class="close" aria-label="Close" (click)="getDismissReason('Cross click')">
    <span aria-hidden="true">×</span>
  </button>
</div>
<div class="modal-body">
<span *ngIf="errorMsg" style="color:red;text-align: center;">{{errorMsg}}</span>
<div class="form-group">
<div class="col-xs-12">
Your Last GST 3B Return Period is {{this.monthDiff}}  Months old, Please Check And Proceed
</div>
</div>
<table class="table table-striped table-bordered">
<tr>
<th>Sno</th>
<th>GST No</th>
<th>GST 3B Return Period</th>
<th>Month Diff</th>
</tr>
<tr *ngFor="let g of gstList;let i=index">
<td>{{i+1}}</td>
<td>{{g.gstNo}}</td>
<td>{{g.gst3b_return_period}}</td>
<td>{{g.monthDiff}}</td>
</tr>
</table>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-success" (click)="save()">Okay</button>
  <button type="button" class="btn btn-danger" (click)="getDismissReason('Cross click')">Cancel</button>
</div>`,
})

export class GSTDetailsPopUp implements OnInit {
  text: any;
  loanid: any;
  actionId: any;
  errorMessage: any;
  showErrorMessage: boolean = false;
  errorMsg: any;
  HeaderDetails = [];
  requestList = [];
  todayDate: any;
  submitted:any;
  mobileNo:any;
  stausId:any;
  substatusId:any;
  programId:any;
  statusFlow:any;
  gstList:any;
  orgId:any;
  monthDiff:any;
  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<GSTDetailsPopUp>, @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService, private dialog: MatDialog) { }
 
  ngOnInit() {
    this.errorMsg='';
    this.gstList=this.data.gstList;
    this.loanid=this.data.loanId;
    this.orgId=this.data.orgId;
    this.monthDiff=Math.max.apply(Math, this.gstList.map(function(o) { return o.monthDiff; }))
    this.todayDate = moment().format('YYYY-MM-DD');
  }
 
  save(){
    
   
    this.apiService.saveFormDetails(this.loanid, this.data.result).subscribe(data => {
      if (data.status == 200) {
        // this.errorMsg = '';
        this.dialogRef.close();
        this.gotoAction();
      } else {
        this.errorMsg = 'Failed to update';
        // this.modalService.dismissAll();

       }
    }, error => console.log(error));
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
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.dialogRef.close();
      return `with: ${reason}`;
    }
  }
  

}