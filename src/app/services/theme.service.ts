import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeSubject = new BehaviorSubject<boolean>(false);
  public darkTheme$ = this.darkThemeSubject.asObservable();

  constructor() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme) {
      this.darkThemeSubject.next(JSON.parse(savedTheme));
    }
  }

  toggleTheme(): void {
    const currentTheme = this.darkThemeSubject.value;
    const newTheme = !currentTheme;
    this.darkThemeSubject.next(newTheme);
    localStorage.setItem('darkTheme', JSON.stringify(newTheme));
  }

  isDarkTheme(): boolean {
    return this.darkThemeSubject.value;
  }
}
