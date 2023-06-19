/**
 *
 *  @author Mary Vidhya
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UdhyamportalComponent } from './udhyamportal/udhyamportal.component';
import { UdhyamRoutingModule } from './udhyam.routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UdhyamportalComponent],
  imports: [
    CommonModule,UdhyamRoutingModule,FormsModule
  ]
})
export class UdhyamModule { }
