import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinaggUserRoutingModule } from './finagg-user.routing.module';
import { FinaggUserComponent } from './finagg-user.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserAddComponent } from './user-add/user-add.component';

@NgModule({
  declarations: [FinaggUserComponent,UserAddComponent],
  imports: [
    CommonModule,FinaggUserRoutingModule,NgbModule,
    FormsModule, ReactiveFormsModule,Ng2SearchPipeModule,
    NgxPaginationModule
  ]
})
export class FinaggUserModule { }
