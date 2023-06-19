import { NgModule } from '@angular/core';
import { UploadComponent} from './upload.component';
import { UploadRoutingModule } from './upload.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadAddComponent } from './upload-add/upload-add.component';

@NgModule({
  declarations: [UploadComponent,UploadAddComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UploadModule { }
