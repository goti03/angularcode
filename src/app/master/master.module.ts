import { NgModule } from '@angular/core';
import { MasterComponent} from './master.component';
import { MasterRoutingModule } from './master.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterAddComponent } from './master-add/master-add.component';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { MasterListComponent } from './master-list/master-list.component';
import { MasterUpdateComponent } from './master-update/master-update.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatDatepickerModule,MatFormFieldModule,  MatNativeDateModule} from '@angular/material';
@NgModule({
  declarations: [MasterComponent,
    MasterAddComponent,MasterDetailsComponent,MasterListComponent,MasterUpdateComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,NgxPaginationModule,Ng2SearchPipeModule,
    MatDatepickerModule,MatFormFieldModule,  MatNativeDateModule
  ]
})
export class MasterModule { }
