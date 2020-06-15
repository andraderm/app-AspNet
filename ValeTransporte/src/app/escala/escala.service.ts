import { Injectable } from '@angular/core';
import { Escala } from '../models/Escala';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {

  baseUrl = `${environment.UrlPrincipal}/escala`;

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Escala[]> {
    return this.http.get<Escala[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Escala> {
    return this.http.get<Escala>(`${this.baseUrl}/${id}`);
  }

}
