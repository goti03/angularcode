import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { data } from '../dashboard3/smart-data-table';

@Component({
  selector: 'app-regional-status',
  templateUrl: './regional-status.component.html',
  styleUrls: ['./regional-status.component.css']
})
export class RegionalStatusComponent implements OnInit {
  p: any = 1;
  month: any;
  year: any;
  statusFlow: any;
  statusList: any;
  substatusList: any;
  allstatusList: any;
  statusId: any;
  ProgramList: any;
  programId: any;
  substatusId: any;
  getRegional:  Array<any> = [];

  allAnchorList: any;
  anchorCtrl: FormControl;
  filteredanchor: Observable<any[]>;
  anchorId: any;
  getSummary: any;
  anchorlist: any;
  approved: any;
  rejected: any;
  pending: any;
  progress: any;
  constructor(private apiService: ApiService, private set: breadcrumbMessage) {


  }

  ngOnInit() {
    this.month = "0";
    this.programId = "0";
    this.statusId = "0"
    this.substatusId = "0";
    this.anchorId = "0";
    this.approved = "00";
    this.rejected = "00";
    this.pending = "00";
    this.progress = "00";
    this.apiService.getProgramDetailsList().subscribe(data => {
      if (data.status == 200) {
        this.ProgramList = data.result;
      }
    });

    this.apiService.getOverallStatusList().subscribe(data => {
      if (data.status == 200) {
        this.allstatusList = data.result.statusList;
      }
    }, error => console.log(error));

  }
  getsubStatusList(statusId) {
    this.statusId = statusId;
    this.apiService.getsubStatusList(Number(this.statusId))
      .subscribe(data => {
        this.substatusList = data.result;

      }, error => console.log(error));
  }
  getAnchorName(programId) {
    this.programId = programId;
    this.apiService.getAnchorNames(Number(this.programId)).subscribe(data => {
      this.anchorlist = data.result.spName;
    })
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  onSubmit() {
    if (this.isNullorUndefinedorEmpty(this.programId)) {
      this.set.setOption("Please Choose program Name", false);
    } else if (this.isNullorUndefinedorEmpty(this.month)) {
      this.set.setOption("Please Choose Month", false);
    } else if (this.isNullorUndefinedorEmpty(this.month)) {
      this.set.setOption("Please Enter year", false);
    } else if (this.isNullorUndefinedorEmpty(this.month)) {
      this.set.setOption("Please Choose Status", false);
    } else if (this.isNullorUndefinedorEmpty(this.month)) {
      this.set.setOption("Please Choose Sub-Status", false);
    } else {
      const data = {
        programId: this.programId,
        month: this.month,
        setYear: this.year,
        statusId: this.statusId,
        subStatusId: this.substatusId
      }
      this.apiService.getRegional(data).subscribe(data => {
        if (data.status == 200) {
          this.getRegional = data.result
        } else {
          this.set.setOption(data.exceptionMessage, false);
        }
      });
      this.apiService.getSummaryList(data).subscribe(data => {
        if (data.status == 200) {
          for (let a of data.result) {
            if (a.status == 'Approved') {
              this.approved = a.statusCount;
            } else if (a.status == 'Rejected') {
              this.rejected = a.statusCount;
            } else if (a.status == 'pending') {
              this.pending = a.statusCount;
            } else if (a.status == 'In Progress') {
              this.progress = a.statusCount;
            }
          }
        }
      });
    }
  }
  reset() {
    this.anchorlist="0";
    this.programId = "0";
    this.month = "0";
    this.year = "";
    this.statusId = "0";
    this.substatusId = "0";

  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
