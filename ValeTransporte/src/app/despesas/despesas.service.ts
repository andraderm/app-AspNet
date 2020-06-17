import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Despesa } from '../models/Despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  baseUrl = `${environment.UrlPrincipal}/despesa`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(`${this.baseUrl}`);
  }

  getByData(ano: number, mes: number): Observable<Despesa> {
    return this.http.get<Despesa>(`${this.baseUrl}/${ano}/${mes}`);
  }

  delete(ano: number, mes: number) {
    return this.http.delete(`${this.baseUrl}/${ano}/${mes}`);
  }

  post(ano: number, mes: number) {
    return this.http.post(`${this.baseUrl}/${ano}/${mes}`, null);
  }

}
