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

@Component({
  selector: 'app-brandupdate',
  templateUrl: './brandupdate.component.html',
  styleUrls: ['./brandupdate.component.css']
})
export class BrandupdateComponent implements OnInit {

  orgId: any;
  brandlist: any;
  checklist: any;
  month: any;
  year: any;
  years: any;
  monthlist: any;
  datelist: any;
  turnOver: any;
  oomytId: any;
  yearstart: any;
  id1: string;
  sourcingPartner: any;
  retailerName: any;
  orgTypeName: any;
  firmType: AnalyserNode;
  gst: any;
  pan: any;
  address: any;
  flog: any;
  personName: any;

  mobile: any;
  pos: any;
  closeResult: any;
  numlist: any
  id2: string;
  id3: AnnotationsInfinityLineTypeLineOptions;
  nodeList: any;
  orgids: any;
  condition: boolean = true;
  error: boolean = false;
  submit: boolean = true;
  id4: any;
  id5: any;
  i: any;
  l; any;
  a: any;
  errormsg: any;
  flag: any;
  months: any;

  // edit(bdata.orgId,bdata.sourcingPartner,bdata.retailerName,bdata.orgTypeName,bdata.firmType,bdata.gst,bdata.pan,bdata.address,bdata.personName,bdata.mobile)

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private set: breadcrumbMessage, private modalService: NgbModal) { }

  ngOnInit() {
    this.years = new Date().getFullYear();
    this.yearstart = this.years - 2;
    this.orgId = this.route.snapshot.params['orgId'];
    console.log("the org id is==" + this.orgId);
    this.apiService.getBrandnode(this.orgId).subscribe(data => {
      {
        this.nodeList = data.result;
        this.sourcingPartner = this.nodeList[0].sourcingPartner;
        this.retailerName = this.nodeList[0].retailerName;
        this.orgTypeName = this.nodeList[0].orgTypeName;
        this.firmType = this.nodeList[0].firmType;
        this.gst = this.nodeList[0].gst;
        this.pan = this.nodeList[0].pan;
        this.address = this.nodeList[0].address;
        this.personName = this.nodeList[0].personName;
        this.mobile = this.nodeList[0].mobile;
      }
    }, error => console.log(error));

    this.apiService.getBranddetails(this.orgId).subscribe(data => {
      if (data.status == 200) {

        this.brandlist = data.result;
        if (this.brandlist.length == 0) {
          this.submit = false;
        }
        for (let i = 0; i < this.brandlist.length; i++) {
          this.brandlist[i].check = '0';
        }
      }
    }, error => console.log(error));
  }

  Addrow() {
    // this.check();
    const brandObj = {
      month: '',
      year: '',
      turnOver: '',
      oomytId: '0',
      check: '1',
      orgId: this.orgId,
      brandName: this.retailerName,
      noOfInvoices: '0'
    }
    this.brandlist.push(brandObj);
    this.submit = true;
  }
  check(i) {
    this.brandlist[i].check = '1';
    this.checklist = this.brandlist;
  }
  Save() {
    if (this.checker() || this.repeater()) {

    } else if (this.flog == 0) {
      this.apiService.updateBranddetails(this.brandlist).subscribe(data => {
        if (data.status == 200) {
          this.goToList();
          this.set.setOption(data.exceptionMessage, true);
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }
        , error => console.log(error));
    } else {
      this.error = true;
      this.errormsg = "please enter all details";
      this.set.setOption(this.errormsg, false);
    }
  }
  goToList() {
    this.router.navigate(['/brand/saved/', this.orgId]);
  }
  checker() {
    this.checklist = this.brandlist;
    this.flog = 0;
    this.error = false;
    for (var s = 0; s < this.brandlist.length; s++) {


      if (this.brandlist[s].year > this.years || this.brandlist[s].year < this.yearstart) {
        this.a = s + 1;
        this.flog = 1;
        this.error = true;
        this.errormsg = "DETAILS CAN ONLY BE ADDED WITHIN YEARS     (" + this.yearstart + " - " + this.years + ")";
        this.set.setOption(this.errormsg, false);
        break;
      }
      if (this.brandlist[s].month > 12 || this.brandlist[s].month < 1) {
        this.a = s + 1;
        this.flog = 1;
        this.error = true;
        this.errormsg = "DETAILS CAN ONLY BE ADDED WITHIN MONTHS (1 - 12)";
        this.set.setOption(this.errormsg, false);
        break;
      }

      if (this.brandlist[s].turnOver < 1) {
        this.a = s + 1;
        this.flog = 1;
        this.error = true;
        this.errormsg = "DETAILS CAN ONLY BE ADDED WITH TURNOVER AMOUNT > 0"
        this.set.setOption(this.errormsg, false);
        break;


      }




    }

    return this.error;

  }
  repeater() {
    for (var z = 0; z < this.brandlist.length; z++) {
      console.log(this.brandlist[z].month);
      for (var y = z + 1; y < this.brandlist.length; y++) {
        console.log(this.brandlist[y].month);
        if (this.brandlist[z].month == this.brandlist[y].month) {
          if (this.brandlist[z].year == this.brandlist[y].year) {
            this.flog = 1;
            this.error = true;
            this.errormsg = " THE SAME DATE CANNOT HAVE MULTIPLE TURNOVER AMOUNTS ";
            this.set.setOption(this.errormsg, false);
            break;
          }


        }


      }
    }
    return this.error;
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



  trasher(i, base) {
    if (base != 0) {
      this.apiService.deletefinanceentry(base).subscribe(data => {
        if (data.status == 200) {


        }
      });
    }

    this.brandlist.splice(i, 1);

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


