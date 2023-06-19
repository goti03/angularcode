import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-business-verification',
  templateUrl: './business-verification.component.html',
  styleUrls: ['./business-verification.component.css']
})
export class BusinessVerificationComponent implements OnInit {
  HeaderDetails: any;
  loanid: any;
  actionId: any;
  documentTypeList: any;
  list=[];
  uploadFile: any;
  imageEncode = [];
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  mobileNo:any;
  data: ReportModel = new ReportModel();
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,
   private apiService : ApiService, private set : breadcrumbMessage,private crypto: Crypto) { }

    ngOnInit() {
      this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
      this.loanid = this.route.snapshot.params['loanid'];
      this.actionId = this.route.snapshot.params['id'];
      this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
      this.mobileNo=this.HeaderDetails[0].mobileNo;
        this.HeaderDetails=data.result;
      }, error => console.log(error));
      // business verification

      const gstnList = {
        userId: this.userId+"",
        mobileNo:this.mobileNo,
        retailerId: this.crypto.decryt(window.localStorage.getItem('retailerId')),
        userMedium:"backendApp"
      }


      this.apiService.gstnList(gstnList).subscribe(data => {    
        if (data.status === 200) {
          this.list = data.result.list;
          const alert="We found "+this.list.length + " GSTN for your PAN.";
          this.set.setOption(alert,true);
        }
      }, error => {
        this.set.setOption(error.message,true);
        // alert(error.message);
      }); 

      }
      gotoList() {
        this.router.navigate(['/report/']);
      }
      ext(filename) {
        return filename.split('.').pop();
      }

      uploadfilearray(file){
      var ext = this.ext(file[0].name);
      if (ext == 'xlsx' || ext == 'pdf'){
        let  reader = new FileReader();
        reader.readAsDataURL(file[0])
        var  t= this;
        reader.onload = function (){
        t.imageEncode.push(reader.result)
        }
      }else{
        this.set.setOption("Please choose Excel or PDF Files", false);
        const files=<HTMLInputElement>document.getElementById('uploadFile');
        files.value="";
      }

      }

      submit(){

        var curDate =moment().format('YYYY-MM-DD HH:mm:ss');
        this.uploadFile=(document.getElementById("uploadFile") as HTMLInputElement).value;
        var temp=this.uploadFile.split("\\");
        var filename=temp[(temp.length-1)];

        const imageUpload = {
          fileName: this.loanid + "_" +filename,
          encodeImage: this.imageEncode[0].split(",")[1],
          fileNameBack: 'NA',
          encodeImageBack:'NA',
          fileType:"3",
          mobileNo : this.mobileNo,
          userId: this.userId+"",
          lastActivityTime: curDate,
          loanRequestId: this.loanid,
          currentActivityId:"29",
          userMedium:"backendApp"
        }

        const shopData = {
          userId:this.userId+"",
          lastActivityTime:curDate,
          loanRequestId:this.loanid,
          retailerId:this.crypto.decryt(window.localStorage.getItem('retailerId')),
          currentActivityId:"29",
          loanDisbursalId:"0",
          retailerType:this.crypto.decryt(window.localStorage.getItem('retailerType')),
          userMedium:"backendApp"
          }
          
        this.apiService.callImageUploadS3(imageUpload).subscribe(data => {
          if (data.status === 200) {
            
              this.apiService.saveShopVerification(shopData).subscribe(data => {
                if (data.status === 200) {
                  this.set.setOption("Shop verification done",true);
                  // alert("Shop verification done");
                  this.gotoList();
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
}
