import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user.interface';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HighlightDirective
  ],
  template: `
    <mat-card 
      class="user-card" 
      appHighlight="#e8f5e8"
      [attr.data-testid]="'user-card-' + user.id">
      <mat-card-header>
        <div mat-card-avatar class="user-avatar">
          {{user.name.charAt(0).toUpperCase()}}
        </div>
        <mat-card-title>{{user.name}}</mat-card-title>
  <mat-card-subtitle>{{'@' + user.username}}</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="user-info">
          <div class="info-item">
            <mat-icon>email</mat-icon>
            <span>{{user.email}}</span>
          </div>
          <div class="info-item">
            <mat-icon>phone</mat-icon>
            <span>{{user.phone}}</span>
          </div>
          <div class="info-item">
            <mat-icon>business</mat-icon>
            <span>{{user.company.name}}</span>
          </div>
        </div>
      </mat-card-content>
      
      <mat-card-actions>
        <button 
          mat-raised-button 
          color="primary" 
          (click)="onViewDetails()"
          class="view-details-btn">
          <mat-icon>visibility</mat-icon>
          View Details
        </button>
        <button 
          mat-button 
          color="accent" 
          [routerLink]="['/user', user.id]"
          class="profile-btn">
          <mat-icon>person</mat-icon>
          Profile
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .user-card {
      margin-bottom: 16px;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.12);
      }
    }
    
    .user-avatar {
      background-color: #3f51b5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
    }
    
    .user-info {
      margin: 16px 0;
    }
    
    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      
      mat-icon {
        margin-right: 8px;
        color: #666;
        font-size: 18px;
      }
      
      span {
        font-size: 14px;
        color: #555;
      }
    }
    
    mat-card-actions {
      display: flex;
      gap: 8px;
      padding: 16px;
    }
    
    .view-details-btn, .profile-btn {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    :host-context(.dark-theme) {
      .info-item span {
        color: #000;
      }
      
      .info-item mat-icon {
        color: #000;
      }
    }
    
    .active-user {
      transform: scale(1.02);
      box-shadow: 0 6px 12px rgba(63, 81, 181, 0.3);
    }
  `]
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() viewDetails = new EventEmitter<User>();

  onViewDetails(): void {
    this.viewDetails.emit(this.user);
  }
}
