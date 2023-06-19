import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { CancellationInvoiceComponent } from './cancellation-invoice/cancellation-invoice.component';
import { DisbursementComponent } from './disbursement/disbursement.component';
import { AutoDisbursementListComponent } from './auto-disbursement-list/auto-disbursement-list.component';
import { ChargesWaiverFeeComponent } from './charges-waiver-fee/charges-waiver-fee.component';
import { AddonChargesWaiverComponent } from './addon-charges-waiver/addon-charges-waiver.component';
import { CreationInvoiceComponent } from './creation-invoice/creation-invoice.component';
import { DeleteInvoiceComponent } from './delete-invoice/delete-invoice.component';
import { DisbursementInvoiceComponent } from './disbursement-invoice/disbursement-invoice.component';



let routes: Routes = [
  {
    path: '', component: InvoiceComponent,
    children: [
      {
        path: 'add', component: InvoiceAddComponent,
        data: {
          title: 'Invoice',
          urls: [
            { title: 'Invoice', url: '' },
            { title: 'Upload Invoice' }
          ]
        }
      },
      {
        path: 'manage', component: CancellationInvoiceComponent,
        data: {
          title: 'Invoice',
          urls: [
            { title: 'Invoice', url: '' },
            { title: 'List' }
          ]
        }
      },
      {
        path: 'delete', component: DeleteInvoiceComponent,
        data: {
          title: 'Invoice',
          urls: [
            { title: 'Invoice', url: '' },
            { title: 'Deleted Invoices' }
          ]
        }
      },


      { path: 'disburse', component: DisbursementComponent },
      { path: 'autoDisburse', component: AutoDisbursementListComponent },
      { path: 'chargesWaiver', component: ChargesWaiverFeeComponent },
      { path: 'addonchargesWaiver', component: AddonChargesWaiverComponent },
      { path: 'creation', component: CreationInvoiceComponent },
      { path: 'disburseinvoices/:userId/:loanRequestId/:retailerId/:mobileNo/:orgId/:token', component: DisbursementInvoiceComponent },
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      {
        path: 'add',
        component: InvoiceAddComponent,
        data: {
          title: 'invoice',
          urls: [
            { title: 'invoice', url: '/invoice' },
            { title: 'invoice' }
          ]
        }
      }
      // { path: 'add', component: UploadAddComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class invoiceRoutingModule { }
