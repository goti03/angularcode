import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import * as moment from 'moment/moment.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-repay',
  templateUrl: './customer-repay.component.html',
  styleUrls: ['./customer-repay.component.css']
})
export class CustomerRepayComponent implements OnInit {
  url = 'https://finagg-prod.s3.ap-south-1.amazonaws.com/finagg/sample/CustomerRepaymentSheet.xlsx';
  CustomerDetails: Array<any> = [];
  startDate: any;
  endDate: any;
  lanNumber: any;
  dataList = [];
  finalList = [];
  totalAmount: number;
  disbursalId: any;
  utrNumber: any;
  customerPanNumber: any;
  ifscCode: any;
  customerName: any;
  submitted: boolean;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    programId: new FormControl('', ),
    fileSource: new FormControl('', [Validators.required])
  });
  updateFlag: any;
  errormsg: any;
  router: any;

  constructor( private apiService: ApiService,private set: breadcrumbMessage,private modalService: NgbModal) { }

  preventTyping() {
    return false;
  }

  ngOnInit() {
    this.startDate=moment().format('DD-MM-YYYY');
    this.endDate=moment().format('DD-MM-YYYY');
    this.submitted =false;
    this.finalList = [];
  }
  add() {
    const cusRepay = {
      lanNumber: '',
      totalAmount: '',
      disbursalId: '',
      dateOfAmountReceived: '',
      utrNumber: '',
      customerPanNumber: ''
    };
    this.CustomerDetails.push(cusRepay);
  }

  // manualData(){
  //   this.apiService.insertCustomerRepaymentStatus(this.CustomerDetails).subscribe(data => {
  //     if (data.exceptionOccured == 'Y') {
  //     this.set.setOption(data.exceptionMessage, false);
  //        } else if (data.status == 200) {
  //       this.set.setOption("Customer Repay Details Uploaded",true);
  //       } else {
  //       this.set.setOption(data.exceptionMessage, false);
  //     }
  //   }, error => console.log(error));
  // }

  // isNullorUndefinedorEmpty(str) {
  //   return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  // }

  // manualData(){
  //   if(this.isNullorUndefinedorEmpty(this.lanNumber)||this.isNullorUndefinedorEmpty(this.totalAmount)||this.isNullorUndefinedorEmpty(this.disbursalId)||this.isNullorUndefinedorEmpty(this.startDate)||
  //   this.isNullorUndefinedorEmpty(this.utrNumber)||this.isNullorUndefinedorEmpty(this.customerPanNumber)||this.isNullorUndefinedorEmpty(this.customerName)){
  //     this.errormsg = "Please Enter All Fields"
  //    }
  //    else{
  //     const data = {
  //       lanNumber: this.lanNumber,
  //       totalAmount: this.totalAmount,
  //       disbursalId: this.disbursalId,
  //       dateOfAmountReceived:this.startDate,
  //       utrNumber:this.utrNumber,
  //       customerPanNumber : this.customerPanNumber,
  //     }
  //   this.apiService.insertCustomerRepaymentStatus(this.CustomerDetails).subscribe(data => {
  //     if (data.exceptionOccured == 'Y') {
  //     this.set.setOption(data.exceptionMessage, false);
  //        } else if (data.status == 200) {
  //       this.set.setOption("Customer Repay Details Uploaded",true);
  //       } else {
  //       this.set.setOption(data.exceptionMessage, false);
  //     }
  //   }, error => console.log(error));
  // }
  // }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == null || str == undefined);
  }
  manualData() {
    let count =0;
    for(const r of this.CustomerDetails) {
      console.log('Count ===='+ count);
      if(this.isNullorUndefinedorEmpty(r.lanNumber)) {
       count=1;
      } else if(this.isNullorUndefinedorEmpty(r.customerName)) {
        count=1;
      } else if(this.isNullorUndefinedorEmpty(r.totalAmount)) {
        count=1;
      } else if(this.isNullorUndefinedorEmpty(r.dateOfAmountReceived)) {
        count=1;
      } else if(this.isNullorUndefinedorEmpty(r.disbursalId)) {
        count=1;
      } else if(this.isNullorUndefinedorEmpty(r.utrNumber)) {
        count=1;
      } else if (this.isNullorUndefinedorEmpty(r.customerPanNumber)) {
        count=1;
      }
    }
      if(count==0) {
        this.apiService.insertCustomerRepaymentStatus(this.CustomerDetails).subscribe(data => {
          if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.exceptionMessage, false);
             } else if (data.status == 200) {
            this.set.setOption('Customer Repay Details Uploaded',true);
            } else {
            this.set.setOption(data.exceptionMessage, false);
          }
        }, error => console.log(error));
      } else {
        this.errormsg = 'Please Enter All Fields';
      }
    }

  trasher(index) {
    this.CustomerDetails.splice(index, 1);
  }

