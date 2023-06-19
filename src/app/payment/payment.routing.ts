import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NonidentifiedPaymentComponent } from './nonidentified-payment/nonidentified-payment.component'
import { UgroTranchComponent } from './ugro-tranch/ugro-tranch.component';
import { UgroRepayComponent } from './ugro-repay/ugro-repay.component';
import{OveragereportComponent} from './overagereport/overagereport.component'
import { MoneyRotationComponent } from './money-rotation/money-rotation.component';
import { ViewMoneyRotationComponent } from './view-money-rotation/view-money-rotation.component';
import { SellerDisburesmentComponent } from './seller-disbuserment/seller-disbuserment.component';
import { ESignComponent } from './e-sign/e-sign.component';
import { PgTransactionDataComponent } from './pg-transaction-data/pg-transaction-data.component';
import { CustomerRepayComponent } from './customer-repay/customer-repay.component';

let routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'unidentified',
      //   component: NonidentifiedPaymentComponent
      // },
      {
        path: 'unidentified', component: NonidentifiedPaymentComponent,
        data: {
          title: 'Unidentified Payments',
          urls: [
            { title: 'payment', url: '/payment' },
            { title: 'unidentified' }
          ]
        }
      },
      {
        path: 'repay', component: UgroRepayComponent,
        data: {
          title: 'Ugro Payments',
          urls: [
            { title: 'payment', url: '/payment' },
            { title: 'ugrorepay' }
          ]
        }
      },
      {
        path: 'tranch/:lpid', component: UgroTranchComponent,
        data: {
          title: 'Ugro Tranch',
          urls: [
            { title: 'payment', url: '/payment' },
            { title: 'ugrotranch' }
          ]
        }
      },
      {
        path:'agereport' , component:OveragereportComponent,
        data:{
          title:'Ageing Report',
         
        }
      },{
        path: 'addRotation', component: MoneyRotationComponent ,
        data: {
          title: 'Add Credit Rotation',
          urls: [
            { title: 'payment', url: '/payment' },
            { title: 'Credit Rotation' }
          ]
        }
      },{
        path: 'credit', component: ViewMoneyRotationComponent ,
        data: {
          title: 'Credit Rotation',
          urls: [
            { title: 'payment', url: '/payment' },
            { title: 'Credit Rotation' }
          ]
        }
      },{
        path: 'sellerDisbursement', component: SellerDisburesmentComponent ,
        data: {
          title: 'seller Disbursement',
          urls: [
            { title: 'payment', url: '/payment' },
            { title: 'seller Disbursement' }
          ]
        }
      },
   {
    path: 'esign/:orgId/:loanId/:id/:retId', component: ESignComponent,
    data: {
      title: 'ESign',
      urls: [
        { title: 'ESign', url: '/esign' },
        { title: 'ESign'}
      ]
    }
  },  {
    path: 'PgTransactionData', component: PgTransactionDataComponent,
    data: {
      title: 'PgTransactionData',
      urls: [
        { title: 'PgTransactionData', url: '/PgTransactionData' },
        { title: 'PgTransactionData' }
      ]
    }
  },{
    path: 'customerrepay', component: CustomerRepayComponent,
    data: {
      title: 'Customer Repayments',
      urls: [
        { title: 'Repayments', url: '/Repayments' },
        { title: 'customerrepay' }
      ]
    }
  }
    ]
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class paymentRoutes { }