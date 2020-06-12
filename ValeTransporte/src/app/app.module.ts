import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { NavComponent } from './nav/nav.component';
import { DespesasComponent } from './despesas/despesas.component';
import { TituloComponent } from './titulo/titulo.component';

@NgModule({
   declarations: [
      AppComponent,
      FuncionariosComponent,
      NavComponent,
      DespesasComponent,
      TituloComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      ModalModule.forRoot()
   ],
   providers: [{provide: LOCALE_ID, useValue: 'pt'}],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
