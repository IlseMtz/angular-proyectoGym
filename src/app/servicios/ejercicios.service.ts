import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ejercicio {
  id: number;
  nombre: string;
  musculo: string;
  equipamiento: string;
  nivel: string;
}

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
  private apiUrl = 'https://gym-api.free.beeceptor.com';

  constructor(private http: HttpClient) {}

  obtenerEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.apiUrl);
  }

}
