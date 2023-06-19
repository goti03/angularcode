import { Component, OnInit,ChangeDetectorRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../reportModel';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from "..//..//..//core/api.service";
import * as moment from 'moment/moment.js';
import { breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-save-pan',
  templateUrl: './save-pan.component.html',
  styleUrls: ['./save-pan.component.css']
})
export class SavePanComponent implements OnInit {
  HeaderDetails: any;  
  loanid: any;
  actionId: any;

  dob: any;
  firstName: any;
  lastName: any;
  Gender: any;
  panNo: any;
  mobileNo: any;
  address: any;
  data: ReportModel = new ReportModel();
  fileDynamicList: Array<ReportModel> = [];
  filenewDynamic: any = {};
  model2: NgbDateStruct;
  userId:any;
  constructor(private route: ActivatedRoute, private router: Router,private changeDetec: ChangeDetectorRef,
    private apiService : ApiService, private set : breadcrumbMessage,private crypto: Crypto) {

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
    
      const saveImage = {
        lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        mobileNo:this.mobileNo,
        loanRequestId: this.loanid,
        retailerType: this.crypto.decryt(window.localStorage.getItem('retailerType')),
        retailerId : this.crypto.decryt(window.localStorage.getItem('retailerId')),
        userId : this.userId
      }
      
      this.apiService.getKYCData(saveImage).subscribe(data => {    
        if (data.status === 200) {
          // alert(data.result);
          this.firstName=data.result.panFirst;
        this.lastName=data.result.panLast;
        this.dob=data.result.panDOB;
        this.address=data.result.address;
        this.panNo=data.result.panNo;
        this.Gender=data.result.gender;
          
        }else{
          this.set.setOption("Unable to get your pan data",false);
          // alert("Unable to get your pan data");
        }
      }, error => {
        this.set.setOption(error.message,false);
        // alert(error.message);
      }); 
   
    }

    gotoList() {
      this.router.navigate(['/report/']);
    }

    submit(){
      
      this.dob = (document.getElementById("dob") as HTMLInputElement).value;
      this.firstName=(document.getElementById("firstName") as HTMLInputElement).value;
      this.lastName=(document.getElementById("lastName") as HTMLInputElement).value;
      this.panNo=(document.getElementById("panNo") as HTMLInputElement).value;
      var curDate =moment().format('YYYY-MM-DD HH:mm:ss');

      const saveImage = {
        fileName: "",
        fileNameBack: 'NA',
        mobileNo : this.mobileNo,
        fileType:"1",
        userId: this.userId+"",
        lastActivityTime: curDate,
        loanRequestId: this.loanid,
        currentActivityId:"5",
        userMedium:"backendApp",
        name:this.firstName,
        lastName:this.lastName,
        dob:this.dob,
        address:this.address,
        docNo:this.panNo,
        gender:this.Gender
      }

      this.apiService.saveLREditedData(saveImage).subscribe(data => {    
        if (data.status === 200) {
          this.set.setOption("Pan verification completed Successfully",true);
          // alert("Pan verification completed successfully");
          this.gotoList();
        }else{
          this.set.setOption("Pan verification Failed",false);
          // alert("Pan verification Failed");
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
