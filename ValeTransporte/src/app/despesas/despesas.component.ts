import { Component, OnInit } from '@angular/core';
import { DespesasService } from './despesas.service';
import { Despesa } from '../models/Despesa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataRelatorio } from '../models/DataRelatorio';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {
  
  public titulo = 'Despesas';
  public despesas: Despesa[];
  public relatorioMes: Despesa;
  public relatorioForm: FormGroup;
  private modo = 'post';
  
  constructor(private formb: FormBuilder, private despesaService: DespesasService,) {
    this.formRelatorio();
  }
  
  ngOnInit() {
    this.carregarRelatorios();
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
    this.despesaService.getByData(data.ano, data.mes).subscribe((desp: Despesa) => {
      console.log(desp);
      (desp === null) ? this.criarRelatorio(data) : this.relatorioMes = desp;
      // this.relatorioMensal(data, this.modo);
    },
    (erro: any) => {
      console.error(erro);
    });
  }
  
  criarRelatorio(data: DataRelatorio){
    this.despesaService[this.modo](data.ano, data.mes).subscribe((desp: Despesa) => {
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
