import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, delay, finalize } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    this.setLoading(true);
    return this.http.get<User[]>(this.API_URL).pipe(
      delay(500), // Simulate network delay to show loading spinner
      retry(2),
      catchError(this.handleError.bind(this)),
      finalize(() => this.setLoading(false))
    );
  }

  getUserById(id: number): Observable<User> {
    this.setLoading(true);
    return this.http.get<User>(`${this.API_URL}/${id}`).pipe(
      delay(300),
      retry(2),
      catchError(this.handleError.bind(this)),
      finalize(() => this.setLoading(false))
    );
  }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.setLoading(false);
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
}
