import { Component, OnInit } from '@angular/core';
import { DespesasService } from './despesas.service';
import { Despesa } from '../models/Despesa';
import { FuncionarioService } from '../funcionarios/funcionario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataRelatorio } from '../models/DataRelatorio';
import { Funcionario } from '../models/Funcionario';
import { FuncionariosComponent } from '../funcionarios/funcionarios.component';
import { Setor } from '../models/setor';
import { SetorService } from '../setor/setor.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {
  
  public titulo = 'Relatórios';
  public despesas: Despesa[];
  public relatorioMes: Despesa;
  public relatorioForm: FormGroup;
  public funcionarios: Funcionario[];
  public setores: Setor[];
  private modo = 'post';
  private funcComp: FuncionariosComponent;
  
  constructor(private formb: FormBuilder, private despesaService: DespesasService,
    private funcionarioService: FuncionarioService, private setorService: SetorService) {
    this.formRelatorio();
  }
  
  ngOnInit() {
    this.carregarRelatorios();
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
      this.carregarSetores(funcionarios);
    },
    (erro: any) => {
      console.error(erro);
    });
  }

  carregarSetores(funcionarios: Funcionario[]){
    this.setorService.getAll().subscribe((setores: Setor[]) => {
      this.setores = setores;
    },
    (erro: any) => {
      console.error(erro);
    });    
    funcionarios.forEach(func => {
      this.setorService.getById(func.setorId).subscribe((setor: Setor) => {
        func.setor = setor.nome;
      },
      (erro: any) => {
        console.error(erro);
      });
    });
  }
  
  carregarRelatorios() {
    this.despesaService.getAll().subscribe((despesas: Despesa[]) => {
      this.despesas = despesas;
    },
    (erro: any) => {
      console.error(erro);
    });
  }
  
  formRelatorio() {
    this.relatorioForm = this.formb.group({
      ano: ['', Validators.required],
      mes: ['', Validators.required],
    });
  }
  
  gerar() {
    this.verificacao(this.relatorioForm.value);
  }
  
  verificacao(data: DataRelatorio) {
    this.criarRelatorio(data);
  }
  
  criarRelatorio(data: DataRelatorio){
    this.despesaService.post(data.ano, data.mes).subscribe((desp: Despesa) => {
      this.carregarRelatorios();
      this.despesaService.getByData(data.ano, data.mes).subscribe((despesa: Despesa) => {
        this.relatorioMes = despesa;
      });
    },
    (erro: any) => {
      console.error(erro);
    })
  }
  
}
