import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ReportModel } from './reportModel';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TabComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,private router: Router) { 
     }
  ngOnInit(){
}

}
 

