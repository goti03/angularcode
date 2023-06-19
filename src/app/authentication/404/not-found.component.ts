import { Component, AfterViewInit, OnInit } from '@angular/core';
import { lenderconfiguration } from '../../../environments/lender.config';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  year:any;
  lenderName:any;
  ngOnInit() {
    this.year=moment().format('YYYY')
    this.lenderName=lenderconfiguration.lenderFooter;
  }
  // ngAfterViewInit() {
  //   $(function() {
  //     $('.preloader').fadeOut();
  //   });
  // }
}
