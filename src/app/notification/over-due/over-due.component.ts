import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-over-due',
  templateUrl: './over-due.component.html',
  styleUrls: ['./over-due.component.css']
})
export class OverDueComponent implements OnInit {

  orgId : any;

  result : any;

  constructor(private apiService : ApiService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.orgId = this.route.snapshot.params['orgId'];
    this.apiService.overDue(this.orgId).subscribe(data => {
      if(data.status == 200){
        this.result = data.result;
      }
    }, error => console.log(error));
  }

}
