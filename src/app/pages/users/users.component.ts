import {
  Component,
  OnInit,
  AfterViewInit,
  ViewContainerRef,
  ComponentRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserModalComponent } from '../../components/user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    UserCardComponent
  ],
  template: `
    <div class="users-page">
      <h1>Users Directory</h1>
      
      <div class="search-container">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search users</mat-label>
          <input 
            matInput 
            [(ngModel)]="searchTerm" 
            (input)="onSearchChange($event)"
            placeholder="Search by name or username">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="sort-field">
          <mat-label>Sort by</mat-label>
          <mat-select [(value)]="sortBy" (selectionChange)="onSortChange()">
            <mat-option value="name">Name</mat-option>
            <mat-option value="username">Username</mat-option>
            <mat-option value="email">Email</mat-option>
            <mat-option value="company">Company</mat-option>
          </mat-select>
        </mat-form-field>
        
        <button 
          mat-raised-button 
          color="accent"
          style="top: -30px;" 
          (click)="loadUsers()" 
          [disabled]="loading">
          <mat-icon>refresh</mat-icon>
          Refresh
        </button>
      </div>
      
      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Loading users...</p>
      </div>
      
      <div *ngIf="error" class="error-message">
        <p>{{error}}</p>
        <button mat-raised-button color="warn" (click)="retryLoad()" class="retry-button">
          <mat-icon>refresh</mat-icon>
          Retry
        </button>
      </div>
      
      <div class="users-grid" *ngIf="!loading && !error">
        <div class="results-info">
          <p>Showing {{(filteredUsers$ | async)?.length || 0}} of {{(users$ | async)?.length || 0}} users</p>
        </div>
        
        <div class="user-cards-container">
          <!-- Dynamic components will be loaded here -->
          <ng-template #userCardsContainer></ng-template>
        </div>
        
        <ng-container *ngIf="(filteredUsers$ | async) as filtered">
          <ng-container *ngIf="(users$ | async) as allUsers">
            <div *ngIf="filtered.length === 0 && allUsers.length > 0" class="no-results">
              <mat-icon>search_off</mat-icon>
              <p>No users found matching your search criteria.</p>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    
    .users-page {
      padding: 20px 0;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #3f51b5;
      font-size: 2.5rem;
      font-weight: 300;
    }
    
    .search-container {
      display: flex;
      gap: 16px;
      margin-bottom: 30px;
      align-items: flex-end;
      flex-wrap: wrap;
    }
    
    .search-field {
      flex: 1;
      min-width: 250px;
    }
    
    .sort-field {
      min-width: 150px;
    }
    
    .loading-spinner {
      text-align: center;
      padding: 40px;
      
      p {
        margin-top: 16px;
        color: #666;
      }
    }
    
    .error-message {
      text-align: center;
      padding: 20px;
      background-color: #ffebee;
      border-radius: 8px;
      margin: 20px 0;
      
      p {
        margin-bottom: 16px;
        color: #c62828;
      }
    }
    
    .users-grid {
      .results-info {
        margin-bottom: 20px;
        text-align: center;
        color: #666;
        font-size: 14px;
      }
    }
    
    .user-cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .no-results {
      text-align: center;
      padding: 40px;
      color: #666;
      
      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        margin-bottom: 16px;
        opacity: 0.5;
      }
      
      p {
        font-size: 16px;
      }
    }
    
    :host-context(.dark-theme) {
      h1 {
        color: #fff;
      }
      
      .results-info {
        color: #ccc;
      }
      
      .no-results {
        color: #ccc;
      }
      
      .error-message {
        background-color: #3e2723;
        color: #ffab91;
      }
    }
    
    @media (max-width: 768px) {
      .search-container {
        flex-direction: column;
          color : #fff;

        
        .search-field, .sort-field {
          width: 100%;
          min-width: auto;
        }
      }
      
      .user-cards-container {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  users$ = new BehaviorSubject<User[]>([]);
  filteredUsers$: Observable<User[]>;
  loading = false;
  error: string | null = null;
  searchTerm = '';
  sortBy = 'name';

  private searchSubject = new BehaviorSubject<string>('');
  private sortSubject = new BehaviorSubject<string>('name');
  private userCardRefs: ComponentRef<UserCardComponent>[] = [];

  private filteredSub?: Subscription;

  @ViewChild('userCardsContainer', { read: ViewContainerRef }) userCardsContainer!: ViewContainerRef;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    // Combine search and sort observables with users data
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.searchSubject.pipe(startWith('')),
      this.sortSubject.pipe(startWith('name'))
    ]).pipe(
      map(([users, searchTerm, sortBy]) => {
        let filtered = users;

        // Apply search filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          filtered = users.filter(user =>
            user.name.toLowerCase().includes(term) ||
            user.username.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.company.name.toLowerCase().includes(term)
          );
        }

        // Apply sorting
        return filtered.sort((a, b) => {
          let aValue: string, bValue: string;

          switch (sortBy) {
            case 'username':
              aValue = a.username.toLowerCase();
              bValue = b.username.toLowerCase();
              break;
            case 'email':
              aValue = a.email.toLowerCase();
              bValue = b.email.toLowerCase();
              break;
            case 'company':
              aValue = a.company.name.toLowerCase();
              bValue = b.company.name.toLowerCase();
              break;
            default:
              aValue = a.name.toLowerCase();
              bValue = b.name.toLowerCase();
          }

          return aValue.localeCompare(bValue);
        });
      })
    );
  }

  ngOnInit(): void {
    this.loadUsers(); 
  }

  ngAfterViewInit(): void {
    this.filteredSub = this.filteredUsers$.pipe(debounceTime(100)).subscribe(users => {
      this.zone.run(() => {
        this.loadUserCardComponents(users);
        this.cdr.markForCheck(); // Faster and safer than detectChanges()
      });
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users$.next(users);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

  }
  retryLoad(): void {
    this.loadUsers();
  }

  onSearchChange(event: any): void {
    const value = event.target.value;
    this.searchSubject.next(value);
  }

  onSortChange(): void {
    this.sortSubject.next(this.sortBy);
  }

  private loadUserCardComponents(users: User[]): void {
    // Clear existing components
    this.clearUserCardComponents();
    if (!this.userCardsContainer) return;

    // Dynamically create UserCardComponent for each user inside the template anchor
    users.forEach(user => {
      const componentRef = this.userCardsContainer.createComponent(UserCardComponent);
      componentRef.instance.user = user;
      componentRef.instance.viewDetails.subscribe((selectedUser: User) => {
        this.openUserModal(selectedUser);
      });
      this.userCardRefs.push(componentRef);
    });
  }

  private clearUserCardComponents(): void {
    this.userCardRefs.forEach(ref => ref.destroy());
    this.userCardRefs = [];
    if (this.userCardsContainer) {
      this.userCardsContainer.clear();
    }
  }

  ngOnDestroy(): void {
    this.filteredSub?.unsubscribe();
    this.clearUserCardComponents();
  }

  private openUserModal(user: User): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '90vw',
      maxWidth: '800px',
      maxHeight: '90vh',
      data: { user },
      panelClass: 'user-modal-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed');
    });
  }
}
