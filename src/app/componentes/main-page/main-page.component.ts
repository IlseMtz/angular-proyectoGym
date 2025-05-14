import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ContentMainPageComponent } from '../content-main-page/content-main-page.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { Router } from 'express';

@Component({
  selector: 'app-main-page',
  imports: [RouterModule,MatIconModule,MatChipsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  readonly gymReasons = [
    { text: 'Entrenadores certificados', icon: 'fitness_center' },
    { text: 'Instalaciones modernas', icon: 'sports_gymnastics' },
    { text: 'Planes accesibles', icon: 'attach_money' },
    { text: 'Horarios flexibles', icon: 'schedule' },
    { text: 'Ambiente motivador', icon: 'emoji_events' }
  ];
}
