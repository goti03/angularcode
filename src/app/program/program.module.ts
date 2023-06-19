import { NgModule } from '@angular/core';
import { ProgramComponent} from './program.component';
import { ProgramRoutingModule } from './program.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgramAddComponent } from './program-add/program-add.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramUpdateComponent } from './program-update/program-update.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import  {MatDatepickerModule,MatFormFieldModule,  MatNativeDateModule} from '@angular/material';
import { BannerComponent }  from './banner/banner.component';
import { ProgramCopyComponent } from './program-copy/program-copy.component';

@NgModule({

  declarations: [ProgramComponent,ProgramAddComponent,ProgramDetailsComponent,ProgramListComponent,ProgramUpdateComponent,BannerComponent,ProgramCopyComponent],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,NgxPaginationModule,Ng2SearchPipeModule,
    MatDatepickerModule,MatFormFieldModule,  MatNativeDateModule
  ]
})
export class ProgramModule { }
