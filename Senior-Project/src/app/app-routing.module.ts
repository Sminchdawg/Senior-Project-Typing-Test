import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './User/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'sign-up',
    component: UserComponent,
    children: [
      {
        path: '',
        component: SignUpComponent,
      }
    ]
  },
  {
    path: 'login',
    component: UserComponent,
    children: [
      {
        path: '',
        component: SignInComponent,
      }
    ]
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
