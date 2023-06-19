import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service';
import {Currency} from '../../shared/currency.service';
import {ExcelService} from '../../shared/excel.service';
import {PdfService} from '../../shared/pdf.service';

@Component({
  selector: 'app-escrow-report',
  templateUrl: './escrow-report.component.html',
  styleUrls: ['./escrow-report.component.css']
})
export class EscrowReportComponent implements OnInit {

  constructor(private apiService : ApiService,private modalService: NgbModal, private set : breadcrumbMessage,  public currency : Currency, public excelservice:ExcelService, public pdfservice :PdfService) { }

  p:any=1;
  page:any;
  p1:any;
  beneList = [];
  closeResult: string;
  remark : any;
  aedid : any;
  searchList : any;

  indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
  }

  ngOnInit() {
    this.remark = '';
    this.p1=20;
    this.page=0;
    this.aedid = null;
    this.apiService.escrowReport().subscribe( data => {
      if(data.status == 200)
      {
        if(data.result.list.length > 0)
        {
          console.log(data.result);
          this.beneList = data.result.list;
        }
        
      }
    })
  }

  updateStatuspop(content, id)
  {
    this.aedid = id;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateStatus()
  {
    if(this.remark == '')
    {
      this.modalService.dismissAll();
      this.set.setOption("Remark is empty", false);
      return;
    }
    const data = {
      aedid : this.aedid,
      userRemark : this.remark
    }
    this.apiService.updateEscrowStatus(data).subscribe(data => {
      if(data.status == 200)
      {
        this.modalService.dismissAll();
        if(data.result=="Request in Process Please try After Sometime")
        {
          this.set.setOption(data.result,false);
        }
        else{
          this.set.setOption("Success",true);
        }
        this.ngOnInit();
      }
      else
      {
        this.modalService.dismissAll();
        this.set.setOption("Failed to update", false);
      }
    })
  }

  export() {
     var list = [];
     for(let b of this.beneList)
     {
       const listObj = {
        OrganizationName:b.orgname,
        Amount:b.amount,
        VirtualAccountNumber:b.virtualaccountno,
        Date:b.valuedate
       }
       list.push(listObj);
     }
    this.excelservice.exportAsExcelFile(list,'Escrow_Beneficiary_List');  
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
    var title = "Escrow_Report";
    var body = [
                ['Organization Name', 'Virtual Account Number', 'Amount', 'Date', 'Status'],
                ...this.beneList.map(b => ([b.orgname,b.virtualaccountno,b.amount,b.valuedate,b.processflag==2? "Transaction Failed":"Transaction in Progress"]))
                ]
    this.pdfservice.pdf(body,title, 'A4');
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