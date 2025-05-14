import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-imagenes-lugar',
  standalone: true,
  templateUrl: './imagenes-lugar.component.html',
  styleUrls: ['./imagenes-lugar.component.css']
})
export class ImagenesLugarComponent implements AfterViewInit {
  @Input() imagenes: string[] = [];
  @Output() imagenSeleccionadaEvent = new EventEmitter<string>();

  @ViewChild('imagenesGrid', { static: true }) imagenesGrid!: ElementRef;
  @ViewChild('lightbox', { static: true }) lightbox!: ElementRef;
  @ViewChild('lightboxImg', { static: true }) lightboxImg!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderizarImagenes();
    this.ocultarLightbox();
  }

  renderizarImagenes() {
    const grid = this.imagenesGrid.nativeElement;
    grid.innerHTML = '';

    this.imagenes.forEach(imagen => {
      const imgElement = this.renderer.createElement('img');
      this.renderer.setAttribute(imgElement, 'src', imagen);
      this.renderer.setAttribute(imgElement, 'alt', 'Instalación');
      this.renderer.listen(imgElement, 'click', () => this.onImagenClick(imagen));
      this.renderer.appendChild(grid, imgElement);
    });
  }

  onImagenClick(imagen: string) {
    this.renderer.setAttribute(this.lightboxImg.nativeElement, 'src', imagen);
    this.mostrarLightbox();
    this.imagenSeleccionadaEvent.emit(imagen);
  }

  cerrarImagen() {
    this.ocultarLightbox();
  }

  mostrarLightbox() {
    this.renderer.setStyle(this.lightbox.nativeElement, 'display', 'flex');
  }

  ocultarLightbox() {
    this.renderer.setStyle(this.lightbox.nativeElement, 'display', 'none');
  }
}