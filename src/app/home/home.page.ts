import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auth: AuthService,
    private route: Router) { }

  ngOnInit() {
    let result;
    this.auth.checkUser().then(res => {
      result = res;
      if (result) {

      }
      else {
        this.route.navigate(['/login'])
      }
    });
  }

  logOut() {
    this.auth.logout();
  }
}
