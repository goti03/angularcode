import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReconComponent } from './recon.component';
import { ReconRoutingModule } from './recon.routing.module';

import { BankStatementComponent } from './bank-statement/bank-statement.component';

import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
    declarations: [
        ReconComponent,
        BankStatementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        ReconRoutingModule
    ]
})
export class ReconModule { }
