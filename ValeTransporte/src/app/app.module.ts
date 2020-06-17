import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { NavComponent } from './nav/nav.component';
import { DespesasComponent } from './despesas/despesas.component';
import { TituloComponent } from './titulo/titulo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { LOCALE_ID } from '@angular/core';
import { EscalaComponent } from './escala/escala.component';
import { SetorComponent } from './setor/setor.component';
registerLocaleData(localePt);



@NgModule({
   declarations: [
      AppComponent,
      FuncionariosComponent,
      NavComponent,
      DespesasComponent,
      TituloComponent,
      EscalaComponent,
      SetorComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      ModalModule.forRoot(),
      BrowserAnimationsModule,
      FontAwesomeModule,
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      MatDatepickerModule,
   ],
   providers: [
      { provide: LOCALE_ID, useValue: "pt" },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
