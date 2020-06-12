import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

baseUrl = `${environment.UrlPrincipal}/funcionario`;

constructor(private http: HttpClient) { }

getAll(): Observable<Funcionario[]> {
  return this.http.get<Funcionario[]>(`${this.baseUrl}`);
}

}
