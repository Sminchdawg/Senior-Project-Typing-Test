import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {

      }
    );
  }

  onLogout(): void {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
