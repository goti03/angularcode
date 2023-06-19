import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NonidentifiedPaymentComponent} from './nonidentified-payment/nonidentified-payment.component'
import { OveragereportComponent } from './overagereport/overagereport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute,RouterModule } from '@angular/router';
import { paymentRoutes } from './payment.routing';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatButtonModule,
  MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,MatTooltipModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MAT_DATE_LOCALE,MatTabsModule
} from '@angular/material';
import { UgroRepayComponent } from './ugro-repay/ugro-repay.component';
import { UgroTranchComponent } from './ugro-tranch/ugro-tranch.component';
import { MoneyRotationComponent } from './money-rotation/money-rotation.component';
import { ViewMoneyRotationComponent } from './view-money-rotation/view-money-rotation.component';
import { SharedModule } from '../shared/shared.module';
import { SellerDisburesmentComponent } from './seller-disbuserment/seller-disbuserment.component';
import { ESignComponent } from './e-sign/e-sign.component';
import { PgTransactionDataComponent } from './pg-transaction-data/pg-transaction-data.component';
import { CustomerRepayComponent } from './customer-repay/customer-repay.component';

@NgModule({
  declarations: [NonidentifiedPaymentComponent,UgroRepayComponent,UgroTranchComponent,
    OveragereportComponent,MoneyRotationComponent, ViewMoneyRotationComponent,SellerDisburesmentComponent,ESignComponent, PgTransactionDataComponent,CustomerRepayComponent],
  imports: [CommonModule,
    MatAutocompleteModule, MatInputModule,
    MatTabsModule, MatDialogModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,Ng2SearchPipeModule,
    paymentRoutes
  ]
})
export class PaymentModule { }
