import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from '../../shared/currency.service';
import { MOMENT } from 'angular-calendar';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import { TreeMapModule } from '@swimlane/ngx-charts';
import { lender } from '../../../environments/environment';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  searchMyList: any;
  postsanctions: boolean = false;
  userName:any;
  programList: any;
  orderinvoicelist:any;
  orderlist:any;
  programTypeId:any;
  disbursments: boolean = false;
  invoiceDisplaylist: any;
  lender:boolean=true;
  sellerapproovallist:any;
  totalvalueh:any;
  creditlist: any;
  searchorderinvoicelist:any;
  roleId: any;
  p: any = 1;
  s:any = 1;
  totallimitseller:any;
  totalvalueseller:any;
  disbursal: any;
  time: any;
  totalcount: any;
  statusName: any;
  searchlenderlist: any;
  utilizationp: any;
  totallimitp: any;
  orgId: any;
  searchDisbursalList;
  searchinvoicedetailList:any;
  disbursement: boolean = false;
  fundingAmount: any;
  ordertable:boolean=false;
  sellertable:boolean=true;
  closeResult: any;
  length: any;
  viewseller:boolean=false;
  vieworder:boolean=false;
  errosmsg: any;
  totalvalue: any;
  disburseorder:any;
  userId:any;
  lenderList:any;
  disbursementseller: boolean = false;
  finagglenderid:any;
  disbursementorder: boolean = false;
  loanRequestid: any;
  loanrequestidroute: any;
  fundAmount:any;
  sourcingPartnerList: any;
  programid:any
  loanrequestidrouteone: any;
  approvedamount: any;
  postsanctionlist: any;
  dimid: any;
  postid: any;
  disbursallistone:any;
  disbursallist: any;
  ProgramTypeList:any;
  errormsg: any;
  date: any;
  lenderid:any;
  ugrolenderid:any;
  idfclenderid:any;
  sourcingPartnerId:any
  constructor(private apiService: ApiService, private modalService: NgbModal, private route: ActivatedRoute,
     private router: Router, private set: breadcrumbMessage,private crypto: Crypto) { }
     preventTyping() {
      return false;
    }
  ngOnInit() {
    this.userName= this.crypto.decryt(window.localStorage.getItem('userName'));
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.postid = 4;
    this.programid="";
    this.lenderid="";
    this.programTypeId="";
  
this.sourcingPartnerId="";
    this.time = moment().format('DD-MM-YYYY HH:mm:ss');
    this.disbursal = 3;
    this.apiService.getProgramTypeList().subscribe(res => this.ProgramTypeList = res.result);
    this.loanRequestid = this.route.snapshot.params['loanrequestid'];
    this.searchMyList = this.loanRequestid
    this.disbursement = true;
    this.apiService.getAllProgramList(0).subscribe(res => this.programList = res.result);
    this.lender = false;
    console.log("the total counter is ==-=" + this.totalcount);
    this.apiService.getLenderList().subscribe(res=>{
      this.lenderList = res.result;
      for(let l of this.lenderList){
        l.panNo=this.crypto.decryt(l.panNo);
      }
    });

    this.apiService.getSourcingList().subscribe(res => { this.sourcingPartnerList = res.result });
    this.apiService.getMylistCreditlist(this.roleId).subscribe(data => {
      if (data.status == 200) {
        this.creditlist = data.result[0].list;
        this.totalcount = data.result[0].loanCount;
        console.log("the credit list is ==-=" + this.creditlist);
        this.totalvalue = data.result[0].totalLoanAmount;
   

      }
      else {
        console.log("the total counter is ==-=" + this.totalcount);
      }
    }, error => console.log(error));

    const dataone=
    {
      "sourcingpartnerId":this.sourcingPartnerId,
      "programId":this.programTypeId,
      "lenderId":this.lenderid
    }
    this.apiService.getPendingapprovallist(dataone).subscribe(data => {
      if (data.status == 200) {
        this.disbursallist = data.result;
        this.totalvalueh = this.disbursallist[0].totalLimit;
        this.length = this.disbursallist.length;
        console.log(" I am not here now===" + this.disbursallist);
      }
      else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });

    const data=
    {
      "sourcingpartner":"",
      "programname":"",
      "lenderid":""
    }
    this.apiService.getPendingsourceapprovallist(data).subscribe(data => {
      if (data.status == 200) {
        this.sellerapproovallist = data.result;
        this.totallimitseller = this.sellerapproovallist.length;
        this.totalvalueseller = this.sellerapproovallist[0].totalLimit;

        console.log(" I am not here now===" + this.sellerapproovallist);
      }
    });
    this.apiService.getMylistCreditlist(this.postid).subscribe(data => {
      if (data.status == 200) {

        this.postsanctionlist = data.result[0].list;

      }
      else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
    this.apiService.getMylistCreditlist(this.disbursal).subscribe(data => {
      if (data.status == 200) {



      }
      else {
        console.log("the total counter is ==-=" + this.totalcount);
      }
    }, error => console.log(error));
  }
  orderdisbursement() {
    this.disbursementorder = true;
    this.disbursementseller = false;
  
    
  }
  orderseller() {
    this.disbursementorder = false;
    this.disbursementseller = true;
 
  }
  resetorder()
  {
    this.sourcingPartnerId="";
    this.programTypeId="";
    this.lenderid="";
  }
  orderinvoicelistfilter()
  {

  const dataone=
  {
    "sourcingpartnerId":this.sourcingPartnerId,
    "programId":this.programTypeId,
    "lenderId":this.lenderid
  }
  this.apiService.getPendingapprovallist(dataone).subscribe(data => {
    if (data.status == 200) {
      this.disbursallist = data.result;
 
      this.length = this.disbursallist.length;
      console.log(" I am not here now===" + this.disbursallist);
    }
    else{
      this.set.setOption(data.exceptionMessage,false);
    }
  });
  }
  sellerlist()
  {
    const data=
    {
      "sourcingpartner":this.sourcingPartnerId,
      "programname":this.programid,
      "lenderid":this.lenderid
    }
    this.apiService.getPendingsourceapprovallist(data).subscribe(data => {
      if (data.status == 200) {
        this.lenderid="";
        this.sellerapproovallist = data.result;
        this.totallimitseller = this.sellerapproovallist.length;
        this.totalvalueseller = this.sellerapproovallist[0].totalLimit;

        console.log(" I am not here now===" + this.sellerapproovallist);
      }
    });

  }
  reset()
  {
    this.lenderid="";
    this.programid="";
    this.sourcingPartnerId="";
  }
viewnow(data)
{
  this.viewseller=true;
  this.searchinvoicedetailList =data;
}
viewnoworder(data,dimid, loanrequestid, orgId)
{console.log(" the data is ========"+data[0].fundingAmount);
  this.vieworder=true;
  this.orderinvoicelist = data;
  this.searchorderinvoicelist=data.invoiceNo;
  this.loanRequestid = loanrequestid;
  this.fundAmount=data[0].fundingAmount;

  this.dimid = dimid;
  this.orgId = orgId;
}
  gotoList(loanrequestids)
  {
    this.loanrequestidroute=loanrequestids;
    this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'loanId':this.loanrequestidroute,'nonStopFlag':'0' }} );
  }

  ordertables()
  {
    this.ordertable=true;
    this.resetorder();
    this.sellertable=false;
    this.viewseller=false;
    
  }
  sellertables()
  {console.log("seller table is called");
    this.ordertable=false;
    this.reset();
    this.sellertable=true;
    this.vieworder=false;
 
  }
  postsanction()
  {
this.postsanctions=true;
this.disbursement=false;
this.lender=false;
  }
  disbursements() {
    this.disbursement = true;
    this.postsanctions = false;
    this.lender = false

  }
  invoiceDetails(content, invoiceDetails, dimid, loanrequestid, orgId, utilizationp, totallimitp) {

    this.invoiceDisplaylist = invoiceDetails,
      this.loanRequestid = loanrequestid;
    this.utilizationp = utilizationp;
    this.totallimitp = totallimitp;
    this.dimid = dimid;
    this.orgId = orgId;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  disbursalAction(loanRequestId: number, disbursalId: number, subStatus: number) {
    window.localStorage.setItem("goback","Mylist");
    this.router.navigate(['/report/disbursalAction/', loanRequestId, disbursalId, subStatus]);
  }
  invoicesellerDetails(content, invoiceDetails, dimid, loanrequestid, utilizationp,orgId, totallimitp) {

    this.invoiceDisplaylist = invoiceDetails,
      this.loanRequestid = loanrequestid;
    this.utilizationp = utilizationp;
    this.totallimitp = totallimitp;
    this.dimid = dimid;
    this.orgId = orgId;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  rejectinvoice(content, invoiceDetails, dimid, loanrequestid, orgId, utilizationp, totallimitp) {

    this.invoiceDisplaylist = invoiceDetails,
      this.loanRequestid = loanrequestid;
    this.dimid = dimid;
    this.orgId = orgId;
    this.utilizationp = utilizationp;
    this.totallimitp = totallimitp;




    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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
      return `with: ${reason}`;
    }


  }
  downloadView(filePath: any, filename: any) {

    var url1 = filePath;
    window.open(url1, '_blank');

  }

  orderinvoicefilter()
  {
  //  for(this.s=0;this.s<this.disbursallistone.length;this.s++){
  //    if(this.lenderid!=""&&this.programTypeId!=""&&this.sourcingPartnerId!="")
  //    {
  //      if(this.disbursallistone[this.s].lenderName.includes(this.lenderid)&&this.disbursallistone[this.s].programName.includes(this.programTypeId)&&this.disbursallistone[this.s].sourcingPartner.includes(this.sourcingPartnerId))
  //      {
  //        this.disbursallist.push(this.disbursallistone[this.s])
  //      }
  //    }
  //    else if(this.lenderid!=""&&this.programTypeId!=""&&this.sourcingPartnerId=="")
  //    {
  //     if(this.disbursallistone[this.s].lenderName.includes(this.lenderid)&&this.disbursallistone[this.s].programName.includes(this.programTypeId))
  //     {
  //       this.disbursallist.push(this.disbursallistone[this.s])
  //     }
  //    }
  //    else if(this.lenderid!=""&&this.programTypeId==""&&this.sourcingPartnerId!="")
  //    {
  //     if(this.disbursallistone[this.s].lenderName.includes(this.lenderid)&&this.disbursallistone[this.s].sourcingPartner.includes(this.sourcingPartnerId))
  //     {
  //       this.disbursallist.push(this.disbursallistone[this.s])
  //     }
  //    }
  // else if(this.lenderid==""&&this.programTypeId!=""&&this.sourcingPartnerId!="")
  //    {
  //      if(this.disbursallistone[this.s].programName.includes(this.programTypeId)&&this.disbursallistone[this.s].sourcingPartner.includes(this.sourcingPartnerId))
  //      {
  //        this.disbursallist.push(this.disbursallistone[this.s])
  //      }
  //    }
  //  }
  }
  Disburse() {
    console.log("please open disbursement table");
    this.disbursement = true;
  }
  creditable() {
    this.lender = true;
    this.disbursement = false;
    this.postsanctions = false;
  }
  toLog(loanrequestidroute) {
    this.loanrequestidrouteone = loanrequestidroute;
    this.router.navigate([`report/viewlog/${this.loanrequestidrouteone}`]);
  }
  saved() {
    this.modalService.dismissAll();
 
     
      const data = {


        userId: this.userId,
        loanRequestId: this.loanRequestid,
        dimId: this.dimid,
        retailerId: this.orgId,
        approvedAmt: this.fundAmount,
        userMedium: "backendApp",
        lastActivityTime: moment().format('YYYY-MM-DD HH:mm:ss'),



      }
      this.apiService.approveorderinvoice(data).subscribe(data => {

        if (data.status == 200) {
          this.errormsg = "";
          // this.set.setOption("Salesperson Added Successfully..", true);
          this.set.setOption("Order Invoice approved successfully", true);
          this.ngOnInit();
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
    }
  
}
