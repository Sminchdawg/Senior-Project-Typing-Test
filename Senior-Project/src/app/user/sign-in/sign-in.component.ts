import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  readonly emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  model = {
    email: '',
    password: '',
  }

  serverErrorMessages: string;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/user-profile');
    }
  }

  onSubmit(form: NgForm): void {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/user-profile');
      },
      err => {
        this.serverErrorMessages = err.error.messages;
      }
    );
  }
}
