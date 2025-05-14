import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainPageComponent } from './componentes/main-page/main-page.component';
import { PaquetesComponent } from './componentes/paquetes/paquetes.component';
import { InscribeteComponent } from './componentes/inscribete/inscribete.component';
import { MostrarDatosAdminsComponent } from './componentes/mostrar-datos-admins/mostrar-datos-admins.component';
import { MostrarDatosAdminsAuxComponent } from './componentes/mostrar-datos-admins-aux/mostrar-datos-admins-aux.component';
import { EjerciciosApiComponent } from './componentes/ejercicios-api/ejercicios-api.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { AboutUsComponent } from './componentes/about-us/about-us.component';
import { SearchComponent } from './componentes/search/search.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'paquetes', component: PaquetesComponent},
    { path: 'inscribete', component: InscribeteComponent},
    { path: 'contacto', component: ContactoComponent},
    { path: 'ejercicios-api', component: EjerciciosApiComponent},
    { path: 'about-us', component: AboutUsComponent},
    /*{ path: 'buscar/:nombre', component: SearchComponent},*/
    { path: 'buscar', component: SearchComponent },
    { path: 'mostrar-datos-admins', component: MostrarDatosAdminsComponent},
    { path: 'mostrar-datos-admins-aux', component: MostrarDatosAdminsAuxComponent}
];
