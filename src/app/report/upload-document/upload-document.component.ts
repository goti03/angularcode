import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import { Currency } from '../../shared/currency.service';
import { data } from '../../dashboards/dashboard3/smart-data-table';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  id: any;
  loanid: any;
  documentTypeList: any;
  HeaderDetails: any;
  fileDynamicList = [];
  fileDynamicFinal = [];
  filenewDynamic = {};
  imageEncode = [];
  mobileNo: any;
  saveButton: any;

  Value: string | ArrayBuffer;
  submitted: any;
  UploadedDocuments: any;

  list1: any = [];
  list2: any = [];
  list3: any = [];
  list4: any = [];
  userId:any;
  constructor(private route: ActivatedRoute, private changeDetec: ChangeDetectorRef, private crypto: Crypto,
    private router: Router, private apiService: ApiService, private set: breadcrumbMessage, private currency: Currency) { }
    nonStopFlag : any;

    goToList() {
    if(this.nonStopFlag == 0){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }else{
        this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
    }
  }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.route.queryParams.subscribe(params => {
      this.nonStopFlag = params['nonStopFlag'];
    })
    this.fileDynamicList = [];
    this.fileDynamicFinal = [];
    this.submitted = false;
    this.imageEncode = [];
    this.filenewDynamic = [];
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    this.saveButton = true;
    this.apiService.getUploadedDocuments(this.loanid)
      .subscribe(data => {
        this.UploadedDocuments = data.result;
      }, error => console.log(error));
    this.apiService.getDocumentTypeList()
      .subscribe(data => {
        this.documentTypeList = data.result;
      }, error => console.log(error));
    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails = data.result;
        this.mobileNo = this.HeaderDetails[0].mobileNo;

      }, error => console.log(error));
    this.addRowFile();
    this.apiService.getDocCatagoryList().subscribe(objRes => {
      if (objRes.status == 200) {
        var result = objRes.result;
        var count = 0;
        for (let a of result) {
          a.selected = false;
          if (count < 4 && count >= 0) {
            this.list1.push(a);
          } else if (count < 8 && count >= 4) {
            this.list2.push(a);
          } else if (count < 12 && count >= 8) {
            this.list3.push(a);
          } else if (count < 16 && count >= 12) {
            this.list4.push(a);
          }
          //FAQ
          if ( a.name == 'KYC' ) {
            this.docListfunction(a);
          }
          count++;
        }
      }
    }, error => console.log(error));
    this.tab = false;
  }
  addRowFile() {
    this.filenewDynamic = {
      file: '', docType: '0', fileSource: '', fileName: '', docErrorMsg: '', fileErrorMsg: ''
    };
    this.fileDynamicList.push(this.filenewDynamic);
    this.changeDetec.detectChanges();
    // if (this.fileDynamicList.length > 0) {
    //   this.saveButton = false;
    // }
    return true;

  }

  deleteRowFile(index) {

    if (this.fileDynamicList.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);
      return false;
    } else {
      if (this.fileDynamicList.length > 0) {
        this.saveButton = false;
      }
      this.fileDynamicList.splice(index, 1);
      // this.imageEncode.splice(index, 1);
      return true;
    }

  }

  uploadfilearray(index, file) {
    var ext = this.ext(file[0].name);
    if ((ext == 'jpg') || (ext == 'jpeg') || (ext == 'png') || (ext == 'pdf') || (ext == 'doc') || (ext == 'docx') || (ext == 'zip') || (ext == 'xlsx') || (ext == 'mp4') || (ext == 'rar')
      || ext == 'json' || ext == 'txt' || ext == 'xml' || ext == 'json' || ext == 'html') {
      this.imageEncode = [];
      let reader = new FileReader();
      reader.readAsDataURL(file[0])
      reader.onload = () => {
        this.fileDynamicList[index].fileSource = reader.result;
        this.fileDynamicList[index].fileName = file[0].name;
      };
    } else {
      this.set.setOption("The accepted data format are as follow : jpg, jpeg, png, pdf, doc, docx, zip, xlsx, mp4 and rar", false);
      if (index == 0) {
        this.addRowFile();
      }
      this.deleteRowFile(index);
    }

  }
  validateFileName(docTye: number, fileName: string) {
    var count = 0;
    for (let u of this.UploadedDocuments) {
      if (u.documentType == docTye && u.fileSource.indexOf(fileName) >= 0) {

        count++

      }


    }
    if (count != 0) {
      return true;
    } else {
      return false;
    }
  }
  onSubmit() {

    this.submitted = true;
    var count = 0;
    this.fileDynamicFinal = [];
    if (this.fileDynamicList.length <= 0) {
      this.set.setOption("please select File attachment", false);
    } else {
      for (let f of this.fileDynamicList) {
        if (f.file == null || f.file == '' || f.file == undefined) {
          f.fileErrorMsg = "File is Required";
          count++;
        }
        if (f.file.includes("*") || f.file.includes(",")) {
          f.fileErrorMsg = "Please enter a file name without (* and ,)";
          count++;
        } if (f.docType == null || f.docType == '0' || f.docType == undefined) {
          f.docErrorMsg = "Doc Type is Required";
          count++;
          // }  if (this.validateFileName(f.docType, f.fileName)) {
          //   f.fileErrorMsg = "File Name Already Exist";
          //   count++;
          // }  if (this.validateFile(f.docType, f.fileName)) {
          //   f.fileErrorMsg = "File Name Already Exist";
          //   count++;
        }
      }
      if (count != 0) {
        this.set.setOption("Please Select File and Document Type", false);
      } else {
        for (let f of this.fileDynamicList) {
          const filedata = {
            documentTypeId: f.docType,
            fileName: this.loanid + "_" + f.fileName,
            fileContent: f.fileSource.split(",")[1],
          };
          this.fileDynamicFinal.push(filedata);
        }
        var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const docDetails = {
          userId: this.userId,
          lastActivityTime: curDate,
          retailerId: this.crypto.decryt(window.localStorage.getItem('retailerId')),
          currentActivityId: '0',
          loanRequestId: this.loanid,
          retailerType: this.crypto.decryt(window.localStorage.getItem('retailerType')),
          mobileNo: this.mobileNo,
          userMedium: 'backEndApp',
          docData: this.fileDynamicFinal
        }
        console.log("docDetails::" + JSON.stringify(docDetails));
        this.apiService.uploadDocuments(docDetails).subscribe(data => {
          if ((data.status == 200)) {
            if (data.exceptionOccured == 'Y') {
              this.set.setOption(data.exceptionMessage, false);
              this.removeall();
              this.ngOnInit();
            } else {
              this.set.setOption("Documents uploaded Successfully", true);
              // window.location.reload();
              this.removeall();
              this.ngOnInit();
            }
          } else {
            this.set.setOption("Failed to upload Documents", false);
            this.removeall();
            this.ngOnInit();
          }
        }, error => console.log(error));
      }

    }

  }
  validateFile(docType, fileName) {
    var count = 0;
    for (let f of this.fileDynamicList) {
      if (f.docType == docType && f.fileName == fileName) {
        count++;
      }
    }
    if (count != 0) {
      return true;
    } else {
      return false;
    }
  }
  validate() {
    var count;


    for (let f of this.fileDynamicList) {
      if (f.file == null || f.file == '' || f.file == undefined) {
        f.fileErrorMsg = "File is Required";
      } else {
        f.fileErrorMsg = "";
      }
      if (f.docType == null || f.docType == '' || f.docType == undefined) {
        f.docErrorMsg = "Doc Type is Required";
      } else {
        f.docErrorMsg = "";
      }
      // if (this.validateFileName(f.docType, f.fileName)) {
      //   f.fileErrorMsg = "File Name Already Exist";
      // }
      // if(this.validateFile(f.docType, f.fileName)){
      //   f.fileErrorMsg = "File Name Already Exist";
      // }
    }
  }
  ext(filename) {
    return filename.split('.').pop();
  }
  indianCurrency(Amount) {
    return this.currency.indianCurrency(Amount);
  }

  docList: any = [];
  docCategoryList: any = [];
  docListfunction(a) {
    if (a.selected) {
      a.selected = false;
      var index = 0;
      for (let b of this.docList) {
        if (b[0] == a.name) {
          this.docList.splice(index, 1);
          break;
        }
        index++;
      }
      console.log("Removed");
      console.log(this.docList);
    } else {
      a.selected = true;
      this.docCategoryList.push(a.id);
      this.apiService.getDocumentList(a.id).subscribe(objRes => {
        if (objRes.status == 200) {
          var ar = [];
          ar.push(a.name);
          ar.push(objRes.result);
          this.docList.push(ar);
          console.log("added");
          console.log(this.docList);
        } else {
          this.set.setOption(true, objRes.exceptionMessage);
        }
      }, error => console.log(error));
    }
  }

  icon = "fas fa-user-tag";

  tab: boolean = false;
  toggle() {
    this.tab = !this.tab;
  }

  removeall(){
    this.docList = [];
    this.docCategoryList = [];
    this.list1 = [];
    this.list2 = [];
    this.list3 = [];
    this.list4 = [];
  }
}
