import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  serverUrl:String = 'http://54.234.218.168:8081';
  constructor(private http: Http) { }

  register(user): Observable<any> {
    return this.http.post(`${this.serverUrl}/api/user`, JSON.stringify(user), this.options);
  }

  login(credentials): Observable<any> {
    return this.http.post(`${this.serverUrl}/api/adminLogin`, JSON.stringify(credentials), this.options);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.serverUrl}/api/users`).map(res => res.json());
  }

  countUsers(): Observable<any> {
    return this.http.get(`${this.serverUrl}/api/users/count`).map(res => res.json());
  }

  addUser(user): Observable<any> {
    return this.http.post(`${this.serverUrl}/api/user`, JSON.stringify(user), this.options);
  }

  getUser(user): Observable<any> {
    return this.http.get(`${this.serverUrl}/api/user/${user.username}`).map(res => res.json());
  }

  editUser(user): Observable<any> {
    return this.http.put(`${this.serverUrl}/api/user/${user._id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(`${this.serverUrl}/api/user/${user._id}`, this.options);
  }

  searchUser(searchUser):Observable<any[]>{
      return this.http.post(`${this.serverUrl}/api/user/search`,JSON.stringify(searchUser), this.options).map(res => res.json());
  }

}
