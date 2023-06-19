import { NgModule } from '@angular/core';
import { RulesComponent} from './rules.component';
import { RulesRoutingModule } from './rules.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RulesAddComponent } from './rules-add/rules-add.component';
import { RuleListComponent } from './rules-list/rules-list.component';
import { RulesDetailsComponent } from './rules-details/rules-details.component';
import { RulesUpdateComponent } from './rules-update/rules-update.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [RulesComponent,RulesAddComponent,RuleListComponent,RulesDetailsComponent,RulesUpdateComponent],
  imports: [
    CommonModule,
    RulesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,Ng2SearchPipeModule
  ]
})
export class RulesModule { }
