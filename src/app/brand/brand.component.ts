import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "..//core/api.service";
import { breadcrumbMessage } from '../shared/breadcrumb-message.service';
import * as moment from 'moment/moment.js';
import { Crypto } from '../shared/crypto.service';
import { data } from 'jquery';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})


export class BrandComponent implements OnInit {
  searchBrandList;
  brandRetailer: any;
  orgIds:any;
  BrandVintage: any;
  BusinessVintage: any;
  GeoLimit: any;
  yearTurnover: any;
  monthTurnover: any;
  loanid: any;
  brandid: any;
  oldmobile:any;
  orguni: any;
  sourcingPartner: any;
  p: any = 1;
  orgMobile: any;
  requestList = [];
  accountType: Observable<String[]>;
  bankName: Observable<String[]>;
  bankDetails = [];
  message: any;
  p1: any;
  email: boolean = false;
  ifscMatch = new RegExp("^[A-Za-z]{4}0[A-Z0-9]{6}$");
  phoneMatch = new RegExp("[0-9]{10}");
  bankId: any;
  accountNo: any;
  accountTypeId: any;
  accountHolderName: any;
  IFSCCode: any;
  i: any;
  beneId: any;
  beneName: any;
  posmobile: any;
  beneMobile: any;
  beneMail: any;
  modifiedOn: any;
  errormsg: any;
  errosmsg: any;
  modifiedBy: any;
  page: any;
  editmobile: any;
  viewBank: boolean = true;
  orgId: any;
  anchorCustomerId: any;
  anchorCustomerList = [];
  orgOrgId: any;
  orgid: any;
  id: any;
  errinAnchor: boolean;
  errinAnchorMess: any;
  pan: "";
  closeResult: string;
  userId: any;

  allorgnameList: any;
  orgnameCtrl: FormControl;
  filteredorgname: Observable<any[]>;
  displayMessage: any;
  orgs: any;


  constructor(private apiService: ApiService, private set: breadcrumbMessage,
    private router: Router, private modalService: NgbModal, private route: ActivatedRoute, private crypto: Crypto) {
    this.orgnameCtrl = new FormControl();
    // const data = {
    //   orgId: '',
    //   pan: '',
    //   pageNoRequested: (this.p == null || this.p == undefined) ? 1 : Number(this.p)
    // }
    this.apiService.getOrganisationlist().subscribe(data => {
      if (data.status == 200) {
        this.allorgnameList = data.result;
        for (let c of this.allorgnameList) {
          c.orgInfo = c.orgName
        }
        console.log("this.allorgnameList :" + this.allorgnameList);
        this.filteredorgname = this.orgnameCtrl.valueChanges
          .pipe(startWith(''),
            map(list => list ? this.orgnameList(list) : this.allorgnameList.slice())
          );
        console.log("filteredorgname:" + this.filteredorgname);
      }
    });
    this.apiService.getBrandNodes(data).subscribe(data => {
      if (data.status == 200) {
        console.log(data.result);
      }
    }, error => console.log(error));
  }
  orgnameList(name: any): any {
    console.log(name);
    return this.allorgnameList.filter(list =>
      list.orgInfo.toLowerCase().includes(name.toLowerCase()));
  }



  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.displayMessage = window.localStorage.getItem("programkey");
    this.p1 = 20;
    this.page = 0;
    this.orgId = "";
    this.pan = "";

    var search = window.localStorage.getItem('searchBrandList;');

