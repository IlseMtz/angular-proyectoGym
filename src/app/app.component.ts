import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './servicios/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gimnasioProyecto';

  username: string='';
  isLoggedIn: boolean=false;

  updateUsername(newUsername: string) {
    this.username = newUsername;
  }

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.username$.subscribe(username => {
      this.username = username;
    });
  }

  buscarEjercicio(nombre:string){
    this.router.navigate(['/buscar'], { state: { nombre } });
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isLoginRoute2(): boolean{
    return this.router.url === '/paquetes';
  }

  isLoginRoute3(): boolean{
    return this.router.url === '/inscribete';
  }

  isLoginRoute4(): boolean{
    return this.router.url === '/contacto';
  }

  isLoginRoute5(): boolean{
    return this.router.url === '/ejercicios-api';
  }

  isLoginRoute6(): boolean{
    return this.router.url === '/about-us';
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

  logout(){
    (window as any).Swal.fire({
        icon: 'LogOut Exitoso',
        title: '¡Ha cerrado sesion correctamente!',
        text: 'Esperamos verlo despues...',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#007bff'
      });

    this.authService.setUsername('');
    return this.router.url === '/'; 
  }


  
}
