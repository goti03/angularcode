import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment.jana.prod';
import { ReportModel } from '../reportModel';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ApiService } from "..//..//core/api.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
//import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import * as JSZip from 'jszip';
//import * as JSZipUtils from 'jszip-utils';
import * as FileSaver from 'file-saver';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Crypto } from '../../shared/crypto.service';
import { Currency } from '../../shared/currency.service';

const MIME_TYPES = {
  pdf: 'application/pdf',
  JPG: 'jesuslovesyou.JPG',
  xls: 'application/vnd.ms.excel',
  xlsx: 'application/vnc.openxmlformats.officedocument.spreadsheetxml.sheet'
}
@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css']
})

export class ViewDocumentsComponent implements OnInit {



  id: any;
  loanid: any;
  orgId: any;
  p1:any;
  displayMessage:any;
  page:any;
  retailerId: any;
  filenetList = [];
  checklistStatus = false;
  UploadedDocuments: any = [];
  HeaderDetails: any;
  readRole:boolean;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  roleId: any;
  docLength: any;
  closeResult: any;
  docId: ReportModel = new ReportModel();
  docs = [];
  p: any;
  uploadedDocs : any = [];
  catList = [];


  list1: any = [];
  list2: any = [];
  list3: any = [];
  list4: any = [];

