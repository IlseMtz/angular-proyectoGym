import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';  
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-inscribete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    DomseguroPipe,
    MatCardModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inscribete.component.html',
  styleUrl: './inscribete.component.css'
})
export class InscribeteComponent {
  video:string="B0dQDOOuafI";

  public form: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
      Validators.minLength(2),
      Validators.maxLength(40)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(12)]),
    repeat_password: new FormControl('', [Validators.required, Validators.minLength(12)]),
    paquete: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFin: new FormControl({ value: '', disabled: true })
  });

  testimonios = [
    {
      mensaje: "Gracias a este programa logré bajar de peso y sentirme mejor que nunca.",
      autor: "Laura G."
    },
    {
      mensaje: "Entrenamientos accesibles y un equipo súper motivador.",
      autor: "Carlos M."
    },
    {
      mensaje: "¡Me encanta la variedad de clases y la energía del grupo!",
      autor: "Sofía R."
    }
  ];
  planes: { valor: string, etiqueta: string }[] = [
    { valor: 'semanal', etiqueta: 'Semanal' },
    { valor: 'mensual', etiqueta: 'Mensual' },
    { valor: 'anual', etiqueta: 'Anual' }
  ];

  precios: any = {
    paquete1: { semanal: 100, mensual: 350, anual: 3600 },
    paquete2: { semanal: 120, mensual: 400, anual: 4200 },
    paquete3: { semanal: 150, mensual: 450, anual: 4800 },
    paquete4: { semanal: 180, mensual: 500, anual: 5400 },
    paquete5: { semanal: 200, mensual: 600, anual: 6000 }
  };

  minFecha: Date = new Date();  // Limitar fechas anteriores a hoy
  hoy: string = ''; 
  fechaFinInput: string = '';
  precioFinal: number | null = null;

  constructor() {
    this.form.get('repeat_password')?.setValidators([
      Validators.required,
      Validators.minLength(12),
      this.passwordValidator()
    ]);
    this.form.get('paquete')?.valueChanges.subscribe(() => this.calcularPrecio());
    this.form.get('plan')?.valueChanges.subscribe(() => this.calcularPrecio());

    const today = new Date();
    this.hoy = today.toISOString().split('T')[0];  // Formato yyyy-MM-dd

    // Validar fechas y calcular fecha de fin cuando cambian
    this.form.get('fechaInicio')?.valueChanges.subscribe(() => this.calcularFechaFin());
    this.form.get('plan')?.valueChanges.subscribe(() => this.calcularFechaFin());
  }

  public passwordValidator(): ValidatorFn {
    return () => {
      const password = this.form.get('password')?.value;
      const repeat_password = this.form.get('repeat_password')?.value;

      if (!password || !repeat_password) return { isValid: false };

      if (password !== repeat_password) return { isValid: false };

      return null;
    };
  }

  calcularPrecio(): void {
    const paquete = this.form.get('paquete')?.value;
    const plan = this.form.get('plan')?.value;

    if (paquete && plan && this.precios[paquete]?.[plan]) {
      this.precioFinal = this.precios[paquete][plan];
    } else {
      this.precioFinal = null;
    }
  }

  calcularFechaFin(): void {
    const fechaInicioRaw = this.form.get('fechaInicio')?.value;
    const plan = this.form.get('plan')?.value;

    if (!fechaInicioRaw || !plan) {
      this.fechaFinInput = '';
      return;
    }

    const inicio = new Date(fechaInicioRaw);
    let fin = new Date(inicio);

    switch (plan) {
      case 'semanal':
        fin.setDate(fin.getDate() + 7);
        break;
      case 'mensual':
        fin.setMonth(fin.getMonth() + 1);
        break;
      case 'anual':
        fin.setFullYear(fin.getFullYear() + 1);
        break;
    }

    this.fechaFinInput = fin.toISOString().split('T')[0];  // Formato yyyy-MM-dd
  }

  enviarFormulario() {
    if (this.form.valid) {
      const datos = {
        ...this.form.value,
        precio: this.precioFinal,
        fechaFin: this.fechaFinInput
      };

      // Guardar en localStorage
      const registros = JSON.parse(localStorage.getItem('inscripciones') || '[]');
      registros.push(datos);
      localStorage.setItem('inscripciones', JSON.stringify(registros));

      (window as any).Swal.fire({
        icon: 'success',
        title: '¡Inscripción exitosa!',
        text: 'Tu formulario ha sido enviado correctamente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#007bff'
      });

      console.log('Formulario enviado con éxito:', datos);

      this.form.reset(); // Limpiar el formulario después de enviarlo
      this.precioFinal = null;
    } else {
      this.form.markAllAsTouched();
    }
  }
}
