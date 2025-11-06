import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="user-details" *ngIf="user">
      <div class="user-header">
        <div class="user-avatar-large">
          {{user.name.charAt(0).toUpperCase()}}
        </div>
        <div class="user-basic-info">
          <h2>{{user.name}}</h2>
          <p class="username">{{'@' + user.username}}</p>
        </div>
      </div>
      
      <mat-card class="info-section">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>contact_mail</mat-icon>
            Contact Information
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="detail-item">
            <mat-icon>email</mat-icon>
            <span class="label">Email:</span>
            <span class="value">{{user.email}}</span>
          </div>
          <div class="detail-item">
            <mat-icon>phone</mat-icon>
            <span class="label">Phone:</span>
            <span class="value">{{user.phone}}</span>
          </div>
          <div class="detail-item">
            <mat-icon>language</mat-icon>
            <span class="label">Website:</span>
            <span class="value">{{user.website}}</span>
          </div>
        </mat-card-content>
      </mat-card>
      
      <mat-card class="info-section">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>location_on</mat-icon>
            Address
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="address-info">
            <p>{{user.address.street}}, {{user.address.suite}}</p>
            <p>{{user.address.city}}, {{user.address.zipcode}}</p>
            <div class="coordinates">
              <mat-chip-set>
                <mat-chip>Lat: {{user.address.geo.lat}}</mat-chip>
                <mat-chip>Lng: {{user.address.geo.lng}}</mat-chip>
              </mat-chip-set>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
      
      <mat-card class="info-section">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>business</mat-icon>
            Company
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="company-info">
            <h3>{{user.company.name}}</h3>
            <p class="catchphrase">"{{user.company.catchPhrase}}"</p>
            <p class="business">{{user.company.bs}}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .user-details {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .user-header {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
    }
    
    .user-avatar-large {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: bold;
      margin-right: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
    }
    
    .user-basic-info h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 500;
    }
    
    .username {
      margin: 4px 0 0 0;
      opacity: 0.9;
      font-size: 16px;
    }
    
    .info-section {
      margin-bottom: 16px;
    }
    
    mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      padding: 8px 0;
      
      mat-icon {
        margin-right: 12px;
        color: #666;
        min-width: 24px;
      }
      
      .label {
        font-weight: 500;
        margin-right: 8px;
        min-width: 60px;
        color: #555;
      }
      
      .value {
        color: #555;
      }
    }
    
    .address-info {
      p {
        margin: 8px 0;
        line-height: 1.5;
      }
      
      .coordinates {
        margin-top: 12px;
      }
    }
    
    .company-info {
      h3 {
        margin: 0 0 8px 0;
        color: #3f51b5;
        font-size: 20px;
      }
      
      .catchphrase {
        font-style: italic;
        color: #666;
        margin: 8px 0;
        font-size: 16px;
      }
      
      .business {
        color: #555;
        font-size: 14px;
        margin: 8px 0 0 0;
      }
    }
    
    :host-context(.dark-theme) {
      .detail-item {
        .label {
          color: #555;
        }
        
        .value {
          color: #000;
        }
        
        mat-icon {
          color: #999;
        }
      }
      
      .company-info {
        h3 {
          color: #7986cb;
        }
        
        .catchphrase {
          color: #bbb;
        }
        
        .business {
          color: #ccc;
        }
      }
    }
    
    @media (max-width: 768px) {
      .user-header {
        flex-direction: column;
        text-align: center;
        
        .user-avatar-large {
          margin-right: 0;
          margin-bottom: 16px;
        }
      }
      
      .detail-item {
        flex-direction: column;
        align-items: flex-start;
        
        mat-icon {
          margin-bottom: 4px;
        }
        
        .label {
          min-width: auto;
        }
      }
    }
  `]
})
export class UserDetailsComponent {
  @Input() user!: User;
}
