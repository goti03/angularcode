import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "../../core/api.service";
import * as moment from 'moment/moment.js';
import { gemConstant, retailerConstant, sellerConstant, nonSoleProp, disbursalConstant } from '../../core/constant';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { Currency } from '../../shared/currency.service'
import { Crypto } from '../../shared/crypto.service';

@Component({
  selector: 'appdisbursal-action',
  templateUrl: './disbursal-action.component.html',
  styleUrls: ['./disbursal-action.component.css']
})
export class DisbursalActionComponent implements OnInit {
  disbursalId: any;
  disbursalInvoiceDetails: any;
  id: any;
  loanid: any;
  subStatusid: any;
  mobileNo: any;
  reasonList: any;
  Sidpid: any;
  loanActionstatus: any;
  HeaderDetails: any;
  pending: any;
  completed: any;
  programTypeId: any;
  orgId: any;
  routeback: any;
  closeResult: string;
  stausId: any;
  substatusId: any;
  programId: any;
  p1: any;
  page: any;
  p: any;
  q1: any;
  q: any;
  statusFlow: any;
  curDate: any;
  acceptButton: boolean = true;
  rejectButton: boolean = true;
  dummy: any;
  remarks: any;

  roleId: any;
  userId: any;
  customerId: any;
  loanAmount: any;
  availableLimit: any;
  fundingAmount = 0;
  netAvailableLimit = 0;
  anchorData = [];
  companyTypeList = [];
  companyRatingList = [];
  anchorDataseller = [];
  companyTypeListseller = [];
  companyRatingListseller = [];
  anchorDatapurchaser = [];
  companyTypeListpurchaser = [];
  companyRatingListpurchaser = [];
  status = [{ status: '1', name: 'Active' }, { status: '0', name: 'Inactive' }];
  type: any;
  invoiceList = [];
  constructor(private route: ActivatedRoute, private router: Router, private crypto: Crypto,
    private modalService: NgbModal, private apiService: ApiService, private set: breadcrumbMessage, private currency: Currency) { }

  downloadFile(filePath, filename: string) {
    // var url=filePath+filename;
    // window.open(url, '_blank');
    if (filePath.indexOf("s3.ap-south-1") != -1) {
      var url1 = filePath;
      window.open(url1, '_blank');
    } else {
      var url2 = filePath + filename;
      window.open(url2, '_blank');
    }
  }

  accept() {
    var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const data1 = {
      mobileNumber: this.mobileNo,
      typeAgreement: '1',
      lastActivityTime: curDate,
      userId: this.userId,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      loanRequestId: this.loanid,
      loanDisbursalId: this.disbursalId,
      userMedium: 'bankendApp'
    }
    this.apiService.generateLoanAgreement(data1)
      .subscribe(data => {
        if (data.status == 200) {
          this.gotoAction();
          window.open(data.result.myUrl, '_blank');
          // this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false)

          // alert(data.exceptionMessage);
          // this.gotoAction();
          this.ngOnInit();
        }
      }, error => console.log(error));
  }

