import { Component, OnInit } from '@angular/core';
import { DespesasService } from './despesas.service';
import { Despesa } from '../models/Despesa';
import { FuncionarioService } from '../funcionarios/funcionario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Funcionario } from '../models/Funcionario';
import { FuncionariosComponent } from '../funcionarios/funcionarios.component';
import { Setor } from '../models/setor';
import { SetorService } from '../setor/setor.service';
import { DespesaFuncionario } from '../models/DespesaFuncionario';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {
  
  public titulo = 'Relatório';

  public despesas: Despesa[];
  public relatorioMes: Despesa;
  public relatorioForm: FormGroup;
  public datas: Date[] = [];
  public despesasFuncionarios: DespesaFuncionario[];
  public custoIndividual: number[];
  

  public funcionarios: Funcionario[];
  public setores: Setor[];
  private funcComp: FuncionariosComponent;
  
  constructor(private formb: FormBuilder, private despesaService: DespesasService,
    private funcionarioService: FuncionarioService, private setorService: SetorService,
    private localeService: BsLocaleService) {
      defineLocale('pt-br', ptBrLocale);
    
    this.localeService.use('pt-br'); 
    this.formRelatorio();
  }
  
  ngOnInit() {
    this.carregarFuncionarios();
    this.carregarDespesasFuncionarios();
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

  carregarDespesasFuncionarios() {
    this.despesaService.getDespesaFuncionario().subscribe((df: DespesaFuncionario[]) => {
      this.despesasFuncionarios = df;
    },
    (erro: any) => {
      console.error(erro);
    });
  }
  
  formRelatorio() {
    this.relatorioForm = this.formb.group({
      datas: [Validators.required],
    });
  }
  
  gerar() {
    this.datas = this.relatorioForm.value.datas;
    this.criarRelatorio();
  }
  
  criarRelatorio(){
    this.despesaService.post(this.datas[0].toISOString().substring(0, 10), this.datas[1].toISOString().substring(0, 10)).subscribe((desp: Despesa) => {
      this.carregarDespesasFuncionarios();
      this.despesaService.getByData(this.datas[0].toISOString().substring(0, 10), this.datas[1].toISOString().substring(0, 10)).subscribe((despesa: Despesa) => {
        this.relatorioMes = despesa;
      });
    },
    (erro: any) => {
      console.error(erro);
    })
  }

  custoFuncionario(funcionario: Funcionario, relatorio: Despesa){
    return funcionario.custoDiarioVT * this.despesasFuncionarios.find(x => x.funcionarioId == funcionario.id && x.despesaId == relatorio.id).diasTrabalhados;
  }
  
}
