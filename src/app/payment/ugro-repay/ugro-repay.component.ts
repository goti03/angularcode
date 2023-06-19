import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Currency } from '../../shared/currency.service';

@Component({
  selector: 'app-ugro-repay',
  templateUrl: './ugro-repay.component.html',
  styleUrls: ['./ugro-repay.component.css']
})
export class UgroRepayComponent implements OnInit {

  consiladatedate: any;
  laid: any;
  q :any=1;
  q1:any;
  constructor(private apiservice: ApiService,private currency:Currency,private router:Router) { }

  ngOnInit() {
    this.apiservice.consiladatelist().subscribe(res => this.consiladatedate = res.result );
    
  }
view(lpid){
  this.router.navigate(['/payment/tranch', lpid])
}
indianCurrency(number: any) {
  return this.currency.indianCurrency(number);
}

}

