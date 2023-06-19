import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { error } from 'protractor';
import { ApiService} from '../../core/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment/moment.js';
import {ExcelService} from '../../shared/excel.service';
import { breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {PdfService} from '../../shared/pdf.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})

export class CreateLoanComponent implements OnInit {
  showErrorMessage:boolean;
  userId:any;
  loanList : any;
  searchList : any;
  lan:any;
  errorMessage:any;
  lanCreateDate:any;
  lanRemarks:any;
  orgId:any;
  loanId:any;
  closeResult:any;
  subStatusid: any;
  statusId: any;
  statusFlow: any;
  dialogRef: any;
  errorMsg: boolean;
  todayDate :any;
  lenderId :any;
  constructor(private apiService : ApiService,
    private modalService: NgbModal, private router: Router, public excelservice:ExcelService, private set : breadcrumbMessage,
     public pdfservice :PdfService,private crypto: Crypto
     )
      { }

    @ViewChild('content',{static: false}) content:ElementRef; 

  viewdocument(id: number, loanid: number, orgId: number, retailerId: number) {
    this.router.navigate(['report/viewDocuments'],{ queryParams: { 'customerId':id,'loanId':loanid,
    'orgId':orgId,'retailerId':retailerId }});
  }

  preventTyping() {
    return false;
  }

  createLoanPopUp(content,loanId,orgId,statusId,substatusId,statusFlow){
    this.loanId=loanId;
    this.orgId=orgId;
    this.subStatusid=substatusId;
    this.statusId=statusId;
    this.statusFlow= statusFlow;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  ngOnInit() {
    this.todayDate=moment().format('YYYY-MM-DD');
    this.lenderId = this.crypto.decryt(window.localStorage.getItem('lenderId'));
    this.apiService.getLoanlist(this.userId,this.lenderId).subscribe(data => {
      if(data.status == 200){
        console.log(data.result);
        this.loanList = data.result;
      }
    }, error => console.log(error))
  }
  saveCreateLoan() {

    this.showErrorMessage = true;
    if (this.lan == null || this.lan == undefined || this.lan == '') {
      this.errorMessage = 'Please Enter Lan Number';
    } else if (this.lanCreateDate == null || this.lanCreateDate == undefined || this.lanCreateDate == '') {
      this.errorMessage = 'Please Enter Created Date';
    } else if (this.lanRemarks == null || this.lanRemarks == undefined || this.lanRemarks == '') {
      this.errorMessage = 'Please Enter Remarks';
    } else {
      this.showErrorMessage = false;
      this.set.setOption("Lan created successfully", true);
      const Data = {
        loanId: this.loanId,
        lan: this.lan,
        createdDate: this.lanCreateDate,
        remarks: this.lanRemarks,
        subStatusId: this.subStatusid,
        statusId: this.statusId,
        userId: this.userId,
        userMedium: "backendApp",
        statusFlow: this.statusFlow,
        orgId: this.orgId
      };
      console.log(Data);
      this.apiService.saveCreateLoanInfo(Data).subscribe(data => {
        if (data.status == 200) {
          this.modalService.dismissAll();
          if (data.exceptionOccured == 'Y') {
            this.set.setOption(data.exceptionMessage,false);
          } else {
            this.set.setOption("Success",true);
          }
          this.ngOnInit();
        } else {
          this.errorMsg = true;
        }
      }, error => console.log(error));
    }
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.modalService.dismissAll();
      return `with: ${reason}`;
    }
  }

  excel() {
    var list = [];
    for(let l of this.loanList)
    {
      const listObj = {
        ApplicantName:l.customerName,
        Program:l.programName,
        PanCard:l.pan,
        Mobile:l.MobileNo,
        SourcingPartner:l.sourcingPartnerName,
        LoanApplicationDate:l.createdOn
      }
      list.push(listObj);
    }
    this.excelservice.exportAsExcelFile(list,'Loan_list');  
  }

  pdf() {
    var title = "Loan_list";
    var body = [
                ['Applicant Name', 'Program', 'Pan Card', 'Mobile', 'Sourcing Partner', 'Loan Application Date'],
                ...this.loanList.map(l => ([l.customerName, l.programName, l.pan, l.MobileNo, l.sourcingPartnerName, l.createdOn]))
                ]
    this.pdfservice.pdf(body,title, 'A4');
  }
  alphanumkeyPress(event: any) {
    const pattern = /[a-zA-Z0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }
}
