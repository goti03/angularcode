import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CredentialsComponent} from './credentials/credentials.component'
import {Gstr1Component } from './gstr1/gstr1.component';
import {Gst3bComponent } from './gst3b/gst3b.component';
import {CreateLoanComponent} from './create-loan/create-loan.component';
import { EscrowReportComponent } from './escrow-report/escrow-report.component';
import { WaterfallReportComponent } from './waterfall-report/waterfall-report.component';
import {Update2AComponent } from './Update-2A/Update-2A.component';



let routes:Routes=[

    { path: 'credential', component : CredentialsComponent, 
    data: {
        title: 'GST',
        urls: [
          { title: 'GST', url: '' },
          { title: 'Credential' }
        ]
      }
    },
    { path: 'gstr1/:loanid/:orgId', component : Gstr1Component,
    data: {
      title: 'GST',
      urls: [
        { title: 'GST', url: '' },
        { title: 'GST R1' }
      ]
    }
    },
    { path: 'gst3b/:loanid/:orgId', component : Gst3bComponent,
    data: {
      title: 'GST',
      urls: [
        { title: 'GST', url: '' },
        { title: 'GST 3B' }
      ]
    }
    },
    { path: 'createloan', component : CreateLoanComponent},
    { path: 'escrowreport', component : EscrowReportComponent},
    { path: 'waterfallreport', component : WaterfallReportComponent},
    { path:'update2AData/:loanid/:orgId', component:Update2AComponent,
    data: {
      title: 'GST',
      urls: [
        { title: 'GST', url: '' },
        { title: 'GST 2A' }
      ]
    }
    }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class GstRoutingModule { }
