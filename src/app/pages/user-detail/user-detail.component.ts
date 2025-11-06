import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    UserDetailsComponent
  ],
  template: `
    <div class="user-detail-page">
      <div class="page-header">
        <button mat-raised-button (click)="goBack()" class="back-button">
          <mat-icon>arrow_back</mat-icon>
          Back to Users
        </button>
        <h1>User Profile</h1>
      </div>
      
      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Loading user details...</p>
      </div>
    
      
      <div *ngIf="user && !loading && !error" class="user-content">
        <app-user-details [user]="user"></app-user-details>
        
        <div class="action-buttons">
          <button mat-raised-button color="primary" (click)="goBack()">
            <mat-icon>list</mat-icon>
            View All Users
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-detail-page {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .page-header {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      gap: 20px;
      
      h1 {
        color: #3f51b5;
        font-size: 2rem;
        font-weight: 300;
        margin: 0;
      }
    }
    
    .back-button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .loading-spinner {
      text-align: center;
      padding: 60px 20px;
      
      p {
        margin-top: 20px;
        color: #666;
        font-size: 16px;
      }
    }
    
    .error-message {
      text-align: center;
      padding: 40px 20px;
      background-color: #ffebee;
      border-radius: 12px;
      margin: 20px 0;
      
      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #c62828;
        margin-bottom: 16px;
      }
      
      p {
        margin-bottom: 20px;
        color: #c62828;
        font-size: 16px;
      }
    }
    
    .user-content {
      animation: fadeIn 0.5s ease-in;
    }
    
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 30px;
      padding: 20px;
      
      button {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 140px;
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    :host-context(.dark-theme) {
      .page-header h1 {
        color: #7986cb;
      }
      
      .loading-spinner p {
        color: #ccc;
      }
      
      .error-message {
        background-color: #3e2723;
        
        p {
          color: #ffab91;
        }
        
        mat-icon {
          color: #ff8a65;
        }
      }
    }
    
    @media (max-width: 768px) {
      .user-detail-page {
        padding: 10px;
      }
      
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        
        h1 {
          font-size: 1.5rem;
        }
      }
      
      .action-buttons {
        flex-direction: column;
        
        button {
          width: 100%;
        }
      }
    }
  `]
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = false;
  error: string | null = null;
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      if (this.userId) {
        this.loadUser();
      }
    });
  }

  loadUser(): void {
    if (!this.userId) return;
    
    this.loading = true;
    this.error = null;
    
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      }
    });
  }

  retryLoad(): void {
    this.loadUser();
  }
  goBack(): void {
    this.router.navigate(['/users']);
  }
}
