import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = new Subject<boolean>();
  private isDarkTheme = this.darkTheme.asObservable();

  constructor() { }

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme.next(isDarkTheme);
  }

  getDarkTheme(): Observable<boolean> {
    return this.isDarkTheme;
  }
}
