import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TypingTestPageComponent } from './pages/typing-test-page/typing-test-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { OptionsPageComponent } from './pages/options-page/options-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'typing-test',
    component: TypingTestPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'options',
    component: OptionsPageComponent, 
  },
  {
    path: 'results',
    component: ResultsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
