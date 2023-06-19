import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cash-discount',
  templateUrl: './cash-discount.component.html',
  styleUrls: ['./cash-discount.component.css']
})
export class CashDiscountComponent implements OnInit {

  orgId : any;

  result : any;

  constructor(private apiService : ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orgId = this.route.snapshot.params['orgId'];
    this.apiService.cashDiscount(this.orgId).subscribe(data => {
      if(data.status == 200){
        this.result = data.result;
      }
    }, error => console.log(error));
  }

}
