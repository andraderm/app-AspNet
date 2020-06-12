import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { DespesasComponent } from './despesas/despesas.component';


const routes: Routes = [
  { path: '', redirectTo: 'funcionarios', pathMatch: 'full'},
  { path: 'funcionarios', component: FuncionariosComponent},
  { path: 'despesas', component: DespesasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
