import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Despesa } from '../models/Despesa';
import { DespesaFuncionario } from '../models/DespesaFuncionario';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  baseUrl = `${environment.UrlPrincipal}/despesa`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(`${this.baseUrl}`);
  }

  getByData(dataInicial: string, dataFinal: string): Observable<Despesa> {
    return this.http.get<Despesa>(`${this.baseUrl}/${dataInicial}/${dataFinal}`);
  }

  getDespesaFuncionario(): Observable<DespesaFuncionario[]> {
    return this.http.get<DespesaFuncionario[]>(`${this.baseUrl}/df`);
  }

  delete(dataInicial: string, dataFinal: string) {
    return this.http.delete(`${this.baseUrl}/${dataInicial}/${dataFinal}`);
  }

  post(dataInicial: string, dataFinal: string) {
    return this.http.post(`${this.baseUrl}/${dataInicial}/${dataFinal}`, null);
  }

}
