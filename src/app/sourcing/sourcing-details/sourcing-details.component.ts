import { Sourcing } from '../sourcingModel';
import { Component, OnInit, Input } from '@angular/core';
import { SourcingListComponent } from '../sourcing-list/sourcing-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from "..//..//core/api.service";

@Component({
  selector: 'app-lender-details',
  templateUrl: './sourcing-details.component.html',
  styleUrls: ['./sourcing-details.component.css']
})
export class SourcingDetailsComponent implements OnInit {

  id: number;
  sourcing: Sourcing;

  constructor(private route: ActivatedRoute,private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.sourcing = new Sourcing();

    this.id = this.route.snapshot.params['id'];
    this.apiService.getSourcingSetup(this.id)
    .subscribe(data => {
    if(data.status== 200){
      this.sourcing = data.result;
    }else{
      alert(data.exceptionMessage);
    }
    }, error => console.log(error));
  }

  list(){
    this.router.navigate(['sourcing/list']);
  }
  onSubmit(){
    
  }
}
