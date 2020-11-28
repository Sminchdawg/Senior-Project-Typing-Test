import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  readonly emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  hide = true;

  model = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
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

  onSubmit(): void {
    this.userService.login({
      email: this.model.email.value,
      password: this.model.password.value
    }).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/user-profile');
      },
      err => {
        this.serverErrorMessages = err.error.messages;
      }
    );
  }

  getErrorMessage() {
    if (this.model.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.model.email.hasError('email') ? 'Not a valid email' : '';
  }
}
