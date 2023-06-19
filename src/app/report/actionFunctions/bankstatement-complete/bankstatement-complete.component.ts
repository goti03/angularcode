import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReportModel } from '../../../report/reportModel';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "..//..//../core/api.service";
import * as moment from 'moment/moment.js';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from "@angular/material";
import {MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { breadcrumbMessage} from '../../../shared/breadcrumb-message.service'
import {Crypto} from '../../../shared/crypto.service';

@Component({
  selector: 'app-bankstatement-complete',
  templateUrl: './bankstatement-complete.component.html',
  styleUrls: ['./bankstatement-complete.component.css']
})
export class BankstatementCompleteComponent implements OnInit {
  loanid: any;
  actionId: any;
  curDate: any;
  mobileNo: any;
  bankItemData: any;
  HeaderDetails: any;
  createLoanButton:boolean;
  completeProcessButton:boolean;
  UploadedBankDetails:any;
  programTypeId:any;
  statusFlow:any;
  userId:any;

  constructor(private route: ActivatedRoute, private router: Router,private modalService: NgbModal,private crypto: Crypto,
    private changeDetec: ChangeDetectorRef, private apiService: ApiService,private dialog: MatDialog, private set : breadcrumbMessage ) { }

  ngOnInit() {
  this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
  this.createLoanButton=true;
  this.completeProcessButton=false;
    this.loanid=this.crypto.decryt(window.localStorage.getItem("loanRequestId"));
    this.programTypeId=this.crypto.decryt(window.localStorage.getItem("programTypeId"));
    this.apiService.getLoanHeaderDetails(this.loanid)
      .subscribe(data => {
        this.HeaderDetails=data.result;
        this.mobileNo=this.HeaderDetails[0].mobileNo;
        this.statusFlow=this.HeaderDetails[0].statusflow;
      }, error => console.log(error));
    this.apiService.getUploadedBankDetails(this.loanid)
      .subscribe(data => {
        this.UploadedBankDetails=data.result;
      }, error => console.log(error));

  }
  createLoan(){
   var curDate1 = moment().format('YYYY-MM-DD HH:mm:ss');
    const createLoan ={
      userId: this.userId,
      lastActivityTime: curDate1,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      loanRequestId: this.loanid + "",
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      userMedium: "backendApp",      
    }

    this.apiService.ceateLoanApi(createLoan).subscribe(data => {
      if(data.status==200){
        this.set.setOption("Loan created Successfully",true);
        // alert("Loan created Successfully");
        this.createLoanButton=true;
        this.completeProcessButton=true;
        this.gotoList();
        }else{
          this.set.setOption("Failed to create loan",false);
      //  alert("Failed to create loan");
       this.createLoanButton=false;
        this.completeProcessButton=true;
    }
    });

  }
  completeProcess(){
    this.set.setOption("Please wait, we are processing",false);
    // alert("Please wait, we are processing");
    // window.location.reload();
    var curDate1 = moment().format('YYYY-MM-DD HH:mm:ss');
    const bankstatementData={

      userId: this.userId,
      lastActivityTime: curDate1,
      retailerId: this.crypto.decryt(window.localStorage.getItem("retailerId")),
      currentActivityId: "25",
      loanRequestId: this.crypto.decryt(window.localStorage.getItem("loanRequestId")),
      retailerType: this.crypto.decryt(window.localStorage.getItem("retailerType")),
      mobileNo: this.mobileNo,
      programTypeId:this.programTypeId,
      userMedium: "backendApp",
      statusFlow:this.statusFlow
    }
   
    this.apiService.getProcessOverAllBankStatements(bankstatementData).subscribe(data => {
      if(data.status==200){
        this.set.setOption("Process completed Successfully",true);
        // alert("Process completed succesfully");
       if(this.statusFlow == 3){
        this.gotoList();
        }else{        
          this.createLoanButton=false;
          this.completeProcessButton=true;
        
       }
        
      }else{
        this.set.setOption("Process Failed",false);
      // alert("Process Failed");
      this.createLoanButton=true;
      this.completeProcessButton=true;
      window.location.reload();
    }
    });
  }

  gotoList() {
    this.router.navigate(['/report/']);
  }
  }

