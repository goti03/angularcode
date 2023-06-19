import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miscomponent',
  templateUrl: './miscomponent.component.html',
  styleUrls: ['./miscomponent.component.css']
})
export class MiscomponentComponent implements OnInit {
  partnerUrl : any;
  timer : any;
  constructor() { }

 
  ngOnInit() {
    this.timer = 5;
    this.partnerUrl = 'https://finagg.in/mis';
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
