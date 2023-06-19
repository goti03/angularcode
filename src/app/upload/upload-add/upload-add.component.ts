import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService} from "..//..//core/api.service";
import { Constant } from '../../core/constant';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import { environment } from '../../../environments/environment';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './upload-add.component.html',
  styleUrls: ['./upload-add.component.css']
})
export class UploadAddComponent implements OnInit{
  // upload: Upload = new Upload();
  // url=this.apiService.baseUr2.replace("finAggPortalAPIService/api/v1/","uploadFiles/");
  url="https://finagg-prod.s3.ap-south-1.amazonaws.com/finagg/sample/Brand_data_template.xlsx";
  sourcingPartnerList =[];
  dataList =[];
  finalList=[];
  submitted:boolean;
  hide:boolean=false;
  hideSorcPartner:boolean=false;
  updateFlag:any;
  brandList:any;
  programList:any;
  retailerList:any;
  brandId:any;
  programId:any;
  sourcingPartnerId:any;
  retailerId:any;
  fileName:any;
  roleId :any;
  hideButton:boolean=false;
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    brandId: new FormControl(''),
    // programId: new FormControl(''),
    retailerId: new FormControl(''),
    file: new FormControl('', [Validators.required]),
    sourcingPartner: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  userId:any;
  constructor(private http: HttpClient, private apiService: ApiService,private crypto: Crypto,
    private router: Router, private set : breadcrumbMessage ) { }
  
