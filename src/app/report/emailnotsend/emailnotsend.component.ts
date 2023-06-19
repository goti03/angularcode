import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../core/api.service";
import {ExcelService} from '../../shared/excel.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {PdfService} from '../../shared/pdf.service';

@Component({
  selector: 'app-emailnotsend',
  templateUrl: './emailnotsend.component.html',
  styleUrls: ['./emailnotsend.component.css']
})
export class EmailnotsendComponent implements OnInit {
  data:any;
  finalData=[];
  p:any;
  searchList:any;
 
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,private excelService:ExcelService, private set : breadcrumbMessage, public pdfservice :PdfService) { }

  ngOnInit() {
    this.apiService.sellerEMailsNotSend()
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
     var data={
       "Contact name":this.data[i].contactName,
       "PAN No":this.data[i].panNo,
       "OrgName":this.data[i].orgName,
       "Created On":this.data[i].createdOn,
       "EmailId1":this.data[i].emailId1,
       "EmailId2":this.data[i].emailId2,
       "EmailId3":this.data[i].emailId3,
       "EmailId4":this.data[i].emailId4,
       "EmailId5":this.data[i].emailId5,
       "EmailId6":this.data[i].emailId6,
       "Mailsendcount ":this.data[i].mailsendcount,
       "Mailsendto":this.data[i].mailsendto,
       "ContactNo":this.data[i].contactNo
      };
      
      this.finalData.push(data);
     }
      this.excelService.exportAsExcelFile(this.finalData, 'Seller Emails Not Sent');
    
    }

    pdf() {
      var title = "Email_not_sent_report";
      var body = [
                  ['Contact name', 'PAN No', 'OrgName','Created On', 'E-mailId 1', 'E-mailId 2', 'E-mailId 3', 'E-mailId 4', 'E-mailId 5', 'E-mailId 6', 'Mail sent count', 'Mail sent to', 'Contact No'],
                  ...this.data.map(d => ([d.contactName,d.panNo,d.orgName,d.createdOn,d.emailId1,d.emailId2,d.emailId3,d.emailId4,d.emailId5,d.emailId6,d.mailsendcount,d.mailsendto,d.contactNo]))
                  ]
      this.pdfservice.pdf(body,title, 'A1');
    }

}


