import { AlertifyService } from './../../_Services/alertify.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authSer: AuthService, private userSer: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userSer.sendLike(this.authSer.decodedToken.nameid, id)
    .subscribe( data => {
      this.alertify.success('You have liked: ' + this.user.knownAs);
    },
    error => {
      this.alertify.error(error) ;
    });
  }

}
