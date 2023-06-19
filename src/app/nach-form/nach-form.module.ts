import { NgModule } from '@angular/core';
import { NachFormComponent } from './nach-form.component';
import { NachRoutingModule } from './nach-form.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({

  declarations: [NachFormComponent],
  imports: [
    CommonModule,
    NachRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,NgxPaginationModule,Ng2SearchPipeModule
  ]
})
export class NachModule { }
