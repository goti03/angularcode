import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner-link',
  templateUrl: './partner-link.component.html',
  styleUrls: ['./partner-link.component.css']
})
export class PartnerLinkComponent implements OnInit {

  constructor() { }

  partnerUrl : any;
  timer : any;

  ngOnInit() {
    this.timer = 5;
    this.partnerUrl = 'https://partner.finagg.in/';
    this.starttimer();
  }

  starttimer(){
    var interval = setInterval(() => {
      this.timer--;
      clearInterval(interval);
      if(this.timer > 0){
        this.starttimer();
      }else{
        this.url();
      }
    },1000)
  }

  url(){
    window.open(this.partnerUrl,'_blank');
  }

}
