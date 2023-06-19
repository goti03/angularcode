import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { ApiService } from "..//..//core/api.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AnnotationsInfinityLineTypeLineOptions, numberFormat } from 'highcharts';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service'
import * as moment from 'moment/moment.js';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { checkServerIdentity } from 'tls';
import { isThursday } from 'date-fns';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-updatelead',
  templateUrl: './updatelead.component.html',
  styleUrls: ['./updatelead.component.css']
})
export class UpdateleadComponent implements OnInit {
leadlist;
p:any;
p1:any;
page:any;
requestList:any;
data:any;
sourcingPartnerId : any;
id1:any;
sourcingPartnerList:[];
id2:any;
remarks:any;
panid:any;
gstid:any;
lmsIds:any;
counts:any;


  closeResult: String = "";
  userId:any;
  roleId:any;
  userName:any;
  constructor(private route: ActivatedRoute, private router: Router,private crypto: Crypto,
     private apiService: ApiService, private set: breadcrumbMessage, private modalService: NgbModal) { }

  ngOnInit() {
    this.userName= this.crypto.decryt(window.localStorage.getItem('userName'));
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.p1=10;
    this.page=0;
    this.p=1;
    this.apiService.getLeadDetails(this.userId,this.roleId).subscribe(res => {
      this.requestList=res.result;
      if (this.roleId == 15) {
        var list = [];
        for (let a of this.requestList) {
          if (a.userName == this.userName) {
            a.panNo = this.crypto.decryt(a.panNo);
            a.GSTNo = this.crypto.decryt(a.GSTNo);
            list.push(a);
          }
        }
        this.requestList = list;
      }else{
        var list = [];
        for (let a of this.requestList) {
          a.panNo = this.crypto.decryt(a.panNo);
          a.GSTNo = this.crypto.decryt(a.GSTNo);
          list.push(a);
        }
        this.requestList = list;
      }
    });
    this.apiService.getPartnerList().subscribe(res => { this.sourcingPartnerList = res.result });
    this.gstid = this.route.snapshot.params['gstId'];

    if (this.gstid) {
      this.leadlist = this.gstid;
    }
  }
  Add() {
    if (this.sourcingPartnerId == null || this.sourcingPartnerId == undefined) {
      this.set.setOption("Choose a sourcing partner", false);
    }else {
      window.localStorage.setItem('sourcingPartnerslms', this.sourcingPartnerId);
      this.router.navigate(['new-lead/loginnow']);
    }
  }
  sourcingPartner(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  gotoList(id1, id2) {
    this.panid = id1;
    this.counts = id2;
    if(this.roleId!=15){
      if (this.counts > 0) {
        this.router.navigate(['/report/loanRequestList'],{ queryParams: { 'pan':this.panid ,'nonStopFlag':'0'}});
      }else {
        this.set.setOption("An applicant sharing the same pan number is not present", false);
      }
    }
  }
  save(id1, id2) {
    this.lmsIds = id1;
    this.remarks = id2;
    if (this.remarks == "" || this.remarks == null || this.remarks == undefined) {
      this.set.setOption("Please Enter a Remark before saving", false);
    }else {
      const data ={
        remarks: this.remarks,
        lmsId: this.lmsIds,
        userId: Number(this.userId)
      }
      this.apiService.updateDetailsLMS(data).subscribe(data => {
        if (data.status == 200) {
          this.set.setOption("Remarks Updated Successfully", true);
          // window.localStorage.setItem('mobileNob', this.mobilenumber);
        }else {
          //this.errormsg = data.exceptionMessage;
        }
      }, error => console.log(error));
    }

  }

routing(){
  this.router.navigate(['new-lead/loginnow']);
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
