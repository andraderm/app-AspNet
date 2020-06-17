import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { DespesasComponent } from './despesas/despesas.component';
import { SetorComponent } from './setor/setor.component';


const routes: Routes = [
  { path: '', redirectTo: 'funcionarios', pathMatch: 'full'},
  { path: 'funcionarios', component: FuncionariosComponent},
  { path: 'relatorios', component: DespesasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
