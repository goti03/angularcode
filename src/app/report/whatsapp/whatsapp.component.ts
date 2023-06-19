import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from '../reportModel';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from "../../core/api.service";
import {ExcelService} from './../../shared/excel.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {PdfService} from '../../shared/pdf.service';

@Component({
  selector: 'app-whatsapp-gstn',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})

export class whatsapp implements OnInit {

  id: any;
  loanid: any;
  orgId: any;
  retailerId: any;
  gstnList = [];
  finalData = [];
  p:any;
  searchList:any;
 data:any;
  constructor(
    private route: ActivatedRoute, private router: Router, private apiService: ApiService,private excelService:ExcelService, private set : breadcrumbMessage, public pdfservice :PdfService) {
  }
  ngOnInit() {

    this.apiService.getWhatsappMessages()
      .subscribe(res => {
        if (res.status == 200) { 
          this.data=res.result;
         }else{
          this.set.setOption(res.exceptionMessage,false);
          //  alert(res.exceptionMessage);
         }
        });
    }
exportAsXLSX() {
 for(let i=0;i<this.data.length;i++){
  var dac={
    "Mobile Number":this.data[i].mobileNo,
    "Name":this.data[i].name,
    "Text Message":this.data[i].textMSG,
    "Type":this.data[i].type,
    "File Link":this.data[i].fileLink,
    "File":this.data[i].file,
    "File Expire Date":this.data[i].fileExpireDate,
    "created On":this.data[i].createdOn,
    "Status":this.data[i].status
  }
  this.finalData.push(dac);
 }
  this.excelService.exportAsExcelFile(this.finalData, 'Whatsapp Messages');

}


pdf() {
  var title = "Whatsapp_message_report";
  var body = [
              ['Name', 'MobileNo', 'TextMSG','Type', 'FileLink', 'File', 'FileExpireDate', 'created On', 'status'],
              ...this.data.map(d => ([d.name,d.mobileNo,d.textMSG,d.type,d.fileLink,d.file,d.fileExpireDate,d.createdOn,d.status]))
              ]
  this.pdfservice.pdf(body,title, 'A2');
}
}

