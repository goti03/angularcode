import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule} from '@angular/material/tabs';
import { NewmenuRoutingModule } from './newmenu-routing.module';
import { NewmenuComponent } from './newmenu.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewmenuComponent],
  imports: [
    CommonModule,
    NewmenuRoutingModule,MatTabsModule, NgxPaginationModule,
    Ng2SearchPipeModule,FormsModule
  ]
})
export class NewmenuModule { }
