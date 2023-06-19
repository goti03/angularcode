import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
// import {GstreportComponent} from './gstreport.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {GstreportRoutingModule} from './gstreport.routing.module';
import { MatTabsModule} from '@angular/material/tabs';

import { GstreportComponent } from './gstreport.component';
// import {GstsummaryService} from './gstsummary.service';
@NgModule({
  declarations: [
    
    // GstreportComponent
  ],
  imports: [
    CommonModule,MatTabsModule,
    GstreportRoutingModule,
    HighchartsChartModule,
    NgxQRCodeModule
    // GstsummaryService
  ]
})
export class GstreportModule { }
