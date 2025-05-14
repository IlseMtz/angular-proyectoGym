import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrar-datos-admins-aux',
  standalone: true,
  imports: [FormsModule],
  providers: [DatePipe],
  templateUrl: './mostrar-datos-admins-aux.component.html',
  styleUrl: './mostrar-datos-admins-aux.component.css'
})
export class MostrarDatosAdminsAuxComponent implements OnInit {
  @ViewChild('tablaBody', { static: true }) tablaBody!: ElementRef;

  intentos: any[] = [];

  constructor(private renderer: Renderer2, private datePipe: DatePipe) {}

  ngOnInit(): void {
    const datosGuardados = localStorage.getItem('loginIntentos');
    this.intentos = datosGuardados ? JSON.parse(datosGuardados) : [];

    this.renderizarTabla();
  }

  renderizarTabla(): void {
    // Limpiar tabla
    this.renderer.setProperty(this.tablaBody.nativeElement, 'innerHTML', '');

    if (this.intentos.length > 0) {
      this.intentos.forEach((intento, index) => {
        this.crearFila(intento, index);
      });
    } else {
      this.mostrarNoDatos();
    }
  }

  crearFila(intento: any, index: number): void {
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

    this.renderer.appendChild(fila, crearCeldaConInput(intento.username));
    this.renderer.appendChild(fila, crearCeldaConInput(intento.password));
    this.renderer.appendChild(fila, crearCeldaConInput(intento.birthday, 'date'));

    const tdGender = this.renderer.createElement('td');
    const selectGender = this.renderer.createElement('select');
    ['Hombre', 'Mujer', 'Prefiero no especificar'].forEach(optionValue => {
      const option = this.renderer.createElement('option');
      this.renderer.setProperty(option, 'value', optionValue);
      this.renderer.setProperty(option, 'textContent', optionValue);
      if (optionValue === intento.gender) {
        this.renderer.setProperty(option, 'selected', true);
      }
      this.renderer.appendChild(selectGender, option);
    });
    this.renderer.setAttribute(selectGender, 'disabled', 'true');
    this.renderer.appendChild(tdGender, selectGender);
    this.renderer.appendChild(fila, tdGender);

    const tdHuman = this.renderer.createElement('td');
    const checkbox = this.renderer.createElement('input');
    this.renderer.setAttribute(checkbox, 'type', 'checkbox');
    this.renderer.setProperty(checkbox, 'checked', intento.isHuman);
    this.renderer.setAttribute(checkbox, 'disabled', 'true');
    this.renderer.appendChild(tdHuman, checkbox);
    this.renderer.appendChild(fila, tdHuman);

    const tdFecha = this.renderer.createElement('td');
    const fechaFormateada = this.datePipe.transform(intento.timestamp, 'short');
    const textoFecha = this.renderer.createText(fechaFormateada || '');
    this.renderer.appendChild(tdFecha, textoFecha);
    this.renderer.appendChild(fila, tdFecha);

    const tdAcciones = this.renderer.createElement('td');
    const btnEditar = this.renderer.createElement('button');
    this.renderer.setProperty(btnEditar, 'textContent', 'Editar');
    this.renderer.listen(btnEditar, 'click', () => this.editRow(index, fila));
    this.renderer.appendChild(tdAcciones, btnEditar);

    const btnEliminar = this.renderer.createElement('button');
    this.renderer.setProperty(btnEliminar, 'textContent', 'Eliminar');
    this.renderer.listen(btnEliminar, 'click', () => this.eliminarFila(index));
    this.renderer.appendChild(tdAcciones, btnEliminar);

    this.renderer.appendChild(fila, tdAcciones);

    this.renderer.appendChild(this.tablaBody.nativeElement, fila);
  }

  editRow(index: number, fila: HTMLElement): void {
    const inputs = fila.querySelectorAll('input, select');
    inputs.forEach(input => input.removeAttribute('disabled'));

    const btn = fila.querySelector('button');
    if (btn) {
      btn.textContent = 'Guardar';
      btn.addEventListener('click', () => this.saveRow(index, fila));
    }
  }

  saveRow(index: number, fila: HTMLElement): void {
    const inputs = fila.querySelectorAll('input, select');

    const usernameInput = inputs[0] as HTMLInputElement;
    const passwordInput = inputs[1] as HTMLInputElement;
    const birthdayInput = inputs[2] as HTMLInputElement;
    const genderSelect = inputs[3] as HTMLSelectElement;
    const isHumanCheckbox = inputs[4] as HTMLInputElement;

    this.intentos[index].username = usernameInput.value;
    this.intentos[index].password = passwordInput.value;
    this.intentos[index].birthday = birthdayInput.value;
    this.intentos[index].gender = genderSelect.value;
    this.intentos[index].isHuman = isHumanCheckbox.checked;

    inputs.forEach(input => input.setAttribute('disabled', 'true'));

    const btn = fila.querySelector('button');
    if (btn) {
      btn.textContent = 'Editar';
      btn.addEventListener('click', () => this.editRow(index, fila));
    }

    localStorage.setItem('loginIntentos', JSON.stringify(this.intentos));
  }

  eliminarFila(index: number): void {
    this.intentos.splice(index, 1);
    localStorage.setItem('loginIntentos', JSON.stringify(this.intentos));

    // Volver a renderizar tabla (y mostrar mensaje si está vacía)
    this.renderizarTabla();
  }

  mostrarNoDatos(): void {
    const fila = this.renderer.createElement('tr');
    const td = this.renderer.createElement('td');
    this.renderer.setAttribute(td, 'colspan', '7'); // 7 columnas visibles en tu tabla
    this.renderer.setStyle(td, 'text-align', 'center');
    const texto = this.renderer.createText('No hay datos para mostrar.');
    this.renderer.appendChild(td, texto);
    this.renderer.appendChild(fila, td);
    this.renderer.appendChild(this.tablaBody.nativeElement, fila);
  }
}
