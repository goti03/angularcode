import { Component } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
declare var require: any;

const data: any = require('./data.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.css']
})
export class Dashboard3Component {
  subtitle: string;
  source: LocalDataSource;
  constructor() {
    this.subtitle = 'This is some text within a card block.';
    this.source = new LocalDataSource(tableData.data);
  }
  settings2 = tableData.settings;
  // This is for the dashboar line chart
  public lineChartData: Array<any> = [
    { data: [0, 130, 80, 70, 180, 105, 250], label: 'Site A' },
    { data: [0, 100, 60, 200, 150, 90, 150], label: 'Site B' }
  ];
  public lineChartLabels: Array<any> = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016'
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(25,118,210,0.0)',
      borderColor: 'rgba(25,118,210,1)',
      pointBackgroundColor: 'rgba(25,118,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(25,118,210,0.5)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(38,218,210,0.0)',
      borderColor: 'rgba(38,218,210,1)',
      pointBackgroundColor: 'rgba(38,218,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(38,218,210,0.5)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  // This is for the donute chart
  donuteChart1: Chart = {
    type: 'Pie',
    data: data['Pie'],
    options: {
      donut: true,
      showLabel: false,
      donutWidth: 30
    }
    // events: {
    //   draw(data: any): boolean {
    //     return data;
    //   }
    // }
  };
}
