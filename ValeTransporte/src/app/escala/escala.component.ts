import { Component, OnInit } from '@angular/core';
import { Escala } from '../models/Escala';
import { EscalaService } from './escala.service';

@Component({
  selector: 'app-escala',
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.css']
})
export class EscalaComponent implements OnInit {

  public escalas: Escala[];

  constructor(private escalaService: EscalaService) { }

  ngOnInit() {
  }

  carregarFuncionarios() {
    
    this.escalaService.getAll().subscribe((escalas: Escala[]) => {
        this.escalas = escalas;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

}
