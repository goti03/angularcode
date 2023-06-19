import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import * as moment from 'moment/moment.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { environment } from '../../../environments/environment.jana.prod';
import { Crypto } from '../../shared/crypto.service';

@Component({
  selector: 'app-bene-details-adder',
  templateUrl: './bene-details-adder.component.html',
  styleUrls: ['./bene-details-adder.component.css']
})
export class BeneDetailsAdderComponent implements OnInit {

  list: any;
  userId: any;
  orgId: any;
  status: any;
  message: string;
  p1: any;
  beneList: any;
  bankId: any;
  accountNo: any;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  accountTypeId: any;
  userIdList: any = [];
  showchangestatus: boolean;
  accountHolderName: any;
  IFSCCode: any;
  beneId: any;
  beneMail: any;
  beneName: any;
  beneMobile: any;
  userIdb:any;
  beneDoc: any;
  beneDocname: any;
  id: any = '';
 readRole:boolean;
  searchList: any;
  p: any = 1;
  page: any;
  ifscMatch = new RegExp("^[A-Za-z]{4}0[A-Z0-9]{6}$");
  closeResult: any;
  accountType: any;
  bankName: any;
  changeObj: any;
  addNew: boolean;
  roleId:any;
  Doc: any;
  stage: any;
  title: any;
  orgCtrl1: FormControl;
  filteredOrg1: Observable<any[]>;
  orgCtrl2: FormControl;
  filteredOrg2: Observable<any[]>;
  constructor(private apiService: ApiService, private set: breadcrumbMessage, private modalService: NgbModal, private crypto: Crypto) {
    this.orgCtrl1 = new FormControl();
    this.orgCtrl2 = new FormControl();

    this.apiService.gstOrganisationList().subscribe(res => {
      if (res.status == 200) {
        this.list = res.result;
        const obj = {
          orgName: 'All Organization',
          orgId: 'orgId',
          panNo: 'all pan',
          programName: 'all program'
        }
        this.list.splice(0, 0, obj);
        this.orgId = 'orgId';
        this.status = '0';
        this.listrender();
        for (let a of this.list) {
          a.info = a.orgName + " | " + a.programName + " | " + a.panNo
        }
        this.filteredOrg1 = this.orgCtrl1.valueChanges
          .pipe(
            startWith(''),
            map(list => list ? this.orgFun1(list) : this.list.slice())
          );
        this.filteredOrg2 = this.orgCtrl2.valueChanges
          .pipe(
            startWith(''),
            map(list => list ? this.orgFun2(list) : this.list.slice())
          );
      }

    });
  }

  orgFun1(name: any) {
    console.log(name);
    return this.list.filter(list => {
      return list.info.toLowerCase().includes(name.toLowerCase())
    });
  }

  orgFun2(name: any) {
    return this.list.filter(list => {
      return list.info.toLowerCase().includes(name.toLowerCase())
    });
  }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.stage = 1;
    this.readRole=false;
    this.p1 = 5;
    this.page = 0;
    this.beneList = [];
    this.orgId = 'orgId';
    this.status = '0';
    this.showchangestatus = false;
    this.userIdb = this.crypto.decryt((window.localStorage.getItem("userId")));
    this.roleId=this.crypto.decryt((window.localStorage.getItem("roleId")));
    this.apiService.getAccountTypeList().subscribe(res => this.accountType = res.result);
    this.apiService.getBankNameList().subscribe(res => this.bankName = res.result);
    this.addNew = false;
    if((this.readOnly == Number(this.roleId))||(this.anchorReadonly==Number(this.roleId))){
      this.readRole = true;
    }
  
