import { Component, OnInit } from '@angular/core';
import { subMilliseconds, subMinutes } from 'date-fns';
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
import { tick } from '@angular/core/testing';
import {Crypto} from '../../shared/crypto.service';  

@Component({
  selector: 'app-detailsnow',
  templateUrl: './detailsnow.component.html',
  styleUrls: ['./detailsnow.component.css']
})
export class DetailsnowComponent implements OnInit {
  gsts: any;
  names: any;
  pins: any;
  credits: any;
  tickcheck: any;
  pan: any;
  checker: any;
  turnovers: any;
  datalist: any[];
  detailslist: any[];
  parentOrgId: any;
  userId: any;
  confirm: any;
  errosmsg:any;
   href: string = "";
view:boolean=false;
routing:any;
  type: any;
  errormsg: any;
  gstmatch: any;
  gstmatchone:any;
  roleId :any;
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private set: breadcrumbMessage, private modalService: NgbModal,
    private crypto: Crypto) { }
    
    ngOnInit() {
      this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
      this.gstmatch = new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$");
      this.gstmatchone=new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$");
      this.href = this.router.url;
      if(this.href.includes("new-lead"))
    {
      this.routing=1;

  }
  else{
    this.routing=2;
  }
    
  }


  submit() {
    if (((!this.gstmatch.test(this.gsts))&&(!this.gstmatchone.test(this.gsts))) || this.gsts == undefined || this.gsts == null || this.gsts == "") {
      this.errormsg = "Please Enter a Valid Gst Number";
    }else if(this.set.validateSpecialChar(this.gsts)){
      this.errormsg = "Special Character Not Allowed";
    }else if(this.set.validateSpecialChar(this.names)){
      this.errormsg = "Special Character Not Allowed";
    }else if(this.set.validateSpecialChar(this.turnovers)){
      this.errormsg = "Special Character Not Allowed";
    }else if(this.set.validateSpecialChar(this.credits)){
      this.errormsg = "Special Character Not Allowed";
    }else if(this.set.validateSpecialChar(this.pins)){
      this.errormsg = "Special Character Not Allowed";
    } else {
      this.errormsg = "";
      this.detailslist = [];
      this.datalist = [];
      this.pan = this.gsts.substring(2, 12);
      if(this.pins==null||this.pins==undefined){
        this.pins="";
      }
      if(this.names==null||this.names==undefined){
        this.names="";
      }
      if(this.credits==null||this.credits==undefined){
        this.credits="";
      }
      if(this.turnovers==null||this.turnovers==undefined){
        this.turnovers="";
      }
    
      // this.detailslist = [this.pan, window.localStorage.getItem('mobileNob'), "1","", this.names, this.gsts, this.pins, this.credits, this.turnovers,"","Sucess"]

      this.detailslist = [this.pan,window.localStorage.getItem('mobileNob'),"1","",this.names,this.gsts,this.pins,this.credits,this.turnovers,"Success"]
      this.datalist.push(this.detailslist);
if(this.routing==2)
{
      this.parentOrgId = "0";
      this.userId = 0;
        this.type = 1;
}
else if(this.routing==1)
{
  if(this.roleId == 15){
    this.parentOrgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
  }else
    this.parentOrgId = window.localStorage.getItem('sourcingPartnerslms');
  }
  this.userId=this.crypto.decryt(window.localStorage.getItem('userId'));
  this.type = 1;
}
  
      this.apiService.insertLeadDetails(this.datalist, this.parentOrgId, this.userId, this.type).subscribe(data => {
        if (data.status == 200) {
              this.errormsg="";
              window.localStorage.setItem('orgIdlms', data.result);
              window.localStorage.setItem('gstpan',this.gsts);

              if(this.routing==2)
              {
             this.router.navigate(['newlead/thankyou']);
              }
              else if(this.routing==1)
              {
               this.router.navigate(['new-lead/thankyou']);
              }
          this.errosmsg = "Lead Successfully Added";
        } else {

          this.errormsg = data.exceptionMessage;
        }
      }
        , error => console.log(error));
    }





  alphanumkeyPress(event: any) {
    const pattern = /[a-zA-Z0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }


  keyPress(event: any) {
    // alert(event);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }



}