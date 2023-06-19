import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "..//..//core/api.service";
import { ExcelService } from "..//..//shared/excel.service"
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './distance-analysis.component.html',
  styleUrls: ['./distance-analysis.component.css']
})
export class DistanceAnalysisComponent implements OnInit {
  // upload: Upload = new Upload();
  sourcingPartnerList = [];
  gstList = [];
  cibilList = [];
  finalList = [];
  submitted: boolean;
  updateFlag: any;
  brandList: any;
  programList: any;
  retailerList: any;
  brandId: any;
  companyName: any;
  sourcingPartnerId: any;
  retailerId: any;
  fileName: any;
  templateLoaction: any;
  myForm = new FormGroup({
    // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private apiService: ApiService,private crypto: Crypto,
     private router: Router, private excelService: ExcelService, private set: breadcrumbMessage) { }

  get f() {
    return this.myForm.controls;
  }




  result: any;
  table:boolean;

  pan:any = "";
  pin:any = "";
  gst:any = "";
  lal:any = "25000";
  col:any = "10000";
  name: any = "";
  radioflag : any;
  dob : any = "";
  dateLimit: any;

  Cached = "false";
  Fresh = "true";

  userId:any;

  loader : boolean = true;
  preventTyping() {
    return false;
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
}
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.dateLimit=moment().subtract(21, 'year').format('YYYY-MM-DD')
    this.userId = Number(this.userId);
    this.submitted = false;
    this.table = true;
    this.radioflag = "true";
    // this.apiService.getPartnerList().subscribe(res => this.sourcingPartnerList = res.result);
    // this.templateLoaction = this.apiService.baseUrl.replace('finAggMobileAPI/api/v1/', 'uploadFiles/Distance_Analysis_Template.xlsx');
    this.templateLoaction = "https://finagg-prod.s3.ap-south-1.amazonaws.com/finagg/sample/Merchant_Analysis_Template.xlsx";
  }
  ext(filename) {
    return filename.split('.').pop();
  }
  onFileChange(event) {
    var ext = this.ext(event.target.files[0].name);
    if (ext == 'xlsx'){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.fileName = file.name;
        this.myForm.patchValue({
          fileSource: file
        });
      }
    }else{
      this.set.setOption("Please choose Excel Files", false);
      const files=<HTMLInputElement>document.getElementById('file');
      files.value="";
    }
  }

  submit() {
    this.companyName = "Finagg";
    const formData = new FormData();
    if (this.companyName == undefined || this.companyName == null || this.companyName == '') {
      this.set.setOption("please Enter Company Name", false);
      // alert("please Enter Company Name");
    } else if (this.myForm.get('fileSource').value == null || this.myForm.get('fileSource').value == '') {
      this.set.setOption("please select attachment", false);
      // alert("please select attachment");  
    } else {
      formData.append('file', this.myForm.get('fileSource').value);
      formData.append('companyName', this.companyName);
      formData.append('userId', this.userId);
      this.apiService.uploadDistanceAnalysis(formData).subscribe(data => {
        if (data.status == 200) {
          this.submitted = true;
          for (let i = 0; i < data.result.length; i++) {
            var list = data.result[i];
            let j = 0;
            let k = 0;
            for (; j < list.gstData.length; j++) {
              var gstData = Object.assign({});
              gstData.slNo = j+1;
              gstData.soleProp = (!list.company)?'Yes':'No';
              gstData.companyPan = list.companyOrSolePropPan;
              gstData = Object.assign(gstData, list.gstData[j]);
              this.gstList.push(gstData);
            }
            for (; k < list.cibilData.length; k++) {
              var cibilData = Object.assign({});
              cibilData.slNo =k+1;
              cibilData.soleProp = (!list.company)?'Yes':'No';
              cibilData.mainPan = list.companyOrSolePropPan;
              cibilData = Object.assign(cibilData, list.cibilData[k]);
              this.cibilList.push(cibilData);
            }

            const datas = {
              mainPan: list.companyOrSolePropPan || list.error,
              gstNumber: j,
              cibilNumber: k
            }
            this.finalList.push(datas);
          }
        } else {
          alert(data.message);
        }
      }, error => console.log(error));
    }
  }

  reUploadBrandData() {
    window.location.reload();
  }

  gotoList() {
    this.router.navigate(['brand/nodes']);
  }

  downloadExcelDataCibil() {
    this.excelService.exportAsExcelFile(this.cibilList, "Cibil_Merchant");
  }
  downloadExcelDataGSTN() {
    this.excelService.exportAsExcelFile(this.gstList, "GST_Merchant");
  }


  merchantAnalysis() {
    this.loader = false;
    let formData = new FormData();
    var pangst;
    if( this.pan == "" && this.gst == "") {
      this.set.setOption("Either fill Pan or Gst Number", false);
      return;
    }
    // if( this.name == "") {
    //   this.set.setOption("Enter Name", false);
    //   return;
    // }
    // if( this.pin  == "" || this.col  == "" || this.lal  == "")

    // {

    //   this.set.setOption("Fill out mandatory fields", false);

    //   return;

    // }
    if(this.isNullorUndefinedorEmpty(this.gst)) {
      this.gst = '';
    }
    if(this.isNullorUndefinedorEmpty(this.pan)) {
      this.pan = '';
    }
    if(this.dob != ""){
      var date = this.dob;
      this.dob = date.substring(8,10)+date.substring(5,7)+date.substring(0,4);
    }
    this.apiService.merchantAnalysing(this.pan,this.gst,this.pin,this.col,this.lal,this.radioflag,this.name,this.userId,this.dob).subscribe( data => {
      if(data.exceptionOccured == 'Y') {
        this.set.setOption(data.exceptionMessage,false);
      } else if(data.status == 200){
        this.result = data.result[0];
        this.pan = this.result.companyOrSolePropPan.toUpperCase();
        this.loader = true;
        this.table = false;
        console.log(this.result);
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    }, error => console.log(error))
  }

  back() {
    this.table = true;
  }

  cir(a) {
    // window.location.assign(this.result.cibilData[0].cir);
    window.open(this.result.cibilData[a].cir, "_blank");
    // document.location.href = ;
    // this.router.navigate([])
  }

  parseOut(a){
    var b = JSON.parse(a);
    return b.idType + " - " + b.idNumber;
  }

}
