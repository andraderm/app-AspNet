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
  public modo = 'post';
  
  public funcionarios: Funcionario[];
  public setor: Setor;

  constructor(private fb: FormBuilder,
              private funcionarioService: FuncionarioService,
              private setorService: SetorService,
              private escalaService: EscalaService,
              private modalService: BsModalService) {
    this.criarForm();
  }

  ngOnInit() {
    this.carregarFuncionarios();
  }

  criarForm() {
    this.funcionarioForm = this.fb.group({
      nome: [''],
      sobrenome: [''],
      dataAdmissao: [''],
      setor: [''],
      escala: [''],
      custoDiarioVT: [''],
    });
  }

  carregarFuncionarios() {
    
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
        this.funcionarios = funcionarios;
        this.instanciarSetores(funcionarios);
        this.instanciarEscala(funcionarios);
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  instanciarSetores(funcionarios: Funcionario[]){
    
    funcionarios.forEach(func => {
      this.setorService.getById(func.setorId).subscribe((setor: Setor) => {
        func.setor = setor.nome;
      },
      (erro: any) => {
        console.error(erro);
      });
    });
  }

  instanciarEscala(funcionarios: Funcionario[]){
    
    funcionarios.forEach(func => {
      this.escalaService.getById(func.escalaId).subscribe((escala: Escala) => {
        func.escala = escala.escalaTrabalho;
      },
      (erro: any) => {
        console.error(erro);
      });
    });
  }

  novoFuncionario(){
    this.funcionarioSelecionado = new Funcionario()
    this.funcionarioForm.patchValue(this.funcionarioSelecionado);
  }
  
  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  salvar(funcionario: Funcionario) {
    (funcionario.id === 0) ? this.modo = 'post' : this.modo = 'put';
    this.funcionarioService[this.modo](funcionario).subscribe(
      (retorno: Funcionario) => {
        console.log(retorno);
        this.carregarFuncionarios();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  voltar(){
    this.funcionarioSelecionado = null;
  }

  submit(){
    this.salvar(this.funcionarioForm.value);
  }

  selecionarFuncionario(funcionario: Funcionario){
    this.funcionarioSelecionado = funcionario;
    this.funcionarioForm.patchValue(this.funcionarioSelecionado);
  }
  
  excluirFuncionario(id: number){
    this.funcionarioService.delete(id).subscribe(
      (model: any) => {
        console.log(model);
        this.carregarFuncionarios();
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  

}
