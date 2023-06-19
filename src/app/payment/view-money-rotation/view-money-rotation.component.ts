import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';

@Component({
  selector: 'app-view-money-rotation',
  templateUrl: './view-money-rotation.component.html',
  styleUrls: ['./view-money-rotation.component.css']
})
export class ViewMoneyRotationComponent implements OnInit {
  rotationList=[];
  viewcreditRotationList=[];
  closeResult:any;
  p:any;
  searchList;
  constructor(private apiService: ApiService, public set: breadcrumbMessage,
    private modalService: NgbModal,private router: Router) { }

  ngOnInit() {
    this.apiService.viewRotationList().subscribe(data => {
      if (data.status == 200) {
        this.rotationList=data.result;
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
    });
  }
  newRotation(){
    this.router.navigate(['payment/addRotation']);
  }
  viewRotationDetails(content,id){
    this.viewcreditRotationList=[];
    this.apiService.viewRotationDetails(id).subscribe(data => {
      if (data.status == 200) {
        this.viewcreditRotationList=data.result;
        this.modalService.open(content, { size: 'xl' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }else{
        this.set.setOption(data.exceptionMessage,false);
      }
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
  close(){
    this.modalService.dismissAll();
  }
}
