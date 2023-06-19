import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule} from '@angular/material/tabs';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {MatDatepickerModule,MatFormFieldModule,  MatNativeDateModule,MatProgressSpinnerModule,MatExpansionModule} from '@angular/material';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
//Now
import {DatePipe} from '@angular/common';
import {ApiService} from "./core/api.service";
import {TokenInterceptor} from "./core/interceptor";
import { Globals } from './globals/globals.component';
import { LoadingInterceptor } from './shared/loader/loading.interceptor';
import { LoadingService } from './shared/loader/loading.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoadingComponent } from './shared/loader/loading/loading.component';
import { ExcelService } from './shared/excel.service';
import { Currency } from './shared/currency.service';
import { Crypto } from './shared/crypto.service';
import { breadcrumbMessage} from './shared/breadcrumb-message.service'
import { PdfService } from './shared/pdf.service';
// import { AgGridModule } from 'ag-grid-angular';




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    LoadingComponent
    // SpecialCharacterDirective
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
    NgbModule,
    NgxQRCodeModule,
    NgMultiSelectDropDownModule.forRoot(),
    PerfectScrollbarModule,
    AppRoutingModule,
    MatDatepickerModule,MatFormFieldModule, MatNativeDateModule,
    MatProgressSpinnerModule,OverlayModule,MatExpansionModule
    // AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    DatePipe,HttpClient,
    ApiService,
    Globals,
    {provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true},
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
      },
      LoadingService,
      ExcelService,
      Currency,
      Crypto,
      PdfService,
      breadcrumbMessage,
      // NotifierService,
      // NotifierQueueService
  ],
  entryComponents: [ LoadingComponent ],
  bootstrap: [AppComponent]
})
export class AppModule {}
