import { Master } from '../masterModel';
import { Component, OnInit, Input } from '@angular/core';
import { MasterListComponent } from '../master-list/master-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from "..//..//core/api.service";
import {Currency} from '../../shared/currency.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css']
})
export class MasterDetailsComponent implements OnInit {

  id: number;
  master: Master;

  constructor(private route: ActivatedRoute,private router: Router,
    private apiService: ApiService,  public currency : Currency, private set : breadcrumbMessage
    ) { }

  ngOnInit() {
    this.master = new Master();

    this.id = this.route.snapshot.params['id'];
    this.apiService.getMasterSetup(this.id) 
    .subscribe(data => {
    if(data.status== 200){
      this.master = data.result;
    }else{
      this.set.setOption("Failed to load data",false);

      // alert(data.exceptionMessage);
    }
    }, error => console.log(error));
    
  }

  list(){
    this.router.navigate(['master/list']);
  }

  indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
  }
}
