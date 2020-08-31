import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSignUp(): void {
    console.log('sign up clicked');
  }

  onSignIn(): void {
    console.log('sign in clicked');
  }
}
