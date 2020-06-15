import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Setor } from '../models/setor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  baseUrl = `${environment.UrlPrincipal}/setor`;

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Setor[]> {
    return this.http.get<Setor[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Setor> {
    return this.http.get<Setor>(`${this.baseUrl}/${id}`);
  }
  

}
