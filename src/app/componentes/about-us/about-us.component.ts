import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  integrantes = [
      {
        nombre: 'Martínez Espinosa Ilse Jacqueline',
        telefono: '449 418 7639',
        imagen: 'Ilse.jpg',
        descripcion: 'Ingeniería en Sistemas Computacionales en la Universidad Autónoma de Aguascalientes. Estudiante de 6to semestre.',
      },
      {
        nombre: 'Ramírez Solis Nadia Guadalupe',
        telefono: '332 831 6238',
        imagen: 'Nadia.jpg',
        descripcion: 'Ingeniería en Sistemas Computacionales en la Universidad Autónoma de Aguascalientes. Estudiante de 6to semestre.',
      },
      {
        nombre: 'Rodríguez Guadarrama Uriel',
        telefono: '449 372 2186',
        imagen: 'Guada.jpg',
        descripcion: 'Ingeniería en Sistemas Computacionales en la Universidad Autónoma de Aguascalientes. Estudiante de 6to semestre.',
      }
  ];
}