  constructor(private changeDetec: ChangeDetectorRef, private modalService: NgbModal,private crypto: Crypto,
    private route: ActivatedRoute, private router: Router, private apiService: ApiService, private set: breadcrumbMessage, private http: HttpClient, private currency: Currency) {
  }
  ngOnInit() {
    this.filenetList.length = 0;
    this.filenetList = [];
    this.p1=10;
    this.readRole=false;
    this.page=0;
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    if((this.readOnly == Number(this.roleId))||(this.anchorReadonly==Number(this.roleId))){
      this.readRole = true;
    }
    this.p=1;
    this.displayMessage=window.localStorage.getItem("delete");
    if(this.displayMessage=="yes")
    {
      this.set.setOption("Document Deleted Successfully",true)
    }
    this.nonStopFlag = this.route.snapshot.params['nonStopFlag'];
    this.route.queryParams.subscribe(params => { 
      this.id = params['customerId'];
      this.loanid = params['loanId'];
      this.orgId = params['orgId'];
      this.nonStopFlag = params['nonStopFlag'];
    })
    
    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails = data.result;
      }, error => console.log(error));

    this.apiService.getUploadedDocumentswithcategory(this.loanid).subscribe(objRes => {
      if(objRes.status == 200){
        this.uploadedDocs = objRes.result;
        console.log("Before::"+JSON.stringify(this.uploadedDocs));
        this.uploadedDocs.sort((a,b) =>{
          if(a.categoryId > b.categoryId)
            return 1;
          else
            return -1;
        });
        this.apiService.getDocCatagoryList().subscribe(objRes => {
          window.localStorage.setItem("delete","no");
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
              if( a.name == 'KYC' ){
                this.docListfunction(a);
              }
              count++;
            }
          }
        }, error => console.log(error));
        this.docLength = this.UploadedDocuments.length;
      }else{

      }
    }, error => console.log(error));
    // this.apiService.getUploadedDocuments(this.loanid)
    //   .subscribe(data => {
    //     this.UploadedDocuments = data.result;
    //     for (let a of this.UploadedDocuments) {
    //       const obj = {
    //         name: a.fileSource,
    //         data: a.encodeData
    //       }
    //       this.docs.push(obj);
    //     }
    //     console.log(this.UploadedDocuments);
    //     this.docLength = this.UploadedDocuments.length;
    //     var i = 0;
    //     for (let la of this.UploadedDocuments) {
    //       la.Checkflag = 0;
    //       if (la.status == 'Y') {
    //         this.checklistStatus = true;
    //       }
    //       i++;
    //     }
    //   }, error => console.log(error));
    // this.apiService.getDocCatagoryList().subscribe(objRes => {
    //   if (objRes.status == 200) {
    //     var result = objRes.result;
    //     var count = 0;
    //     for (let a of result) {
    //       a.selected = false;
    //       if (count < 4 && count >= 0) {
    //         this.list1.push(a);
    //       } else if (count < 8 && count >= 4) {
    //         this.list2.push(a);
    //       } else if (count < 12 && count >= 8) {
    //         this.list3.push(a);
    //       } else if (count < 16 && count >= 12) {
    //         this.list4.push(a);
    //       }
    //       //FAQ
    //       if(a.name == 'CAM' || a.name == 'KYC' || a.name == 'CIBIL'){
    //         this.docListfunction(a);
    //       }
    //       count++;
    //     }
    //   }
    // }, error => console.log(error));
    this.tab = false;
  }

  checkStatus() {

    var value = (document.getElementById("selectAll") as HTMLInputElement).checked;
    if (value == true) {
      var checkbox = document.getElementsByName("check");
      for (let i = 0; i < checkbox.length; i++) {
        var id = "check_" + i;
        (document.getElementById(id) as HTMLInputElement).checked = true;
      }
    } else {
      var checkbox = document.getElementsByName("check");
      for (let i = 0; i < checkbox.length; i++) {
        var id = "check_" + i;
        (document.getElementById(id) as HTMLInputElement).checked = false;
      }
    }
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  removeView(contant, id: any) {

    this.docId.documentId = id;
    this.modalService.open(contant, { size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  accept() {
    this.modalService.dismissAll();
    this.apiService.removeView(this.loanid, this.docId)
      .subscribe(data => {
        if(data.status == 200){
          console.log("The message to be displayed is==="+data.exceptionMessage)
         window.localStorage.setItem("delete","yes")
          window.location.reload();
        }else{
          this.set.setOption(false,data.exceptionMessage);
        }
      }, error => console.log(error));
  }
  reject() {
    this.modalService.dismissAll();
  }

  submit() {

    this.filenetList = [];
    for (let i = 0; i < this.UploadedDocuments.length; i++) {
      if (this.UploadedDocuments[i].Checkflag == 1 || this.UploadedDocuments[i].Checkflag == true) {
        const data1 = {
          loanId: this.loanid,
          fileName: this.UploadedDocuments[i].fileSource,
          filePath: this.UploadedDocuments[i].filePath,
          documentName: this.UploadedDocuments[i].documentName,
          documentId: this.UploadedDocuments[i].documentId,
          id: this.UploadedDocuments[i].id,
          docTypeId: this.UploadedDocuments[i].documentType,
          idfcDocName: this.UploadedDocuments[i].idfcDocName,
          encodedData: '',
          flowProcess: '0',
          abflDocCat:this.UploadedDocuments[i].abflDocCat,
          abflDocName:this.UploadedDocuments[i].abflDocName,
        }
        this.filenetList.push(data1);
      }

    }
    if (this.filenetList.length > 0) {
      this.apiService.UploadToFilenet(this.filenetList).subscribe(data => {
        if (data.status == 200) {
          if (data.exceptionOccured == 'Y') {
            this.set.setOption(data.exceptionMessage, false);
          } else {
            this.UploadedDocuments=[];
            this.filenetList=[];
            this.set.setOption(data.exceptionMessage, true);
            this.ngOnInit();
          }
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
    } else {
      this.set.setOption("please choose documents", false);
      // alert("please choose documents");
    }
  }
  // gotoList(){
  //   this.router.navigate(['/report/']);
  // }  
  nonStopFlag : any;
  goToList() {
    if(this.nonStopFlag == 0){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }else{
        this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
    }
  }

  downloadasZip() {
    console.log(this.docs);
    var zip = new JSZip();
    var folder = zip.folder('Document');
    for (let a of this.docs) {
      var type = a.name.split('.')[1];
      folder.file(a.name, this.dataURItoBlob(a.data, type));
    }
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        FileSaver.saveAs(content, "Document.zip");
      });
  }

  dataURItoBlob(dataURI, t) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: t });
    return blob;
  }
  indianCurrency(Amount) {
    return this.currency.indianCurrency(Amount);
  }

  sameId(id,element){
    if(id == element.categoryId)
      return false
    else
      return true;
  }

  docList: any = [];
  docCategoryList: any = [];
  docListfunction(a) {
    if(a.selected){
      a.selected = false;
      this.UploadedDocuments = this.UploadedDocuments.filter(this.sameId.bind(this, a.id));
    }else{
      a.selected = true;
      for(let b of this.uploadedDocs){
        if(b.categoryId == a.id){
          this.UploadedDocuments.push(b);
        }
      }
    }
    console.log(a.selected);
    this.docLength = this.UploadedDocuments.length;
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

tab : boolean = false;
toggle(){
  this.tab = !this.tab;
}

}