//   submit() {
//     const formData = new FormData();
//     if (this.myForm.get('fileSource').value == null || this.myForm.get('fileSource').value == '') {
//       this.set.setOption('please select attachment', false);
//     }  else {
//       formData.append('file', this.myForm.get('fileSource').value);

//       this.apiService.createUploadExcel(formData)
//         .subscribe(data => {
//           if (data.status == 200) {
//             this.submitted = true;
//             this.dataList = data.result.dataList;
//             this.updateFlag = data.result.updateFlag;
//             for (let i = 0; i < this.dataList.length; i++) {
//               const list = this.dataList[i];
//               const datas = {
//                 lanNumber: list[0],
//                 customerName: list[1],
//                 totalAmount: list[2],
//                 startDate: list[3],
//                 disbursalId: list[4],
//                 utrNumber: list[5],
//                 customerPanNumber: list[6]
//               };
//               this.finalList.push(datas);
//             }
//           } else {
//             this.set.setOption(data.exceptionMessage, false);
//           }
//         }, error => console.log(error));

//     }
// }
// this.apiService.selectBorrowerTenureDetails(dataone).subscribe(data => {
//   if (data.status == 200) {
//     this.borrowerROIList = data.result;
//     for(let c of this.borrowerROIList)
//     {c.roi =parseFloat(c.roi).toFixed(2)
//     }
//   }
// });
submit() {
  const formData = new FormData();
  if (this.myForm.get('fileSource').value == null || this.myForm.get('fileSource').value == '') {
    this.set.setOption('please select attachment', false);
  }  else {
    formData.append('file', this.myForm.get('fileSource').value);

    this.apiService.uploadCustomerRepaymentData(formData)
      .subscribe(data => {
        if (data.status == 200) {
          const res=JSON.parse(data.result);
          this.submitted = true;
          this.dataList = res.dataList;
          this.updateFlag = res.updateFlag;
          for (let i = 0; i < this.dataList.length; i++) {
            const list = this.dataList[i];
            const datas = {
              lanNumber: list[0],
              customerPanNumber: list[1] ,
              totalAmount: list[2],
              startDate: list[3],
              disbursalId: list[4],
              utrNumber: list[5],
              ifscCode: list[6],
              customerName : list[7],
              responseMsg: list[8]
            };
            this.finalList.push(datas);
          }
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
  }
}

ext(filename) {
  return filename.split('.').pop();
}

onFileChange(event) {
  const ext = this.ext(event.target.files[0].name);
  if (ext == 'xlsx' || ext == 'xls'||ext == 'XLSX' || ext == 'XLS') {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  } else {
    this.set.setOption('Please choose Excel Files', false);
    const files = <HTMLInputElement>document.getElementById('file');
    files.value = '';
  }
}

insertData() {
  for(const c of this.dataList) {
    console.log('RAJA');
  c.totalAmount = parseFloat(c.totalAmount).toFixed(2);
  console.log('the total amount is==='+c.totalAmount);
}
  this.apiService.insertCustomerRepaymentData(this.dataList)
  .subscribe(data => {
    if (data.status == '200') {
      this.set.setOption(data.exceptionMessage, true);
      const files = <HTMLInputElement>document.getElementById('file');
      files.value = '';
      // this.reUploadData();
      this.ngOnInit();


      } else {
        this.set.setOption(data.exceptionMessage, false);
        this.ngOnInit();

      }

  }, error => console.log(error));
}

reUploadData() {
  window.location.reload();
}

saveExecutiondetails() {

}

}
