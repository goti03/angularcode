import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bene-details-checker',
  templateUrl: './bene-details-checker.component.html',
  styleUrls: ['./bene-details-checker.component.css']
})
export class BeneDetailsCheckerComponent implements OnInit {

  closeResult : any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  view(content){
    this.modalService.open(content,  { ariaLabelledBy: 'modal-basic-title' ,centered: true , backdrop : 'static', keyboard : false}).result.then((result) => {
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
}
