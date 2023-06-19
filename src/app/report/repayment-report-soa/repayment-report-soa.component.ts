import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment.js';
import { ApiService } from "..//..//core/api.service";
import * as XLSX from 'xlsx'; 
import {Sort} from '@angular/material/sort';
import {Currency} from '../../shared/currency.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-repayment-report-soa',
  templateUrl: './repayment-report-soa.component.html',
  styleUrls: ['./repayment-report-soa.component.css']
})
export class RepaymentReportSOAComponent implements OnInit {
  loanNo: any;
  collectionlist = [];
  closeResult: string;
  customerName: any;
  curDate: any;
  firstDate: any;
  endDate: any;
  startDate: any;
  p1:any;
  page:any;
  childOrgId: any;
  orgId: any;
  repaymentDetailList = [];
  retailerList = [];
  searchBrandList;
  errorMessage:boolean;
  p:any=1;
  programId:any;
  brandId:any;
  brandList = [];
  programList = [];
  filename:any;
  popCustomerDetails:any;
  SOADetails:any;
  searchSOA;
  userId:any;
  roleId:any;
  link: any;
    constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,private crypto: Crypto,
    private apiService: ApiService,  public currency : Currency, private set : breadcrumbMessage) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.page=0;
    this.p1=10;
    this.p=1;
    this.orgId=this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.errorMessage=true;
    this.curDate = moment().format('DD-MM-YYYY');
    this.firstDate = "01-" + moment().format('MM-YYYY');
    this.endDate = moment().format('YYYY-MM-DD');
    this.startDate = moment().format('YYYY-MM') + "-01";
     this.brandId="0";
     this.programId="0";
    //  this.orgId="0";
     this.apiService.getProgramList(this.roleId,this.orgId).subscribe(data => {
      if (data.status == 200) {
        this.programList = data.result;
        // this.brandId="";
      } 
    }, error => console.log(error));
  }
  getBrandDetails(){
    this.apiService.getBrandNameList(this.programId).subscribe(data => {
      if (data.status == 200) {
        this.brandList = data.result;
      } 
    }, error => console.log(error));
  }
  getRetailerDetails(){
    this.apiService.getParentRetailerList(this.programId,this.brandId).subscribe(data => {
      if (data.status == 200) {
        this.retailerList = data.result;
      } 
    }, error => console.log(error));
  }

  indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
  }

  submit() {
    if(this.orgId=='0'|| this.orgId == undefined){
      this.orgId='orgId';
    }
    if(this.programId=='0'|| this.programId == undefined){
      this.programId='programId';
    }
    if(this.brandId=='0'|| this.brandId == undefined){
      this.brandId='brandId';
    }
   
    
    const reqData = {
      orgId: this.orgId,
      brandId:this.brandId,
      programId:this.programId,
      startDate: this.startDate,
      endDate: this.endDate,
      "filetype":0

    }

    if(this.orgId=='orgId'|| this.orgId == undefined){
      this.orgId='0';
    }
    if(this.programId=='programId'|| this.programId == undefined){
      this.programId='0';
    }
    if(this.brandId=='brandId'|| this.brandId == undefined){
      this.brandId='0';
    }
    
    this.apiService.getRepaymentReport(this.orgId,reqData)
      .subscribe(data => {
        if (data.status == 200) {
          this.repaymentDetailList = data.result.repaymentDetailList;
          if(this.repaymentDetailList.length==0){
            this.errorMessage=false;
          }else{
            this.errorMessage=true;
          }
        } else {
          // alert(data.exceptionMessage);
        }
      }, error => console.log(error));
  }

  excelDownload() {
    if (this.orgId == '0' || this.orgId == undefined) {
      this.orgId = 'orgId';
    }
    if (this.programId == '0' || this.programId == undefined) {
      this.programId = 'programId';
    }
    if (this.brandId == '0' || this.brandId == undefined) {
      this.brandId = 'brandId';
    }
     const data = {
       orgId: this.orgId,
       brandId: this.brandId,
       programId: this.programId,
       startDate: this.startDate,
       endDate: this.endDate,
       filetype: 1,
     };
     this.apiService.getRepaymentReport(this.orgId,data)
     .subscribe(data => {
       if (data.status == 200) {
         this.link = data.result.s3url;
         window.open( this.link ,'_blank');
         console.log('link called', this.link);
         console.log("S3::::::::::::::::::::::"+JSON.stringify(this.link));
       } else {
        this.set.setOption(data.exceptionMessage, false);
      }
     }, error => console.log(error));
 }

  exportpdf(){
    const data= {
     "currentActivityId": "25",
     "lastActivityTime": moment().format('YYYY-MM-DD HH:mm:ss'),
     "loanRequestId": this.popCustomerDetails.loanrequestId,
     "userId": this.userId,
     "userMedium": "backendApp",
     "from":"01-02-2020",
     "to":"20-12-2020"
   }
   this.apiService.getSOAReport(data).subscribe(data => {
     if(data.status==200){
         window.open(data.result, '_blank');
     }else{
      this.set.setOption(data.result,true);

      //  alert(data.result);
     }
   },error => {console.log(error.message);});
   }
  getloanRequestSOADetails(content,loandata:any) {
    this.popCustomerDetails="";
    this.SOADetails="";
    var curDate=moment().format('YYYY-MM-DD HH:mm:ss');
    const Data={
      userId:this.userId,
      lastActivityTime:curDate,
      statusFlow:'0',
      loanId:loandata.loanrequestId
    }
    this.apiService.getSoaReportByLoanId(loandata.loanrequestId).subscribe(data => {
      if(data.status==200){
        this.SOADetails=data.result;
        this.popCustomerDetails=loandata;
      }
    },error => {console.log(error.message);}) ;
  
    this.modalService.open(content, { windowClass:"myCustomModalClass" }).result.then((result) => {
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
  showPageIndex(pageIndex,pagesize){
    this.page = pageIndex;
    console.log(this.page);
    if(this.page!=1){
    this.page = (this.page-1)*pagesize;
  }
  else
  {
    this.page=0;
  }
  }
 
  


  
  
}
