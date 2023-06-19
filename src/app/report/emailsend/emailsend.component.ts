import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../core/api.service";
import {ExcelService} from './../../shared/excel.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {PdfService} from '../../shared/pdf.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emailsend.component.html',
  styleUrls: ['./emailsend.component.css']
})

export class EmailsComponent implements OnInit {
  data:any;
  finalData=[];
  p:any;
  
  searchList: any;
  
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,private excelService:ExcelService, private set : breadcrumbMessage, public pdfservice :PdfService) { }

  ngOnInit() {
    this.apiService.sellerMailSendStatus()
    .subscribe(res => {
      if (res.status == 200) { 
        this.data=res.result;
       }else{
        this.set.setOption(res.exceptionMessage,false)

        //  alert(res.exceptionMessage);
       }
      });
  }
  exportAsXLSX() {
    for(let i=0;i<this.data.length;i++){
      var antony={
        "Date":this.data[i].date,
        "Total Count":this.data[i].totalCount,
        "Status":this.data[i].status,
      };
      
      this.finalData.push(antony);
     }
      this.excelService.exportAsExcelFile(this.finalData, 'Seller Email Sent Status');
    
    }

    pdf() {
      var title = "Email_send_report";
      var body = [
                  ['Date', 'Total Count', 'Status'],
                  ...this.data.map(d => ([d.date,d.totalCount,d.status]))
                  ]
      this.pdfservice.pdf(body,title, 'A4');
    }

}

      


