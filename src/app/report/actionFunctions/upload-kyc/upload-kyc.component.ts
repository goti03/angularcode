import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import { Currency } from '../../../shared/currency.service';
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-upload-kyc',
  templateUrl: './upload-kyc.component.html',
  styleUrls: ['./upload-kyc.component.css']
})
export class UploadKycComponent implements OnInit {

  ckycAvailable: any;
  panFirst: any;
  panLast: any;
  panDOB: any;
  address: any;
  gender: any;
  HeaderDetails:any
  loanid: any;
  actionId: any;
  documentTypeList: any;
  mobileNo: any;
  curDate: any;
  uploadFile: any;
  imageEncode = [];
  data: ReportModel = new ReportModel();
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,
    private apiService : ApiService, private set : breadcrumbMessage, private currency : Currency,private crypto: Crypto) { }
    preventTyping() {
      return false;
    }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.loanid = this.route.snapshot.params['loanid'];
    this.actionId = this.route.snapshot.params['id'];
    
    this.apiService.getLoanHeaderDetails(this.loanid)
    .subscribe(data => {
      this.HeaderDetails=data.result;
      this.mobileNo =this.HeaderDetails[0].mobileNo;
    }, error => console.log(error));

    
    this.curDate =moment().format('YYYY-MM-DD HH:mm:ss');
    
  const ckycData = {
    lastActivityTime: this.curDate,
    userId: this.userId,
    retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
    loanRequestId:this.loanid+"",
    retailerType:this.crypto.decryt(window.localStorage.getItem("retailerType")),
    mobileNo : this.mobileNo+"",
    userMedium:"backendApp"
  }
  this.apiService.getCkycData(ckycData).subscribe(data => {
    // alert("data=="+JSON.stringify(data));
    if(data.status==200){
      
      if(data.result.ckycAvailable == "Yes"){
        this.set.setOption("We found CKYC for your PAN",true);

        // alert("We found CKYC for your PAN");
        this.panFirst=data.result.panFirst;
        this.panLast=data.result.panLast;
        this.panDOB=data.result.panDOB;
        this.ckycAvailable=data.result.ckycAvailable;
        this.address=data.result.address;
        this.gender=data.result.gender;
      }else{
        this.set.setOption("Unable to found CKYC for your PAN, Please upload aadhar xml",false);

        // alert("Unable to found CKYC for your PAN, Please upload aadhar xml");  

      }
      

    }else{
      this.set.setOption("Unable to found CKYC for your PAN, Please upload aadhar xml",false);

      // alert("Unable to found CKYC for your PAN, Please upload aadhar xml");  
      // this.gotoList();
    }
  });
    }

    uploadfilearray(file)
  {

    let  reader = new FileReader();
    reader.readAsDataURL(file[0])
   
var  t= this;
    reader.onload = function (){
     
      t.imageEncode.push(reader.result)
    // alert(t.imageEncode);
    }
  }

    gotoList() {
      this.router.navigate(['/report/']);
    }
    submit(){
      var name=(document.getElementById("firstName") as HTMLInputElement).value;
      var dob=(document.getElementById("dob") as HTMLInputElement).value;
      var address=(document.getElementById("address") as HTMLInputElement).value;
      var ckycAvailable=(document.getElementById("ckycAvailable") as HTMLInputElement).value;
      var gender=(document.getElementById("gender") as HTMLInputElement).value;
      var shareC = "";
      var aadharXml = "";
      if(ckycAvailable == "No"){
        shareC = (document.getElementById("shareCode") as HTMLInputElement).value;
        aadharXml= this.imageEncode[0].split(",")[1];
      }

      const updateKycData = {
        userId:this.userId,
        lastActivityTime:this.curDate,
        mobileNo:this.mobileNo,
        ckycAvailable:ckycAvailable,
        name:name,
        dob:dob,
        address:address,
        gender:gender,
        sharecode:shareC,
        zipFileBase64:aadharXml,
        imagebase64:"",
        retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
        currentActivityId:"27",
        retailerType:this.crypto.decryt(window.localStorage.getItem("retailerType")),
        loanRequestId: this.loanid+"",
        userMedium:"backendApp"
      }
      this.apiService.kycUpdate(updateKycData).subscribe(data => {
        if(data.status==200){
          this.set.setOption("KYC Completed Successfully",true);

            // alert("KYC Completed Successfully");
            this.gotoList();
        }else{
          this.set.setOption("Unable to update KYC Data",false);

            // alert("Unable to update KYC Data");
        }
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
    goToList(){
      this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanid,'nonStopFlag':'0' }} );
    }
    indianCurrency(Amount){
      return this.currency.indianCurrency(Amount);
    }
  }
