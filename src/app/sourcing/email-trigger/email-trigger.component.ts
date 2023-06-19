import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService} from "..//..//core/api.service";
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-emailTrigger',
  templateUrl: './email-trigger.component.html'
})
export class UploadEamilComponent implements OnInit{
  // upload: Upload = new Upload();
  sourcingPartnerList =[];
  templateList =[];
  campaignTypeList =[{"id":"1","name":"Email"},{"id":"2","name":"SMS"},{"id":"3","name":"Whatsapp"}];
  dataList =[];
  finalList=[];
  emailList=[];
  submitted:boolean;
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    sourcingPartner: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  typeId:any;
  tempateId:any;
  userId:any;
  constructor(private http: HttpClient, private apiService: ApiService,private router: Router,private crypto: Crypto,
     private set : breadcrumbMessage) { }
      
  get f(){
    return this.myForm.controls;
  }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.submitted=false;
    this.apiService.getPartnerList().subscribe(res => this.sourcingPartnerList = res.result);
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
  getTemplate(value){
    this.apiService.getTemplateList(value).subscribe(data=>{
      if(data.status==200){
        this.templateList=data.result;
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    })
  } 
  submit(){
    
    const formData = new FormData();
if(this.myForm.get('fileSource').value==null || this.myForm.get('fileSource').value == ''){
  this.set.setOption("please select attachment",false);
  // alert("please select attachment");
}else if(this.typeId==null || this.typeId== undefined || this.typeId=='0'){
  this.set.setOption("please select Campaign",false);
}else if(this.tempateId==null || this.tempateId== undefined || this.tempateId== '0'){
  this.set.setOption("please select Template",false);

}else{
  formData.append('file', this.myForm.get('fileSource').value);
  formData.append('userId', this.userId);
  formData.append('campaignTypeId', this.typeId);
  formData.append('TemplateTypeId', this.tempateId);
  this.apiService.uploadEmailData(formData)
    .subscribe(data => {
      if(data.status==200){
        this.submitted=true;
        this.set.setOption("Successfully uploaded",true);
        this.ngOnInit();
      }else{
        this.set.setOption(data.exceptionMessage,false);
        this.ngOnInit();
      }
    }, error => console.log(error));

}   
  }
gotoList() {
    this.router.navigate(['brand/nodes']);
  }

}