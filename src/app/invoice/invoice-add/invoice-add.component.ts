import { Component, OnInit, ChangeDetectorRef , TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService} from '..//..//core/api.service';
import { Constant } from '..//..//core/constant';
import {breadcrumbMessage} from '..//..//shared/breadcrumb-message.service';
import { environment } from '../../../environments/environment';
import {Crypto} from '../../shared/crypto.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent implements OnInit {
  // upload: Upload = new Upload();
  // url=this.apiService.baseUr2.replace("finAggPortalAPIService/api/v1/","uploadFiles/images/");
  url = 'https://finagg-prod.s3.ap-south-1.amazonaws.com/finagg/sample/Invoice_Upload_GP.xlsx';
  sourcingPartnerList = [];
  roleId: any;
  dataList = [];
  finalList = [];
  invoiceList = [];
  programId: any;
  programList: [];
  retailerList: [];
  retailerId: any;
  closeResult = '';
  sourcingPartnerId: any;
  submitted: boolean;
  hide = false;
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    sourcingPartner: new FormControl('', [Validators.required]),
    retailerId: new FormControl('', [Validators.required]),
    programId: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  filenameinput: any;
  p: any = 1;
  failed: boolean;
  userId: any;
  warningMsg: any;
  // @ViewChild('invoiceWarning', { static: true }) invoiceWarning: TemplateRef<any>;
  constructor(private http: HttpClient, private apiService: ApiService, private router: Router,
     private set: breadcrumbMessage, private crypto: Crypto , private modalService: NgbModal , ) { }

  get f() {
    return this.myForm.controls;
  }
  getProgramId() {
    const org = this.sourcingPartnerId;
    this.getretailer(org);
  }
  getretailer(org) {
    this.apiService.retailerList(org).subscribe(res => this.retailerList = res.result);
  }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = Number(this.crypto.decryt(window.localStorage.getItem('roleId')));

    this.p = 1;
    this.submitted = false;
    this.failed = false;

    this.sourcingPartnerId = '';
    this.retailerId = '';
    this.filenameinput = '';
    this.finalList = [];
    if (this.roleId == 11 ) {
      this.sourcingPartnerId = this.crypto.decryt(localStorage.getItem('orgId'));
      this.getretailer(this.sourcingPartnerId);
      this.hide = true;
    } else if (this.roleId == 16) {
      this.sourcingPartnerId = this.crypto.decryt(localStorage.getItem('orgId'));
      this.getretailer(this.sourcingPartnerId);
      this.hide = true;
      this.retailerId = '0';
    } else if (this.roleId == 4 || this.roleId == 8 ) {
      this.retailerId = this.crypto.decryt(window.localStorage.getItem('orgId'));
      this.apiService.getBrandOrgId(this.crypto.decryt(localStorage.getItem('orgId'))).subscribe(data => {
        this.sourcingPartnerId = data.result;
        // this.getprogram(this.sourcingPartnerId);
        this.getretailer(this.sourcingPartnerId);
      });
      this.hide = true;
    } else {
      this.hide = false;
    }
    this.apiService.getBrandDistributerList().subscribe(res => {this.sourcingPartnerList = res.result; });
    // this.apiService.getPartnerList().subscribe(res => this.sourcingPartnerList = res.result);
  }
  ext(filename) {
    return filename.split('.').pop();
  }
  onFileChange(event) {
    const ext = this.ext(event.target.files[0].name);
  if (ext == 'xlsx'||ext == 'xlsx') {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.filenameinput = file.name;
        this.myForm.patchValue({
          fileSource: file
        });
      }
    } else {
      this.set.setOption('Please choose Excel(.xlsx) Files', false);
      const files = <HTMLInputElement>document.getElementById('file');
      files.value = '';
    }
  }

  submit() {

    const formData = new FormData();
     if (this.sourcingPartnerId == null ||  this.sourcingPartnerId == '' ) {
    this.set.setOption('please select sourcing partner', false);
    } else if (this.myForm.get('fileSource').value == null || this.myForm.get('fileSource').value == '') {
      this.set.setOption('Please select attachment', false);
    // }else if(this.programId==null || this.programId == ''){
    //   this.set.setOption("Please select program", false);
    } else if (this.retailerId == null || this.retailerId == '') {
      this.set.setOption('Please select retailer/dealer', false);
    } else {
  formData.append('file', this.myForm.get('fileSource').value);
  formData.append('sourcingPartner', this.sourcingPartnerId);
  // formData.append('programId', this.programId);
  formData.append('partnerOrgId', this.retailerId);
  formData.append('userId', this.userId);
  // formData.append('sourcingPartner', this.myForm.get('sourcingPartner').value);
  // // console.log(formData);
  this.apiService.uploadInvoiceData(formData)
    .subscribe(data => {
      if (data.status == 200) {
        this.submitted = true;
        // alert("Successfully Uploaded");
        // this.gotoList();
        this.dataList = data.result;
        this.failed = true;
        console.log('dataList::' + JSON.stringify(this.dataList));
        for (let i = 0; i < this.dataList.length; i++) {
          if (i == this.dataList.length - 1) {
            console.log('warningMsg:::::::::' + this.dataList[this.dataList.length - 1][0]);
              this.warningMsg = this.dataList[this.dataList.length - 1][0];
              this.warningMsg = this.warningMsg.split(',');
              const temp = [];
              // this.warningMsg=[{retailerName:'abdsfsd'},{retailerName:'uywerhew'},{retailerName:'a54326542'}];
              for (const w of this.warningMsg) {
                if (w != '') {
                  const data = {
                    retailerName: w
                  };
                  temp.push(data);
                }
              }
            this.warningMsg = temp;
            // if(this.warningMsg!='') {
            // this.modal(this.invoiceWarning);
            // }
          } else {

            const list = this.dataList[i];
            const datas = {
              sellerPan: list[0],
              anchorReferenceNo: list[1],
              invoicNo: list[2],
              invoiceDate: list[3],
              dueDate: list[4],
              invoiceAmount: list[5],
              beneId: list[6],
              remarks: list[7],
              sellerOrgId: list[8],
              buyerOrgId: list[9],
              UpdateFlag: list[10],
              distId: list[11],
              brandId: list[12],
              bankDetails: list[13],
              };
              if (list[7] == 'Success' && this.failed) {
                this.failed = false;
              }
              this.finalList.push(datas);
              if (list[10] == 1) {
                this.invoiceList.push(datas);
              }
          }

        }
        console.log('this.finalList::' + JSON.stringify(this.finalList));
      } else {
        // alert(data.message);
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));

}   // // this.upload = new Upload();


    // this.http.post('http://15.206.190.0:8001/upload.php', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   })

  }
  clearMsg() {
    this.warningMsg = '';
  }
  reupload() {
    window.location.reload();
  }
  uploadExcelData() {
    const sourcingPartnerId = this.sourcingPartnerId;
    // const data={
    //   datalist:this.invoiceList,
    //   sourcingPartner:sourcingPartnerId,
    //   userId:userId
    // }
    this.apiService.insertInvoiceData(this.invoiceList, sourcingPartnerId, this.userId)
    .subscribe(data => {
      if (data.status == 200) {
        this.set.setOption('Uploaded Successfully', true);

      // alert("Uploaded Successfully");
      // window.location.reload();
      this.ngOnInit();
      } else {
        this.set.setOption('Failed to upload', false);

        // alert("Failed To Upload");
        // window.location.reload();
      }
    }, error => console.log(error));
}
gotoList() {
    this.router.navigate(['brand/nodes']);
  }
  modal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
close() {
this.modalService.dismissAll();
}
}
