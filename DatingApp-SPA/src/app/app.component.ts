import { AuthService } from "./_Services/auth.service";
import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from './_models/user';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authServ: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authServ.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this.authServ.currentUser = user;
      this.authServ.changeMemberPhoto(user.photoUrl);
    }
  }
}
