import { Component, OnInit, ChangeDetectorRef, Output, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { ReportModel } from './reportModel';
import { ApiService } from "..//core/api.service";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from '..//shared/excel.service';
import { gemConstant, retailerConstant, nonSoleProp, sellerConstant } from '../core/constant';
import { FormControl, FormGroup } from '@angular/forms';
import { Currency } from '../shared/currency.service';
import { breadcrumbMessage } from '../shared/breadcrumb-message.service'
import { PdfService } from '..//shared/pdf.service';
import { lender } from '../../environments/environment';
import { lenderconfiguration } from '../../environments/lender.config';
import * as moment from 'moment/moment.js';
import { startWith } from 'rxjs/operators/startWith';
import { environment } from '../../environments/environment.jana.prod';
import { map } from 'rxjs/operators/map';

import { Crypto } from '../shared/crypto.service';
declare var dispUpi: any;
@Component({
  selector: 'app-Overview',
  templateUrl: './report.component.html',
  styleUrls: ["./report.component.css"]
})

export class ReportComponent implements OnInit {
  ugroLenderId = lender.UGRO;
  requestList = [];
  customerName: any;
  mobileNo: any;
  filterMobileNo: any;
  emailId: any;
  address: any;
  city: any;
  oldmobile:any;
  state: any;
  loanid: any;
  pincode: any;
  sanctionDate: any;
  totalOutstanding: any;
  newPan: any;
  errorMSG: any;
  extend: boolean = false;
  searchPanNo;
  showqrcode: boolean = false;
  nomore: boolean = false;
  searchAnchorPanNo;
  error:any;
  searchReportList;
  roleId: any;
  closeResult: string;
  mappingType: any;
  supplierList = [];
  stateList = [];
  cityList = [];
  applicationDetails = [];
  applicantDetails = [];
  sanctionConditionList = [];
  buyerList = [];
  p1: any;
  page: any;
  anchorData = [];
  companyTypeList = [];
  companyRatingList = [];
  resultVallue: string;
  custId: number;
  p: any = 1;
  orgId: any;
  showAnger: boolean = false;
  programIds:any;
  isLive: boolean = false;
  generateAnchorButton: any;
  updateButton: any;
  userId: any;
  anchorsFundingList: Array<any> = [];
  gemProgramTypeId = gemConstant.gemProgramTypeId;
  retailerProgramTypeId = retailerConstant.retailerProgramTypeId;
  PAN_Verification_Fail = retailerConstant.PAN_Verification_Fail;
  sellerProgramTypeId = sellerConstant.sellerProgramTypeId;
  Loand_Docs_Uploaded_to_Filenet_Pending = nonSoleProp.Loand_Docs_Uploaded_to_Filenet_Pending;
  Application_Form_Update_Pending = nonSoleProp.Application_Form_Update_Pending;
  adjustMaxPercentage: number;
  adjustMinPercentage: number;
  creditLimit: number;
  minLimit: number;
  customOutstanding: any;
  maxLimit: number;
  panid: any;
  errorMsg:any;
  warningMsg: boolean;
  loanidl: any;
  loanIdl: any;
  endDate: any;
  anchorId:any
  startDate: any;
  maxDate = new Date();
  minDate = new Date();
  tomorrow = new Date();
  control = new FormControl(new Date(1990, 0, 1));
  form = new FormGroup({ date: this.control });
  advanceSearch: boolean = false;
  flag: any = 1;
  newProgram: any;
  newLender: any;
  totaloutstanding: any;
  HeaderDetails: any;
  programList: any = [];
  lenderList = [];
  status = [{ status: '1', name: 'Active' }, { status: '0', name: 'Inactive' }];
  panNo: any;
  filterPanNo: any;
  lenderId: any;
  programId: any;
  filterLanNo: any;
  somemore: boolean = true;
  firmName: any;
  loanRequestNo: any;
  applicantName: any;
  lanNo: any;
  crnNo: any;
  program: any;
  ltype: any;
  programName: any;
  currentstatus: any;
  allProgramList: any;

  programCtrl: FormControl;
  filteredprogram: Observable<any[]>;

  allAnchorList: any;
  anchorCtrl: FormControl;
  filteredanchor: Observable<any[]>;

  allstatusList: any;
  statusCtrl: FormControl;
  filteredStatus: Observable<any[]>;

  allSubStatusList: any;
  substatusCtrl: FormControl;
  filteredSubStatus: Observable<any[]>;
  statusId: any;
  lenderIdp: any;

  subStatusId: any;
  isLender: any;
  invoiceList: any;

  env: any;
  readRole:boolean;
  upiList: any[];
  qrList: any;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  err: boolean;
  message: any;
  q: any;
  instancevalue: string;
  instanceupiId: any;
  color: string;
  qramount: any;
  programs: any;
  qrfirm: any;
  soatype: string;
  loanIdreport: any;
  type: 1;
  npaDate:any;
  todayDate:any;
  npaDateFlag:any;
  availLimit: any;
  constructor(private apiService: ApiService, private changeDetec: ChangeDetectorRef, private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal, private excelService: ExcelService, public set: breadcrumbMessage, public currency: Currency,
    public excelservice: ExcelService,
    public pdfservice: PdfService,
    private crypto: Crypto
  ) {
    this.programCtrl = new FormControl();
    this.anchorCtrl = new FormControl();
    this.statusCtrl = new FormControl();
    this.substatusCtrl = new FormControl();
    this.lenderIdp = Number(this.crypto.decryt(window.localStorage.getItem('lenderId')));
    this.apiService.getAllBrandList().subscribe(data => {
      if (data.status == 200) {
        this.allAnchorList = data.result;
        console.log(data.result);
        for (let c of this.allAnchorList) {
          c.anchorInfo = c.orgName;
        }
        this.filteredanchor = this.anchorCtrl.valueChanges
          .pipe(startWith(''),
            map(list1 => list1 ? this.anchorlist(list1) : this.allAnchorList.slice())
          );
        console.log("this.filteredanchor::" + JSON.stringify(this.filteredanchor));
      }
    }, error => console.log(error));

    this.apiService.getAllProgramList(this.lenderIdp).subscribe(data => {
      if (data.status == 200) {
        const l = {
          programName: 'No Program',
          programId: '0'
        }


        this.allProgramList = data.result;
        console.log(data.result);
        this.allProgramList.splice(0, 0, l);
        for (let c of this.allProgramList) {
          c.programInfo = c.programName;
        }
        this.filteredprogram = this.programCtrl.valueChanges
          .pipe(startWith(''),
            map(list2 => list2 ? this.programlist(list2) : this.allProgramList.slice())
          );
        console.log("this.filteredCustomer::" + JSON.stringify(this.filteredprogram));
      }
    }, error => console.log(error));
    this.apiService.getOverallStatusList().subscribe(data => {
      if (data.status == 200) {
        this.allstatusList = data.result.statusList;
        this.filteredStatus = this.statusCtrl.valueChanges
          .pipe(startWith(''),
            map(list2 => list2 ? this.statusList(list2) : this.allstatusList.slice())
          );
        console.log("this.filteredStatus::" + JSON.stringify(this.filteredStatus));
      }
    }, error => console.log(error));
    this.apiService.getOverallStatusList().subscribe(data => {
      if (data.status == 200) {
        this.allSubStatusList = data.result.subStatusList;
        this.filteredSubStatus = this.substatusCtrl.valueChanges
          .pipe(startWith(''),
            map(list2 => list2 ? this.subStatusList(list2) : this.allSubStatusList.slice())
          );
        console.log("this.filteredSubStatus::" + JSON.stringify(this.filteredSubStatus));
      }
    }, error => console.log(error));
  }
  preventTyping() {
    return false;
  }
  enterKey(e) {
    if (e.keyCode === 13) {
      this.searchLoanList(0);
    }
  }
  programlist(name: string) {
    return this.allProgramList.filter(list =>
      list.programInfo.toLowerCase().includes(name.toLowerCase()));
  }
  anchorlist(name: string) {
    return this.allAnchorList.filter(list =>
      list.anchorInfo.toLowerCase().includes(name.toLowerCase()));
  }
  statusList(name: string) {
    return this.allstatusList.filter(list =>
      list.name.toLowerCase().includes(name.toLowerCase()));
  }
  subStatusList(name: string) {
    return this.allSubStatusList.filter(list =>
      list.name.toLowerCase().includes(name.toLowerCase()));
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }
  showAdvanceSearchList(flag) {
    this.flag = flag;
    if (flag == 1) {
      this.advanceSearch = true;
    } else {
      this.advanceSearch = false;
      this.reloadData();
    }
  }
  prev: any;
  first: any = 1;
  firstdot: any;
  prevpage: any;
  currpage: any;
  nextpage: any;
  // statusList: any;
  lastdot: any;
  last: any;
  next: any;
  totalPage: any;
  nonStopFlag: any;
  ngOnInit() {
    this.env = lenderconfiguration.env;
  
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.readRole=false;
    if(this.env=="Jana")
    {
      if(this.roleId==2)
      {
        this.roleId=1;
      }
    }
    if((this.readOnly == Number(this.roleId))||(this.anchorReadonly==Number(this.roleId))){
      this.readRole = true;
    }
    //     this.statusId="b"
    // this.subStatusId="b";
    console.log("The lender ID p is ===" + this.lenderIdp)
    if (this.roleId == 1 || this.roleId == 3 || this.roleId == 6) {
      this.isLender = "";
    } else if (this.roleId == 13 || this.roleId == 14 || this.roleId == 7) {
      this.isLender = "1";
    } else if (this.roleId == 4 || this.roleId == 5) {
      this.isLender = "0";
    }
    this.orgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.p1 = 10;
    this.currentstatus = '';
    this.page = 0;
    this.extend = false;
    this.newProgram = "";
    this.p = 1;
    this.maxDate.setDate(this.tomorrow.getDate());
    var search = window.localStorage.getItem('searchReportList');
    if (search) {
      this.searchReportList = search;
    }
    console.log("URL::" + this.router.url)
    if (this.router.url.includes("loanRequestList")) {
      this.nonStopFlag = '0';
    } else {
      this.nonStopFlag = '1';
    }
    localStorage.setItem('nonStopFlag', this.crypto.encryt(this.nonStopFlag));
    this.showAnger = true;
    this.loanRequestNo = this.route.snapshot.params['loanid'];
    this.filterPanNo = this.route.snapshot.params['panid'];
    if (this.loanRequestNo || this.filterPanNo || this.filterLanNo) {
      this.reloadData();
    }
    this.searchbox = (this.searchReportList == '' || this.searchReportList == undefined || this.searchReportList == null) ? false : true;
    this.route.queryParams.subscribe(params => {
      this.filterPanNo = params['pan'];
      this.filterLanNo = params['lan'];
      this.firmName = params['firmName'];
      this.loanRequestNo = params['loanId'];
      console.log("the loan amount is ==="+this.loanRequestNo)
    })
    if (this.loanRequestNo|| this.filterPanNo || this.filterLanNo || this.firmName) {
      this.reloadData();
    }

  }
  setSearchList() {
    window.localStorage.setItem('searchReportList', this.searchReportList);
  }

  reloadData() {
    window.localStorage.setItem("ruleupdate","no")
    if(!this.isNullorUndefinedorEmpty(this.anchorCtrl.value))
  {
    for(let m of this.allAnchorList)
    {
 
  if((m.orgName)==this.anchorCtrl.value)
  {
    this.anchorId = m.orgId
  }
  }
    }
    if(!this.isNullorUndefinedorEmpty(this.programCtrl.value))
    {
    for(let m of this.allProgramList)
    {
 
  if((m.programName)==this.programCtrl.value)
  {
    this.programIds = m.programId
  }
  }
    }
    console.log("this.panid 2::" + this.panid)
    const data = {
      applicantName: this.isNullorUndefinedorEmpty(this.applicantName) ? '' : this.applicantName,
      loanRequestNo: this.isNullorUndefinedorEmpty(this.loanRequestNo) ? 'loanRequestNo' : this.loanRequestNo,
      lanNo: this.isNullorUndefinedorEmpty(this.filterLanNo) ? '~' : this.filterLanNo,
      referenceNo: 'referenceNo',
      status: this.currentstatus,
      panNo: this.isNullorUndefinedorEmpty(this.filterPanNo) ? '1' : this.filterPanNo,
      firmName: this.isNullorUndefinedorEmpty(this.firmName) ? '1' : this.firmName,
      mobileNo: this.isNullorUndefinedorEmpty(this.filterMobileNo) ? 'mobileNo' : this.filterMobileNo,
      crNo: this.isNullorUndefinedorEmpty(this.crnNo) ? '~' : this.crnNo,
      startDate: this.isNullorUndefinedorEmpty(this.startDate) ? 'transDate' : this.startDate,
      endDate: this.isNullorUndefinedorEmpty(this.startDate) ? 'transDate' : this.endDate,
      program: this.isNullorUndefinedorEmpty(this.programCtrl.value) ? '1' : this.programIds,
      anchor: this.isNullorUndefinedorEmpty(this.anchorCtrl.value) ? '0' : this.anchorId,
      userId: this.userId,
      roleId: this.roleId + "",
      orgId: this.orgId,
      pageNoRequested: Number(1),
      statusId: '~',
      subStatusId: '~',
      nonStopFlag: this.nonStopFlag
    };
    this.apiService.getOverviewSetupList(data).subscribe(res => {
      this.requestList = res.result;
      this.showAnger = (this.requestList.length == 0) ? true : false;
      var totalList = Number(res.result[0].totalList);
      this.totalPage = totalList % 10;
      this.last = totalList % 10;
    });

  }

  showPageIndex(pageIndex, pagesize) {
    this.page = pageIndex;
    console.log(this.page);
    if (this.page != 1) {
      this.page = (this.page - 1) * pagesize;
    } else {
      this.page = 0;
    }
  }

  validateFinalLimit(finalLimit, data) {
    this.apiService.getFinalLimitRange(this.loanid).subscribe(res => {
      let creditLimit: number = this.creditLimit;
      let adjustMinPercentage: number = res.result.adjustMinPercentage;
      let adjustMaxPercentage: number = res.result.adjustMaxPercentage;
      let minLimit: number = (this.creditLimit * adjustMinPercentage) / 100;
      let maxLimit: number = (this.creditLimit * adjustMaxPercentage) / 100;
      let a: number = Number(creditLimit) - Number(minLimit);
      let b: number = Number(creditLimit) + Number(maxLimit);
      this.minLimit = a;
      this.maxLimit = b;


      if (this.minLimit > finalLimit || this.maxLimit < finalLimit) {
        this.warningMsg = true;
      } else {
        this.apiService.saveFinalLimit(this.custId, data).subscribe(data => {
          if (data.status == 200) {
            this.set.setOption("Final Limit Updated", true);
            this.modalService.dismissAll();
            window.location.reload();
          } else {
            this.set.setOption(data.exceptionMessage, false);
            this.modalService.dismissAll();
          }

        }, error => console.log(error));
      }
    });
  }

  overviewDetails(id: number, loanid: number) {
    console.log("id==" + id + "loanid==" + loanid);
    console.log("requestList.length==" + this.requestList);
    this.router.navigate(['report/overview', id, loanid], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  cashflowDetails(id: number, loanid: number) {
    this.router.navigate(['report/cashflow', id, loanid], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  summaryReportDetails(id: number, loanid: number) {
    this.router.navigate(['report/summary', id, loanid], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  cicReportDetails(id: number, loanid: number) {
    this.router.navigate(['report/cicReport', id, loanid], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  ReportDetails(id: number, loanid: number) {
    this.router.navigate(['report/tab', id, loanid], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  camGstDetails(id: number, loanid: number, orgId: number, retailerId: number, programTypeId: number, loginRequest) {
    window.localStorage.setItem('actionData', JSON.stringify(loginRequest));
    this.router.navigate(['report/camgstsummary'], {
      queryParams: {
        'customerId': id, 'loanId': loanid,
        'orgId': orgId, 'retailerId': retailerId, 'programTypeId': programTypeId, 'nonStopFlag': this.nonStopFlag
      }
    });
  }
  applicationFrom(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/applicationFrom', id, loanid, orgId, retailerId], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  checklist(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/checklist', id, loanid, orgId, retailerId], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  viewdocument(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/viewDocuments'], { queryParams: { 'customerId': id, 'loanId': loanid, 'orgId': orgId, 'nonStopFlag': this.nonStopFlag } });
  }
  loandisbursal(id: number, loanid: number, orgId: number, retailerId: number, digital: number) {
    this.router.navigate(['report/loandisbursal'], {
      queryParams: {
        'customerId': id, 'loanId': loanid,
        'orgId': orgId, 'digital': digital, 'nonStopFlag': this.nonStopFlag
      }
    });
  }
  gemdisbursal(id: number, loanid: number, orgId: number, retailerId: number, digital: number) {
    this.router.navigate(['report/gemdisbursal', id, loanid, orgId, retailerId, digital], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  statementAccount(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/statementAccount', id, loanid, orgId, retailerId], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  action(loanid: number, subStatus: number, programTypeId: number, orgId: number) {
    this.router.navigate(['report/action'], {
      queryParams: {
        'loanId': loanid,
        'orgId': orgId, 'programTypeId': programTypeId, 'nonStopFlag': this.nonStopFlag
      }
    });
  }
  uploadDocuments(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/uploadDocuments', id, loanid, orgId, retailerId], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  sallerLoanForm(loanid: number) {
    this.router.navigate(['report/sallerLoanForm', loanid], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  updateGSTN(loanid: number, orgId: number) {
    this.router.navigate(['report/UpdateGSTn', loanid, orgId], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  gst3b(loanid: number, orgId: number) {
    this.router.navigate(['/gst/gst3b', loanid, orgId], { queryParams: { 'nonStopFlag': this.nonStopFlag } })
  }
  gstr1(loanid: number, orgId: number) {
    this.router.navigate(['/gst/gstr1', loanid, orgId], { queryParams: { 'nonStopFlag': this.nonStopFlag } })
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  nextButton() {
    console.log("this.requestList::" + this.requestList.length);
    console.log("this.p::" + this.p);
    if (this.requestList.length == 10) {
      this.p = Number(this.p) + 1;
      this.searchLoanList(0);
    }
  }
  previousButton() {
    if (this.p != 1) {
      this.p = Number(this.p) - 1;
      this.searchLoanList(0);
    }
  }
  hello() {
    this.modalService.dismissAll();
  }
  soareport(content, approvalStatus, loanreqid) {
    this.isLender = 0;
    this.soatype = "Borrower"
    this.actions.approvalStatus = approvalStatus
    this.actions.loanReqId = loanreqid
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  resetSearch() {
    this.applicantName = '';
    this.loanRequestNo = '';
    this.filterPanNo = '';
    this.firmName = '';
    this.filterMobileNo = '';
    this.filterLanNo = '';
    this.startDate = '';
    this.endDate = '';
    this.currentstatus = '';
    this.crnNo = '';
    this.programs = '';
    this.anchorCtrl = new FormControl();
    this.statusCtrl = new FormControl();
    this.substatusCtrl = new FormControl();
    // this.searchLoanList(1);
  }

  searchLoanList(type: any) {
    if(!this.isNullorUndefinedorEmpty(this.anchorCtrl.value)) {
    for(let m of this.allAnchorList)  {
  if((m.orgName)==this.anchorCtrl.value)
  {
    this.anchorId = m.orgId
    break;
  }
  }
    }
    if(!this.isNullorUndefinedorEmpty(this.programCtrl.value)) {
    for(let m of this.allProgramList){
  if((m.programName)==this.programCtrl.value) {
    this.programIds = m.programId
    break;
  }
  }
    }
    if (this.isNullorUndefinedorEmpty(this.applicantName) && this.isNullorUndefinedorEmpty(this.loanRequestNo) && this.isNullorUndefinedorEmpty(this.filterLanNo) && this.isNullorUndefinedorEmpty(this.filterPanNo) && this.isNullorUndefinedorEmpty(this.firmName) && this.isNullorUndefinedorEmpty(this.filterMobileNo) && this.isNullorUndefinedorEmpty(this.crnNo) && this.isNullorUndefinedorEmpty(this.startDate) && this.isNullorUndefinedorEmpty(this.endDate) && this.isNullorUndefinedorEmpty(this.programCtrl.value) && this.isNullorUndefinedorEmpty(this.anchorCtrl.value) &&this.isNullorUndefinedorEmpty(this.statusCtrl.value)&& this.isNullorUndefinedorEmpty(this.substatusCtrl.value)) {
      this.set.setOption("Please Use Filter To Search", false);
    } else  if (((this.isNullorUndefinedorEmpty(this.startDate)) && !(this.isNullorUndefinedorEmpty(this.endDate))) || (!(this.isNullorUndefinedorEmpty(this.startDate)) && (this.isNullorUndefinedorEmpty(this.endDate)))) {
      this.set.setOption("For the date filter Start Date and  End Date should be entered", false)
    }
    else {
      this.statusId = '~';
      this.activitytable = false;
      this.subStatusId = '~';
      for (let s of this.allstatusList) {
        if (s.name == this.statusCtrl.value) {
          this.statusId = s.id;
          break;
        }
      }
      for (let ss of this.allSubStatusList) {
        if (ss.name == this.substatusCtrl.value) {
          this.subStatusId = ss.id;
          break;
        }
      }
      this.p = (type == 1) ? 1 : this.p;
     
        const data = {
          applicantName: this.isNullorUndefinedorEmpty(this.applicantName) ? '1' : this.applicantName,
          loanRequestNo: this.isNullorUndefinedorEmpty(this.loanRequestNo) ? 'loanRequestNo' : this.loanRequestNo,
          lanNo: this.isNullorUndefinedorEmpty(this.filterLanNo) ? '~' : this.filterLanNo,
          referenceNo: 'referenceNo',
          status: this.currentstatus,
          panNo: this.isNullorUndefinedorEmpty(this.filterPanNo) ? '1' : this.filterPanNo,
          firmName: this.isNullorUndefinedorEmpty(this.firmName) ? '1' : this.firmName,
          mobileNo: this.isNullorUndefinedorEmpty(this.filterMobileNo) ? 'mobileNo' : this.filterMobileNo,
          crNo: this.isNullorUndefinedorEmpty(this.crnNo) ? '~' : this.crnNo,
          startDate: this.isNullorUndefinedorEmpty(this.startDate) ? 'transDate' : this.startDate,
          endDate: this.isNullorUndefinedorEmpty(this.endDate) ? 'transDate' : this.endDate,
          program: this.isNullorUndefinedorEmpty(this.programCtrl.value) ? '1' : this.programIds,
          anchor: this.isNullorUndefinedorEmpty(this.anchorCtrl.value) ? '0' : this.anchorId,
          userId: this.userId,
          roleId: this.roleId + "",
          orgId: this.orgId,
          pageNoRequested: (this.p == null || this.p == undefined) ? 1 : Number(this.p),
          statusId: this.statusId,
          subStatusId: this.subStatusId,
          nonStopFlag: this.nonStopFlag
        };
        this.apiService.getOverviewSetupList(data).subscribe(res => {
          this.requestList = res.result;
          this.availLimit = this.requestList[0].availLimit;
          console.log("availLimit::::::::::::::"+this.availLimit);
          window.localStorage.setItem('availLimit_x', this.availLimit);
          console.log("availLimit1111111111111::::::::::::::"+this.availLimit);
          this.showAnger = (this.requestList.length == 0) ? true : false;
        }, error => console.log(error));
      
    }
    
  }
  savelan() {

    var lan = (document.getElementById("lan") as HTMLInputElement).value;
    var create_date = (document.getElementById("lan_create_date") as HTMLInputElement).value;
    var remarks = (document.getElementById("lan_remarks") as HTMLInputElement).value;
    console.log("lan::" + lan + " create_date::" + create_date + " remarks::" + remarks);
    this.modalService.dismissAll();
  }
  saveFinalLimit() {
    var final_Limit = (document.getElementById("final_Limit") as HTMLInputElement).value;
    var final_Limit_create_date = (document.getElementById("final_Limit_create_date") as HTMLInputElement).value;
    var final_Limit_remarks = (document.getElementById("final_Limit_remarks") as HTMLInputElement).value;
    if (final_Limit == '0' || final_Limit == '') {
      this.set.setOption("Please Enter Valid Final Limit", false);
    } else {
      const data = {
        final_Limit: final_Limit,
        final_Limit_create_date: final_Limit_create_date,
        final_Limit_remarks: final_Limit_remarks
      }
      this.validateFinalLimit(final_Limit, data);
    }
    console.log("final_Limit::" + final_Limit + " final_Limit_create_date::" + final_Limit_create_date + " final_Limit_remarks::" + final_Limit_remarks);
  }
  finalLimitPopUp(custId: number, creditLimit: number, loanId: number, content) {
    this.custId = custId;
    this.creditLimit = creditLimit;
    this.loanid = loanId;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  saveBuyer() {
    this.modalService.dismissAll();
    var checkbox = document.getElementsByName("check");
    var temArray = [];
    const formData = new FormData();
    formData.append('panNumbers', this.resultVallue);
    formData.append('loanId', this.loanid);
    this.apiService.saveResultValue(formData).subscribe(data => {

      if (data.status == 200) {
        this.modalService.dismissAll();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.modalService.dismissAll();
      }
    }, error => console.log(error));
  }
  getCheckedPanNo() {
    var checkbox = document.getElementsByName("check");
    var temArray = [];
    for (let i = 0; i < checkbox.length; i++) {
      var id = "check_" + i;
      if ((checkbox[i] as HTMLInputElement).checked) {
        temArray.push(this.buyerList[i].buyerPan);
      }
    }
    this.resultVallue = temArray.join(", ");
  }

  validateNewPan(panNo) {
    var count = 0;
    if (this.resultVallue == undefined || this.resultVallue == null || this.resultVallue == '') {
      return false;
    } else {
      var temp = this.resultVallue.split(", ");
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
  addPan() {
    const data = {
      loanId: this.loanid,
      panCard: this.newPan,
    };
    this.errorMSG = "";
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (this.newPan == null || this.newPan == undefined) {
      this.errorMSG = "PAN Number is Required";
    } else if (!regex.test(this.newPan.toUpperCase())) {
      this.errorMSG = "Invalid PAN Number";
    } else if (this.validateNewPan(this.newPan)) {
      this.errorMSG = "PAN Number already Exists";
    } else {
      this.apiService.saveAnchorDetails(data).subscribe(data => {
        if (data.status == 200) {
          this.newPan = ''
        } else {
          this.errorMSG = "Can't Find the Shortlisted Anchors,Please Run the GSTN Rule ";
        }
      }, error => console.log(error));

      //render
      this.apiService.getBuyersList(this.orgId, this.type).subscribe(data => {
        if (data.status == 200) {
          this.buyerList = data.result;
          this.apiService.getResultValueList(this.loanid, this.type).subscribe(data => {
            if (data.status == 200 && data.result.resultValue) {
              this.resultVallue = data.result.resultValue;
              var temp = this.resultVallue.split(", ");
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


  updateFundingLimit() {
    var arrayList = [];
    let count = true;
    let update = false;
    for (let a of this.anchorData) {
      if (a.validation == 1) {
        update = true;
        if (a.ratingCompanyTypeId == 0) {
          count = false;
        } else if (a.ratingId == 0) {
          count = false;
        } else {
          arrayList.push(a);
        }
      }
    }
    this.modalService.dismissAll();
    if (update) {
      if (count) {
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
      } else {
        this.set.setOption("Please enter valid details", false);
      }
    } else {
      this.set.setOption("Please enter valid details", false);
    }


  }
  generateAnchorProfile() {

    this.apiService.generateAnchorProfile(this.loanid, this.userId, this.type)
      .subscribe(data => {
        if (data.status == 200) {
          if (data.exceptionOccured == 'Y') {
            this.set.setOption(data.exceptionMessage, false);
          } else {
            this.set.setOption("Anchor Profile Generated Successfully", true);
          }
          this.modalService.dismissAll();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
  }
  checkChanges(index: any) {
    if (this.anchorData[index].ratingId == 0 && this.anchorData[index].ratingCompanyTypeId == 0) {
      this.anchorData[index].validation = 0;
    } else {
      this.anchorData[index].validation = 1;
    }
  }
  setFundingPercentage(index: any) {
    this.checkChanges(index);
    for (let f of this.companyRatingList) {
      if (this.anchorData[index].ratingId != 0 && f.raingId == this.anchorData[index].ratingId) {
        this.anchorData[index].fundingPercentage = f.fundingPercentage;
        this.anchorData[index].validation = 1;
      }
    }
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
        'Amount', 'Tenure', 'ROI', 'Since', 'No of Invoices', 'Invoice Amount',
        'Status',],
      ...this.anchorData.map(i => ([j++, i.panNo, i.buyerName, i.companyTypeName, i.rateName, i.fundingPercentage, i.vaNumber, '', '', '', '',
      i.startDate, i.totalInvoices, i.invoiceValue, (i.isAnchorActive == 1) ? ' Active' : 'Inactive',]))
    ]
    this.pdfservice.pdf(body, title, 'A4');
  }
  openAnchorPopup(content, orgId, loanId) {
    this.router.navigate(['report/anchorUpdate', loanId, orgId], { queryParams: { 'nonStopFlag': this.nonStopFlag } });

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

  downloadSupplierExcel(loanId: any) {
    this.apiService.generateSupplierExcel(loanId).subscribe(res => {
      this.supplierList = res.result;
      this.excelService.exportAsExcelFile(this.supplierList, loanId + '_Supplier_Report');
    }, error => console.log(error));

  }

  update2AData(loanId: any, orgId: any) {
    this.router.navigate(['gst/update2AData', loanId, orgId], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }


  updateLoanStatus(loanid: number, programTypeId: number, orgId: number) {
    this.router.navigate(['report/updateLoanStatus', loanid, programTypeId, orgId], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }



  saveSanctionDate() {
    const data = {
      loanId: this.loanid,
      sanctionDate: this.sanctionDate,
      programId: this.programId
    }
    this.apiService.saveSanctionDate(data).subscribe(res => {
      if (res.status == 200) {
        this.set.setOption("Sanction Date Updated Successfully", true);
        this.ngOnInit();
        this.modalService.dismissAll();
      } else {
        this.set.setOption(res.exceptionMessage, false)
      }
    }, error => console.log(error));
  }
  saveSanctionCondition() {

    var count = 0;
    for (let i = 0; i < this.sanctionConditionList.length; i++) {
      if (this.sanctionConditionList[i].conditionDesc == undefined || this.sanctionConditionList[i].conditionDesc == null || this.sanctionConditionList[i].conditionDesc == '') {
        count++;
        this.set.setOption("please enter Condition Describtion", false)
        break;
      } else if (this.sanctionConditionList[i].type == undefined || this.sanctionConditionList[i].type == null || this.sanctionConditionList[i].type == '') {
        count++;
        this.set.setOption("please enter Type", false)
        break;
      }
    }
    if (count == 0) {
      console.log("this.sanctionConditionList=" + JSON.stringify(this.sanctionConditionList));
      this.apiService.saveSanctionCondition(this.sanctionConditionList).subscribe(res => {
        if (res.status == 200) {
          this.set.setOption("Sanction Conditions Updated Successfully", true);
          window.location.reload();
          this.modalService.dismissAll();
        } else {
          this.set.setOption(res.exceptionMessage, false);
        }
      }, error => console.log(error));
    } else {
      this.set.setOption("All the fields are mandatory", false);
    }

  }
  cancelRequest(loanNo: any, loanId: any, orgId: any, mobileNo: any, panNo: any) {

    if (confirm("Are you sure do you want to Cancel " + loanNo + "?")) {
      const data = {
        loanId: loanId, orgId: orgId, userId: this.userId, mobileNo: mobileNo, panNo: panNo
      }
      this.apiService.cancelLoanRequest(data).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption(data.exceptionMessage, true);
          this.ngOnInit();
          this.activitytable = false;
        } else {
          this.ngOnInit();
          this.set.setOption(data.exceptionMessage, false);
          this.activitytable = false;
        }
      });
    }
  }
  sactionConditionPopup(loanId: number, content) {

    this.loanid = loanId;
    this.apiService.getSanctionCondition(this.loanid).subscribe(res => {
      this.sanctionConditionList = res.result;
      if (this.sanctionConditionList.length == 0) {
        this.addRow();
      }
      this.modalService.open(content, { size: 'xl' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }, error => console.log(error));


  }
  sactionDatePopup(loanId: number, content, programId) {
    this.loanid = loanId;
    this.programId = programId;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addRow() {
    const newDynamic = {
      id: 0, loanId: this.loanid, conditionDesc: '', type: '', activeInd: 1, createdBy: this.userId, createdOn: '', remarks: ''
    };
    this.sanctionConditionList.push(newDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  deleteRow(index) {
    if (this.sanctionConditionList.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);
      return false;
    } else {
      this.sanctionConditionList.splice(index, 1);
      return true;
    }
  }
  registerNACH(id: number, loanid: number, orgId: number, programTypeId: number) {
    this.router.navigate(['report/uploadNachForm', id, loanid, orgId, programTypeId], { queryParams: { 'nonStopFlag': this.nonStopFlag } });
  }
  indianCurrency(number: any) {

    return this.currency.indianCurrency(number);
  }


  programChange(content, loanId, programTypeId, orgId) {
    this.loanid = loanId;
    this.orgId = orgId;
    this.newProgram="";

    this.apiService.getLoanHeaderDetails(loanId)
      .subscribe(data => {
        if (data.status == 200) {
          this.HeaderDetails = data.result;
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
      // this.apiService.getHulProgramList(loanId,1).subscribe(data => {
      //   if (data.status == 200) {
      //     this.programList = data.result;
      //     this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      //       this.closeResult = `Closed with: ${result}`;
      //     }, (reason) => {
      //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //     });
      //   } else {
      //     this.set.setOption(data.exceptionMessage, false);
      //   }
      // }, error => console.log(error));
    this.apiService.getProgramLenderList().subscribe(data => {
      if (data.status == 200) {
        this.lenderList = data.result;
        this.modalService.open(content, { size: 'xl' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
    console.log("programTypeId::" + programTypeId);

  }
  getprogramList(lenderId: any) {
    this.apiService.getProgramListUsingLenderId(lenderId).subscribe(data => {
      if (data.status == 200) {
        this.programList = data.result;
        this.programList=(lenderId==lender.IDFC)?this.programList.filter((p)=>p.programTypeId!=1):this.programList;
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));

  }
  setCityValue(value) {
    this.apiService.getCityListBystatetid(value).subscribe(data => {
      this.cityList = data.result;
    });
  }
  updateApplicationDetails(content, loanId, programTypeId, orgId, panNo, lenderId, approvalStatus) {
    this.loanid = loanId;
    this.orgId = orgId;
    this.panNo = panNo;
    this.isLive = (approvalStatus == "Approved") ? true : false;
    this.applicationDetails = [];
    this.applicantDetails = [];
    this.lenderId = lenderId;
    this.apiService.getStateList().subscribe(data => { this.stateList = data.result });
    this.apiService.getApplicationDetails(this.loanid).subscribe(data => {
      if (data.status == 200) {
        this.applicationDetails = data.result.applicationDetails;
        this.applicantDetails = data.result.applicantDetails;
        this.customerName = this.applicationDetails[0].customerName;
        this.mobileNo = this.applicationDetails[0].mobileNo;
        this.oldmobile=this.applicationDetails[0].mobileNo;
        this.emailId = this.applicationDetails[0].emailId;
        this.address = this.applicationDetails[0].address;
        this.city = this.applicationDetails[0].city;
        this.state = this.applicationDetails[0].state;
        this.pincode = this.applicationDetails[0].pincode;
        this.getAddressByPincode(this.pincode);
        this.modalService.open(content, { size: 'xl' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
    console.log("programTypeId::" + programTypeId);
  }
  getAddressByPincode(pincode) {
    if (pincode.length == 6) {
      this.apiService.getAddressByPincode(pincode).subscribe(data => {
        if (data.status == 200) {
          this.city = data.result[0].cityName;
          this.state = data.result[0].stateName;
          this.setCityValue(data.result[0].stateName);
        }
      });
    } else {
      this.set.setOption(pincode + " is Invalid Pincode", false);
      this.pincode = '';
    }

  }
  saveApplicationDetails() {
    this.modalService.dismissAll();
    this.applicationDetails[0].customerName = this.customerName;
    this.applicationDetails[0].mobileNo = this.mobileNo;
    this.applicationDetails[0].emailId = this.emailId;
    this.applicationDetails[0].address = this.address;
    this.applicationDetails[0].city = this.city;
    this.applicationDetails[0].state = this.state;
    this.applicationDetails[0].pincode = this.pincode;
    this.applicationDetails[0].panNo = this.panNo;
    this.applicationDetails[0].oldMobile = this.oldmobile;
    const data = {
      applicationDetails: this.applicationDetails,
      applicantDetails: this.applicantDetails
    }
    this.apiService.saveApplicationDetails(this.loanid, data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
        if (this.lenderId == lender.UGRO) {
          this.downloadLoanForm(5);
        }
      } else {
        this.ngOnInit();
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  downloadsoas(loanId) {

  }
  downloadSOAPopup(content, ltype, loanId) {
    this.ltype = ltype
    this.loanIdl = loanId
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  downloadSOA(e) {
    const data1 = {
      "currentActivityId": "25",
      "lastActivityTime": moment().format('YYYY-MM-DD HH:mm:ss'),
      "loanRequestId": this.loanIdl,
      "userId": this.userId,
      "userMedium": "backendApp",
      "from": moment().format('DD-MM-YYYY'),
      "to": moment().format('DD-MM-YYYY'),
      "fileType": e,
      "isLender": this.ltype
    }
    console.log("data_sent::::" + JSON.stringify(data1));
    this.apiService.getSOAReport(data1).subscribe(data => {
      if (data.status == 200) {
        window.open(data.result, '_blank');
      } else {
        this.set.setOption(data.result, false);
      }
    }, error => { console.log(error.message); });
  }
  saveProgram() {
    if (this.newLender == null || this.newLender == undefined || this.newLender == 0) {
      this.set.setOption("Enter valid Lender", false);
    } else if (this.newProgram == null || this.newProgram == undefined || this.newProgram == 0) {
      this.set.setOption("Enter valid Program", false);
    } else {
      const data = {
        loanId: this.loanid,
        orgId: this.orgId,
        programId: this.newProgram,
        flag: '1',
        userId: this.userId
      }
      this.apiService.createNewLoan(data).subscribe(data => {
        if (data.status == 200 && data.exceptionOccured == 'N') {
          this.set.setOption(data.exceptionMessage, true);
          var loanid = data.result;
          this.ngOnInit();
          this.modalService.dismissAll();
        } else {
          this.set.setOption((data.exceptionMessage=='')?'Migration Failed':data.exceptionMessage, false);
          this.modalService.dismissAll();
        }
      });
    }

  }
  downloadLoanForm(type: any) {
    this.apiService.downloadForm(this.loanid, 0, type).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
        } else {
          this.ngOnInit();
        }
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }

  actions: any;
  activitytable: boolean;
  searchbox: boolean;
  activitybox: boolean;
  choose(a) {
    this.actions = a;
    this.activitytable = true;
    this.loanid = a.loanReqId;
    window.localStorage.setItem('actionData', JSON.stringify(this.actions));
  }

  searchpopup(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  keyPresses(event: any) {
    if (event.keyCode == 13) {
      this.searchLoanList(1);
    }
  }

  @ViewChild("searchbox", { static: false }) private searchinput: ElementRef;
  utility(a) {
    if (a == 1) {
      this.searchbox = false;
    } else {
      this.searchbox = true;
      var b = setInterval(() => {
        this.searchinput.nativeElement.focus();
        clearInterval(b);
      }, 200)
    }
  }
  extentLoan(content, loan: any, orgId: any, program: any, flag: any, mappingType: any, lenderId: any) {
    this.errorMSG = "";
    // this.getprogramList(lenderId)
    this.loanid = loan;
    this.orgId = orgId;
    this.flag = flag;
    this.mappingType = mappingType

    this.apiService.getLoanHeaderDetails(loan)
      .subscribe(data => {
        if (data.status == 200) {
          this.HeaderDetails = data.result;
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
      this.apiService.getHulProgramList(this.loanid,1).subscribe(data => {
        if (data.status == 200) {
          this.programList = data.result;
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }

  submitExtension() {
    console.log("the new program is===" + this.newProgram)
    if (this.newProgram == "") {
      this.errorMSG = "Please Select a Program";
    }
    else {
      this.errorMSG = "";
      this.modalService.dismissAll();
      const data = {
        loanId: this.loanid,
        orgId: this.orgId,
        programId: this.newProgram,
        flag: '2',
        mappingType: this.mappingType,
        userId: this.userId
      }
      this.apiService.createNewLoan(data).subscribe(data => {
        if (data.status == 200 && data.exceptionOccured == 'N') {
          var loanid = data.result;
          this.set.setOption("Successfully Updated", true);
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      });
    }
  }

  repayviaqr(content, orgId, retailerId, firmName) {
    this.color = "0";
    this.message = "";
    this.totalOutstanding = 0;
    this.customOutstanding = 0;
    this.showqrcode = false;
    this.qrfirm = firmName
    console.log("I am called for this=" + this.qrfirm);
    const data = {
      loanDisbursalId: '0',
      fromDate: '01-01-2020',
      toDate: moment().format('DD-MM-YYYY'),
      dueType: '1',
      userId: this.crypto.decryt(window.localStorage.getItem('userId')),
      lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      orgId: orgId,
      loanRequestId: '0',
      brandId: retailerId
    }
    this.apiService.getRepaymentListqr(data).subscribe(objRes => {
      if (objRes.status == 200) {
        this.invoiceList = objRes.result.list;
        this.totalOutstanding = 0;
        for (let a of this.invoiceList) {
          console.log(" i am called in a loop")
          var c = Number(a.repaymentAmount);
          console.log("The temporary amount is c===" + c)
          this.totalOutstanding = c + Number(this.totalOutstanding);
          console.log("The temporary adding is  ====" + this.totalOutstanding)
          c = 0;
        }
        console.log("The total outstanding amount is ======" + this.totalOutstanding.toFixed(2))
        this.totalOutstanding = this.totalOutstanding.toFixed(2)
      }
    });
    this.apiService.getQRupiList(orgId).subscribe(obj6Res => {
      this.somemore = true;
      this.qramount = 0;
      if (obj6Res.status == 200) {
        this.p = 1;
        this.qrList = obj6Res.result;
        this.q = this.qrList.length;
        if (this.q < 2) {
          this.somemore = false;
        }
        for (let a of this.qrList) {
          a.code = `upi://pay?pa=${a.accountNo}&pn=FinAGG&mc=6211&tr=${moment().format('YYYYMMDDHHmmss')}&tn=FinAGGPay&am=&cu=INR`;
        }
      } else {
        this.err = true;
        this.message = obj6Res.exceptionMessage;

      }
      this.instancevalue = `upi://pay?pa=${this.qrList[this.p - 1].accountNo}&pn=FinAGG&mc=6211&tr=${moment().format('YYYYMMDDHHmmss')}&tn=FinAGGPay&am=&cu=INR`;
      this.instanceupiId = this.qrList[this.p - 1].accountNo;
      this.p = 0;
    }, error => console.log(error));
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  qrnavigator() {
    console.log("the value of p is===" + this.p)

    console.log("the valueof p iss ====" + this.p)
    this.instancevalue = `upi://pay?pa=${this.qrList[this.p + 1].accountNo}&pn=FinAGG&mc=6211&tr=${moment().format('YYYYMMDDHHmmss')}&tn=FinAGGPay&am=${this.qramount}&cu=INR`;
    this.instanceupiId = this.qrList[this.p + 1].accountNo;
    this.p = this.p + 1;
    this.nomore = true;
    if (this.p == this.qrList.length - 1) {
      this.p = -1;
    }
  }
  amountcalled() {
    this.instancevalue = `upi://pay?pa=${this.qrList[this.p].accountNo}&pn=FinAGG&mc=6211&tr=${moment().format('YYYYMMDDHHmmss')}&tn=FinAGGPay&am=&cu=INR`;
    this.instancevalue = this.instancevalue.replace(`&cu=INR`, `${this.totalOutstanding}&cu=INR`)
  }

  customamountcalled() {
    this.instancevalue = `upi://pay?pa=${this.qrList[this.p].accountNo}&pn=FinAGG&mc=6211&tr=${moment().format('YYYYMMDDHHmmss')}&tn=FinAGGPay&am=&cu=INR`;
    this.instancevalue = this.instancevalue.replace(`&cu=INR`, `${this.customOutstanding}&cu=INR`)
  }
  download() {

    var imgWidth = 104.14;
    var pageHeight = 200;
    var imgHeight = 147.32;
    var heightLeft = imgHeight;
    var data = document.getElementById('qrcodecontent');
    html2canvas(data,).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a6'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(`${this.instanceupiId}_UPI_${moment().format('YYYYMMDDHHmmss')}.pdf`);

      this.modalService.dismissAll();
    });
  }
  showqr() {
    this.message = "";

    if (this.color == "2") {
      if (Number(this.customOutstanding) > 0) {
        this.showqrcode = true;
        this.qramount = this.customOutstanding
        this.customamountcalled()
      } else {
        this.message = "Custom amount should be greater than zero"
      }

    }
    else if (this.color == "1") {
      this.showqrcode = true;
      this.qramount = this.totalOutstanding
      this.amountcalled()
    }
    else {
      this.message = "Please select an option"
    }

  }
  updateProgram() {
this.err=false;
    if (this.isNullorUndefinedorEmpty(this.newProgram)) {
      this.err=true;
    this.errorMsg = "Please Choose Program";
    //this.err=true;
 
    }else {
      const data = {
        loanId: this.loanid,
        orgId: this.orgId,
        programId: this.newProgram,
        anchorRecommdation:'0',
        userId: this.userId,
        currentActivityId: '65',
        userMedium: 'Backend',
        updateFlag:"1"
      }
      this.apiService.saveProgramDetails(data).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption(data.exceptionMessage, true);
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
        this.modalService.dismissAll();
      });
    }
  }
  updateExternalNpaDate(loanId,content,flag,npaDate){
    this.npaDate='';
    this.errorMSG='';
    this.loanid = loanId;
    this.todayDate=new Date();
    this.npaDateFlag=flag;
    this.npaDate=(npaDate!=0)?new Date(this.formatDateChange(npaDate)):'';
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   }
  
   saveNPADate(){
    if(this.isNullorUndefinedorEmpty(this.npaDate)){
      this.errorMSG='Please Choose NPA Date';
      return;
    }
    const data={
      userId:this.userId,
      loanRequestId:this.loanid,
      date:this.formatDate(this.npaDate),
      flag:this.npaDateFlag
    }
    if(confirm("Are you sure to Update NPA Date")) {
      this.apiService.updateExternalNPAStartDate(data).subscribe((data)=>{
        if(data.status==200){
          this.set.setOption("Success",true);
          this.modalService.dismissAll();
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage,false);
        }
      })
    }
   }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }
  formatDateChange(date) {
    return date.split("-").reverse().join("-");
  }

   removeNPADate(loanId,content,flag,npaDate){
    const data={
      userId:this.userId,
      loanRequestId:loanId,
      date:npaDate,
      flag:flag
    }
    if(confirm("Please Confirm to the remove?")) {
    this.apiService.removeNPAStartDate(data).subscribe((data=>{
      if(data.status==200){
        this.set.setOption("Success",true);
        this.modalService.dismissAll();
        this.ngOnInit();
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }    }));
   }
  }
  
  Esign(orgId,loanId,id,retId){
    this.router.navigate([`payment/esign/`,orgId,loanId,id,retId]);
  }

  Udhyam(orgId,loanId,custId,retId){
    this.router.navigate([`udyam/udyam/`,orgId,loanId,custId,retId]);
  }
}




