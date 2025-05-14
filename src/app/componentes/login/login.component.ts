import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ADMIN } from '../../adminsArray';
import { Admins } from '../../admins';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string='';
  password: string='';
  birthday: string='';
  gender: string='';
  isHuman =false;

 @Output() usernameLogged = new EventEmitter<string>();

 constructor(private authService: AuthService, private router: Router) {}

  checkLogin(): void {
  const intento = {
  username: this.username,
  password: this.password,
  birthday: this.birthday,
  gender: this.gender,
  isHuman: this.isHuman,
  timestamp: new Date().toISOString()
};


  // Guardar en LocalStorage
  const intentosGuardados = JSON.parse(localStorage.getItem('loginIntentos') || '[]');
  intentosGuardados.push(intento);
  localStorage.setItem('loginIntentos', JSON.stringify(intentosGuardados));

  const found = ADMIN.find(admin =>
    admin.name === this.username &&
    admin.password === this.password &&
    new Date(admin.birthday).toDateString() === new Date(this.birthday).toDateString() &&
    this.isHuman === admin.esHumano
  );

  if (found) {
    (window as any).Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Se ha registrado correctamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#007bff'
    });

    if (this.username && this.password && this.birthday && this.isHuman) {
      this.authService.setUsername(this.username);
      this.router.navigate(['/']);
    }
  } else {
    (window as any).Swal.fire({
      icon: 'error',
      title: '¡Incorrecto!',
      text: 'Vuelva a verificar los datos y vuelva a intentarlo',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#007bff'
    });
  }
}

  
}
