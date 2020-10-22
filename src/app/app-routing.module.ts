import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { TypingTestPageComponent } from './typing-test-page/typing-test-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'typing-test',
    component: TypingTestPageComponent,
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: '/typing-test'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
