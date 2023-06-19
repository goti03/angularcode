import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService} from "..//..//core/api.service";
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-updateExcel',
  templateUrl: './sourcing-updateExcel.component.html'
})
export class UploadExcelComponent implements OnInit{
  // upload: Upload = new Upload();
  sourcingPartnerList =[];
  dataList =[];
  finalList=[];
  submitted:boolean;
  SupplierList:[];
  templateLoaction:String;
  programList:[];
  retailerList:[];
  programId:any
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    programId: new FormControl('',),
    fileSource: new FormControl('', [Validators.required])
  });
  updateFlag:any;
  roleId:any;
  orgId:any;
  userId:any;
  constructor(private http: HttpClient, private apiService: ApiService,private crypto: Crypto,
    private router: Router, private set : breadcrumbMessage) { }
      
  get f(){
    return this.myForm.controls;
  }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.submitted=false;
    // this.templateLoaction=this.apiService.baseUrl.replace('finAggMobileAPI/api/v1/','uploadFiles/supplierUploadTemplate.xlsx');
    this.templateLoaction="https://finagg-prod.s3.ap-south-1.amazonaws.com/finagg/sample/SupplierUploadTemplate.xlsx";
    this.roleId=window.localStorage.getItem('roleId');
    this.orgId=this.crypto.decryt(window.localStorage.getItem('orgId'));
    // this.apiService.getProgramList(this.roleId,this.orgId).subscribe(res => this.programList = res.result);
    this.apiService.getSellerProgramList().subscribe(res => this.programList = res.result);
   
    // this.apiService.getPartnerList().subscribe(res => this.sourcingPartnerList = res.result);
  }
  ext(filename) {
    return filename.split('.').pop();
  }
  onFileChange(event) {
    var ext = this.ext(event.target.files[0].name);
    if (ext == 'xlsx'){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
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
 
  submit(){
    const formData = new FormData();
    if(this.myForm.get('fileSource').value==null || this.myForm.get('fileSource').value == ''){
      this.set.setOption("please select attachment",false);
    }else if(this.programId==null || this.programId == ''){
    this.set.setOption("please select program",false);
    }else{
      formData.append('file', this.myForm.get('fileSource').value);
      formData.append('userId', this.userId);
      formData.append('programId', this.programId);
      this.apiService.createUploadExcel(formData)
        .subscribe(data => {
          if(data.status==200){
            this.submitted=true;
            this.dataList=data.result.dataList;
            this.updateFlag=data.result.updateFlag;
            for(let i=0;i<this.dataList.length;i++){
              var list=this.dataList[i];
              const datas={
                PAN:list[0],	
                name:list[1],
                businessname:list[2],
                phoneno:list[3],
                address:list[4],
                city:list[5],
                state:list[6],
                pincode:list[7],
                mailid:list[8],
                companystartdate:list[9],
                orgtype:list[10],
                firmtype:list[11],
                primarygstnumber:list[12],
                remarks:list[15]
              }
              this.finalList.push(datas);
            }
          }else{
            this.set.setOption(data.exceptionMessage,false);
          }
        }, error => console.log(error));

    }   
    
}
  


reUploadBrandData(){
  window.location.reload();
}

uploadExcelData(){

  this.apiService.insertSellerData(this.dataList,this.userId,this.programId)
  .subscribe(data => {
    if(data.status == '200'){
      this.set.setOption("Uploaded Successfully",true);

      // alert("Uploaded Successfully");
      this.gotoList();
      }else{
        this.set.setOption("Failed to Upload",false);

        // alert("Failed To Upload");
        window.location.reload();
      }

  }, error => console.log(error));
}

gotoList() {
  window.localStorage.setItem("programkey", "createsourcing");
    this.router.navigate(['brand/nodes']);
  }

  // getProgramId(){
  //   var sourcingPartnerId=(document.getElementById("sourcingPartner") as HTMLInputElement).value;
    // alert("sourcingPartnerId=="+sourcingPartnerId);
  // }
}