import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import { Currency } from '../../shared/currency.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-detailed-tranch',
  templateUrl: './detailed-tranch.component.html',
  styleUrls: ['./detailed-tranch.component.css']
})
export class DetailedTranchComponent implements OnInit {
  id: number;
  detailedTranch = [];
  nodata: any;
  closeResult: string;
  status: string;
  userId:any;
  constructor(public route: ActivatedRoute, public apiservice: ApiService, private modalService: NgbModal, private router: Router,
    public currency: Currency,private crypto: Crypto) { }

  indianCurrency(number: any) {
    return this.currency.indianCurrency(number);
  }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.nodata = false;
    this.id = this.route.snapshot.params['id'];
    this.apiservice.detailedTranch(this.id).subscribe(data => {
      if (data.status == 200) {
        if (data.result.length != 0) {
          this.detailedTranch = data.result;
          this.nodata = false;
        }
        else {
          this.nodata = true;
          this.detailedTranch = [];
          this.gotoAction();
        }
      }
      else {

      }
    })
  }

  processpayment(content, id: Number) {
    const data = {
      "id": id,
      "userId": this.userId
    }
    this.status = '';
    this.apiservice.processrepayment(data).subscribe(data => {
      if (data.status == 200) {
        this.status = data.exceptionMessage;
        this.modalService.open(content, { size: 'xl' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      }
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


  gotoAction() {
    this.router.navigate(['report/pendingrepayment/']);
  }



}
