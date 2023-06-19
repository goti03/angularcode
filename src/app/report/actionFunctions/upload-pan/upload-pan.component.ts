
import { Component, OnInit,ChangeDetectorRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import { Currency } from '../../../shared/currency.service';
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-upload-pan',
  templateUrl: './upload-pan.component.html',
  styleUrls: ['./upload-pan.component.css']
})
export class UploadPanComponent implements OnInit {
  
  loanid: any;
  actionId: any;

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

  data: ReportModel = new ReportModel();
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  model2: NgbDateStruct;
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,private crypto: Crypto,
    private apiService : ApiService, private set : breadcrumbMessage, private currency : Currency) { }  
    
    ngOnInit() {
      this.loanid = this.route.snapshot.params['loanid'];
      this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
      this.actionId = this.route.snapshot.params['id'];
      this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
      
        this.HeaderDetails=data.result;
        // alert("this.HeaderDetails::"+JSON.stringify(this.HeaderDetails));
        for(let h of this.HeaderDetails){
          this.mobileNo = h.mobileNo;
        }
        
        // alert("this.mobileNo:"+this.mobileNo);
      }, error => console.log(error));
      
   
    }
    gotoList() {
      this.router.navigate(['/report/']);
    }

// base64
ext(filename) {
  return filename.split('.').pop();
}
uploadfilearray(file){
  var ext = this.ext(file[0].name);
  if (ext == 'jpg' || ext == 'jpeg' || ext == 'png'){
    let  reader = new FileReader();
      reader.readAsDataURL(file[0])
      var  t= this;
      reader.onload = function (){
        t.imageEncode.push(reader.result)
      }
  } else{
    this.set.setOption("Please choose Image Files", false);
    const files=<HTMLInputElement>document.getElementById('uploadFile');
      files.value="";
  }   
  }

    submit(){
      // alert("submit");
      this.dob = this.model2.day + "-" + this.model2.month + "-" + this.model2.year;
      const alert = "this.mobileNo:"+this.mobileNo;
      this.set.setOption(alert,true);
      this.firstName=(document.getElementById("firstName") as HTMLInputElement).value;
      this.lastName=(document.getElementById("lastName") as HTMLInputElement).value;
      this.panNo=(document.getElementById("panNo") as HTMLInputElement).value;
      this.uploadFile=(document.getElementById("uploadFile") as HTMLInputElement).value;
      var temp=this.uploadFile.split("\\");
      var filename=temp[(temp.length-1)];
      var curDate =moment().format('YYYY-MM-DD HH:mm:ss');


          
          const imageUpload = {
            fileName: this.loanid + "_" +filename,
            encodeImage: this.imageEncode[0].split(",")[1],
            fileNameBack: 'NA',
            encodeImageBack:'NA',
            fileType:"1",
            mobileNo : this.mobileNo,
            userId:this.userId,
            lastActivityTime: curDate,
            loanRequestId: this.loanid,
            currentActivityId:"5",
            userMedium:"backendApp"
          }
          console.log("imageUpload:"+JSON.stringify(imageUpload));
          const saveImage = {
            fileName: this.loanid + "_" +filename,
            fileNameBack: 'NA',
            mobileNo : this.mobileNo,
            fileType:"1",
            userId: this.userId,
            lastActivityTime: curDate,
            loanRequestId: this.loanid,
            currentActivityId:"5",
            userMedium:"backendApp",
            name:this.firstName,
            lastName:this.lastName,
            dob:this.dob,
            address:"",
            docNo:this.panNo,
            gender:""
          }
          const alert1 = "saveImage:"+saveImage;
          this.set.setOption(alert1,true);

          this.apiService.callImageUploadS3(imageUpload).subscribe(data => {
      
            if (data.status === 200) {
              this.set.setOption("File uploaded sucessfully. Please wait we are validating your details",false);

              // alert("File Uploaded succesfully. Please wait we are validating your details.");
              
              this.apiService.getOCRData(imageUpload).subscribe(data => {    
                if (data.status === 200) {
                  this.set.setOption("Date validated successfully",true);

                  // alert("Data validated successfully");
                  this.apiService.saveLREditedData(saveImage).subscribe(data => {    
                    if (data.status === 200) {
                      this.set.setOption("Pan verification completed successfully",true);

                      // alert("Pan verification completed successfully");
                      this.gotoList();
                    }else{
                      this.set.setOption(data.exceptionMessage,false);

                      // alert(data.message);
                    }

                  }, error => {
                    this.set.setOption(error.message,false);

                    // alert(error.message);
                  });  

                }
              }, error => {
                this.set.setOption(error.message,false);

                // alert(error.message);
              });  

            }
          }, error => {
            this.set.setOption(error.message,false);

            // alert(error.message);
          });

      //   }else {
      //     alert("Unable to access");
      //   }
      // });
    }
    addRowFile() {
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
    goToList(){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }
    indianCurrency(Amount){
      return this.currency.indianCurrency(Amount);
    }
  }
