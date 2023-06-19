import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { MylistComponent } from './mylist/mylist.component'
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutes } from './dashboard.routing';
import { MiscomponentComponent } from './miscomponent/miscomponent.component';
import { CohortComponent } from './cohort/cohort.component';
import { ChartistModule } from 'ng-chartist';
import { DetailscreenComponent } from './detailscreen/detailscreen.component'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrandDashboardComponent } from './brand-dashboard/brand-dashboard.component';
import { LenderDashboardComponent } from './lender-dashboard/lender-dashboard.component';
import { FinaggDashboardComponent } from './finagg-dashboard/finagg-dashboard.component';
import { StatusDetailsComponent } from './status-details/status-details.component';
import { MatAutocompleteModule, MatDialogModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { RegionalStatusComponent } from './regional-status/regional-status.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ChartsModule,
    ChartistModule,
    Ng2SmartTableModule,
    RouterModule.forChild(DashboardRoutes),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatSlideToggleModule,
    MatTabsModule, MatAutocompleteModule, MatInputModule,
    MatDialogModule,
  ],
  declarations: [
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    BrandDetailsComponent,
    DetailscreenComponent,
    MylistComponent,
    MiscomponentComponent,
    CohortComponent,
    BrandDashboardComponent,
    LenderDashboardComponent,
    FinaggDashboardComponent, StatusDetailsComponent, RegionalStatusComponent
  ]
})
export class DashboardModule { }
