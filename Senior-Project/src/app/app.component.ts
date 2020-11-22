import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Senior-Project-Typing-Test';

  isDarkTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.getDarkTheme();
  }
}