  reject() {
    this.modalService.dismissAll();
    var temp = [];
    for (let d of this.disbursalInvoiceDetails) {
      temp.push(d.invoiceNo);
    }
    this.dummy = window.localStorage.getItem("goback");
    console.log("temp::" + temp);
    var totalInvoices = temp.join();
    console.log("totalInvoices::" + totalInvoices);
    const data = {
      userId: this.userId,
      lastActivityTime: this.curDate,
      invoiceNo: totalInvoices,
      remarks: this.remarks,
      userMedium: 'backendApp',
      loanDisbursalId: this.disbursalId,
      loanRequestId: this.loanid,
    }
    this.apiService.rejectLoanDisbursal(data)
      .subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Disbursal rejected successfully", true)

          // alert("disbursal rejected successfully");
          if (this.dummy == "Mylist") {
            this.gotoMylist();
          }
          else {
            this.gotoAction();
          }
          // this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false)

          // alert(data.exceptionMessage);
          // this.gotoAction();
          this.ngOnInit();
        }
      }, error => console.log(error));

  }
  rejectPopupPage(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  viewAnchorDetails(content) {
    this.apiService.getAnchorsOverallData(this.loanid, 1).subscribe(data => {
      if (data.status == 200) {
        this.anchorDataseller = data.result.anchorData;
        this.anchorData = this.anchorDataseller;
        this.companyTypeListseller = data.result.companyTypeData;
        this.companyTypeList = this.companyTypeListseller;
        this.companyRatingListseller = data.result.ratingData;
        this.companyRatingList = this.companyRatingListseller;

      }
      this.Sidpid = "1";
      this.getSidPidType();
      console.log("getAnchorsOverallData ::" + data);
    });
    this.apiService.getAnchorsOverallData(this.loanid, 2).subscribe(data => {
      if (data.status == 200) {
        this.anchorDatapurchaser = data.result.anchorData;

        this.companyTypeListpurchaser = data.result.companyTypeData;
        this.companyRatingListpurchaser = data.result.ratingData;


      }

      console.log("getAnchorsOverallData ::" + data);
    });
    this.Sidpid = "1";

    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  submit(content) {
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  acceptMSG() {
    this.accept();
    // this.gotoAction();
    this.modalService.dismissAll();
  }
  rejectMSG() {
    this.modalService.dismissAll();
  }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.curDate = moment().format('YYYY-MM-DD HH:mm:ss');
    // this.subStatusid = this.route.snapshot.params['subStatus'];
    this.loanid = this.route.snapshot.params['loanid'];
    this.p1 = 10;
    this.page = 0;
    this.p = 1;
    this.q1 = 10;
    this.q = 1;
    this.disbursalId = this.route.snapshot.params['disbursalId'];

    this.apiService.getDisbursalInvoiceList(this.disbursalId)
      .subscribe(data => {
        this.disbursalInvoiceDetails = data.result;
        for (let d of this.disbursalInvoiceDetails) {
          this.fundingAmount = Number(this.fundingAmount) + Number(d.fundingAmount);
        }
        this.subStatusid = data.result[0].subStatusId;
        const datas={
          userId:this.userId
        }
        this.apiService.checkSellerApprover(datas).subscribe(data => {
          if(data.result==true){
              if (this.subStatusid == disbursalConstant.OTP_Completed ||
                this.subStatusid == disbursalConstant.Drawdown_request_placement_failed) {
                this.acceptButton = false;
                this.rejectButton = false;
              } else {
                this.acceptButton = true;
                this.rejectButton = true;
              }
          }
        });
       
        this.apiService.getLoanActionstatus(this.subStatusid)
          .subscribe(data => {
            this.loanActionstatus = data.result;
          }, error => console.log(error));

      }, error => console.log(error));


    this.apiService.getLoanDisbursalStatusHistory(this.disbursalId)
      .subscribe(data => {
        this.completed = data.result.completed;
        this.pending = data.result.pending;
      }, error => console.log(error));


    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails = data.result;
        // this.stausId = this.HeaderDetails[0].stausId;
        // this.substatusId = this.HeaderDetails[0].substatusId;
        this.programId = this.HeaderDetails[0].programTypeId;
        this.statusFlow = this.HeaderDetails[0].statusflow;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.customerId = this.HeaderDetails[0].customerId;
        this.orgId = this.HeaderDetails[0].orgId;
        this.loanAmount = this.HeaderDetails[0].loanAmount;
        this.availableLimit = this.HeaderDetails[0].availableLimit;
        this.netAvailableLimit = Number(this.availableLimit) - Number(this.fundingAmount);
      }, error => console.log(error));

  }

  downloadView(filePath: any, filename: any) {
    console.log("index::" + filePath.indexOf("s3.ap-south-1"));
    if (filePath.indexOf("s3.ap-south-1") != -1) {
      var url1 = filePath;
      window.open(url1, '_blank');
    } else {
      var url2 = filePath + filename;
      window.open(url2, '_blank');
    }
  }

  getInvoiceList(content){
    this.apiService.getUploadedDocumentswithcategory(this.loanid).subscribe(objRes => {
      if(objRes.status == 200){
          this.invoiceList=objRes.result.filter(x=>x.categoryId==102);
          console.log("this.invoiceList:",this.invoiceList);
      }});
      this.modalService.open(content, { size: 'xl' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  openReasonPopUp(content) {
    this.apiService.getReasonList()
      .subscribe(data => {
        this.reasonList = data.result;
      }, error => console.log(error));
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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

  gotoMylist() {
    this.router.navigate(['dashboard/Mylist']);
  }

  gotoAction() {
    this.router.navigate(['report/loandisbursal'], {
      queryParams: {
        'customerId': this.customerId, 'loanId': this.loanid,
        'orgId': this.orgId, 'digital': '0'
      }
    });
  }
  gotoList() {
    this.router.navigate(['/report/']);
  }
  goToList() {
    this.router.navigate(['/report/loanRequestList'], { queryParams: { 'loanId': this.loanid, 'nonStopFlag': '0' } });
  }

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }
  getSidPidType() {
    if (this.Sidpid == "1") {
      this.p = 1;
      console.log("i am called to display sid and pid");
      this.anchorData = this.anchorDataseller
      this.companyRatingList = this.companyRatingListseller;
      this.companyTypeList = this.companyTypeListseller
    }
    else if (this.Sidpid == "2") {
      this.p = 1;
      this.anchorData = this.anchorDatapurchaser
      this.companyRatingList = this.companyRatingListpurchaser;
      this.companyTypeList = this.companyTypeListpurchaser
    } }
  showPageIndex(pageIndex, pagesize) {
    this.page = pageIndex;
    console.log(this.page);
    if (this.page != 1) {
      this.page = (this.page - 1) * pagesize;
    }
    else {
      this.page = 0;
    }}
}



