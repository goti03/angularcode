import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../core/api.service";
import { breadcrumbMessage } from "../../shared/breadcrumb-message.service";
import * as moment from 'moment/moment.js';
import { ExcelService } from '..//..//shared/excel.service';
import { PdfService } from '..//..//shared/pdf.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from '../../shared/currency.service'
import { Crypto } from '../../shared/crypto.service';
import { types } from 'util';
import { data } from '../../dashboards/dashboard3/smart-data-table';

@Component({
  selector: 'anchor-list',
  templateUrl: './anchor-list.component.html',
  styleUrls: ['./anchor-list.component.css']
})

export class AnchorList implements OnInit {
  status = [{ status: '1', name: 'Active' }, { status: '0', name: 'Inactive' }];
  searchPanNo;
  searchAnchorPanNo;
  anchorData1 = [];
  companyTypeList1 = [];
  companyRatingList1 = [];
  buyerList1 = [];
  buyerList2: any;
  resultVallue1: any;
  resultVallue2: any;
  HeaderDetails = [];
  R1Details = [];
  R1Summary = [];
  loanId: any;
  orgId: any;

  showAnger: boolean;
  stausId: any;
  substatusId: any;
  subStatusid: any;
  programId: any;
  statusFlow: any;
  mobileNo: any;
  checkListStatus: any;
  customerId: any;
  lenderId: any;
  errorMSG: any;
  newPan: any;
  p: number = 1;
  q1: number = 1;
  closeResult = "";
  userId: any;
  getBeneIdList1: Array<any> = [];
  R2Details: Array<any> = [];
  R2Summary: Array<any> = [];
  type: any;
  bankBeneId: any;
  anchorData2: any;
  companyTypeList2: any;
  companyRatingList2: any;
  newPan2: any;
  getBeneIdList2: Array<any> = [];
  message: string;
  title: string;
  stage: number;
  bankId: any;
  accountNo: any;
  accountTypeId: any;
  accountHolderName: any;
  IFSCCode: any;
  ifscMatch = new RegExp("^[A-Za-z]{4}0[A-Z0-9]{6}$");
  beneName: any;
  beneMobile: any;
  beneMail: any;
  beneDocname: any;
  beneDoc: any;
  id: any;
  addNew: boolean;
  beneId1: any;
  buyerName: any;
  buyerorgId: any;
  accountType: any;
  bankName: any;

