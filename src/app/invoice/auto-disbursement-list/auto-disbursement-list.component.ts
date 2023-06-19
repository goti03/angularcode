import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../core/api.service';
import {breadcrumbMessage} from '..//../shared/breadcrumb-message.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-auto-disbursement-list',
  templateUrl: './auto-disbursement-list.component.html',
  styleUrls: ['./auto-disbursement-list.component.css']
})
export class AutoDisbursementListComponent implements OnInit {

  constructor(private apiService : ApiService, private set : breadcrumbMessage, private modalService: NgbModal,private crypto: Crypto) { }

  list : any;
  userId:any;
  id : any;
  remark : any;

  closeResult : any;
  p: any;

  searchList : any;

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.apiService.autoDisbursementCustomerList().subscribe(data => {
      if(data.status == 200){
        if(data.exceptionOccured == 'N'){
          this.list = data.result;
        }else {
          this.set.setOption(data.exceptionMessage,false);
        }
      }else {
        this.set.setOption(data.exceptionMessage,false);
      }
    }, error =>console.log(error));
  }

  initiateAutoDisbursal(id){
    this.apiService.initiateAutoDisbursal(this.userId,id).subscribe(data => {
      if(data.status == 200){
        this.set.setOption(data.result, true);
        this.set.setOption(data.exceptionMessage, true);
      }else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }

  remarks(a, content){
    this.id = a;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' ,centered: true,  backdrop : 'static', keyboard : false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.ngOnInit();
  });
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

  stop(){
    const obj = {
      id : this.id,
      userId : this.userId,
      remarks : this.remark
    }
    this.apiService.stopAutoDisbursal(obj).subscribe(data => {
      if(data.status == 200){
        this.set.setOption(data.result, true);
        this.set.setOption(data.exceptionMessage, true);
      }else {
        this.set.setOption(data.exceptionMessage, false);
      }
    })

  }
}
