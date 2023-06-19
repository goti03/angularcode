import { NgModule } from '@angular/core';
import { LenderComponent} from './lender.component';
import { LenderRoutingModule } from './lender.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LenderAddComponent } from './lender-add/lender-add.component';
import { LenderDetailsComponent } from './lender-details/lender-details.component';
import { LenderListComponent } from './lender-list/lender-list.component';
import { LenderUpdateComponent } from './lender-update/lender-update.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [LenderComponent,LenderAddComponent,LenderDetailsComponent,LenderListComponent,LenderUpdateComponent],
  imports: [
    CommonModule,
    LenderRoutingModule,
    FormsModule,
    ReactiveFormsModule,NgxPaginationModule,Ng2SearchPipeModule	
  ]
})
export class LenderModule { }
