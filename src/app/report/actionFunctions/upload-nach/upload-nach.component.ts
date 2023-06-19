
import { Component, OnInit,ChangeDetectorRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { Dimensions,ImageCroppedEvent,ImageTransform } from 'ngx-image-cropper';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import { Currency } from '../../../shared/currency.service';
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-upload-nach',
  templateUrl: './upload-nach.component.html',
  styleUrls: ['./upload-nach.component.css']
})
export class UploadNachComponent implements OnInit {
  
  loanid: any;
  actionId: any;
  nachDetails={
    bankId:'',
    branchName:'',
    accountType:'',
    accountNo:'',
    accHolderName:'',
    ifscCode:'',
    encodeData:''
  }
  nachDataautoload:any;
  stausId:any;
  substatusId:any;
  programId:any;
  statusFlow:any;
  orgId:any;
  
  dob: any;
  firstName: any;
  lastName: any;
  Gender: any;
  panNo: any;
  mobileNo: any;
  address: any;
  uploadFile: any;
  HeaderDetails: any;
  imageEncode = [];
  checklistStatus:boolean;
  data: ReportModel = new ReportModel();
  UploadedDocuments:Array<any>=[];
  UploadedDocumentsList:Array<any>=[];
  filenetList:Array<any>=[];
  accountType:Array<any>=[];
  bankName:Array<any>=[];
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  model2: NgbDateStruct;
  id:any;
  imagePath:any;
  documentTypeList:any;
  fileDynamicFinal=[];
  saveButton:any;
  fileName:String;
  cropFileSize:number=0;
  error:boolean=false;
  closeResult: string;
  
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  kbytes: number;
  submitButton:boolean=false;
  imageHight:number=0;
  imageWidth:number=0;
  programTypeId:any;
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,private crypto: Crypto,
    private apiService : ApiService,private modalService: NgbModal, private set : breadcrumbMessage, private currency : Currency) { }  
    
    ngOnInit() {
      this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
      this.route.queryParams.subscribe(params => {
        this.nonStopFlag = params['nonStopFlag'];
      });
      this.loanid = this.route.snapshot.params['loanid'];
      this.actionId = this.route.snapshot.params['id'];
      this.programTypeId = this.route.snapshot.params['programTypeId'];
      this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
              this.HeaderDetails=data.result;
          this.mobileNo = this.HeaderDetails[0].mobileNo;
      }, error => console.log(error));
      this.apiService.getAccountTypeList().subscribe(res => this.accountType = res.result);
      this.apiService.getBankNameList().subscribe(res => this.bankName = res.result);
      
      var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
      const inputString={
        userId:this.userId,
        lastActivityTime:curDate,
        loanRequestId:this.loanid
      };
      this.apiService.getPhysicalNACHDetail(inputString).subscribe(
        res=>{
          this.nachDataautoload=res.result;
        }
      ,error => console.log(error));
      
      }
      nonStopFlag : any;

    gotoList() {
      this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
        this.HeaderDetails=data.result;
        this.mobileNo = this.HeaderDetails[0].mobileNo;
        this.stausId = this.HeaderDetails[0].stausId;
        this.substatusId = this.HeaderDetails[0].substatusId;
        this.programId = this.HeaderDetails[0].programTypeId;
        this.statusFlow=this.HeaderDetails[0].statusflow;
        this.router.navigate(['report/action'],{ queryParams: { 'loanId':this.loanid,
        'orgId':this.orgId,'programTypeId':this.programId }});
      }, error => console.log(error));   
      // if(this.nonStopFlag == 0){
        // this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    // }else{
    //     this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
    // }
      // this.router.navigate(['/report/']);
    }

// base64

