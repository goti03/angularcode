import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gemConstant, retailerConstant, nonSoleProp, sellerConstant } from '../../core/constant';
import { ApiService } from '../../core/api.service';
import { ExcelService } from '../excel.service';
import { breadcrumbMessage } from '../breadcrumb-message.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment.js';
import { lender } from '../../../environments/environment';
import { Currency } from '../currency.service';
import { environment } from '../../../environments/environment.jana.prod';
import { lenderconfiguration } from '../../../environments/lender.config';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-action-tab',
  templateUrl: './action-tab.component.html',
  styleUrls: ['./action-tab.component.css']
})
export class ActionTabComponent implements OnInit {

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  ugroLenderId = lender.UGRO;
  gemProgramTypeId = gemConstant.gemProgramTypeId;
  retailerProgramTypeId = retailerConstant.retailerProgramTypeId;
  PAN_Verification_Fail = retailerConstant.PAN_Verification_Fail;
  sellerProgramTypeId = sellerConstant.sellerProgramTypeId;
  Loand_Docs_Uploaded_to_Filenet_Pending = nonSoleProp.Loand_Docs_Uploaded_to_Filenet_Pending;
  Application_Form_Update_Pending = nonSoleProp.Application_Form_Update_Pending;

  actions : any;
  roleId : any;
  orgId: any;
  readRole:boolean;
  panNo: any;
  isLive: boolean;
  applicationDetails: any[];
  applicantDetails: any[];
  lenderId: any;
  lenderIdp:any;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  stateList: any;
  customerName: any;
  err:boolean;
  errorMsg:any;
  mobileNo: any;
  emailId: any;
  address: any;
  env:any;
  ltype:any;
  loanIdl:any;
  city: any;
  state: any;
  pincode: any;
  HeaderDetails: any;
  lenderList: any;
  newLender: any;
  newProgram: any;
  userId:any;
  nonStopFlag : any;
  isLender: any;
  programList: any = [];
  npaDate:any;
  todayDate:any;
  npaDateFlag:any;
  errorMSG:any;
  constructor(private router: Router, private apiService : ApiService,private crypto: Crypto,
     private excelService: ExcelService, public set: breadcrumbMessage, private modalService: NgbModal, private currency : Currency) { }

  preventTyping() {
  return false;
  }
  ngOnInit() {
    this.env=lenderconfiguration.env;
    this.err=false;
    this.readRole=false;
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
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
  
    this.lenderIdp=Number(this.crypto.decryt(window.localStorage.getItem('lenderId')));
    if(this.roleId==1||this.roleId==3||this.roleId==6){
      this.isLender="";
    }else if(this.roleId==13||this.roleId==14||this.roleId==7){
      this.isLender="1";
    }else if(this.roleId==4||this.roleId==5||this.roleId==8) {
      this.isLender="0";
    }
    this.orgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.actions = JSON.parse(window.localStorage.getItem('actionData'));
    this.nonStopFlag = this.crypto.decryt(window.localStorage.getItem('nonStopFlag'));
    this.loanid=this.actions.loanReqId;
    console.log(""+this.actions);
    
  }

  indianCurrency(amount){
    return this.currency.indianCurrency(amount);
  }

