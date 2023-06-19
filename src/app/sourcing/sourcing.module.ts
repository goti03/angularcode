import { NgModule } from '@angular/core';
import { SourcingComponent} from './sourcing.component';
import { SourcingRoutingModule } from './sourcing.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SourcingAddComponent } from './sourcing-add/sourcing-add.component';
import { SourcingDetailsComponent } from './sourcing-details/sourcing-details.component';
import { SourcingListComponent } from './sourcing-list/sourcing-list.component';
import { SourcingUpdateComponent } from './sourcing-update/sourcing-update.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UploadExcelComponent } from './sourcing-updateExcel/sourcing-updateExcel.component';
import { UploadEamilComponent } from './email-trigger/email-trigger.component';
import { EmailListComponent } from './email-list/email-list.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DistanceAnalysisComponent } from './distance-analysis/distance-analysis.component';
import { PartnerLinkComponent } from './partner-link/partner-link.component';

@NgModule({
  declarations: [SourcingComponent,SourcingAddComponent,SourcingDetailsComponent,
    SourcingListComponent,SourcingUpdateComponent,UploadExcelComponent,
    UploadEamilComponent,EmailListComponent,DistanceAnalysisComponent,PartnerLinkComponent],
  imports: [
    CommonModule,
    SourcingRoutingModule,
    FormsModule,
    ReactiveFormsModule,NgxPaginationModule,
    Ng2SearchPipeModule,NgbModule
  ]
})
export class SourcingModule { }
