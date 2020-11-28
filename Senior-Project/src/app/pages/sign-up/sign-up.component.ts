import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  readonly emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  showSuccessMessage: boolean;

  serverErrorMessages: string;

  hide = true;

  model = {
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  }

  constructor(
    public userService: UserService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const user = new User();
    user.fullName = this.model.fullName.value;
    user.email = this.model.email.value;
    user.password = this.model.password.value;
    this.userService.postUser(user).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 4000);
        this.router.navigate(['login']);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = 'Something went wrong. Please try again.';
        }
      },
    )
  }

  getErrorMessage() {
    if (this.model.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.model.email.hasError('email') ? 'Not a valid email' : '';
  }
}
