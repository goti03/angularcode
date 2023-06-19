import { Lender } from '../lenderModel';
import { Component, OnInit, Input } from '@angular/core';
import { LenderListComponent } from '../lender-list/lender-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from "..//..//core/api.service";
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'

@Component({
  selector: 'app-lender-details',
  templateUrl: './lender-details.component.html',
  styleUrls: ['./lender-details.component.css']
})
export class LenderDetailsComponent implements OnInit {

  id: number;
  lender: Lender;

  constructor(private route: ActivatedRoute,private router: Router,private apiService: ApiService, private set : breadcrumbMessage) { }

  ngOnInit() {
    this.lender = new Lender();

    this.id = this.route.snapshot.params['id'];
    this.apiService.getLenderSetup(this.id) 
    .subscribe(data => {
    if(data.status== 200){
      this.lender = data.result;
    }else{
      this.set.setOption("Failed to load",false);

      // alert(data.exceptionMessage);
    }
    }, error => console.log(error));

   
  }

  list(){
    this.router.navigate(['lender/list']);
  }
}
