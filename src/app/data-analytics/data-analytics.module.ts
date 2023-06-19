import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataAnalyticsRoutingModule } from './data-analytics-routing.module';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { Transaction1Component } from './transaction1/transaction1.component';
import { Transaction2Component } from './transaction2/transaction2.component';

import { FormsModule, NgModel,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomerDataComponent, Transaction1Component,Transaction2Component],
  imports: [
    CommonModule,
    DataAnalyticsRoutingModule,FormsModule,
  ]
})
export class DataAnalyticsModule { }

