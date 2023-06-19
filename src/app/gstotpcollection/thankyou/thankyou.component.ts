import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  companyName:any

  constructor(public router: Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.companyName = this.route.snapshot.params['name'];
  }

}
