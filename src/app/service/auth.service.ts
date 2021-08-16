import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.models';
import { EnvirontmentService } from './environtment.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private env :string = this.envService.getGeneralEnvironment()
  private loginEndpointPath = 'auth/login';
  private loginEndpointUrl = this.env + this.loginEndpointPath;

  private registerEndpointPath = 'auth/register';
  private registerEndpointUrl = this.env + this.registerEndpointPath;

  constructor(
    private http: HttpClient,
    private route: Router,
    private envService: EnvirontmentService,
    private storage: Storage
  ) { 

  }

  Register(model) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.registerEndpointUrl, model)
  }

  Login(model: LoginModel) {
    return this.http.post<any>(this.loginEndpointUrl, model)
  }
  async checkUser() {

    return this.storage.get('user');

  }
  getUser() {
    if (this.checkUser) {
      return this.storage.get('user').then(res => {
        JSON.parse(res);
      })
    }
    else {
      this.logout()
    }
  }

  logout() {
    this.storage.clear();
    return this.route.navigate(['/login']);
  }
}
