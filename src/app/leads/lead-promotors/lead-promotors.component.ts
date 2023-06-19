import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { ApiService} from "..//..//core/api.service";

const MIME_TYPES ={
  pdf : 'application/pdf',
  JPG :'jesuslovesyou.JPG',
  xls : 'application/vnd.ms.excel',
  xlsx : 'application/vnc.openxmlformats.officedocument.spreadsheetxml.sheet'
} 
@Component({
  selector: 'app-lead-promotors',
  templateUrl: './lead-promotors.component.html',
  styleUrls: ['./lead-promotors.component.css']
})

export class LeadPromotorsComponent implements OnInit {

  leadId:any;
  loanid:any;
  orgId:any;
  retailerId:any;
  promotorsList=[];
  checklistStatus=false;
  UploadedDocuments: any;
  HeaderDetails:any;
  roleId:any;
  docLength:any
 constructor(
   private route: ActivatedRoute,private router: Router,private apiService : ApiService) { 
    }
 ngOnInit() {
  this.leadId = this.route.snapshot.params['leadId'];
  this.apiService.getLeadsPromotorsList(this.leadId)
                .subscribe(data => {
                  this.promotorsList=data.result;
              }, error => console.log(error));
    
  }

  downloadView(filePath:String, filename:string){
    var url=filePath+filename;
    window.open(url, '_blank');
  }
}
