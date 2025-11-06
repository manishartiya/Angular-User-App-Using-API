import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <div class="about-page">
      <div class="hero-section">
        <h1>About User App</h1>
        <p class="hero-subtitle">A modern application showcasing best practices and advanced features</p>
      </div>
      
      <div class="features-grid">
        <mat-card class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>route</mat-icon>
            <mat-card-title>Advanced Routing</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Lazy-loaded routes with active link highlighting and navigation guards for optimal performance.</p>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>api</mat-icon>
            <mat-card-title>API Integration</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>RESTful API integration with error handling, retry logic, and loading states using RxJS operators.</p>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>dynamic_form</mat-icon>
            <mat-card-title>Dynamic Components</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Dynamic component loading using ViewContainerRef for flexible and reusable UI components.</p>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>brush</mat-icon>
            <mat-card-title>Custom Directives</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Custom highlight directive with hover effects and dynamic styling for enhanced user interaction.</p>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>open_in_new</mat-icon>
            <mat-card-title>Modal Dialogs</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Angular Material dialogs with smooth animations and responsive design for detailed user information.</p>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>search</mat-icon>
            <mat-card-title>Search & Filter</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Real-time search functionality with multiple sorting options and responsive grid layout.</p>
          </mat-card-content>
        </mat-card>
      </div>
      
      <mat-card class="tech-stack-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>code</mat-icon>
            Technology Stack
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="tech-list">
            <div class="tech-item">
              <mat-icon>angular</mat-icon>
              <span>Angular 17+ with Standalone Components</span>
            </div>
            <div class="tech-item">
              <mat-icon>palette</mat-icon>
              <span>Angular Material Design</span>
            </div>
            <div class="tech-item">
              <mat-icon>style</mat-icon>
              <span>SCSS for Advanced Styling</span>
            </div>
            <div class="tech-item">
              <mat-icon>http</mat-icon>
              <span>RxJS for Reactive Programming</span>
            </div>
            <div class="tech-item">
              <mat-icon>devices</mat-icon>
              <span>Responsive Design</span>
            </div>
            <div class="tech-item">
              <mat-icon>dark_mode</mat-icon>
              <span>Dark/Light Theme Toggle</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
      
      <div class="cta-section">
        <h2>Explore the Application</h2>
        <p>Discover all the features by browsing through the user directory</p>
        <button mat-raised-button color="primary" routerLink="/users" class="cta-button">
          <mat-icon>people</mat-icon>
          View Users
        </button>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .hero-section {
      text-align: center;
      margin-bottom: 50px;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      color: white;
      
      h1 {
        font-size: 3rem;
        font-weight: 300;
        margin-bottom: 16px;
      }
      
      .hero-subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        max-width: 600px;
        margin: 0 auto;
      }
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }
    
    .feature-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.15);
      }
      
      mat-card-header {
        margin-bottom: 16px;
        
        mat-icon {
          background-color: #3f51b5;
          color: white;
          border-radius: 50%;
          padding: 8px;
        }
      }
      
      mat-card-content p {
        color: #666;
        line-height: 1.6;
      }
    }
    
    .tech-stack-card {
      margin-bottom: 40px;
      
      mat-card-title {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #3f51b5;
      }
    }
    
    .tech-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }
    
    .tech-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background-color: #f8f9fa;
      border-radius: 8px;
      transition: background-color 0.3s ease;
      
      &:hover {
        background-color: #e9ecef;
      }
      
      mat-icon {
        color: #3f51b5;
        font-size: 20px;
      }
      
      span {
        font-weight: 500;
        color: #333;
      }
    }
    
    .cta-section {
      text-align: center;
      padding: 40px 20px;
      background-color: #f8f9fa;
      border-radius: 12px;
      
      h2 {
        color: #3f51b5;
        margin-bottom: 16px;
        font-size: 2rem;
        font-weight: 400;
      }
      
      p {
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 24px;
      }
    }
    
    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      font-size: 16px;
    }
    
    :host-context(.dark-theme) {
      .feature-card mat-card-content p {
        color: #666;
      }
      
      .tech-item {
        background-color: #424242;
        
        &:hover {
          background-color: #515151;
        }
        
        span {
          color: #fff;
        }
      }
      
      .tech-stack-card mat-card-title {
        color: #7986cb;
      }
      
      .cta-section {
        background-color: #424242;
        
        h2 {
          color: #7986cb;
        }
        
        p {
          color: #ccc;
        }
      }
    }
    
    @media (max-width: 768px) {
      .hero-section {
        padding: 30px 15px;
        
        h1 {
          font-size: 2rem;
        }
        
        .hero-subtitle {
          font-size: 1rem;
        }
      }
      
      .features-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .tech-list {
        grid-template-columns: 1fr;
      }
      
      .cta-section {
        padding: 30px 15px;
        
        h2 {
          font-size: 1.5rem;
        }
      }
    }
  `]
})
export class AboutComponent {}