  overviewDetails(id: number, loanid: number) {
    console.log("id==" + id + "loanid==" + loanid);
    // console.log("requestList.length==" + this.requestList);
    this.router.navigate(['report/overview', id, loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  cashflowDetails(id: number, loanid: number) {
    this.router.navigate(['report/cashflow', id, loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  summaryReportDetails(id: number, loanid: number) {
    this.router.navigate(['report/summary', id, loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  cicReportDetails(id: number, loanid: number) {
    this.router.navigate(['report/cicReport', id, loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  ReportDetails(id: number, loanid: number) {
    this.router.navigate(['report/tab', id, loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  camGstDetails(id: number, loanid: number, orgId: number, retailerId: number, programTypeId: number) {
    this.router.navigate(['report/camgstsummary'],{ queryParams: { 'customerId':id,'loanId':loanid,
    'orgId':orgId,'retailerId':retailerId,'programTypeId':programTypeId,'nonStopFlag' :this.nonStopFlag }});
  }
  applicationFrom(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/applicationFrom', id, loanid, orgId, retailerId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  checklist(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/checklist', id, loanid, orgId, retailerId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  viewdocument(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/viewDocuments'],{ queryParams: { 'customerId':id,'loanId':loanid,
    'orgId':orgId,'retailerId':retailerId,'nonStopFlag' :this.nonStopFlag }});
  }
  loandisbursal(id: number, loanid: number, orgId: number, retailerId: number, digital: number) {
    this.router.navigate(['report/loandisbursal'],{ queryParams: { 'customerId':id,'loanId':loanid,
    'orgId':orgId,'digital':digital,'nonStopFlag' :this.nonStopFlag }});
  }
  gemdisbursal(id: number, loanid: number, orgId: number, retailerId: number, digital: number) {
    this.router.navigate(['report/gemdisbursal', id, loanid, orgId, retailerId, digital],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  statementAccount(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/statementAccount', id, loanid, orgId, retailerId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  action(loanid: number, subStatus: number, programTypeId: number, orgId: number) {
    this.router.navigate(['report/action'],{ queryParams: { 'loanId':loanid,
    'orgId':orgId,'programTypeId':programTypeId,'nonStopFlag' :this.nonStopFlag }});
  }
  uploadDocuments(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/uploadDocuments', id, loanid, orgId, retailerId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  sallerLoanForm(loanid: number) {
    this.router.navigate(['report/sallerLoanForm', loanid],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  updateGSTN(loanid: number, orgId: number) {
    this.router.navigate(['report/UpdateGSTn', loanid, orgId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  gst3b(loanid: number, orgId: number) {
    this.router.navigate(['/gst/gst3b', loanid, orgId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}})
  }
  gstr1(loanid: number, orgId: number) {
    this.router.navigate(['/gst/gstr1', loanid, orgId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}})
  }
  downloadSupplierExcel(loanId: any) {
    this.apiService.generateSupplierExcel(loanId).subscribe(res => {
      this.excelService.exportAsExcelFile(res.result, loanId + '_Supplier_Report');
    }, error => console.log(error));

  }
  openAnchorPopup(content, orgId, loanId) {
    this.router.navigate(['report/anchorUpdate', loanId, orgId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  updateLoanStatus(loanid: number, programTypeId: number, orgId: number) {
    this.router.navigate(['report/updateLoanStatus', loanid, programTypeId, orgId ],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  extentLoan(loan:any,orgId:any,program:any,flag:any,mappingType:any){
    const data = {
      loanId: loan,
      orgId: orgId,
      programId:program ,
      flag:flag,
      mappingType:mappingType,
      userId:this.userId
    }
    this.apiService.createNewLoan(data).subscribe(data => {
      if (data.status == 200 && data.exceptionOccured=='N') {
        var loanid = data.result;
        this.set.setOption("Successfully Updated", true);
        this.ngOnInit();
        // this.router.navigate(['report/loanRequestList', loanid]);
        // this.modalService.dismissAll();
      } else {
        this.set.setOption(data.exceptionMessage, false);
        // this.modalService.dismissAll();
      }
    });
  }
  registerNACH(id: number, loanid: number, orgId: number, programTypeId: number) {
    this.router.navigate(['report/uploadNachForm', id, loanid, orgId, programTypeId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  closeResult = '';
  loanid : any;
  programId : any;
  sactionDatePopup(loanId: number, content,programId) {
    this.loanid = loanId;
    this.programId=programId;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  sanctionDate : any;
  saveSanctionDate() {
    const data = {
      loanId: this.loanid,
      sanctionDate: this.sanctionDate,
      programId:this.programId
    }
    this.apiService.saveSanctionDate(data).subscribe(res => {
      if (res.status == 200) {
        this.set.setOption("Sanction Date Updated Successfully", true);
        //alert("Sanction Date Updated Successfully");
        //window.location.reload();
        this.ngOnInit();
        this.modalService.dismissAll();
      } else {
        this.set.setOption(res.exceptionMessage, false)
        // alert(res.exceptionMessage);
      }
    }, error => console.log(error));
  }
  update2AData(loanId: any, orgId: any) {
    this.router.navigate(['gst/update2AData', loanId, orgId],{ queryParams: {'nonStopFlag' :this.nonStopFlag}});
  }
  downloadSOA(e) {
    const data1 = {
      "currentActivityId": "25",
      "lastActivityTime": moment().format('YYYY-MM-DD HH:mm:ss'),
      "loanRequestId":this.loanIdl,
      "userId": this.userId,
      "userMedium": "backendApp",
      "from": moment().format('DD-MM-YYYY'),
      "to": moment().format('DD-MM-YYYY'),
      "fileType": e,
      "isLender":this.ltype
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

  updateApplicationDetails(content, loanId, programTypeId, orgId, panNo, lenderId,approvalStatus) {
    this.loanid = loanId;
    this.orgId = orgId;
    this.panNo = panNo;
    this.isLive=(approvalStatus=="Approved")?true:false;
    this.applicationDetails = [];
    this.applicantDetails = [];
        this.lenderId=lenderId;
    this.apiService.getStateList().subscribe(data => { this.stateList = data.result });
    this.apiService.getApplicationDetails(this.loanid).subscribe(data => {
      if (data.status == 200) {
        this.applicationDetails = data.result.applicationDetails;
        this.applicantDetails = data.result.applicantDetails;
        this.customerName = this.applicationDetails[0].customerName;
        this.mobileNo = this.applicationDetails[0].mobileNo;
        this.emailId = this.applicationDetails[0].emailId;
        this.address = this.applicationDetails[0].address;
        this.city = this.applicationDetails[0].city;
        this.state = this.applicationDetails[0].state;
        this.pincode = this.applicationDetails[0].pincode;
        // this.getAddressByPincode(this.pincode);
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
  getAddressByPincode(pincode: any) {
    throw new Error('Method not implemented.');
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
    const data = {
      applicationDetails: this.applicationDetails,
      applicantDetails: this.applicantDetails
    }
    this.apiService.saveApplicationDetails(this.loanid, data).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.exceptionMessage, true);
            if(this.lenderId==lender.UGRO){
        this.downloadLoanForm(5);
            }
      } else {
        this.ngOnInit();
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }
  downloadSOAPopup(content,ltype,loanId)
{this.ltype=ltype
  this.loanIdl=loanId
  this.modalService.open(content, { size: 'sm' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  downloadLoanForm(type: any) {
    this.apiService.downloadForm(this.loanid, 0, type).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
        } else {
          // window.open(data.result, '_blank');
          this.ngOnInit();
        }
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }
  programChange(content, loanId, programTypeId, orgId) {
    this.loanid = loanId;
    this.orgId = orgId;
    this.apiService.getLoanHeaderDetails(loanId)
      .subscribe(data => {
        if (data.status == 200) {
          this.HeaderDetails = data.result;
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
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
        flag:'1',
        userId:this.userId
      }
      this.apiService.createNewLoan(data).subscribe(data => {
        if (data.status == 200 && data.exceptionOccured=='N') {
          this.set.setOption(data.exceptionMessage, true);
          var loanid = data.result;
          this.ngOnInit();
          // this.router.navigate(['report/loanRequestList', loanid]);
          this.modalService.dismissAll();
        } else {
          this.set.setOption(data.exceptionMessage, false);
          this.modalService.dismissAll();
        }
      });
    }

  }

  hello()
  {
    this.modalService.dismissAll();
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
          // this.activitytable=false;
          this.closeTab();
        } else {
          this.ngOnInit();
          this.set.setOption(data.exceptionMessage, false);
          // this.activitytable=false;
          this.closeTab();
        }
      });
    }
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

  closeTab(){
    this.toggle.emit();
  }
  getprogramList(lenderId: any) {
    this.apiService.getProgramListUsingLenderId(lenderId).subscribe(data => {
      if (data.status == 200) {
        this.programList = data.result;
        this.programList=this.programList.filter((p)=>p.programTypeId!=1);
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));

  }
  toLoanpage(){
    if(this.nonStopFlag == 0){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.actions.loanReqId,'nonStopFlag':'0' }} );
    }else{
      this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.actions.loanReqId,'nonStopFlag':'1' }} );
    }
  }
  soareport(content,approvalStatus,loanreqid)
  {
   this.actions.approvalStatus = approvalStatus
   this.actions.loanReqId = loanreqid
   this.modalService.open(content, { size: 'sm' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  }
  updateProgram() {
   this.err=false;
   this.errorMsg="";
    if (this.isNullorUndefinedorEmpty(this.newProgram)) {
   this.err=true;
      this.errorMsg = "Please Choose Program";
    }else {
      const data = {
        loanId: this.loanid,
        orgId: this.orgId,
        programId: this.newProgram,
        anchorRecommdation:'0',
        userId: this.userId,
        currentActivityId: '65',
        userMedium: 'Backend',
        updateFlag:1
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
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' ||  str == null || str == undefined);
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
