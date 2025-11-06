import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div [class.dark-theme]="themeService.isDarkTheme()">
      <mat-toolbar color="primary">
        <span>User App</span>
        <span class="spacer"></span>
        <a mat-button routerLink="/users" routerLinkActive="active">Users</a>
        <a mat-button routerLink="/about" routerLinkActive="active">About</a>
      </mat-toolbar>
      
      <button 
        mat-fab 
        class="theme-toggle" 
        (click)="themeService.toggleTheme()"
        [attr.aria-label]="themeService.isDarkTheme() ? 'Switch to light theme' : 'Switch to dark theme'">
        <mat-icon>{{themeService.isDarkTheme() ? 'light_mode' : 'dark_mode'}}</mat-icon>
      </button>
      
      <main class="container">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    
    .active {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .theme-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }
  `]
})
export class AppComponent {
  constructor(public themeService: ThemeService) {}
}
