import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

declare var L: any;

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    const lat = 21.915076;
    const lng = -102.320877;

    this.mostrarMapa(lat, lng);
  }

  mostrarMapa(lat: number, lng: number): void {
    const map = L.map('mapa').setView([lat, lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; OpenStreetMap contributors'}).addTo(map);

      L.marker([lat, lng]).addTo(map).bindPopup('Kraken Gym').openPopup();  
    }

  irAYoutube() {
    window.open('https://youtu.be/B0dQDOOuafI', '_blank');
  }
  irAFacebook(){
    window.open('https://www.facebook.com/','_blank');
  }
  irAWhatsapp(){
    window.open('https://www.whatsapp.com/','_blank');
  }
}
