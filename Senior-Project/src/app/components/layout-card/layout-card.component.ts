import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../shared/models/nav-link';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-card',
  templateUrl: './layout-card.component.html',
  styleUrls: ['./layout-card.component.scss']
})
export class LayoutCardComponent implements OnInit {
  navLinks: Array<NavLink> = new Array<NavLink>();

  isDarkTheme: Observable<boolean>;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.getDarkTheme();
    this.navLinks.push(new NavLink('Sign In', 'login'));
    this.navLinks.push((new NavLink('Sign Up', 'sign-up')));

    this.userService.getIsLoggedInObservable().subscribe((response) => {
      this.navLinks = new Array<NavLink>();
      if (response === true) {
        this.navLinks.push(new NavLink('Typing Test', 'typing-test', 'keyboard'));
        this.navLinks.push(new NavLink('Results', 'results', 'insert_chart_outlined'));
        this.navLinks.push(new NavLink('Profile', 'user-profile', 'person'));
      } else {
        this.navLinks.push(new NavLink('Sign In', 'login'));
        this.navLinks.push((new NavLink('Sign Up', 'sign-up')));
      }
    })
  }
}
