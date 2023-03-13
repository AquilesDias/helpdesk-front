import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tecnico } from '../models/tecnico';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  
  constructor(private http: HttpClient) { }

  findAllTecnicos():Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnico`);
  }

  saveTecnico(tecnico:Tecnico):Observable<Tecnico>{
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnico`, tecnico);
  }
  
}
