import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisbursementComponent } from './disbursement/disbursement.component';
import { orderinvoiceRoutes } from './orderinvoice.routing.module';
import { RouterModule } from '@angular/router';
import { OrderinvoiceotpComponent } from './orderinvoiceotp/orderinvoiceotp.component';
import { OrderinvoicesuccessComponent } from './orderinvoicesuccess/orderinvoicesuccess.component'; 




@NgModule({
  declarations: [DisbursementComponent,OrderinvoiceotpComponent,OrderinvoicesuccessComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(orderinvoiceRoutes)
  ]
})
export class OrderinvoiceModule { }
