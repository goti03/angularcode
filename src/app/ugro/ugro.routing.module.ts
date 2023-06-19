import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UgroComponent } from './ugro.component';
import { UgroDisbursalComponent } from './ugro-disbursal/ugro-disbursal.component';
import { UgroNachComponent } from './ugro-nach/ugro-nach.component';

let routes: Routes = [
  { path: '', component: UgroComponent },
  { path: 'disbursalList', component: UgroDisbursalComponent,
  data: {
    title: 'Disbursement',
    urls: [
      { title: 'Disbursement', url: '' },
      { title: 'Disbursal List' }
    ]
  }
  },
  { path: 'nachList', component: UgroNachComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UgroRoutingModule { }