  constructor(private set: breadcrumbMessage, private apiService: ApiService, private route: ActivatedRoute, private router: Router, private crypto: Crypto,
    public excelservice: ExcelService, public pdfservice: PdfService, private modalService: NgbModal, private currency: Currency) { }

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  preventTyping() {
    return false;
  }
  ngOnInit() {

    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.loanId = this.route.snapshot.params['loanid'];
    this.orgId = this.route.snapshot.params['orgId'];
    this.route.queryParams.subscribe(params => {
      this.nonStopFlag = params['nonStopFlag'];
    });
    this.type = 1;
    this.apiService.getAccountTypeList().subscribe(res => this.accountType = res.result);
    this.apiService.getBankNameList().subscribe(res => this.bankName = res.result);

    this.apiService.getR1DataList(this.orgId, 1).subscribe(data => {
      if (data.status == 200) {
        this.R1Details = data.result.R1Details;
        this.R1Summary = data.result.R1Summary;
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });

    this.apiService.getR2DataList(this.orgId).subscribe(data => {
      if (data.status == 200) {
        this.R2Details = data.result.R2Details;
        this.R2Summary = data.result.R2Summary;
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
        this.orgId = this.HeaderDetails[0].orgId;
      });

    this.apiService.getAnchorsOverallData(this.loanId, 1).subscribe(data => {
      if (data.status == 200) {
        this.anchorData1 = data.result.anchorData;
        this.companyTypeList1 = data.result.companyTypeData;
        this.companyRatingList1 = data.result.ratingData;
        this.getBeneIdList1 = data.result.beneData;
        this.bankBeneId = this.anchorData1[0].bankBeneId
        console.log("companyRatingList::" + JSON.stringify(this.companyRatingList1));
        console.log("companyTypeList::" + JSON.stringify(this.companyTypeList1));
      }
      console.log("getAnchorsOverallData ::" + data);
      console.log("anchordata" + this.anchorData1);
    });
    this.apiService.getAnchorsOverallData(this.loanId, 2).subscribe(data => {
      if (data.status == 200) {
        this.anchorData2 = data.result.anchorData;
        this.buyerName = this.anchorData2[0].buyerName;
        console.log("buyerName" + this.buyerName);
        this.companyTypeList2 = data.result.companyTypeData;
        this.companyRatingList2 = data.result.ratingData;
        this.getBeneIdList2 = data.result.beneData;
        this.buyerorgId = this.anchorData2[0].orgId;
        console.log(" this.buyerorgId" + this.buyerorgId);
        for (let a of this.anchorData2) {
          this.buyerorgId = a.orgId;
          this.apiService.getBeneIdList(this.buyerorgId, this.loanId).subscribe(data => {
            if (data.status == 200) {
              a.getBeneIdList2 = data.result.list;
            }
          });

        }
        console.log("companyRatingList::" + JSON.stringify(this.companyRatingList2));
        console.log("companyTypeList::" + JSON.stringify(this.companyTypeList2));
      }
      console.log("getAnchorsOverallData ::" + data);
      console.log("anchordata" + this.anchorData2);

    });

    this.apiService.getBuyersList(this.orgId, 1).subscribe(data => {
      if (data.status == 200) {
        this.buyerList1 = data.result;
        if (this.buyerList1.length > 0) {
          this.showAnger = true;
        } else {
          this.showAnger = false;
        }
        this.apiService.getResultValueList(this.loanId, 1).subscribe(data => {
          if (data.status == 200 && data.result.resultValue) {
            this.resultVallue1 = data.result.resultValue;
            if (this.resultVallue1 != null && this.resultVallue1 != undefined) {
              var temp = this.resultVallue1.split(",");
              var checkbox = document.getElementsByName("check");
              // alert("temp.length::"+temp.length);
              for (let i = 0; i < this.buyerList1.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  // console.log( "buyerPan:: "+this.buyerList[i].buyerPan + "  temp:: "+ temp[j]);
                  if (this.buyerList1[i].buyerPan == temp[j]) {
                    this.buyerList1[i].Checkflag = '1'; 1
                    console.log("buyerPan:: " + this.buyerList1[i].buyerPan + "  temp:: " + temp[j]);
                    break;
                    // var id="check_"+i;
                    // alert( "buyerPan:: "+this.buyerList[i].buyerPan + "  temp:: "+ temp[j]);
                    // (document.getElementById(id) as HTMLInputElement).checked = true;
                    // break;
                  } else {
                    this.buyerList1[i].Checkflag = 0;
                  }
                }
              }
            }
          }
          console.log(" this.buyerList::" + JSON.stringify(this.buyerList1));
        }, error => console.log(error));
      }
    }, error => console.log(error));
    this.apiService.getBuyersList(this.orgId, 2).subscribe(data => {
      if (data.status == 200) {
        this.buyerList2 = data.result;
        if (this.buyerList2.length > 0) {
          this.showAnger = true;
        } else {
          this.showAnger = false;
        }
        this.apiService.getResultValueList(this.loanId, 2).subscribe(data => {
          if (data.status == 200 && data.result.resultValue) {
            this.resultVallue2 = data.result.resultValue;
            if (this.resultVallue2 != null && this.resultVallue2 != undefined) {
              var temp = this.resultVallue2.split(",");
              var checkbox = document.getElementsByName("check");
              // alert("temp.length::"+temp.length);
              for (let i = 0; i < this.buyerList2.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  // console.log( "buyerPan:: "+this.buyerList[i].buyerPan + "  temp:: "+ temp[j]);
                  if (this.buyerList2[i].buyerPan == temp[j]) {
                    this.buyerList2[i].Checkflag = '1';
                    console.log("buyerPan:: " + this.buyerList2[i].buyerPan + "  temp:: " + temp[j]);
                    break;
                    // var id="check_"+i;
                    // alert( "buyerPan:: "+this.buyerList[i].buyerPan + "  temp:: "+ temp[j]);
                    // (document.getElementById(id) as HTMLInputElement).checked = true;
                    // break;
                  } else {
                    this.buyerList2[i].Checkflag = 0;
                  }
                }
              }
            }
          }
          console.log(" this.buyerList::" + JSON.stringify(this.buyerList2));
        }, error => console.log(error));
      }
    }, error => console.log(error));
  }
  onNewtabClick(event) {
    console.log("index" + event.tab.index);
    if (event.tab.textLabel == "Account Receivable (AR)") {
      this.type = 1;
      console.log("types in type" + this.type);
    } else if (event.tab.textLabel == "Account Payable (AP)") {
      this.type = 2;
      console.log("types in type" + this.type);
    }
  }

