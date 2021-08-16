import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class EnvirontmentService {

  constructor(private route: Router, private storage: Storage) { }
  getGeneralEnvironment() {
    return "https://core.talentia.id/api/"
  }

  GetChildEnvirontment() {
    let user = this.checkUser()
    return user.url
  }

  checkUser() : any{
    let user = this.storage.get('user');
    if (user) {
      user.then(res => {
        return JSON.parse(res);
      })
    } else {
      this.storage.clear();
      this.route.navigate(['/login']);
      return;
    }
  }
}
