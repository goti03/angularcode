import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-duein-three-day',
  templateUrl: './duein-three-day.component.html',
  styleUrls: ['./duein-three-day.component.css']
})
export class DueinThreeDayComponent implements OnInit {


  orgId : any;

  result : any;

  constructor(private apiService : ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orgId = this.route.snapshot.params['orgId'];
    this.apiService.duein3(this.orgId).subscribe(data => {
      if(data.status == 200){
        this.result = data.result;
      }
    }, error => console.log(error));
  }

}