uploadfilearray(file)
  { 
    let  reader = new FileReader();
    reader.readAsDataURL(file[0])
    var  t= this;
    reader.onload = function (){
    t.imageEncode.push(reader.result)
    }
    // alert("2");
  }

    submit(){
      // alert("nachDetails::"+JSON.stringify(this.nachDetails));
    //  console.log("imageEncode:"+JSON.stringify(this.imageEncode));
  //    console.log("this.imageEncode::"+this.imageEncode[0].split(",")[1]);
      var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
      const data2={
        userId:this.userId,
        lastActivityTime:curDate,
        loanRequestId:this.loanid,
        fileContent:this.croppedImage
         }

        console.log("data2::"+JSON.stringify(data2));
         if(this.kbytes>55 && this.kbytes<80)
         {

        this.apiService.nachRegistration(data2).subscribe(data => {
          if(data.status==200){
            this.set.setOption("Nach Registered Successfully",true);

            // alert("Nach Registered Successfully");
            this.gotoList();
            // window.location.reload();
            // this.ngOnInit();
          }else{
            this.set.setOption("Nach Registered Failed",false);

            // alert("Nach Registeration Failed");
            // window.location.reload();
            this.ngOnInit();
          }
        }, error => console.log(error));  
      }
      else{
      const alert = "The Upload Image should me less then 80KB or Greater then 55kB the image have" + this.kbytes;
      this.set.setOption(alert,false);

      }

    }

    checkStatus(){
      var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
      const data={
        userId:this.userId,
        lastActivityTime:curDate,
        loanRequestId:this.loanid
      }
      
      this.apiService.checkLoanStatus(data).subscribe(data => {
        if(data.status==200){
          this.set.setOption(data.result,true);

          // alert(data.result);
          this.gotoAction();
        }else{
          this.set.setOption(data.exceptionMessage,false);

          // alert(data.result);
          window.location.reload();
        }
      }, error => console.log(error));
    }
    addRowFile(index) {
      this.filenewDynamic = {
        file:'',comment:'',
      };
      this.fileDynamicList.push(this.filenewDynamic);
      this.changeDetec.detectChanges();
      return true;
    }
    
    deleteRowFile(index) {  
    
      if(this.fileDynamicList.length ==1) { 
        this.set.setOption("Can't delete the row when there is only one row",false);
 
        // alert("Can't delete the row when there is only one row");
         return false;  
      } else {  
          this.fileDynamicList.splice(index, 1);  
           return true;  
      }  
    }    
    
    downloadView(filePath, filename:string){
      // var url=filePath+filename;
      // window.open(url, '_blank');
      if(filePath.indexOf("s3.ap-south-1")!=-1){
        var url1=filePath;
        window.open(url1, '_blank');
      }else{
        var url2=filePath+filename;
        window.open(url2, '_blank');
      }
    }
    downloadPdf(i) {
      var base64=this.UploadedDocuments[i].encodeData;
      const linkSource = 'data:application/pdf;base64,' + base64;
      const downloadLink = document.createElement("a");
      const fileName = this.UploadedDocuments[i].fileSource;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
}
gotoAction(){
  this.apiService.getLoanHeaderDetails(this.loanid).subscribe(data => {
    this.HeaderDetails=data.result;
    this.mobileNo = this.HeaderDetails[0].mobileNo;
    this.stausId = this.HeaderDetails[0].stausId;
    this.substatusId = this.HeaderDetails[0].substatusId;
    this.programId = this.HeaderDetails[0].programTypeId;
    this.statusFlow=this.HeaderDetails[0].statusflow;
    this.orgId=this.HeaderDetails[0].orgId;
    this.router.navigate(['report/action'],{ queryParams: { 'loanId':this.loanid,
    'orgId':this.orgId,'programTypeId':this.programId }});
  }, error => console.log(error));     
}

ext(filename) {
  return filename.split('.').pop();
}
fileChangeEvent(event: any): void {
  var ext = this.ext(event.target.files[0].name);
  if (ext == 'jpg' || ext == 'jpeg' || ext == 'png'){
    this.imageChangedEvent = event;
    this.fileName = event.target.files[0].name;
   if((event.target.files[0].size)/1024>1024)
     {
      this.set.setOption("The file size should be less than 1 MB",false);
      this.imageChangedEvent = null
     event.target.files[0].value='';
     }
  }else{
    this.set.setOption("Please choose Image Files", false);
    const files=<HTMLInputElement>document.getElementById('file');
      files.value="";
  }
}

imageCropped(event: ImageCroppedEvent) {

  this.imageHight=event.height;
  this.imageWidth=event.width;
  this.calculateImageSize(event.base64);
  var imagewidth=event.width;
  var imageheight=event.height;
  this.compressImage( event.base64, imagewidth,imageheight).then(compressed => {
   this.croppedImage = compressed;
   
 })
 
 
}

