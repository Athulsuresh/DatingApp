import { AuthService } from './../_Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authserv: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authserv.login(this.model).subscribe(next => {
      console.log('yes');
    },
    error => {
      console.log('No');
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return !!token;

  }

  logout() {
    localStorage.removeItem('token');
    console.log('logoute');
  }

}
