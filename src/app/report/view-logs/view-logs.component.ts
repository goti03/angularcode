import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';

@Component({
  selector: 'app-view-logs',
  templateUrl: './view-logs.component.html',
  styleUrls: ['./view-logs.component.css']
})
export class ViewLogsComponent implements OnInit {

  searchList: any;
  p : any;
  loanId : any;
  p1:any;
  page:any;
  log : any;

  constructor(private router: Router, private apiService : ApiService, private route: ActivatedRoute, private set : breadcrumbMessage) { }

  ngOnInit() {
    this.p1=10;
    this.page=0;
    this.p=1;
    this.loanId = this.route.snapshot.params['loanid'];
    this.apiService.auditStatusDetails(this.loanId).subscribe(data => {
      if(data.exceptionOccured == 'N'){
        this.log = data.result;
      }else {
        this.set.setOption(data.exceptionMessage,false);
      }
    }, error => console.log(error));
  }

  toLoanlist() {
    this.router.navigate(['report']);
  }
  toMylist()

  {

    this.router.navigate([`dashboard/Mylist/${this.loanId}`])

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
