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

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' })};

  constructor(private httpClient: HttpClient) { }

  // http methods

  public postUser(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/register`, user, this.noAuthHeader);
  }

  public login(authCredentials) {
    return this.httpClient.post(`${environment.apiBaseUrl}/authenticate`, authCredentials, this.noAuthHeader);
  }

  public getUserProfile() {
    return this.httpClient.get(`${environment.apiBaseUrl}/userProfile`)
  }

  // helper methods

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public deleteToken() {
    localStorage.removeItem('token');
  }

  public getUserPayload() {
    let token = this.getToken();

    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }

    return null;
  }

  public isLoggedIn() {
    let userPayload = this.getUserPayload();
  
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }

    return false;
  }
}
