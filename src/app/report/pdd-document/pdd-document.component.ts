import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pdd-document',
  templateUrl: './pdd-document.component.html',
  styleUrls: ['./pdd-document.component.css']
})
export class PddDocumentComponent implements OnInit {
  allAnchorList: any;
  filteredanchor: Observable<any[]>;
  anchorCtrl: FormControl;
  anchors:any;
  startDate:any;
  loanId:any;
  status:any;
  panNo:any;
  endDate:any;
  customerName:any;
  sanctionList=[];
  p:any;
  p1:any;
  searchFilter:boolean=false;
  constructor(private apiService: ApiService,private router: Router,private route: ActivatedRoute) { 
    this.anchorCtrl = new FormControl();
    this.apiService.getAnchorList().subscribe((data)=> {
      if(data.status == 200){
        this.allAnchorList = data.result;
        console.log('allAnchorList',this.allAnchorList);
        for (let c of this.allAnchorList) {
          c.anchorInfo = c.anchorName 
          c.anchorId = c.orgId
        }
        this.filteredanchor = this.anchorCtrl.valueChanges
          .pipe(startWith(''),
            map(list1 => list1 ? this.anchorlist(list1) : this.allAnchorList.slice())
          );
        console.log("this.filteredanchor::" + JSON.stringify(this.filteredanchor));

      }
    }, error => console.log(error));
    
  }

  ngOnInit() {
    this.p1 = 10;
    this.p = 1;
  }
  anchorlist(name: string) {
    return this.allAnchorList.filter(list =>
      list.anchorInfo.toLowerCase().includes(name.toLowerCase()));
  }
  enterKey(e) {
    if (e.keyCode === 13) {
      // this.searchListfun();

    }
  }

  getSanctionConditionExcel(){
    const data = {
      startDate:(this.startDate) ? this.startDate : '',
      endDate:(this.endDate) ? this.endDate : '',
      panNo:(this.panNo) ? this.panNo : '',
      anchor:(this.anchors) ? this.anchors : '',
      status:(this.status) ? this.status : '',
      loanId:Number((this.loanId)) ? Number(this.loanId) :Number('') ,
      customerName:(this.customerName) ? this.customerName : ''
    }
    this.apiService.getSanctionConditionList(1,data).subscribe((res)=>{
      if(res.status == 200){
        var url =res.result;
        window.open(url,'_self');
      }

    })
  }
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
searchSanctionConditionList(){
  const data = {
    startDate:(this.startDate) ? this.startDate : '',
    endDate:(this.endDate) ? this.endDate : '',
    panNo:(this.panNo) ? this.panNo : '',
    anchor:(this.anchors) ? this.anchors : '',
    status:(this.status) ? this.status : '',
    loanId:Number((this.loanId)) ? Number(this.loanId) : Number(''),
    customerName:(this.customerName) ? this.customerName : ''
  }
  this.apiService.getSanctionConditionList(0,data).subscribe((res)=>{
    if(res.status == 200){
      this.sanctionList = res.result.list;
      this.searchFilter = true;
    }
  })
}
resetSanctionCondition(){
  this.startDate='',
  this.endDate='',
  this.panNo='',
  this.anchors='',
  this.status='',
  this.loanId='',
  this.customerName=''
}
viewSanctionCondition(loanId){
  this.router.navigate([`report/viewPdd/${loanId}`]);
}
}
