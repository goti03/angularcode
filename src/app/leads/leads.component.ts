import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment.js';
import { ApiService} from "..//core/api.service";

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  
   loanNo:any;
   leadslist=[];
   documentList=[];
   closeResult: string;
   customerName:any;
   curDate:any;
  firstDate:any;
  constructor(private modalService: NgbModal,private route: ActivatedRoute, private router: Router,private apiService: ApiService,) { }

  ngOnInit() {
    this.curDate =moment().format('DD-MM-YYYY');
      this.apiService.getLeadsList() 
      .subscribe(data => {
      if(data.status== 200){
        this.leadslist = data.result;
      }else{
        alert(data.exceptionMessage);
      }
      }, error => console.log(error));
  }
  

  downloadDocuments(leadId){
   
    
    this.apiService.getLeadsDocumentList(leadId)
    .subscribe(data => {
      this.documentList=data.result;
      for(let i=0;i<this.documentList.length;i++){
        var temp=this.documentList[i].fileLocation.split("/");
        const filename=temp[temp.length-1];
        // const data={
        //   url:this.documentList[i].fileLocation
        // }
        // this.apiService.getEncodeData(data) .subscribe(data => {
        //   if(data.status== 200){
            // alert("1::"+data.result);
            // alert("2::"+JSON.stringify(data.result));
            // const linkSource = 'data:application/pdf;base64,' + this.base64ToByteArray(data.result).toString();
            const linkSource = this.documentList[i].fileLocation;
            const downloadLink = document.createElement("a");
            // const fileName = filename;
      
            downloadLink.href = linkSource;
            downloadLink.download = filename;
            downloadLink.click();
          // }else{
          //   alert(data.exceptionMessage);
          // }}, error => console.log(error));
    }
      
  }, error => console.log(error));

    
  }
   base64ToByteArray(base64String) {
        var sliceSize = 1024;
        var byteCharacters = atob(base64String);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return byteArrays;
    }

  viewDocuments(leadId){
    // alert("leadId::"+leadId);
    this.router.navigate(['/leads/leaddocuments/',leadId]);
  }
  viewPromotors(leadId){
    // alert("leadId::"+leadId);
    this.router.navigate(['/leads/leadpromoters/',leadId]);
  }

}
