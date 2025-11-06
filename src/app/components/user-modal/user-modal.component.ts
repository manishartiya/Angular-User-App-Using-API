import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.interface';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    UserDetailsComponent
  ],
  template: `
    <div class="modal-header">
      <h2 mat-dialog-title>User Details</h2>
      <button 
        mat-icon-button 
        (click)="onClose()" 
        class="close-button"
        aria-label="Close dialog">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    
    <mat-dialog-content class="modal-content">
      <app-user-details [user]="data.user"></app-user-details>
    </mat-dialog-content>
    

  `,
  styles: [`
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px 0 24px;
      
      h2 {
        margin: 0;
        color: #3f51b5;
      }
    }
    
    .close-button {
      color: #666;
      
      &:hover {
        color: #333;
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
    
    .modal-content {
      padding: 16px 24px;
      max-height: 70vh;
      overflow-y: auto;
    }
    
    .modal-actions {
      padding: 16px 24px;
      justify-content: flex-end;
      
      button {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
    
    :host-context(.dark-theme) {
      .modal-header h2 {
        color: #7986cb;
      }
      
      .close-button {
        color: #ccc;
        
        &:hover {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.08);
        }
      }
    }
  `]
})
export class UserModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
