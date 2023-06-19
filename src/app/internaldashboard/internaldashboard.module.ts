import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule} from '@angular/material/tabs';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { Interdashboard1Component } from './interdashboard1/interdashboard1.component';

import { Interdashboard2Component } from './interdashboard2/interdashboard2.component';
import { Subdashboard1Component } from './subdashboard1/subdashboard1.component';
import { Subdashboard2Component } from './subdashboard2/subdashboard2.component';
import { InternalcollectionRoutes } from './internaldashboard.routing';


@NgModule({
  declarations: [Interdashboard1Component, Subdashboard1Component,Interdashboard2Component, Subdashboard2Component],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,MatTabsModule, NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule,  RouterModule.forChild(InternalcollectionRoutes)

  ]
})
export class InternaldashboardModule { }
