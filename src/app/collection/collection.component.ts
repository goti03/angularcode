import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionService } from './collection.service';
import * as moment from 'moment/moment.js';
import { ApiService} from "..//core/api.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  model: NgbDateStruct;
  model2: NgbDateStruct;
  model3: NgbDateStruct;
   loanNo:any;
   collectionlist=[];
   closeResult: string;
   customerName:any;
   curDate:any;
  firstDate:any;
  showErrorMSG:boolean=false;
  mode:any;
  startDate:any;
  endDate:any;
  message:any;
  constructor(private modalService: NgbModal,private route: ActivatedRoute, private router: Router,
    private collectionService: CollectionService,private apiService: ApiService,) { }
    
  preventTyping() {
      return false;
    }
  
ngOnInit() {
    this.curDate =moment().format('DD-MM-YYYY');
    this.firstDate ="01-"+moment().format('MM-YYYY');
    this.endDate=moment().format('YYYY-MM-DD');
    this.startDate=moment().format('YYYY-MM')+"-01";
    this.mode='1';  
    const  collectionReq = {
        repaymentMode: this.mode,
        startDate:this.startDate,
        endDate:this.endDate
      }
      // alert("collectionReq::"+JSON.stringify(collectionReq));
      this.apiService.getCollectionList(collectionReq) 
      .subscribe(data => {
      if(data.status== 200){
        this.collectionlist = data.result;
      }else{
        this.message=data.message;
        this.showErrorMSG=true;
      }
      }, error => console.log(error));
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
reschedule(content, loanNo: any, customerName: any){
    this.loanNo=loanNo;
    this.customerName=customerName;

   this.modalService.open(content, {size: 'xl'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}
submit(){
  this.showErrorMSG=false;
  const  collectionReq = {
        repaymentMode: this.mode,
        startDate:this.startDate,
        endDate:this.endDate
  }
  // alert("collectionReq::"+JSON.stringify(collectionReq));
  this.apiService.getCollectionList(collectionReq) 
  .subscribe(data => {
  if(data.status== 200){
    this.collectionlist = data.result;
  }else{
    // alert();
    this.message=data.message;
    this.showErrorMSG=true;
  }
  }, error => console.log(error));
}
}
