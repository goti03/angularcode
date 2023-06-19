import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ApiService } from '../../core/api.service'
import {ExcelService} from '../../shared/excel.service';
import {PdfService} from '../../shared/pdf.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-waterfall-report',
  templateUrl: './waterfall-report.component.html',
  styleUrls: ['./waterfall-report.component.css']
})
export class WaterfallReportComponent implements OnInit {


  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;


  constructor(private apiService: ApiService, public excelservice:ExcelService, public pdfservice :PdfService,
    private crypto:Crypto) { }

  list = [];
  sfield: any;

  lenderList = [];
  lender: any;

  programList = [];
  program: any;

  ln : any;
  searchList : any;
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
}
  ngOnInit() {
    this.ln = "Lender";
    const data = {
      lenderId: '',
      programId: ''
    }
    this.apiService.getLenderList().subscribe(data => {
      if (data.status == 200) {
        this.lenderList = data.result;
        this.lender = "0";
        for(let l of this.lenderList){
          l.panNo=this.crypto.decryt(l.panNo);
        }
        console.log(data.result);
      }
    })
    this.apiService.getProgramSetupList().subscribe(data => {
      if (data.status == 200) {
        this.programList = data.result;
        this.program = "0";
        console.log(data.result);
      }
    })
    this.apiService.getWaterfallReport(data).subscribe(data => {
      this.list = data.result.list;
    })
  }


  programSet() {
    // alert(this.lender);
    for(var a =0; a<this.lenderList.length;a++)
    {
      if(this.lender == this.lenderList[a].lenderId)
      {
        this.ln = this.lenderList[a].lenderName;
      }
      else if(this.lender == "")
      {
        this.ln = "Lender";
      }
    }
    var data = {
      lenderId : this.lender,
      programId : ''
    }
    this.apiService.getWaterfallReport(data).subscribe( data => {
      if(data.status == 200)
      {
        this.list = data.result.list;
      }
    })
    var list;
    this.apiService.getProgramSetupList().subscribe(data => {
      if (data.status == 200) {
        list = data.result;
        var list1 = [];
        for (var a = 0; a < list.length; a++) {
          var c = list[a].lenders[0].lenderId;
          if (this.lender == c) {
            list1.push(list[a]);
          }
        }
        if(list1.length == 0)
        {
          this.programList = data.result;
        }
        else{
          this.programList = list1;
        }
      }
    })
  }


  search(){
    // alert(this.program)
    if(this.isNullorUndefinedorEmpty(this.lender)){
      this.lender = '';
    }
    var data = {
      lenderId : this.lender,
      programId : this.program
    }
    this.apiService.getWaterfallReport(data).subscribe( data => {
      if(data.status == 200)
      {
        this.list = data.result.list;
      }
    })
  }


  export() {
    var list = [];
    for(let l of this.list)
    {
      const listObj = {
        Date:l.monthDate,
        limitCreated:l.limitCreated,
        totalLogin:l.totalLogin,
        InprogressFinaggOperation:l.inProgressFA,
        InprogressLender:l.inProgressIDFC,
        BureauRejected:l.bureauRejectedFA,
        PosidexRejected:l.posidexRejected,
        OtherRejection:l.otherRejected
      }
      list.push(listObj);
    }
   this.excelservice.exportAsExcelFile(list,'Waterfall_Report');  
  }

  pdf() {
    var title = "Waterfall_report";
    var body = [
                ['Date', 'Total Login', 'Limit Created', `In Progress ${this.ln}`, 'In Progress Finagg OPeration', 'Rejected posidex', 'Rejected Bureau', 'other Rejection'],
                ...this.list.map(l => ([l.monthDate,l.totalLogin,l.limitCreated,l.inProgressIDFC,l.inProgressFA,l.posidexRejected,l.bureauRejectedFA,l.otherRejected]))
                ]
    this.pdfservice.pdf(body,title, 'A4');
  }

}
