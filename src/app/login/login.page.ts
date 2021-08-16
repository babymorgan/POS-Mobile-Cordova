import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.models';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  currentUser
  loginModel: LoginModel = new LoginModel()
  public isUsernameValid: boolean;
  public isPasswordValid: boolean;
  public isLinkValid: boolean;

  constructor(private authService: AuthService,
    private router: Router, private storage: Storage, private alertController: AlertController) {
    this.isUsernameValid = true;
    this.isPasswordValid = true;
    this.isLinkValid = true;
  }

  ngOnInit() { }
  validate(): boolean {
    this.isUsernameValid = true;
    this.isPasswordValid = true;
    this.isLinkValid = true;
    if (!this.loginModel.username || this.loginModel.username.length == 0) {
      this.isUsernameValid = false;
    }

    if (!this.loginModel.password || this.loginModel.password.length == 0) {
      this.isPasswordValid = false;
    }

    if (!this.loginModel.link || this.loginModel.link.length == 0) {
      this.isPasswordValid = false;
    }

    return this.isPasswordValid && this.isUsernameValid;
  }

  login() {
    if (!this.isUsernameValid || !this.isPasswordValid || !this.isLinkValid) {

    } else {

      this.authService.Login(this.loginModel).subscribe((returnVal) => {
        if (returnVal) {
          this.currentUser = returnVal.data;
          this.storage.set("user", JSON.stringify(this.currentUser));
          this.storage.set("role", JSON.stringify(this.currentUser.role));
          this.storage.set("category", JSON.stringify(this.currentUser.category));
          this.storage.set("profile", JSON.stringify(this.currentUser.profile));
          this.storage.set("quickKeys", JSON.stringify(this.currentUser.quick_keys))
          this.router.navigate(['']);
        }
      },
        (error) => {
          console.log(error)
          const status = error.status;
          const reason = error && error.error.message ? error.error.message : '';
 
          this.presentAlert(status, reason)

          return throwError(error);
        })
    }
  }

  async presentAlert(status, reason) {
    const alert = await this.alertController.create({
      header: status + ' Error',
      message: reason,
      buttons: ['OK']
    });

    await alert.present();
  }
}
