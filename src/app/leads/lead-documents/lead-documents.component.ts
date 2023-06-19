import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { ApiService} from "..//..//core/api.service";
import * as FileSaver from 'file-saver';

const MIME_TYPES ={
  pdf : 'application/pdf',
  JPG :'jesuslovesyou.JPG',
  xls : 'application/vnd.ms.excel',
  xlsx : 'application/vnc.openxmlformats.officedocument.spreadsheetxml.sheet'
} 
@Component({
  selector: 'app-lead-documents',
  templateUrl: './lead-documents.component.html',
  styleUrls: ['./lead-documents.component.css']
})

export class LeadDocumentsComponent implements OnInit {

  leadId:any;
  documentList=[];
 constructor(
   private route: ActivatedRoute,private router: Router,private apiService : ApiService) { 
    }
 ngOnInit() {
  this.leadId = this.route.snapshot.params['leadId'];
  this.apiService.getLeadsDocumentList(this.leadId)
                .subscribe(data => {
                  this.documentList=data.result;
              }, error => console.log(error));
  }

  downloadView(filePath:String, filename:string){
    var url=filePath+filename;
    window.open(url, '_blank');
  }
  download(filePath,filename){
    const EXT=filename.substring(filename.lastIndexOf('.')+1)
    this.apiService.downloadFile(filePath).subscribe(data=>{
      FileSaver.saveAs(new Blob([data],{type:MIME_TYPES[EXT]}),filename);
    })
  }
//   downloadFiles(filePath,fileName){
// const linkSource = 'data:application/pdf;base64,' + this.base64ToByteArray(data.result).toString();
// // const linkSource = 'data:application/pdf;base64,' + ;
// const downloadLink = document.createElement("a");
// // const filename = fileName;

// downloadLink.href = linkSource;
// downloadLink.download = fileName;
// downloadLink.click();

//   }    
}