    this.apiService.getBeneUserId().subscribe(data => {
      if (data.status == 200) {
        this.userIdList = data.result;
        console.log("the length is ===" + this.userIdList.length)
        var c
        for (c = 0; c < this.userIdList.length; c++) {
          if (this.userIdb == this.userIdList[c].userId) {
            this.showchangestatus = true;
          }
        }
      }
    });
  }

  listrender1() {
    console.log("I am called")
    console.log("the size is ===" + this.list.length)
    for (let a of this.list) {
      console.log("the new value is =====" + a.orgName)
      if (a.orgName == this.orgCtrl1.value) {
        this.orgId = a.orgId;
        break;
      }
    }
    // this.orgId = this.orgCtrl.value.split('-')[1];
    this.listrender();
  }

  listrender() {
    if (this.orgId == '') {
      this.set.setOption("Choose an Organization Name", false);
      return;
    }
    if (this.status == '') {
      this.set.setOption("Choose a Status", false);
      return;
    }
    this.p = 1;
    this.apiService.getorgbankdetails(this.status, this.orgId).subscribe(data => {
      if (data.status == 200) {
        this.beneList = data.result;
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
      this.orgId = '';
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
  add() {
    this.message = '';
    if (this.stage == 1) {
      for (let a of this.list) {
        if (a.orgName == this.orgCtrl2.value) {
          this.orgId = a.orgId;
          break;
        }
      }
      if (this.isNullorUndefinedorEmpty(this.orgId)) {
        this.message = 'Choose an Organisation Name';
        return;
      }
      if (this.orgId == 'orgId') {
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
        this.beneId=this.beneId.replace(/\s/g, '')
      
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
          fileName: this.beneDocname,
          fileContent: this.beneDoc,
          id: this.id,
          type:1,
          loanRequestId:0
        };
        this.modalService.dismissAll();
        this.apiService.insertDistributerBankDetails(data).subscribe(data => {
          if (data.status == 200) {
            this.set.setOption("Bank Data Added Successfully.", true);
          } else {
            // this.message = "Failed To Upload";
            this.set.setOption(data.exceptionMessage, false);
          }
          this.bankId = "";
          this.accountNo = '';
          this.accountTypeId = '';
          this.accountHolderName = '';
          this.IFSCCode = '';
          this.beneId = '';
          this.beneName = '';
          this.beneMail = '';
          this.beneMobile = '';
          this.id = '';
          this.addNew = false;
          this.orgId = 'orgId';
          this.listrender();
        });

      }
    }
    this.stage++;
  }

  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }

  openPopup(content) {

    this.bankId = "";
    this.accountNo = '';
    this.accountTypeId = '';
    this.accountHolderName = '';
    this.IFSCCode = '';
    this.beneId = '';
    this.beneName = '';
    this.beneMail = '';
    this.beneMobile = '';
    this.id = '';
    this.addNew = true;
    this.orgId = '';
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
  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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

  statuschangepopup(content, a) {
  
    this.changeObj = a;
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false },).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  statuschange(a) {
    console.log("the update value is===" + this.orgCtrl1.value)
    this.modalService.dismissAll();
    this.apiService.bankdetailsapproval(this.changeObj.id, a, this.userId).subscribe(data => {
      if (data.status == 200) {
        this.set.setOption(data.result, true);
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
      this.ngOnInit();
      this.changeObj = '';
    })

  }

  document(a) {
    if (a == 1) {
      window.open(this.Doc, '_blank');
    } else {
      window.open(a, '_blank');
    }
  }

  edit(a, content) {
    for (let b of this.bankName) {
      if (b.bankName == a.bankName) {
        this.bankId = b.bankId;
      }
    }
    this.accountNo = a.accountNo;
    for (let c of this.accountType) {
      if (c.accName == a.accType) {
        this.accountTypeId = c.accId;
      }
    }
    this.accountHolderName = a.bankAccountHolderName;
    this.IFSCCode = a.ifscCode;
    this.beneId = a.beneId;
    this.beneName = a.beneName;
    this.beneMail = a.beneMail;
    this.beneMobile = a.beneMobile;
    this.Doc = a.documentUrl;
    this.id = a.id;
    this.stage = 2;
    this.title = 'Add Bank Details';
    this.orgId = a.orgId;
    this.openPopup1(content);
  }
  alphanumkeyPress(event: any) {
    const pattern = /[a-zA-Z0-9//\s]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