  get f(){
    return this.myForm.controls;
  }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.apiService.getPartnerList().subscribe(res => this.sourcingPartnerList = res.result);
    if(this.roleId == 4 || this.roleId == 8){
      this.retailerId=this.crypto.decryt(window.localStorage.getItem("orgId"));
      this.apiService.getBrandOrgId(this.retailerId).subscribe(data => {
        this.sourcingPartnerId=data.result;
        console.log("this.sourcingPartnerId::"+this.sourcingPartnerId);
        this.getprogram(this.sourcingPartnerId);
        this.getretailer(this.sourcingPartnerId);
      });
      console.log("this.retailerId::"+this.retailerId);
      this.hide=true;
      this.hideSorcPartner=true;
    }else if(this.roleId == 11){
      console.log("this.roleId::"+this.roleId);
      this.sourcingPartnerId=this.crypto.decryt(window.localStorage.getItem("orgId"));
      console.log("this.sourcingPartnerId::"+this.sourcingPartnerId);
      this.getretailer(this.sourcingPartnerId);
      this.hideSorcPartner=true;
      this.hide=false;
    }else{
      this.hideSorcPartner=false;
      this.hide=false;
    }
    this.submitted=false;
    this.dataList=[];
    this.updateFlag=[];
    this.finalList=[];
  }
  getProgramId(){
    // alert((document.getElementById("sourcingPartnerId") as HTMLInputElement).value);
    // var org=(document.getElementById("sourcingPartnerId") as HTMLInputElement).value;
    this.getprogram(this.sourcingPartnerId);
    this.getretailer(this.sourcingPartnerId);
  }
  getprogram(org){
    this.apiService.programList(org).subscribe(res => this.programList = res.result);
  }
  getretailer(org){
    this.apiService.retailerList(org).subscribe(res => this.retailerList = res.result);
  }
  ext(filename) {
    return filename.split('.').pop();
  }
  onFileChange(event) {
    var ext = this.ext(event.target.files[0].name);
    if ( ext == 'xlsx' ){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.fileName = file.name;
        this.myForm.patchValue({
          fileSource: file
        });
      }
    }else{
      this.set.setOption("Please choose Image,Excel or PDF Files", false);
      const files=<HTMLInputElement>document.getElementById('file');
      files.value="";
    }
  }
     
  submit(){
    this.hideButton=true;
    // this.submitted=true;
    // this.programId=(document.getElementById("programId") as HTMLInputElement).value;
    // this.retailerId=(document.getElementById("retailerId") as HTMLInputElement).value;
    // this.sourcingPartnerId =(document.getElementById("sourcingPartnerId") as HTMLInputElement).value;
    // alert(this.sourcingPartnerId);

    const formData = new FormData();
    if(this.sourcingPartnerId == undefined || this.sourcingPartnerId == null || this.sourcingPartnerId == ''){
      this.set.setOption("Please select Sourcing partner", false);
  
      // alert("please select sourcing partner");
        this.hideButton=false;
      // }else if(this.programId == undefined || this.programId == null || this.programId == ''){
      //   this.set.setOption("Please select program", false);

        // alert("please select Program");
        // this.hideButton=false;
      }else if(this.retailerId == undefined || this.retailerId == null || this.retailerId == ''){
        this.set.setOption("Please select retailer", false);

        // alert("please select retailer   ");
        this.hideButton=false;
      // }else if(this.retailerId == undefined || this.retailerId == null || this.retailerId == ''){
      //   alert("please select Retailer/Dealer");
      }else if(this.myForm.get('fileSource').value==null || this.myForm.get('fileSource').value == ''){
        this.set.setOption("Please select attachment", false);

        // alert("please select attachment");  
        this.hideButton=false;
      }else{
        formData.append('file', this.myForm.get('fileSource').value);
        formData.append('sourcingPartner', this.sourcingPartnerId);
        formData.append('userId', this.userId);
        formData.append('programId', this.programId);

        // formData.append('sourcingPartner', this.myForm.get('sourcingPartner').value);
        // // console.log(formData);
        this.apiService.createUploadSetup(formData)
          .subscribe(data => {
            if(data.status==200){
              this.submitted=true;
        // alert("Successfully Uploaded");
        // this.gotoList();
        this.dataList=data.result.dataList;
        this.updateFlag=data.result.updateFlag;
        this.finalList=data.result.finalList;
        // for(let i=0;i<this.dataList.length;i++){
        //   var list=this.dataList[i];
        //   const datas={
        //     entityName:list[1],
        //     address:list[2],
        //     City:list[3],
        //     state:list[4],
        //     pincode:list[5],
        //     type:list[6],
        //     firmType:list[7],
        //     gst:list[8],
        //     pan:list[9],
        //     companyStartDate:list[10],
        //     brandStartDate:list[11],
        //     personName:list[12],
        //     mobileNo:list[13],
        //     mailID:list[14],
        //     fmiv:list[15],
        //     fmiy:list[16],
        //     smiv:list[17],
        //     smiy:list[18],
        //     tmiv:list[19],
        //     tmiy:list[20],
        //     fomiv:list[21],
        //     fomiy:list[22],
        //     fimiv:list[23],
        //     fimiy:list[24],
        //     simiv:list[25],
        //     simiy:list[26],
        //     svmiv:list[27],
        //     svmiy:list[28],
        //     emiv:list[29],
        //     emiy:list[30],
        //     nmiv:list[31],
        //     nmiy:list[32],
        //     temiv:list[33],
        //     temiy:list[34],
        //     elmiv:list[35],
        //     elmiy:list[36],
        //     twmiv:list[37],
        //     twmiy:list[38],
        //     bracnchName:list[39],
        //     branchDistance:list[40],
        //     salesPerson:list[41],
        //     salesMobileNo:list[42],
        //     remarks:list[43]

        //   }
        //   this.finalList.push(datas);
        // }
        // alert("this.finalList::"+JSON.stringify(this.finalList));
      }else{
        this.set.setOption(data.message, false);

        // alert(data.message);
        this.hideButton=false;
      }
    }, error => console.log(error));

}   // // this.upload = new Upload();

   
    // this.http.post('http://15.206.190.0:8001/upload.php', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   })
    
  }

  reUploadBrandData(){
    window.location.reload();
  }

  uploadExcelData(){
    // alert(this.retailerId);
    // const data={
    //   datalist:this.dataList,
    //   sourcingPartner:sourcingPartnerId,
    //   userId:userId
    // }
    // alert(this.sourcingPartnerId);
    // this.programId=0;
    // if(this.env!='Jana'){
    //   this.programId = 0;
    // }
    this.apiService.insertBrandData(this.dataList,this.sourcingPartnerId,this.userId,this.programId,this.retailerId)
    .subscribe(data => {
      if(data.status == '200'){
        this.set.setOption("Uploaded Successfully", true);
        this.gotoList();
        }else{
          this.set.setOption("Failed to upload", false);
          this.ngOnInit();
        }
  
    }, error => console.log(error));
}  
gotoList() {
  window.localStorage.setItem("programkey", "created");
    this.router.navigate(['brand/nodes']);
  }

  // getProgramId(){
  //   var sourcingPartnerId=(document.getElementById("sourcingPartner") as HTMLInputElement).value;
  //   // alert("sourcingPartnerId=="+sourcingPartnerId);
  // }
}
