import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { Currency } from '../../shared/currency.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'ugro-nach',
  templateUrl: './ugro-nach.component.html',
  styleUrls: ['./ugro-nach.component.css']
})
export class UgroNachComponent implements OnInit {

  constructor(public apiService:ApiService,private set : breadcrumbMessage,private crypto: Crypto,
    public currency : Currency,private modalService: NgbModal) { }
  
  ugroNachList=[];
  userId:any;
  remarks = '';
  nachStatus = 0;
  p1:any;
  page:any;
  closeResult: string;
  id : any;
  message : any;
  searchReportList;
  p:any;
  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.p1=10;
    this.page=0;
    this.p=1;
    const data={
      // lendorId: ' 740'
      lendorId: this.crypto.decryt(window.localStorage.getItem("lenderId"))
    }
    this.apiService.ugroNachList(data).subscribe(data => {
      if(data.status==200){
        if(data.exceptionOccured=='Y'){
          this.set.setOption(data.exceptionMessage,false);
        }else{
          this.ugroNachList=data.result.list;
          console.log("data.result::"+JSON.stringify(this.ugroNachList));
        }
      }else{
        this.set.setOption(data.exceptionMessage,false);
      
      // alert("can't download this file");
      }
        }, error => console.log(error));
  }
 
  indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
  }

  updateStatus(id,content)
  {
    this.message = '';
    this.remarks = '';
    this.nachStatus = 0;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.id = id;
  }

  submit()
  {
    if((this.nachStatus === 0) || (this.remarks === ''))
    {
      this.message = "All fields are Mandatory";
      return;
    }
    else
    {
      this.message='';
      const data = {
      nachId :  this.id,
      nachstatus : this.nachStatus,
      remarks : this.remarks, 
      }
      this.apiService.updateUgroNachStatus(data).subscribe(data => {
        if(data.status == 200)
        {
          this.modalService.dismissAll();
          this.set.setOption("Status is updated", true);
          this.ngOnInit();
        }
        else
        {
          this.set.setOption("Status is failed to update", false);
        }
      })
    }
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
