import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrar-datos-admins',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mostrar-datos-admins.component.html',
  styleUrl: './mostrar-datos-admins.component.css'
})
export class MostrarDatosAdminsComponent implements OnInit {
  @ViewChild('tablaBody', { static: true }) tablaBody!: ElementRef;

  inscripciones: any[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const datosGuardados = localStorage.getItem('inscripciones');
    this.inscripciones = datosGuardados ? JSON.parse(datosGuardados) : [];

    // Si hay inscripciones, renderizar manualmente las filas
    if (this.inscripciones.length > 0) {
      this.inscripciones.forEach((inscripcion, index) => {
        inscripcion.editing = false;
        this.crearFila(inscripcion, index);  // Crear fila por cada inscripción
      });
    } else {
      this.mostrarNoDatos();  // Si no hay datos, mostrar mensaje
    }
  }

  crearFila(inscripcion: any, index: number): void {
  const fila = this.renderer.createElement('tr');

  const crearCeldaConInput = (value: string, type = 'text', disabled = true) => {
    const td = this.renderer.createElement('td');
    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'type', type);
    this.renderer.setProperty(input, 'value', value);
    if (disabled) this.renderer.setAttribute(input, 'disabled', 'true');
    this.renderer.appendChild(td, input);
    return td;
  };

  this.renderer.appendChild(fila, crearCeldaConInput(inscripcion.nombre));
  this.renderer.appendChild(fila, crearCeldaConInput(inscripcion.email));
  this.renderer.appendChild(fila, crearCeldaConInput(inscripcion.paquete));
  this.renderer.appendChild(fila, crearCeldaConInput(inscripcion.plan));
  this.renderer.appendChild(fila, crearCeldaConInput(inscripcion.precio, 'number'));
  this.renderer.appendChild(fila, crearCeldaConInput(inscripcion.fechaInicio, 'date'));
  this.renderer.appendChild(fila, crearCeldaConInput(inscripcion.fechaFin, 'date'));

  const tdAcciones = this.renderer.createElement('td');

  // Botón Editar
  const btnEditar = this.renderer.createElement('button');
  this.renderer.setProperty(btnEditar, 'textContent', 'Editar');
  this.renderer.listen(btnEditar, 'click', () => this.editRow(index, fila));
  this.renderer.appendChild(tdAcciones, btnEditar);

  // Botón Eliminar
  const btnEliminar = this.renderer.createElement('button');
  this.renderer.setProperty(btnEliminar, 'textContent', 'Eliminar');
  this.renderer.listen(btnEliminar, 'click', () => this.eliminarFila(index));
  this.renderer.appendChild(tdAcciones, btnEliminar);

  this.renderer.appendChild(fila, tdAcciones);

  this.renderer.appendChild(this.tablaBody.nativeElement, fila);
}


  editRow(index: number, fila: HTMLElement): void {
    const inputs = fila.querySelectorAll('input');
    inputs.forEach(input => input.removeAttribute('disabled'));  // Habilitar inputs

    const btn = fila.querySelector('button');
    if (btn) {
      btn.textContent = 'Guardar';
      btn.addEventListener('click', () => this.saveRow(index, fila));  // Cambiar a 'Guardar'
    }
  }

  saveRow(index: number, fila: HTMLElement): void {
    const inputs = fila.querySelectorAll('input');

    this.inscripciones[index].nombre = (inputs[0] as HTMLInputElement).value;
    this.inscripciones[index].email = (inputs[1] as HTMLInputElement).value;
    this.inscripciones[index].paquete = (inputs[2] as HTMLInputElement).value;
    this.inscripciones[index].plan = (inputs[3] as HTMLInputElement).value;
    this.inscripciones[index].precio = parseFloat((inputs[4] as HTMLInputElement).value);
    this.inscripciones[index].fechaInicio = (inputs[5] as HTMLInputElement).value;
    this.inscripciones[index].fechaFin = (inputs[6] as HTMLInputElement).value;

    inputs.forEach(input => input.setAttribute('disabled', 'true'));

    const btn = fila.querySelector('button');
    if (btn) {
      btn.textContent = 'Editar';
    }

    localStorage.setItem('inscripciones', JSON.stringify(this.inscripciones));
  }

  mostrarNoDatos(): void {
    const mensaje = this.renderer.createElement('p');
    const texto = this.renderer.createText('No hay inscripciones registradas.');
    this.renderer.appendChild(mensaje, texto);
    this.renderer.appendChild(this.tablaBody.nativeElement, mensaje);
  }


  eliminarFila(index: number): void {
  // Eliminar del array
  this.inscripciones.splice(index, 1);

  // Actualizar localStorage
  localStorage.setItem('inscripciones', JSON.stringify(this.inscripciones));

  // Limpiar tabla y volver a renderizar
  this.renderer.setProperty(this.tablaBody.nativeElement, 'innerHTML', '');

  if (this.inscripciones.length > 0) {
    this.inscripciones.forEach((inscripcion, idx) => {
      this.crearFila(inscripcion, idx);
    });
  } else {
    this.mostrarNoDatos();
  }
}

}
