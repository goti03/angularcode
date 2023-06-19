import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UgroComponent } from './ugro.component';
import { UgroRoutingModule} from './ugro.routing.module';
import {UgroDisbursalComponent} from './ugro-disbursal/ugro-disbursal.component';
import {UgroNachComponent} from './ugro-nach/ugro-nach.component';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatButtonModule,
  MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,MatTooltipModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MAT_DATE_LOCALE, MatTabsModule
} from '@angular/material';

@NgModule({
  declarations: [UgroComponent,UgroDisbursalComponent,UgroNachComponent],
  imports: [
    CommonModule,UgroRoutingModule, FormsModule,Ng2SearchPipeModule,NgxPaginationModule,
    MatAutocompleteModule, MatInputModule,MatTabsModule, MatDialogModule, MatCheckboxModule,
     MatTableModule, MatCardModule,MatTooltipModule,MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,ReactiveFormsModule
  ]
})
export class UgroModule { }
