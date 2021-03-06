import { AlertifyService } from './../_Services/alertify.service';
import { AuthService } from './../_Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authserv: AuthService, private alertify: AlertifyService
    , private router: Router) { }

  ngOnInit() {
    this.authserv.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl) ;
  }

  login() {
    this.authserv.login(this.model).subscribe(next => {
      this.alertify.success('logged in Successfully');
    },
    error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authserv.loggedIn();

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authserv.decodedToken = null;
    this.authserv.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
