import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "..//..//core/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'

@Component({
  selector: 'app-thankyoulead',
  templateUrl: './thankyoulead.component.html',
  styleUrls: ['./thankyoulead.component.css']
})
export class ThankyouleadComponent implements OnInit {
  referenceid:any;
  href: string = "";
  gstnum:any;
  view:boolean=false;
  constructor(public router: Router, private route: ActivatedRoute, private apiService: ApiService, private modalService: NgbModal, private set: breadcrumbMessage) { }

  ngOnInit() {
    this.href = this.router.url;
   this.referenceid= window.localStorage.getItem('orgIdlms');
   if(this.href.includes("new-lead"))
    {
      this.view=true;
      this.gstnum=window.localStorage.getItem('gstpan');
      console.log("hekllo==="+this.gstnum)
    }
  }


  goforward()
  {
    this.router.navigate(['report/viewleads', this.gstnum]);
  }
}
