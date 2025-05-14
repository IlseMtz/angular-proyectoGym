import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagenesLugarComponent } from '../imagenes-lugar/imagenes-lugar.component';

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [RouterModule, ImagenesLugarComponent],
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css'
})
export class PaquetesComponent {

  onImagenSeleccionada(imagenUrl: string) {
    console.log('Imagen seleccionada desde el hijo:', imagenUrl);
  }
}
