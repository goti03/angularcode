import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashDiscountComponent } from './cash-discount/cash-discount.component';
import { OverDueComponent } from './over-due/over-due.component';
import { DueinThreeDayComponent } from './duein-three-day/duein-three-day.component';
import { CashdiscountSavingComponent } from './cashdiscount-saving/cashdiscount-saving.component';

import { DisbursementApprovalComponent } from './disbursement-approval/disbursement-approval.component'; 
import { OneStepDisbursementNotificationComponent } from './one-step-disbursement-notification/one-step-disbursement-notification.component';

import { AutoDisbursementComponent } from './auto-disbursement/auto-disbursement.component';
import { DisbursementGenericComponent } from './disbursement-generic/disbursement-generic.component';
import {GstinstructionsComponent} from './gstinstructions/gstinstructions.component';


let routes:Routes=[
    { path: 'cashDiscount/:orgId', component:CashDiscountComponent },
    { path: 'overdue/:orgId', component:OverDueComponent},
    { path: 'duein3/:orgId', component:DueinThreeDayComponent},
    { path: 'cdnoSaving/:orgId', component:CashdiscountSavingComponent },
    { path: 'disburseApproval/:token', component:DisbursementApprovalComponent },
    { path: 'autoDisbursement/:token', component:AutoDisbursementComponent },
    { path: 'onestepdisbursementnotification/:token', component:OneStepDisbursementNotificationComponent },
    { path: 'onestepdisbursementnotification/:token', component:OneStepDisbursementNotificationComponent },
    { path: 'disbursement/:token/:flag', component:DisbursementGenericComponent },
    { path: 'gstinstructions',component:GstinstructionsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class NotificationRoutingModule { }