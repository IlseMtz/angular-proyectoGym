import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Ejercicio, EjerciciosService } from '../../servicios/ejercicios.service';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';

@Component({
  selector: 'app-ejercicios-api',
   standalone: true,
  imports: [CommonModule,MatIconModule,MatCardModule,MatProgressSpinnerModule,HttpClientModule,MatChipsModule, DomseguroPipe],
  templateUrl: './ejercicios-api.component.html',
  styleUrl: './ejercicios-api.component.css'
})
export class EjerciciosApiComponent {

  video:string="UglCbW0bmEw";

  ejercicios: Ejercicio[] = [];
  cargando = true;

  constructor(private ejerciciosService: EjerciciosService) {}

  ngOnInit(): void {
    this.ejerciciosService.obtenerEjercicios().subscribe(data => {
      console.log('Ejercicios recibidos:', data);
      this.ejercicios = data;
      this.cargando = false;
    });
  }

  
}
