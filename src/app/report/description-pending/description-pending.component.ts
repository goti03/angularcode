import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router,  ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { breadcrumbMessage } from "../../shared/breadcrumb-message.service";



@Component({
  selector: 'app-description-pending',
  templateUrl: './description-pending.component.html',
  styleUrls: ['./description-pending.component.css']
})
export class DescriptionPendingComponent implements OnInit {


  customerList1 = [];
  customerCtrl : FormControl;
  filteredCustomer : Observable<any[]>;

  id : any;
  description : any;

  constructor(private apiService : ApiService,  private route: ActivatedRoute, private set: breadcrumbMessage,  public router: Router) { 

    this.customerCtrl = new FormControl();

    this.apiService.getCustomerList().subscribe(data => {
      if (data.status == 200) {
        this.customerList1 = data.result;
        for (let c of this.customerList1) {
          c.customerInfo = c.orgName + " - " + c.loanRequestNo;
        }
        console.log(this.customerList1);
        this.filteredCustomer = this.customerCtrl.valueChanges
        .pipe(
          startWith(''),
        map(list => list ? this.customerlist(list) : this.customerList1.slice())
        );

      } 
    }, error => console.log(error));
  }

  customerlist(name: string) {
    return this.customerList1.filter(list =>
      list.orgName.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.apiService.descriptionPending(this.id).subscribe( data => {
      if(data.status == 200) {
        this.description = data.result;
        console.log(data.result);
      }
    }, error => console.log(error));
  }

  descriptioncall() {
    var customerInfo = this.customerCtrl.value;
    var loanId;
    for(let a of this.customerList1){
      var dataCheck = a.orgName + " - " + a.loanRequestNo;
      if(customerInfo == dataCheck) {
        loanId = a.loanId;
      }
    }
    const data = {
      loanId:loanId,
      inId:this.id
    }
    this.apiService.updateVanno(data).subscribe(data => {
      if(data.status == 200) {
        console.log(data.result);
        this.set.setOption(data.result,true);
        this.goto();
      } else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }

  goto() {
    this.router.navigate(['report/pendingrepayment']);
  }

}
