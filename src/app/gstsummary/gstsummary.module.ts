import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HighchartsChartComponent } from 'highcharts-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import {GstsummaryComponent} from './gstsummary.component';
import {GstsummaryRoutingModule} from './gstsummary.routing.module';
import { MatTabsModule} from '@angular/material/tabs';
// import {GstsummaryService} from './gstsummary.service';
@NgModule({
  declarations: [
    GstsummaryComponent
    // HighchartsChartComponent
  ],
  imports: [
    CommonModule,MatTabsModule,
    HighchartsChartModule,
    GstsummaryRoutingModule
    // GstsummaryService
  ]
})
export class GstsummaryModule { }
