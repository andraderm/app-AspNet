import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../models/Funcionario';
import { FuncionarioService } from './funcionario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-Funcionarios',
  templateUrl: './Funcionarios.component.html',
  styleUrls: ['./Funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  public titulo = 'Funcionários';
  public funcionarioSelecionado: Funcionario;
  public funcionarioForm: FormGroup;

  public funcionarios: Funcionario[];

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit() {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
        this.funcionarios = funcionarios;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  novoFuncionario(){
    this.funcionarioSelecionado = new Funcionario()
    this.funcionarioForm.patchValue(this.funcionarioSelecionado);
  }

}
