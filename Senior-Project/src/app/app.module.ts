// built-in
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './User/sign-in/sign-in.component';
import { OptionsPageComponent } from './pages/options-page/options-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { TypingTestPageComponent } from './pages/typing-test-page/typing-test-page.component';
import { GameModeOptionsComponent } from './components/game-mode-options/game-mode-options.component';
import { LayoutCardComponent } from './components/layout-card/layout-card.component';
import { ShareSheetComponent } from './components/share-sheet/share-sheet.component';
import { ResultsListComponent } from './components/results-list/results-list.component';
import { ResultsModalComponent } from './components/results-modal/results-modal.component';
import { TimeOptionsComponent } from './components/time-options/time-options.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TimerComponent } from './components/timer/timer.component';

// services
import { UserService } from './shared/services/user.service';

// auth
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';

// material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    TimerComponent,
    NavbarComponent,
    TimeOptionsComponent,
    ResultsModalComponent,
    ResultsListComponent,
    ShareSheetComponent,
    OptionsPageComponent,
    ResultsPageComponent,
    TypingTestPageComponent,
    LayoutCardComponent,
    GameModeOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
