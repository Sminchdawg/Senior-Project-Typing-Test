import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
  };

  constructor(private httpClient: HttpClient) { }

  public postUser(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/register`, user)
  }
}
