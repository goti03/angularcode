import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService} from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Currency} from '../../shared/currency.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {ExcelService} from '../../shared/excel.service';
import {PdfService} from '../../shared/pdf.service';
import {Crypto} from '../../shared/crypto.service';
import { FormControl } from '@angular/forms';
import { Observable } from "rxjs";
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-nach-status-report',
  templateUrl: './nach-status-report.component.html',
  styleUrls: ['./nach-status-report.component.css']
})
export class NachStatusReportComponent implements OnInit {
  NACHDataArray:any;
  startDate: any;
  currentDate:any;
  orgs: any;
  orgIds:any;
  endDate: any;
  roleId: number;
  enach: any;
  closeResult: string;
  supplierList=[];
  custId:number;
  page:any;
  p1:any;
  searchList:any;
  p:any=1;
  nachTransactionDetails:any;
  popCustomerDetails:any;
  userId:any;
  allorgnameList: any;
  orgnameCtrl: FormControl;
  filteredorgname: Observable<any[]>;
    constructor(private apiService : ApiService, private router: Router,private modalService: NgbModal,private crypto: Crypto,
        public currency : Currency, private set : breadcrumbMessage, public excelservice:ExcelService, public pdfservice :PdfService) { this.orgnameCtrl = new FormControl();
     
        this.apiService.getOrganisationlist().subscribe(data => {
          if (data.status == 200) {
            this.allorgnameList = data.result;
            for (let c of this.allorgnameList) {
              c.orgInfo = c.orgName
            }
            console.log("this.allorgnameList :" + this.allorgnameList);
            this.filteredorgname = this.orgnameCtrl.valueChanges
              .pipe(startWith(''),
                map(list => list ? this.orgnameList(list) : this.allorgnameList.slice())
              );
            console.log("filteredorgname:" + this.filteredorgname);
          }
        });   
        }
        orgnameList(name: any): any {
          console.log(name);
          return this.allorgnameList.filter(list =>
            list.orgInfo.toLowerCase().includes(name.toLowerCase()));
        }
  ngOnInit() {
    this.startDate = moment().subtract(1, 'month').format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
    this.currentDate = moment().format('YYYY-MM-DD');
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.p1=10;
    this.p=1;
    this.page=0;
    //  this.reloadData();
   
    
  }

  indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
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
 
  reloadData(){
    if(!this.isNullorUndefinedorEmpty(this.orgnameCtrl.value)){
      for(let m of this.allorgnameList){
   
    if((m.orgName)==this.orgnameCtrl.value){
      this.orgIds = m.orgId
      break;
    }
    }
      }
      if (this.isNullorUndefinedorEmpty(this.startDate)&&this.isNullorUndefinedorEmpty(this.orgnameCtrl.value) && this.isNullorUndefinedorEmpty(this.endDate)) {
        this.set.setOption("Please Use Filter To Search",false);
        }else{
    var curDate =moment().format('YYYY-MM-DD HH:mm:ss');
    const data={
      lenderId:this.crypto.decryt(window.localStorage.getItem('lenderId')),
      lastActivityTime:curDate,
      orgId: this.isNullorUndefinedorEmpty(this.orgnameCtrl.value) ? '~' : this.orgIds,
      startDate:this.isNullorUndefinedorEmpty(this.startDate) ? '~' : this.startDate,
      endDate:this.isNullorUndefinedorEmpty(this.endDate) ? '~' : this.endDate
    };
    this.apiService.getNACHList(data).subscribe(data=>{
     if(data.exceptionMessage=='success')
     {
       this.NACHDataArray=data.result.list;
     }
     else {
      this.set.setOption("Try again later",false);
      //  alert('Try Again Later');
    }
    }, error => console.log(error)) 

  }
  }
  exportExcel(filename) {
    var list = [];
    for(let n of this.NACHDataArray)
    {
      const listObj = {
        orgname:n.orgname,
        bankname:n.bankname,
        accountno:n.accountno,
        ifsccode:n.ifsccode,
        startdate:n.startdate,
        enddate:n.enddate,
        regno:n.regno,
        nachamount:n.nachamount,
        noAttempted:n.noAttempted,
        registerDate:n.registerDate,
        nachstatus:n.nachstatus,
        remarks:n.remarks,
        StatusOn:n.modifiedon
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list,filename);  

  }
 

  getStatus(content,loanid:String) {    
    var curDate=moment().format('YYYY-MM-DD HH:mm:ss');  
  const Data = {
    userId: this.userId,
    lastActivityTime:curDate,
    userMedium: "postman",
    loanRequestId:loanid,
};
this.apiService.eNachMandatEinquiry(Data).subscribe(data => {
  if (data.status == 200) {
    this.enach = data.result.respDetails;
    // this.set.setOption(data.exceptionMessage,true);
    this.reloadData();
  }
});
// }
this.modalService.open(content, { size: 'lg' }).result.then((result) => {
this.closeResult = `Closed with: ${result}`;
}, (reason) => {
this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
}

getNachTransaction(content,nachid:number,NACHData:any) {
  this.popCustomerDetails="";
  this.nachTransactionDetails="";
  var curDate=moment().format('YYYY-MM-DD HH:mm:ss');
  const Data={
    userId:this.userId,
    lastActivityTime:curDate,
    statusFlow:'0',
    nachid:nachid
  }
  this.apiService.getNachTransaction(Data).subscribe(data => {
    if(data.status==200){
      this.nachTransactionDetails=data.result.list;
      this.popCustomerDetails=NACHData;
    }
  },error => {console.log(error.message);}) ;

  this.modalService.open(content, { size: 'xl' }).result.then((result) => {
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

pdf() {
  var title = "nach_status_report";
  var body = [
              ['Customer Name', 'Bank Name', 'Account Number', 'IFSC Code', 'Start Date', 'End Date', 'Reg No', 'Nach Amount', 'Nach not Attempted', 'Nach Register Date', 'Nach Status', 'Nach Remarks'],
              ...this.NACHDataArray.map(n => ([n.orgname, n.bankname, n.accountno, n.ifsccode, n.startdate, n.enddate, n.regno,n.nachamount,n.noAttempted,n.registerDate, n.nachstatus, n.remarks]))
              ]
  this.pdfservice.pdf(body,title, 'A2');
}

resetSearch(){
  this.startDate='';
  this.endDate ='';
}

preventTyping() {
  return false;
}

checkenddate(){
  this.endDate=  moment(this.startDate).add(1, 'month').format('YYYY-MM-DD');
var enddate = moment(this.endDate);
var currentdate = moment(this.currentDate)
var duration = currentdate.diff(enddate,'month');

console.log("the duration differnce is ==="+duration)
  if(duration<0){
    this.endDate=moment().format("YYYY-MM-DD")
  }
  }

  checkstartdate(){
    this.startDate=  moment(this.endDate).subtract(1, 'month').format("YYYY-MM-DD");
   
    }

    reset(){
      this.startDate='';
      this.endDate= '';
      this.orgs='';
    }

    isNullorUndefinedorEmpty(str) {
      return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
    }

}
