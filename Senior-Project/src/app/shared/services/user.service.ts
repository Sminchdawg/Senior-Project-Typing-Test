import { ResultsData } from './../models/results-data';
import { environment } from './../../../environments/environment';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
  };

  currentUserId: string;

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' })};

  isLoggedInSubject: Subject<boolean> = new Subject<boolean>();

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

  public setResults(results) {
    return this.httpClient.post(`${environment.apiBaseUrl}/results`, results);
  }

  public getResults() {
    return this.httpClient.get<{results: Array<ResultsData> }>(`${environment.apiBaseUrl}/userResults/${this.currentUserId}`);
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
      this.isLoggedInSubject.next(true);
      this.setCurrentUserId(userPayload._id);
      return userPayload.exp > Date.now() / 1000;
    }

    return false;
  }

  public getIsLoggedInObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public setCurrentUserId(id: string): void {
    this.currentUserId = id;
  }

  public getCurrentUserId(): string {
    return this.currentUserId;
  }

  public logout(): void {
    this.deleteToken();
    this.isLoggedInSubject.next(false);
  }
}
