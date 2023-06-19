import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CredentialsComponent,requestOtpPopup} from './credentials/credentials.component';
import {Gstr1Component } from './gstr1/gstr1.component';
import {Gst3bComponent } from './gst3b/gst3b.component';
import { MatTabsModule} from '@angular/material/tabs';
import {GstRoutingModule} from './gst.routing.module';
import {GstComponent} from './gst.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MAT_DATE_LOCALE
  } from '@angular/material';
import {CreateLoanComponent} from './create-loan/create-loan.component'
import { EscrowReportComponent } from './escrow-report/escrow-report.component';
import { WaterfallReportComponent } from './waterfall-report/waterfall-report.component';
import {Update2AComponent } from './Update-2A/Update-2A.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        CredentialsComponent,
        Gstr1Component,
        Gst3bComponent,
        GstComponent,requestOtpPopup,
        CreateLoanComponent,
        EscrowReportComponent,
        WaterfallReportComponent,
        Update2AComponent
    ],
    imports : [
        GstRoutingModule, CommonModule, 
        FormsModule, MatTabsModule,
        NgxPaginationModule,Ng2SearchPipeModule,
        NgbModule,MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,
        MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, DragDropModule, SharedModule
    ],
    entryComponents : [requestOtpPopup],
    providers : []
})

export class GstModule{
    
} 