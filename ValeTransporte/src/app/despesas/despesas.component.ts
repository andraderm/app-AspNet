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
  
  public titulo = 'Relatórios';

  public despesas: Despesa[] = [];
  public relatorioMes: Despesa;
  public relatorioForm: FormGroup;
  public datas: string[] = [];
  public despesasFuncionarios: DespesaFuncionario[] = [];
  public custoIndividual: number;

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
    this.carregarDespesas();
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

  carregarDespesas() {
    this.despesaService.getAll().subscribe((despesas: Despesa[]) => {
      this.despesas = despesas;
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

  carregarDespesasFuncionarios(relatorio: Despesa) {
    this.despesaService.getDespesaFuncionario().subscribe((df: DespesaFuncionario[]) => {
      this.despesasFuncionarios = df.filter(x => x.despesaId == relatorio.id);
      this.despesasFuncionarios.forEach(df => {
        df.funcionario = this.funcionarios.find(x => x.id == df.funcionarioId);
        df.despesa = this.despesas.find(x => x.id == df.despesaId);
      });
    },
    (erro: any) => {
      console.error(erro);
    });
  }
  
  formRelatorio() {
    this.relatorioForm = this.formb.group({
      dataInicial: [Validators.required],
      dataFinal: [Validators.required],
    });
  }
  
  gerar() {
    this.datas[0] = this.relatorioForm.value.dataInicial;
    this.datas[1] = this.relatorioForm.value.dataFinal;
    this.criarRelatorio();
  }
  
  criarRelatorio(){
    this.despesaService.post(this.datas[0], this.datas[1]).subscribe((desp: Despesa) => {
      this.despesaService.getByData(this.datas[0], this.datas[1]).subscribe((despesa: Despesa) => {
        this.relatorioMes = despesa;
        this.carregarDespesasFuncionarios(this.relatorioMes);
      });
    },
    (erro: any) => {
      console.error(erro);
    })
  }

}

