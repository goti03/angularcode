import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from '../../core/api.service';
import {Crypto} from '../../shared/crypto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import { AnyRecordWithTtl } from 'dns';




@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  errormsg: string;
  eventName: any;
  programName: any;
  activeInd: any;
  constructor(private modalService: NgbModal, private apiService : ApiService,private crypto: Crypto,private changeDetec: ChangeDetectorRef,private set: breadcrumbMessage ) { }
  roleId :any;
  programBannerList: any;
  userId:any;
  program : any;
  programId : any;
  orgId : any;
  programList : any;
  closeResult: string;
  newDynamic: any = {};
  smiList: Array<any> = [];
  eventList: Array<any> = [];
  fileDynamicList = [];
  imageEncode = [];
  submitted: any;
  eventId :any;
  fileDynamicFinal = [];
  mobileNo: any;
  loanid: any;
  content: any;
  contentName: any;
  uploaded: boolean;
  showevent: boolean=false ;
  showsubmit:boolean=false;
  bannerList: any;
  upload :any;
  description :any;
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  filePath:any;
  updateBannerList:any;
  ngOnInit() {
    console.log("ngOninti is called");
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.fileDynamicList = [];
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.orgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.apireload();
    this.apiService.getProgramList(this.roleId,this.orgId).subscribe(data => {
      if(data.status == 200){ 
        this.programList = data.result;
      }
    })
   

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
  ext(filename) {
    return filename.split('.').pop();
  }
  
  uploadfilearray(index, file) {
    var ext = this.ext(file[0].name);
    if ((ext == 'jpg') || (ext == 'jpeg') || (ext == 'png') ) {
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
        this.addeventrow();
      }
      this.deleteRow(index);
    }

  }

  showevents(){
    this.showevent=true;
    this.apiService.getProgramBanner(this.programId).subscribe(data => {
      if (data.status == 200) {
        this.programBannerList = data.result;
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });

  }
  addeventrow() {
    this.newDynamic = {
      eventId: '', descrip: '', upload: '',activeInd:'1'
    };
    this.eventList.push(this.newDynamic);
    this.changeDetec.detectChanges();
    return true;
  }
  
  onFileChange(event,index) { 
    var ext = this.ext(event.target.files[0].name);
    if ((ext == 'jpg') || (ext == 'jpeg') || (ext == 'png') ) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.myForm.patchValue({
          fileSource: file
        });
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.content = reader.result;
          this.uploaded = true;
          this.contentName = event.target.files[0].name;
          this.uploadfilereturns3(index);
        };
      }
    }else{
      this.set.setOption("Please choose jpg, jpeg, png files", false);
      const files=<HTMLInputElement>document.getElementById('myFile_'+index);
      files.value="";
    }
  }

  updateFileChange(event) { 
    var ext = this.ext(event.target.files[0].name);
    if ((ext == 'jpg') || (ext == 'jpeg') || (ext == 'png') ) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.myForm.patchValue({
          fileSource: file
        });
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.content = reader.result;
          this.contentName = event.target.files[0].name;
          this.getS3FilePaths();
        };
      console.log("this.updateBannerList::"+JSON.stringify(this.updateBannerList));
      }
    }else{
      this.set.setOption("Please choose jpg, jpeg, png files", false);
      const files=<HTMLInputElement>document.getElementById('file');
      files.value="";
    }
  }
  uploadfilereturns3(index) {
    const formData = new FormData();
    formData.append('file1', this.myForm.get('fileSource').value);
    formData.append('loanRequestId', '00');
    formData.append('userId', this.userId);
    formData.append('mobileNo', '');
    formData.append('documentTypeId', '0');
    var filePath;
    this.apiService.getS3FilePath(formData).subscribe(objRes => {
      if (objRes.status == 200) {
        this.eventList[index].filePath = objRes.result;
          
      } else {
        this.set.setOption(objRes.exceptionMessage,false);
      }
    }, error => console.log(error));
  }
  getS3FilePaths() {
    const formData = new FormData();
    formData.append('file1', this.myForm.get('fileSource').value);
    formData.append('loanRequestId', '00');
    formData.append('userId', this.userId);
    formData.append('mobileNo', '');
    formData.append('documentTypeId', '0');
    var filePath;
    this.apiService.getS3FilePath(formData).subscribe(objRes => {
      if (objRes.status == 200) {
        this.updateBannerList.filePath= objRes.result;
      } else {
        this.set.setOption(objRes.exceptionMessage,false);
      }
    }, error => console.log(error));
  }

  deleteRow(index) {
      this.eventList.splice(index, 1);
      return true;
    
  }
  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
}
checkEventId(index){
  for(let b of this.programBannerList){
    if(b.eventId==this.eventList[index].eventId){
      this.set.setOption(b.eventName+" Event already Exists for "+b.programName,false);
      this.eventList[index].eventId="";
      return;
    }
  }
  

}
  onSubmit() {
    for(let e of this.eventList){
      if(this.isNullorUndefinedorEmpty(e.eventId)){
        this.set.setOption("Please choose Event",false);
        return;
      }else if(this.isNullorUndefinedorEmpty(e.filePath)){
        this.set.setOption("Please choose File",false);
        return;
      }
    }
    
    this.submitted = true;
        this.apiService.saveBannerEvent(this.eventList,this.programId).subscribe(data => {
          if (data.status == 200) {
            this.set.setOption(data.exceptionMessage, true);
            this.showevents();
            this.eventList=[];
            this.apiService.getProgramBanner(this.programId).subscribe(data => {
              if (data.status == 200) {
                this.programBannerList = data.result;
              }else{
                this.set.setOption(data.exceptionMessage,false);
              }
            });
            // this.modalService.dismissAll();
          } else {
            this.set.setOption(data.exceptionMessage, false);
          }
        }, error => { console.log(error.message); });
    }

    update(){
        var data=[];
        data.push(this.updateBannerList);
        this.submitted = true;
        this.apiService.saveBannerEvent(data,this.programId).subscribe(data => {
          if (data.status == 200) {
            this.set.setOption(data.exceptionMessage, true);
            this.ngOnInit();
            this.modalService.dismissAll();
          } else {
            this.errormsg=data.exceptionMessage;
            // this.set.setOption(data.exceptionMessage, false);
          }
        }, error => { console.log(error.message); });

       

  }
    
    
  

apireload(){
  this.apiService.bannerList().subscribe(res => this.bannerList = res.result);
   
}
downloadView(filePathr: any) {
    var url1 = filePathr;
    window.open(url1, '_blank');
}



editPopup(content,l){
  this.errormsg = "";
  this.updateBannerList=l;
  // this.eventName = l.eventName;
  // this.programName = l.programName;
  // this.activeInd = l.activeInd; 
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

}
