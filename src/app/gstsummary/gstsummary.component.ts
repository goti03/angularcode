import { Component, OnInit } from '@angular/core';
import { GstsummaryService } from './gstsummary.service';
import * as Highcharts from 'highcharts';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-gstsummary',
    templateUrl: './gstsummary.component.html',
    styleUrls: ['./gstsummary.component.css']
})
export class GstsummaryComponent implements OnInit {
    title: any;
    highcharts: any;
    chartOptions: any;
    highcharts1: any;
    chartOptions1: any;
    highcharts2: any;
    chartOptions2: any;
    highcharts3: any;
    chartOptions3: any;
    highcharts4: any;
    chartOptions4: any;
    GSTsummaryDetails: any;
    GSTturnoverDetails: any;
    salesPurchaseRatioDetails: any;
    // gstAmount:any;
    // date:any;
    preCovidHSNList: any;
    duringCovidHSNList: any;
    postCovidHSNList: any;
    gstnSalesSegment: any;
    gstBankTurnoverDetails: any;

    requestList: Observable<any>;
    constructor(
        private route: ActivatedRoute, private router: Router,
        private gstservice: GstsummaryService) {
    }

    ngOnInit() {

        this.gstservice.gstnSalesSegmentList().subscribe(data => {
            this.gstnSalesSegment = data;
            var b2bVal: Array<any> = [];
            var b2clVal: Array<any> = [];
            var b2csVal: Array<any> = [];
            var exportVal: Array<any> = [];
            var nil: Array<any> = [];
            var date: Array<any> = [];
            for (let gs of this.gstnSalesSegment) {
                date.push(gs.date);
                b2bVal.push(gs.b2b);
                b2clVal.push(gs.b2cl);
                b2csVal.push(gs.b2cs);
                exportVal.push(gs.export);
                nil.push(gs.nil);
            }
            this.highcharts3 = Highcharts;
            this.chartOptions3 = {
                chart: {
                    type: 'column'
                }, credits: {
                    enabled: false
                },
                title: {
                    text: 'Indicator of Stress in Specific Segment - Export/ B2B / B2C'
                },
                xAxis: {
                    categories: date,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'B2B',
                    data: b2bVal
                }, {
                    name: 'B2CL',
                    data: b2clVal
                }, {
                    name: 'B2CS',
                    data: b2csVal
                }, {
                    name: 'Export',
                    data: exportVal

                }, {
                    name: 'NIL',
                    data: nil
                }]
            };
        }, error => console.log(error));

        this.gstservice.salesPurchaseRatioList().subscribe(data => {
            this.salesPurchaseRatioDetails = data;
            var month: Array<any> = [];
            var sale: Array<any> = [];
            var purchase: Array<any> = [];
            var ratio: Array<any> = [];
            // console.log("salesPurchaseRatioDetails===" + JSON.stringify(this.salesPurchaseRatioDetails));
            for (let sp of this.salesPurchaseRatioDetails) {
                month.push(sp.month);
                sale.push(sp.sale);
                purchase.push(sp.purchase);
                ratio.push(sp.ratio);
            }
            this.highcharts4 = Highcharts;
            this.chartOptions4 = {
                chart: {
                    zoomType: 'xy'
                }, credits: {
                    enabled: false
                },
                title: {
                    text: 'Turnover and Purchase comparative analiysis'
                },
                subtitle: {
                    text: ''
                },
                xAxis: [{
                    categories: month,
                    crosshair: true
                }],
                yAxis: [{ // Secondary yAxis
                    title: {
                        text: 'ratio',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value}%',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }, {
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'INR',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || // theme
                        'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: 'sale',
                    type: 'column',
                    yAxis: 1,
                    data: sale,
                    tooltip: {
                        valueSuffix: ''
                    }

                }, {
                    name: 'purchase',
                    type: 'column',
                    yAxis: 1,
                    data: purchase,
                    tooltip: {
                        valueSuffix: ''
                    }

                }, {
                    name: 'ratio',
                    type: 'spline',
                    data: ratio,
                    tooltip: {
                        valueSuffix: '%'
                    }
                }]
            };
        }, error => console.log(error));

        this.gstservice.gstBankTurnoverList().subscribe(data => {
            this.gstBankTurnoverDetails = data;
            var gstamt: Array<any> = [];
            var bankamt: Array<any> = [];
            var period: Array<any> = [];
            // console.log("gstBankTurnoverDetails===" + JSON.stringify(this.gstBankTurnoverDetails));
            for (let gb of this.gstBankTurnoverDetails) {
                gstamt.push(gb.gst);
                bankamt.push(gb.bank);
                period.push(gb.month);
            }
            // console.log("gstamt==" + gstamt);
            // console.log("bankamt==" + bankamt);
            // console.log("period==" + period);

            this.highcharts1 = Highcharts;
            this.chartOptions1 = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Turnover Comparision GST and Banking'
                },
                xAxis: {
                    categories: period,
                    crosshair: true
                }, credits: {
                    enabled: false
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'GST',
                    data: gstamt
                }, {
                    name: 'Banking',
                    data: bankamt
                }]
            };
        }, error => console.log(error));

        this.gstservice.getGstTurnoverList().subscribe(data => {
            this.GSTturnoverDetails = data;
            // console.log("GSTturnoverDetails===" + JSON.stringify(this.GSTturnoverDetails));
            var name: Array<any> = [];
            var turnover: Array<any> = [];
            for (let gd of this.GSTturnoverDetails) {
                name.push(gd.name);
                turnover.push(gd.turnover);
            }
            this.highcharts2 = Highcharts;
            this.chartOptions2 = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                }, credits: {
                    enabled: false
                },
                title: {
                    text: 'GST Turnover'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Turnover',
                    colorByPoint: true,
                    data: this.GSTturnoverDetails
                }]
            };

        }, error => console.log(error));

        this.gstservice.getGstSummaryList().subscribe(data => {
            this.GSTsummaryDetails = data;
            var gstAmount: Array<any> = [];
            var date: Array<any> = [];
            // console.log("GSTsummaryDetails===" + JSON.stringify(this.GSTsummaryDetails));
            for (let g of this.GSTsummaryDetails) {
                gstAmount.push(g.gst);
                date.push(g.period);
            }
            // console.log("this.gstAmount==" + gstAmount);
            // console.log("this.date==" + date);
            this.title = 'FinnAgg';
            this.highcharts = Highcharts;
            this.chartOptions = {
                chart: {
                    type: 'areaspline'
                },
                title: {
                    text: 'GST Summary'
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
                },
                xAxis: {
                    categories:
                        date
                    // 'a','b','c','d','e','f'
                    ,

                },
                yAxis: {
                    title: {
                        text: 'INR'
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' Rs'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
                series: [{
                    name: 'GST Amount',
                    data: gstAmount

                }]

            };


        }, error => console.log(error));

        this.gstservice.getPreCovidHSNList().subscribe(data => {
            this.preCovidHSNList = data;
            // console.log("PreCovidHSNList===" + JSON.stringify(this.preCovidHSNList));
        }, error => console.log(error));

        this.gstservice.getDuringCovidHSNList().subscribe(data => {
            this.duringCovidHSNList = data;
            // console.log("DuringCovidHSNList===" + JSON.stringify(this.duringCovidHSNList));
        }, error => console.log(error));

        this.gstservice.getPostCovidHSNList().subscribe(data => {
            this.postCovidHSNList = data;
            // console.log("PostCovidHSNList===" + JSON.stringify(this.postCovidHSNList));
        }, error => console.log(error));
    }

}
