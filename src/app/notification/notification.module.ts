import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {  NotificationRoutingModule } from './notification-routing.module';
import { CashDiscountComponent } from './cash-discount/cash-discount.component';
import { OverDueComponent } from './over-due/over-due.component';
import { DueinThreeDayComponent } from './duein-three-day/duein-three-day.component';
import { CashdiscountSavingComponent } from './cashdiscount-saving/cashdiscount-saving.component';
import { DisbursementApprovalComponent } from './disbursement-approval/disbursement-approval.component'; 
import { AutoDisbursementComponent } from './auto-disbursement/auto-disbursement.component';
import { DisbursementGenericComponent } from './disbursement-generic/disbursement-generic.component';
import { OneStepDisbursementNotificationComponent } from './one-step-disbursement-notification/one-step-disbursement-notification.component';
import {GstinstructionsComponent} from './gstinstructions/gstinstructions.component';
@NgModule({

    declarations:
     [
       CashDiscountComponent,
       OverDueComponent,
       GstinstructionsComponent,
       DueinThreeDayComponent,
       CashdiscountSavingComponent,
       DisbursementApprovalComponent,
       AutoDisbursementComponent,
       DisbursementGenericComponent,
       OneStepDisbursementNotificationComponent],
    imports: [
      CommonModule,
      FormsModule,
      NotificationRoutingModule,
      MatExpansionModule,
    ]
  })
  export class NotificationModule { }