  excel() {
    var list = [];
    var j = 1;
    for (let i of this.anchorData1) {
      const listObj = {
        'Sno': (j++),
        'Pan No': i.panNo,
        'Anchor Name': i.buyerName,
        'beneId': i.beneId,
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
  excel1() {
    var list = [];
    var j = 1;
    for (let i of this.anchorData2) {
      const listObj = {
        'Sno': (j++),
        'Pan No': i.panNo,
        'Anchor Name': i.buyerName,
        'Bene Details': i.beneId,
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
        'Sno', 'Pan No', 'Anchor Name', 'beneId', 'Company Type',
        'Company Rating', 'Funding %age', 'Escrow A/c No', 'Limit Usage',
        'Amount', 'Tenure', 'ROI', 'Since', 'No of Invoices', 'Invoice Amount', 'Gst Register Date',
        'Status',],
      ...this.anchorData1.map(i => ([j++, i.panNo, i.beneId, i.buyerName, i.companyTypeName, i.rateName, i.fundingPercentage, i.vaNumber, '', '', '', '',
      i.startDate, i.totalInvoices, i.invoiceValue, i.gstRegisterDate, (i.isAnchorActive == 1) ? ' Active' : 'Inactive',]))
    ]
    this.pdfservice.pdf(body, title, 'A3');
  }
  pdf1() {
    var j = 1;
    var title = "dashboard_invoiceList";
    var body = [
      [
        'Sno', 'Pan No', 'Anchor Name', 'Bene_ID', 'Company Type',
        'Company Rating', 'Funding %age', 'Escrow A/c No', 'Limit Usage',
        'Amount', 'Tenure', 'ROI', 'Since', 'No of Invoices', 'Invoice Amount', 'Gst Register Date',
        'Status',],
      ...this.anchorData2.map(i => ([j++, i.panNo, i.buyerName, i.beneId, i.companyTypeName, i.rateName, i.fundingPercentage, i.vaNumber, '', '', '', '',
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
  DownloadR2Summary() {
    var list = [];
    var j = 1;
    for (let f of this.R2Summary) {

      const listObj = {
        'Sno': j++,
        'PANNO': f.panNo,
        'InvoiceValue': this.indianCurrency(f.invoiceValue),
        'NoofInvoices': f.NoOfInvoice,
        'Start_date': f.StartDate,
        'gstRegisterDate': f.GstregisterDate
      }

      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, this.orgId + '_R2A_Summary');
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

      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, this.orgId + '_R1_data');
  }
  DownloadR2Data() {

    var list = [];
    var j = 1;
    for (let d of this.R2Details) {
      const listObj = {
        'Sno': (j++),
        'Buyer_gst': d.buyerGst,
        'MONTH': d.month,
        'YEAR': d.year,
        'InvoiceValue': this.indianCurrency(d.invoiceValue),
        'NoofInvoices': d.NoOfInvoice,
      }

      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list, this.orgId + '_R2A_data');
  }
  nonStopFlag: any;
  goToList() {
    if (this.nonStopFlag == 0) {
      this.router.navigate(['/report/loanRequestList'], { queryParams: { 'loanId': this.loanId, 'nonStopFlag': '0' } });
    } else {
      this.router.navigate(['/report/draftLoanRequestList'], { queryParams: { 'loanId': this.loanId, 'nonStopFlag': '1' } });
    }
  }
  beneId(data) {
    for (let a of this.getBeneIdList1) {
      if (a.bankBeneId == data) {
        this.anchorData1[0].bankBeneId = data;
      }
    }
  }
  beneId2(data) {
    for (let a of this.getBeneIdList2) {
      if (a.bankBeneId == data) {
        this.anchorData2[0].bankBeneId = data;
      }
    }
  }
  updateFundingLimit() {
    var arrayList = [];
    let count = true;
    // let update = false;
    let update = true;
    for (let a of this.anchorData1) {
      if (a.validation == 1) {
        if (a.startDate == '') {
          a.startDate = null;
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
        anchorData: this.anchorData1,
        type: 1,

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
  }
  updateFundingLimit1() {
    var arrayList = [];
    let count = true;
    // let update = false;
    let update = true;
    for (let a of this.anchorData2) {
      if (a.validation == 1) {
        if (a.startDate == '') {
          a.startDate = null;
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
        anchorData: this.anchorData2,
        type: 2,

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
  }
  saveBuyer1() {
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
    formData.append('panNumbers', this.resultVallue1);
    formData.append('loanId', this.loanId);
    formData.append('type', this.type);
    this.apiService.saveResultValue(formData).subscribe(data => {

      if (data.status == 200) {
        this.set.setOption("Result Value Updated Successfully", true);

        // alert("Result Value Updated Successfully");
      } else {
        this.set.setOption("Update failed", false);

        // alert("Update Failed");
      }
    }, error => console.log(error));
  }
  saveBuyer2() {
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
    formData.append('panNumbers', this.resultVallue2);
    formData.append('loanId', this.loanId);
    formData.append('type', this.type);
    this.apiService.saveResultValue(formData).subscribe(data => {

      if (data.status == 200) {
        this.set.setOption("Result Value Updated Successfully", true);
      } else {
        this.set.setOption("Update failed", false);
      }
    }, error => console.log(error));
  }
  getCheckedPanNo1(b: any, content) {
    if (b.Checkflag == 1 || b.Checkflag == true) {
      for (let a of this.anchorData1) {
        if (b.buyerPan == a.panNo) {
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
    } else {
      b.Checkflag = 1;
    }
    var checkbox = document.getElementsByName("check");
    var temArray = [];
    for (let a of this.buyerList1) {
      if (a.Checkflag == 1) {
        temArray.push(a.buyerPan);
      }
    }
    this.resultVallue1 = temArray.join(",");
  }
  getCheckedPanNo2(b: any, content) {
    if (b.Checkflag == 1 || b.Checkflag == true) {
      for (let a of this.anchorData2) {
        if (b.buyerPan == a.panNo) {
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
    } else {
      b.Checkflag = 1;
    }
    var checkbox = document.getElementsByName("check");
    var temArray = [];
    for (let a of this.buyerList2) {
      if (a.Checkflag == 1) {
        temArray.push(a.buyerPan);
      }
    }
    this.resultVallue2 = temArray.join(",");
  }
  validateNewPan1(panNo) {
    var count = 0;
    if (this.resultVallue1 == undefined || this.resultVallue1 == null || this.resultVallue1 == '') {
      return false;
    } else {
      var temp = this.resultVallue1.split(",");
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
  validateNewPan2(panNo) {
    var count = 0;
    if (this.resultVallue2 == undefined || this.resultVallue2 == null || this.resultVallue2 == '') {
      return false;
    } else {
      var temp = this.resultVallue2.split(",");
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
  addPan1() {

    // alert(this.newPan)
    const data = {
      // orgId:this.orgId,
      loanId: this.loanId,
      panCard: this.newPan,
      type: 1
      // invoiceAmount:this.newInvoice
    };
    this.errorMSG = "";
    //validation
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (this.newPan == null || this.newPan == undefined) {
      this.errorMSG = "PAN Number is Required";
      this.set.setOption(this.errorMSG, false);
    } else if (!regex.test(this.newPan.toUpperCase())) {
      this.errorMSG = "Invalid PAN Number";
      this.set.setOption(this.errorMSG, false);
    } else if (this.validateNewPan1(this.newPan)) {
      this.errorMSG = "PAN Number already Exists";
      this.set.setOption(this.errorMSG, false);
    } else {
      //insert
      this.apiService.saveAnchorDetails(data).subscribe(data => {
        if (data.status == 200) {
          this.newPan = ''
        } else {
          // this.set.setOption("Failed To Upload New Anchor",false);
          this.errorMSG = "Can't Find the Shortlisted Anchors,Please Run the GSTN Rule ";
          this.set.setOption(this.errorMSG, false);

        }
      }, error => console.log(error));



      //render

      this.apiService.getBuyersList(this.orgId, 1).subscribe(data => {
        if (data.status == 200) {
          this.buyerList1 = data.result;
          this.apiService.getResultValueList(this.loanId, 1).subscribe(data => {
            if (data.status == 200 && data.result.resultValue) {
              this.resultVallue1 = data.result.resultValue;
              var temp = this.resultVallue1.split(",");
              for (let i = 0; i < this.buyerList1.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  if (this.buyerList1[i].buyerPan == temp[j]) {
                    this.buyerList1[i].Checkflag = '1';
                    console.log("buyerPan:: " + this.buyerList1[i].buyerPan + "  temp:: " + temp[j]);
                    break;
                  } else {
                    this.buyerList1[i].Checkflag = 0;
                  }
                }
              }
            }
            console.log(" this.buyerList::" + JSON.stringify(this.buyerList1));
          }, error => console.log(error));
        }
      }, error => console.log(error));
    }
  }
  addPan2() {

    // alert(this.newPan)
    const data = {
      // orgId:this.orgId,
      loanId: this.loanId,
      panCard: this.newPan2,
      type: 2
      // invoiceAmount:this.newInvoice
    };
    this.errorMSG = "";
    //validation
    // this.gstmatch = new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$");
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (this.newPan2 == null || this.newPan2 == undefined) {
      this.errorMSG = "PAN Number is Required";
      this.set.setOption(this.errorMSG, false);
    } else if (!regex.test(this.newPan2.toUpperCase())) {
      this.errorMSG = "Invalid PAN Number";
      this.set.setOption(this.errorMSG, false);
    } else if (this.validateNewPan2(this.newPan2)) {
      this.errorMSG = "PAN Number already Exists";
      this.set.setOption(this.errorMSG, false);
    } else {
      //insert
      this.apiService.saveAnchorDetails(data).subscribe(data => {
        if (data.status == 200) {
          this.newPan2 = ''
        } else {
          // this.set.setOption("Failed To Upload New Anchor",false);
          this.errorMSG = "Can't Find the Shortlisted Anchors,Please Run the GSTN Rule ";
          this.set.setOption(this.errorMSG, false);

        }
      }, error => console.log(error));



      //render

      this.apiService.getBuyersList(this.orgId, 2).subscribe(data => {
        if (data.status == 200) {
          this.buyerList2 = data.result;
          this.apiService.getResultValueList(this.loanId, 2).subscribe(data => {
            if (data.status == 200 && data.result.resultValue) {
              this.resultVallue2 = data.result.resultValue;
              var temp = this.resultVallue2.split(",");
              for (let i = 0; i < this.buyerList2.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  if (this.buyerList2[i].buyerPan == temp[j]) {
                    this.buyerList2[i].Checkflag = '1';
                    console.log("buyerPan:: " + this.buyerList2[i].buyerPan + "  temp:: " + temp[j]);
                    break;
                  } else {
                    this.buyerList2[i].Checkflag = 0;
                  }
                }
              }
            }
            console.log(" this.buyerList::" + JSON.stringify(this.buyerList2));
          }, error => console.log(error));
        }
      }, error => console.log(error));
    }
  }
  generateAnchorProfile() {

    this.apiService.generateAnchorProfile(this.loanId, this.userId, 1)
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
  generateAnchorProfile1() {

    this.apiService.generateAnchorProfile(this.loanId, this.userId, 2)
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

  checkChanges1(f: any) {
    // if (f.ratingId == 0 && f.ratingCompanyTypeId == 0) {
    //   f.validation = 0;
    // } else {
    f.validation = 1;
    // }
  }
  checkChanges2(f: any) {
    // if (f.ratingId == 0 && f.ratingCompanyTypeId == 0) {
    //   f.validation = 0;
    // } else {
    f.validation = 1;
    // }
  }
  setFundingPercentage1(index: any, f: any) {
    // if(f.panNo.substring(3,4) != 'C' || f.panNo.substring(3,4) != 'L'){
    //   f.fundingPercentage = 'NIL';
    //   return;
    // }
    f.fundingPercentage = (f.fundingPercentage == null || f.fundingPercentage == '') ? 'NIL' : f.fundingPercentage;
    this.checkChanges1(f);
    for (let r of this.companyRatingList1) {
      if (f.ratingId != 0 && r.raingId == f.ratingId) {
        f.fundingPercentage = r.fundingPercentage;
        f.validation = 1;
      }
    }
  }
  setFundingPercentage2(index: any, f: any) {
    // if(f.panNo.substring(3,4) != 'C' || f.panNo.substring(3,4) != 'L'){
    //   f.fundingPercentage = 'NIL';
    //   return;
    // }
    f.fundingPercentage = (f.fundingPercentage == null || f.fundingPercentage == '') ? 'NIL' : f.fundingPercentage;
    this.checkChanges2(f);
    for (let r of this.companyRatingList2) {
      if (f.ratingId != 0 && r.raingId == f.ratingId) {
        f.fundingPercentage = r.fundingPercentage;
        f.validation = 1;
      }
    }
  }

  top1(b) {
    this.p = 1;
    this.apiService.getBuyersList(this.orgId, this.type).subscribe(data1 => {
      if (data1.status == 200) {
        this.buyerList1 = data1.result;
        this.apiService.getResultValueList(this.loanId, this.type).subscribe(data => {
          if (data.status == 200 && data.result.resultValue) {
            this.resultVallue1 = data.result.resultValue;
            var temp = this.resultVallue1.split(",");
            for (let i = 0; i < this.buyerList1.length; i++) {
              for (let j = 0; j < temp.length; j++) {
                if (this.buyerList1[i].buyerPan == temp[j]) {
                  this.buyerList1[i].Checkflag = '1';
                  console.log("buyerPan:: " + this.buyerList1[i].buyerPan + "  temp:: " + temp[j]);
                  break;
                } else {
                  this.buyerList1[i].Checkflag = 0;
                }
              }
            }

            // sorting
            if (b == 0) {
              b = this.buyerList1.length;
            }
            var list = this.buyerList1;
            this.buyerList1 = [];
            list.sort(function (c, d) { return Number(d.invoiceValue) - Number(c.invoiceValue) });
            if (b == 5) {
              var list1 = list.filter((a) => a.buyerPan.substring(3, 4) != 'P');
              list = list1;
            }
            if (list.length != 0) {
              for (var a = 0; a < b && a < list.length; a++) {
                this.buyerList1.push(list[a]);
              }
            } else {
              this.set.setOption("No Data Available", false);
            }


          } else if (!data.result.resultValue) {
            this.set.setOption("Data is not available", false);
          }
          console.log(" this.buyerList::" + JSON.stringify(this.buyerList1));
        }, error => console.log(error));
      } else {
        this.set.setOption(data1.exceptionMessage, false);
      }
    }, error => console.log(error));

  }
  top2(b) {
    this.p = 1
    this.apiService.getBuyersList(this.orgId, this.type).subscribe(data1 => {
      if (data1.status == 200) {
        this.buyerList2 = data1.result;
        this.apiService.getResultValueList(this.loanId, this.type).subscribe(data => {
          if (data.status == 200 && data.result.resultValue) {
            this.resultVallue2 = data.result.resultValue;
            var temp = this.resultVallue2.split(",");
            for (let i = 0; i < this.buyerList2.length; i++) {
              for (let j = 0; j < temp.length; j++) {
                if (this.buyerList2[i].buyerPan == temp[j]) {
                  this.buyerList2[i].Checkflag = '1';
                  console.log("buyerPan:: " + this.buyerList2[i].buyerPan + "  temp:: " + temp[j]);
                  break;
                } else {
                  this.buyerList2[i].Checkflag = 0;
                }
              }
            }

            // sorting
            if (b == 0) {
              b = this.buyerList2.length;
            }
            var list = this.buyerList2;
            this.buyerList2 = [];
            list.sort(function (c, d) { return Number(d.invoiceValue) - Number(c.invoiceValue) });
            if (b == 5) {
              var list1 = list.filter((a) => a.buyerPan.substring(3, 4) != 'P');
              list = list1;
            }
            if (list.length != 0) {
              for (var a = 0; a < b && a < list.length; a++) {
                this.buyerList2.push(list[a]);
              }
            } else {
              this.set.setOption("No Data Available", false);
            }


          } else if (!data.result.resultValue) {
            this.set.setOption("Data is not available", false);
          }
          console.log(" this.buyerList::" + JSON.stringify(this.buyerList2));
        }, error => console.log(error));
      } else {
        this.set.setOption(data1.exceptionMessage, false);
      }
    }, error => console.log(error));

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

  tab: boolean = false;
  toggle() {
    this.tab = !this.tab;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  add() {
    this.message = '';
    if (this.stage == 1) {

      if (this.isNullorUndefinedorEmpty(this.buyerName)) {
        this.message = 'Choose an Organisation Name';
        return;
      }
      if (this.buyerorgId == 'orgId') {
        this.message = 'Choose a particular Organization';
        return;
      }
      this.title = 'Add Bank Details';
    } else if (this.stage == 2) {
      if (this.isNullorUndefinedorEmpty(this.bankId)) {
        this.message = "Please enter a Bank Name";
        return;
      } else if (this.isNullorUndefinedorEmpty(this.accountNo)) {
        this.message = "Please enter a Account Number";
        return;
      } else if (this.isNullorUndefinedorEmpty(this.accountTypeId)) {
        this.message = "Please enter a Account Type";
        return;
      } else if (this.isNullorUndefinedorEmpty(this.accountHolderName)) {
        this.message = "Please enter a Account Holder Name";
        return;
      } else if (this.isNullorUndefinedorEmpty(this.IFSCCode) || !this.ifscMatch.test(this.IFSCCode)) {
        this.message = "Please enter a Valid IFSC Code";
        return;
      } else if (this.set.validateSpecialChar(this.accountHolderName)) {
        this.message = "Special Character Not Allowed";
        return;
      }
      this.title = 'Add Beneficiary Details';
    } else if (this.stage == 3) {
      if (this.isNullorUndefinedorEmpty(this.beneId)) {
        this.message = "Please enter a Beneficiary Id";
        return;
      } else if (this.isNullorUndefinedorEmpty(this.beneName)) {
        this.message = "Please enter a Beneficiary Name";
        return;
      } else if ((this.isNullorUndefinedorEmpty(this.beneMobile)) || (this.beneMobile.length != 10)) {
        this.message = "Please enter a valid Beneficiary Phone";
        return;
      } else if (this.isNullorUndefinedorEmpty(this.beneMail)) {
        this.message = "Please enter a Beneficiary Mail";
        return;
      } else if (this.set.validateSpecialChar(this.beneName)) {
        this.message = "Special Character Not Allowed";
        return;
      } else {
        this.accountNo = this.accountNo.toUpperCase();
        this.IFSCCode = this.IFSCCode.toUpperCase();
        const data = {

          bankId: this.bankId,
          accountNo: this.accountNo,
          accountType: this.accountTypeId,
          accountHolderName: this.accountHolderName,
          IFSCCode: this.IFSCCode,
          beneId: this.beneId1,
          orgId: this.buyerorgId.toString(),
          beneName: this.beneName,
          beneMail: this.beneMail,
          beneMobile: this.beneMobile,
          modifiedOn: moment().format('YYYY-MM-DD HH:mm:ss'),
          modifiedBy: this.userId,
          fileName: this.beneDocname,
          fileContent: this.beneDoc,
          id: this.id,
          type:this.type,
          loanRequestId:Number(this.loanId)
        };
        this.modalService.dismissAll();
        this.apiService.insertDistributerBankDetails(data).subscribe(data => {
          if (data.status == 200) {
            this.set.setOption("Bank Data Added Successfully.", true);
            this.ngOnInit();
          } else {
            // this.message = "Failed To Upload";
            this.set.setOption(data.exceptionMessage, false);
            this.ngOnInit();
          }
          this.bankId = "";
          this.accountNo = '';
          this.accountTypeId = '';
          this.accountHolderName = '';
          this.IFSCCode = '';
          this.beneId1 = '';
          this.beneName = '';
          this.beneMail = '';
          this.beneMobile = '';
          this.id = '';
          this.addNew = false;
          this.buyerorgId = 'orgId';
          this.ngOnInit();
        });

      }
    }
    this.stage++;
  }

  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }

  openPopup(content, f) {

    this.bankId = "";
    this.accountNo = '';
    this.accountTypeId = '';
    this.accountHolderName = '';
    this.IFSCCode = '';
    this.beneId1 = '';
    this.beneName = '';
    this.beneMail = '';
    this.beneMobile = '';
    this.id = '';
    this.addNew = true;
    this.buyerName = f.buyerName;
    console.log("orgid" + f.buyerName);
    this.buyerorgId = f.orgId;
    console.log("orgid" + f.orgId);
    this.stage = 1;
    this.title = 'Choose Organization';
    this.openPopup1(content);
  }

  openPopup1(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ext(filename) {
    return filename.split('.').pop();
  }
  uploadfilearray(file) {
    var a;
    var ext = this.ext(file[0].name);
    if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'pdf') {
      let reader = new FileReader();
      reader.readAsDataURL(file[0])
      reader.onload = () => {
        console.log("reader.result::" + file[0].name);
        a = reader.result;
        this.beneDoc = a.split(',')[1];
        this.beneDocname = file[0].name;
      }
    } else {
      this.set.setOption("Please choose Image or PDF Files", false);
      const files = <HTMLInputElement>document.getElementById('beneDoc');
      files.value = "";
    }

  }


}
