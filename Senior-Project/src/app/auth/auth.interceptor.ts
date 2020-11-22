import { UserService } from './../shared/services/user.service';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('noauth')) {
      return next.handle(req.clone());
    } else {
      const clonedReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${this.userService.getToken()}` )
      });

      return next.handle(clonedReq).pipe(
        tap(
          event => {

          },
          err => {
            if (err.error.auth === false) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      );
    }
  }
}