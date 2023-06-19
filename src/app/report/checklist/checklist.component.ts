import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import { ApiService} from "..//..//core/api.service";
import { breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';
import * as Highcharts from 'highcharts';
declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {                        
  checkButton:any;
  id:any;
   loanid:any;
   orgId:any;
   retailerId:any;
   loanCheckListDetails:any;
   checklistStatus=false;
   applicationForm:any;
   applicationForm1:any;
   HeaderDetails:any;
   CheckListData : Array<any> = [];
   roleId:any;
   userId:any;
  constructor(
    private route: ActivatedRoute,private router: Router,private apiService : ApiService, private crypto: Crypto,
    private set : breadcrumbMessage, private currency : Currency) { 
     }
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = Number(this.crypto.decryt(window.localStorage.getItem('roleId')));
    
    if(this.userId=='12'){
      this.checkButton=false;
    }else{
      this.checkButton=true;
    }  
    
   this.id = this.route.snapshot.params['id'];
   this.loanid = this.route.snapshot.params['loanid'];
   this.orgId = this.route.snapshot.params['orgId'];
   this.retailerId = this.route.snapshot.params['retailerId'];
   this.route.queryParams.subscribe(params => { 
    this.nonStopFlag = params['nonStopFlag'];
  });
   this.checklistStatus=true;
   this.apiService.getLoanHeaderDetails(this.loanid)
                .subscribe(data => {
                  this.HeaderDetails=data.result;
              }, error => console.log(error));
   this.apiService.getLoanCheckListDetails(this.loanid)
    .subscribe(data => {
      this.loanCheckListDetails=data.result;

      
       }, error => console.log(error));   
        
   }

   statusChange(index:any,event)
   { 
    if(event.target.checked )
    this.loanCheckListDetails[index].status='Y';
    else
    this.loanCheckListDetails[index].status='N';
   }
  
   submit()
   {
    for(let i=0;i<this.loanCheckListDetails.length;i++)
       this.CheckListData.push(this.loanCheckListDetails[i]);

       const data={
        CheckListData:this.CheckListData
       }

    this.apiService.updateChecklistEntry(data).subscribe(
      data => {
        if(data.status!=200){
          this.set.setOption("Failed to update",false);

          // alert("Failed to update");
         }
     
      }, error => console.log(error));   
      
      this.apiService.verifytheChecklist(this.loanid).subscribe(
        data => {
          if(data.status==200){
            this.set.setOption("updated Successfully",true)

          //  alert("updated Successfully")
           this.gotoAction();
                     }
          else{
            this.set.setOption("Failed to update",false)

            // alert("Failed to update");
          }
        }, error => console.log(error));



      
    }


    gotoAction() {
      this.router.navigate(['/report/']);
    }

    nonStopFlag : any;
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
}
