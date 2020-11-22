import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../shared/models/nav-link';

@Component({
  selector: 'app-layout-card',
  templateUrl: './layout-card.component.html',
  styleUrls: ['./layout-card.component.scss']
})
export class LayoutCardComponent implements OnInit {
  navLinks: Array<NavLink> = new Array<NavLink>();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
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
