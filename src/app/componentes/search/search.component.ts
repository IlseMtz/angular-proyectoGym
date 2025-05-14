import { Component, OnInit } from '@angular/core';
import { Ejercicio, EjerciciosService } from '../../servicios/ejercicios.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatCardModule,MatProgressSpinnerModule,MatChipsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements OnInit {
  ejercicioEncontrado?: Ejercicio;
  cargando: boolean = true;
  nombreBuscado: string = '';

  constructor(
    private route: ActivatedRoute,
    private ejerciciosService: EjerciciosService
  ) {}

  ngOnInit(): void {
  const nombreDesdeEstado = history.state.nombre;

  if (nombreDesdeEstado) {
    this.nombreBuscado = nombreDesdeEstado;

    this.ejerciciosService.obtenerEjercicios().subscribe(ejercicios => {
      this.ejercicioEncontrado = ejercicios.find(e =>
        e.nombre.toLowerCase() === this.nombreBuscado.toLowerCase()
      );
      this.cargando = false;
    });
  } else {
    this.cargando = false; // o muestra mensaje de "no se envió ningún nombre"
  }
}
}
