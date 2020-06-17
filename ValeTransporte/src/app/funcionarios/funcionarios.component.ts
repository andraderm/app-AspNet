import { Component, OnInit, TemplateRef } from '@angular/core';
import { Funcionario } from '../models/Funcionario';
import { FuncionarioService } from './funcionario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Setor } from '../models/setor';
import { SetorService } from '../setor/setor.service';
import { Escala } from '../models/Escala';
import { EscalaService } from '../escala/escala.service';

@Component({
  selector: 'app-Funcionarios',
  templateUrl: './Funcionarios.component.html',
  styleUrls: ['./Funcionarios.component.css'],
})

export class FuncionariosComponent implements OnInit {
  
  public titulo = 'Funcionários';
  public funcionarioSelecionado: Funcionario;
  public funcionarioForm: FormGroup;
  public modalRef: BsModalRef;
  private modo: string;
  
  public funcionarios: Funcionario[];
  public setores: Setor[];
  public escalas: Escala[];
    
  constructor(private fb: FormBuilder, 
    private funcionarioService: FuncionarioService, 
    private setorService: SetorService, 
    private escalaService: EscalaService, 
    private modalService: BsModalService){
    this.formFuncionario();
  }
  
  ngOnInit() {
    this.carregarFuncionarios();
  }
  
  formFuncionario() {
    this.funcionarioForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      dataAdmissao: ['', Validators.required],
      setorId: ['', Validators.required],
      escalaId: ['', Validators.required],
      custoDiarioVT: ['', Validators.required],
    });
  }
  
  carregarFuncionarios() {
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
      this.carregarSetores(funcionarios);
      this.carregarEscala(funcionarios);
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
  
  carregarEscala(funcionarios: Funcionario[]){
    this.escalaService.getAll().subscribe((escalas: Escala[]) => {
      this.escalas = escalas;
    },
    (erro: any) => {
      console.error(erro);
    });  
    funcionarios.forEach(func => {
      this.escalaService.getById(func.escalaId).subscribe((escala: Escala) => {
        func.escala = escala.escalaTrabalho;
      },
      (erro: any) => {
        console.error(erro);
      });
    });
  }
  
  novoFuncionario(template: TemplateRef<any>){
    this.funcionarioSelecionado = new Funcionario()
    this.funcionarioForm.patchValue(this.funcionarioSelecionado);
    this.abrirModal(template);
  }
  
  selecionarFuncionario(funcionario: Funcionario, template: TemplateRef<any>){
    this.funcionarioSelecionado = funcionario;
    this.funcionarioForm.patchValue(this.funcionarioSelecionado);
    this.abrirModal(template);
  }
    
  excluirFuncionario(id: number){
    this.funcionarioService.delete(id).subscribe((model: any) => {
      console.log(model);
      this.modalRef.hide();
      this.carregarFuncionarios();
    },
    (erro: any) => {
      console.error(erro);
    });
  }
  
  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  confirmacao(template: TemplateRef<any>, funcionario: Funcionario) {
    this.funcionarioSelecionado = funcionario;
    this.modalRef = this.modalService.show(template);
  }
  
  salvar(funcionario: Funcionario) {
    (funcionario.id === 0) ? this.modo = 'post' : this.modo = 'put';
    console.log(funcionario);
    this.funcionarioService[this.modo](funcionario).subscribe((func: Funcionario) => {
      console.log(func);
      this.carregarFuncionarios();
    },
    (erro: any) => {
      console.log(erro);
    });
  }
    
  voltar() {
    this.funcionarioSelecionado = null;
  }
    
  enviar() {
    this.modalRef.hide();
    this.salvar(this.funcionarioForm.value);
  }

}