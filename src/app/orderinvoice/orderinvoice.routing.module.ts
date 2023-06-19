import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisbursementComponent } from './disbursement/disbursement.component';
import { OrderinvoiceotpComponent } from './orderinvoiceotp/orderinvoiceotp.component';
import { OrderinvoicesuccessComponent } from './orderinvoicesuccess/orderinvoicesuccess.component'; 
export const orderinvoiceRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'disburseinvoice/:userId/:loanRequestId/:retailerId/:mobileNo/:orgId/:companyname/:availablelimit/:token',
          component: DisbursementComponent
        },
        {
          path:'otp',
          component:OrderinvoiceotpComponent
        },
        {
            path:'success',
            component:OrderinvoicesuccessComponent

        }
       
      ]
  
  },
  
  ]