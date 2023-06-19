import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from "..//..//..//core/api.service";

@Component({
  selector: 'app-nach-form',
  templateUrl: './nach-form.component.html',
  styleUrls: ['./nach-form.component.css']
})
export class NachFormComponent implements OnInit {
  loanid:any;
  formDetails:any;
  orgId:any;
  id:any;
  constructor(private route: ActivatedRoute,private apiService : ApiService,
     private router: Router) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    this.loanid = this.route.snapshot.params['loanid'];
    this.orgId = this.route.snapshot.params['orgId'];
    // this.retailerId = this.route.snapshot.params['retailerId'];
    this.apiService.getNachFormDetails(this.loanid)
                .subscribe(data => {
                  this.formDetails=data.result;
              }, error => console.log(error));
      }

}