imageLoaded(event: any) {
this.showCropper = true;
}

cropperReady(sourceImageDimensions: Dimensions) {
console.log('Cropper ready', sourceImageDimensions);
}

loadImageFailed() {
  this.set.setOption("Load Failed",false);

// alert('Load failed');
console.log('Load failed');
}

rotateLeft() {
this.canvasRotation--;
this.flipAfterRotate();
}

rotateRight() {
this.canvasRotation++;
this.flipAfterRotate();
}

private flipAfterRotate() {
const flippedH = this.transform.flipH;
const flippedV = this.transform.flipV;
this.transform = {
  ...this.transform,
  flipH: flippedV,
  flipV: flippedH
};
}


flipHorizontal() {
this.transform = {
  ...this.transform,
  flipH: !this.transform.flipH
};
}

flipVertical() {
this.transform = {
  ...this.transform,
  flipV: !this.transform.flipV
};
}

resetImage() {
this.scale = 1;
this.rotation = 0;
this.canvasRotation = 0;
this.transform = {};
}

zoomOut() {
this.scale -= .1;
this.transform = {
  ...this.transform,
  scale: this.scale
};
}

zoomIn() {
this.scale += .1;
this.transform = {
  ...this.transform,
  scale: this.scale
};
}

toggleContainWithinAspectRatio() {
this.containWithinAspectRatio = !this.containWithinAspectRatio;
}

updateRotation() {
this.transform = {
  ...this.transform,
  rotate: this.rotation
};
}

calculateImageSize(base64String) {
let padding;
let inBytes;
let base64StringLength;
if (base64String.endsWith('==')) { padding = 2; }
else if (base64String.endsWith('=')) { padding = 1; }
else { padding = 0; }
base64StringLength = base64String.length;
// console.log(base64StringLength);
inBytes = (base64StringLength / 4) * 3 - padding;
// console.log(inBytes);
this.kbytes = inBytes / 1024;
return this.kbytes;
}

compressImage(src,newX,newY) {
return new Promise((res, rej) => {
const img = new Image();
img.src = src;
img.onload = () => {
const elem = document.createElement('canvas');
elem.width = newX;
elem.height = newY;
const ctx = elem.getContext('2d');
ctx.drawImage(img, 0, 0, newX, newY);
var imageData=ctx.getImageData(0,0, newX, newY);
for (var i=0;i<imageData.data.length;i+=4) {
  var avg = (imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3;
  imageData.data[i] = avg;
  imageData.data[i+1] = avg;
  imageData.data[i+2] = avg;
}
ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);  
var data = ctx.canvas.toDataURL('image/jpeg',90/100);
data=data.replace('data:image/jpeg;base64,', '');
res(data);
}
img.onerror = error => rej(error);
})
}

open(content) {
var curDate = moment().format('YYYY-MM-DD HH:mm:ss');
let cropImageData={
  userId:this.userId,
  lastActivityTime:curDate,
  loanRequestId:this.loanid,
  fileName: this.fileName,
  fileContent:this.croppedImage
};

  this.apiService.compressImages(cropImageData).subscribe(
    data=>{
      this.croppedImage=data.result;
      this.submitButton=true;
      var size=this.calculateImageSize(data.result);
              
    }, error => console.log(error));
  
  
this.modalService.open(content, { windowClass: 'my-class',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
return  `with: ${reason}`;
}
}
goToList(){
  if(this.nonStopFlag == 0){
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
  }else{
      this.router.navigate(['/report/draftLoanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'1' }} );
  }
}
indianCurrency(Amount){
  return this.currency.indianCurrency(Amount);
}

tab : boolean = false;
toggle(){
  this.tab = !this.tab;
}
 downloadNachForm() {
    this.apiService.downloadForm(this.loanid, 0, 3).subscribe(data => {
      if (data.status == 200) {
        if (data.exceptionOccured == 'Y') {
          this.set.setOption(data.result, false);
          this.ngOnInit();
        } else {
          window.open(data.result, '_blank');
          this.ngOnInit();
        }
      } else if (data.status == 401) {
        this.set.setOption(data.result, false);
        this.ngOnInit();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }
}
