import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collection.routing.module';
import { CollectionService } from './collection.service';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule,CollectionRoutingModule,NgbModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class CollectionModule { }