    if (search) {
      this.searchBrandList = search;
    }
    this.orgid = this.route.snapshot.params['orgId'];
    if (this.orgid) {
      this.searchBrandList = this.orgid;
      this.set.setOption("Fincance Details updated Successfully", true);
      window.localStorage.setItem('searchBrandList', this.searchBrandList);
    }
    this.errinAnchor = false;
    this.errinAnchorMess = "";
    this.reloadData();
    // this.orgId="1";


  }

  editmobiles(content, mobilenum, org, pos) {
    this.editmobile = mobilenum;
    this.oldmobile = mobilenum;
    this.orgMobile = org;
    this.posmobile = pos;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  reloadData() {
    if (this.displayMessage == "created") {
      this.set.setOption("Brand data uploaded successfully", true)
    }
    else if (this.displayMessage == "createsourcing") {
      this.set.setOption("Supplier data uploaded successfully", true)
    }
    window.localStorage.setItem("programkey", "");
    this.apiService.getAccountTypeList().subscribe(res => this.accountType = res.result);
    this.apiService.getBankNameList().subscribe(res => this.bankName = res.result);
    // const data = {
    //   orgId: '',
    //   pan: '',
    //   pageNoRequested: (this.p == null || this.p == undefined) ? 1 : Number(this.p)
    // }
    // this.apiService.getBrandNodes(data).subscribe(data => {
    //   if (data.status == 200) {
    //     this.requestList = data.result;
    //   }
    //   else {
    //     this.set.setOption(data.exceptionMessage, false);
    //   }
    // });
  }


  bankdata(content, orgId, sourcingPartner) {
    this.orgId = orgId;
    this.bankId = "";
    this.accountTypeId = "";
    this.beneId = "";
    this.accountNo = "";
    this.IFSCCode = "";
    this.accountHolderName = "";
    this.beneName = "";
    this.beneMail = "";
    this.beneMobile = "";
    this.apiService.getDistributerBank(orgId)
      .subscribe(data => {
        if (data.status == 200) {
          this.bankDetails = data.result;
          if (this.bankDetails.length > 0) {
            this.id = this.bankDetails[0].id;
            this.bankId = this.bankDetails[0].bankId;
            this.accountTypeId = this.bankDetails[0].accountType;
            this.beneId = this.bankDetails[0].beneId;
            this.accountNo = this.bankDetails[0].accountNo;
            this.IFSCCode = this.bankDetails[0].IFSCCode;
            this.accountHolderName = this.bankDetails[0].accountHolderName;
            this.beneName = this.bankDetails[0].beneName;
            this.beneMail = this.bankDetails[0].beneMail;
            this.beneMobile = this.bankDetails[0].beneMobile;
            // this.viewBank=true;
            this.viewBank = false;
          } else {
            this.viewBank = false;
          }
          this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
      }, error => console.error());
  }

  brandData(content, orgId, sourcingPartner) {
    this.sourcingPartner = sourcingPartner;
    this.orgId = orgId;
    this.apiService.getBrandRetailer(orgId).subscribe(data => {
      this.BrandVintage = data.result.BrandVintage;
      this.BusinessVintage = data.result.BusinessVintage;
      this.GeoLimit = data.result.GeoLimit;
      this.yearTurnover = data.result.yearTurnover;
      this.monthTurnover = data.result.monthTurnover;
    }, error => console.log(error));
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  emailMatch = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
  saved() {

    var salesName = (document.getElementById("salesName") as HTMLInputElement).value;
    var salesNumber = (document.getElementById("salesNumber") as HTMLInputElement).value;

    var salesEmail = (document.getElementById("salesEmail") as HTMLInputElement).value;
    var salesEmp = (document.getElementById("salesemp") as HTMLInputElement).value;
    if (!this.emailMatch.test(salesEmail) || !this.phoneMatch.test(salesNumber) || salesName == "" || salesName == null || salesName == undefined || salesEmp == "" || salesEmp == null || salesEmp == undefined) {
      this.errormsg = "Please Enter all the Details Correctly"
      this.email = true;
    } else {

      const data = {
        name: salesName,
        mobileNo: salesNumber,
        email: salesEmail,
        orgId: this.orguni,
        employeeCode: salesEmp

      }
      this.apiService.addSalesPerson(data).subscribe(data => {
        if (data.status == 200) {
          this.errormsg = "";
          // this.set.setOption("Salesperson Added Successfully..", true);
          this.errosmsg = "Salesperson Added Successfully";
        } else {
          this.errormsg = data.exceptionMessage;
        }
      }, error => console.log(error));
    }

  }

  salesPerson(content, orgId) {
    //  var salesName = (document.getElementById("salesName") as HTMLInputElement).value;
    // var salesNumber = (document.getElementById("salesNumber") as HTMLInputElement).value;
    // var salesEmail = (document.getElementById("salesEmail") as HTMLInputElement).value;
    this.orguni = orgId
    // const data={
    // //  name:salesName,
    //   mobileNo:salesNumber,
    //   emailId:salesEmail,
    //   orgId:org

    // }
    // this.apiService.addSalesPerson(data).subscribe(data => {
    //   if (data.status == 200) {

    //     this.errormsg='';
    //   }else {
    //     this.errormsg=data.exceptionMessage;
    //   }
    // }, error => console.log(error));



    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  onkeyPress(event: any) {
    const pattern = /[a-zA-Z0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  emailCheck(b) {
    const a = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (a.test(b)) ? true : false;
  }
  submitBankDetails() {
    this.message = '';
    if (this.isNullorUndefinedorEmpty(this.bankId)) {
      this.message = "Please enter a Bank Name";
    } else if (this.isNullorUndefinedorEmpty(this.accountNo)) {
      this.message = "Please enter a Account Number";
    } else if (this.isNullorUndefinedorEmpty(this.accountTypeId)) {
      this.message = "Please enter a Account Type";
    } else if (this.isNullorUndefinedorEmpty(this.accountHolderName)) {
      this.message = "Please enter a Account Holder Name";
    } else if (this.isNullorUndefinedorEmpty(this.IFSCCode) || !this.ifscMatch.test(this.IFSCCode)) {
      this.message = "Please enter a Valid Ifsc Code";
    } else if (this.isNullorUndefinedorEmpty(this.beneId)) {
      this.message = "Please enter a Bene Id";
    } else if (this.isNullorUndefinedorEmpty(this.beneMail)) {
      this.message = "Please enter a Bene Mail";
    } else if (this.isNullorUndefinedorEmpty(this.beneName)) {
      this.message = "Please enter a Bene Name";
    } else if (this.set.validateSpecialChar(this.accountHolderName)) {
      this.errormsg = "Special Character Not Allowed";
    } else if (this.set.validateSpecialChar(this.IFSCCode)) {
      this.errormsg = "Special Character Not Allowed";
    } else if (this.emailCheck(this.beneMail)) {
      this.message = "Invalid Bene Mail";
    } else if (this.set.validateSpecialChar(this.beneName)) {
      this.errormsg = "Special Character Not Allowed";
    } else {
      const data = {
        bankId: this.bankId,
        accountNo: this.accountNo,
        accountType: this.accountTypeId,
        accountHolderName: this.accountHolderName,
        IFSCCode: this.IFSCCode,
        beneId: this.beneId,
        orgId: this.orgId,
        beneName: this.beneName,
        beneMail: this.beneMail,
        beneMobile: this.beneMobile,
        modifiedOn: moment().format('YYYY-MM-DD HH:mm:ss'),
        modifiedBy: this.userId,
        id: (this.id) ? this.id : '',
        type:1,
        loanRequestId:0
      };
      this.apiService.insertDistributerBankDetails(data).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Bank Data Added Successfully..", true);
          this.modalService.dismissAll();
        } else {
          this.message = "Failed To Upload";
        }
      });

    }
  }
  edit(orgId: any) {

    this.router.navigate(['brand/update', orgId]);
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



  saveAnchorCustomerId() {
    // alert(this.sanctionDate);
    for (let a of this.anchorCustomerList) {
      if (a.anchorReference == '') {
        this.errinAnchor = true;
        this.errinAnchorMess = "Field should not be empty";
        return;
      }
    }
    const data = {
      sourcingPartner: this.sourcingPartner,
      orgId: this.orgId,
      anchorCustomerId: this.anchorCustomerList

    }
    this.apiService.saveAnchorCustomerId(data).subscribe(res => {
      this.modalService.dismissAll();
      if (res.status == 200) {
        this.set.setOption("Anchor Customer Id Updated Successfully", true);
        //alert("Sanction Date Updated Successfully");
        //window.location.reload();
        this.ngOnInit();
      } else {
        this.set.setOption("Failed to update", false)
        // alert(res.exceptionMessage);
      }
    }, error => console.log(error));
  }


  addAnchor() {
    const obj = {
      orgOrgId: this.orgOrgId,
      arId: '0',
      anchorReference: ''
    }
    this.anchorCustomerList.push(obj);
  }

  updateStifyId(orgId: number, sourcingPartner: number, content) {
    this.errinAnchor = false;
    this.errinAnchorMess = "";
    this.sourcingPartner = sourcingPartner;
    this.orgId = orgId;
    const data = {
      sourcingPartner: sourcingPartner,
      orgId: orgId,
    }
    this.apiService.fetchAnchorCustomerId(data).subscribe(data => {
      if (data.status == 200) {
        this.anchorCustomerList = data.result[1].anchorRefData;
        this.orgOrgId = data.result[0].orgOrgId;
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      }
    }, error => console.log(error));
  }

  checkMobileNumber() {
    const data = {

      mobileNumber: this.editmobile,
      orgId: this.orgMobile,
      oldMobile:this.oldmobile
    }
    this.apiService.checkBrandMobileNumber(data).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == "N") {
          this.modalService.dismissAll();
          this.set.setOption(data.exceptionMessage, true);
          this.requestList[this.posmobile].mobile = this.editmobile;
          console.log("this===" + this.requestList[this.posmobile].custMobile)

        }}
        else {
          this.set.setOption(data.exceptionMessage, false);
        
      }
    }, error => console.log(error));

  }
  showPageIndex(pageIndex, pagesize) {
    this.page = pageIndex;
    console.log(this.page);
    if (this.page != 1) {
      this.page = (this.page - 1) * pagesize;
    }
    else {
      this.page = 0;
    }
  }

  nextButton() {
    console.log("this.requestList::" + this.requestList.length);
    console.log("this.p::" + this.p);
    if (this.requestList.length == 10) {
      this.p = Number(this.p) + 1;
      this.generalsearch(0);
    }
  }
  previousButton() {
    if (this.p != 1) {
      this.p = Number(this.p) - 1;
      this.generalsearch(0);
    }
    this.generalsearch(0);
  }
  generalsearch(val) {
    this.p = (val == 0) ? this.p : 1;
    if(!this.isNullorUndefinedorEmpty(this.orgnameCtrl.value)){
    for(let m of this.allorgnameList){
 
  if((m.orgName)==this.orgnameCtrl.value){
    this.orgIds = m.orgId
    break;
  }
  }
    }
    if (this.isNullorUndefinedorEmpty(this.pan)&&this.isNullorUndefinedorEmpty(this.orgnameCtrl.value)) {
    this.set.setOption("Please Use Filter To Search",false);
    } else {
      const data = {
        orgId: this.isNullorUndefinedorEmpty(this.orgnameCtrl.value) ? '' : this.orgIds,
        pan: this.pan,
        pageNoRequested: (this.p == null || this.p == undefined) ? 1 : Number(this.p)
      }
      this.apiService.getBrandNodes(data).subscribe(data => {
        if (data.status == 200) {
          this.requestList = data.result;
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      });
    }
  }
  resetbutton() {
    this.pan = '',
      this.orgs = ''
    //this.orgnameCtrl = new FormControl();
  }
}
