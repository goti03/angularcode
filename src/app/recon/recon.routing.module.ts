import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ReconComponent } from './recon.component';
import { BankStatementComponent } from './bank-statement/bank-statement.component';




let routes: Routes = [
    { path: 'statement', component: BankStatementComponent,
  data: {
    title: 'Dashboard',
    urls: [
      { title: 'Dashboard', url: '' },
      { title: 'Escrow Summary' }
    ]
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconRoutingModule { }
