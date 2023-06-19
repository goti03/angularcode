import { NgModule } from '@angular/core';
import { InvoiceComponent} from './invoice.component';
import { invoiceRoutingModule } from './invoice.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { DisbursementComponent } from './disbursement/disbursement.component';
import { DeleteInvoiceComponent } from './delete-invoice/delete-invoice.component';
import { CancellationInvoiceComponent } from './cancellation-invoice/cancellation-invoice.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatButtonModule,
  MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,MatTooltipModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MAT_DATE_LOCALE
} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { AutoDisbursementListComponent } from './auto-disbursement-list/auto-disbursement-list.component';
import {ChargesWaiverFeeComponent} from './charges-waiver-fee/charges-waiver-fee.component';
import { MatTabsModule} from '@angular/material/tabs';
import { AddonChargesWaiverComponent } from './addon-charges-waiver/addon-charges-waiver.component';
import { CreationInvoiceComponent } from './creation-invoice/creation-invoice.component';
import { DisbursementInvoiceComponent } from './disbursement-invoice/disbursement-invoice.component';

@NgModule({
  declarations: [InvoiceComponent,InvoiceAddComponent,CancellationInvoiceComponent,DisbursementComponent,AutoDisbursementListComponent,ChargesWaiverFeeComponent, DeleteInvoiceComponent ,AddonChargesWaiverComponent,CreationInvoiceComponent,DisbursementInvoiceComponent],
  imports: [
    CommonModule,
    invoiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatExpansionModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,MatTooltipModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
  ]
})
export class InvoiceModule { }
